import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// GET - Initiate OAuth flow
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const provider = searchParams.get('provider') as 'gmail' | 'outlook'

  if (!provider || !['gmail', 'outlook'].includes(provider)) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
  }

  // Generate state for CSRF protection
  const state = Buffer.from(JSON.stringify({
    userId: user.id,
    provider,
    timestamp: Date.now(),
  })).toString('base64')

  let authUrl: string

  if (provider === 'gmail') {
    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 500 })
    }

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${BASE_URL}/api/email/callback`,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email',
      access_type: 'offline',
      prompt: 'consent',
      state,
    })

    authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  } else {
    if (!MICROSOFT_CLIENT_ID) {
      return NextResponse.json({ error: 'Microsoft OAuth not configured' }, { status: 500 })
    }

    const params = new URLSearchParams({
      client_id: MICROSOFT_CLIENT_ID,
      redirect_uri: `${BASE_URL}/api/email/callback`,
      response_type: 'code',
      scope: 'openid email Mail.Send Mail.Read offline_access',
      state,
    })

    authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`
  }

  return NextResponse.redirect(authUrl)
}

// POST - Handle OAuth callback (exchange code for tokens)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { code, state } = body

    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
    }

    // Decode state
    let stateData
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString())
    } catch {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
    }

    // Verify state
    if (stateData.userId !== user.id) {
      return NextResponse.json({ error: 'State mismatch' }, { status: 400 })
    }

    const provider = stateData.provider as 'gmail' | 'outlook'
    let tokens: { access_token: string; refresh_token: string; expires_in: number }
    let email: string

    if (provider === 'gmail') {
      // Exchange code for tokens with Google
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID!,
          client_secret: GOOGLE_CLIENT_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: `${BASE_URL}/api/email/callback`,
        }),
      })

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text()
        console.error('Google token error:', error)
        return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 })
      }

      tokens = await tokenResponse.json()

      // Get user email
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!userInfoResponse.ok) {
        return NextResponse.json({ error: 'Failed to get user info' }, { status: 500 })
      }

      const userInfo = await userInfoResponse.json()
      email = userInfo.email
    } else {
      // Exchange code for tokens with Microsoft
      const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: MICROSOFT_CLIENT_ID!,
          client_secret: MICROSOFT_CLIENT_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: `${BASE_URL}/api/email/callback`,
          scope: 'openid email Mail.Send Mail.Read offline_access',
        }),
      })

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text()
        console.error('Microsoft token error:', error)
        return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 })
      }

      tokens = await tokenResponse.json()

      // Get user email from Microsoft Graph
      const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })

      if (!userInfoResponse.ok) {
        return NextResponse.json({ error: 'Failed to get user info' }, { status: 500 })
      }

      const userInfo = await userInfoResponse.json()
      email = userInfo.mail || userInfo.userPrincipalName
    }

    // Calculate expiry
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

    // Store tokens in database
    const { error: dbError } = await supabase
      .from('user_email_accounts')
      .upsert({
        user_id: user.id,
        provider,
        email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        is_active: true,
      }, { onConflict: 'user_id,email' })

    if (dbError) throw dbError

    return NextResponse.json({ success: true, email })
  } catch (error: any) {
    console.error('[Email Connect] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Disconnect email account
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId')

    if (!accountId) {
      return NextResponse.json({ error: 'Account ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('user_email_accounts')
      .delete()
      .eq('id', accountId)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Email Connect] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

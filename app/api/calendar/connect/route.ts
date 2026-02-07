import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// GET - Initiate OAuth flow for Google Calendar
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!GOOGLE_CLIENT_ID) {
    return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 500 })
  }

  const state = Buffer.from(JSON.stringify({
    userId: user.id,
    provider: 'google_calendar',
    timestamp: Date.now(),
  })).toString('base64')

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/calendar/callback`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email',
    access_type: 'offline',
    prompt: 'consent',
    state,
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  return NextResponse.redirect(authUrl)
}

// POST - Exchange code for tokens
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

    // Decode + verify state
    let stateData
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString())
    } catch {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
    }

    if (stateData.userId !== user.id) {
      return NextResponse.json({ error: 'State mismatch' }, { status: 400 })
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${BASE_URL}/api/calendar/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('Google calendar token error:', error)
      return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 })
    }

    const tokens = await tokenResponse.json()

    // Get user email
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    if (!userInfoResponse.ok) {
      return NextResponse.json({ error: 'Failed to get user info' }, { status: 500 })
    }

    const userInfo = await userInfoResponse.json()
    const email = userInfo.email

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

    // Upsert calendar account
    const { error: dbError } = await supabase
      .from('user_calendar_accounts')
      .upsert({
        user_id: user.id,
        provider: 'google',
        email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        is_active: true,
      }, { onConflict: 'user_id,email' })

    if (dbError) throw dbError

    return NextResponse.json({ success: true, email })
  } catch (error: any) {
    console.error('[Calendar Connect] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Disconnect calendar account
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('user_calendar_accounts')
      .delete()
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Calendar Connect] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

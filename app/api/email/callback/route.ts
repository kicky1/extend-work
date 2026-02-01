import { NextRequest, NextResponse } from 'next/server'

// This route handles the OAuth callback redirect
// It passes the authorization code to the frontend which then exchanges it for tokens
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Handle errors from OAuth provider
  if (error) {
    const errorDescription = searchParams.get('error_description') || 'Authentication failed'
    return NextResponse.redirect(
      `${BASE_URL}/emails?error=${encodeURIComponent(errorDescription)}`
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${BASE_URL}/emails?error=${encodeURIComponent('Missing authorization code')}`
    )
  }

  // Redirect to emails page with code and state
  // The frontend will handle the token exchange
  return NextResponse.redirect(
    `${BASE_URL}/emails?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
  )
}

import { NextRequest, NextResponse } from 'next/server'

// Handle Google Calendar OAuth callback redirect
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  if (error) {
    const errorDescription = searchParams.get('error_description') || 'Authentication failed'
    return NextResponse.redirect(
      `${BASE_URL}/calendar?cal_error=${encodeURIComponent(errorDescription)}`
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${BASE_URL}/calendar?cal_error=${encodeURIComponent('Missing authorization code')}`
    )
  }

  return NextResponse.redirect(
    `${BASE_URL}/calendar?cal_code=${encodeURIComponent(code)}&cal_state=${encodeURIComponent(state)}`
  )
}

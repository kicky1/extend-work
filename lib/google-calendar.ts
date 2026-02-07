import { createClient } from '@/lib/supabase/server'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

interface CalendarAccount {
  id: string
  access_token: string
  refresh_token: string
  token_expires_at: string
}

interface CalendarEventInput {
  title: string
  company: string
  position: string
  scheduledAt: string
  duration: number
  location?: string
  meetingLink?: string
  interviewerName?: string
  notes?: string
}

/**
 * Refresh the access token if it expires within 5 minutes.
 * Returns a valid access token.
 */
export async function getValidToken(account: CalendarAccount): Promise<string> {
  const expiresAt = new Date(account.token_expires_at)
  const fiveMinFromNow = new Date(Date.now() + 5 * 60 * 1000)

  if (expiresAt > fiveMinFromNow) {
    return account.access_token
  }

  // Refresh the token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: GOOGLE_CLIENT_SECRET!,
      refresh_token: account.refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Token refresh error:', error)
    throw new Error('Failed to refresh Google Calendar token')
  }

  const tokens = await response.json()
  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000)

  // Update stored tokens
  const supabase = await createClient()
  await supabase
    .from('user_calendar_accounts')
    .update({
      access_token: tokens.access_token,
      token_expires_at: newExpiresAt.toISOString(),
    })
    .eq('id', account.id)

  return tokens.access_token
}

/**
 * Create a Google Calendar event for an interview.
 * Returns the event ID.
 */
export async function createCalendarEvent(
  token: string,
  interview: CalendarEventInput
): Promise<string> {
  const start = new Date(interview.scheduledAt)
  const end = new Date(start.getTime() + interview.duration * 60 * 1000)

  const description = [
    `Position: ${interview.position}`,
    interview.interviewerName ? `Interviewer: ${interview.interviewerName}` : '',
    interview.meetingLink ? `Meeting Link: ${interview.meetingLink}` : '',
    interview.notes ? `Notes: ${interview.notes}` : '',
  ].filter(Boolean).join('\n')

  const event: Record<string, unknown> = {
    summary: `${interview.title} — ${interview.company}`,
    description,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 60 },
        { method: 'popup', minutes: 1440 },
      ],
    },
  }

  if (interview.location) {
    event.location = interview.location
  }

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error('Create calendar event error:', error)
    throw new Error('Failed to create Google Calendar event')
  }

  const data = await response.json()
  return data.id
}

/**
 * Update an existing Google Calendar event.
 */
export async function updateCalendarEvent(
  token: string,
  eventId: string,
  interview: CalendarEventInput
): Promise<void> {
  const start = new Date(interview.scheduledAt)
  const end = new Date(start.getTime() + interview.duration * 60 * 1000)

  const description = [
    `Position: ${interview.position}`,
    interview.interviewerName ? `Interviewer: ${interview.interviewerName}` : '',
    interview.meetingLink ? `Meeting Link: ${interview.meetingLink}` : '',
    interview.notes ? `Notes: ${interview.notes}` : '',
  ].filter(Boolean).join('\n')

  const event: Record<string, unknown> = {
    summary: `${interview.title} — ${interview.company}`,
    description,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
  }

  if (interview.location) {
    event.location = interview.location
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error('Update calendar event error:', error)
    throw new Error('Failed to update Google Calendar event')
  }
}

/**
 * Delete a Google Calendar event.
 */
export async function deleteCalendarEvent(
  token: string,
  eventId: string
): Promise<void> {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  // 410 Gone is also success (event already deleted)
  if (!response.ok && response.status !== 410) {
    const error = await response.text()
    console.error('Delete calendar event error:', error)
    throw new Error('Failed to delete Google Calendar event')
  }
}

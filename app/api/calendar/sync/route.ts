import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getValidToken,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from '@/lib/google-calendar'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, interviewId } = await request.json()

    if (!action || !interviewId) {
      return NextResponse.json({ error: 'Missing action or interviewId' }, { status: 400 })
    }

    // Load calendar account
    const { data: account, error: accountError } = await supabase
      .from('user_calendar_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (accountError || !account) {
      return NextResponse.json({ error: 'No calendar account connected' }, { status: 404 })
    }

    // Get valid token (auto-refreshes if needed)
    const token = await getValidToken(account)

    // Load interview
    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .eq('user_id', user.id)
      .single()

    if (interviewError || !interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
    }

    switch (action) {
      case 'create': {
        const eventId = await createCalendarEvent(token, {
          title: interview.title,
          company: interview.company,
          position: interview.position,
          scheduledAt: interview.scheduled_at,
          duration: interview.duration,
          location: interview.location,
          meetingLink: interview.meeting_link,
          interviewerName: interview.interviewer_name,
          notes: interview.notes,
        })

        // Store event ID on interview
        await supabase
          .from('interviews')
          .update({ google_calendar_event_id: eventId })
          .eq('id', interviewId)

        return NextResponse.json({ success: true, eventId })
      }

      case 'update': {
        if (!interview.google_calendar_event_id) {
          // No event to update — create instead
          const eventId = await createCalendarEvent(token, {
            title: interview.title,
            company: interview.company,
            position: interview.position,
            scheduledAt: interview.scheduled_at,
            duration: interview.duration,
            location: interview.location,
            meetingLink: interview.meeting_link,
            interviewerName: interview.interviewer_name,
            notes: interview.notes,
          })

          await supabase
            .from('interviews')
            .update({ google_calendar_event_id: eventId })
            .eq('id', interviewId)

          return NextResponse.json({ success: true, eventId })
        }

        await updateCalendarEvent(token, interview.google_calendar_event_id, {
          title: interview.title,
          company: interview.company,
          position: interview.position,
          scheduledAt: interview.scheduled_at,
          duration: interview.duration,
          location: interview.location,
          meetingLink: interview.meeting_link,
          interviewerName: interview.interviewer_name,
          notes: interview.notes,
        })

        return NextResponse.json({ success: true })
      }

      case 'delete': {
        if (interview.google_calendar_event_id) {
          await deleteCalendarEvent(token, interview.google_calendar_event_id)

          await supabase
            .from('interviews')
            .update({ google_calendar_event_id: null })
            .eq('id', interviewId)
        }

        return NextResponse.json({ success: true })
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('[Calendar Sync] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

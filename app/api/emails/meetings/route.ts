import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { scheduledMeetingFromRow } from '@/lib/types/email'

// GET - List user's meetings
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const upcoming = searchParams.get('upcoming') === 'true'

    let query = supabase
      .from('scheduled_meetings')
      .select('*')
      .eq('user_id', user.id)

    if (status) {
      query = query.eq('status', status)
    }

    if (upcoming) {
      query = query
        .in('status', ['pending', 'confirmed'])
        .gte('start_time', new Date().toISOString())
    }

    const { data, error } = await query
      .order('start_time', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      meetings: (data || []).map(scheduledMeetingFromRow),
    })
  } catch (error: any) {
    console.error('[Meetings] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Book a meeting (public endpoint for guests)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      guestName,
      guestEmail,
      title,
      description,
      startTime,
      endTime,
      timezone,
      jobApplicationId,
    } = body

    if (!userId || !guestName || !guestEmail || !startTime || !endTime) {
      return NextResponse.json({
        error: 'User ID, guest name, guest email, start time, and end time are required',
      }, { status: 400 })
    }

    // Verify slot is available
    const { data: conflicts, error: conflictError } = await supabaseAdmin
      .from('scheduled_meetings')
      .select('id')
      .eq('user_id', userId)
      .in('status', ['pending', 'confirmed'])
      .lt('start_time', endTime)
      .gt('end_time', startTime)

    if (conflictError) throw conflictError

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json({
        error: 'This time slot is no longer available',
      }, { status: 409 })
    }

    // Create meeting
    const { data: meeting, error: meetingError } = await supabaseAdmin
      .from('scheduled_meetings')
      .insert({
        user_id: userId,
        guest_name: guestName,
        guest_email: guestEmail,
        title: title || `Meeting with ${guestName}`,
        description,
        start_time: startTime,
        end_time: endTime,
        timezone: timezone || 'UTC',
        status: 'pending',
        job_application_id: jobApplicationId,
      })
      .select()
      .single()

    if (meetingError) throw meetingError

    return NextResponse.json({
      meeting: scheduledMeetingFromRow(meeting),
    })
  } catch (error: any) {
    console.error('[Meetings] Create error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update meeting status (confirm, cancel, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Meeting ID required' }, { status: 400 })
    }

    const body = await request.json()
    const { status, cancellationReason, meetingLink } = body

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (status !== undefined) updates.status = status
    if (cancellationReason !== undefined) updates.cancellation_reason = cancellationReason
    if (meetingLink !== undefined) updates.meeting_link = meetingLink

    const { data, error } = await supabase
      .from('scheduled_meetings')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      meeting: scheduledMeetingFromRow(data),
    })
  } catch (error: any) {
    console.error('[Meetings] Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Delete a meeting
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Meeting ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('scheduled_meetings')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Meetings] Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

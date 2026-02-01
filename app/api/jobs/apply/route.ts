import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { applicationFromRow } from '@/lib/types/job'
import type { ApplicationTimelineEvent } from '@/lib/types/job'

// POST - Create new application
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { job, cvId, coverLetter, contactEmail } = body

    if (!job || !job.title || !job.company) {
      return NextResponse.json({ error: 'Job data required' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const initialTimeline: ApplicationTimelineEvent[] = [{
      date: now,
      action: 'Application created',
    }]

    // Create application record
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        user_id: user.id,
        job_listing_id: job.id || null,
        cv_id: cvId || null,
        status: 'applied',
        cover_letter: coverLetter,
        job_title: job.title,
        company_name: job.company,
        job_url: job.sourceUrl,
        contact_email: contactEmail,
        timeline: initialTimeline,
        applied_at: now,
      })
      .select(`*, job_listings (*)`)
      .single()

    if (error) throw error

    return NextResponse.json({ application: applicationFromRow(data) })
  } catch (error: any) {
    console.error('[Apply API] POST Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET - List applications
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('job_applications')
      .select(`*, job_listings (*)`)
      .eq('user_id', user.id)
      .order('applied_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    const applications = (data || []).map(row => applicationFromRow(row))

    return NextResponse.json({ applications })
  } catch (error: any) {
    console.error('[Apply API] GET Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update application
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { applicationId, status, notes, nextFollowUpAt, timelineEvent } = body

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    // Get current application
    const { data: current, error: fetchError } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !current) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // Build update object
    const updates: Record<string, any> = {}

    if (status) {
      updates.status = status
      // Add status change to timeline
      const timeline = current.timeline || []
      timeline.push({
        date: new Date().toISOString(),
        action: `Status changed to ${status}`,
      })
      updates.timeline = timeline
    }

    if (notes !== undefined) {
      updates.notes = notes
    }

    if (nextFollowUpAt !== undefined) {
      updates.next_follow_up_at = nextFollowUpAt
    }

    if (timelineEvent) {
      const timeline = current.timeline || []
      timeline.push({
        date: new Date().toISOString(),
        ...timelineEvent,
      })
      updates.timeline = timeline
    }

    // Update application
    const { data, error } = await supabase
      .from('job_applications')
      .update(updates)
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .select(`*, job_listings (*)`)
      .single()

    if (error) throw error

    return NextResponse.json({ application: applicationFromRow(data) })
  } catch (error: any) {
    console.error('[Apply API] PATCH Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Delete application
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId')

    if (!applicationId) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Apply API] DELETE Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

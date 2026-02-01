import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { savedJobFromRow } from '@/lib/types/job'

// GET - List saved jobs
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const autoMatched = searchParams.get('auto_matched')

    let query = supabase
      .from('saved_jobs')
      .select(`
        *,
        job_listings (*)
      `)
      .eq('user_id', user.id)

    if (autoMatched === 'true') {
      query = query.eq('auto_matched', true)
        .order('compatibility_score', { ascending: false })
    } else {
      query = query.eq('is_bookmarked', true)
        .order('created_at', { ascending: false })
    }

    const { data, error } = await query

    if (error) throw error

    const savedJobs = (data || []).map(row => savedJobFromRow(row))

    return NextResponse.json({ savedJobs })
  } catch (error: any) {
    console.error('[Saved Jobs API] GET Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Save a job
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { job } = body

    if (!job || !job.id) {
      console.error('[Saved Jobs API] Invalid job data:', { job })
      return NextResponse.json({ error: 'Job data required' }, { status: 400 })
    }

    console.log('[Saved Jobs API] Saving job:', { id: job.id, title: job.title, source: job.source })

    // Generate dedup hash
    const dedupHash = `${job.title}-${job.company}-${job.location || ''}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')

    // Upsert job listing using admin client (bypasses RLS since job_listings has no user INSERT policy)
    // Note: Don't pass `id` - let database generate UUID. The incoming job.id may be a nanoid from external APIs.
    const { data: jobData, error: jobError } = await supabaseAdmin
      .from('job_listings')
      .upsert({
        title: job.title,
        company: job.company,
        location: job.location,
        remote_type: job.remoteType || 'any',
        description: job.description,
        requirements: job.requirements,
        salary_min: job.salary?.min,
        salary_max: job.salary?.max,
        salary_currency: job.salary?.currency || 'PLN',
        salary_type: job.salary?.type || 'monthly',
        source: job.source,
        source_id: job.sourceId,
        source_url: job.sourceUrl,
        dedup_hash: dedupHash,
        company_logo_url: job.companyLogoUrl,
        skills: job.skills || [],
        experience_level: job.experienceLevel,
        employment_type: job.employmentType,
        posted_at: job.postedAt,
        expires_at: job.expiresAt,
      }, { onConflict: 'dedup_hash' })
      .select('id')
      .single()

    if (jobError) throw jobError

    // Use the actual job ID from the database (database generates proper UUID)
    if (!jobData?.id) {
      throw new Error('Failed to get job ID from database')
    }
    const actualJobId = jobData.id

    // Save the bookmark using admin client (with user_id from authenticated user)
    const { data, error } = await supabaseAdmin
      .from('saved_jobs')
      .upsert({
        user_id: user.id,
        job_listing_id: actualJobId,
        is_bookmarked: true,
      }, { onConflict: 'user_id,job_listing_id' })
      .select(`*, job_listings (*)`)
      .single()

    if (error) throw error

    return NextResponse.json({ savedJob: savedJobFromRow(data) })
  } catch (error: any) {
    console.error('[Saved Jobs API] POST Error:', error)
    const message = error?.message || error?.details || error?.hint || JSON.stringify(error) || 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE - Unsave a job
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobListingId = searchParams.get('jobListingId')

    if (!jobListingId) {
      return NextResponse.json({ error: 'Job listing ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('saved_jobs')
      .update({ is_bookmarked: false })
      .eq('user_id', user.id)
      .eq('job_listing_id', jobListingId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Saved Jobs API] DELETE Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH - Update saved job notes
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { savedJobId, notes } = body

    if (!savedJobId) {
      return NextResponse.json({ error: 'Saved job ID required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('saved_jobs')
      .update({ notes })
      .eq('id', savedJobId)
      .eq('user_id', user.id)
      .select(`*, job_listings (*)`)
      .single()

    if (error) throw error

    return NextResponse.json({ savedJob: savedJobFromRow(data) })
  } catch (error: any) {
    console.error('[Saved Jobs API] PATCH Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

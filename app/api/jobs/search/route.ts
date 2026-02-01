import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { searchAllApis } from '@/lib/services/job-apis'
import { generateDedupHash, filterNewJobs } from '@/lib/services/job-batch/dedup'
import { jobListingFromRow } from '@/lib/types/job'
import type { JobSearchFilters } from '@/lib/types/job'
import { supabaseAdmin } from '@/lib/supabase/admin'

const PAGE_SIZE = 20

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { filters, page = 1 } = body as { filters: JobSearchFilters; page: number }

    // Build DB query
    let query = supabase
      .from('job_listings')
      .select('*', { count: 'exact' })

    if (filters.query) {
      query = query.or(`title.ilike.%${filters.query}%,company.ilike.%${filters.query}%`)
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters.remoteType && filters.remoteType !== 'any') {
      query = query.eq('remote_type', filters.remoteType)
    }
    if (filters.experienceLevel && filters.experienceLevel !== 'any') {
      query = query.eq('experience_level', filters.experienceLevel)
    }
    if (filters.sources && filters.sources.length > 0) {
      query = query.in('source', filters.sources)
    }
    if (filters.skills && filters.skills.length > 0) {
      query = query.overlaps('skills', filters.skills)
    }
    if (filters.salaryMin) {
      query = query.gte('salary_max', filters.salaryMin)
    }
    if (filters.salaryMax) {
      query = query.lte('salary_min', filters.salaryMax)
    }
    // Date filter - enforce max 2 weeks
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    if (filters.postedWithin && filters.postedWithin !== 'any') {
      const now = new Date()
      const cutoff = new Date()
      if (filters.postedWithin === 'day') cutoff.setDate(now.getDate() - 1)
      else if (filters.postedWithin === 'week') cutoff.setDate(now.getDate() - 7)
      else if (filters.postedWithin === '2weeks') cutoff.setDate(now.getDate() - 14)
      query = query.gte('posted_at', cutoff.toISOString())
    } else {
      // Always enforce max 2 weeks even if no filter specified
      query = query.gte('posted_at', twoWeeksAgo)
    }

    // Has salary filter
    if (filters.hasSalary) {
      query = query.not('salary_min', 'is', null)
    }

    const offset = (page - 1) * PAGE_SIZE
    query = query
      .order('posted_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + PAGE_SIZE - 1)

    const { data: rows, error: dbError, count } = await query

    if (dbError) throw dbError

    let jobs = (rows || []).map(row => jobListingFromRow(row))
    const totalCount = count || 0

    // If fewer than 10 DB results and we have a search query, fetch from APIs too
    if (jobs.length < 10 && filters.query) {
      try {
        const apiJobs = await searchAllApis({
          keywords: filters.query,
          location: filters.location,
        })

        if (apiJobs.length > 0) {
          // Get existing hashes for dedup
          const hashes = apiJobs.map(j => generateDedupHash(j.title, j.company, j.location))
          const { data: existingRows } = await supabaseAdmin
            .from('job_listings')
            .select('dedup_hash')
            .in('dedup_hash', hashes)

          const existingHashes = new Set((existingRows || []).map(r => r.dedup_hash))
          const newJobs = filterNewJobs(apiJobs, existingHashes)

          if (newJobs.length > 0) {
            // Note: Don't pass `id` - let database generate UUID with gen_random_uuid()
            const insertRows = newJobs.map(job => ({
              title: job.title,
              company: job.company,
              location: job.location || null,
              remote_type: 'any',
              description: job.description || null,
              requirements: null,
              salary_min: job.salary_min || null,
              salary_max: job.salary_max || null,
              salary_currency: job.salary_currency || 'PLN',
              salary_type: 'monthly',
              source: job.source,
              source_id: null,
              source_url: job.url,
              dedup_hash: generateDedupHash(job.title, job.company, job.location),
              company_logo_url: null,
              skills: [],
              experience_level: null,
              employment_type: null,
              posted_at: job.posted_at || null,
              expires_at: null,
            }))

            const dedupHashes = insertRows.map(r => r.dedup_hash)
            await supabaseAdmin
              .from('job_listings')
              .upsert(insertRows, { onConflict: 'dedup_hash' })

            // Fetch the inserted jobs with their database-generated IDs
            const { data: insertedJobs } = await supabaseAdmin
              .from('job_listings')
              .select('*')
              .in('dedup_hash', dedupHashes)

            if (insertedJobs) {
              const apiListings = insertedJobs.map(row => jobListingFromRow(row))
              jobs = [...jobs, ...apiListings]
            }
          }
        }
      } catch (apiError) {
        console.error('[Search] API fallback error:', apiError)
        // Continue with DB results only
      }
    }

    return NextResponse.json({
      jobs,
      totalCount: Math.max(totalCount, jobs.length),
      page,
      pageSize: PAGE_SIZE,
      hasMore: totalCount > offset + PAGE_SIZE,
      cached: false,
    })
  } catch (error: any) {
    console.error('[Search API] Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

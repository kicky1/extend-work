import { supabaseAdmin } from '@/lib/supabase/admin'
import { searchAllApis } from '@/lib/services/job-apis'
import { buildBatchQueries } from './query-builder'
import { generateDedupHash, filterNewJobs } from './dedup'
import { detectWorkTypeWithDetails } from './work-type-detector'

const DELAY_BETWEEN_QUERIES_MS = 1000

export async function runDailyBatch(): Promise<{ insertedJobIds: string[] }> {
  // 1. Load all job_preferences
  const { data: preferences, error: prefError } = await supabaseAdmin
    .from('job_preferences')
    .select('target_roles, target_locations')

  if (prefError) {
    console.error('[Batch] Failed to load preferences:', prefError)
    return { insertedJobIds: [] }
  }

  if (!preferences || preferences.length === 0) {
    console.log('[Batch] No user preferences found, skipping')
    return { insertedJobIds: [] }
  }

  // 2. Build unique queries
  const queries = buildBatchQueries(preferences)
  console.log(`[Batch] ${queries.length} unique queries from ${preferences.length} preference sets`)

  // 3. Fetch jobs from all APIs
  const allRawJobs = []
  for (const query of queries) {
    const jobs = await searchAllApis(query)
    allRawJobs.push(...jobs)
    // Rate-limit between queries
    if (queries.length > 1) {
      await new Promise(r => setTimeout(r, DELAY_BETWEEN_QUERIES_MS))
    }
  }

  console.log(`[Batch] Fetched ${allRawJobs.length} total raw jobs`)

  if (allRawJobs.length === 0) {
    return { insertedJobIds: [] }
  }

  // 4. Dedup against existing job_listings
  const hashes = allRawJobs.map(j => generateDedupHash(j.title, j.company, j.location))
  const { data: existingRows } = await supabaseAdmin
    .from('job_listings')
    .select('dedup_hash')
    .in('dedup_hash', hashes)

  const existingHashes = new Set((existingRows || []).map(r => r.dedup_hash))
  const newJobs = filterNewJobs(allRawJobs, existingHashes)

  console.log(`[Batch] ${newJobs.length} new jobs after dedup`)

  if (newJobs.length === 0) {
    return { insertedJobIds: [] }
  }

  // 5. Upsert into job_listings
  // Note: Don't pass `id` - let database generate UUID with gen_random_uuid()
  const rows = newJobs.map(job => {
    const workTypeResult = detectWorkTypeWithDetails(
      job.title,
      job.description,
      job.is_remote
    )

    // Store matched keyword in source_metadata for analysis
    const metadata = {
      ...(job.source_metadata || {}),
      ...(workTypeResult.matchedKeyword && {
        work_type_keyword: workTypeResult.matchedKeyword,
        work_type_confidence: workTypeResult.confidence,
      }),
    }

    return {
      title: job.title,
      company: job.company,
      location: job.location || null,
      remote_type: workTypeResult.type,
      description: job.description || null,
      requirements: null,
      salary_min: job.salary_min || null,
      salary_max: job.salary_max || null,
      salary_currency: job.salary_currency || 'PLN',
      salary_type: 'monthly',
      source: job.source,
      source_id: job.external_id || null,
      source_url: job.url,
      dedup_hash: generateDedupHash(job.title, job.company, job.location),
      company_logo_url: job.company_logo_url || null,
      skills: [],
      experience_level: job.experience_level || null,
      employment_type: job.employment_type || null,
      posted_at: job.posted_at || null,
      expires_at: null,
      source_metadata: Object.keys(metadata).length > 0 ? metadata : null,
    }
  })

  const { data: insertedRows, error: insertError } = await supabaseAdmin
    .from('job_listings')
    .upsert(rows, { onConflict: 'dedup_hash' })
    .select('id')

  if (insertError) {
    console.error('[Batch] Insert error:', insertError)
    return { insertedJobIds: [] }
  }

  const insertedJobIds = (insertedRows || []).map(r => r.id)
  console.log(`[Batch] Inserted ${insertedJobIds.length} new jobs`)

  return { insertedJobIds }
}

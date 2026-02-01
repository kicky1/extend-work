import { supabaseAdmin } from '@/lib/supabase/admin'
import { buildCVSummary } from '@/lib/ai/cv-summary'
import { scoreJobBatch } from './matcher'

const BATCH_SIZE = 5
const MIN_SCORE_THRESHOLD = 40

export async function runMatchingBatch(newJobIds?: string[]): Promise<void> {
  // Get all users with job_preferences
  const { data: prefsData, error: prefsError } = await supabaseAdmin
    .from('job_preferences')
    .select('user_id, target_roles, target_locations')

  if (prefsError || !prefsData || prefsData.length === 0) {
    console.log('[Matching] No user preferences found')
    return
  }

  // Group preferences by user
  const userPrefs = new Map<string, { roles: string[]; locations: string[] }>()
  for (const pref of prefsData) {
    const existing = userPrefs.get(pref.user_id)
    if (existing) {
      existing.roles.push(...(pref.target_roles || []))
      existing.locations.push(...(pref.target_locations || []))
    } else {
      userPrefs.set(pref.user_id, {
        roles: [...(pref.target_roles || [])],
        locations: [...(pref.target_locations || [])],
      })
    }
  }

  for (const [userId, prefs] of userPrefs) {
    try {
      await matchJobsForUser(userId, prefs, newJobIds)
    } catch (error) {
      console.error(`[Matching] Failed for user ${userId}:`, error)
    }
  }
}

async function matchJobsForUser(
  userId: string,
  prefs: { roles: string[]; locations: string[] },
  newJobIds?: string[]
): Promise<void> {
  // Load user's latest CV
  const { data: cvRow, error: cvError } = await supabaseAdmin
    .from('cvs')
    .select('data')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (cvError || !cvRow?.data) {
    return // No CV, skip
  }

  const cvSummary = buildCVSummary(cvRow.data)

  // Build query for jobs matching user preferences
  let query = supabaseAdmin
    .from('job_listings')
    .select('id, title, company, description, location')

  if (newJobIds && newJobIds.length > 0) {
    query = query.in('id', newJobIds)
  }

  // Filter by role keywords if available
  if (prefs.roles.length > 0) {
    const roleFilters = prefs.roles
      .map(role => `title.ilike.%${role}%`)
      .join(',')
    query = query.or(roleFilters)
  }

  query = query.limit(50)

  const { data: jobs, error: jobsError } = await query
  if (jobsError || !jobs || jobs.length === 0) return

  // Already matched jobs for this user
  const { data: existingMatches } = await supabaseAdmin
    .from('saved_jobs')
    .select('job_listing_id')
    .eq('user_id', userId)
    .in('job_listing_id', jobs.map(j => j.id))

  const existingIds = new Set((existingMatches || []).map(m => m.job_listing_id))
  const jobsToScore = jobs.filter(j => !existingIds.has(j.id))

  if (jobsToScore.length === 0) return

  // Score in batches
  for (let i = 0; i < jobsToScore.length; i += BATCH_SIZE) {
    const batch = jobsToScore.slice(i, i + BATCH_SIZE)

    try {
      const scores = await scoreJobBatch(
        cvSummary,
        batch.map(j => ({
          id: j.id,
          title: j.title,
          company: j.company,
          description: j.description || '',
        }))
      )

      // Upsert matches above threshold
      const matchRows = scores
        .filter(s => s.score >= MIN_SCORE_THRESHOLD)
        .map(s => ({
          user_id: userId,
          job_listing_id: s.jobId,
          is_bookmarked: false,
          auto_matched: true,
          compatibility_score: s.score,
          matching_skills: s.matchingSkills,
          missing_skills: s.missingSkills,
        }))

      if (matchRows.length > 0) {
        await supabaseAdmin
          .from('saved_jobs')
          .upsert(matchRows, { onConflict: 'user_id,job_listing_id' })
      }
    } catch (error) {
      console.error(`[Matching] Batch scoring failed:`, error)
    }
  }
}

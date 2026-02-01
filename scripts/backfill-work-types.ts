/**
 * Backfill script to update work types for existing jobs with remote_type = 'any'
 *
 * Usage:
 *   npx tsx scripts/backfill-work-types.ts
 *   npx tsx scripts/backfill-work-types.ts --dry-run
 */

import { createClient } from '@supabase/supabase-js'
import { detectWorkTypeWithDetails } from '../lib/services/job-batch/work-type-detector'

const BATCH_SIZE = 100

async function main() {
  const isDryRun = process.argv.includes('--dry-run')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log(`Starting work type backfill${isDryRun ? ' (DRY RUN)' : ''}...`)

  // Get count first
  const { count, error: countError } = await supabase
    .from('job_listings')
    .select('*', { count: 'exact', head: true })
    .eq('remote_type', 'any')

  if (countError) {
    console.error('Error getting count:', countError)
    process.exit(1)
  }

  console.log(`Found ${count} jobs with remote_type = 'any'`)

  if (count === 0) {
    console.log('No jobs to update')
    return
  }

  const stats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    byType: { remote: 0, hybrid: 0, onsite: 0, any: 0 } as Record<string, number>,
  }

  let offset = 0

  while (offset < (count || 0)) {
    // Fetch batch
    const { data: jobs, error } = await supabase
      .from('job_listings')
      .select('id, title, description, source_metadata')
      .eq('remote_type', 'any')
      .range(offset, offset + BATCH_SIZE - 1)

    if (error) {
      console.error('Error fetching jobs:', error)
      process.exit(1)
    }

    if (!jobs || jobs.length === 0) break

    const updates: Array<{
      id: string
      remote_type: string
      source_metadata: Record<string, unknown> | null
    }> = []

    for (const job of jobs) {
      const result = detectWorkTypeWithDetails(job.title, job.description || undefined)

      stats.processed++

      if (result.type !== 'any') {
        stats.byType[result.type]++
        stats.updated++

        const metadata = {
          ...(job.source_metadata || {}),
          ...(result.matchedKeyword && {
            work_type_keyword: result.matchedKeyword,
            work_type_confidence: result.confidence,
          }),
        }

        updates.push({
          id: job.id,
          remote_type: result.type,
          source_metadata: Object.keys(metadata).length > 0 ? metadata : null,
        })
      } else {
        stats.skipped++
        stats.byType.any++
      }
    }

    // Batch update
    if (!isDryRun && updates.length > 0) {
      for (const update of updates) {
        const { error: updateError } = await supabase
          .from('job_listings')
          .update({
            remote_type: update.remote_type,
            source_metadata: update.source_metadata,
          })
          .eq('id', update.id)

        if (updateError) {
          console.error(`Error updating job ${update.id}:`, updateError)
        }
      }
    }

    console.log(
      `Processed ${stats.processed}/${count} jobs. ` +
        `Updates this batch: ${updates.length}`
    )

    offset += BATCH_SIZE
  }

  console.log('\n--- Summary ---')
  console.log(`Total processed: ${stats.processed}`)
  console.log(`Updated: ${stats.updated}`)
  console.log(`Skipped (still 'any'): ${stats.skipped}`)
  console.log('\nBy type:')
  console.log(`  remote: ${stats.byType.remote}`)
  console.log(`  hybrid: ${stats.byType.hybrid}`)
  console.log(`  onsite: ${stats.byType.onsite}`)
  console.log(`  any (no match): ${stats.byType.any}`)

  if (isDryRun) {
    console.log('\n(DRY RUN - no changes were made)')
  }
}

main().catch(console.error)

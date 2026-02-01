import type { JobApiAdapter, JobApiQuery, RawJobResult } from './types'
import { adzunaAdapter } from './adzuna'
import { joobleAdapter } from './jooble'
import { jsearchAdapter } from './jsearch'

// Provider priority order - most reliable first
// Adzuna: best rate limits, most reliable
// JSearch: good fallback
// Jooble: often 403s, use as last resort
const allAdapters: JobApiAdapter[] = [adzunaAdapter, jsearchAdapter, joobleAdapter]

export function getAvailableAdapters(): JobApiAdapter[] {
  return allAdapters.filter(a => a.isAvailable())
}

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function searchAllApis(query: JobApiQuery): Promise<RawJobResult[]> {
  const adapters = getAvailableAdapters()
  if (adapters.length === 0) {
    console.warn('[Job APIs] No adapters available — check env vars')
    return []
  }

  // Throttled sequential search to avoid rate limits
  // Run providers sequentially with 500ms delay between calls
  // Skip less reliable providers if we have enough results
  const results: RawJobResult[] = []
  const EARLY_EXIT_THRESHOLD = 100 // If we get 100+ jobs from first providers, skip remaining

  for (let i = 0; i < adapters.length; i++) {
    const adapter = adapters[i]

    // Skip Jooble (last provider) if we already have enough results
    if (adapter.name === 'Jooble' && results.length >= EARLY_EXIT_THRESHOLD) {
      console.log(`[Job APIs] Skipping ${adapter.name} - already have ${results.length} results`)
      continue
    }

    try {
      // Add delay between API calls (except for the first one)
      if (i > 0) {
        await delay(500)
      }

      const adapterResults = await adapter.search(query)
      results.push(...adapterResults)
      console.log(`[Job APIs] ${adapter.name}: ${adapterResults.length} results (total: ${results.length})`)
    } catch (error) {
      console.error(`[Job APIs] ${adapter.name} failed:`, error)
    }
  }

  return results
}

export type { JobApiQuery, RawJobResult, JobApiAdapter } from './types'

import type { JobApiQuery } from '@/lib/services/job-apis'

interface JobPreferencesRow {
  target_roles: string[]
  target_locations: string[]
}

export function buildBatchQueries(preferences: JobPreferencesRow[]): JobApiQuery[] {
  const seen = new Set<string>()
  const queries: JobApiQuery[] = []

  for (const pref of preferences) {
    const roles = pref.target_roles?.length ? pref.target_roles : ['']
    const locations = pref.target_locations?.length ? pref.target_locations : ['']

    for (const role of roles) {
      for (const location of locations) {
        const key = `${role.toLowerCase().trim()}|${location.toLowerCase().trim()}`
        if (seen.has(key)) continue
        seen.add(key)

        queries.push({
          keywords: role,
          location: location || undefined,
          resultsPerPage: 20,
        })
      }
    }
  }

  return queries
}

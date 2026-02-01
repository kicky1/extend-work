import type { RawJobResult } from '@/lib/services/job-apis'

/**
 * Normalizes a string for deduplication by removing special chars and extra spaces
 */
function normalize(s: string | undefined): string {
  if (!s) return ''
  return s.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ')
}

/**
 * Normalizes company name by removing common suffixes like Inc, LLC, Ltd, Corp
 */
function normalizeCompany(company: string): string {
  const normalized = normalize(company)
  return normalized.replace(/\s+(inc|llc|ltd|corp|limited|corporation|gmbh|sp z oo|sa|ag)$/i, '')
}

/**
 * Normalizes location by extracting just the city name
 * Handles variations like "London, UK", "London, England, United Kingdom", "Londyn"
 */
function normalizeLocation(location: string | undefined): string {
  if (!location) return ''

  // Get the first part (usually city name)
  const parts = location.split(/[,\-]/).map(p => p.trim()).filter(Boolean)
  const city = parts[0] || ''

  // Normalize to base form
  let normalized = normalize(city)

  // Handle common location variations/translations
  const locationMap: Record<string, string> = {
    'londyn': 'london',
    'warszawa': 'warsaw',
    'krakow': 'krakow',
    'kraków': 'krakow',
    'wroclaw': 'wroclaw',
    'wrocław': 'wroclaw',
    'poznan': 'poznan',
    'poznań': 'poznan',
    'gdansk': 'gdansk',
    'gdańsk': 'gdansk',
    'new york city': 'new york',
    'nyc': 'new york',
    'sf': 'san francisco',
    'la': 'los angeles',
  }

  return locationMap[normalized] || normalized
}

export function generateDedupHash(title: string, company: string, location?: string): string {
  const normalizedTitle = normalize(title)
  const normalizedCompany = normalizeCompany(company)
  const normalizedLocation = normalizeLocation(location)

  return `${normalizedTitle}-${normalizedCompany}-${normalizedLocation}`
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

export function filterNewJobs(
  jobs: RawJobResult[],
  existingHashes: Set<string>
): RawJobResult[] {
  const seen = new Set<string>()

  return jobs.filter(job => {
    const hash = generateDedupHash(job.title, job.company, job.location)
    if (existingHashes.has(hash) || seen.has(hash)) return false
    seen.add(hash)
    return true
  })
}

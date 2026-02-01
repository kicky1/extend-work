import type { JobApiAdapter, JobApiQuery, RawJobResult } from './types'

// Jooble uses country subdomains - map common locations to country codes
const JOOBLE_COUNTRY_MAP: Record<string, string> = {
  // Country names
  'united kingdom': 'uk', 'uk': 'uk', 'england': 'uk', 'scotland': 'uk', 'wales': 'uk',
  'united states': 'us', 'usa': 'us', 'america': 'us',
  'australia': 'au',
  'austria': 'at',
  'belgium': 'be',
  'brazil': 'br',
  'canada': 'ca',
  'switzerland': 'ch',
  'germany': 'de', 'deutschland': 'de',
  'spain': 'es', 'españa': 'es',
  'france': 'fr',
  'india': 'in',
  'italy': 'it', 'italia': 'it',
  'mexico': 'mx', 'méxico': 'mx',
  'netherlands': 'nl', 'holland': 'nl',
  'new zealand': 'nz',
  'poland': 'pl', 'polska': 'pl',
  'russia': 'ru',
  'singapore': 'sg',
  'south africa': 'za',
  // Polish cities
  'gdansk': 'pl', 'gdańsk': 'pl', 'warsaw': 'pl', 'warszawa': 'pl',
  'krakow': 'pl', 'kraków': 'pl', 'cracow': 'pl',
  'wroclaw': 'pl', 'wrocław': 'pl', 'breslau': 'pl',
  'poznan': 'pl', 'poznań': 'pl', 'lodz': 'pl', 'łódź': 'pl',
  'katowice': 'pl', 'szczecin': 'pl', 'lublin': 'pl', 'bydgoszcz': 'pl',
  'bialystok': 'pl', 'białystok': 'pl', 'gdynia': 'pl', 'sopot': 'pl',
  'trojmiasto': 'pl', 'trójmiasto': 'pl', 'tri-city': 'pl',
  // UK cities
  'london': 'uk', 'manchester': 'uk', 'birmingham': 'uk', 'leeds': 'uk',
  'glasgow': 'uk', 'liverpool': 'uk', 'bristol': 'uk', 'edinburgh': 'uk',
  // US cities
  'new york': 'us', 'los angeles': 'us', 'chicago': 'us', 'houston': 'us',
  'phoenix': 'us', 'san antonio': 'us', 'san diego': 'us', 'dallas': 'us',
  'san jose': 'us', 'austin': 'us', 'san francisco': 'us', 'seattle': 'us',
  'denver': 'us', 'boston': 'us', 'atlanta': 'us', 'miami': 'us',
  // German cities
  'berlin': 'de', 'munich': 'de', 'münchen': 'de', 'hamburg': 'de',
  'frankfurt': 'de', 'cologne': 'de', 'köln': 'de', 'düsseldorf': 'de',
  // Note: "remote" is handled separately - don't map to single country
}

const CURRENCY_MAP: Record<string, string> = {
  us: 'USD', ca: 'CAD', uk: 'GBP', au: 'AUD', nz: 'NZD',
  pl: 'PLN', de: 'EUR', fr: 'EUR', it: 'EUR', es: 'EUR',
  nl: 'EUR', be: 'EUR', at: 'EUR', ch: 'CHF', br: 'BRL',
  mx: 'MXN', in: 'INR', sg: 'SGD', za: 'ZAR', ru: 'RUB',
}

function detectCurrency(countryCode: string): string {
  return CURRENCY_MAP[countryCode] || 'USD'
}

function normalizeEmploymentType(type: string | undefined): string | undefined {
  if (!type) return undefined
  const normalized = type.toLowerCase().trim()
  if (normalized.includes('full')) return 'full-time'
  if (normalized.includes('part')) return 'part-time'
  if (normalized.includes('contract')) return 'contract'
  if (normalized.includes('intern')) return 'internship'
  if (normalized.includes('temp')) return 'temporary'
  return normalized
}

function detectCountryCode(location: string | undefined): string | null {
  if (!location) return null

  const locationLower = location.toLowerCase()

  // Check direct matches first
  for (const [pattern, code] of Object.entries(JOOBLE_COUNTRY_MAP)) {
    if (locationLower.includes(pattern)) {
      return code
    }
  }

  // Check for country code suffixes like "London, UK" or "Warsaw, PL"
  const suffixMatch = locationLower.match(/,\s*([a-z]{2})$/)
  if (suffixMatch) {
    const suffix = suffixMatch[1]
    const validCodes = new Set(Object.values(JOOBLE_COUNTRY_MAP))
    if (validCodes.has(suffix)) {
      return suffix
    }
  }

  return null
}

export const joobleAdapter: JobApiAdapter = {
  name: 'jooble',

  isAvailable() {
    return !!process.env.JOOBLE_API_KEY
  },

  async search(query: JobApiQuery): Promise<RawJobResult[]> {
    const apiKey = process.env.JOOBLE_API_KEY

    if (!apiKey) {
      console.error('[Jooble] Missing JOOBLE_API_KEY env var')
      return []
    }

    // Detect country from location, skip if we can't determine it
    const country = query.country || detectCountryCode(query.location)
    if (!country) {
      console.log(`[Jooble] Skipping - cannot determine country from location: "${query.location}"`)
      return []
    }

    const page = query.page || 1
    const url = `https://${country}.jooble.org/api/${apiKey}`
    console.log(`[Jooble] Fetching (${country}): ${query.keywords}`)

    // Retry logic for transient errors (429 rate limit, 5xx server errors)
    let res: Response
    for (let attempt = 0; attempt < 3; attempt++) {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: query.keywords,
          location: query.location || '',
          page: String(page),
        }),
      })
      // Retry on rate limit or server errors
      if ((res.status === 429 || res.status >= 500) && attempt < 2) {
        const delay = 1000 * (attempt + 1)
        console.log(`[Jooble] Error ${res.status}, waiting ${delay}ms before retry...`)
        await new Promise(r => setTimeout(r, delay))
        continue
      }
      break
    }

    if (!res!.ok) {
      const errorText = await res!.text().catch(() => 'Unknown error')
      // For 403, likely Cloudflare blocking - log briefly
      if (res!.status === 403) {
        console.error(`[Jooble] Blocked (403) for country ${country} - may need API key refresh`)
      } else {
        console.error(`[Jooble] API error ${res!.status}: ${errorText.slice(0, 200)}`)
      }
      return []
    }

    const data = await res!.json()
    const results: RawJobResult[] = (data.jobs || []).map((item: any) => ({
      title: item.title || '',
      company: item.company || 'Unknown',
      location: item.location,
      description: item.snippet,
      url: item.link || '',
      salary_min: parseSalary(item.salary)?.min,
      salary_max: parseSalary(item.salary)?.max,
      salary_currency: detectCurrency(country),
      posted_at: item.updated,
      source: 'jooble' as const,
      // Additional extracted fields
      external_id: item.id?.toString(),
      employment_type: normalizeEmploymentType(item.type),
      original_source: item.source,
    }))

    return results
  },
}

function parseSalary(salary: string | undefined): { min?: number; max?: number } | undefined {
  if (!salary) return undefined
  const numbers = salary.match(/[\d,]+/g)?.map(n => parseInt(n.replace(/,/g, ''), 10))
  if (!numbers || numbers.length === 0) return undefined
  return {
    min: numbers[0],
    max: numbers.length > 1 ? numbers[1] : undefined,
  }
}

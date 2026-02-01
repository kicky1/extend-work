import type { JobApiAdapter, JobApiQuery, RawJobResult } from './types'

// Adzuna supported countries mapped from common location patterns
const ADZUNA_COUNTRY_MAP: Record<string, string> = {
  // Country names
  'united kingdom': 'gb', 'uk': 'gb', 'england': 'gb', 'scotland': 'gb', 'wales': 'gb',
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
  'london': 'gb', 'manchester': 'gb', 'birmingham': 'gb', 'leeds': 'gb',
  'glasgow': 'gb', 'liverpool': 'gb', 'bristol': 'gb', 'edinburgh': 'gb',
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
  us: 'USD', ca: 'CAD', gb: 'GBP', au: 'AUD', nz: 'NZD',
  pl: 'PLN', de: 'EUR', fr: 'EUR', it: 'EUR', es: 'EUR',
  nl: 'EUR', be: 'EUR', at: 'EUR', ch: 'CHF', br: 'BRL',
  mx: 'MXN', in: 'INR', sg: 'SGD', za: 'ZAR', ru: 'RUB',
}

function detectCurrency(countryCode: string): string {
  return CURRENCY_MAP[countryCode] || 'USD'
}

function detectCountryCode(location: string | undefined): string | null {
  if (!location) return null

  const locationLower = location.toLowerCase()

  // Check direct matches first
  for (const [pattern, code] of Object.entries(ADZUNA_COUNTRY_MAP)) {
    if (locationLower.includes(pattern)) {
      return code
    }
  }

  // Check for country code suffixes like "London, GB" or "New York, US"
  const suffixMatch = locationLower.match(/,\s*([a-z]{2})$/)
  if (suffixMatch) {
    const suffix = suffixMatch[1]
    const validCodes = new Set(Object.values(ADZUNA_COUNTRY_MAP))
    if (validCodes.has(suffix)) {
      return suffix
    }
  }

  return null
}

export const adzunaAdapter: JobApiAdapter = {
  name: 'adzuna',

  isAvailable() {
    return !!(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY)
  },

  async search(query: JobApiQuery): Promise<RawJobResult[]> {
    const appId = process.env.ADZUNA_APP_ID
    const appKey = process.env.ADZUNA_APP_KEY

    if (!appId || !appKey) {
      console.error('[Adzuna] Missing API credentials')
      return []
    }

    // Detect country from location, skip if we can't determine it
    let country = query.country || detectCountryCode(query.location)
    if (!country) {
      console.log(`[Adzuna] Skipping - cannot determine country from location: "${query.location}"`)
      return []
    }
    // Adzuna uses 'gb' for UK, normalize if needed
    if (country === 'uk') country = 'gb'

    const page = query.page || 1
    const resultsPerPage = query.resultsPerPage || 20

    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      what: query.keywords,
      results_per_page: String(resultsPerPage),
    })

    if (query.location && query.location.toLowerCase() !== 'remote') {
      params.set('where', query.location)
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?${params}`
    console.log(`[Adzuna] Fetching (${country}): ${query.keywords}`)

    // Retry logic for rate limiting
    let res: Response
    for (let attempt = 0; attempt < 3; attempt++) {
      res = await fetch(url)
      if (res.status === 429 && attempt < 2) {
        const delay = 1000 * (attempt + 1) // 1s, 2s backoff
        console.log(`[Adzuna] Rate limited (429), waiting ${delay}ms before retry...`)
        await new Promise(r => setTimeout(r, delay))
        continue
      }
      break
    }

    if (!res!.ok) {
      const errorText = await res!.text().catch(() => 'Unknown error')
      console.error(`[Adzuna] API error ${res!.status}: ${errorText.slice(0, 200)}`)
      return []
    }

    const data = await res!.json()
    const results: RawJobResult[] = (data.results || []).map((item: any) => ({
      title: item.title || '',
      company: item.company?.display_name || 'Unknown',
      location: item.location?.display_name,
      description: item.description,
      url: item.redirect_url || item.adref || '',
      salary_min: item.salary_min,
      salary_max: item.salary_max,
      salary_currency: detectCurrency(country),
      posted_at: item.created,
      source: 'adzuna' as const,
      // Enhanced fields
      employment_type: item.contract_time === 'full_time' ? 'full-time'
        : item.contract_time === 'part_time' ? 'part-time' : item.contract_type,
      category: item.category?.label,
      // Additional extracted fields
      external_id: item.id?.toString(),
      category_tag: item.category?.tag,
      company_canonical: item.company?.canonical_name,
      contract_type: item.contract_type,
      source_metadata: {
        salary_is_predicted: item.salary_is_predicted,
        adref: item.adref,
        latitude: item.latitude,
        longitude: item.longitude,
        location_areas: item.location?.area,
      },
    }))

    return results
  },
}

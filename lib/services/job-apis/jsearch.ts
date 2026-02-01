import type { JobApiAdapter, JobApiQuery, RawJobResult } from './types'

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout
    try {
      const res = await fetch(url, { ...options, signal: controller.signal })
      clearTimeout(timeoutId)
      if (res.status === 504 && i < retries) {
        console.log(`[JSearch] Got 504, retrying (attempt ${i + 2}/${retries + 1})...`)
        await new Promise((r) => setTimeout(r, 500 * (i + 1)))
        continue
      }
      return res
    } catch (e) {
      clearTimeout(timeoutId)
      if (i < retries) {
        const isTimeout = e instanceof Error && e.name === 'AbortError'
        console.log(
          `[JSearch] ${isTimeout ? 'Timeout' : 'Error'}, retrying (attempt ${i + 2}/${retries + 1})...`
        )
        await new Promise((r) => setTimeout(r, 500 * (i + 1)))
        continue
      }
      throw e
    }
  }
  // TypeScript: unreachable but needed for type safety
  throw new Error('[JSearch] fetchWithRetry: unexpected exit')
}

export const jsearchAdapter: JobApiAdapter = {
  name: 'jsearch',

  isAvailable() {
    return !!process.env.JSEARCH_API_KEY
  },

  async search(query: JobApiQuery): Promise<RawJobResult[]> {
    const page = query.page || 1
    const searchQuery = query.location
      ? `${query.keywords} in ${query.location}`
      : query.keywords

    const apiKey = process.env.JSEARCH_API_KEY

    if (!apiKey) {
      console.error('[JSearch] JSEARCH_API_KEY not found in environment')
      return []
    }

    const params = new URLSearchParams({
      query: searchQuery,
      page: String(page),
      num_pages: '10', // Request 10 pages for ~100 results
    })

    const res = await fetchWithRetry(
      `https://api.openwebninja.com/jsearch/search?${params}`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`[JSearch] API error ${res.status}: ${errorText}`)
      return []
    }

    const data = await res.json()
    const results: RawJobResult[] = (data.data || []).map((item: any) => ({
      title: item.job_title || '',
      company: item.employer_name || 'Unknown',
      location: [item.job_city, item.job_state, item.job_country]
        .filter(Boolean)
        .join(', ') || undefined,
      description: item.job_description,
      url: item.job_apply_link || item.job_google_link || '',
      salary_min: item.job_min_salary,
      salary_max: item.job_max_salary,
      salary_currency: item.job_salary_currency || 'USD',
      posted_at: item.job_posted_at_datetime_utc,
      source: 'jsearch' as const,
      // Enhanced fields
      company_logo_url: item.employer_logo,
      employment_type: item.job_employment_type,
      experience_level: item.job_required_experience?.required_experience_in_months
        ? (item.job_required_experience.required_experience_in_months <= 24 ? 'junior'
          : item.job_required_experience.required_experience_in_months <= 60 ? 'mid' : 'senior')
        : undefined,
      is_remote: item.job_is_remote,
      apply_link: item.job_apply_link,
    }))

    return results
  },
}

export interface JobApiQuery {
  keywords: string
  location?: string
  country?: string // ISO 2-letter code (default: 'pl')
  page?: number
  resultsPerPage?: number
}

export interface RawJobResult {
  title: string
  company: string
  location?: string
  description?: string
  url: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  posted_at?: string
  source: 'adzuna' | 'jooble' | 'jsearch'
  // Enhanced fields
  company_logo_url?: string
  employment_type?: string // full-time, part-time, contract, etc.
  experience_level?: string // entry_level, mid_senior_level, etc.
  is_remote?: boolean
  apply_link?: string // Direct application link
  category?: string // Job category
  // Additional extracted fields
  external_id?: string // Source API's job ID
  category_tag?: string // Machine-readable category (Adzuna)
  company_canonical?: string // Normalized company name (Adzuna)
  contract_type?: string // permanent/contract (Adzuna)
  original_source?: string // Where job was originally posted (Jooble)
  source_metadata?: Record<string, unknown> // Extra API-specific data
}

export interface JobApiAdapter {
  name: string
  search(query: JobApiQuery): Promise<RawJobResult[]>
  isAvailable(): boolean
}

import { generateObject } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage } from '@/lib/ai/usage-guard'
import { searchAllApis, type RawJobResult } from '@/lib/services/job-apis'
import { generateDedupHash, filterNewJobs } from '@/lib/services/job-batch/dedup'
import { jobListingFromRow } from '@/lib/types/job'
import type { CVData } from '@/lib/types/cv'
import type { RemotePreference, EmploymentType, JobListing } from '@/lib/types/job'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sanitizePostgrestValue } from '@/lib/utils/postgrest-sanitize'
import crypto from 'crypto'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Progress event types for streaming
export type ProgressStage = 'auth' | 'analyzing' | 'detecting' | 'searching' | 'inserting' | 'scoring' | 'complete' | 'error'

export interface ProgressEvent {
  stage: ProgressStage
  message: string
  progress: number
  details?: {
    totalApis?: number
    completedApis?: number
    jobsFound?: number
    jobsInserted?: number
    jobsScored?: number
    cached?: boolean
  }
  data?: unknown // Final data payload for 'complete' stage
  error?: string // Error message for 'error' stage
}

// Helper to create SSE data string
function sseEvent(event: ProgressEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

// P2: Enhanced CV analysis schema
// Note: Anthropic API doesn't support maxItems, so we use .describe() to communicate limits
const JobSearchCriteriaSchema = z.object({
  searchQueries: z.array(z.string()).min(1)
    .describe('3-4 job search query variants (max 4): (1) primary role title, (2) generic variant, (3) tech-specific, (4) industry+role if domain detected. Each 2-4 words.'),
  roleVariants: z.array(z.string())
    .describe('Alternative job titles the candidate could apply for, e.g. "Frontend Developer", "UI Engineer", "React Developer"'),
  industryDomain: z.string().nullable()
    .describe('Primary industry domain if detectable from experience: fintech, healthcare, e-commerce, saas, gaming, etc. Null if not clear.'),
  yearsExperience: z.number()
    .describe('Total years of professional experience as a number'),
  skills: z.array(z.string()).describe('All technical skills from the CV'),
  primarySkills: z.array(z.string())
    .describe('Top 5 most important/recent skills that define the candidate (exactly 5 skills)'),
  secondarySkills: z.array(z.string())
    .describe('Other skills the candidate is familiar with but are not their main focus'),
  experienceLevel: z.enum(['junior', 'mid', 'senior'])
    .describe('Experience level: junior (0-2 years), mid (2-5 years), senior (5+ years)'),
})

type JobSearchCriteria = z.infer<typeof JobSearchCriteriaSchema>

// User preferences from DB (snake_case)
interface JobPreferencesRow {
  user_id: string
  target_roles: string[]
  target_locations: string[]
  remote_preference: RemotePreference
  min_salary: number | null
  max_salary: number | null
  salary_currency: string
  required_skills: string[]
  preferred_skills: string[]
  experience_level: string | null
  employment_types: string[]
}

// Scored job result type
interface ScoredJob extends JobListing {
  compatibilityScore: number
}

const CACHE_TTL_HOURS = 24

// Schema for AI-based country detection
const CountryDetectionSchema = z.object({
  countries: z.array(z.object({
    location: z.string().describe('The original location string'),
    country_code: z.string().nullable().describe('ISO 2-letter country code (lowercase): us, uk, pl, de, etc. Use "uk" for United Kingdom. Null if cannot determine.'),
  })),
  primary_country: z.string().nullable().describe('The most likely country code for this user based on all locations. Null if cannot determine.'),
})

// Use Haiku to detect countries from location strings
async function detectCountriesWithAI(locations: string[]): Promise<{
  locationCountries: Map<string, string | null>
  primaryCountry: string | null
}> {
  const validLocations = locations.filter(l => l && l.length >= 2 && l.toLowerCase() !== 'remote')

  if (validLocations.length === 0) {
    return { locationCountries: new Map(), primaryCountry: null }
  }

  try {
    const { object } = await generateObject({
      model: anthropic(process.env.ANTHROPIC_MODEL_FAST || 'claude-3-5-haiku-latest'),
      schema: CountryDetectionSchema,
      prompt: `Detect the country for each location. Return ISO 2-letter country codes in lowercase.
Use "uk" for United Kingdom (not "gb").
Use "us" for United States.
Use "pl" for Poland.
Use "de" for Germany.

Locations to analyze:
${validLocations.map((loc, i) => `${i + 1}. "${loc}"`).join('\n')}

For each location, determine which country it's in based on the city name, region, or country mentioned.
Also determine the primary_country - the user's most likely country based on all locations.`,
    })

    const locationCountries = new Map<string, string | null>()
    for (const item of object.countries) {
      locationCountries.set(item.location, item.country_code)
    }

    return {
      locationCountries,
      primaryCountry: object.primary_country,
    }
  } catch (error) {
    console.error('[Recommend] AI country detection failed:', error)
    return { locationCountries: new Map(), primaryCountry: null }
  }
}

function generateCVHash(cvData: CVData, prefs: JobPreferencesRow | null): string {
  const relevantData = {
    personalInfo: cvData.personalInfo,
    skills: cvData.skills,
    experience: cvData.workExperience,
    // Include preferences in hash so cache invalidates when preferences change
    preferences: prefs ? {
      targetRoles: prefs.target_roles,
      remotePreference: prefs.remote_preference,
      minSalary: prefs.min_salary,
      employmentTypes: prefs.employment_types,
    } : null,
  }
  return crypto.createHash('sha256').update(JSON.stringify(relevantData)).digest('hex').slice(0, 32)
}

export async function POST(request: NextRequest) {
  // Parse request body before starting stream
  let cvData: CVData
  try {
    const body = await request.json()
    cvData = body.cvData
    if (!cvData) {
      return NextResponse.json({ error: 'CV data is required' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Create a streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: ProgressEvent) => {
        controller.enqueue(new TextEncoder().encode(sseEvent(event)))
      }

      try {
        // Stage: auth (0-5%)
        send({ stage: 'auth', message: 'Checking authorization...', progress: 0 })

        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          send({ stage: 'error', message: 'Unauthorized', progress: 0, error: 'Unauthorized' })
          controller.close()
          return
        }

        const usageCheck = await checkCanUseAI(user.id)
        if (!usageCheck.allowed) {
          const message = usageCheck.reason === 'not_pro'
            ? 'AI recommendations require a Pro subscription'
            : 'You have reached your monthly AI usage limit'
          send({ stage: 'error', message, progress: 0, error: message })
          controller.close()
          return
        }

        send({ stage: 'auth', message: 'Checking cache...', progress: 3 })

        // Load user preferences
        const { data: prefsRow } = await supabaseAdmin
          .from('job_preferences')
          .select('id, user_id, target_roles, target_locations, remote_preference, min_salary, max_salary, salary_currency, required_skills, preferred_skills, experience_level, employment_types, email_alerts, alert_frequency, created_at, updated_at')
          .eq('user_id', user.id)
          .single()

        const userPrefs: JobPreferencesRow | null = prefsRow

        // Check cache
        const cvHash = generateCVHash(cvData, userPrefs)
        console.log('[Recommend] Request info:', {
          cvHash: cvHash.slice(0, 8) + '...',
          cvLocation: cvData.personalInfo.location,
          prefLocations: userPrefs?.target_locations,
        })

        const { data: cachedResult } = await supabaseAdmin
          .from('job_recommendation_cache')
          .select('recommendations, search_terms')
          .eq('user_id', user.id)
          .eq('cv_hash', cvHash)
          .gte('created_at', new Date(Date.now() - CACHE_TTL_HOURS * 60 * 60 * 1000).toISOString())
          .single()

        if (cachedResult) {
          console.log('[Recommend] Cache hit, returning cached results')
          send({
            stage: 'complete',
            message: 'Loaded from cache',
            progress: 100,
            details: { cached: true, jobsFound: cachedResult.recommendations?.length || 0 },
            data: {
              recommendations: cachedResult.recommendations,
              searchTerms: cachedResult.search_terms,
              cached: true,
            },
          })
          controller.close()
          return
        }

        // Stage: analyzing (5-25%)
        send({ stage: 'analyzing', message: 'Analyzing your CV with AI...', progress: 5 })

        const cvText = buildCVText(cvData)
        const prefsContext = userPrefs ? buildPreferencesContext(userPrefs) : ''

        send({ stage: 'analyzing', message: 'Extracting skills and experience...', progress: 10 })

        const { object: searchCriteria, usage } = await generateObject({
          model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
          schema: JobSearchCriteriaSchema,
          prompt: `Analyze this CV and generate job search criteria.

CV Content:
${cvText}
${prefsContext}

Generate:
1. 3-4 SHORT search queries (2-4 words each):
   - Primary role from CV/preferences (e.g., "Senior Frontend Developer")
   - Generic variant (e.g., "Frontend Engineer")
   - Tech-specific (e.g., "React Developer")
   - Industry+role if domain detected (e.g., "Fintech Frontend")

2. Role variants - alternative job titles this person could apply for

3. Industry domain if detectable from work history (fintech, healthcare, e-commerce, saas, gaming, etc.)

4. Years of experience as a number

5. Skills split into primary (top 5 defining skills) and secondary

6. Experience level based on years and titles:
   - junior: 0-2 years, entry-level, intern, trainee
   - mid: 2-5 years, regular positions
   - senior: 5+ years, senior/lead/principal/staff/architect titles

NO boolean operators. NO long phrases.
Good: "React Developer", "Senior Backend Engineer", "Fintech Python"
Bad: "Senior Full Stack Developer with React and Node.js"`,
        })

        // Record AI usage
        if (usage) {
          await recordAIUsage(user.id, usage.inputTokens ?? 0, usage.outputTokens ?? 0)
        }

        console.log('[Recommend] AI generated:', {
          queries: searchCriteria.searchQueries,
          level: searchCriteria.experienceLevel,
          years: searchCriteria.yearsExperience,
          industry: searchCriteria.industryDomain,
          primarySkills: searchCriteria.primarySkills,
        })

        send({ stage: 'analyzing', message: 'CV analysis complete', progress: 25 })

        // Stage: detecting (25-35%) - will happen inside findMatchingJobsWithProgress
        // Stage: searching (35-65%)
        // Stage: inserting (65-80%)
        // Stage: scoring (80-95%)
        const jobs = await findMatchingJobsWithProgress(searchCriteria, cvData, userPrefs, send)

        // Cache the results
        const { error: cacheError } = await supabaseAdmin
          .from('job_recommendation_cache')
          .upsert({
            user_id: user.id,
            cv_hash: cvHash,
            recommendations: jobs,
            search_terms: {
              queries: searchCriteria.searchQueries,
              skills: searchCriteria.skills,
              primarySkills: searchCriteria.primarySkills,
              experienceLevel: searchCriteria.experienceLevel,
              yearsExperience: searchCriteria.yearsExperience,
              industryDomain: searchCriteria.industryDomain,
              roleVariants: searchCriteria.roleVariants,
            },
            created_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,cv_hash',
          })

        if (cacheError) {
          console.error('[Recommend] Cache save failed:', cacheError)
        } else {
          console.log('[Recommend] Cache saved successfully:', { userId: user.id, jobCount: jobs.length })
        }

        // Stage: complete (100%)
        send({
          stage: 'complete',
          message: `Found ${jobs.length} matching jobs`,
          progress: 100,
          details: { jobsFound: jobs.length },
          data: {
            recommendations: jobs,
            searchTerms: {
              queries: searchCriteria.searchQueries,
              skills: searchCriteria.skills,
              primarySkills: searchCriteria.primarySkills,
              experienceLevel: searchCriteria.experienceLevel,
              yearsExperience: searchCriteria.yearsExperience,
              industryDomain: searchCriteria.industryDomain,
            },
          },
        })

        controller.close()
      } catch (error: unknown) {
        console.error('[Recommend API] Error:', error)
        const message = error instanceof Error ? error.message : 'Failed to generate recommendations'
        send({ stage: 'error', message, progress: 0, error: message })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

// P1: Build preferences context for AI prompt
function buildPreferencesContext(prefs: JobPreferencesRow): string {
  const parts: string[] = ['\nUser Preferences:']

  if (prefs.target_roles.length > 0) {
    parts.push(`- Target roles: ${prefs.target_roles.join(', ')}`)
  }
  if (prefs.target_locations.length > 0) {
    parts.push(`- Preferred locations: ${prefs.target_locations.join(', ')}`)
  }
  if (prefs.remote_preference !== 'any') {
    parts.push(`- Remote preference: ${prefs.remote_preference}`)
  }
  if (prefs.experience_level) {
    parts.push(`- Target experience level: ${prefs.experience_level}`)
  }
  if (prefs.required_skills.length > 0) {
    parts.push(`- Must-have skills: ${prefs.required_skills.join(', ')}`)
  }

  return parts.length > 1 ? parts.join('\n') : ''
}

function buildCVText(cvData: CVData): string {
  const parts: string[] = []

  // Personal info
  if (cvData.personalInfo.fullName) {
    parts.push(`Name: ${cvData.personalInfo.fullName}`)
  }

  // Summary
  if (cvData.summary) {
    parts.push(`\nSummary:\n${cvData.summary}`)
  }

  // Work experience
  if (cvData.workExperience.length > 0) {
    parts.push('\nWork Experience:')
    cvData.workExperience.forEach(exp => {
      parts.push(`- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`)
      if (exp.description) parts.push(`  ${exp.description}`)
      if (exp.achievements.length > 0) {
        parts.push(`  Achievements: ${exp.achievements.join('; ')}`)
      }
    })
  }

  // Education
  if (cvData.education.length > 0) {
    parts.push('\nEducation:')
    cvData.education.forEach(edu => {
      parts.push(`- ${edu.degree} in ${edu.field} from ${edu.institution}`)
    })
  }

  // Skills
  if (cvData.skills.length > 0) {
    const skillsByCategory = cvData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill.name)
      return acc
    }, {} as Record<string, string[]>)

    parts.push('\nSkills:')
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      parts.push(`- ${category}: ${skills.join(', ')}`)
    })
  }

  // Languages
  if (cvData.languages.length > 0) {
    parts.push(`\nLanguages: ${cvData.languages.map(l => `${l.name} (${l.level})`).join(', ')}`)
  }

  return parts.join('\n')
}

// Progress-enabled version of findMatchingJobs
async function findMatchingJobsWithProgress(
  criteria: JobSearchCriteria,
  cvData: CVData,
  userPrefs: JobPreferencesRow | null,
  send: (event: ProgressEvent) => void
): Promise<ScoredJob[]> {
  const allJobs: JobListing[] = []
  const supabase = supabaseAdmin

  // Stage: detecting (25-35%)
  send({ stage: 'detecting', message: 'Detecting user locations...', progress: 25 })

  // P3: Build search terms - combine AI queries with user target roles
  const searchTerms = [...criteria.searchQueries.slice(0, 3)]
  if (userPrefs?.target_roles) {
    for (const role of userPrefs.target_roles.slice(0, 2)) {
      if (!searchTerms.some(t => t.toLowerCase().includes(role.toLowerCase()))) {
        searchTerms.push(role)
      }
    }
  }
  const finalSearchTerms = searchTerms.slice(0, 4)
  console.log('[Recommend] Search terms:', finalSearchTerms)

  // Query database
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  const sanitizedTerms = finalSearchTerms.map(t => sanitizePostgrestValue(t)).filter(Boolean)
  const { data: dbJobs } = await supabase
    .from('job_listings')
    .select('*')
    .or(
      sanitizedTerms
        .map(term => `title.ilike.%${term}%,company.ilike.%${term}%,description.ilike.%${term}%`)
        .join(',')
    )
    .gte('posted_at', twoWeeksAgo)
    .order('posted_at', { ascending: false, nullsFirst: false })
    .limit(500)

  if (dbJobs && dbJobs.length > 0) {
    allJobs.push(...dbJobs.map(row => jobListingFromRow(row)))
    console.log(`[Recommend] Found ${dbJobs.length} jobs in DB`)
  } else {
    console.log('[Recommend] No matching jobs found in DB')
  }

  // DB-First Strategy: Skip external APIs if we have enough jobs from DB
  const DB_THRESHOLD = 50
  const skipExternalApis = dbJobs && dbJobs.length >= DB_THRESHOLD
  if (skipExternalApis) {
    console.log(`[Recommend] Skipping external APIs - ${dbJobs.length} DB jobs sufficient (threshold: ${DB_THRESHOLD})`)
    send({
      stage: 'searching',
      message: `Using ${dbJobs.length} cached jobs (skipping API calls)`,
      progress: 65,
      details: { jobsFound: dbJobs.length }
    })
  }

  if (!skipExternalApis) {
  send({ stage: 'detecting', message: 'Analyzing location preferences...', progress: 30 })

  // Search external APIs with location logic
  try {
    const rawLocation = cvData.personalInfo.location?.trim()
    const location = (rawLocation && rawLocation !== 'San Francisco, CA') ? rawLocation : null
    const hasLocation = location && location.length >= 3

    const prefLocations = userPrefs?.target_locations?.filter(l =>
      l.length >= 3 && l !== 'San Francisco, CA'
    ) || []

    const allLocations = [...prefLocations]
    if (hasLocation) {
      allLocations.push(location)
    }

    let primaryCountry: string | null = null
    let locationCountries = new Map<string, string | null>()

    if (allLocations.length > 0) {
      const aiResult = await detectCountriesWithAI(allLocations)
      primaryCountry = aiResult.primaryCountry
      locationCountries = aiResult.locationCountries
      console.log(`[Recommend] AI detected primary country: ${primaryCountry || 'unknown'}`)
    }

    send({ stage: 'detecting', message: 'Location detection complete', progress: 35 })

    // Stage: searching (35-65%)
    const searchConfigs: Array<{ location: string; country?: string }> = []

    for (const loc of prefLocations.slice(0, 2)) {
      const country = locationCountries.get(loc) || primaryCountry
      searchConfigs.push({ location: loc, country: country || undefined })
    }

    if (hasLocation && searchConfigs.length < 2) {
      const country = locationCountries.get(location) || primaryCountry
      searchConfigs.push({ location, country: country || undefined })
    }

    if (!userPrefs || userPrefs.remote_preference === 'any' || userPrefs.remote_preference === 'remote') {
      if (primaryCountry) {
        searchConfigs.push({ location: 'remote', country: primaryCountry })
      }
      if (primaryCountry !== 'us') {
        searchConfigs.push({ location: 'remote', country: 'us' })
      }
    }

    const seen = new Set<string>()
    const uniqueConfigs = searchConfigs.filter(c => {
      const key = `${c.location}:${c.country || ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    const apiSearches: Promise<RawJobResult[]>[] = []
    const queries = finalSearchTerms.slice(0, 2)

    for (const query of queries) {
      for (const config of uniqueConfigs.slice(0, 3)) {
        apiSearches.push(
          searchAllApis({
            keywords: query,
            location: config.location,
            country: config.country,
          })
        )
      }
    }

    const limitedSearches = apiSearches.slice(0, 6)
    const totalApis = limitedSearches.length

    send({
      stage: 'searching',
      message: `Searching ${totalApis} job sources...`,
      progress: 35,
      details: { totalApis, completedApis: 0, jobsFound: allJobs.length },
    })

    console.log(`[Recommend] Running ${totalApis} API searches in parallel`)

    // Run searches with progress tracking
    const apiJobs: RawJobResult[] = []
    let completedApis = 0

    const searchResults = await Promise.allSettled(
      limitedSearches.map(async (search) => {
        const result = await search
        completedApis++
        const progressInSearchPhase = 35 + Math.round((completedApis / totalApis) * 30) // 35-65%
        send({
          stage: 'searching',
          message: `Searching job boards (${completedApis}/${totalApis})...`,
          progress: progressInSearchPhase,
          details: { totalApis, completedApis, jobsFound: allJobs.length + apiJobs.length },
        })
        return result
      })
    )

    for (const result of searchResults) {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        apiJobs.push(...result.value)
      } else if (result.status === 'rejected') {
        console.error('[Recommend] API search failed:', result.reason)
      }
    }

    console.log(`[Recommend] Got ${apiJobs.length} jobs from APIs`)

    // Stage: inserting (65-80%)
    if (apiJobs.length > 0) {
      send({
        stage: 'inserting',
        message: `Processing ${apiJobs.length} jobs...`,
        progress: 65,
        details: { jobsFound: apiJobs.length },
      })

      const hashes = apiJobs.map(j => generateDedupHash(j.title, j.company, j.location))
      const { data: existingRows } = await supabase
        .from('job_listings')
        .select('dedup_hash')
        .in('dedup_hash', hashes)

      const existingHashes = new Set((existingRows || []).map(r => r.dedup_hash))
      const newJobs = filterNewJobs(apiJobs, existingHashes)

      if (newJobs.length > 0) {
        send({
          stage: 'inserting',
          message: `Storing ${newJobs.length} new jobs...`,
          progress: 70,
          details: { jobsFound: apiJobs.length, jobsInserted: newJobs.length },
        })

        const insertRows = newJobs.map(job => ({
          title: job.title,
          company: job.company,
          location: job.location || null,
          remote_type: job.is_remote ? 'remote' as const : 'any' as const,
          description: job.description || null,
          requirements: null,
          salary_min: job.salary_min ? Math.round(job.salary_min) : null,
          salary_max: job.salary_max ? Math.round(job.salary_max) : null,
          salary_currency: job.salary_currency || 'PLN',
          salary_type: 'monthly' as const,
          source: job.source,
          source_id: null,
          source_url: job.apply_link || job.url,
          dedup_hash: generateDedupHash(job.title, job.company, job.location),
          company_logo_url: job.company_logo_url || null,
          skills: [],
          experience_level: job.experience_level || null,
          employment_type: job.employment_type || null,
          posted_at: job.posted_at || null,
          expires_at: null,
        }))

        const BATCH_SIZE = 250
        const allDedupHashes: string[] = []

        for (let i = 0; i < insertRows.length; i += BATCH_SIZE) {
          const batch = insertRows.slice(i, i + BATCH_SIZE)
          const { error: upsertError } = await supabase
            .from('job_listings')
            .upsert(batch, {
              onConflict: 'dedup_hash',
              ignoreDuplicates: true,
            })

          if (upsertError) {
            console.error('[Recommend] Upsert failed:', upsertError)
          } else {
            allDedupHashes.push(...batch.map(r => r.dedup_hash))
          }
        }

        send({
          stage: 'inserting',
          message: `Inserted ${allDedupHashes.length} jobs`,
          progress: 75,
          details: { jobsFound: apiJobs.length, jobsInserted: allDedupHashes.length },
        })

        console.log(`[Recommend] Inserted ${allDedupHashes.length} new jobs`)

        const FETCH_BATCH_SIZE = 250
        for (let i = 0; i < allDedupHashes.length; i += FETCH_BATCH_SIZE) {
          const hashBatch = allDedupHashes.slice(i, i + FETCH_BATCH_SIZE)
          const { data: insertedJobs, error: fetchError } = await supabase
            .from('job_listings')
            .select('*')
            .in('dedup_hash', hashBatch)

          if (fetchError) {
            console.error('[Recommend] Failed to fetch inserted jobs:', fetchError)
            continue
          }

          if (insertedJobs && insertedJobs.length > 0) {
            const apiListings = insertedJobs.map(row => jobListingFromRow(row))
            allJobs.push(...apiListings)
          }
        }

        send({
          stage: 'inserting',
          message: `Processing complete`,
          progress: 80,
          details: { jobsFound: allJobs.length, jobsInserted: allDedupHashes.length },
        })
      }
    }
  } catch (apiError) {
    console.error('[Recommend] API search error:', apiError)
    // Continue with DB results only
  }
  } // End of !skipExternalApis block

  // Stage: scoring (80-95%)
  send({
    stage: 'scoring',
    message: `Scoring ${allJobs.length} jobs...`,
    progress: 80,
    details: { jobsFound: allJobs.length },
  })

  const scoredJobs = scoreAndFilterJobs(allJobs, criteria, userPrefs)

  send({
    stage: 'scoring',
    message: `Scored ${scoredJobs.length} matches`,
    progress: 95,
    details: { jobsFound: allJobs.length, jobsScored: scoredJobs.length },
  })

  return scoredJobs.slice(0, 500)
}

// Original findMatchingJobs kept for reference (used by non-streaming flows if needed)
async function findMatchingJobs(
  criteria: JobSearchCriteria,
  cvData: CVData,
  userPrefs: JobPreferencesRow | null
): Promise<ScoredJob[]> {
  const allJobs: JobListing[] = []
  const supabase = supabaseAdmin

  // P3: Build search terms - combine AI queries with user target roles
  const searchTerms = [...criteria.searchQueries.slice(0, 3)]
  if (userPrefs?.target_roles) {
    for (const role of userPrefs.target_roles.slice(0, 2)) {
      if (!searchTerms.some(t => t.toLowerCase().includes(role.toLowerCase()))) {
        searchTerms.push(role)
      }
    }
  }
  // Limit to 4 queries max
  const finalSearchTerms = searchTerms.slice(0, 4)

  console.log('[Recommend] Search terms:', finalSearchTerms)

  // Query database - enforce max 2 weeks
  // Note: Removed .overlaps('skills', ...) filter - jobs often don't have skills populated
  // Skills matching is handled in scoring instead
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  const sanitizedTerms = finalSearchTerms.map(t => sanitizePostgrestValue(t)).filter(Boolean)
  const { data: dbJobs } = await supabase
    .from('job_listings')
    .select('*')
    .or(
      sanitizedTerms
        .map(term => `title.ilike.%${term}%,company.ilike.%${term}%,description.ilike.%${term}%`)
        .join(',')
    )
    .gte('posted_at', twoWeeksAgo)
    .order('posted_at', { ascending: false, nullsFirst: false })
    .limit(500)

  if (dbJobs && dbJobs.length > 0) {
    allJobs.push(...dbJobs.map(row => jobListingFromRow(row)))
    console.log(`[Recommend] Found ${dbJobs.length} jobs in DB`)
  } else {
    console.log('[Recommend] No matching jobs found in DB')
  }

  // DB-First Strategy: Skip external APIs if we have enough jobs from DB
  const DB_THRESHOLD = 50
  const skipExternalApis = dbJobs && dbJobs.length >= DB_THRESHOLD
  if (skipExternalApis) {
    console.log(`[Recommend] Skipping external APIs - ${dbJobs.length} DB jobs sufficient (threshold: ${DB_THRESHOLD})`)
  }

  // Search external APIs with location logic
  if (!skipExternalApis) {
  try {
    const rawLocation = cvData.personalInfo.location?.trim()
    // Filter out default placeholder location
    const location = (rawLocation && rawLocation !== 'San Francisco, CA') ? rawLocation : null
    const hasLocation = location && location.length >= 3

    // P1: Use user preference locations if available (filter out defaults/placeholders)
    const prefLocations = userPrefs?.target_locations?.filter(l =>
      l.length >= 3 && l !== 'San Francisco, CA'
    ) || []

    // Collect all valid locations to detect countries for (exclude placeholders)
    const allLocations = [...prefLocations]
    if (hasLocation) {
      allLocations.push(location)
    }

    // Use AI to detect countries from all locations
    let primaryCountry: string | null = null
    let locationCountries = new Map<string, string | null>()

    if (allLocations.length > 0) {
      const aiResult = await detectCountriesWithAI(allLocations)
      primaryCountry = aiResult.primaryCountry
      locationCountries = aiResult.locationCountries
      console.log(`[Recommend] AI detected primary country: ${primaryCountry || 'unknown'}`)
      console.log(`[Recommend] Location countries:`, Object.fromEntries(locationCountries))
    } else {
      console.log(`[Recommend] No valid locations to detect country from`)
    }

    // Build location -> country mapping for searches
    const searchConfigs: Array<{ location: string; country?: string }> = []

    // Add user preferred locations with AI-detected countries
    for (const loc of prefLocations.slice(0, 2)) {
      const country = locationCountries.get(loc) || primaryCountry
      searchConfigs.push({ location: loc, country: country || undefined })
    }

    // Add CV location as fallback
    if (hasLocation && searchConfigs.length < 2) {
      const country = locationCountries.get(location) || primaryCountry
      searchConfigs.push({ location, country: country || undefined })
    }

    // Handle remote preference - search in user's country (not just US)
    if (!userPrefs || userPrefs.remote_preference === 'any' || userPrefs.remote_preference === 'remote') {
      // Add remote search with user's country for local remote jobs
      if (primaryCountry) {
        searchConfigs.push({ location: 'remote', country: primaryCountry })
      }
      // Also add US remote for broader results (if user is not in US)
      if (primaryCountry !== 'us') {
        searchConfigs.push({ location: 'remote', country: 'us' })
      }
    }

    // Dedupe by location+country combination
    const seen = new Set<string>()
    const uniqueConfigs = searchConfigs.filter(c => {
      const key = `${c.location}:${c.country || ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    // Build search queries for external APIs (limit total API calls)
    const apiSearches: Promise<RawJobResult[]>[] = []
    const queries = finalSearchTerms.slice(0, 2) // Max 2 query variations for APIs

    for (const query of queries) {
      for (const config of uniqueConfigs.slice(0, 3)) {
        apiSearches.push(
          searchAllApis({
            keywords: query,
            location: config.location,
            country: config.country,
          })
        )
      }
    }

    // Cap at 6 parallel requests
    const limitedSearches = apiSearches.slice(0, 6)
    console.log(`[Recommend] Running ${limitedSearches.length} API searches in parallel`)

    // Run all searches in parallel
    const searchResults = await Promise.allSettled(limitedSearches)
    const apiJobs: RawJobResult[] = []

    for (const result of searchResults) {
      if (result.status === 'fulfilled' && result.value.length > 0) {
        apiJobs.push(...result.value)
      } else if (result.status === 'rejected') {
        console.error('[Recommend] API search failed:', result.reason)
      }
    }

    console.log(`[Recommend] Got ${apiJobs.length} jobs from APIs`)

    if (apiJobs.length > 0) {
      // Get existing hashes for dedup
      const hashes = apiJobs.map(j => generateDedupHash(j.title, j.company, j.location))
      const { data: existingRows } = await supabase
        .from('job_listings')
        .select('dedup_hash')
        .in('dedup_hash', hashes)

      const existingHashes = new Set((existingRows || []).map(r => r.dedup_hash))
      const newJobs = filterNewJobs(apiJobs, existingHashes)

      // Insert new jobs into database
      // Note: Don't pass `id` - let database generate UUID with gen_random_uuid()
      if (newJobs.length > 0) {
        const insertRows = newJobs.map(job => ({
          title: job.title,
          company: job.company,
          location: job.location || null,
          remote_type: job.is_remote ? 'remote' as const : 'any' as const,
          description: job.description || null,
          requirements: null,
          salary_min: job.salary_min ? Math.round(job.salary_min) : null,
          salary_max: job.salary_max ? Math.round(job.salary_max) : null,
          salary_currency: job.salary_currency || 'PLN',
          salary_type: 'monthly' as const,
          source: job.source,
          source_id: null,
          source_url: job.apply_link || job.url,
          dedup_hash: generateDedupHash(job.title, job.company, job.location),
          company_logo_url: job.company_logo_url || null,
          skills: [],
          experience_level: job.experience_level || null,
          employment_type: job.employment_type || null,
          posted_at: job.posted_at || null,
          expires_at: null,
        }))

        // Batch insert in chunks of 250
        const BATCH_SIZE = 250
        const allDedupHashes: string[] = []

        // Log first job for debugging
        if (insertRows.length > 0) {
          const sample = insertRows[0]
          console.log('[Recommend] Sample job to insert:', {
            title: sample.title,
            company: sample.company,
            source: sample.source,
            dedup_hash: sample.dedup_hash?.slice(0, 50) + '...',
          })
        }

        for (let i = 0; i < insertRows.length; i += BATCH_SIZE) {
          const batch = insertRows.slice(i, i + BATCH_SIZE)
          const { error: upsertError } = await supabase
            .from('job_listings')
            .upsert(batch, {
              onConflict: 'dedup_hash',
              ignoreDuplicates: true,
            })

          if (upsertError) {
            console.error('[Recommend] Upsert failed:', upsertError)
          } else {
            allDedupHashes.push(...batch.map(r => r.dedup_hash))
          }
        }

        console.log(`[Recommend] Inserted ${allDedupHashes.length} new jobs (attempted: ${insertRows.length})`)

        // Fetch the inserted jobs with their database-generated IDs
        const FETCH_BATCH_SIZE = 250
        console.log(`[Recommend] Fetching ${allDedupHashes.length} jobs by dedup_hash`)
        for (let i = 0; i < allDedupHashes.length; i += FETCH_BATCH_SIZE) {
          const hashBatch = allDedupHashes.slice(i, i + FETCH_BATCH_SIZE)
          const { data: insertedJobs, error: fetchError } = await supabase
            .from('job_listings')
            .select('*')
            .in('dedup_hash', hashBatch)

          if (fetchError) {
            console.error('[Recommend] Failed to fetch inserted jobs:', fetchError)
            continue
          }

          console.log(`[Recommend] Fetch batch returned ${insertedJobs?.length || 0} jobs`)
          if (insertedJobs && insertedJobs.length > 0) {
            const apiListings = insertedJobs.map(row => jobListingFromRow(row))
            allJobs.push(...apiListings)
          }
        }
        console.log(`[Recommend] Total jobs after API fetch: ${allJobs.length}`)
      }
    }
  } catch (apiError) {
    console.error('[Recommend] API search error:', apiError)
    // Continue with DB results only
  }
  } // End of !skipExternalApis block

  // P4, P5, P6: Score and filter jobs
  const scoredJobs = scoreAndFilterJobs(allJobs, criteria, userPrefs)

  return scoredJobs.slice(0, 500) // Return top 500
}

// P4: Early filtering function
function shouldFilterOut(
  job: JobListing,
  criteria: JobSearchCriteria,
  userPrefs: JobPreferencesRow | null,
  filterStats?: { salary: number; experience: number; remote: number; employmentType: number; quality: number; total: number }
): { filtered: boolean; reason?: string } {
  // P4: Salary floor check - exclude if job max salary < 70% of user min
  if (userPrefs?.min_salary && job.salary?.max) {
    const threshold = userPrefs.min_salary * 0.7
    if (job.salary.max < threshold) {
      if (filterStats) filterStats.salary++
      return { filtered: true, reason: 'salary_too_low' }
    }
  }

  // P4: Hard experience mismatch - junior candidate + senior job
  if (criteria.experienceLevel === 'junior') {
    const titleLower = job.title.toLowerCase()
    if (/\b(senior|sr|lead|principal|staff|head|director|architect)\b/.test(titleLower)) {
      // Check if it's truly a senior role (not "lead" in company name etc)
      if (/\b(senior|sr\.?)\s+(developer|engineer|designer)/i.test(job.title)) {
        if (filterStats) filterStats.experience++
        return { filtered: true, reason: 'experience_mismatch' }
      }
    }
  }

  // P4: Employment type mismatch - if user specified employment types
  if (userPrefs?.employment_types && userPrefs.employment_types.length > 0 && job.employmentType) {
    const normalizedJobType = normalizeEmploymentType(job.employmentType)
    if (normalizedJobType && !userPrefs.employment_types.includes(normalizedJobType)) {
      if (filterStats) filterStats.employmentType++
      return { filtered: true, reason: 'employment_type_mismatch' }
    }
  }

  // P4: Remote preference enforcement
  if (userPrefs?.remote_preference === 'remote') {
    if (job.remoteType === 'onsite') {
      if (filterStats) filterStats.remote++
      return { filtered: true, reason: 'not_remote' }
    }
  } else if (userPrefs?.remote_preference === 'onsite') {
    if (job.remoteType === 'remote') {
      if (filterStats) filterStats.remote++
      return { filtered: true, reason: 'remote_only' }
    }
  }

  // P6: Filter unpaid/volunteer unless explicitly wanted (rare, usually detectable from title)
  const titleLower = job.title.toLowerCase()
  if (/\b(unpaid|volunteer|internship)\b/.test(titleLower) && criteria.experienceLevel !== 'junior') {
    if (filterStats) filterStats.quality++
    return { filtered: true, reason: 'unpaid_or_volunteer' }
  }

  return { filtered: false }
}

function normalizeEmploymentType(type: string): EmploymentType | null {
  const lower = type.toLowerCase()
  if (lower.includes('full') || lower === 'permanent') return 'full-time'
  if (lower.includes('part')) return 'part-time'
  if (lower.includes('contract') || lower.includes('freelance')) return 'contract'
  if (lower.includes('b2b')) return 'b2b'
  if (lower.includes('intern')) return 'internship'
  return null
}

// P5 & P6: Enhanced scoring function
function scoreAndFilterJobs(
  jobs: JobListing[],
  criteria: JobSearchCriteria,
  userPrefs: JobPreferencesRow | null
): ScoredJob[] {
  const primarySkillsSet = new Set(criteria.primarySkills.map(s => s.toLowerCase()))
  const allSkillsSet = new Set(criteria.skills.map(s => s.toLowerCase()))
  const roleVariantsLower = criteria.roleVariants.map(r => r.toLowerCase())
  const userLevel = criteria.experienceLevel
  const userYears = criteria.yearsExperience

  const uniqueJobs = new Map<string, ScoredJob>()

  // Track filter stats for logging
  const filterStats = { salary: 0, experience: 0, remote: 0, employmentType: 0, quality: 0, total: 0 }

  // Helper to normalize company name for dedup
  const normalizeCompanyName = (company: string): string => {
    return company.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+(inc|llc|ltd|corp|limited|corporation|gmbh|sp z oo|sa|ag)$/i, '')
      .trim()
  }

  for (const job of jobs) {
    // P4: Early filtering
    const filterResult = shouldFilterOut(job, criteria, userPrefs, filterStats)
    if (filterResult.filtered) {
      filterStats.total++
      continue // Skip this job
    }

    // Dedup by normalized title + company
    const normalizedTitle = job.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
    const normalizedCompany = normalizeCompanyName(job.company)
    const hash = `${normalizedTitle}-${normalizedCompany}`

    if (uniqueJobs.has(hash)) {
      continue // Already have this job
    }

    // P5: Calculate weighted score
    const score = calculateWeightedScore(job, {
      primarySkillsSet,
      allSkillsSet,
      roleVariantsLower,
      userLevel,
      userYears,
      userPrefs,
      industryDomain: criteria.industryDomain,
    })

    uniqueJobs.set(hash, {
      ...job,
      compatibilityScore: Math.round(score),
    })
  }

  // Log filter stats
  console.log('[Recommend] Filter stats:', filterStats, `| Passed: ${uniqueJobs.size}/${jobs.length}`)

  // Sort by compatibility score and recency
  const sortedJobs = Array.from(uniqueJobs.values()).sort((a, b) => {
    // First by compatibility
    if (b.compatibilityScore !== a.compatibilityScore) {
      return b.compatibilityScore - a.compatibilityScore
    }
    // Then by posted date
    const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0
    const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0
    return dateB - dateA
  })

  return sortedJobs
}

interface ScoringContext {
  primarySkillsSet: Set<string>
  allSkillsSet: Set<string>
  roleVariantsLower: string[]
  userLevel: 'junior' | 'mid' | 'senior'
  userYears: number
  userPrefs: JobPreferencesRow | null
  industryDomain: string | null
}

// P5: Weighted scoring implementation
// Weights: skill 35%, experience 20%, title 15%, salary 10%, location 10%, recency 5%, employment 5%
function calculateWeightedScore(job: JobListing, ctx: ScoringContext): number {
  let totalScore = 0

  // 1. Skill match (35%) - primary skills weighted 2x
  const skillScore = calculateSkillScore(job, ctx.primarySkillsSet, ctx.allSkillsSet)
  totalScore += skillScore * 0.35

  // 2. Experience fit (20%)
  const expScore = calculateExperienceScore(job, ctx.userLevel)
  totalScore += expScore * 0.20

  // 3. Title/role match (15%)
  const titleScore = calculateTitleScore(job, ctx.roleVariantsLower)
  totalScore += titleScore * 0.15

  // 4. Salary fit (10%)
  const salaryScore = calculateSalaryScore(job, ctx.userPrefs)
  totalScore += salaryScore * 0.10

  // 5. Location/remote fit (10%)
  const locationScore = calculateLocationScore(job, ctx.userPrefs)
  totalScore += locationScore * 0.10

  // 6. Recency (5%) - <7 days bonus
  const recencyScore = calculateRecencyScore(job)
  totalScore += recencyScore * 0.05

  // 7. Employment type fit (5%)
  const employmentScore = calculateEmploymentScore(job, ctx.userPrefs)
  totalScore += employmentScore * 0.05

  // P6: Apply negative signal penalties
  const penalty = calculateNegativePenalty(job, ctx)
  totalScore = Math.max(0, totalScore - penalty)

  return Math.min(100, Math.max(0, totalScore))
}

function calculateSkillScore(
  job: JobListing,
  primarySkillsSet: Set<string>,
  allSkillsSet: Set<string>
): number {
  const jobSkills = new Set<string>((job.skills || []).map((s: string) => s.toLowerCase()))

  if (jobSkills.size === 0) {
    // No skills listed, check description for skill mentions
    const desc = (job.description || '').toLowerCase()
    let descMatches = 0
    for (const skill of allSkillsSet) {
      if (desc.includes(skill)) descMatches++
    }
    return Math.min(100, descMatches * 15) // ~6-7 matches = 100
  }

  // Count primary skill matches (weighted 2x)
  let weightedMatches = 0
  let totalWeight = 0

  for (const skill of jobSkills) {
    if (primarySkillsSet.has(skill)) {
      weightedMatches += 2
    } else if (allSkillsSet.has(skill)) {
      weightedMatches += 1
    }
    totalWeight += 1 // Each job skill has weight 1 for denominator
  }

  // Normalize: perfect score if all job skills match user skills
  return Math.min(100, (weightedMatches / Math.max(1, totalWeight)) * 100)
}

function calculateExperienceScore(
  job: JobListing,
  userLevel: 'junior' | 'mid' | 'senior',
): number {
  const jobLevel = inferJobLevel(job.title, job.experienceLevel)

  // Perfect match
  if (jobLevel === userLevel) return 100
  if (!jobLevel) return 70 // Unknown level, slight penalty

  // Level mismatch penalties
  if (userLevel === 'junior') {
    if (jobLevel === 'mid') return 60
    if (jobLevel === 'senior') return 20
  } else if (userLevel === 'mid') {
    if (jobLevel === 'junior') return 50
    if (jobLevel === 'senior') return 60
  } else if (userLevel === 'senior') {
    if (jobLevel === 'junior') return 30
    if (jobLevel === 'mid') return 70
  }

  return 50
}

function inferJobLevel(title: string, explicitLevel?: string): 'junior' | 'mid' | 'senior' | null {
  if (explicitLevel) {
    const lower = explicitLevel.toLowerCase()
    if (lower.includes('junior') || lower.includes('entry')) return 'junior'
    if (lower.includes('senior') || lower.includes('lead') || lower.includes('principal')) return 'senior'
    if (lower.includes('mid')) return 'mid'
  }

  const titleLower = title.toLowerCase()
  if (/\b(junior|jr\.?|entry|intern|trainee|graduate)\b/.test(titleLower)) return 'junior'
  if (/\b(senior|sr\.?|lead|principal|staff|head|director|manager|architect)\b/.test(titleLower)) return 'senior'
  return null // Assume mid or unknown
}

function calculateTitleScore(job: JobListing, roleVariantsLower: string[]): number {
  const titleLower = job.title.toLowerCase()

  // Check for role variant matches
  for (const variant of roleVariantsLower) {
    // Extract key words from variant
    const words = variant.split(/\s+/).filter(w => w.length > 2)
    const matchCount = words.filter(w => titleLower.includes(w)).length
    if (matchCount >= words.length * 0.7) return 100 // 70%+ word match
    if (matchCount >= words.length * 0.5) return 80  // 50%+ word match
  }

  // Partial match - check common role keywords
  const roleKeywords = ['developer', 'engineer', 'designer', 'architect', 'analyst', 'manager', 'consultant']
  for (const kw of roleKeywords) {
    if (titleLower.includes(kw) && roleVariantsLower.some(v => v.includes(kw))) {
      return 60
    }
  }

  return 30 // No match
}

function calculateSalaryScore(job: JobListing, userPrefs: JobPreferencesRow | null): number {
  if (!userPrefs?.min_salary || !job.salary) return 70 // No data, neutral

  const jobMin = job.salary.min || 0
  const jobMax = job.salary.max || job.salary.min || 0
  const userMin = userPrefs.min_salary
  const userMax = userPrefs.max_salary || userMin * 1.5

  // Job salary range overlaps with user expectations
  if (jobMax >= userMin && jobMin <= userMax) {
    // Perfect overlap
    if (jobMin >= userMin && jobMax <= userMax) return 100
    // Job pays more than expected - great!
    if (jobMin >= userMin) return 100
    // Partial overlap
    return 80
  }

  // Job pays less but close
  if (jobMax >= userMin * 0.8) return 50

  return 20 // Significant salary mismatch
}

function calculateLocationScore(job: JobListing, userPrefs: JobPreferencesRow | null): number {
  if (!userPrefs) return 70 // No preferences, neutral

  const prefRemote = userPrefs.remote_preference
  const jobRemote = job.remoteType

  // Remote preference matching
  if (prefRemote === 'remote') {
    if (jobRemote === 'remote') return 100
    if (jobRemote === 'hybrid') return 70
    if (jobRemote === 'onsite') return 20
  } else if (prefRemote === 'onsite') {
    if (jobRemote === 'onsite') return 100
    if (jobRemote === 'hybrid') return 80
    if (jobRemote === 'remote') return 40
  } else if (prefRemote === 'hybrid') {
    if (jobRemote === 'hybrid') return 100
    return 70 // Either remote or onsite is acceptable
  }

  // Check location match
  if (userPrefs.target_locations.length > 0 && job.location) {
    const jobLocLower = job.location.toLowerCase()
    for (const targetLoc of userPrefs.target_locations) {
      if (jobLocLower.includes(targetLoc.toLowerCase())) {
        return 100
      }
    }
  }

  return 70 // Default neutral
}

function calculateRecencyScore(job: JobListing): number {
  if (!job.postedAt) return 50 // Unknown date

  const postedDate = new Date(job.postedAt)
  const now = new Date()
  const daysSincePosted = (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)

  if (daysSincePosted <= 1) return 100
  if (daysSincePosted <= 3) return 90
  if (daysSincePosted <= 7) return 80
  if (daysSincePosted <= 14) return 60
  if (daysSincePosted <= 30) return 40

  return 20 // Older than 30 days
}

function calculateEmploymentScore(job: JobListing, userPrefs: JobPreferencesRow | null): number {
  if (!userPrefs?.employment_types || userPrefs.employment_types.length === 0) {
    return 70 // No preference, neutral
  }

  if (!job.employmentType) return 60 // Unknown type

  const normalizedType = normalizeEmploymentType(job.employmentType)
  if (normalizedType && userPrefs.employment_types.includes(normalizedType)) {
    return 100
  }

  return 40 // Type mismatch (but not filtered out = soft preference)
}

// P6: Negative signal penalties
function calculateNegativePenalty(job: JobListing, ctx: ScoringContext): number {
  let penalty = 0
  const descLower = (job.description || '').toLowerCase()

  // Requirements exceed candidate years by 50%+
  const yearsMatch = descLower.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/i)
  if (yearsMatch) {
    const requiredYears = parseInt(yearsMatch[1], 10)
    if (requiredYears > ctx.userYears * 1.5) {
      penalty += 15
    }
  }

  // "Relocation required" for remote seekers
  if (ctx.userPrefs?.remote_preference === 'remote') {
    if (/\b(relocation\s+required|must\s+relocate|on-?site\s+only)\b/i.test(descLower)) {
      penalty += 20
    }
  }

  // Overqualification signal for seniors applying to obviously junior roles
  if (ctx.userLevel === 'senior' && /\b(entry.level|new\s+grad|recent\s+graduate)\b/i.test(descLower)) {
    penalty += 10
  }

  return penalty
}

// =============================================
// Job Search Module Types
// =============================================

// Job source enumeration
export type JobSource =
  | 'justjoin'
  | 'nofluffjobs'
  | 'pracuj'
  | 'praca'
  | 'olx'
  | 'indeed'
  | 'manual'
  | 'adzuna'
  | 'jooble'
  | 'jsearch'

// Remote work preference
export type RemotePreference = 'remote' | 'hybrid' | 'onsite' | 'any'

// Experience level
export type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'any'

// Employment type
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'b2b' | 'internship'

// Application status pipeline
export type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'withdrawn'

// Salary information
export interface SalaryInfo {
  min?: number
  max?: number
  currency: string
  type: 'monthly' | 'yearly' | 'hourly'
}

// Core job listing from aggregated sources
export interface JobListing {
  id: string

  // Core data
  title: string
  company: string
  location?: string
  remoteType: RemotePreference
  description?: string
  requirements?: string

  // Salary
  salary?: SalaryInfo

  // Source tracking
  source: JobSource
  sourceId?: string
  sourceUrl: string

  // Metadata
  companyLogoUrl?: string
  skills: string[]
  experienceLevel?: ExperienceLevel
  employmentType?: EmploymentType

  // Timestamps
  postedAt?: string
  expiresAt?: string
  scrapedAt: string
  createdAt: string
  updatedAt: string
}

// User's job preferences for AI matching
export interface JobPreferences {
  id: string
  userId: string

  // Search preferences
  targetRoles: string[]
  targetLocations: string[]
  remotePreference: RemotePreference

  // Salary expectations
  minSalary?: number
  maxSalary?: number
  salaryCurrency: string

  // Skills
  requiredSkills: string[]
  preferredSkills: string[]

  // Experience
  experienceLevel?: ExperienceLevel
  employmentTypes: EmploymentType[]

  // Notifications
  emailAlerts: boolean
  alertFrequency: 'instant' | 'daily' | 'weekly'

  createdAt: string
  updatedAt: string
}

// Saved job with optional AI analysis
export interface SavedJob {
  id: string
  userId: string
  jobListingId: string
  jobListing?: JobListing

  // Status
  isBookmarked: boolean

  // AI Analysis (Pro feature)
  compatibilityScore?: number
  matchingSkills: string[]
  missingSkills: string[]
  aiAnalysis?: JobCompatibilityAnalysis

  // Auto-matching
  autoMatched?: boolean

  // User notes
  notes?: string

  createdAt: string
  updatedAt: string
}

// Job application tracking
export interface JobApplication {
  id: string
  userId: string
  jobListingId?: string
  jobListing?: JobListing
  cvId?: string

  // Application details
  status: ApplicationStatus
  coverLetter?: string

  // Snapshot of job at application time
  jobTitle: string
  companyName: string
  jobUrl?: string
  contactEmail?: string

  // Email tracking
  emailSent: boolean
  emailSentAt?: string
  emailAccountId?: string

  // Follow-up
  nextFollowUpAt?: string
  followUpCount: number

  // Notes and timeline
  notes?: string
  timeline: ApplicationTimelineEvent[]

  // Timestamps
  appliedAt: string
  createdAt: string
  updatedAt: string
}

// Timeline event for application history
export interface ApplicationTimelineEvent {
  date: string
  action: string
  notes?: string
}

// Email template for applications
export interface EmailTemplate {
  id: string
  userId: string
  name: string
  subject: string
  body: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

// User's connected email account
export interface UserEmailAccount {
  id: string
  userId: string
  provider: 'gmail' | 'outlook'
  email: string
  isActive: boolean
  isDefault: boolean
  syncLabel?: string
  syncPageToken?: string | null
  tokenExpiresAt: string
  createdAt: string
  updatedAt: string
}

// AI compatibility analysis (Pro feature)
export interface JobCompatibilityAnalysis {
  score: number // 0-100
  matchingSkills: string[]
  missingSkills: string[]
  strengthAreas: string[]
  improvementSuggestions: string[]
  coverLetterTips?: string[]
  overallFit: 'excellent' | 'good' | 'fair' | 'poor'
}

// Search filters for job search
export interface JobSearchFilters {
  query?: string
  location?: string
  remoteType?: RemotePreference
  experienceLevel?: ExperienceLevel
  employmentTypes?: EmploymentType[]
  salaryMin?: number
  salaryMax?: number
  skills?: string[]
  sources?: JobSource[]
  postedWithin?: 'day' | 'week' | '2weeks' | 'any'
  hasSalary?: boolean
}

// Search results with pagination
export interface JobSearchResult {
  jobs: JobListing[]
  totalCount: number
  page: number
  pageSize: number
  hasMore: boolean
  cached: boolean
  searchId?: string
}

// AI job recommendation
export interface JobRecommendation {
  job: JobListing
  compatibilityScore: number
  matchingSkills: string[]
  reason: string
}

// Scraper run status (for monitoring)
export interface ScraperRun {
  id: string
  source: JobSource
  status: 'running' | 'completed' | 'failed'
  jobsFound: number
  jobsInserted: number
  jobsUpdated: number
  errorMessage?: string
  startedAt: string
  completedAt?: string
  durationMs?: number
}

// Application statistics
export interface ApplicationStats {
  total: number
  byStatus: Record<ApplicationStatus, number>
  responseRate: number
  avgTimeToResponse?: number
  thisWeek: number
  thisMonth: number
}

// Database row types (snake_case for Supabase)
export interface JobListingRow {
  id: string
  title: string
  company: string
  location: string | null
  remote_type: RemotePreference
  description: string | null
  requirements: string | null
  salary_min: number | null
  salary_max: number | null
  salary_currency: string
  salary_type: string
  source: JobSource
  source_id: string | null
  source_url: string
  dedup_hash: string
  company_logo_url: string | null
  skills: string[]
  experience_level: string | null
  employment_type: string | null
  posted_at: string | null
  expires_at: string | null
  scraped_at: string
  created_at: string
  updated_at: string
}

export interface SavedJobRow {
  id: string
  user_id: string
  job_listing_id: string
  is_bookmarked: boolean
  auto_matched: boolean
  compatibility_score: number | null
  matching_skills: string[]
  missing_skills: string[]
  ai_analysis: JobCompatibilityAnalysis | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface JobApplicationRow {
  id: string
  user_id: string
  job_listing_id: string | null
  cv_id: string | null
  status: ApplicationStatus
  cover_letter: string | null
  job_title: string
  company_name: string
  job_url: string | null
  contact_email: string | null
  email_sent: boolean
  email_sent_at: string | null
  email_account_id: string | null
  next_follow_up_at: string | null
  follow_up_count: number
  notes: string | null
  timeline: ApplicationTimelineEvent[]
  applied_at: string
  created_at: string
  updated_at: string
}

// Conversion utilities
export function jobListingFromRow(row: JobListingRow): JobListing {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location ?? undefined,
    remoteType: row.remote_type,
    description: row.description ?? undefined,
    requirements: row.requirements ?? undefined,
    salary: row.salary_min || row.salary_max ? {
      min: row.salary_min ?? undefined,
      max: row.salary_max ?? undefined,
      currency: row.salary_currency,
      type: row.salary_type as SalaryInfo['type'],
    } : undefined,
    source: row.source,
    sourceId: row.source_id ?? undefined,
    sourceUrl: row.source_url,
    companyLogoUrl: row.company_logo_url ?? undefined,
    skills: row.skills ?? [],
    experienceLevel: row.experience_level as ExperienceLevel ?? undefined,
    employmentType: row.employment_type as EmploymentType ?? undefined,
    postedAt: row.posted_at ?? undefined,
    expiresAt: row.expires_at ?? undefined,
    scrapedAt: row.scraped_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function savedJobFromRow(row: SavedJobRow & { job_listings?: JobListingRow }): SavedJob {
  return {
    id: row.id,
    userId: row.user_id,
    jobListingId: row.job_listing_id,
    jobListing: row.job_listings ? jobListingFromRow(row.job_listings) : undefined,
    isBookmarked: row.is_bookmarked,
    autoMatched: row.auto_matched ?? false,
    compatibilityScore: row.compatibility_score ?? undefined,
    matchingSkills: row.matching_skills ?? [],
    missingSkills: row.missing_skills ?? [],
    aiAnalysis: row.ai_analysis ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function applicationFromRow(row: JobApplicationRow & { job_listings?: JobListingRow }): JobApplication {
  return {
    id: row.id,
    userId: row.user_id,
    jobListingId: row.job_listing_id ?? undefined,
    jobListing: row.job_listings ? jobListingFromRow(row.job_listings) : undefined,
    cvId: row.cv_id ?? undefined,
    status: row.status,
    coverLetter: row.cover_letter ?? undefined,
    jobTitle: row.job_title,
    companyName: row.company_name,
    jobUrl: row.job_url ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    emailSent: row.email_sent,
    emailSentAt: row.email_sent_at ?? undefined,
    emailAccountId: row.email_account_id ?? undefined,
    nextFollowUpAt: row.next_follow_up_at ?? undefined,
    followUpCount: row.follow_up_count,
    notes: row.notes ?? undefined,
    timeline: row.timeline ?? [],
    appliedAt: row.applied_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// Default values
export const defaultJobSearchFilters: JobSearchFilters = {
  query: '',
  location: '',
  remoteType: 'any',
  experienceLevel: 'any',
  employmentTypes: [],
  sources: [],
  postedWithin: 'any',
  hasSalary: false,
}

export const defaultJobPreferences: Omit<JobPreferences, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  targetRoles: [],
  targetLocations: [],
  remotePreference: 'any',
  salaryCurrency: 'PLN',
  requiredSkills: [],
  preferredSkills: [],
  employmentTypes: [],
  emailAlerts: false,
  alertFrequency: 'daily',
}

// Application status labels and colors
export const applicationStatusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
  saved: { label: 'Saved', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  applied: { label: 'Applied', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  interviewing: { label: 'Interviewing', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  offer: { label: 'Offer', color: 'text-green-600', bgColor: 'bg-green-100' },
  rejected: { label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100' },
  withdrawn: { label: 'Withdrawn', color: 'text-gray-500', bgColor: 'bg-gray-50' },
}

// Source display names and colors
export const jobSourceConfig: Record<JobSource, { label: string; color: string }> = {
  justjoin: { label: 'Just Join IT', color: '#FF6B6B' },
  nofluffjobs: { label: 'No Fluff Jobs', color: '#00D1B2' },
  pracuj: { label: 'Pracuj.pl', color: '#0066CC' },
  praca: { label: 'Praca.pl', color: '#FF9900' },
  olx: { label: 'OLX Praca', color: '#002F34' },
  indeed: { label: 'Indeed', color: '#2164F3' },
  manual: { label: 'Manual', color: '#6B7280' },
  adzuna: { label: 'Adzuna', color: '#3C8ED7' },
  jooble: { label: 'Jooble', color: '#FF5A5F' },
  jsearch: { label: 'JSearch', color: '#10B981' },
}

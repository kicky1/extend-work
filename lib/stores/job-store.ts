'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type {
  JobListing,
  JobSearchFilters,
  JobSearchResult,
  SavedJob,
  JobApplication,
  ApplicationStatus,
  JobPreferences,
  ApplicationTimelineEvent,
  JobListingRow,
  SavedJobRow,
  JobApplicationRow,
} from '@/lib/types/job'
import {
  defaultJobSearchFilters,
  defaultJobPreferences,
  jobListingFromRow,
  savedJobFromRow,
  applicationFromRow,
} from '@/lib/types/job'

// Extended type for scored recommendations
interface ScoredJob extends JobListing {
  compatibilityScore?: number
}

// Progress event types matching backend
export type ProgressStage = 'auth' | 'analyzing' | 'detecting' | 'searching' | 'inserting' | 'scoring' | 'complete' | 'error'

export interface RecommendationsProgress {
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
}

interface JobStore {
  // Search state
  searchFilters: JobSearchFilters
  searchResults: JobSearchResult | null
  isSearching: boolean
  searchError: string | null

  // Recommendations state
  recommendations: ScoredJob[]
  isRecommendationsLoading: boolean
  recommendationsError: string | null
  recommendationsFetchedAt: number | null // timestamp to check staleness
  recommendationsStartedAt: number | null // timestamp when loading started (for progress)
  recommendationsProgress: RecommendationsProgress | null // real-time progress from streaming

  // Saved jobs state
  savedJobs: SavedJob[]
  isSavedJobsLoading: boolean

  // Applications state
  applications: JobApplication[]
  isApplicationsLoading: boolean

  // Preferences state
  preferences: JobPreferences | null
  isPreferencesLoading: boolean

  // Current job detail
  selectedJob: JobListing | null

  // UI state
  viewMode: 'grid' | 'list'

  // Search actions
  setSearchFilters: (filters: Partial<JobSearchFilters>) => void
  resetSearchFilters: () => void
  search: (page?: number) => Promise<void>
  clearSearch: () => void

  // Recommendations actions
  loadRecommendations: (cvData: any, force?: boolean) => Promise<void>
  clearRecommendations: () => void

  // Saved jobs actions
  loadSavedJobs: () => Promise<void>
  saveJob: (job: JobListing) => Promise<void>
  unsaveJob: (jobListingId: string) => Promise<void>
  updateSavedJobNotes: (savedJobId: string, notes: string) => Promise<void>
  isJobSaved: (jobListingId: string) => boolean

  // Applications actions
  loadApplications: () => Promise<void>
  createApplication: (
    job: JobListing,
    cvId?: string,
    coverLetter?: string
  ) => Promise<JobApplication | null>
  updateApplicationStatus: (
    applicationId: string,
    status: ApplicationStatus,
    notes?: string
  ) => Promise<void>
  addApplicationTimelineEvent: (
    applicationId: string,
    event: Omit<ApplicationTimelineEvent, 'date'>
  ) => Promise<void>
  updateApplicationNotes: (applicationId: string, notes: string) => Promise<void>
  setApplicationFollowUp: (applicationId: string, date: string | null) => Promise<void>
  deleteApplication: (applicationId: string) => Promise<void>

  // Preferences actions
  loadPreferences: () => Promise<void>
  updatePreferences: (prefs: Partial<JobPreferences>) => Promise<void>

  // Job detail actions
  selectJob: (job: JobListing | null) => void
  loadJobDetail: (jobId: string) => Promise<void>

  // UI actions
  setViewMode: (mode: 'grid' | 'list') => void
}

const useJobStore = create<JobStore>((set, get) => ({
  // Initial state
  searchFilters: defaultJobSearchFilters,
  searchResults: null,
  isSearching: false,
  searchError: null,

  recommendations: [],
  isRecommendationsLoading: false,
  recommendationsError: null,
  recommendationsFetchedAt: null,
  recommendationsStartedAt: null,
  recommendationsProgress: null,

  savedJobs: [],
  isSavedJobsLoading: false,

  applications: [],
  isApplicationsLoading: false,

  preferences: null,
  isPreferencesLoading: false,

  selectedJob: null,
  viewMode: 'grid',

  // Search actions
  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    })),

  resetSearchFilters: () =>
    set({ searchFilters: defaultJobSearchFilters }),

  search: async (page = 1) => {
    const { searchFilters } = get()
    set({ isSearching: true, searchError: null })

    try {
      const response = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters: searchFilters, page }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Search failed')
      }

      const result: JobSearchResult = await response.json()
      set({ searchResults: result, isSearching: false })
    } catch (error: any) {
      set({
        searchError: error.message || 'Search failed',
        isSearching: false,
        searchResults: null,
      })
    }
  },

  clearSearch: () =>
    set({ searchResults: null, searchError: null }),

  // Recommendations actions
  loadRecommendations: async (cvData, force = false) => {
    const { recommendations, recommendationsFetchedAt, isRecommendationsLoading } = get()

    // Skip if already loading
    if (isRecommendationsLoading) return

    // Skip if we have recent data (within 5 minutes) and not forcing refresh
    const STALE_THRESHOLD = 5 * 60 * 1000 // 5 minutes
    if (
      !force &&
      recommendations.length > 0 &&
      recommendationsFetchedAt &&
      Date.now() - recommendationsFetchedAt < STALE_THRESHOLD
    ) {
      return
    }

    set({
      isRecommendationsLoading: true,
      recommendationsError: null,
      recommendationsStartedAt: Date.now(),
      recommendationsProgress: { stage: 'auth', message: 'Starting...', progress: 0 },
    })

    try {
      const response = await fetch('/api/jobs/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData }),
      })

      if (!response.ok) {
        // Try to get error from response
        const text = await response.text()
        let errorMessage = 'Failed to fetch recommendations'
        try {
          const errorData = JSON.parse(text)
          errorMessage = errorData.error || errorMessage
        } catch {
          // Not JSON, use default error
        }
        throw new Error(errorMessage)
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE events (each ends with \n\n)
        const events = buffer.split('\n\n')
        buffer = events.pop() || '' // Keep incomplete event in buffer

        for (const eventStr of events) {
          if (!eventStr.trim()) continue

          // Parse SSE format: data: {...}
          const match = eventStr.match(/^data:\s*(.+)$/m)
          if (!match) continue

          try {
            const event = JSON.parse(match[1]) as {
              stage: ProgressStage
              message: string
              progress: number
              details?: RecommendationsProgress['details']
              data?: { recommendations: ScoredJob[]; searchTerms: unknown; cached?: boolean }
              error?: string
            }

            // Update progress state
            set({
              recommendationsProgress: {
                stage: event.stage,
                message: event.message,
                progress: event.progress,
                details: event.details,
              },
            })

            // Handle completion
            if (event.stage === 'complete' && event.data) {
              set({
                recommendations: event.data.recommendations || [],
                isRecommendationsLoading: false,
                recommendationsFetchedAt: Date.now(),
                recommendationsStartedAt: null,
                recommendationsProgress: null,
              })
              return
            }

            // Handle error
            if (event.stage === 'error') {
              throw new Error(event.error || event.message)
            }
          } catch (parseError) {
            console.error('[JobStore] Failed to parse SSE event:', parseError, eventStr)
          }
        }
      }

      // If we get here without completing, something went wrong
      throw new Error('Stream ended without completion')
    } catch (error: any) {
      set({
        recommendationsError: error.message || 'Failed to fetch recommendations',
        isRecommendationsLoading: false,
        recommendationsStartedAt: null,
        recommendationsProgress: null,
      })
    }
  },

  clearRecommendations: () =>
    set({
      recommendations: [],
      recommendationsError: null,
      recommendationsFetchedAt: null,
      recommendationsStartedAt: null,
      recommendationsProgress: null,
    }),

  // Saved jobs actions
  loadSavedJobs: async () => {
    set({ isSavedJobsLoading: true })

    try {
      const response = await fetch('/api/jobs/saved')

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated, just clear saved jobs
          set({ savedJobs: [], isSavedJobsLoading: false })
          return
        }
        throw new Error('Failed to load saved jobs')
      }

      const { savedJobs } = await response.json()
      set({ savedJobs: savedJobs || [], isSavedJobsLoading: false })
    } catch (error) {
      console.error('Error loading saved jobs:', error)
      set({ isSavedJobsLoading: false })
    }
  },

  saveJob: async (job) => {
    try {
      const response = await fetch('/api/jobs/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save job')
      }

      const { savedJob } = await response.json()
      // Use the actual jobListingId from the saved job (may differ from job.id due to dedup)
      set((state) => ({
        savedJobs: [savedJob, ...state.savedJobs.filter(s => s.jobListingId !== savedJob.jobListingId)],
      }))
    } catch (error: any) {
      console.error('Error saving job:', error?.message || error)
      throw error
    }
  },

  unsaveJob: async (jobListingId) => {
    try {
      const response = await fetch(`/api/jobs/saved?jobListingId=${jobListingId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to unsave job')
      }

      set((state) => ({
        savedJobs: state.savedJobs.filter(s => s.jobListingId !== jobListingId),
      }))
    } catch (error) {
      console.error('Error unsaving job:', error)
      throw error
    }
  },

  updateSavedJobNotes: async (savedJobId, notes) => {
    try {
      const response = await fetch('/api/jobs/saved', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedJobId, notes }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update notes')
      }

      set((state) => ({
        savedJobs: state.savedJobs.map(s =>
          s.id === savedJobId ? { ...s, notes } : s
        ),
      }))
    } catch (error) {
      console.error('Error updating notes:', error)
      throw error
    }
  },

  isJobSaved: (jobListingId) => {
    const { savedJobs } = get()
    return savedJobs.some(s => s.jobListingId === jobListingId && s.isBookmarked)
  },

  // Applications actions
  loadApplications: async () => {
    const supabase = createClient()
    set({ isApplicationsLoading: true })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_listings (*)
        `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false })

      if (error) throw error

      const applications = (data || []).map((row: JobApplicationRow & { job_listings?: JobListingRow }) =>
        applicationFromRow(row)
      )

      set({ applications, isApplicationsLoading: false })
    } catch (error) {
      console.error('Error loading applications:', error)
      set({ isApplicationsLoading: false })
    }
  },

  createApplication: async (job, cvId, coverLetter) => {
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const now = new Date().toISOString()
      const initialTimeline: ApplicationTimelineEvent[] = [{
        date: now,
        action: 'Application created',
      }]

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          job_listing_id: job.id,
          cv_id: cvId,
          status: 'applied',
          cover_letter: coverLetter,
          job_title: job.title,
          company_name: job.company,
          job_url: job.sourceUrl,
          timeline: initialTimeline,
          applied_at: now,
        })
        .select(`*, job_listings (*)`)
        .single()

      if (error) throw error

      const application = applicationFromRow(data)
      set((state) => ({
        applications: [application, ...state.applications],
      }))

      return application
    } catch (error) {
      console.error('Error creating application:', error)
      throw error
    }
  },

  updateApplicationStatus: async (applicationId, status, notes) => {
    const supabase = createClient()

    try {
      const { applications } = get()
      const app = applications.find(a => a.id === applicationId)
      if (!app) return

      const now = new Date().toISOString()
      const newEvent: ApplicationTimelineEvent = {
        date: now,
        action: `Status changed to ${status}`,
        notes,
      }

      const { error } = await supabase
        .from('job_applications')
        .update({
          status,
          timeline: [...app.timeline, newEvent],
        })
        .eq('id', applicationId)

      if (error) throw error

      set((state) => ({
        applications: state.applications.map(a =>
          a.id === applicationId
            ? { ...a, status, timeline: [...a.timeline, newEvent] }
            : a
        ),
      }))
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  addApplicationTimelineEvent: async (applicationId, event) => {
    const supabase = createClient()

    try {
      const { applications } = get()
      const app = applications.find(a => a.id === applicationId)
      if (!app) return

      const newEvent: ApplicationTimelineEvent = {
        ...event,
        date: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('job_applications')
        .update({
          timeline: [...app.timeline, newEvent],
        })
        .eq('id', applicationId)

      if (error) throw error

      set((state) => ({
        applications: state.applications.map(a =>
          a.id === applicationId
            ? { ...a, timeline: [...a.timeline, newEvent] }
            : a
        ),
      }))
    } catch (error) {
      console.error('Error adding timeline event:', error)
      throw error
    }
  },

  updateApplicationNotes: async (applicationId, notes) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ notes })
        .eq('id', applicationId)

      if (error) throw error

      set((state) => ({
        applications: state.applications.map(a =>
          a.id === applicationId ? { ...a, notes } : a
        ),
      }))
    } catch (error) {
      console.error('Error updating notes:', error)
      throw error
    }
  },

  setApplicationFollowUp: async (applicationId, date) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ next_follow_up_at: date })
        .eq('id', applicationId)

      if (error) throw error

      set((state) => ({
        applications: state.applications.map(a =>
          a.id === applicationId ? { ...a, nextFollowUpAt: date ?? undefined } : a
        ),
      }))
    } catch (error) {
      console.error('Error setting follow-up:', error)
      throw error
    }
  },

  deleteApplication: async (applicationId) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId)

      if (error) throw error

      set((state) => ({
        applications: state.applications.filter(a => a.id !== applicationId),
      }))
    } catch (error) {
      console.error('Error deleting application:', error)
      throw error
    }
  },

  // Preferences actions
  loadPreferences: async () => {
    const supabase = createClient()
    set({ isPreferencesLoading: true })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('job_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows

      if (data) {
        const preferences: JobPreferences = {
          id: data.id,
          userId: data.user_id,
          targetRoles: data.target_roles || [],
          targetLocations: data.target_locations || [],
          remotePreference: data.remote_preference,
          minSalary: data.min_salary,
          maxSalary: data.max_salary,
          salaryCurrency: data.salary_currency,
          requiredSkills: data.required_skills || [],
          preferredSkills: data.preferred_skills || [],
          experienceLevel: data.experience_level,
          employmentTypes: data.employment_types || [],
          emailAlerts: data.email_alerts,
          alertFrequency: data.alert_frequency,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        }
        set({ preferences, isPreferencesLoading: false })
      } else {
        set({ isPreferencesLoading: false })
      }
    } catch (error) {
      console.error('Error loading preferences:', error)
      set({ isPreferencesLoading: false })
    }
  },

  updatePreferences: async (prefs) => {
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const dbPrefs = {
        user_id: user.id,
        target_roles: prefs.targetRoles,
        target_locations: prefs.targetLocations,
        remote_preference: prefs.remotePreference,
        min_salary: prefs.minSalary,
        max_salary: prefs.maxSalary,
        salary_currency: prefs.salaryCurrency,
        required_skills: prefs.requiredSkills,
        preferred_skills: prefs.preferredSkills,
        experience_level: prefs.experienceLevel,
        employment_types: prefs.employmentTypes,
        email_alerts: prefs.emailAlerts,
        alert_frequency: prefs.alertFrequency,
      }

      const { data, error } = await supabase
        .from('job_preferences')
        .upsert(dbPrefs, { onConflict: 'user_id' })
        .select()
        .single()

      if (error) throw error

      const preferences: JobPreferences = {
        id: data.id,
        userId: data.user_id,
        targetRoles: data.target_roles || [],
        targetLocations: data.target_locations || [],
        remotePreference: data.remote_preference,
        minSalary: data.min_salary,
        maxSalary: data.max_salary,
        salaryCurrency: data.salary_currency,
        requiredSkills: data.required_skills || [],
        preferredSkills: data.preferred_skills || [],
        experienceLevel: data.experience_level,
        employmentTypes: data.employment_types || [],
        emailAlerts: data.email_alerts,
        alertFrequency: data.alert_frequency,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }

      set({ preferences })
    } catch (error) {
      console.error('Error updating preferences:', error)
      throw error
    }
  },

  // Job detail actions
  selectJob: (job) => set({ selectedJob: job }),

  loadJobDetail: async (jobId) => {
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', jobId)
        .single()

      if (error) throw error

      const job = jobListingFromRow(data)
      set({ selectedJob: job })
    } catch (error) {
      console.error('Error loading job detail:', error)
    }
  },

  // UI actions
  setViewMode: (mode) => set({ viewMode: mode }),
}))

export default useJobStore

// Selector hooks for common queries
export const useJobSearchResults = () => useJobStore((state) => state.searchResults)
export const useSavedJobs = () => useJobStore((state) => state.savedJobs)
export const useApplications = () => useJobStore((state) => state.applications)
export const useApplicationsByStatus = (status: ApplicationStatus) =>
  useJobStore((state) => state.applications.filter(a => a.status === status))
export const useRecommendations = () => useJobStore((state) => state.recommendations)

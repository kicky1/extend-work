'use client'

import { create } from 'zustand'
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import type {
  Interview,
  InterviewRow,
  InterviewFormData,
  InterviewStatus,
  InterviewOutcome,
} from '@/lib/types/interview'
import { interviewFromRow, interviewToRow, interviewTypeConfig } from '@/lib/types/interview'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import { mapInterviewTypeToStageType } from '@/lib/types/recruitment'

/** Fire-and-forget Google Calendar sync */
function syncToGoogleCalendar(action: 'create' | 'update' | 'delete', interviewId: string) {
  fetch('/api/calendar/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, interviewId }),
  }).catch((err) => console.error('GCal sync error:', err))
}

interface InterviewStore {
  // State
  interviews: Interview[]
  isLoading: boolean
  error: string | null

  // Selected interview for modal
  selectedInterview: Interview | null

  // Calendar view state
  currentMonth: Date
  selectedDate: Date | null

  // Filter state
  statusFilter: InterviewStatus | 'all'

  // Actions
  loadInterviews: () => Promise<void>
  createInterview: (data: InterviewFormData) => Promise<Interview | null>
  updateInterview: (id: string, data: Partial<InterviewFormData>) => Promise<void>
  updateInterviewStatus: (id: string, status: InterviewStatus) => Promise<void>
  updateInterviewOutcome: (id: string, outcome: InterviewOutcome, feedback?: string, nextSteps?: string) => Promise<void>
  deleteInterview: (id: string) => Promise<void>

  // UI actions
  selectInterview: (interview: Interview | null) => void
  setCurrentMonth: (date: Date) => void
  setSelectedDate: (date: Date | null) => void
  setStatusFilter: (status: InterviewStatus | 'all') => void

  // Helpers
  getInterviewsForDate: (date: Date) => Interview[]
  getUpcomingInterviews: (limit?: number) => Interview[]
}

const useInterviewStore = create<InterviewStore>((set, get) => ({
  // Initial state
  interviews: [],
  isLoading: false,
  error: null,
  selectedInterview: null,
  currentMonth: new Date(),
  selectedDate: null,
  statusFilter: 'all',

  // Load all interviews for the user
  loadInterviews: async () => {
    const supabase = createClient()
    const isInitialLoad = get().interviews.length === 0
    // Only show loading spinner on initial load to avoid UI flicker on refreshes
    if (isInitialLoad) {
      set({ isLoading: true, error: null })
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        set({ interviews: [], isLoading: false })
        return
      }

      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_at', { ascending: true })

      if (error) throw error

      const interviews = (data || []).map((row: InterviewRow) => interviewFromRow(row))
      set({ interviews, isLoading: false })
    } catch (error: any) {
      console.error('Error loading interviews:', error)
      set({ error: error.message || 'Failed to load interviews', isLoading: false })
    }
  },

  // Create a new interview
  createInterview: async (data) => {
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const rowData = {
        user_id: user.id,
        title: data.title,
        company: data.company,
        position: data.position,
        interview_type: data.interviewType,
        status: 'scheduled' as InterviewStatus,
        scheduled_at: new Date(data.scheduledAt).toISOString(),
        duration: data.duration,
        timezone: data.timezone,
        location: data.location || null,
        meeting_link: data.meetingLink || null,
        interviewer_name: data.interviewerName || null,
        interviewer_email: data.interviewerEmail || null,
        interviewer_phone: data.interviewerPhone || null,
        notes: data.notes || null,
        prep_notes: data.prepNotes || null,
        questions: data.questions || null,
        job_application_id: data.jobApplicationId || null,
      }

      const { data: insertedData, error } = await supabase
        .from('interviews')
        .insert(rowData)
        .select()
        .single()

      if (error) throw error

      const interview = interviewFromRow(insertedData)
      set((state) => ({
        interviews: [...state.interviews, interview].sort(
          (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
        ),
      }))

      // Sync to Google Calendar
      syncToGoogleCalendar('create', interview.id)

      // Auto-link to recruitment process
      try {
        const recruitmentStore = useRecruitmentStore.getState()
        const stageType = mapInterviewTypeToStageType(data.interviewType)
        let process = recruitmentStore.findProcessByCompanyPosition(data.company, data.position)

        if (!process) {
          process = await recruitmentStore.createProcess(data.company, data.position) ?? undefined
        }

        if (process) {
          const label = `${interviewTypeConfig[data.interviewType].label} Interview`
          await recruitmentStore.linkInterviewToProcess(
            interview.id,
            process.id,
            stageType,
            data.scheduledAt,
            label
          )
        }
      } catch (err) {
        // Non-blocking: don't fail interview creation if recruitment linking fails
        console.error('Error linking interview to recruitment process:', err)
      }

      return interview
    } catch (error: any) {
      console.error('Error creating interview:', error)
      throw error
    }
  },

  // Update an interview
  updateInterview: async (id, data) => {
    const supabase = createClient()

    try {
      const updateData: Partial<InterviewRow> = {}

      if (data.title !== undefined) updateData.title = data.title
      if (data.company !== undefined) updateData.company = data.company
      if (data.position !== undefined) updateData.position = data.position
      if (data.interviewType !== undefined) updateData.interview_type = data.interviewType
      if (data.scheduledAt !== undefined) updateData.scheduled_at = new Date(data.scheduledAt).toISOString()
      if (data.duration !== undefined) updateData.duration = data.duration
      if (data.timezone !== undefined) updateData.timezone = data.timezone
      if (data.location !== undefined) updateData.location = data.location || null
      if (data.meetingLink !== undefined) updateData.meeting_link = data.meetingLink || null
      if (data.interviewerName !== undefined) updateData.interviewer_name = data.interviewerName || null
      if (data.interviewerEmail !== undefined) updateData.interviewer_email = data.interviewerEmail || null
      if (data.interviewerPhone !== undefined) updateData.interviewer_phone = data.interviewerPhone || null
      if (data.notes !== undefined) updateData.notes = data.notes || null
      if (data.prepNotes !== undefined) updateData.prep_notes = data.prepNotes || null
      if (data.questions !== undefined) updateData.questions = data.questions || null
      if (data.jobApplicationId !== undefined) updateData.job_application_id = data.jobApplicationId || null

      const { data: updatedData, error } = await supabase
        .from('interviews')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const interview = interviewFromRow(updatedData)
      set((state) => ({
        interviews: state.interviews
          .map((i) => (i.id === id ? interview : i))
          .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()),
        selectedInterview: state.selectedInterview?.id === id ? interview : state.selectedInterview,
      }))

      // Sync to Google Calendar
      syncToGoogleCalendar('update', id)

      // Sync scheduledAt to linked recruitment stage
      if (data.scheduledAt) {
        try {
          const recruitmentStore = useRecruitmentStore.getState()
          const process = recruitmentStore.getProcessForInterview(id)
          if (process) {
            const stage = process.stages.find(s => s.interviewId === id)
            if (stage) {
              await recruitmentStore.updateStage(process.id, stage.id, {
                scheduledAt: interview.scheduledAt
              })
            }
          }
        } catch (err) {
          console.error('Error syncing schedule to recruitment stage:', err)
        }
      }
    } catch (error: any) {
      console.error('Error updating interview:', error)
      throw error
    }
  },

  // Update interview status
  updateInterviewStatus: async (id, status) => {
    const supabase = createClient()

    try {
      const { data: updatedData, error } = await supabase
        .from('interviews')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const interview = interviewFromRow(updatedData)
      set((state) => ({
        interviews: state.interviews.map((i) => (i.id === id ? interview : i)),
        selectedInterview: state.selectedInterview?.id === id ? interview : state.selectedInterview,
      }))

      // Remove linked stage from recruitment process when cancelled
      if (status === 'cancelled') {
        try {
          useRecruitmentStore.getState().removeStageForInterview(id)
        } catch (err) {
          console.error('Error removing stage for cancelled interview:', err)
        }
      }
    } catch (error: any) {
      console.error('Error updating interview status:', error)
      throw error
    }
  },

  // Update interview outcome
  updateInterviewOutcome: async (id, outcome, feedback, nextSteps) => {
    const supabase = createClient()

    try {
      const updateData: Partial<InterviewRow> = {
        outcome,
        status: 'completed',
      }
      if (feedback !== undefined) updateData.feedback = feedback
      if (nextSteps !== undefined) updateData.next_steps = nextSteps

      const { data: updatedData, error } = await supabase
        .from('interviews')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const interview = interviewFromRow(updatedData)
      set((state) => ({
        interviews: state.interviews.map((i) => (i.id === id ? interview : i)),
        selectedInterview: state.selectedInterview?.id === id ? interview : state.selectedInterview,
      }))

      // Sync outcome to linked recruitment stage
      try {
        const recruitmentStore = useRecruitmentStore.getState()
        const process = recruitmentStore.getProcessForInterview(id)
        if (process) {
          const stage = process.stages.find(s => s.interviewId === id)
          if (stage) {
            await recruitmentStore.updateStage(process.id, stage.id, {
              status: 'completed',
              completedAt: new Date().toISOString(),
              outcome,
              ...(feedback ? { notes: feedback } : {}),
            })
          }
        }
      } catch (err) {
        console.error('Error syncing outcome to recruitment stage:', err)
      }
    } catch (error: any) {
      console.error('Error updating interview outcome:', error)
      throw error
    }
  },

  // Delete an interview
  deleteInterview: async (id) => {
    const supabase = createClient()

    try {
      // Sync delete to Google Calendar before removing from DB
      syncToGoogleCalendar('delete', id)

      const { error } = await supabase
        .from('interviews')
        .delete()
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        interviews: state.interviews.filter((i) => i.id !== id),
        selectedInterview: state.selectedInterview?.id === id ? null : state.selectedInterview,
      }))

      // Remove linked stage from recruitment process
      try {
        useRecruitmentStore.getState().removeStageForInterview(id)
      } catch (err) {
        console.error('Error removing stage for deleted interview:', err)
      }
    } catch (error: any) {
      console.error('Error deleting interview:', error)
      throw error
    }
  },

  // UI actions
  selectInterview: (interview) => set({ selectedInterview: interview }),
  setCurrentMonth: (date) => set({ currentMonth: date }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  // Get interviews for a specific date
  getInterviewsForDate: (date) => {
    const { interviews, statusFilter } = get()
    const dateStr = format(date, 'yyyy-MM-dd')

    return interviews.filter((interview) => {
      const interviewDate = format(new Date(interview.scheduledAt), 'yyyy-MM-dd')
      const matchesDate = interviewDate === dateStr
      const matchesStatus = statusFilter === 'all' || interview.status === statusFilter
      return matchesDate && matchesStatus
    })
  },

  // Get upcoming interviews
  getUpcomingInterviews: (limit = 5) => {
    const { interviews } = get()
    const now = new Date()

    return interviews
      .filter((interview) => {
        const scheduledAt = new Date(interview.scheduledAt)
        return scheduledAt >= now && interview.status === 'scheduled'
      })
      .slice(0, limit)
  },
}))

export default useInterviewStore

// Selector hooks
export const useInterviews = () => useInterviewStore((state) => state.interviews)
export const useSelectedInterview = () => useInterviewStore((state) => state.selectedInterview)
export const useInterviewsLoading = () => useInterviewStore((state) => state.isLoading)
export const useCurrentMonth = () => useInterviewStore((state) => state.currentMonth)
export const useUpcomingInterviews = (limit?: number) =>
  useInterviewStore((state) => state.getUpcomingInterviews(limit))

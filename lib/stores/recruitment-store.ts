'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type {
  RecruitmentProcess,
  RecruitmentProcessRow,
  RecruitmentStage,
  RecruitmentStageType,
  RecruitmentStageStatus,
  RecruitmentProcessStatus,
} from '@/lib/types/recruitment'
import { processFromRow, getInitialStages, createStage } from '@/lib/types/recruitment'
import type { InterviewStatus } from '@/lib/types/interview'

interface RecruitmentStore {
  processes: RecruitmentProcess[]
  selectedProcessId: string | null
  isLoading: boolean

  loadProcesses: () => Promise<void>
  createProcess: (company: string, position: string) => Promise<RecruitmentProcess | null>
  updateProcess: (id: string, data: Partial<Pick<RecruitmentProcess, 'status' | 'notes'>>) => Promise<void>
  updateStage: (processId: string, stageId: string, data: Partial<RecruitmentStage>) => Promise<void>
  addStage: (processId: string, stageType: RecruitmentStageType) => Promise<void>
  deleteProcess: (id: string) => Promise<void>

  findProcessByCompanyPosition: (company: string, position: string) => RecruitmentProcess | undefined
  linkInterviewToProcess: (interviewId: string, processId: string, stageType: RecruitmentStageType, scheduledAt?: string, labelOverride?: string) => Promise<void>
  selectProcess: (id: string | null) => void
  getProcessForInterview: (interviewId: string) => RecruitmentProcess | undefined
  unlinkInterviewFromStage: (interviewId: string) => Promise<void>
  removeStageForInterview: (interviewId: string) => Promise<void>
}

const useRecruitmentStore = create<RecruitmentStore>((set, get) => ({
  processes: [],
  selectedProcessId: null,
  isLoading: false,

  loadProcesses: async () => {
    const supabase = createClient()
    const isInitialLoad = get().processes.length === 0
    // Only show loading spinner on initial load to avoid UI flicker on refreshes
    if (isInitialLoad) {
      set({ isLoading: true })
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        set({ processes: [], isLoading: false })
        return
      }

      const { data, error } = await supabase
        .from('recruitment_processes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error

      const processes = (data || []).map((row: RecruitmentProcessRow) => processFromRow(row))
      set({ processes, isLoading: false })
    } catch (error: any) {
      console.error('Error loading recruitment processes:', error)
      set({ isLoading: false })
    }
  },

  createProcess: async (company, position) => {
    const supabase = createClient()

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const stages = getInitialStages()

      const { data, error } = await supabase
        .from('recruitment_processes')
        .insert({
          user_id: user.id,
          company,
          position,
          status: 'active' as RecruitmentProcessStatus,
          stages,
        })
        .select()
        .single()

      if (error) throw error

      const process = processFromRow(data)
      set((state) => ({
        processes: [process, ...state.processes],
      }))

      return process
    } catch (error: any) {
      console.error('Error creating recruitment process:', error)
      return null
    }
  },

  updateProcess: async (id, updates) => {
    const supabase = createClient()

    try {
      const updateData: Record<string, unknown> = {}
      if (updates.status !== undefined) updateData.status = updates.status
      if (updates.notes !== undefined) updateData.notes = updates.notes

      const { data, error } = await supabase
        .from('recruitment_processes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      const process = processFromRow(data)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === id ? process : p)),
      }))

      // Cancel linked scheduled interviews when process reaches terminal state
      const terminalStatuses: RecruitmentProcessStatus[] = ['accepted', 'rejected', 'withdrawn']
      if (updates.status && terminalStatuses.includes(updates.status)) {
        try {
          const { default: useInterviewStore } = await import('@/lib/stores/interview-store')
          const interviewStore = useInterviewStore.getState()
          const scheduledInterviewIds = process.stages
            .filter((s) => s.interviewId && s.status === 'scheduled')
            .map((s) => s.interviewId!)

          await Promise.allSettled(
            scheduledInterviewIds.map((iid) =>
              interviewStore.updateInterviewStatus(iid, 'cancelled' as InterviewStatus)
            )
          )
        } catch (err) {
          console.error('Error cancelling linked interviews:', err)
        }
      }
    } catch (error: any) {
      console.error('Error updating recruitment process:', error)
    }
  },

  updateStage: async (processId, stageId, data) => {
    const supabase = createClient()
    const { processes } = get()
    const process = processes.find((p) => p.id === processId)
    if (!process) return

    const updatedStages = process.stages.map((s) =>
      s.id === stageId ? { ...s, ...data } : s
    )

    try {
      const { data: updated, error } = await supabase
        .from('recruitment_processes')
        .update({ stages: updatedStages })
        .eq('id', processId)
        .select()
        .single()

      if (error) throw error

      const updatedProcess = processFromRow(updated)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === processId ? updatedProcess : p)),
      }))
    } catch (error: any) {
      console.error('Error updating stage:', error)
    }
  },

  addStage: async (processId, stageType) => {
    const supabase = createClient()
    const { processes } = get()
    const process = processes.find((p) => p.id === processId)
    if (!process) return

    // Count existing stages of this type for "Round N" labeling
    const existingCount = process.stages.filter((s) => s.type === stageType).length
    const label = existingCount > 0
      ? `${createStage(stageType).label} (Round ${existingCount + 1})`
      : undefined

    const newStage = createStage(stageType, label)
    const updatedStages = [...process.stages, newStage]

    try {
      const { data: updated, error } = await supabase
        .from('recruitment_processes')
        .update({ stages: updatedStages })
        .eq('id', processId)
        .select()
        .single()

      if (error) throw error

      const updatedProcess = processFromRow(updated)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === processId ? updatedProcess : p)),
      }))
    } catch (error: any) {
      console.error('Error adding stage:', error)
    }
  },

  deleteProcess: async (id) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('recruitment_processes')
        .delete()
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        processes: state.processes.filter((p) => p.id !== id),
        selectedProcessId: state.selectedProcessId === id ? null : state.selectedProcessId,
      }))
    } catch (error: any) {
      console.error('Error deleting recruitment process:', error)
    }
  },

  findProcessByCompanyPosition: (company, position) => {
    const { processes } = get()
    const companyLower = company.toLowerCase().trim()
    const positionLower = position.toLowerCase().trim()

    return processes.find(
      (p) =>
        p.status === 'active' &&
        p.company.toLowerCase().trim() === companyLower &&
        p.position.toLowerCase().trim() === positionLower
    )
  },

  linkInterviewToProcess: async (interviewId, processId, stageType, scheduledAt, labelOverride) => {
    const supabase = createClient()
    const { processes } = get()
    const process = processes.find((p) => p.id === processId)
    if (!process) return

    // Find the first stage of this type that isn't already linked to a different interview
    let stage = process.stages.find(
      (s) => s.type === stageType && (!s.interviewId || s.interviewId === interviewId)
    )

    let workingStages = [...process.stages]

    // Auto-create stage if it doesn't exist
    if (!stage) {
      const existingCount = process.stages.filter((s) => s.type === stageType).length
      const baseLabel = labelOverride || createStage(stageType).label
      const label = existingCount > 0
        ? `${baseLabel} (Round ${existingCount + 1})`
        : baseLabel
      stage = createStage(stageType, label)
      workingStages = [...workingStages, stage]
    }

    // Update stage
    const updatedStages = workingStages.map((s) =>
      s.id === stage!.id
        ? {
            ...s,
            interviewId,
            status: 'scheduled' as RecruitmentStageStatus,
            scheduledAt: scheduledAt || s.scheduledAt,
          }
        : s
    )

    try {
      // Update process stages
      const { data: updatedData, error: processError } = await supabase
        .from('recruitment_processes')
        .update({ stages: updatedStages })
        .eq('id', processId)
        .select()
        .single()

      if (processError) throw processError

      // Update interview's recruitment_process_id
      const { error: interviewError } = await supabase
        .from('interviews')
        .update({ recruitment_process_id: processId })
        .eq('id', interviewId)

      if (interviewError) throw interviewError

      const updatedProcess = processFromRow(updatedData)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === processId ? updatedProcess : p)),
      }))
    } catch (error: any) {
      console.error('Error linking interview to process:', error)
    }
  },

  selectProcess: (id) => set({ selectedProcessId: id }),

  getProcessForInterview: (interviewId) => {
    const { processes } = get()
    return processes.find((p) =>
      p.stages.some((s) => s.interviewId === interviewId)
    )
  },

  unlinkInterviewFromStage: async (interviewId) => {
    const supabase = createClient()
    const process = get().getProcessForInterview(interviewId)
    if (!process) return

    const updatedStages = process.stages.map((s) =>
      s.interviewId === interviewId
        ? { ...s, interviewId: undefined, scheduledAt: undefined, status: 'pending' as RecruitmentStageStatus }
        : s
    )

    try {
      const { data: updated, error } = await supabase
        .from('recruitment_processes')
        .update({ stages: updatedStages })
        .eq('id', process.id)
        .select()
        .single()

      if (error) throw error

      const updatedProcess = processFromRow(updated)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === process.id ? updatedProcess : p)),
      }))
    } catch (error: any) {
      console.error('Error unlinking interview from stage:', error)
    }
  },

  removeStageForInterview: async (interviewId) => {
    const supabase = createClient()
    const process = get().getProcessForInterview(interviewId)
    if (!process) return

    const updatedStages = process.stages.filter((s) => s.interviewId !== interviewId)

    try {
      const { data: updated, error } = await supabase
        .from('recruitment_processes')
        .update({ stages: updatedStages })
        .eq('id', process.id)
        .select()
        .single()

      if (error) throw error

      const updatedProcess = processFromRow(updated)
      set((state) => ({
        processes: state.processes.map((p) => (p.id === process.id ? updatedProcess : p)),
      }))
    } catch (error: any) {
      console.error('Error removing stage for interview:', error)
    }
  },
}))

export default useRecruitmentStore

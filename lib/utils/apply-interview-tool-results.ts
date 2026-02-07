import useInterviewStore from '@/lib/stores/interview-store'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import type { InterviewFormData, InterviewOutcome } from '@/lib/types/interview'
import type { InterviewToolResult } from '@/lib/interview-tools'
import type { RecruitmentStageType } from '@/lib/types/recruitment'

// Re-export for backwards compatibility
export type { InterviewToolResult }

// Extended result with error info
export interface ApplyInterviewResult {
  success: boolean
  description: string | null
  error?: string
  interviewId?: string // For tracking created/modified interview
}

/**
 * Validate tool result data before applying
 * Returns an error message if validation fails, null if valid
 */
function validateToolResult(action: string, data: Record<string, unknown>): string | null {
  const store = useInterviewStore.getState()
  const { interviews } = store

  switch (action) {
    case 'updateInterview':
    case 'rescheduleInterview':
    case 'cancelInterview':
    case 'deleteInterview':
    case 'updateOutcome':
    case 'getInterviewDetails': {
      const id = data.id as string
      if (!id) return 'Missing interview ID'
      const exists = interviews.some(i => i.id === id)
      if (!exists) return `Interview with ID "${id}" not found`
      break
    }
    case 'addStage':
    case 'skipStage':
    case 'completeStage':
    case 'updateProcessStatus': {
      const processId = data.processId as string
      if (!processId) return 'Missing process ID'
      const recruitmentStore = useRecruitmentStore.getState()
      const exists = recruitmentStore.processes.some(p => p.id === processId)
      if (!exists) return `Process with ID "${processId}" not found`
      break
    }
  }

  return null
}

/**
 * Apply a single tool result to the interview store
 * Returns detailed result with success status and description
 */
export async function applyInterviewToolResult(result: InterviewToolResult): Promise<ApplyInterviewResult> {
  if (!result.success) {
    return { success: false, description: null, error: result.error || 'Tool execution failed' }
  }

  const store = useInterviewStore.getState()
  const { action, data } = result

  // If no data and success, it might be a read-only action
  if (!data) {
    return { success: true, description: null }
  }

  // Validate before applying
  const validationError = validateToolResult(action, data)
  if (validationError) {
    return { success: false, description: null, error: validationError }
  }

  try {
    switch (action) {
      case 'createInterview': {
        const formData: InterviewFormData = {
          title: `${data.position} Interview` as string,
          company: data.company as string,
          position: data.position as string,
          interviewType: (data.type as InterviewFormData['interviewType']) || 'video',
          scheduledAt: data.scheduledAt as string,
          duration: (data.duration as number) || 60,
          timezone: (data.timezone as string) || Intl.DateTimeFormat().resolvedOptions().timeZone,
          location: data.location as string | undefined,
          notes: data.notes as string | undefined,
          interviewerName: data.interviewerName as string | undefined,
        }

        const interview = await store.createInterview(formData)
        if (!interview) {
          return { success: false, description: null, error: 'Failed to create interview' }
        }

        return {
          success: true,
          description: `Scheduled ${formData.position} interview with ${formData.company}`,
          interviewId: interview.id,
        }
      }

      case 'updateInterview': {
        const { id, ...updates } = data as { id: string; [key: string]: unknown }

        const formUpdates: Partial<InterviewFormData> = {}
        if (updates.company !== undefined) formUpdates.company = updates.company as string
        if (updates.position !== undefined) {
          formUpdates.position = updates.position as string
          formUpdates.title = `${updates.position} Interview`
        }
        if (updates.duration !== undefined) formUpdates.duration = updates.duration as number
        if (updates.type !== undefined) formUpdates.interviewType = updates.type as InterviewFormData['interviewType']
        if (updates.location !== undefined) formUpdates.location = updates.location as string
        if (updates.notes !== undefined) formUpdates.notes = updates.notes as string
        if (updates.interviewerName !== undefined) formUpdates.interviewerName = updates.interviewerName as string

        await store.updateInterview(id, formUpdates)

        const fields = Object.keys(updates).filter(k => updates[k] !== undefined)
        return {
          success: true,
          description: `Updated interview: ${fields.join(', ')}`,
          interviewId: id,
        }
      }

      case 'rescheduleInterview': {
        const { id, newScheduledAt } = data as { id: string; newScheduledAt: string }

        await store.updateInterview(id, { scheduledAt: newScheduledAt })

        const interview = store.interviews.find(i => i.id === id)
        const dateStr = new Date(newScheduledAt).toLocaleString()
        return {
          success: true,
          description: interview
            ? `Rescheduled ${interview.company} interview to ${dateStr}`
            : `Rescheduled interview to ${dateStr}`,
          interviewId: id,
        }
      }

      case 'cancelInterview': {
        const { id } = data as { id: string }
        const interview = store.interviews.find(i => i.id === id)

        await store.updateInterviewStatus(id, 'cancelled')

        return {
          success: true,
          description: interview
            ? `Cancelled ${interview.company} interview`
            : 'Cancelled interview',
          interviewId: id,
        }
      }

      case 'listInterviews': {
        // This is a read-only action, no state change needed
        // The data will contain the filtered interviews from the server
        const count = (data.interviews as unknown[])?.length || 0
        const filter = data.filter as string || 'upcoming'
        return {
          success: true,
          description: `Found ${count} ${filter} interview${count !== 1 ? 's' : ''}`,
        }
      }

      case 'getInterviewDetails': {
        // Read-only action
        return {
          success: true,
          description: null,
        }
      }

      case 'deleteInterview': {
        const { id } = data as { id: string }
        const interview = store.interviews.find(i => i.id === id)

        await store.deleteInterview(id)

        return {
          success: true,
          description: interview
            ? `Deleted ${interview.company} interview`
            : 'Deleted interview',
          interviewId: id,
        }
      }

      case 'updateOutcome': {
        const { id, outcome, feedback, nextSteps } = data as {
          id: string
          outcome: InterviewOutcome
          feedback?: string
          nextSteps?: string
        }
        const interview = store.interviews.find(i => i.id === id)

        await store.updateInterviewOutcome(id, outcome, feedback, nextSteps)

        return {
          success: true,
          description: interview
            ? `Recorded ${outcome} outcome for ${interview.company}`
            : `Recorded ${outcome} outcome`,
          interviewId: id,
        }
      }

      case 'listProcesses': {
        const count = (data.processes as unknown[])?.length || 0
        const filter = data.filter as string || 'active'
        return {
          success: true,
          description: `Found ${count} ${filter} pipeline${count !== 1 ? 's' : ''}`,
        }
      }

      case 'addStage': {
        const { processId, stageType } = data as { processId: string; stageType: RecruitmentStageType }
        const recruitmentStore = useRecruitmentStore.getState()
        await recruitmentStore.addStage(processId, stageType)

        return {
          success: true,
          description: `Added ${stageType.replace('_', ' ')} stage`,
        }
      }

      case 'skipStage': {
        const { processId, stageId } = data as { processId: string; stageId: string }
        const recruitmentStore = useRecruitmentStore.getState()
        await recruitmentStore.updateStage(processId, stageId, { status: 'skipped' })

        return {
          success: true,
          description: 'Skipped stage',
        }
      }

      case 'completeStage': {
        const { processId, stageId } = data as { processId: string; stageId: string }
        const recruitmentStore = useRecruitmentStore.getState()
        await recruitmentStore.updateStage(processId, stageId, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        })

        return {
          success: true,
          description: 'Marked stage as completed',
        }
      }

      case 'updateProcessStatus': {
        const { processId, status } = data as { processId: string; status: string }
        const recruitmentStore = useRecruitmentStore.getState()
        const process = recruitmentStore.processes.find(p => p.id === processId)
        await recruitmentStore.updateProcess(processId, { status: status as any })

        return {
          success: true,
          description: process
            ? `Updated ${process.company} to ${status}`
            : `Updated process to ${status}`,
        }
      }

      default:
        return { success: false, description: null, error: `Unknown action: ${action}` }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[applyInterviewToolResult] Error applying ${action}:`, err)
    return { success: false, description: null, error: errorMessage }
  }
}

/**
 * Apply multiple tool results to the interview store
 */
export async function applyInterviewToolResults(results: InterviewToolResult[]): Promise<ApplyInterviewResult[]> {
  const applied: ApplyInterviewResult[] = []
  for (const result of results) {
    const applyResult = await applyInterviewToolResult(result)
    applied.push(applyResult)
  }
  return applied
}

/**
 * Generate human-readable descriptions of what tool results will do
 */
export function describeInterviewToolResults(results: InterviewToolResult[]): string[] {
  return results
    .filter(r => r.success && r.data)
    .map(({ action, data }) => {
      switch (action) {
        case 'createInterview':
          return `Schedule interview at ${(data as { company?: string }).company || 'company'}`
        case 'updateInterview':
          return 'Update interview details'
        case 'rescheduleInterview':
          return 'Reschedule interview'
        case 'cancelInterview':
          return 'Cancel interview'
        case 'deleteInterview':
          return 'Delete interview'
        case 'listInterviews':
          return 'List interviews'
        case 'getInterviewDetails':
          return 'Get interview details'
        case 'updateOutcome':
          return 'Record interview outcome'
        case 'listProcesses':
          return 'List recruitment pipelines'
        case 'addStage':
          return 'Add pipeline stage'
        case 'skipStage':
          return 'Skip pipeline stage'
        case 'completeStage':
          return 'Complete pipeline stage'
        case 'updateProcessStatus':
          return 'Update process status'
        default:
          return `Execute ${action}`
      }
    })
}

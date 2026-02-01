import useInterviewStore from '@/lib/stores/interview-store'
import type { Interview, InterviewFormData } from '@/lib/types/interview'
import type { InterviewToolResult } from '@/lib/interview-tools'

// Re-export for backwards compatibility
export type { InterviewToolResult }

// Extended result with error info
export interface ApplyInterviewResult {
  success: boolean
  description: string | null
  error?: string
  previousValue?: unknown // For undo support
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
    case 'getInterviewDetails': {
      const id = data.id as string
      if (!id) return 'Missing interview ID'
      const exists = interviews.some(i => i.id === id)
      if (!exists) return `Interview with ID "${id}" not found`
      break
    }
  }

  return null
}

/**
 * Get current value for undo support
 */
function getPreviousValue(action: string, data: Record<string, unknown>): unknown {
  const { interviews } = useInterviewStore.getState()

  switch (action) {
    case 'updateInterview':
    case 'rescheduleInterview':
    case 'cancelInterview': {
      const id = data.id as string
      return interviews.find(i => i.id === id)
    }
    default:
      return undefined
  }
}

/**
 * Apply a single tool result to the interview store
 * Returns detailed result with success status, description, and previous value for undo
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

  // Get previous value for undo support
  const previousValue = getPreviousValue(action, data)

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
          previousValue,
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
          previousValue,
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
          previousValue,
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
 * Undo a previously applied interview tool result
 */
export async function undoInterviewToolResult(action: string, previousValue: unknown): Promise<boolean> {
  const store = useInterviewStore.getState()

  try {
    switch (action) {
      case 'createInterview': {
        // previousValue should be the interview ID
        if (previousValue) {
          await store.deleteInterview(previousValue as string)
        }
        return true
      }

      case 'updateInterview':
      case 'rescheduleInterview': {
        const prev = previousValue as Interview
        if (prev) {
          await store.updateInterview(prev.id, {
            company: prev.company,
            position: prev.position,
            scheduledAt: prev.scheduledAt,
            duration: prev.duration,
            interviewType: prev.interviewType,
            location: prev.location,
            notes: prev.notes,
            interviewerName: prev.interviewerName,
          })
        }
        return true
      }

      case 'cancelInterview': {
        const prev = previousValue as Interview
        if (prev) {
          await store.updateInterviewStatus(prev.id, prev.status)
        }
        return true
      }

      default:
        return false
    }
  } catch (err) {
    console.error(`[undoInterviewToolResult] Error undoing ${action}:`, err)
    return false
  }
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
        case 'listInterviews':
          return 'List interviews'
        case 'getInterviewDetails':
          return 'Get interview details'
        default:
          return `Execute ${action}`
      }
    })
}

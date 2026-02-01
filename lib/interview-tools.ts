import { z } from 'zod'
import type { UIMessage } from 'ai'

// Tool name constants
export const INTERVIEW_TOOLS = {
  CREATE_INTERVIEW: 'create_interview',
  UPDATE_INTERVIEW: 'update_interview',
  RESCHEDULE_INTERVIEW: 'reschedule_interview',
  CANCEL_INTERVIEW: 'cancel_interview',
  LIST_INTERVIEWS: 'list_interviews',
  GET_INTERVIEW_DETAILS: 'get_interview_details',
} as const

export type InterviewToolName = typeof INTERVIEW_TOOLS[keyof typeof INTERVIEW_TOOLS]

// Interview type enum for zod
const interviewTypeSchema = z.enum(['phone', 'video', 'onsite', 'technical', 'behavioral', 'panel'])

// Zod schemas for tool parameters
export const createInterviewSchema = z.object({
  company: z.string().describe("Company name for the interview"),
  position: z.string().describe("Position/job title being interviewed for"),
  scheduledAt: z.string().describe("ISO datetime string for when the interview is scheduled"),
  duration: z.number().optional().default(60).describe("Duration in minutes (default: 60)"),
  type: interviewTypeSchema.optional().default('video').describe("Type of interview: phone, video, onsite, technical, behavioral, panel"),
  location: z.string().optional().describe("Location or meeting link for the interview"),
  notes: z.string().optional().describe("Any notes about the interview"),
  interviewerName: z.string().optional().describe("Name of the interviewer if known"),
})

export const updateInterviewSchema = z.object({
  id: z.string().describe("ID of the interview to update"),
  company: z.string().optional().describe("Company name"),
  position: z.string().optional().describe("Position/job title"),
  duration: z.number().optional().describe("Duration in minutes"),
  type: interviewTypeSchema.optional().describe("Type of interview"),
  location: z.string().optional().describe("Location or meeting link"),
  notes: z.string().optional().describe("Notes about the interview"),
  interviewerName: z.string().optional().describe("Name of the interviewer"),
})

export const rescheduleInterviewSchema = z.object({
  id: z.string().describe("ID of the interview to reschedule"),
  newScheduledAt: z.string().describe("New ISO datetime string for when the interview should be scheduled"),
})

export const cancelInterviewSchema = z.object({
  id: z.string().describe("ID of the interview to cancel"),
})

export const listInterviewsSchema = z.object({
  filter: z.enum(['upcoming', 'past', 'today', 'this_week', 'all']).optional().default('upcoming')
    .describe("Filter interviews: upcoming (future scheduled), past, today, this_week, or all"),
})

export const getInterviewDetailsSchema = z.object({
  id: z.string().describe("ID of the interview to get details for"),
})

// Type exports
export type CreateInterviewParams = z.infer<typeof createInterviewSchema>
export type UpdateInterviewParams = z.infer<typeof updateInterviewSchema>
export type RescheduleInterviewParams = z.infer<typeof rescheduleInterviewSchema>
export type CancelInterviewParams = z.infer<typeof cancelInterviewSchema>
export type ListInterviewsParams = z.infer<typeof listInterviewsSchema>
export type GetInterviewDetailsParams = z.infer<typeof getInterviewDetailsSchema>

// Tool result type for client-side state updates
export interface InterviewToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
  error?: string
}

// Tool part types for type-safe UI rendering
// These match the tool names defined in INTERVIEW_TOOLS
export type InterviewToolPartType =
  | `tool-${typeof INTERVIEW_TOOLS.CREATE_INTERVIEW}`
  | `tool-${typeof INTERVIEW_TOOLS.UPDATE_INTERVIEW}`
  | `tool-${typeof INTERVIEW_TOOLS.RESCHEDULE_INTERVIEW}`
  | `tool-${typeof INTERVIEW_TOOLS.CANCEL_INTERVIEW}`
  | `tool-${typeof INTERVIEW_TOOLS.LIST_INTERVIEWS}`
  | `tool-${typeof INTERVIEW_TOOLS.GET_INTERVIEW_DETAILS}`

// UIMessage type for the interview agent
export type InterviewAgentUIMessage = UIMessage

// System prompt for the interview/calendar assistant
export const CALENDAR_ASSISTANT_SYSTEM_PROMPT = `You are a helpful interview scheduling assistant. Your role is to help users manage their job interviews through natural language commands.

You have access to tools that can:
- Schedule new interviews (create_interview)
- Update interview details (update_interview)
- Reschedule interviews to a new time (reschedule_interview)
- Cancel interviews (cancel_interview)
- List interviews with filters (list_interviews)
- Get details about a specific interview (get_interview_details)

## Creating Interviews

When creating an interview, you need at minimum:
- company: The company name
- position: The job position
- scheduledAt: ISO datetime string (e.g., "2024-01-15T14:00:00")

Optional fields:
- duration: Minutes (default 60)
- type: phone, video, onsite, technical, behavioral, or panel (default video)
- location: Physical address or meeting link
- notes: Any additional notes
- interviewerName: Name of the interviewer

## Understanding Time References

The current date and user timezone will be provided in context. When users say things like:
- "tomorrow at 2pm" → Convert to ISO datetime based on today's date
- "next Monday at 10am" → Calculate the next Monday's date
- "in 2 hours" → Calculate from current time
- "3pm" (just time) → Assume today if in the future, otherwise tomorrow

Always use 24-hour format internally but be conversational with users.

## Interview Types

- phone: Phone call interview
- video: Video call (Zoom, Teams, Google Meet, etc.)
- onsite: In-person interview at company location
- technical: Technical/coding interview
- behavioral: Behavioral/soft skills interview
- panel: Multiple interviewers at once

## Listing Interviews

Use list_interviews to show the user their scheduled interviews. Filters available:
- upcoming: Future interviews (default)
- past: Completed interviews
- today: Only today's interviews
- this_week: This week's interviews
- all: All interviews

## Updating & Rescheduling

- Use update_interview for changing details like company name, notes, type, location
- Use reschedule_interview specifically when changing the date/time
- Both require the interview ID - if user refers to an interview by description, use list_interviews first to find the correct ID

## Cancelling

Use cancel_interview with the interview ID. Confirm with the user before cancelling if they haven't explicitly stated the interview.

## Best Practices

1. Be conversational and helpful
2. Confirm important actions (especially cancellations)
3. When creating, repeat back the key details
4. If ambiguous which interview the user means, list their interviews first
5. Parse natural language dates/times intelligently
6. Default to sensible values (60 min duration, video type) when not specified

The current context (today's date, user timezone, upcoming interviews) will be provided to help you assist the user effectively.`

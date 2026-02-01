import { streamText, convertToModelMessages, UIMessage, tool, stepCountIs } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import {
  CALENDAR_ASSISTANT_SYSTEM_PROMPT,
  INTERVIEW_TOOLS,
  createInterviewSchema,
  updateInterviewSchema,
  rescheduleInterviewSchema,
  cancelInterviewSchema,
  listInterviewsSchema,
  getInterviewDetailsSchema,
} from '@/lib/interview-tools'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage, truncateToTokenLimit } from '@/lib/ai/usage-guard'
import type { Interview } from '@/lib/types/interview'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Allow streaming responses up to 60 seconds
export const maxDuration = 60

// Tool result types for client-side state updates
interface ToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
  error?: string
}

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Check AI usage limits
    const usageCheck = await checkCanUseAI(user.id)
    if (!usageCheck.allowed) {
      if (usageCheck.reason === 'not_pro') {
        return new Response(
          JSON.stringify({ error: 'AI features require a Pro subscription', code: 'NOT_PRO' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: 'Monthly AI request limit reached', code: 'LIMIT_EXCEEDED', usage: usageCheck.usage }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages, interviews } = await req.json() as { messages: UIMessage[]; interviews: Interview[] }

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing messages' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Build context about current interviews
    const interviewContext = buildInterviewContext(interviews)
    const truncatedContext = truncateToTokenLimit(interviewContext, usageCheck.tier)

    // Create tools with execute functions
    const tools = createInterviewTools(interviews)

    const result = streamText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      system: `${CALENDAR_ASSISTANT_SYSTEM_PROMPT}

Current Context:
${truncatedContext}`,
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(5),
      temperature: 0.3,
      onFinish: async ({ usage }) => {
        // Record AI usage after completion
        await recordAIUsage(
          user.id,
          usage?.inputTokens ?? 0,
          usage?.outputTokens ?? 0
        )
      },
    })

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        // Mask internal errors from users - only log on server
        console.error('Stream error:', error)
        return 'An error occurred while processing your request.'
      },
    })
  } catch (error: unknown) {
    console.error('Calendar chat error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process request'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Create tools with execute functions
function createInterviewTools(interviews: Interview[]) {
  return {
    [INTERVIEW_TOOLS.CREATE_INTERVIEW]: tool({
      description: "Schedule a new job interview. Requires company name, position, and scheduled datetime.",
      inputSchema: createInterviewSchema,
      execute: async (input): Promise<ToolResult> => {
        return {
          action: 'createInterview',
          success: true,
          data: {
            company: input.company,
            position: input.position,
            scheduledAt: input.scheduledAt,
            duration: input.duration || 60,
            type: input.type || 'video',
            location: input.location,
            notes: input.notes,
            interviewerName: input.interviewerName,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      },
    }),

    [INTERVIEW_TOOLS.UPDATE_INTERVIEW]: tool({
      description: "Update an existing interview's details (not the scheduled time - use reschedule for that).",
      inputSchema: updateInterviewSchema,
      execute: async (input): Promise<ToolResult> => {
        const interview = interviews.find(i => i.id === input.id)
        if (!interview) {
          return {
            action: 'updateInterview',
            success: false,
            error: `Interview with ID "${input.id}" not found`,
          }
        }

        const { id, ...updates } = input
        return {
          action: 'updateInterview',
          success: true,
          data: { id, ...updates },
        }
      },
    }),

    [INTERVIEW_TOOLS.RESCHEDULE_INTERVIEW]: tool({
      description: "Reschedule an interview to a new date and time.",
      inputSchema: rescheduleInterviewSchema,
      execute: async (input): Promise<ToolResult> => {
        const interview = interviews.find(i => i.id === input.id)
        if (!interview) {
          return {
            action: 'rescheduleInterview',
            success: false,
            error: `Interview with ID "${input.id}" not found`,
          }
        }

        return {
          action: 'rescheduleInterview',
          success: true,
          data: {
            id: input.id,
            newScheduledAt: input.newScheduledAt,
          },
        }
      },
    }),

    [INTERVIEW_TOOLS.CANCEL_INTERVIEW]: tool({
      description: "Cancel a scheduled interview.",
      inputSchema: cancelInterviewSchema,
      execute: async (input): Promise<ToolResult> => {
        const interview = interviews.find(i => i.id === input.id)
        if (!interview) {
          return {
            action: 'cancelInterview',
            success: false,
            error: `Interview with ID "${input.id}" not found`,
          }
        }

        return {
          action: 'cancelInterview',
          success: true,
          data: { id: input.id },
        }
      },
    }),

    [INTERVIEW_TOOLS.LIST_INTERVIEWS]: tool({
      description: "List the user's interviews with optional filtering.",
      inputSchema: listInterviewsSchema,
      execute: async (input): Promise<ToolResult> => {
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
        const endOfWeek = new Date(startOfDay.getTime() + 7 * 24 * 60 * 60 * 1000)

        let filtered = interviews

        switch (input.filter) {
          case 'upcoming':
            filtered = interviews.filter(i =>
              new Date(i.scheduledAt) >= now && i.status === 'scheduled'
            )
            break
          case 'past':
            filtered = interviews.filter(i =>
              new Date(i.scheduledAt) < now || i.status === 'completed'
            )
            break
          case 'today':
            filtered = interviews.filter(i => {
              const date = new Date(i.scheduledAt)
              return date >= startOfDay && date < endOfDay
            })
            break
          case 'this_week':
            filtered = interviews.filter(i => {
              const date = new Date(i.scheduledAt)
              return date >= startOfDay && date < endOfWeek
            })
            break
          case 'all':
          default:
            // Return all
            break
        }

        // Sort by date
        filtered.sort((a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
        )

        return {
          action: 'listInterviews',
          success: true,
          data: {
            filter: input.filter || 'upcoming',
            interviews: filtered.map(i => ({
              id: i.id,
              company: i.company,
              position: i.position,
              scheduledAt: i.scheduledAt,
              duration: i.duration,
              type: i.interviewType,
              status: i.status,
              location: i.location,
            })),
          },
        }
      },
    }),

    [INTERVIEW_TOOLS.GET_INTERVIEW_DETAILS]: tool({
      description: "Get full details about a specific interview.",
      inputSchema: getInterviewDetailsSchema,
      execute: async (input): Promise<ToolResult> => {
        const interview = interviews.find(i => i.id === input.id)
        if (!interview) {
          return {
            action: 'getInterviewDetails',
            success: false,
            error: `Interview with ID "${input.id}" not found`,
          }
        }

        return {
          action: 'getInterviewDetails',
          success: true,
          data: {
            id: interview.id,
            company: interview.company,
            position: interview.position,
            scheduledAt: interview.scheduledAt,
            duration: interview.duration,
            type: interview.interviewType,
            status: interview.status,
            location: interview.location,
            meetingLink: interview.meetingLink,
            interviewerName: interview.interviewerName,
            interviewerEmail: interview.interviewerEmail,
            notes: interview.notes,
            prepNotes: interview.prepNotes,
            outcome: interview.outcome,
            feedback: interview.feedback,
          },
        }
      },
    }),
  }
}

function buildInterviewContext(interviews: Interview[]): string {
  const parts: string[] = []
  const now = new Date()
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Current time context
  parts.push('## Current Context')
  parts.push(`- Today's Date: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`)
  parts.push(`- Current Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)
  parts.push(`- User Timezone: ${userTimezone}`)

  // Filter to upcoming 30 days to avoid token bloat
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const relevantInterviews = interviews.filter(i => {
    const date = new Date(i.scheduledAt)
    return date >= thirtyDaysAgo && date <= thirtyDaysFromNow
  })

  // Upcoming interviews
  const upcomingInterviews = relevantInterviews
    .filter(i => new Date(i.scheduledAt) >= now && i.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  parts.push('\n## Upcoming Interviews')
  if (upcomingInterviews.length === 0) {
    parts.push('(no upcoming interviews)')
  } else {
    upcomingInterviews.slice(0, 10).forEach((interview, i) => {
      const date = new Date(interview.scheduledAt)
      parts.push(`\n### Interview ${i + 1} (ID: ${interview.id})`)
      parts.push(`- Company: ${interview.company}`)
      parts.push(`- Position: ${interview.position}`)
      parts.push(`- Date/Time: ${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)
      parts.push(`- Duration: ${interview.duration} minutes`)
      parts.push(`- Type: ${interview.interviewType}`)
      if (interview.location) parts.push(`- Location: ${interview.location}`)
      if (interview.interviewerName) parts.push(`- Interviewer: ${interview.interviewerName}`)
    })
    if (upcomingInterviews.length > 10) {
      parts.push(`\n... and ${upcomingInterviews.length - 10} more upcoming interviews`)
    }
  }

  // Recent past interviews (for context)
  const recentPast = relevantInterviews
    .filter(i => new Date(i.scheduledAt) < now || i.status !== 'scheduled')
    .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())
    .slice(0, 5)

  if (recentPast.length > 0) {
    parts.push('\n## Recent Interviews')
    recentPast.forEach((interview) => {
      const date = new Date(interview.scheduledAt)
      parts.push(`- ${interview.company} (${interview.position}) - ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${interview.status} (ID: ${interview.id})`)
    })
  }

  return parts.join('\n')
}

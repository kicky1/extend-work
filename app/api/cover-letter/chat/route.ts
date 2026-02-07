import { streamText, convertToModelMessages, UIMessage, tool, stepCountIs } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { COVER_LETTER_TOOLS, COVER_LETTER_SYSTEM_PROMPT, coverLetterToolSchemas } from '@/lib/cover-letter-tools'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage, truncateToTokenLimit } from '@/lib/ai/usage-guard'
import type { CoverLetterData } from '@/lib/types/cover-letter'
import type { CVData } from '@/lib/types/cv'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const maxDuration = 60

interface ToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const usageCheck = await checkCanUseAI(user.id)
    if (!usageCheck.allowed) {
      if (usageCheck.reason === 'not_pro') {
        return new Response(
          JSON.stringify({ error: 'AI features require a Pro subscription', code: 'NOT_PRO' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } },
        )
      }
      return new Response(
        JSON.stringify({ error: 'Monthly AI request limit reached', code: 'LIMIT_EXCEEDED', usage: usageCheck.usage }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const { messages, coverLetterData, cvData } = await req.json() as {
      messages: UIMessage[]
      coverLetterData: CoverLetterData
      cvData: CVData
    }

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing messages' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const context = buildContext(coverLetterData, cvData)
    const truncatedContext = truncateToTokenLimit(context, usageCheck.tier)

    const tools = createCoverLetterTools()

    const result = streamText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      system: `${COVER_LETTER_SYSTEM_PROMPT}

Current Cover Letter Data:
${truncatedContext}`,
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(5),
      temperature: 0.3,
      onFinish: async ({ usage }) => {
        await recordAIUsage(
          user.id,
          usage?.inputTokens ?? 0,
          usage?.outputTokens ?? 0,
        )
      },
    })

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        console.error('Cover letter chat stream error:', error)
        return 'An error occurred while processing your request.'
      },
    })
  } catch (error: unknown) {
    console.error('Cover letter chat error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process request'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

function createCoverLetterTools() {
  return {
    [COVER_LETTER_TOOLS.UPDATE_CONTENT]: tool({
      description: 'Replace the entire cover letter content with new HTML content.',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.UPDATE_CONTENT],
      execute: async (input): Promise<ToolResult> => ({
        action: 'updateContent',
        success: true,
        data: input,
      }),
    }),

    [COVER_LETTER_TOOLS.UPDATE_SECTION]: tool({
      description: 'Update a specific section of the cover letter: intro (first paragraph), body (middle), or closing (last paragraph).',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.UPDATE_SECTION],
      execute: async (input): Promise<ToolResult> => ({
        action: 'updateSection',
        success: true,
        data: input,
      }),
    }),

    [COVER_LETTER_TOOLS.UPDATE_TONE]: tool({
      description: 'Change the cover letter tone to professional, friendly, or formal.',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.UPDATE_TONE],
      execute: async (input): Promise<ToolResult> => ({
        action: 'updateTone',
        success: true,
        data: input,
      }),
    }),

    [COVER_LETTER_TOOLS.UPDATE_RECIPIENT]: tool({
      description: 'Update recipient information (name, title, company) and job title.',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.UPDATE_RECIPIENT],
      execute: async (input): Promise<ToolResult> => ({
        action: 'updateRecipient',
        success: true,
        data: input,
      }),
    }),

    [COVER_LETTER_TOOLS.UPDATE_LANGUAGE]: tool({
      description: 'Switch the cover letter language between English and Polish.',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.UPDATE_LANGUAGE],
      execute: async (input): Promise<ToolResult> => ({
        action: 'updateLanguage',
        success: true,
        data: input,
      }),
    }),

    [COVER_LETTER_TOOLS.REGENERATE]: tool({
      description: 'Request a full regeneration of the cover letter with optional additional instructions.',
      inputSchema: coverLetterToolSchemas[COVER_LETTER_TOOLS.REGENERATE],
      execute: async (input): Promise<ToolResult> => ({
        action: 'regenerate',
        success: true,
        data: input,
      }),
    }),
  }
}

function buildContext(coverLetterData: CoverLetterData, cvData: CVData): string {
  const parts: string[] = []

  parts.push('## Cover Letter')
  parts.push(`Tone: ${coverLetterData.tone}`)
  parts.push(`Language: ${coverLetterData.language}`)
  if (coverLetterData.company) parts.push(`Company: ${coverLetterData.company}`)
  if (coverLetterData.jobTitle) parts.push(`Job Title: ${coverLetterData.jobTitle}`)
  if (coverLetterData.jobDescription) parts.push(`Job Description: ${coverLetterData.jobDescription.slice(0, 500)}`)

  parts.push('\n## Current Content')
  if (coverLetterData.content) {
    // Strip HTML for context
    const text = coverLetterData.content
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim()
    parts.push(text || '(empty)')
  } else {
    parts.push('(empty)')
  }

  // Brief CV summary
  parts.push('\n## Candidate Profile')
  if (cvData.personalInfo?.fullName) parts.push(`Name: ${cvData.personalInfo.fullName}`)
  if (cvData.summary) parts.push(`Summary: ${cvData.summary.slice(0, 200)}`)
  if (cvData.workExperience?.length > 0) {
    const recent = cvData.workExperience[0]
    parts.push(`Current/Recent: ${recent.position} at ${recent.company}`)
  }
  if (cvData.skills?.length > 0) {
    parts.push(`Top Skills: ${cvData.skills.slice(0, 5).map((s) => s.name).join(', ')}`)
  }

  return parts.join('\n')
}

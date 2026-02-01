import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest, NextResponse } from 'next/server'
import { systemPrompts, buildPrompt, AIMode, Section } from '@/lib/prompts/cv-prompts'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage, truncateToTokenLimit } from '@/lib/ai/usage-guard'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

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

    const { mode, section, data, userInput } = await req.json()

    if (!mode || !section) {
      return new Response('Missing required fields', { status: 400 })
    }

    const systemPrompt = systemPrompts[mode as AIMode]
    const rawPrompt = buildPrompt(mode as AIMode, section as Section, data, userInput)

    // Truncate input to token limit
    const prompt = truncateToTokenLimit(rawPrompt, usageCheck.tier)

    const result = streamText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      system: systemPrompt,
      prompt,
      temperature: 0.7,
      maxOutputTokens: 1000,
      onFinish: async ({ usage }) => {
        // Record AI usage after stream completes
        await recordAIUsage(
          user.id,
          usage?.inputTokens ?? 0,
          usage?.outputTokens ?? 0
        )
      },
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
    console.error('AI generation error:', error)
    return new Response(error.message || 'Failed to generate content', {
      status: 500,
    })
  }
}

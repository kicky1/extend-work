import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import { systemPrompts, buildPrompt, AIMode, Section } from '@/lib/prompts/cv-prompts'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { mode, section, data, userInput } = await req.json()

    if (!mode || !section) {
      return new Response('Missing required fields', { status: 400 })
    }

    const systemPrompt = systemPrompts[mode as AIMode]
    const prompt = buildPrompt(mode as AIMode, section as Section, data, userInput)

    const result = streamText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      system: systemPrompt,
      prompt,
      temperature: 0.7,
      maxOutputTokens: 1000,
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
    console.error('AI generation error:', error)
    return new Response(error.message || 'Failed to generate content', {
      status: 500,
    })
  }
}

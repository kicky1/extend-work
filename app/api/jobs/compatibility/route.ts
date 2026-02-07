import { after } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { z } from 'zod'
import { checkCanUseAI, recordAIUsage } from '@/lib/ai/usage-guard'
import { buildCVSummary } from '@/lib/ai/cv-summary'
import type { JobCompatibilityAnalysis } from '@/lib/types/job'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Schema for AI response
const compatibilitySchema = z.object({
  score: z.number().min(0).max(100).describe('Overall compatibility score'),
  matchingSkills: z.array(z.string()).describe('Skills from CV that match job requirements'),
  missingSkills: z.array(z.string()).describe('Skills required by job but missing from CV'),
  strengthAreas: z.array(z.string()).describe('Areas where candidate excels for this role'),
  improvementSuggestions: z.array(z.string()).describe('Actionable suggestions to improve candidacy'),
  coverLetterTips: z.array(z.string()).describe('Tips for writing a strong cover letter'),
  overallFit: z.enum(['excellent', 'good', 'fair', 'poor']).describe('Overall fit assessment'),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check AI usage limits (Pro feature)
    const canUse = await checkCanUseAI(user.id)
    if (!canUse.allowed) {
      return NextResponse.json(
        {
          error: 'AI limit reached',
          message: canUse.reason || 'Upgrade to Pro to access AI features',
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { jobDescription, cvData } = body

    if (!jobDescription || !cvData) {
      return NextResponse.json(
        { error: 'Job description and CV data required' },
        { status: 400 }
      )
    }

    // Build CV summary for analysis
    const cvSummary = buildCVSummary(cvData)

    // Call AI for compatibility analysis
    const result = await generateObject({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      schema: compatibilitySchema,
      temperature: 0,
      system: `You are an expert career advisor and recruiter. Analyze the compatibility between a candidate's CV and a job description.

Be specific and actionable in your feedback. Consider:
- Technical skills match
- Experience level alignment
- Industry/domain fit
- Soft skills indicators
- Career trajectory

Provide honest, constructive feedback that helps the candidate understand their fit and how to improve.`,
      prompt: `Analyze the compatibility between this CV and job description.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE CV:
${cvSummary}

Provide a detailed compatibility analysis.`,
    })

    // Record AI usage (non-blocking)
    after(
      recordAIUsage(
        user.id,
        result.usage?.inputTokens ?? 0,
        result.usage?.outputTokens ?? 0
      )
    )

    const object = result.object

    const analysis: JobCompatibilityAnalysis = {
      score: object.score,
      matchingSkills: object.matchingSkills,
      missingSkills: object.missingSkills,
      strengthAreas: object.strengthAreas,
      improvementSuggestions: object.improvementSuggestions,
      coverLetterTips: object.coverLetterTips,
      overallFit: object.overallFit,
    }

    return NextResponse.json({ analysis })
  } catch (error: unknown) {
    console.error('[Compatibility API] Error:', error)
    return NextResponse.json(
      { error: 'Analysis failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse, after } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { checkCanUseAI, recordAIUsage } from '@/lib/ai/usage-guard'
import { buildCVSummary } from '@/lib/ai/cv-summary'
import type { CVData } from '@/lib/types/cv'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerateRequest {
  jobTitle?: string
  company?: string
  jobDescription?: string
  cvData: CVData
  tone?: 'professional' | 'friendly' | 'formal'
  language?: 'en' | 'pl'
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canUse = await checkCanUseAI(user.id)
    if (!canUse.allowed) {
      return NextResponse.json(
        {
          error: canUse.reason === 'not_pro'
            ? 'AI features require a Pro subscription'
            : 'Monthly AI request limit reached',
          code: canUse.reason === 'not_pro' ? 'NOT_PRO' : 'LIMIT_EXCEEDED',
        },
        { status: canUse.reason === 'not_pro' ? 403 : 429 },
      )
    }

    const body: GenerateRequest = await request.json()
    const {
      jobTitle,
      company,
      jobDescription,
      cvData,
      tone = 'professional',
      language = 'en',
    } = body

    if (!cvData) {
      return NextResponse.json({ error: 'CV data is required' }, { status: 400 })
    }

    const cvSummary = buildCVSummary(cvData)

    const toneInstructions: Record<string, string> = {
      professional: 'Write in a professional but approachable tone. Be confident but not arrogant.',
      friendly: 'Write in a warm, friendly tone while maintaining professionalism. Show personality.',
      formal: 'Write in a formal, traditional business letter style. Be respectful and reserved.',
    }

    const languageInstructions = language === 'pl'
      ? 'Write the entire cover letter in Polish. Use Polish business letter conventions.'
      : 'Write the cover letter in English.'

    const hasJobInfo = jobTitle && company && jobDescription

    const prompt = hasJobInfo
      ? `Write a cover letter for this job application.

JOB INFORMATION:
Position: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription}

CANDIDATE PROFILE:
${cvSummary}

Write a personalized cover letter that effectively positions this candidate for the role.`
      : `Write a general cover letter for this candidate that showcases their strengths and experience.
${company ? `The letter should be addressed to ${company}.` : ''}
${jobTitle ? `The candidate is interested in ${jobTitle} positions.` : ''}

CANDIDATE PROFILE:
${cvSummary}

Write a compelling general cover letter that can be adapted for various applications.`

    const result = await generateText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      temperature: 0.7,
      system: `You are an expert career coach who writes ATS-optimized cover letters that also read naturally to humans.

STRUCTURE (strictly follow this order):
1. Greeting: "Dear ${company ? `${company} Hiring Team` : 'Hiring Team'},"
2. Opening paragraph: Express enthusiasm for the role, state why you're a strong fit in 2-3 sentences.
3. 1-2 body paragraphs: Map the candidate's strongest experiences and achievements to the job requirements. Use quantifiable results (numbers, percentages, metrics) from the CV whenever available. Mirror keywords and phrases from the job description naturally.
4. Closing paragraph: Reiterate interest, include a clear call to action (e.g. eager to discuss further).

RULES:
- Output as HTML using only <p> tags. Each paragraph in its own <p> tag.
- Prose paragraphs only — NO headers, NO bullet points, NO lists.
- Under 400 words total.
- Do NOT include sender address, date, or sign-off (e.g. "Sincerely") — the app adds those.
- Avoid generic filler ("I am writing to apply…"). Be specific and direct.
${hasJobInfo ? '- Weave in keywords from the job description naturally to pass ATS screening.\n- Show genuine knowledge of the company and role.' : '- Focus on the candidate\'s most impressive and transferable achievements.\n- Keep it adaptable for various roles.'}

${languageInstructions}
${toneInstructions[tone]}`,
      prompt,
    })

    after(async () => {
      await recordAIUsage(
        user.id,
        result.usage?.inputTokens ?? 0,
        result.usage?.outputTokens ?? 0,
      )
    })

    return NextResponse.json({
      coverLetter: result.text,
      metadata: {
        tone,
        language,
        wordCount: result.text.split(/\s+/).length,
      },
    })
  } catch (error: unknown) {
    console.error('[Cover Letter Generate API] Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Generation failed', message },
      { status: 500 },
    )
  }
}

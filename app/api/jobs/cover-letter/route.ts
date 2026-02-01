import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { checkCanUseAI, recordAIUsage } from '@/lib/ai/usage-guard'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface CoverLetterRequest {
  jobTitle: string
  company: string
  jobDescription: string
  cvData: any
  tone?: 'professional' | 'friendly' | 'formal'
  language?: 'en' | 'pl'
  additionalContext?: string
}

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

    const body: CoverLetterRequest = await request.json()
    const {
      jobTitle,
      company,
      jobDescription,
      cvData,
      tone = 'professional',
      language = 'en',
      additionalContext,
    } = body

    if (!jobTitle || !company || !jobDescription || !cvData) {
      return NextResponse.json(
        { error: 'Job title, company, job description, and CV data required' },
        { status: 400 }
      )
    }

    // Build CV summary
    const cvSummary = buildCVSummary(cvData)

    // Determine tone instructions
    const toneInstructions = {
      professional: 'Write in a professional but approachable tone. Be confident but not arrogant.',
      friendly: 'Write in a warm, friendly tone while maintaining professionalism. Show personality.',
      formal: 'Write in a formal, traditional business letter style. Be respectful and reserved.',
    }

    // Language instructions
    const languageInstructions = language === 'pl'
      ? 'Write the entire cover letter in Polish. Use Polish business letter conventions.'
      : 'Write the cover letter in English.'

    const result = await generateText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      temperature: 0.7,
      system: `You are an expert career coach and professional writer specializing in cover letters.

Your task is to write a compelling, personalized cover letter that:
- Highlights the candidate's most relevant experience and skills
- Connects their background to the specific job requirements
- Shows genuine interest in the company and role
- Is concise (3-4 paragraphs, under 400 words)
- Has a strong opening hook and clear call to action
- Avoids generic phrases and clichés

${languageInstructions}
${toneInstructions[tone]}`,
      prompt: `Write a cover letter for this job application.

JOB INFORMATION:
Position: ${jobTitle}
Company: ${company}
Job Description: ${jobDescription}

CANDIDATE PROFILE:
${cvSummary}

${additionalContext ? `ADDITIONAL CONTEXT FROM CANDIDATE:\n${additionalContext}\n` : ''}

Write a personalized cover letter that effectively positions this candidate for the role.`,
    })

    // Record AI usage
    await recordAIUsage(
      user.id,
      result.usage?.inputTokens ?? 0,
      result.usage?.outputTokens ?? 0
    )

    const text = result.text

    return NextResponse.json({
      coverLetter: text,
      metadata: {
        tone,
        language,
        wordCount: text.split(/\s+/).length,
      },
    })
  } catch (error: any) {
    console.error('[Cover Letter API] Error:', error)
    return NextResponse.json(
      { error: 'Generation failed', message: error.message },
      { status: 500 }
    )
  }
}

// Helper to build CV summary text
function buildCVSummary(cvData: any): string {
  const parts: string[] = []

  if (cvData.personalInfo) {
    parts.push(`Name: ${cvData.personalInfo.fullName || 'Not specified'}`)
    if (cvData.personalInfo.location) {
      parts.push(`Location: ${cvData.personalInfo.location}`)
    }
  }

  if (cvData.summary) {
    parts.push(`\nProfessional Summary:\n${cvData.summary}`)
  }

  if (cvData.workExperience?.length > 0) {
    parts.push('\nRelevant Experience:')
    for (const exp of cvData.workExperience.slice(0, 3)) {
      const duration = exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`
      parts.push(`- ${exp.position} at ${exp.company} (${duration})`)
      if (exp.achievements?.length > 0) {
        parts.push(`  Key achievements: ${exp.achievements.slice(0, 2).join('; ')}`)
      }
    }
  }

  if (cvData.education?.length > 0) {
    const edu = cvData.education[0]
    parts.push(`\nEducation: ${edu.degree} in ${edu.field} from ${edu.institution}`)
  }

  if (cvData.skills?.length > 0) {
    const topSkills = cvData.skills.slice(0, 10).map((s: any) => s.name)
    parts.push(`\nKey Skills: ${topSkills.join(', ')}`)
  }

  return parts.join('\n')
}

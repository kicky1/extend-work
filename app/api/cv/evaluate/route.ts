import { generateObject } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { after } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage, truncateToTokenLimit } from '@/lib/ai/usage-guard'
import type { CVData } from '@/lib/types/cv'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Simplified schema - Anthropic doesn't support discriminatedUnion/oneOf
const CVSectionRefSchema = z.object({
  type: z.enum(['personalInfo', 'summary', 'workExperience', 'education', 'skill', 'language', 'skills', 'languages']),
  id: z.string().optional().describe('Required for workExperience, education, skill, language types'),
  field: z.string().optional().describe('Optional field name for personalInfo type'),
})

const CVIssueSchema = z.object({
  id: z.string(),
  severity: z.enum(['critical', 'warning', 'suggestion']),
  title: z.string(),
  description: z.string(),
  suggestion: z.string().optional(),
  ref: CVSectionRefSchema,
})

const SectionScoreSchema = z.object({
  section: z.string(),
  score: z.number().describe('Score from 0 to 100'),
  issues: z.array(z.string()),
})

const KeywordAnalysisSchema = z.object({
  found: z.array(z.string()).describe('Relevant keywords found in the CV (action verbs, industry terms, technical skills)'),
  missing: z.array(z.string()).describe('Recommended keywords that should be added'),
  score: z.number().describe('Keyword optimization score from 0 to 100'),
})

const CVEvaluationSchema = z.object({
  overallScore: z.number().describe('Overall score from 0 to 100'),
  sectionScores: z.array(SectionScoreSchema),
  issues: z.array(CVIssueSchema),
  strengths: z.array(z.string()),
  keywordAnalysis: KeywordAnalysisSchema,
  atsScore: z.number().describe('ATS compatibility score from 0 to 100 (formatting, structure, parsability)'),
  jobMatchScore: z.number().optional().describe('Job match score from 0 to 100 (only if job description provided)'),
})

interface ReEvaluationContext {
  previousEvaluation: {
    overallScore: number
    atsScore: number
    keywordAnalysis: { score: number }
    sectionScores: Array<{ section: string; score: number }>
    issues: Array<{ id: string; title: string; description: string; severity: string }>
  }
  fixedIssueIds: string[]
}

function buildEvaluationPrompt(
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  jobDescription?: string,
  reEvalContext?: ReEvaluationContext
) {
  // Build a list of all IDs for reference
  const workIds = cvData.workExperience.map(w => `"${w.id}" (${w.company})`).join(', ')
  const eduIds = cvData.education.map(e => `"${e.id}" (${e.institution})`).join(', ')
  const skillIds = cvData.skills.map(s => `"${s.id}" (${s.name})`).join(', ')
  const langIds = cvData.languages.map(l => `"${l.id}" (${l.name})`).join(', ')

  const jobMatchSection = jobDescription ? `
## JOB DESCRIPTION:
${jobDescription}

## JOB MATCH SCORING:
Evaluate how well this CV matches the job description:
- Relevant experience alignment
- Required skills coverage
- Industry/domain fit
- Seniority level match
- Provide a jobMatchScore (0-100) based on relevance
` : ''

  // Build re-evaluation anchoring section if this is a re-evaluation
  let reEvalSection = ''
  if (reEvalContext) {
    const { previousEvaluation, fixedIssueIds } = reEvalContext
    const fixedIssues = previousEvaluation.issues.filter(i => fixedIssueIds.includes(i.id))
    const unfixedIssues = previousEvaluation.issues.filter(i => !fixedIssueIds.includes(i.id))

    reEvalSection = `
## RE-EVALUATION CONTEXT (IMPORTANT)
This is a RE-EVALUATION after fixes were applied. You MUST use the previous scores as anchors.

### Previous Scores:
- Overall Score: ${previousEvaluation.overallScore}
- ATS Score: ${previousEvaluation.atsScore}
- Keyword Score: ${previousEvaluation.keywordAnalysis.score}
- Section Scores: ${previousEvaluation.sectionScores.map(s => `${s.section}: ${s.score}`).join(', ')}

### Issues That Were FIXED (${fixedIssues.length}):
${fixedIssues.map(i => `- [${i.severity}] ${i.title}: ${i.description}`).join('\n') || '(none)'}

### Issues That Were NOT Fixed (${unfixedIssues.length}):
${unfixedIssues.map(i => `- [${i.severity}] ${i.title}: ${i.description}`).join('\n') || '(none)'}

## RE-EVALUATION SCORING RULES (MUST FOLLOW):
1. **For each FIXED issue**: Verify if the fix was applied correctly in the CV data. If yes, the related score dimension MUST improve or stay the same (never decrease for a successful fix).
2. **Score anchoring**: Start from the previous scores and adjust based on fixes. Don't re-score from scratch.
3. **Improvement calculation**:
   - Critical fix successfully applied: +5 to +15 points to relevant dimension
   - Warning fix successfully applied: +3 to +8 points to relevant dimension
   - Suggestion fix successfully applied: +1 to +5 points to relevant dimension
4. **Overall score**: Should reflect the cumulative improvement from all successful fixes.
5. **New issues**: Only identify NEW issues not present in the previous evaluation. Do not re-list unfixed issues with different IDs.
6. **Consistency**: If no changes were made to a section, its score should remain the same as the previous evaluation.

`
  }

  return `Evaluate this CV for quality, completeness, and ATS-friendliness.
${reEvalSection}
## CV DATA:
${JSON.stringify(cvData, null, 2)}

## AVAILABLE IDs FOR REFERENCES:
- Work Experience IDs: ${workIds || 'none'}
- Education IDs: ${eduIds || 'none'}
- Skill IDs: ${skillIds || 'none'}
- Language IDs: ${langIds || 'none'}
${jobMatchSection}
## EVALUATION CRITERIA:

1. **Completeness**: Are all key sections filled out?
2. **Quality**: Is the content well-written and impactful?
3. **Consistency**: Are dates, formatting, and style consistent?
4. **Impact**: Do achievements use action verbs and quantified results?

5. **Keyword Optimization** (provide keywordAnalysis):
   - Identify strong ACTION VERBS found (led, developed, achieved, optimized, etc.)
   - Identify INDUSTRY TERMS and TECHNICAL SKILLS present
   - List MISSING keywords that would strengthen the CV
   - Score 0-100 based on keyword density and relevance

6. **Strict ATS Compatibility** (provide atsScore):
   - Standard section headers (Summary, Experience, Education, Skills)
   - No special characters, tables, or complex formatting
   - Proper date formats (YYYY-MM or Month YYYY)
   - No images, graphics, or icons in content
   - Contact information properly structured
   - Score 0-100 with strict penalties for ATS-unfriendly elements

${jobDescription ? '7. **Job Match** (provide jobMatchScore): See job match criteria above.' : ''}

## SCORING GUIDELINES:
- **90-100**: Excellent, professional-ready
- **80-89**: Very good, minor improvements possible
- **70-79**: Good, some areas need attention
- **60-69**: Fair, several improvements needed
- **Below 60**: Needs significant work

## ISSUE SEVERITY:
- **critical**: Missing essential information or major problems
- **warning**: Issues that should be addressed
- **suggestion**: Nice-to-have improvements

When referencing specific sections, use the exact IDs provided above. Generate unique issue IDs like "issue-1", "issue-2", etc.

Focus on actionable feedback. Be specific about what needs improvement and how.`
}

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check AI usage limits
    const usageCheck = await checkCanUseAI(user.id)
    if (!usageCheck.allowed) {
      if (usageCheck.reason === 'not_pro') {
        return NextResponse.json(
          { error: 'AI features require a Pro subscription', code: 'NOT_PRO' },
          { status: 403 }
        )
      }
      return NextResponse.json(
        { error: 'Monthly AI request limit reached', code: 'LIMIT_EXCEEDED', usage: usageCheck.usage },
        { status: 429 }
      )
    }

    const { cvData, jobDescription, previousEvaluation, fixedIssueIds } = await req.json()

    if (!cvData) {
      return NextResponse.json({ error: 'Missing CV data' }, { status: 400 })
    }

    // Build re-evaluation context if this is a re-evaluation
    const reEvalContext = previousEvaluation && fixedIssueIds?.length > 0
      ? { previousEvaluation, fixedIssueIds }
      : undefined

    const rawPrompt = buildEvaluationPrompt(cvData, jobDescription, reEvalContext)

    // Truncate input to token limit
    const prompt = truncateToTokenLimit(rawPrompt, usageCheck.tier)

    const isReEvaluation = !!reEvalContext

    const result = await generateObject({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      schema: CVEvaluationSchema,
      system: `You are an expert CV/resume evaluator with deep knowledge of hiring practices, ATS systems, and professional resume writing. Your job is to provide constructive, specific feedback to help job seekers improve their CVs.

Be thorough but fair. Identify real issues that could hurt the candidate's chances, not nitpicks. Provide actionable suggestions.

IMPORTANT REQUIREMENTS:
1. When referencing CV sections in issues, use the exact IDs provided for work experience, education, skills, and languages. For the summary section, use type: "summary". For personal info, use type: "personalInfo".

2. For keywordAnalysis: List actual keywords/phrases found and those that should be added. Be specific with action verbs (led, developed, managed, etc.) and industry terms.

3. For atsScore: Be strict about ATS compatibility. Penalize for:
   - Non-standard section headers
   - Special characters or symbols
   - Inconsistent date formats
   - Missing contact information
   - Poor structure/organization

4. Only include jobMatchScore if a job description was provided.

${isReEvaluation ? `5. RE-EVALUATION MODE: This is a re-evaluation after fixes. You MUST:
   - Use the previous scores as baseline anchors
   - Verify each fixed issue and reward successful fixes with score improvements
   - Never decrease a score for a section where a fix was successfully applied
   - Maintain consistency for unchanged sections
   - Only report NEW issues, not re-list existing unfixed issues` : ''}`,
      prompt,
      temperature: 0, // Use temperature 0 for deterministic, consistent scoring
    })

    // Record AI usage (non-blocking)
    after(
      recordAIUsage(
        user.id,
        result.usage?.inputTokens ?? 0,
        result.usage?.outputTokens ?? 0
      )
    )

    return NextResponse.json({
      ...result.object,
      timestamp: new Date().toISOString(),
      usage: { current: (usageCheck.usage?.current ?? 0) + 1, limit: usageCheck.usage?.limit ?? 0 },
    })
  } catch (error: unknown) {
    console.error('CV evaluation error:', error)
    const message = error instanceof Error ? error.message : 'Failed to evaluate CV'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

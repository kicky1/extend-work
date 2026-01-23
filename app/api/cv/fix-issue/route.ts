import { generateText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest, NextResponse } from 'next/server'
import { cvTools } from '@/lib/cv-tools'
import type { CVData } from '@/lib/types/cv'
import type { CVIssue } from '@/lib/types/cv-evaluation'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { issue, cvData } = await req.json() as { issue: CVIssue; cvData: CVData }

    if (!issue || !cvData) {
      return NextResponse.json(
        { error: 'Missing issue or CV data' },
        { status: 400 }
      )
    }

    // Build context about the specific section being fixed
    const sectionContext = buildSectionContext(cvData, issue)

    const result = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      system: `You are a CV improvement assistant. Your job is to fix specific issues identified in a CV evaluation.

You have tools available to make changes to the CV. Use ONLY the tools necessary to fix the specific issue described.

Important guidelines:
- Make minimal, targeted changes to address the issue
- Don't make unnecessary modifications
- If the issue is about missing information, add appropriate content
- If the issue is about quality, improve the existing content
- If the issue is about formatting or structure, make the necessary adjustments
- Preserve the user's tone and style when making improvements`,
      prompt: `Fix this CV issue:

## Issue Details
- ID: ${issue.id}
- Severity: ${issue.severity}
- Title: ${issue.title}
- Description: ${issue.description}
${issue.suggestion ? `- Suggested fix: ${issue.suggestion}` : ''}

## Section Reference
- Type: ${issue.ref.type}
${issue.ref.id ? `- Item ID: ${issue.ref.id}` : ''}
${issue.ref.field ? `- Field: ${issue.ref.field}` : ''}

## Current Content
${sectionContext}

Please use the appropriate tool(s) to fix this issue. Be specific and targeted in your changes.`,
      tools: cvTools,
      maxRetries: 2,
      temperature: 0.3,
    })

    // Extract tool calls from the result
    const toolCalls = result.steps.flatMap(step =>
      step.toolCalls.map(tc => ({
        toolName: tc.toolName,
        args: tc.input,
      }))
    )

    return NextResponse.json({
      explanation: result.text,
      toolCalls,
    })
  } catch (error: unknown) {
    console.error('Fix issue error:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate fix'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function buildSectionContext(cvData: CVData, issue: CVIssue): string {
  const parts: string[] = []
  const { ref } = issue

  switch (ref.type) {
    case 'personalInfo':
      parts.push('## Personal Information')
      const { personalInfo } = cvData
      parts.push(`- Full Name: ${personalInfo.fullName || '(empty)'}`)
      parts.push(`- Email: ${personalInfo.email || '(empty)'}`)
      parts.push(`- Phone: ${personalInfo.phone || '(empty)'}`)
      parts.push(`- Location: ${personalInfo.location || '(empty)'}`)
      parts.push(`- Website: ${personalInfo.website || '(empty)'}`)
      parts.push(`- LinkedIn: ${personalInfo.linkedIn || '(empty)'}`)
      parts.push(`- GitHub: ${personalInfo.github || '(empty)'}`)
      break

    case 'summary':
      parts.push('## Professional Summary')
      parts.push(cvData.summary || '(empty)')
      break

    case 'workExperience':
      if (ref.id) {
        const exp = cvData.workExperience.find(e => e.id === ref.id)
        if (exp) {
          parts.push(`## Work Experience (ID: ${exp.id})`)
          parts.push(`- Company: ${exp.company}`)
          parts.push(`- Position: ${exp.position}`)
          parts.push(`- Start Date: ${exp.startDate}`)
          parts.push(`- End Date: ${exp.current ? 'Present' : exp.endDate}`)
          parts.push(`- Location: ${exp.location || '(empty)'}`)
          parts.push(`- Description: ${exp.description || '(empty)'}`)
          if (exp.achievements.length > 0) {
            parts.push('- Achievements:')
            exp.achievements.forEach(a => parts.push(`  - ${a}`))
          } else {
            parts.push('- Achievements: (none)')
          }
        }
      } else {
        parts.push('## All Work Experience')
        cvData.workExperience.forEach((exp, i) => {
          parts.push(`\n### ${i + 1}. ${exp.company} - ${exp.position} (ID: ${exp.id})`)
        })
      }
      break

    case 'education':
      if (ref.id) {
        const edu = cvData.education.find(e => e.id === ref.id)
        if (edu) {
          parts.push(`## Education (ID: ${edu.id})`)
          parts.push(`- Institution: ${edu.institution}`)
          parts.push(`- Degree: ${edu.degree}`)
          parts.push(`- Field: ${edu.field}`)
          parts.push(`- Start Date: ${edu.startDate}`)
          parts.push(`- End Date: ${edu.current ? 'Present' : edu.endDate}`)
          parts.push(`- GPA: ${edu.gpa || '(empty)'}`)
          parts.push(`- Description: ${edu.description || '(empty)'}`)
        }
      }
      break

    case 'skill':
    case 'skills':
      if (ref.id) {
        const skill = cvData.skills.find(s => s.id === ref.id)
        if (skill) {
          parts.push(`## Skill (ID: ${skill.id})`)
          parts.push(`- Name: ${skill.name}`)
          parts.push(`- Category: ${skill.category}`)
          parts.push(`- Level: ${skill.level || '(not specified)'}`)
        }
      } else {
        parts.push('## All Skills')
        cvData.skills.forEach(s => parts.push(`- ${s.name} (${s.category}, ${s.level || 'no level'}) - ID: ${s.id}`))
      }
      break

    case 'language':
    case 'languages':
      if (ref.id) {
        const lang = cvData.languages.find(l => l.id === ref.id)
        if (lang) {
          parts.push(`## Language (ID: ${lang.id})`)
          parts.push(`- Name: ${lang.name}`)
          parts.push(`- Level: ${lang.level}`)
        }
      } else {
        parts.push('## All Languages')
        cvData.languages.forEach(l => parts.push(`- ${l.name} (${l.level}) - ID: ${l.id}`))
      }
      break
  }

  return parts.join('\n')
}

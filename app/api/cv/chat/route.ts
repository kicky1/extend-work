import { generateText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest, NextResponse } from 'next/server'
import { cvTools, CV_EDITOR_SYSTEM_PROMPT } from '@/lib/cv-tools'
import type { CVData } from '@/lib/types/cv'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message, cvData } = await req.json() as { message: string; cvData: CVData }

    if (!message) {
      return NextResponse.json(
        { error: 'Missing message' },
        { status: 400 }
      )
    }

    // Build context about current CV
    const cvContext = buildCVContext(cvData)

    const result = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      system: CV_EDITOR_SYSTEM_PROMPT,
      prompt: `Current CV Data:
${cvContext}

User request: ${message}`,
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
      text: result.text,
      toolCalls,
    })
  } catch (error: any) {
    console.error('CV chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}

function buildCVContext(cvData: CVData): string {
  const parts: string[] = []

  // Personal Info
  parts.push('## Personal Information')
  const { personalInfo } = cvData
  parts.push(`- Full Name: ${personalInfo.fullName}`)
  parts.push(`- Email: ${personalInfo.email}`)
  parts.push(`- Phone: ${personalInfo.phone}`)
  parts.push(`- Location: ${personalInfo.location}`)
  if (personalInfo.website) parts.push(`- Website: ${personalInfo.website}`)
  if (personalInfo.linkedIn) parts.push(`- LinkedIn: ${personalInfo.linkedIn}`)
  if (personalInfo.github) parts.push(`- GitHub: ${personalInfo.github}`)

  // Summary
  parts.push('\n## Professional Summary')
  parts.push(cvData.summary || '(empty)')

  // Work Experience
  parts.push('\n## Work Experience')
  if (cvData.workExperience.length === 0) {
    parts.push('(no entries)')
  } else {
    cvData.workExperience.forEach((exp, i) => {
      parts.push(`\n### Experience ${i + 1} (ID: ${exp.id})`)
      parts.push(`- Company: ${exp.company}`)
      parts.push(`- Position: ${exp.position}`)
      parts.push(`- Dates: ${exp.startDate} to ${exp.current ? 'Present' : exp.endDate}`)
      parts.push(`- Location: ${exp.location}`)
      if (exp.description) parts.push(`- Description: ${exp.description}`)
      if (exp.achievements.length > 0) {
        parts.push('- Achievements:')
        exp.achievements.forEach(a => parts.push(`  - ${a}`))
      }
    })
  }

  // Education
  parts.push('\n## Education')
  if (cvData.education.length === 0) {
    parts.push('(no entries)')
  } else {
    cvData.education.forEach((edu, i) => {
      parts.push(`\n### Education ${i + 1} (ID: ${edu.id})`)
      parts.push(`- Institution: ${edu.institution}`)
      parts.push(`- Degree: ${edu.degree}`)
      parts.push(`- Field: ${edu.field}`)
      parts.push(`- Dates: ${edu.startDate} to ${edu.current ? 'Present' : edu.endDate}`)
      if (edu.gpa) parts.push(`- GPA: ${edu.gpa}`)
      if (edu.description) parts.push(`- Description: ${edu.description}`)
    })
  }

  // Skills
  parts.push('\n## Skills')
  if (cvData.skills.length === 0) {
    parts.push('(no entries)')
  } else {
    cvData.skills.forEach((skill, i) => {
      parts.push(`- ${skill.name} (ID: ${skill.id}, Category: ${skill.category}, Level: ${skill.level || 'not specified'})`)
    })
  }

  // Theme
  parts.push('\n## Current Theme')
  parts.push(`- Primary Color: ${cvData.theme.colors.primary}`)
  parts.push(`- Accent Color: ${cvData.theme.colors.accent}`)
  parts.push(`- Text Color: ${cvData.theme.colors.text}`)
  parts.push(`- Background Color: ${cvData.theme.colors.background}`)
  parts.push(`- Heading Font: ${cvData.theme.fonts.heading}`)
  parts.push(`- Body Font: ${cvData.theme.fonts.body}`)
  parts.push(`- Layout: ${cvData.theme.layout}`)
  parts.push(`- Header Style: ${cvData.theme.headerStyle || 'centered'}`)
  parts.push(`- Skills Style: ${cvData.theme.skillsStyle || 'list'}`)
  parts.push(`- Section Divider: ${cvData.theme.sectionDivider || 'line'}`)

  // Section Order
  parts.push('\n## Section Order')
  const sectionOrder = cvData.sectionOrder || ['summary', 'workExperience', 'education', 'skills']
  parts.push(`Current order: ${sectionOrder.join(' → ')}`)

  return parts.join('\n')
}

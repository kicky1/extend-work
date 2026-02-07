import { generateText, tool, stepCountIs } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { after } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { CV_TOOLS } from '@/lib/cv-tools'
import { predefinedThemes, getThemeById } from '@/lib/cv-themes'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage } from '@/lib/ai/usage-guard'
import type { CVData, CVTheme, CVSectionType } from '@/lib/types/cv'
import type { CVIssue } from '@/lib/types/cv-evaluation'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Tool result type matching the chat route
interface ToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
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

    const { issue, cvData } = await req.json() as { issue: CVIssue; cvData: CVData }

    if (!issue || !cvData) {
      return NextResponse.json(
        { error: 'Missing issue or CV data' },
        { status: 400 }
      )
    }

    // Build context about the specific section being fixed
    const sectionContext = buildSectionContext(cvData, issue)

    // Create tools with execute functions (same pattern as chat route)
    const tools = createFixTools(cvData)

    const result = await generateText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
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
      tools,
      stopWhen: stepCountIs(3),
      maxRetries: 2,
      temperature: 0.3,
    })

    // Record AI usage (non-blocking)
    after(
      recordAIUsage(
        user.id,
        result.usage?.inputTokens ?? 0,
        result.usage?.outputTokens ?? 0
      )
    )

    // Extract tool results from steps (execute functions were called server-side)
    const toolResults: ToolResult[] = result.steps.flatMap(step =>
      step.toolResults.map(tr => tr.output as ToolResult)
    )

    return NextResponse.json({
      explanation: result.text,
      toolResults,
      usage: { current: (usageCheck.usage?.current ?? 0) + 1, limit: usageCheck.usage?.limit ?? 0 },
    })
  } catch (error: unknown) {
    console.error('Fix issue error:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate fix'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Create tools with execute functions (mirroring chat route pattern)
function createFixTools(cvData: CVData) {
  return {
    [CV_TOOLS.UPDATE_PERSONAL_INFO]: tool({
      description: "Update the user's personal information such as name, email, phone, location, website, LinkedIn, or GitHub.",
      inputSchema: z.object({
        fullName: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        website: z.string().optional(),
        linkedIn: z.string().optional(),
        github: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        return { action: 'updatePersonalInfo', success: true, data: input }
      },
    }),

    [CV_TOOLS.UPDATE_SUMMARY]: tool({
      description: "Update or rewrite the professional summary section of the CV.",
      inputSchema: z.object({ summary: z.string() }),
      execute: async ({ summary }): Promise<ToolResult> => {
        return { action: 'updateSummary', success: true, data: { summary } }
      },
    }),

    [CV_TOOLS.ADD_EXPERIENCE]: tool({
      description: "Add a new work experience entry to the CV.",
      inputSchema: z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        achievements: z.array(z.string()).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const id = nanoid()
        return { action: 'addWorkExperience', success: true, data: { id, ...input, achievements: input.achievements || [] } }
      },
    }),

    [CV_TOOLS.UPDATE_EXPERIENCE]: tool({
      description: "Update an existing work experience entry.",
      inputSchema: z.object({
        id: z.string(),
        company: z.string().optional(),
        position: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
        achievements: z.array(z.string()).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const { id, ...updates } = input
        return { action: 'updateWorkExperience', success: true, data: { id, updates } }
      },
    }),

    [CV_TOOLS.DELETE_EXPERIENCE]: tool({
      description: "Delete a work experience entry from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return { action: 'deleteWorkExperience', success: true, data: { id } }
      },
    }),

    [CV_TOOLS.ADD_EDUCATION]: tool({
      description: "Add a new education entry to the CV.",
      inputSchema: z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        gpa: z.string().optional(),
        description: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const id = nanoid()
        return { action: 'addEducation', success: true, data: { id, ...input } }
      },
    }),

    [CV_TOOLS.UPDATE_EDUCATION]: tool({
      description: "Update an existing education entry.",
      inputSchema: z.object({
        id: z.string(),
        institution: z.string().optional(),
        degree: z.string().optional(),
        field: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        gpa: z.string().optional(),
        description: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const { id, ...updates } = input
        return { action: 'updateEducation', success: true, data: { id, updates } }
      },
    }),

    [CV_TOOLS.DELETE_EDUCATION]: tool({
      description: "Delete an education entry from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return { action: 'deleteEducation', success: true, data: { id } }
      },
    }),

    [CV_TOOLS.ADD_SKILL]: tool({
      description: "Add a new skill to the CV.",
      inputSchema: z.object({
        name: z.string(),
        category: z.enum(['technical', 'soft', 'language', 'tool']),
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const id = nanoid()
        return { action: 'addSkill', success: true, data: { id, ...input } }
      },
    }),

    [CV_TOOLS.UPDATE_SKILL]: tool({
      description: "Update an existing skill.",
      inputSchema: z.object({
        id: z.string(),
        name: z.string().optional(),
        category: z.enum(['technical', 'soft', 'language', 'tool']).optional(),
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const { id, ...updates } = input
        return { action: 'updateSkill', success: true, data: { id, updates } }
      },
    }),

    [CV_TOOLS.DELETE_SKILL]: tool({
      description: "Delete a skill from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return { action: 'deleteSkill', success: true, data: { id } }
      },
    }),

    [CV_TOOLS.ADD_LANGUAGE]: tool({
      description: "Add a new language to the CV.",
      inputSchema: z.object({
        name: z.string(),
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
      }),
      execute: async (input): Promise<ToolResult> => {
        const id = nanoid()
        return { action: 'addLanguage', success: true, data: { id, ...input } }
      },
    }),

    [CV_TOOLS.UPDATE_LANGUAGE]: tool({
      description: "Update an existing language entry.",
      inputSchema: z.object({
        id: z.string(),
        name: z.string().optional(),
        level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const { id, ...updates } = input
        return { action: 'updateLanguage', success: true, data: { id, updates } }
      },
    }),

    [CV_TOOLS.DELETE_LANGUAGE]: tool({
      description: "Delete a language from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return { action: 'deleteLanguage', success: true, data: { id } }
      },
    }),

    [CV_TOOLS.ADD_CERTIFICATE]: tool({
      description: "Add a new certificate to the CV.",
      inputSchema: z.object({
        name: z.string(),
        issuer: z.string(),
        issueDate: z.string(),
        expiryDate: z.string().optional(),
        credentialId: z.string().optional(),
        credentialUrl: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const id = nanoid()
        return { action: 'addCertificate', success: true, data: { id, ...input } }
      },
    }),

    [CV_TOOLS.UPDATE_CERTIFICATE]: tool({
      description: "Update an existing certificate.",
      inputSchema: z.object({
        id: z.string(),
        name: z.string().optional(),
        issuer: z.string().optional(),
        issueDate: z.string().optional(),
        expiryDate: z.string().optional(),
        credentialId: z.string().optional(),
        credentialUrl: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        const { id, ...updates } = input
        return { action: 'updateCertificate', success: true, data: { id, updates } }
      },
    }),

    [CV_TOOLS.DELETE_CERTIFICATE]: tool({
      description: "Delete a certificate from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return { action: 'deleteCertificate', success: true, data: { id } }
      },
    }),

    [CV_TOOLS.UPDATE_FOOTER]: tool({
      description: "Update the CV footer content.",
      inputSchema: z.object({ rodoConsent: z.string().optional() }),
      execute: async (input): Promise<ToolResult> => {
        return { action: 'updateFooter', success: true, data: input }
      },
    }),

    [CV_TOOLS.ADD_CUSTOM_CATEGORY]: tool({
      description: "Add a custom skill category.",
      inputSchema: z.object({ category: z.string() }),
      execute: async ({ category }): Promise<ToolResult> => {
        return { action: 'addCustomCategory', success: true, data: { category } }
      },
    }),

    [CV_TOOLS.REMOVE_CUSTOM_CATEGORY]: tool({
      description: "Remove a custom skill category.",
      inputSchema: z.object({ category: z.string() }),
      execute: async ({ category }): Promise<ToolResult> => {
        return { action: 'removeCustomCategory', success: true, data: { category } }
      },
    }),

    [CV_TOOLS.UPDATE_THEME]: tool({
      description: "Update the CV theme with preset or custom options.",
      inputSchema: z.object({
        preset: z.string().optional(),
        colors: z.object({
          primary: z.string().optional(),
          accent: z.string().optional(),
          text: z.string().optional(),
          background: z.string().optional(),
          secondary: z.string().optional(),
          muted: z.string().optional(),
        }).optional(),
        fonts: z.object({
          heading: z.string().optional(),
          body: z.string().optional(),
        }).optional(),
        layout: z.string().optional(),
        headerStyle: z.string().optional(),
        skillsStyle: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        let themeUpdates: Partial<CVTheme> = {}
        if (input.preset) {
          const presetTheme = getThemeById(input.preset) || predefinedThemes[input.preset]
          if (presetTheme) {
            themeUpdates = { ...presetTheme }
          }
        }
        if (input.colors) {
          themeUpdates.colors = { ...cvData.theme.colors, ...input.colors }
        }
        if (input.fonts) {
          themeUpdates.fonts = { ...cvData.theme.fonts, ...input.fonts }
        }
        if (input.layout) themeUpdates.layout = input.layout as CVTheme['layout']
        if (input.headerStyle) themeUpdates.headerStyle = input.headerStyle as CVTheme['headerStyle']
        if (input.skillsStyle) themeUpdates.skillsStyle = input.skillsStyle as CVTheme['skillsStyle']
        return { action: 'updateTheme', success: true, data: { theme: themeUpdates, preset: input.preset } }
      },
    }),

    [CV_TOOLS.REORDER_SECTIONS]: tool({
      description: "Reorder the sections of the CV.",
      inputSchema: z.object({
        order: z.array(z.enum(['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates'])),
      }),
      execute: async ({ order }): Promise<ToolResult> => {
        return { action: 'reorderSections', success: true, data: { order: order as CVSectionType[] } }
      },
    }),
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

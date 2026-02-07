import { streamText, convertToModelMessages, UIMessage, tool, stepCountIs } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { CV_EDITOR_SYSTEM_PROMPT, CV_TOOLS } from '@/lib/cv-tools'
import { predefinedThemes, getThemeById } from '@/lib/cv-themes'
import { createClient } from '@/lib/supabase/server'
import { checkCanUseAI, recordAIUsage, truncateToTokenLimit } from '@/lib/ai/usage-guard'
import type { CVData, CVSectionType, CVTheme } from '@/lib/types/cv'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Allow streaming responses up to 60 seconds
export const maxDuration = 60

// Tool result types for client-side state updates
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

    const { messages, cvData } = await req.json() as { messages: UIMessage[]; cvData: CVData }

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing messages' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Build context about current CV
    const cvContext = buildCVContext(cvData)
    const truncatedContext = truncateToTokenLimit(cvContext, usageCheck.tier)

    // Create tools with execute functions that return CV update instructions
    // The actual state updates will happen client-side when tool results are received
    const tools = createCVTools(cvData)

    const result = streamText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929'),
      system: `${CV_EDITOR_SYSTEM_PROMPT}

Current CV Data:
${truncatedContext}`,
      messages: await convertToModelMessages(messages),
      tools,
      stopWhen: stepCountIs(5),
      temperature: 0.3,
      onFinish: async ({ usage }) => {
        // Record AI usage after completion
        await recordAIUsage(
          user.id,
          usage?.inputTokens ?? 0,
          usage?.outputTokens ?? 0
        )
      },
    })

    return result.toUIMessageStreamResponse({
      onError: (error) => {
        // Mask internal errors from users - only log on server
        console.error('Stream error:', error)
        return 'An error occurred while processing your request.'
      },
    })
  } catch (error: unknown) {
    console.error('CV chat error:', error)
    const message = error instanceof Error ? error.message : 'Failed to process request'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Create tools with execute functions
function createCVTools(cvData: CVData) {
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
        return {
          action: 'updatePersonalInfo',
          success: true,
          data: input,
        }
      },
    }),

    [CV_TOOLS.UPDATE_SUMMARY]: tool({
      description: "Update or rewrite the professional summary section of the CV.",
      inputSchema: z.object({
        summary: z.string(),
      }),
      execute: async ({ summary }): Promise<ToolResult> => {
        return {
          action: 'updateSummary',
          success: true,
          data: { summary },
        }
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
        return {
          action: 'addWorkExperience',
          success: true,
          data: { id, ...input, achievements: input.achievements || [] },
        }
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
        return {
          action: 'updateWorkExperience',
          success: true,
          data: { id, updates },
        }
      },
    }),

    [CV_TOOLS.DELETE_EXPERIENCE]: tool({
      description: "Delete a work experience entry from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return {
          action: 'deleteWorkExperience',
          success: true,
          data: { id },
        }
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
        return {
          action: 'addEducation',
          success: true,
          data: { id, ...input },
        }
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
        return {
          action: 'updateEducation',
          success: true,
          data: { id, updates },
        }
      },
    }),

    [CV_TOOLS.DELETE_EDUCATION]: tool({
      description: "Delete an education entry from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return {
          action: 'deleteEducation',
          success: true,
          data: { id },
        }
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
        return {
          action: 'addSkill',
          success: true,
          data: { id, ...input },
        }
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
        return {
          action: 'updateSkill',
          success: true,
          data: { id, updates },
        }
      },
    }),

    [CV_TOOLS.DELETE_SKILL]: tool({
      description: "Delete a skill from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return {
          action: 'deleteSkill',
          success: true,
          data: { id },
        }
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
        return {
          action: 'addLanguage',
          success: true,
          data: { id, ...input },
        }
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
        return {
          action: 'updateLanguage',
          success: true,
          data: { id, updates },
        }
      },
    }),

    [CV_TOOLS.DELETE_LANGUAGE]: tool({
      description: "Delete a language from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return {
          action: 'deleteLanguage',
          success: true,
          data: { id },
        }
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
        return {
          action: 'addCertificate',
          success: true,
          data: { id, ...input },
        }
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
        return {
          action: 'updateCertificate',
          success: true,
          data: { id, updates },
        }
      },
    }),

    [CV_TOOLS.DELETE_CERTIFICATE]: tool({
      description: "Delete a certificate from the CV.",
      inputSchema: z.object({ id: z.string() }),
      execute: async ({ id }): Promise<ToolResult> => {
        return {
          action: 'deleteCertificate',
          success: true,
          data: { id },
        }
      },
    }),

    [CV_TOOLS.UPDATE_FOOTER]: tool({
      description: "Update the CV footer content.",
      inputSchema: z.object({
        rodoConsent: z.string().optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        return {
          action: 'updateFooter',
          success: true,
          data: input,
        }
      },
    }),

    [CV_TOOLS.ADD_CUSTOM_CATEGORY]: tool({
      description: "Add a custom skill category.",
      inputSchema: z.object({ category: z.string() }),
      execute: async ({ category }): Promise<ToolResult> => {
        return {
          action: 'addCustomCategory',
          success: true,
          data: { category },
        }
      },
    }),

    [CV_TOOLS.REMOVE_CUSTOM_CATEGORY]: tool({
      description: "Remove a custom skill category.",
      inputSchema: z.object({ category: z.string() }),
      execute: async ({ category }): Promise<ToolResult> => {
        return {
          action: 'removeCustomCategory',
          success: true,
          data: { category },
        }
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
        spacing: z.string().optional(),
        headerStyle: z.string().optional(),
        experienceStyle: z.string().optional(),
        educationStyle: z.string().optional(),
        skillsStyle: z.string().optional(),
        languagesStyle: z.string().optional(),
        summaryStyle: z.string().optional(),
        sectionDivider: z.string().optional(),
        sectionBorder: z.string().optional(),
        bulletStyle: z.string().optional(),
        photoStyle: z.string().optional(),
        photoTheme: z.object({
          shape: z.string().optional(),
          border: z.string().optional(),
          borderColor: z.string().optional(),
          shadow: z.string().optional(),
          background: z.string().optional(),
          size: z.string().optional(),
          visible: z.boolean().optional(),
        }).optional(),
        sidebarStyle: z.object({
          corners: z.string().optional(),
          background: z.string().optional(),
          border: z.string().optional(),
          fullBleed: z.boolean().optional(),
          width: z.string().optional(),
        }).optional(),
        dateFormat: z.string().optional(),
        showHeaderIcons: z.boolean().optional(),
        pageNumbers: z.object({
          show: z.boolean(),
          position: z.string().optional(),
        }).optional(),
      }),
      execute: async (input): Promise<ToolResult> => {
        let themeUpdates: Partial<CVTheme> = {}

        // Apply preset if specified
        if (input.preset) {
          const presetTheme = getThemeById(input.preset) || predefinedThemes[input.preset]
          if (presetTheme) {
            themeUpdates = { ...presetTheme }
          }
        }

        // Apply custom overrides
        if (input.colors) {
          themeUpdates.colors = { ...cvData.theme.colors, ...input.colors }
        }
        if (input.fonts) {
          themeUpdates.fonts = { ...cvData.theme.fonts, ...input.fonts }
        }
        if (input.layout) themeUpdates.layout = input.layout as CVTheme['layout']
        if (input.spacing) themeUpdates.spacing = input.spacing as CVTheme['spacing']
        if (input.headerStyle) themeUpdates.headerStyle = input.headerStyle as CVTheme['headerStyle']
        if (input.experienceStyle) themeUpdates.experienceStyle = input.experienceStyle as CVTheme['experienceStyle']
        if (input.educationStyle) themeUpdates.educationStyle = input.educationStyle as CVTheme['educationStyle']
        if (input.skillsStyle) themeUpdates.skillsStyle = input.skillsStyle as CVTheme['skillsStyle']
        if (input.languagesStyle) themeUpdates.languagesStyle = input.languagesStyle as CVTheme['languagesStyle']
        if (input.summaryStyle) themeUpdates.summaryStyle = input.summaryStyle as CVTheme['summaryStyle']
        if (input.sectionDivider) themeUpdates.sectionDivider = input.sectionDivider as CVTheme['sectionDivider']
        if (input.sectionBorder) themeUpdates.sectionBorder = input.sectionBorder as CVTheme['sectionBorder']
        if (input.bulletStyle) themeUpdates.bulletStyle = input.bulletStyle as CVTheme['bulletStyle']
        if (input.photoStyle) themeUpdates.photoStyle = input.photoStyle as CVTheme['photoStyle']
        if (input.dateFormat) themeUpdates.dateFormat = input.dateFormat as CVTheme['dateFormat']
        if (input.showHeaderIcons !== undefined) themeUpdates.showHeaderIcons = input.showHeaderIcons
        if (input.pageNumbers) {
          themeUpdates.pageNumbers = {
            show: input.pageNumbers.show,
            position: (input.pageNumbers.position || 'center') as 'left' | 'center' | 'right',
          }
        }
        if (input.photoTheme) {
          themeUpdates.photoTheme = {
            ...cvData.theme.photoTheme,
            ...input.photoTheme,
          } as CVTheme['photoTheme']
        }
        if (input.sidebarStyle) {
          const width = input.sidebarStyle.width
            ? parseInt(input.sidebarStyle.width, 10) as 25 | 30 | 35 | 40
            : cvData.theme.sidebarStyle?.width
          themeUpdates.sidebarStyle = {
            ...cvData.theme.sidebarStyle,
            ...input.sidebarStyle,
            width,
          } as CVTheme['sidebarStyle']
        }

        return {
          action: 'updateTheme',
          success: true,
          data: { theme: themeUpdates, preset: input.preset },
        }
      },
    }),

    [CV_TOOLS.REORDER_SECTIONS]: tool({
      description: "Reorder the sections of the CV.",
      inputSchema: z.object({
        order: z.array(z.enum(['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates'])),
      }),
      execute: async ({ order }): Promise<ToolResult> => {
        return {
          action: 'reorderSections',
          success: true,
          data: { order: order as CVSectionType[] },
        }
      },
    }),
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
    cvData.skills.forEach((skill) => {
      parts.push(`- ${skill.name} (ID: ${skill.id}, Category: ${skill.category}, Level: ${skill.level || 'not specified'})`)
    })
  }

  // Languages
  parts.push('\n## Languages')
  if (cvData.languages?.length === 0) {
    parts.push('(no entries)')
  } else {
    cvData.languages?.forEach((lang) => {
      parts.push(`- ${lang.name} (ID: ${lang.id}, Level: ${lang.level})`)
    })
  }

  // Certificates
  parts.push('\n## Certificates')
  if (cvData.certificates?.length === 0) {
    parts.push('(no entries)')
  } else {
    cvData.certificates?.forEach((cert) => {
      parts.push(`- ${cert.name} (ID: ${cert.id}, Issuer: ${cert.issuer}, Date: ${cert.issueDate})`)
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

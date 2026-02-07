import { z } from 'zod'

export const COVER_LETTER_TOOLS = {
  UPDATE_CONTENT: 'update_content',
  UPDATE_SECTION: 'update_section',
  UPDATE_TONE: 'update_tone',
  UPDATE_RECIPIENT: 'update_recipient',
  UPDATE_LANGUAGE: 'update_language',
  REGENERATE: 'regenerate',
} as const

export type CoverLetterToolName = typeof COVER_LETTER_TOOLS[keyof typeof COVER_LETTER_TOOLS]

export const coverLetterToolSchemas = {
  [COVER_LETTER_TOOLS.UPDATE_CONTENT]: z.object({
    content: z.string().describe('The full HTML content of the cover letter'),
  }),
  [COVER_LETTER_TOOLS.UPDATE_SECTION]: z.object({
    section: z.enum(['intro', 'body', 'closing']).describe('Which section to update: intro (first paragraph), body (middle paragraphs), closing (last paragraph)'),
    content: z.string().describe('The new HTML content for this section'),
  }),
  [COVER_LETTER_TOOLS.UPDATE_TONE]: z.object({
    tone: z.enum(['professional', 'friendly', 'formal']).describe('The desired tone'),
  }),
  [COVER_LETTER_TOOLS.UPDATE_RECIPIENT]: z.object({
    company: z.string().optional().describe('Company name'),
    jobTitle: z.string().optional().describe('Job title being applied for'),
  }),
  [COVER_LETTER_TOOLS.UPDATE_LANGUAGE]: z.object({
    language: z.enum(['en', 'pl']).describe('Language: en or pl'),
  }),
  [COVER_LETTER_TOOLS.REGENERATE]: z.object({
    instructions: z.string().optional().describe('Additional instructions for regeneration'),
  }),
}

export const COVER_LETTER_SYSTEM_PROMPT = `You are a helpful cover letter editing assistant. You help users create and improve cover letters.

You have access to tools that can modify the cover letter:
- update_content: Replace the entire cover letter content (HTML)
- update_section: Update a specific section (intro, body, or closing)
- update_tone: Change the writing tone (professional, friendly, formal)
- update_recipient: Update company name and job title
- update_language: Switch language (en or pl)
- regenerate: Request a full regeneration with optional instructions

Guidelines:
- The content field MUST be valid HTML using block-level elements: <p>, <h2>, <h3>, <ul><li>, <ol><li>, <blockquote>, etc. Never use plain text — always wrap in block elements.
- Inline formatting (<strong>, <em>, <a>) is allowed inside block elements.
- When updating sections: intro = first block element, body = middle block elements, closing = last block element
- Keep cover letters concise (3-4 paragraphs, under 400 words)
- Tailor content to the job and company when that info is available
- Be conversational and confirm what you're doing
- When the user asks for changes, use the appropriate tool
- When generating or updating a cover letter and you know the company or job title, always call update_recipient to fill in those fields automatically

The current cover letter data and CV data will be provided for context.`

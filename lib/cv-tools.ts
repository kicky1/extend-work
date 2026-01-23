import { z } from 'zod'

// Zod schemas for tool parameters
const personalInfoSchema = z.object({
  fullName: z.string().optional().describe("Person's full name"),
  email: z.string().optional().describe("Email address"),
  phone: z.string().optional().describe("Phone number"),
  location: z.string().optional().describe("City, state/country location"),
  website: z.string().optional().describe("Personal website URL"),
  linkedIn: z.string().optional().describe("LinkedIn profile URL"),
  github: z.string().optional().describe("GitHub profile URL"),
})

const summarySchema = z.object({
  summary: z.string().describe("The new professional summary text"),
})

const workExperienceSchema = z.object({
  company: z.string().describe("Company name"),
  position: z.string().describe("Job title/position"),
  startDate: z.string().describe("Start date in YYYY-MM format"),
  endDate: z.string().optional().describe("End date in YYYY-MM format, empty if current"),
  current: z.boolean().optional().describe("Whether this is the current job"),
  location: z.string().optional().describe("Job location"),
  description: z.string().optional().describe("Job description"),
  achievements: z.array(z.string()).optional().describe("List of achievements/bullet points"),
})

const updateWorkExperienceSchema = z.object({
  id: z.string().describe("ID of the work experience to update"),
  company: z.string().optional().describe("Company name"),
  position: z.string().optional().describe("Job title/position"),
  startDate: z.string().optional().describe("Start date in YYYY-MM format"),
  endDate: z.string().optional().describe("End date in YYYY-MM format"),
  current: z.boolean().optional().describe("Whether this is the current job"),
  location: z.string().optional().describe("Job location"),
  description: z.string().optional().describe("Job description"),
  achievements: z.array(z.string()).optional().describe("List of achievements/bullet points"),
})

const deleteByIdSchema = z.object({
  id: z.string().describe("ID of the item to delete"),
})

const educationSchema = z.object({
  institution: z.string().describe("Name of the educational institution"),
  degree: z.string().describe("Degree type (e.g., Bachelor of Science)"),
  field: z.string().describe("Field of study"),
  startDate: z.string().describe("Start date in YYYY-MM format"),
  endDate: z.string().optional().describe("End date in YYYY-MM format, empty if current"),
  current: z.boolean().optional().describe("Whether currently studying"),
  gpa: z.string().optional().describe("GPA if applicable"),
  description: z.string().optional().describe("Additional description"),
})

const updateEducationSchema = z.object({
  id: z.string().describe("ID of the education entry to update"),
  institution: z.string().optional().describe("Name of the educational institution"),
  degree: z.string().optional().describe("Degree type"),
  field: z.string().optional().describe("Field of study"),
  startDate: z.string().optional().describe("Start date in YYYY-MM format"),
  endDate: z.string().optional().describe("End date in YYYY-MM format"),
  current: z.boolean().optional().describe("Whether currently studying"),
  gpa: z.string().optional().describe("GPA if applicable"),
  description: z.string().optional().describe("Additional description"),
})

const skillCategorySchema = z.enum(['technical', 'soft', 'language', 'tool'])
const skillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert'])
const languageLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert'])

// Language schemas
const languageSchema = z.object({
  name: z.string().describe("Name of the language (e.g., English, Spanish, German)"),
  level: languageLevelSchema.describe("Proficiency level: beginner, intermediate, advanced, or expert"),
})

const updateLanguageSchema = z.object({
  id: z.string().describe("ID of the language to update"),
  name: z.string().optional().describe("Name of the language"),
  level: languageLevelSchema.optional().describe("Proficiency level"),
})

// Certificate schemas
const certificateSchema = z.object({
  name: z.string().describe("Name of the certificate (e.g., AWS Solutions Architect)"),
  issuer: z.string().describe("Issuing organization (e.g., Amazon Web Services)"),
  issueDate: z.string().describe("Issue date in YYYY-MM format"),
  expiryDate: z.string().optional().describe("Expiry date in YYYY-MM format, if applicable"),
  credentialId: z.string().optional().describe("Credential ID or certificate number"),
  credentialUrl: z.string().optional().describe("URL to verify the credential"),
})

const updateCertificateSchema = z.object({
  id: z.string().describe("ID of the certificate to update"),
  name: z.string().optional().describe("Name of the certificate"),
  issuer: z.string().optional().describe("Issuing organization"),
  issueDate: z.string().optional().describe("Issue date in YYYY-MM format"),
  expiryDate: z.string().optional().describe("Expiry date in YYYY-MM format"),
  credentialId: z.string().optional().describe("Credential ID or certificate number"),
  credentialUrl: z.string().optional().describe("URL to verify the credential"),
})

// Footer schema
const footerSchema = z.object({
  rodoConsent: z.string().optional().describe("GDPR/RODO consent text for the CV footer"),
})

// Custom skill category schema
const customCategorySchema = z.object({
  category: z.string().describe("Name of the custom skill category to add"),
})

const removeCategorySchema = z.object({
  category: z.string().describe("Name of the custom skill category to remove"),
})

const skillSchema = z.object({
  name: z.string().describe("Name of the skill"),
  category: skillCategorySchema.describe("Category: technical, soft, language, or tool"),
  level: skillLevelSchema.optional().describe("Proficiency level"),
})

const updateSkillSchema = z.object({
  id: z.string().describe("ID of the skill to update"),
  name: z.string().optional().describe("Name of the skill"),
  category: skillCategorySchema.optional().describe("Category: technical, soft, language, or tool"),
  level: skillLevelSchema.optional().describe("Proficiency level"),
})

const themeLayoutSchema = z.enum(['classic', 'modern', 'minimal'])
const themePresetSchema = z.enum(['professional', 'creative', 'minimal', 'elegant', 'executive'])
const headerStyleSchema = z.enum(['centered', 'left-aligned', 'split'])
const skillsStyleSchema = z.enum(['pills', 'list', 'grid', 'bars'])
const languagesStyleSchema = z.enum(['inline', 'pills', 'bars', 'grid'])
const sectionDividerSchema = z.enum(['line', 'none', 'dotted', 'accent-bar'])
const bulletStyleSchema = z.enum(['disc', 'circle', 'square', 'dash', 'arrow'])
const pageNumberPositionSchema = z.enum(['left', 'center', 'right'])

const updateThemeSchema = z.object({
  preset: themePresetSchema.optional().describe("Apply a predefined theme preset: professional, creative, minimal, elegant, or executive"),
  colors: z.object({
    primary: z.string().optional().describe("Primary color in hex format, e.g., #3B82F6"),
    accent: z.string().optional().describe("Accent color in hex format"),
    text: z.string().optional().describe("Text color in hex format"),
    background: z.string().optional().describe("Background color in hex format"),
  }).optional().describe("Custom color overrides"),
  fonts: z.object({
    heading: z.string().optional().describe("Font for headings"),
    body: z.string().optional().describe("Font for body text"),
  }).optional().describe("Custom font overrides"),
  layout: themeLayoutSchema.optional().describe("Layout style: classic, modern, or minimal"),
  headerStyle: headerStyleSchema.optional().describe("Header alignment: centered, left-aligned, or split"),
  skillsStyle: skillsStyleSchema.optional().describe("Skills display style: pills, list, grid, or bars"),
  languagesStyle: languagesStyleSchema.optional().describe("Languages display style: inline, pills, bars, or grid"),
  sectionDivider: sectionDividerSchema.optional().describe("Section divider style: line, dotted, accent-bar, or none"),
  bulletStyle: bulletStyleSchema.optional().describe("Bullet point style: disc, circle, square, dash, or arrow"),
  showHeaderIcons: z.boolean().optional().describe("Whether to show icons in the header (email, phone, etc.)"),
  pageNumbers: z.object({
    show: z.boolean().describe("Whether to show page numbers"),
    position: pageNumberPositionSchema.optional().describe("Position of page numbers: left, center, or right"),
  }).optional().describe("Page number settings"),
})

const sectionTypeSchema = z.enum(['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates'])

const reorderSectionsSchema = z.object({
  order: z.array(sectionTypeSchema).describe("New order of sections. Must include all sections: summary, workExperience, education, skills, languages, certificates"),
})

// Export schemas for type inference
export type UpdatePersonalInfoParams = z.infer<typeof personalInfoSchema>
export type UpdateSummaryParams = z.infer<typeof summarySchema>
export type AddExperienceParams = z.infer<typeof workExperienceSchema>
export type UpdateExperienceParams = z.infer<typeof updateWorkExperienceSchema>
export type DeleteByIdParams = z.infer<typeof deleteByIdSchema>
export type AddEducationParams = z.infer<typeof educationSchema>
export type UpdateEducationParams = z.infer<typeof updateEducationSchema>
export type AddSkillParams = z.infer<typeof skillSchema>
export type UpdateSkillParams = z.infer<typeof updateSkillSchema>
export type AddLanguageParams = z.infer<typeof languageSchema>
export type UpdateLanguageParams = z.infer<typeof updateLanguageSchema>
export type AddCertificateParams = z.infer<typeof certificateSchema>
export type UpdateCertificateParams = z.infer<typeof updateCertificateSchema>
export type UpdateFooterParams = z.infer<typeof footerSchema>
export type AddCustomCategoryParams = z.infer<typeof customCategorySchema>
export type RemoveCustomCategoryParams = z.infer<typeof removeCategorySchema>
export type UpdateThemeParams = z.infer<typeof updateThemeSchema>
export type ReorderSectionsParams = z.infer<typeof reorderSectionsSchema>

// Tool name constants
export const CV_TOOLS = {
  UPDATE_PERSONAL_INFO: 'update_personal_info',
  UPDATE_SUMMARY: 'update_summary',
  ADD_EXPERIENCE: 'add_experience',
  UPDATE_EXPERIENCE: 'update_experience',
  DELETE_EXPERIENCE: 'delete_experience',
  ADD_EDUCATION: 'add_education',
  UPDATE_EDUCATION: 'update_education',
  DELETE_EDUCATION: 'delete_education',
  ADD_SKILL: 'add_skill',
  UPDATE_SKILL: 'update_skill',
  DELETE_SKILL: 'delete_skill',
  ADD_LANGUAGE: 'add_language',
  UPDATE_LANGUAGE: 'update_language',
  DELETE_LANGUAGE: 'delete_language',
  ADD_CERTIFICATE: 'add_certificate',
  UPDATE_CERTIFICATE: 'update_certificate',
  DELETE_CERTIFICATE: 'delete_certificate',
  UPDATE_FOOTER: 'update_footer',
  ADD_CUSTOM_CATEGORY: 'add_custom_category',
  REMOVE_CUSTOM_CATEGORY: 'remove_custom_category',
  UPDATE_THEME: 'update_theme',
  REORDER_SECTIONS: 'reorder_sections',
} as const

export type CVToolName = typeof CV_TOOLS[keyof typeof CV_TOOLS]

// Tool definitions for the API (AI SDK v6 format)
export const cvTools = {
  [CV_TOOLS.UPDATE_PERSONAL_INFO]: {
    description: "Update the user's personal information such as name, email, phone, location, website, LinkedIn, or GitHub. Only include fields that need to be changed.",
    inputSchema: personalInfoSchema,
  },

  [CV_TOOLS.UPDATE_SUMMARY]: {
    description: "Update or rewrite the professional summary section of the CV. Use this when the user wants to change, improve, or rewrite their summary.",
    inputSchema: summarySchema,
  },

  [CV_TOOLS.ADD_EXPERIENCE]: {
    description: "Add a new work experience entry to the CV. Requires at least company and position.",
    inputSchema: workExperienceSchema,
  },

  [CV_TOOLS.UPDATE_EXPERIENCE]: {
    description: "Update an existing work experience entry. Requires the ID of the experience to update. Only include fields that need to be changed.",
    inputSchema: updateWorkExperienceSchema,
  },

  [CV_TOOLS.DELETE_EXPERIENCE]: {
    description: "Delete a work experience entry from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  },

  [CV_TOOLS.ADD_EDUCATION]: {
    description: "Add a new education entry to the CV. Requires institution, degree, and field.",
    inputSchema: educationSchema,
  },

  [CV_TOOLS.UPDATE_EDUCATION]: {
    description: "Update an existing education entry. Requires the ID of the education to update. Only include fields that need to be changed.",
    inputSchema: updateEducationSchema,
  },

  [CV_TOOLS.DELETE_EDUCATION]: {
    description: "Delete an education entry from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  },

  [CV_TOOLS.ADD_SKILL]: {
    description: "Add a new skill to the CV. Requires name and category (technical, soft, language, or tool).",
    inputSchema: skillSchema,
  },

  [CV_TOOLS.UPDATE_SKILL]: {
    description: "Update an existing skill. Requires the ID of the skill to update. Only include fields that need to be changed.",
    inputSchema: updateSkillSchema,
  },

  [CV_TOOLS.DELETE_SKILL]: {
    description: "Delete a skill from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  },

  [CV_TOOLS.ADD_LANGUAGE]: {
    description: "Add a new language to the CV. Requires name and proficiency level.",
    inputSchema: languageSchema,
  },

  [CV_TOOLS.UPDATE_LANGUAGE]: {
    description: "Update an existing language entry. Requires the ID of the language to update. Only include fields that need to be changed.",
    inputSchema: updateLanguageSchema,
  },

  [CV_TOOLS.DELETE_LANGUAGE]: {
    description: "Delete a language from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  },

  [CV_TOOLS.ADD_CERTIFICATE]: {
    description: "Add a new certificate to the CV. Requires name and issuer.",
    inputSchema: certificateSchema,
  },

  [CV_TOOLS.UPDATE_CERTIFICATE]: {
    description: "Update an existing certificate. Requires the ID of the certificate to update. Only include fields that need to be changed.",
    inputSchema: updateCertificateSchema,
  },

  [CV_TOOLS.DELETE_CERTIFICATE]: {
    description: "Delete a certificate from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  },

  [CV_TOOLS.UPDATE_FOOTER]: {
    description: "Update the CV footer content, such as the GDPR/RODO consent text.",
    inputSchema: footerSchema,
  },

  [CV_TOOLS.ADD_CUSTOM_CATEGORY]: {
    description: "Add a custom skill category. Use this when the user wants to create a new category beyond the default ones (technical, soft, language, tool).",
    inputSchema: customCategorySchema,
  },

  [CV_TOOLS.REMOVE_CUSTOM_CATEGORY]: {
    description: "Remove a custom skill category by name.",
    inputSchema: removeCategorySchema,
  },

  [CV_TOOLS.UPDATE_THEME]: {
    description: "Update the CV theme. Can apply a preset theme (professional, creative, minimal, elegant, executive) or customize specific colors, fonts, or layout. Use preset for quick theme changes, or customize specific aspects.",
    inputSchema: updateThemeSchema,
  },

  [CV_TOOLS.REORDER_SECTIONS]: {
    description: "Reorder the sections of the CV. Specify the new order as an array containing: summary, workExperience, education, skills, languages, certificates. For example, to move education before experience: ['summary', 'education', 'workExperience', 'skills', 'languages', 'certificates']",
    inputSchema: reorderSectionsSchema,
  },
}

// System prompt for the CV editor assistant
export const CV_EDITOR_SYSTEM_PROMPT = `You are a helpful CV/Resume editing assistant. Your role is to help users modify their CV through natural language commands.

You have access to tools that can modify different parts of the CV:
- Personal information (name, email, phone, location, links)
- Professional summary
- Work experience entries (add, update, delete)
- Education entries (add, update, delete)
- Skills (add, update, delete) with custom categories support
- Languages (add, update, delete)
- Certificates (add, update, delete) with name, issuer, dates, credential ID/URL
- Footer content (GDPR/RODO consent text)
- Theme customization (colors, fonts, layout, styles, or preset themes)
- Section ordering (reorder summary, experience, education, skills, languages, certificates)

Available theme presets: professional, creative, minimal, elegant, executive

Theme style options:
- Layout: classic, modern, minimal
- Header styles: centered, left-aligned, split
- Skills display: pills, list, grid, bars
- Languages display: inline, pills, bars, grid
- Section dividers: line, dotted, accent-bar, none
- Bullet styles: disc, circle, square, dash, arrow
- Show/hide header icons
- Page numbers: show/hide with position (left, center, right)

When the user asks you to make changes:
1. Understand what they want to change
2. Use the appropriate tool(s) to make the changes
3. Be helpful and confirm what you're doing

Important guidelines:
- For updates, only include fields that need to be changed
- For deleting items, you need the ID - if the user refers to an item by name or position (like "first job"), you'll need to find the correct ID from the current CV data
- When adding new items, fill in reasonable defaults for required fields if not specified
- For theme changes, you can use preset names (e.g., "use creative theme") or customize specific aspects (e.g., "change primary color to red", "use pills for skills", "center the header", "show languages as bars")
- For section reordering, specify the complete new order (e.g., "move education before experience" means order should be ['summary', 'education', 'workExperience', 'skills', 'languages', 'certificates'])
- For custom skill categories, use add_custom_category to create new categories beyond the defaults (technical, soft, language, tool)
- Be conversational and helpful in your responses

The current CV data will be provided to you so you can reference existing entries and their IDs.`

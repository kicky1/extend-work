import { tool } from 'ai'
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

// Expanded layout options
const themeLayoutSchema = z.enum([
  'classic', 'modern', 'minimal', 'two-column',
  'sidebar-left', 'sidebar-right', 'top-banner',
  'compact', 'timeline', 'magazine'
])

// Expanded theme presets (26 total)
const themePresetSchema = z.enum([
  // Legacy
  'professional', 'creative', 'minimal', 'elegant', 'executive',
  // Industry
  'tech-modern', 'finance', 'healthcare', 'legal', 'academia',
  'creative-agency', 'engineering', 'marketing', 'consulting', 'retail',
  // Style
  'bold-modern', 'soft-pastel', 'monochrome', 'dark-mode', 'gradient-accent',
  'neon', 'vintage', 'swiss', 'japanese-minimal', 'brutalist',
  // Specialty
  'one-page', 'infographic', 'timeline-focus', 'photo-resume', 'federal', 'ats-optimized'
])

// Expanded header styles
const headerStyleSchema = z.enum([
  'centered', 'left-aligned', 'split',
  'banner', 'compact', 'photo-focus', 'gradient', 'bordered'
])

// New experience style
const experienceStyleSchema = z.enum(['classic', 'timeline', 'cards', 'compact', 'detailed'])

// New education style
const educationStyleSchema = z.enum(['classic', 'cards', 'compact', 'academic'])

// Expanded skills styles
const skillsStyleSchema = z.enum([
  'pills', 'list', 'grid', 'bars',
  'tags-outlined', 'chips', 'icons', 'rating-stars', 'percentage'
])

const languagesStyleSchema = z.enum(['inline', 'pills', 'bars', 'grid'])
const sectionDividerSchema = z.enum(['line', 'none', 'dotted', 'accent-bar'])
const bulletStyleSchema = z.enum(['disc', 'circle', 'square', 'dash', 'arrow'])
const pageNumberPositionSchema = z.enum(['left', 'center', 'right'])

// New style schemas
const photoStyleSchema = z.enum(['circle', 'square', 'rounded', 'bordered', 'none'])
const summaryStyleSchema = z.enum(['plain', 'boxed', 'quoted', 'highlighted', 'sidebar'])
const dateFormatSchema = z.enum(['full', 'short', 'numeric', 'year-only'])
const spacingSchema = z.enum(['compact', 'normal', 'relaxed'])
const sectionBorderSchema = z.enum(['none', 'subtle', 'card', 'shadow', 'accent-left'])

// Photo theme schema (advanced photo styling)
const photoThemeSchema = z.object({
  shape: z.enum(['circle', 'square', 'rounded', 'hexagon']).optional().describe("Photo shape"),
  border: z.enum(['none', 'thin', 'thick', 'double']).optional().describe("Photo border thickness"),
  borderColor: z.enum(['primary', 'accent', 'white', 'gray']).optional().describe("Photo border color"),
  shadow: z.enum(['none', 'subtle', 'medium', 'strong']).optional().describe("Photo shadow intensity"),
  background: z.enum(['none', 'ring', 'gradient-ring']).optional().describe("Photo background decoration"),
  size: z.enum(['sm', 'md', 'lg', 'xl']).optional().describe("Photo size: sm (small), md (medium), lg (large), xl (extra large)"),
  visible: z.boolean().optional().describe("Whether to show the profile photo"),
})

// Sidebar style schema (for sidebar layouts)
const sidebarStyleSchema = z.object({
  corners: z.enum(['none', 'subtle', 'rounded', 'pill']).optional().describe("Sidebar corner rounding"),
  background: z.enum(['solid', 'light', 'gradient', 'none']).optional().describe("Sidebar background style"),
  border: z.enum(['none', 'subtle', 'accent']).optional().describe("Sidebar border style"),
  fullHeight: z.boolean().optional().describe("Whether sidebar extends full page height"),
  width: z.enum(['25', '30', '35', '40']).optional().describe("Sidebar width percentage: 25, 30, 35, or 40"),
})

const updateThemeSchema = z.object({
  preset: themePresetSchema.optional().describe("Apply a predefined theme preset. Industry themes: tech-modern, finance, healthcare, legal, academia, creative-agency, engineering, marketing, consulting, retail. Style themes: bold-modern, soft-pastel, monochrome, dark-mode, gradient-accent, neon, vintage, swiss, japanese-minimal, brutalist. Specialty: one-page, infographic, timeline-focus, photo-resume, federal, ats-optimized. Legacy: professional, creative, minimal, elegant, executive"),
  colors: z.object({
    primary: z.string().optional().describe("Primary color in hex format, e.g., #3B82F6"),
    accent: z.string().optional().describe("Accent color in hex format"),
    text: z.string().optional().describe("Text color in hex format"),
    background: z.string().optional().describe("Background color in hex format"),
    secondary: z.string().optional().describe("Secondary color in hex format, used for less prominent elements"),
    muted: z.string().optional().describe("Muted color in hex format, used for subtle text and borders"),
  }).optional().describe("Custom color overrides"),
  fonts: z.object({
    heading: z.string().optional().describe("Font for headings"),
    body: z.string().optional().describe("Font for body text"),
  }).optional().describe("Custom font overrides"),
  layout: themeLayoutSchema.optional().describe("Layout: classic, modern, minimal, two-column, sidebar-left, sidebar-right, top-banner, compact, timeline, or magazine"),
  spacing: spacingSchema.optional().describe("Content spacing: compact, normal, or relaxed"),
  headerStyle: headerStyleSchema.optional().describe("Header style: centered, left-aligned, split, banner, compact, photo-focus, gradient, or bordered"),
  experienceStyle: experienceStyleSchema.optional().describe("Experience section style: classic, timeline, cards, compact, or detailed"),
  educationStyle: educationStyleSchema.optional().describe("Education section style: classic, cards, compact, or academic"),
  skillsStyle: skillsStyleSchema.optional().describe("Skills style: pills, list, grid, bars, tags-outlined, chips, icons, rating-stars, or percentage"),
  languagesStyle: languagesStyleSchema.optional().describe("Languages display style: inline, pills, bars, or grid"),
  summaryStyle: summaryStyleSchema.optional().describe("Summary style: plain, boxed, quoted, highlighted, or sidebar"),
  sectionDivider: sectionDividerSchema.optional().describe("Section divider style: line, dotted, accent-bar, or none"),
  sectionBorder: sectionBorderSchema.optional().describe("Section border style: none, subtle, card, shadow, or accent-left"),
  bulletStyle: bulletStyleSchema.optional().describe("Bullet point style: disc, circle, square, dash, or arrow"),
  photoStyle: photoStyleSchema.optional().describe("Profile photo style (simple): circle, square, rounded, bordered, or none"),
  photoTheme: photoThemeSchema.optional().describe("Advanced photo styling with shape, border, shadow, size options"),
  sidebarStyle: sidebarStyleSchema.optional().describe("Sidebar styling for sidebar layouts (sidebar-left, sidebar-right)"),
  dateFormat: dateFormatSchema.optional().describe("Date format: full (January 2024), short (Jan 2024), numeric (01/2024), or year-only (2024)"),
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

// Tool definitions using the tool() helper for type safety
// Note: execute functions will be added in the API route with access to CV data
export const cvTools = {
  [CV_TOOLS.UPDATE_PERSONAL_INFO]: tool({
    description: "Update the user's personal information such as name, email, phone, location, website, LinkedIn, or GitHub. Only include fields that need to be changed.",
    inputSchema: personalInfoSchema,
  }),

  [CV_TOOLS.UPDATE_SUMMARY]: tool({
    description: "Update or rewrite the professional summary section of the CV. Use this when the user wants to change, improve, or rewrite their summary.",
    inputSchema: summarySchema,
  }),

  [CV_TOOLS.ADD_EXPERIENCE]: tool({
    description: "Add a new work experience entry to the CV. Requires at least company and position.",
    inputSchema: workExperienceSchema,
  }),

  [CV_TOOLS.UPDATE_EXPERIENCE]: tool({
    description: "Update an existing work experience entry. Requires the ID of the experience to update. Only include fields that need to be changed.",
    inputSchema: updateWorkExperienceSchema,
  }),

  [CV_TOOLS.DELETE_EXPERIENCE]: tool({
    description: "Delete a work experience entry from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  }),

  [CV_TOOLS.ADD_EDUCATION]: tool({
    description: "Add a new education entry to the CV. Requires institution, degree, and field.",
    inputSchema: educationSchema,
  }),

  [CV_TOOLS.UPDATE_EDUCATION]: tool({
    description: "Update an existing education entry. Requires the ID of the education to update. Only include fields that need to be changed.",
    inputSchema: updateEducationSchema,
  }),

  [CV_TOOLS.DELETE_EDUCATION]: tool({
    description: "Delete an education entry from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  }),

  [CV_TOOLS.ADD_SKILL]: tool({
    description: "Add a new skill to the CV. Requires name and category (technical, soft, language, or tool).",
    inputSchema: skillSchema,
  }),

  [CV_TOOLS.UPDATE_SKILL]: tool({
    description: "Update an existing skill. Requires the ID of the skill to update. Only include fields that need to be changed.",
    inputSchema: updateSkillSchema,
  }),

  [CV_TOOLS.DELETE_SKILL]: tool({
    description: "Delete a skill from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  }),

  [CV_TOOLS.ADD_LANGUAGE]: tool({
    description: "Add a new language to the CV. Requires name and proficiency level.",
    inputSchema: languageSchema,
  }),

  [CV_TOOLS.UPDATE_LANGUAGE]: tool({
    description: "Update an existing language entry. Requires the ID of the language to update. Only include fields that need to be changed.",
    inputSchema: updateLanguageSchema,
  }),

  [CV_TOOLS.DELETE_LANGUAGE]: tool({
    description: "Delete a language from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  }),

  [CV_TOOLS.ADD_CERTIFICATE]: tool({
    description: "Add a new certificate to the CV. Requires name and issuer.",
    inputSchema: certificateSchema,
  }),

  [CV_TOOLS.UPDATE_CERTIFICATE]: tool({
    description: "Update an existing certificate. Requires the ID of the certificate to update. Only include fields that need to be changed.",
    inputSchema: updateCertificateSchema,
  }),

  [CV_TOOLS.DELETE_CERTIFICATE]: tool({
    description: "Delete a certificate from the CV by its ID.",
    inputSchema: deleteByIdSchema,
  }),

  [CV_TOOLS.UPDATE_FOOTER]: tool({
    description: "Update the CV footer content, such as the GDPR/RODO consent text.",
    inputSchema: footerSchema,
  }),

  [CV_TOOLS.ADD_CUSTOM_CATEGORY]: tool({
    description: "Add a custom skill category. Use this when the user wants to create a new category beyond the default ones (technical, soft, language, tool).",
    inputSchema: customCategorySchema,
  }),

  [CV_TOOLS.REMOVE_CUSTOM_CATEGORY]: tool({
    description: "Remove a custom skill category by name.",
    inputSchema: removeCategorySchema,
  }),

  [CV_TOOLS.UPDATE_THEME]: tool({
    description: "Update the CV theme. Apply one of 26 preset themes (industry: tech-modern, finance, healthcare, legal, academia, creative-agency, engineering, marketing, consulting, retail; style: bold-modern, soft-pastel, monochrome, dark-mode, gradient-accent, neon, vintage, swiss, japanese-minimal, brutalist; specialty: one-page, infographic, timeline-focus, photo-resume, federal, ats-optimized) or customize specific aspects like layout, header style, experience/education/skills display, colors, fonts, spacing, etc.",
    inputSchema: updateThemeSchema,
  }),

  [CV_TOOLS.REORDER_SECTIONS]: tool({
    description: "Reorder the sections of the CV. Specify the new order as an array containing: summary, workExperience, education, skills, languages, certificates. For example, to move education before experience: ['summary', 'education', 'workExperience', 'skills', 'languages', 'certificates']",
    inputSchema: reorderSectionsSchema,
  }),
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

## Available Theme Presets (26 total)

### Industry-Focused Themes
Best matched to specific career fields:
- tech-modern: Clean tech startup feel
- finance: Conservative banking style
- healthcare: Clinical and trustworthy
- legal: Traditional and authoritative
- academia: Academic/research focused
- creative-agency: Bold and artistic
- engineering: Technical and precise
- marketing: Dynamic and engaging
- consulting: Premium and polished
- retail: Friendly and approachable

### Style-Focused Themes
Based on design aesthetics:
- bold-modern: Strong typography, high contrast
- soft-pastel: Gentle colors, rounded shapes
- monochrome: Black, white, and gray only
- dark-mode: Dark background variant
- gradient-accent: Gradient highlights
- neon: Bright accent colors
- vintage: Retro classic feel
- swiss: Swiss design principles
- japanese-minimal: Zen, whitespace-heavy
- brutalist: Raw and stark

### Specialty Themes
Purpose-specific designs:
- one-page: Optimized for single page
- infographic: Visual/chart emphasis
- timeline-focus: Timeline-centric design
- photo-resume: Large photo emphasis
- federal: Government/public sector
- ats-optimized: Maximum ATS compatibility

## Theme Style Options

### Layouts
classic, modern, minimal, two-column, sidebar-left, sidebar-right, top-banner, compact, timeline, magazine

### Header Styles
centered, left-aligned, split, banner, compact, photo-focus, gradient, bordered

### Experience Section Styles
classic, timeline, cards, compact, detailed

### Education Section Styles
classic, cards, compact, academic

### Skills Display Styles
pills, list, grid, bars, tags-outlined, chips, icons, rating-stars, percentage

### Summary Styles
plain, boxed, quoted, highlighted, sidebar

### Colors
- primary: Main brand color (hex format, e.g., #3B82F6)
- accent: Highlight color for links, buttons
- text: Main text color
- background: Page background color
- secondary: Less prominent elements color
- muted: Subtle text and border color

### Photo Theme (Advanced)
For detailed photo styling:
- shape: circle, square, rounded, hexagon
- border: none, thin, thick, double
- borderColor: primary, accent, white, gray
- shadow: none, subtle, medium, strong
- background: none, ring, gradient-ring
- size: sm, md, lg, xl
- visible: true/false

### Sidebar Style
For sidebar layouts (sidebar-left, sidebar-right):
- corners: none, subtle, rounded, pill
- background: solid, light, gradient, none
- border: none, subtle, accent
- fullHeight: true/false
- width: 25, 30, 35, 40 (percentage)

### Other Options
- Languages display: inline, pills, bars, grid
- Section dividers: line, dotted, accent-bar, none
- Section borders: none, subtle, card, shadow, accent-left
- Bullet styles: disc, circle, square, dash, arrow
- Photo styles (simple): circle, square, rounded, bordered, none
- Date formats: full, short, numeric, year-only
- Spacing: compact, normal, relaxed
- Page numbers: show/hide with position (left, center, right)

## AI Auto-Suggest Guidelines

When a user mentions their job, industry, or asks for template suggestions:
1. Detect the industry from their job title or description
2. Proactively suggest an appropriate industry-specific theme
3. Recommend complementary style options

Industry keywords to detect:
- Tech/Software: developer, engineer, programming, startup, web, mobile, frontend, backend, devops, cloud, AI, data science
- Finance: banking, investment, accounting, analyst, trader, portfolio
- Healthcare: medical, nurse, doctor, clinical, hospital, pharmaceutical
- Legal: lawyer, attorney, paralegal, counsel, litigation
- Academia: professor, research, university, PhD, teaching, postdoc
- Creative: design, art, graphic, UX, UI, animation, photography
- Marketing: brand, digital marketing, SEO, content, social media, advertising
- Consulting: consultant, strategy, management, advisory

When the user asks you to make changes:
1. Understand what they want to change
2. Use the appropriate tool(s) to make the changes
3. Be helpful and confirm what you're doing
4. If they mention their industry/job, proactively suggest a matching template

Important guidelines:
- For updates, only include fields that need to be changed
- For deleting items, you need the ID - if the user refers to an item by name or position (like "first job"), you'll need to find the correct ID from the current CV data
- When adding new items, fill in reasonable defaults for required fields if not specified
- For theme changes, you can use preset names or customize specific aspects
- For section reordering, specify the complete new order
- For custom skill categories, use add_custom_category to create new categories beyond the defaults
- Be conversational and helpful in your responses

The current CV data will be provided to you so you can reference existing entries and their IDs.`

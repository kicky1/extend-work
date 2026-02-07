export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedIn?: string
  github?: string
  profileImage?: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Language {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface Footer {
  rodoConsent: string
}

// Layout types
export type CVLayout =
  | 'classic'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'top-banner'
  | 'compact'
  | 'timeline'
  | 'magazine'

// Header styles - expanded from 3 to 8, plus two-column specific styles
export type HeaderStyle =
  | 'centered'
  | 'left-aligned'
  | 'split'
  | 'banner'
  | 'compact'
  | 'photo-focus'
  | 'gradient'
  | 'bordered'
  // Two-column specific styles
  | 'sidebar-header'      // Name/title in sidebar, contact in main
  | 'split-header'        // Photo in sidebar, text in main
  | 'compact-sidebar'     // Minimal header in sidebar
  | 'banner-overlay'      // Banner spanning top with sidebar overlap

// Experience section styles (NEW)
export type ExperienceStyle =
  | 'classic'
  | 'timeline'
  | 'cards'
  | 'compact'
  | 'detailed'

// Education section styles (NEW)
export type EducationStyle =
  | 'classic'
  | 'cards'
  | 'compact'
  | 'academic'

// Skills styles - expanded from 4 to 9
export type SkillsStyle =
  | 'pills'
  | 'list'
  | 'grid'
  | 'bars'
  | 'tags-outlined'
  | 'chips'
  | 'icons'
  | 'rating-stars'
  | 'percentage'

// Languages styles
export type LanguagesStyle = 'inline' | 'pills' | 'bars' | 'grid'

// Section divider styles
export type SectionDividerStyle = 'line' | 'none' | 'dotted' | 'accent-bar'

// Bullet styles
export type BulletStyle = 'disc' | 'circle' | 'square' | 'dash' | 'arrow'

// Photo styles (legacy - kept for backward compat)
export type PhotoStyle =
  | 'circle'
  | 'square'
  | 'rounded'
  | 'bordered'
  | 'none'

// Enhanced Photo Theme (NEW)
export interface PhotoTheme {
  shape: 'circle' | 'square' | 'rounded' | 'hexagon'
  border: 'none' | 'thin' | 'thick' | 'double'
  borderColor: 'primary' | 'accent' | 'white' | 'gray'
  shadow: 'none' | 'subtle' | 'medium' | 'strong'
  background: 'none' | 'ring' | 'gradient-ring'
  size: 'sm' | 'md' | 'lg' | 'xl'
  visible: boolean
}

// Sidebar Style (NEW)
export interface SidebarStyle {
  corners: 'none' | 'subtle' | 'rounded' | 'pill'
  background: 'solid' | 'light' | 'gradient' | 'none'
  border: 'none' | 'subtle' | 'accent'
  fullBleed: boolean
  width: 25 | 30 | 35 | 40
}

// Summary styles (NEW), plus two-column specific styles
export type SummaryStyle =
  | 'plain'
  | 'boxed'
  | 'quoted'
  | 'highlighted'
  | 'sidebar'
  // Two-column specific styles
  | 'sidebar-summary'     // Summary in sidebar area
  | 'main-summary'        // Summary in main content area
  | 'split-summary'       // Split across columns
  | 'boxed-sidebar'       // Boxed style in sidebar

// Date format options (NEW)
export type DateFormat =
  | 'full'      // January 2024
  | 'short'     // Jan 2024
  | 'numeric'   // 01/2024
  | 'year-only' // 2024

// Spacing/density options (NEW)
export type SpacingDensity =
  | 'compact'
  | 'normal'
  | 'relaxed'

// Border styles for sections (NEW)
export type SectionBorderStyle =
  | 'none'
  | 'subtle'
  | 'card'
  | 'shadow'
  | 'accent-left'

// Theme category for template browser
export type ThemeCategory =
  | 'industry'
  | 'style'
  | 'specialty'

// Industry type for AI auto-suggest
export type Industry =
  | 'tech'
  | 'finance'
  | 'healthcare'
  | 'legal'
  | 'academia'
  | 'creative'
  | 'engineering'
  | 'marketing'
  | 'consulting'
  | 'retail'
  | 'government'
  | 'general'

export interface CVTheme {
  // Theme metadata
  id?: string
  name?: string
  category?: ThemeCategory
  industry?: Industry
  description?: string

  colors: {
    primary: string
    accent: string
    text: string
    background: string
    secondary?: string
    muted?: string
  }
  fonts: {
    heading: string
    body: string
  }

  // Layout
  layout: CVLayout
  spacing?: SpacingDensity

  // Section styles
  headerStyle: HeaderStyle
  experienceStyle?: ExperienceStyle
  educationStyle?: EducationStyle
  skillsStyle: SkillsStyle
  languagesStyle: LanguagesStyle
  summaryStyle?: SummaryStyle

  // Visual elements
  sectionDivider: SectionDividerStyle
  sectionBorder?: SectionBorderStyle
  bulletStyle: BulletStyle
  photoStyle?: PhotoStyle
  photoTheme?: PhotoTheme
  dateFormat?: DateFormat

  // Sidebar styling (for sidebar layouts)
  sidebarStyle?: SidebarStyle

  // Options
  showHeaderIcons: boolean
  pageNumbers?: {
    show: boolean
    position: 'left' | 'center' | 'right'
  }
}

export type CVSectionType = 'summary' | 'workExperience' | 'education' | 'skills' | 'languages' | 'certificates'

export const defaultSectionOrder: CVSectionType[] = ['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates']

export interface CVData {
  id?: string
  userId?: string
  personalInfo: PersonalInfo
  summary: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certificates: Certificate[]
  customSkillCategories?: string[]
  theme: CVTheme
  sectionOrder?: CVSectionType[]
  footer: Footer
  createdAt?: string
  updatedAt?: string
}

export interface CV {
  id: string
  user_id: string
  title: string
  data: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
  created_at: string
  updated_at: string
}

export const defaultPhotoTheme: PhotoTheme = {
  shape: 'circle',
  border: 'thin',
  borderColor: 'gray',
  shadow: 'none',
  background: 'none',
  size: 'md',
  visible: true,
}

export const defaultSidebarStyle: SidebarStyle = {
  corners: 'subtle',
  background: 'light',
  border: 'none',
  fullBleed: false,
  width: 30,
}

export const defaultCVTheme: CVTheme = {
  colors: {
    primary: '#000000',
    accent: '#000000',
    text: '#000000',
    background: '#FFFFFF',
  },
  fonts: {
    heading: 'Arial',
    body: 'Arial',
  },
  layout: 'classic',
  spacing: 'normal',
  headerStyle: 'left-aligned',
  experienceStyle: 'classic',
  educationStyle: 'classic',
  skillsStyle: 'list',
  languagesStyle: 'inline',
  summaryStyle: 'plain',
  sectionDivider: 'none',
  sectionBorder: 'none',
  bulletStyle: 'disc',
  photoStyle: 'circle',
  photoTheme: defaultPhotoTheme,
  dateFormat: 'short',
  sidebarStyle: defaultSidebarStyle,
  showHeaderIcons: false,
  pageNumbers: {
    show: false,
    position: 'center',
  },
}

export const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedIn: '',
  github: '',
}

export const defaultFooter: Footer = {
  rodoConsent: 'I hereby consent to my personal data being processed for the purpose of considering my application for the vacancy advertised under the terms of the Regulation (EU) 2016/679 (GDPR).',
}

export const defaultCVData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  personalInfo: defaultPersonalInfo,
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certificates: [],
  theme: defaultCVTheme,
  sectionOrder: defaultSectionOrder,
  footer: defaultFooter,
}

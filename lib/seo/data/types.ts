export interface PricingTier {
  name: string
  price: number | 'Free'
  period?: 'month' | 'year'
  features: string[]
}

export interface Rating {
  platform: 'G2' | 'Capterra' | 'Trustpilot'
  score: number
  reviewCount: number
  url?: string
}

export interface FeatureSupport {
  aiResumeBuilder: boolean | 'partial'
  atsOptimization: boolean | 'partial'
  aiJobMatching: boolean | 'partial'
  emailIntegration: boolean | 'partial'
  calendarIntegration: boolean | 'partial'
  coverLetterBuilder: boolean | 'partial'
  interviewPrep: boolean | 'partial'
  multipleTemplates: boolean | 'partial'
  pdfExport: boolean | 'partial'
  docxExport: boolean | 'partial'
  aiWritingAssistant: boolean | 'partial'
  customDomain: boolean | 'partial'
  analytics: boolean | 'partial'
  teamFeatures: boolean | 'partial'
}

export type FeatureKey = keyof FeatureSupport

export const featureLabels: Record<FeatureKey, string> = {
  aiResumeBuilder: 'AI Resume Builder',
  atsOptimization: 'ATS Optimization',
  aiJobMatching: 'AI Job Matching',
  emailIntegration: 'Email Integration',
  calendarIntegration: 'Calendar Integration',
  coverLetterBuilder: 'Cover Letter Builder',
  interviewPrep: 'Interview Prep',
  multipleTemplates: 'Multiple Templates',
  pdfExport: 'PDF Export',
  docxExport: 'DOCX Export',
  aiWritingAssistant: 'AI Writing Assistant',
  customDomain: 'Custom Domain',
  analytics: 'Analytics',
  teamFeatures: 'Team Features',
}

export interface FAQ {
  question: string
  answer: string
}

export interface Competitor {
  slug: string
  name: string
  shortName?: string
  tagline: string
  website: string
  foundedYear?: number
  pricing: PricingTier[]
  features: FeatureSupport
  ratings: Rating[]
  pros: string[]
  cons: string[]
  bestFor: string
  detailedBreakdown: string
  quickVerdict: string
  whyPeopleSwitch?: string[]
  faqs: FAQ[]
  relatedSlugs: string[]
  updatedAt: string
}

export interface UseCaseSection {
  title: string
  body: string
  tip?: string
}

export interface UseCase {
  slug: string
  category: UseCaseCategory
  title: string
  metaTitle: string
  metaDescription: string
  subtitle: string
  readTimeMinutes: number
  keyTakeaways: string[]
  sections: UseCaseSection[]
  checklist: string[]
  commonMistakes: string[]
  relevantFeatures: FeatureKey[]
  relatedSlugs: string[]
  updatedAt: string
}

export type UseCaseCategory =
  | 'resume-by-role'
  | 'resume-by-industry'
  | 'cover-letters'
  | 'job-search-strategy'
  | 'interview-prep'
  | 'career-transition'
  | 'ats-optimization'

export const useCaseCategoryLabels: Record<UseCaseCategory, string> = {
  'resume-by-role': 'Resume by Role',
  'resume-by-industry': 'Resume by Industry',
  'cover-letters': 'Cover Letters',
  'job-search-strategy': 'Job Search Strategy',
  'interview-prep': 'Interview Prep',
  'career-transition': 'Career Transition',
  'ats-optimization': 'ATS Optimization',
}

export interface BestOfCategory {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  selectionCriteria: string[]
  buyersGuide: string
  competitorSlugs: string[]
  faqs: FAQ[]
  relatedCategorySlugs: string[]
  updatedAt: string
}

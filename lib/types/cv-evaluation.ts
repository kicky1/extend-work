// Reference to a specific CV section for highlighting
export interface CVSectionRef {
  type: 'personalInfo' | 'summary' | 'workExperience' | 'education' | 'skill' | 'language' | 'skills' | 'languages'
  id?: string // Required for workExperience, education, skill, language types
  field?: string // Optional field name for personalInfo type
}

export type IssueSeverity = 'critical' | 'warning' | 'suggestion'

export interface CVIssue {
  id: string
  severity: IssueSeverity
  title: string
  description: string
  suggestion?: string
  ref: CVSectionRef
}

export interface SectionScore {
  section: string
  score: number // 0-100
  issues: string[] // Issue IDs
}

export interface KeywordAnalysis {
  found: string[] // Keywords found in the CV
  missing: string[] // Recommended keywords not present
  score: number // 0-100
}

export interface CVEvaluation {
  overallScore: number // 0-100
  sectionScores: SectionScore[]
  issues: CVIssue[]
  strengths: string[]
  timestamp: string
  // Enhanced evaluation fields
  keywordAnalysis: KeywordAnalysis
  atsScore: number // Separate ATS compatibility score 0-100
  jobMatchScore?: number // Only present if job description was provided
}

// Helper to create a unique key for a section ref (for React keys and comparison)
export function getSectionRefKey(ref: CVSectionRef): string {
  if (ref.id) {
    return `${ref.type}-${ref.id}`
  }
  if (ref.field) {
    return `${ref.type}-${ref.field}`
  }
  return ref.type
}

// Check if a section ref matches
export function matchesSectionRef(ref: CVSectionRef, type: string, id?: string): boolean {
  if (ref.type !== type) return false
  if (ref.id && id) return ref.id === id
  if (ref.id && !id) return false // ref has id but we're checking without id
  return true
}

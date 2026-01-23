import { create } from 'zustand'
import type { CVEvaluation, CVSectionRef } from '@/lib/types/cv-evaluation'
import type { CVData } from '@/lib/types/cv'

interface EvaluationStore {
  // State
  evaluation: CVEvaluation | null
  baselineEvaluation: CVEvaluation | null
  isEvaluating: boolean
  error: string | null
  highlightedIssueId: string | null
  hoveredIssueId: string | null
  isPanelOpen: boolean
  jobDescription: string
  sectionRefs: Map<string, HTMLElement>
  fixedIssueIds: string[]
  pendingReEvaluate: boolean
  isFixingAll: boolean

  // Actions
  evaluate: (cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, jobDescription?: string, isReEvaluation?: boolean) => Promise<void>
  setJobDescription: (description: string) => void
  setHighlightedIssue: (issueId: string | null) => void
  setHoveredIssue: (issueId: string | null) => void
  registerSectionRef: (refKey: string, element: HTMLElement | null) => void
  markIssueFixed: (issueId: string) => void
  clearEvaluation: () => void
  openPanel: () => void
  closePanel: () => void
  setIsFixingAll: (value: boolean) => void
}

const useEvaluationStore = create<EvaluationStore>((set, get) => ({
  // Initial State
  evaluation: null,
  baselineEvaluation: null,
  isEvaluating: false,
  error: null,
  highlightedIssueId: null,
  hoveredIssueId: null,
  isPanelOpen: false,
  jobDescription: '',
  sectionRefs: new Map(),
  fixedIssueIds: [],
  pendingReEvaluate: false,
  isFixingAll: false,

  // Actions
  evaluate: async (cvData, jobDescription, isReEvaluation = false) => {
    set({ isEvaluating: true, error: null })
    const desc = jobDescription ?? get().jobDescription
    const { baselineEvaluation, fixedIssueIds } = get()

    try {
      // Build request body - include previous evaluation context for re-evaluations
      const requestBody: Record<string, unknown> = {
        cvData,
        jobDescription: desc || undefined,
      }

      // If this is a re-evaluation and we have fixes applied, pass context for anchored scoring
      if (isReEvaluation && baselineEvaluation && fixedIssueIds.length > 0) {
        requestBody.previousEvaluation = baselineEvaluation
        requestBody.fixedIssueIds = fixedIssueIds
      }

      const response = await fetch('/api/cv/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to evaluate CV')
      }

      const evaluation: CVEvaluation = await response.json()
      // Set baseline only if this is the first evaluation
      // Clear fixedIssueIds on re-evaluation since we have fresh issues
      set({
        evaluation,
        baselineEvaluation: get().baselineEvaluation || evaluation,
        isEvaluating: false,
        isPanelOpen: true,
        pendingReEvaluate: false,
        fixedIssueIds: [],
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to evaluate CV'
      set({ error: message, isEvaluating: false })
    }
  },

  setJobDescription: (description) => {
    set({ jobDescription: description })
  },

  setHighlightedIssue: (issueId) => {
    set({ highlightedIssueId: issueId })
  },

  setHoveredIssue: (issueId) => {
    set({ hoveredIssueId: issueId })
  },

  registerSectionRef: (refKey, element) => {
    const refs = new Map(get().sectionRefs)
    if (element) {
      refs.set(refKey, element)
    } else {
      refs.delete(refKey)
    }
    set({ sectionRefs: refs })
  },

  markIssueFixed: (issueId) => {
    const { fixedIssueIds, evaluation } = get()
    if (fixedIssueIds.includes(issueId)) return

    const newFixedIds = [...fixedIssueIds, issueId]
    const totalIssues = evaluation?.issues.length || 0
    const allFixed = newFixedIds.length >= totalIssues

    set({
      fixedIssueIds: newFixedIds,
      pendingReEvaluate: !allFixed, // Show reminder if not all fixed
    })
  },

  clearEvaluation: () => {
    set({
      evaluation: null,
      baselineEvaluation: null,
      error: null,
      highlightedIssueId: null,
      hoveredIssueId: null,
      isPanelOpen: false,
      jobDescription: '',
      fixedIssueIds: [],
      pendingReEvaluate: false,
      isFixingAll: false,
    })
  },

  openPanel: () => {
    set({ isPanelOpen: true })
  },

  closePanel: () => {
    set({ isPanelOpen: false, highlightedIssueId: null, hoveredIssueId: null })
  },

  setIsFixingAll: (value) => {
    set({ isFixingAll: value })
  },
}))

// Selector hooks for common use cases
export const useHighlightedIssue = () => {
  const { evaluation, highlightedIssueId } = useEvaluationStore()
  if (!evaluation || !highlightedIssueId) return null
  return evaluation.issues.find((issue) => issue.id === highlightedIssueId) || null
}

export const useIssuesForRef = (ref: CVSectionRef) => {
  const { evaluation, highlightedIssueId, hoveredIssueId } = useEvaluationStore()
  if (!evaluation) return { issues: [], isHighlighted: false, isHovered: false }

  const issues = evaluation.issues.filter((issue) => {
    if (issue.ref.type !== ref.type) return false
    // For types with IDs, check ID match
    if (ref.id) return issue.ref.id === ref.id
    // For personalInfo with field, check field match
    if (ref.field) return issue.ref.field === ref.field
    // For types without IDs (summary, skills, languages), just match type
    return !issue.ref.id
  })

  const isHighlighted = highlightedIssueId
    ? issues.some((issue) => issue.id === highlightedIssueId)
    : false

  const isHovered = hoveredIssueId
    ? issues.some((issue) => issue.id === hoveredIssueId)
    : false

  return { issues, isHighlighted, isHovered }
}

export default useEvaluationStore

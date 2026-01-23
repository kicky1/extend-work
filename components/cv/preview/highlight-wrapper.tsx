'use client'

import { useEffect, useRef } from 'react'
import useEvaluationStore, { useIssuesForRef } from '@/lib/stores/evaluation-store'
import type { CVSectionRef, IssueSeverity } from '@/lib/types/cv-evaluation'
import { getSectionRefKey } from '@/lib/types/cv-evaluation'

interface HighlightWrapperProps {
  sectionRef: CVSectionRef
  children: React.ReactNode
  className?: string
}

const severityColors: Record<IssueSeverity, { border: string; bg: string }> = {
  critical: { border: 'border-red-500', bg: 'bg-red-50/50' },
  warning: { border: 'border-amber-500', bg: 'bg-amber-50/50' },
  suggestion: { border: 'border-blue-500', bg: 'bg-blue-50/50' },
}

export default function HighlightWrapper({
  sectionRef,
  children,
  className = '',
}: HighlightWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { issues, isHovered } = useIssuesForRef(sectionRef)

  // Register this section element for position tracking
  // Using getState() to avoid dependency on registerSectionRef changing
  useEffect(() => {
    const refKey = getSectionRefKey(sectionRef)
    useEvaluationStore.getState().registerSectionRef(refKey, elementRef.current)
    return () => useEvaluationStore.getState().registerSectionRef(refKey, null)
  }, [sectionRef.type, sectionRef.id, sectionRef.field])

  // Get the highest severity for hover highlight
  const highestSeverity = issues.reduce<IssueSeverity>((highest, issue) => {
    const order: IssueSeverity[] = ['suggestion', 'warning', 'critical']
    return order.indexOf(issue.severity) > order.indexOf(highest)
      ? issue.severity
      : highest
  }, 'suggestion')

  const colors = issues.length > 0 ? severityColors[highestSeverity] : null

  return (
    <div
      ref={elementRef}
      className={`relative rounded-sm transition-all duration-200 ${className} ${
        isHovered && colors
          ? `border-2 ${colors.border} ${colors.bg} shadow-md`
          : ''
      }`}
    >
      {children}
    </div>
  )
}

'use client'

import { AlertCircle, AlertTriangle, Lightbulb } from 'lucide-react'
import type { CVIssue, IssueSeverity } from '@/lib/types/cv-evaluation'
import useEvaluationStore from '@/lib/stores/evaluation-store'

interface IndicatorDotProps {
  issue: CVIssue
  yPosition: number
  onApplyFix?: (issue: CVIssue) => void
}

const severityConfig: Record<IssueSeverity, {
  bg: string
  border: string
  hoverBg: string
  icon: typeof AlertCircle
  iconColor: string
}> = {
  critical: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    hoverBg: 'hover:bg-red-600',
    icon: AlertCircle,
    iconColor: 'text-white',
  },
  warning: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    hoverBg: 'hover:bg-amber-600',
    icon: AlertTriangle,
    iconColor: 'text-white',
  },
  suggestion: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    hoverBg: 'hover:bg-blue-600',
    icon: Lightbulb,
    iconColor: 'text-white',
  },
}

export default function IndicatorDot({ issue, yPosition, onApplyFix }: IndicatorDotProps) {
  const { hoveredIssueId, setHoveredIssue } = useEvaluationStore()
  const config = severityConfig[issue.severity]
  const Icon = config.icon
  const isHovered = hoveredIssueId === issue.id

  return (
    <div
      className="absolute right-0 z-10"
      style={{ top: yPosition }}
      onMouseEnter={() => setHoveredIssue(issue.id)}
      onMouseLeave={() => setHoveredIssue(null)}
    >
      {/* The dot */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer
          ${config.bg} ${config.border} ${config.hoverBg}
          border-2 shadow-md transition-all duration-200
          ${isHovered ? 'scale-125 shadow-lg' : ''}`}
      >
        <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      </div>

      {/* Popup on hover */}
      {isHovered && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
          <div className="flex items-start gap-2">
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.bg.replace('bg-', 'text-')}`} />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-900">{issue.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
              {issue.suggestion && (
                <p className="text-xs text-gray-500 mt-1 italic">Tip: {issue.suggestion}</p>
              )}
              {onApplyFix && (
                <button
                  onClick={() => onApplyFix(issue)}
                  className="mt-2 px-2 py-1 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                >
                  Apply Fix
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { AlertCircle, AlertTriangle, Lightbulb, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CVIssue, IssueSeverity } from '@/lib/types/cv-evaluation'

interface IssueCardProps {
  issue: CVIssue
  onFixIssue?: (issue: CVIssue) => void
}

const severityConfig: Record<
  IssueSeverity,
  {
    icon: typeof AlertCircle
    bg: string
    border: string
    iconColor: string
    label: string
  }
> = {
  critical: {
    icon: AlertCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    label: 'Warning',
  },
  suggestion: {
    icon: Lightbulb,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    label: 'Suggestion',
  },
}

export default function IssueCard({ issue, onFixIssue }: IssueCardProps) {
  const config = severityConfig[issue.severity]
  const Icon = config.icon

  return (
    <div
      className={`p-3 rounded-lg border ${config.border} ${config.bg}`}
    >
      <div className="flex items-start gap-2">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm text-gray-900 truncate">{issue.title}</h4>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${config.bg} ${config.iconColor} border ${config.border}`}
            >
              {config.label}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
          {issue.suggestion && (
            <p className="text-xs text-gray-500 italic mb-2">Tip: {issue.suggestion}</p>
          )}
          {onFixIssue && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => onFixIssue(issue)}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              Fix with AI
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Shimmer } from '@/components/ai-elements/shimmer'

export interface ToolResultItem {
  key: string
  description: string
  state: 'pending' | 'completed' | 'error'
  errorMessage?: string
  toolName?: string
}

const PENDING_LABELS: Record<string, string> = {
  // CV tools
  update_personal_info: 'Updating personal info...',
  update_summary: 'Updating summary...',
  add_experience: 'Adding experience...',
  update_experience: 'Updating experience...',
  delete_experience: 'Removing experience...',
  add_education: 'Adding education...',
  update_education: 'Updating education...',
  delete_education: 'Removing education...',
  add_skill: 'Adding skill...',
  update_skill: 'Updating skill...',
  delete_skill: 'Removing skill...',
  add_language: 'Adding language...',
  update_language: 'Updating language...',
  delete_language: 'Removing language...',
  add_certificate: 'Adding certificate...',
  update_certificate: 'Updating certificate...',
  delete_certificate: 'Removing certificate...',
  update_footer: 'Updating footer...',
  add_custom_category: 'Adding custom section...',
  remove_custom_category: 'Removing custom section...',
  update_theme: 'Updating theme...',
  reorder_sections: 'Reordering sections...',
  // Calendar/interview tools
  create_interview: 'Scheduling interview...',
  update_interview: 'Updating interview...',
  reschedule_interview: 'Rescheduling interview...',
  cancel_interview: 'Cancelling interview...',
  delete_interview: 'Deleting interview...',
  list_interviews: 'Fetching interviews...',
  get_interview_details: 'Fetching details...',
  update_outcome: 'Updating outcome...',
  list_processes: 'Fetching processes...',
  add_stage: 'Adding stage...',
  skip_stage: 'Skipping stage...',
  complete_stage: 'Completing stage...',
  update_process_status: 'Updating process...',
  // Cover letter tools
  update_content: 'Updating content...',
  update_section: 'Updating section...',
  update_tone: 'Updating tone...',
  update_recipient: 'Updating recipient...',
  regenerate: 'Regenerating...',
}

function getPendingLabel(toolName?: string): string {
  if (toolName && PENDING_LABELS[toolName]) return PENDING_LABELS[toolName]
  return 'Applying...'
}

interface ToolResultGroupProps {
  results: ToolResultItem[]
}

export function ToolResultGroup({ results }: ToolResultGroupProps) {
  const [expanded, setExpanded] = useState(false)

  const pending = results.filter(r => r.state === 'pending')
  const completed = results.filter(r => r.state === 'completed')
  const errors = results.filter(r => r.state === 'error')

  // All pending → per-tool shimmer labels
  if (pending.length === results.length) {
    return (
      <div className="text-xs mt-2 px-2 py-1.5 bg-background/50 rounded space-y-1">
        {results.map((r) => (
          <div key={r.key} className="flex items-center gap-2">
            <Shimmer className="text-muted-foreground">{getPendingLabel(r.toolName)}</Shimmer>
          </div>
        ))}
      </div>
    )
  }

  // Single completed result → inline with green tint
  if (results.length === 1) {
    const r = results[0]
    if (r.state === 'error') {
      return (
        <div className="text-xs mt-2 px-2 py-1.5 bg-red-500/5 rounded">
          <span className="text-red-600">Error: {r.errorMessage || 'Failed'}</span>
        </div>
      )
    }
    return (
      <div className="text-xs mt-2 px-2 py-1.5 bg-green-500/5 rounded flex items-center gap-2">
        <span className="text-green-600">&#10003;</span>
        <span className="text-foreground">{r.description}</span>
      </div>
    )
  }

  // Multiple results → collapsible summary (collapsed by default)
  const summaryParts: string[] = []
  if (completed.length > 0) summaryParts.push(`${completed.length} change${completed.length > 1 ? 's' : ''} applied`)
  if (errors.length > 0) summaryParts.push(`${errors.length} failed`)
  if (pending.length > 0) summaryParts.push(`${pending.length} pending`)

  return (
    <div className="text-xs mt-2 bg-background/50 rounded overflow-hidden">
      {/* Summary row */}
      <button
        type="button"
        className="w-full px-2 py-1.5 flex items-center gap-2 hover:bg-background/80 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {errors.length === 0 ? (
          <span className="text-green-600">&#10003;</span>
        ) : (
          <span className="text-amber-500">!</span>
        )}
        <span className="text-foreground">{summaryParts.join(', ')}</span>
        {expanded ? (
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        )}
      </button>

      {/* Expanded list */}
      {expanded && (
        <div className="border-t border-border/50">
          {results.map((r) => (
            <div
              key={r.key}
              className={`px-3 py-1 flex items-center gap-2 border-b border-border/30 last:border-b-0 ${
                r.state === 'completed' ? 'border-l-2 border-l-green-500/40' :
                r.state === 'error' ? 'border-l-2 border-l-red-500/40' : ''
              }`}
            >
              {r.state === 'completed' && <span className="text-green-600">&#10003;</span>}
              {r.state === 'error' && <span className="text-red-600">&#10007;</span>}
              {r.state === 'pending' && <Shimmer className="text-muted-foreground">{getPendingLabel(r.toolName)}</Shimmer>}
              {r.state !== 'pending' && (
                <span className={r.state === 'error' ? 'text-red-600' : 'text-foreground'}>
                  {r.state === 'error' ? r.errorMessage || 'Failed' : r.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

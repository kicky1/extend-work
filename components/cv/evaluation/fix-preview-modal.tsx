'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, CheckCircle, AlertCircle, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CVIssue } from '@/lib/types/cv-evaluation'
import { applyToolResults, describeToolResults, type ToolResult } from '@/lib/utils/apply-tool-results'
import useCVStore from '@/lib/stores/cv-store'

interface FixPreviewModalProps {
  issue: CVIssue
  onClose: () => void
  onFixApplied: (issueId: string) => void
}

type ModalState = 'loading' | 'preview' | 'applying' | 'success' | 'error'

export default function FixPreviewModal({ issue, onClose, onFixApplied }: FixPreviewModalProps) {
  const [state, setState] = useState<ModalState>('loading')
  const [toolResults, setToolResults] = useState<ToolResult[]>([])
  const [explanation, setExplanation] = useState('')
  const [error, setError] = useState('')
  const { cvData } = useCVStore()

  // Fetch fix proposal on mount
  useEffect(() => {
    fetchFix()
  }, [])

  async function fetchFix() {
    setState('loading')
    setError('')

    try {
      const response = await fetch('/api/cv/fix-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue, cvData }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate fix')
      }

      const data = await response.json()
      setToolResults(data.toolResults || [])
      setExplanation(data.explanation || '')
      setState('preview')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate fix')
      setState('error')
    }
  }

  function handleApply() {
    setState('applying')

    try {
      applyToolResults(toolResults)
      setState('success')

      // Notify parent that fix was applied
      setTimeout(() => {
        onFixApplied(issue.id)
        onClose()
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply fix')
      setState('error')
    }
  }

  const descriptions = describeToolResults(toolResults)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-gray-900">Apply Fix</h2>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Issue summary */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{issue.title}</p>
            <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
          </div>

          {/* Loading state */}
          {state === 'loading' && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-gray-600">Generating fix...</span>
            </div>
          )}

          {/* Preview state */}
          {state === 'preview' && (
            <div className="space-y-4">
              {explanation && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">AI Explanation</h3>
                  <p className="text-sm text-gray-600">{explanation}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Proposed Changes</h3>
                {descriptions.length > 0 ? (
                  <ul className="space-y-2">
                    {descriptions.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{desc}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">No changes proposed</p>
                )}
              </div>
            </div>
          )}

          {/* Applying state */}
          {state === 'applying' && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-gray-600">Applying changes...</span>
            </div>
          )}

          {/* Success state */}
          {state === 'success' && (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
              <p className="mt-2 text-sm font-medium text-gray-900">Fix applied successfully!</p>
            </div>
          )}

          {/* Error state */}
          {state === 'error' && (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500" />
              <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={fetchFix}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {state === 'preview' && (
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={toolResults.length === 0}>
              Apply Fix
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

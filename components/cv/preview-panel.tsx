'use client'

import { useState, useRef } from 'react'
import useCVStore from '@/lib/stores/cv-store'
import useEvaluationStore from '@/lib/stores/evaluation-store'
import CVDocument from './preview/cv-document'
import EvaluationPanel from './evaluation/evaluation-panel'
import IssueIndicators from './evaluation/issue-indicators'
import FixPreviewModal from './evaluation/fix-preview-modal'
import { exportCVToPDF } from '@/lib/utils/export-pdf'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import type { CVIssue } from '@/lib/types/cv-evaluation'

function CVDocumentSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 animate-pulse">
      {/* Header */}
      <div className="text-center space-y-3 pb-4 border-b border-gray-100">
        <div className="h-8 w-48 bg-gray-100 rounded mx-auto" />
        <div className="h-4 w-64 bg-gray-100 rounded mx-auto" />
        <div className="flex justify-center gap-4">
          <div className="h-3 w-24 bg-gray-100 rounded" />
          <div className="h-3 w-32 bg-gray-100 rounded" />
          <div className="h-3 w-28 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-100 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-3/4 bg-gray-100 rounded" />
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <div className="h-5 w-28 bg-gray-100 rounded" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-40 bg-gray-100 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
          <div className="h-3 w-32 bg-gray-100 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
        </div>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="h-5 w-24 bg-gray-100 rounded" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-36 bg-gray-100 rounded" />
            <div className="h-3 w-20 bg-gray-100 rounded" />
          </div>
          <div className="h-3 w-28 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <div className="h-5 w-16 bg-gray-100 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-100 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PreviewPanel() {
  const { cvData, isInitialized } = useCVStore()
  const { isEvaluating, evaluation, evaluate, openPanel, markIssueFixed } = useEvaluationStore()
  const [isExporting, setIsExporting] = useState(false)
  const [fixingIssue, setFixingIssue] = useState<CVIssue | null>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const handleEvaluate = async () => {
    await evaluate(cvData)
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const filename = cvData.personalInfo.fullName
        ? `${cvData.personalInfo.fullName.replace(/\s+/g, '-')}-CV.pdf`
        : 'my-cv.pdf'

      await exportCVToPDF(filename)
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleApplyFix = (issue: CVIssue) => {
    setFixingIssue(issue)
  }

  const handleFixApplied = (issueId: string) => {
    markIssueFixed(issueId)
    setFixingIssue(null)
    // The success state is shown in the modal before closing
  }

  return (
    <>
    <div className="h-full flex flex-col bg-muted/50">
      {/* Toolbar */}
      <div className="bg-card border-b border-border px-4 py-3.5 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Preview</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={evaluation ? 'secondary' : 'outline'}
            size="sm"
            onClick={evaluation ? openPanel : handleEvaluate}
            disabled={isEvaluating || !isInitialized}
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-1.5" />
                {evaluation ? 'Show Results' : 'Evaluate'}
              </>
            )}
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={isExporting || !isInitialized}
            size="sm"
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div
        ref={previewContainerRef}
        className="flex-1 overflow-y-auto p-4 lg:p-8 relative"
      >
        <div className="max-w-3xl mx-auto relative">
          {!isInitialized ? (
            <CVDocumentSkeleton />
          ) : (
            <>
              <CVDocument cvData={cvData} />
              {/* Issue indicators on right edge */}
              {evaluation && (
                <IssueIndicators
                  containerRef={previewContainerRef}
                  onApplyFix={handleApplyFix}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <EvaluationPanel />
    {/* Fix Preview Modal */}
    {fixingIssue && (
      <FixPreviewModal
        issue={fixingIssue}
        onClose={() => setFixingIssue(null)}
        onFixApplied={handleFixApplied}
      />
    )}
    </>
  )
}

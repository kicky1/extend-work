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

export default function PreviewPanel() {
  const { cvData } = useCVStore()
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
            disabled={isEvaluating}
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
            disabled={isExporting}
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
          <CVDocument cvData={cvData} />
          {/* Issue indicators on right edge */}
          {evaluation && (
            <IssueIndicators
              containerRef={previewContainerRef}
              onApplyFix={handleApplyFix}
            />
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

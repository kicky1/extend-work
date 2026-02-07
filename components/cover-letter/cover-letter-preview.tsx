'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import useCoverLetterStore from '@/lib/stores/cover-letter-store'
import useCVStore from '@/lib/stores/cv-store'
import { exportToPDF } from '@/lib/utils/export-pdf'
import { exportCoverLetterToDocx } from '@/lib/utils/export-docx'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Download, ChevronDown, Loader2 } from 'lucide-react'
import CoverLetterPaginator from './cover-letter-paginator'


function PreviewSkeleton() {
  return (
    <div className="h-full flex flex-col bg-muted/50">
      <div className="bg-card border-b border-border px-4 py-3.5 flex items-center justify-between">
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        <div className="h-8 w-24 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 animate-pulse max-w-3xl mx-auto" style={{ aspectRatio: '210/297' }}>
          {/* Sender info */}
          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-100 rounded" />
            <div className="h-3 w-56 bg-gray-100 rounded" />
          </div>
          {/* Date */}
          <div className="h-3 w-32 bg-gray-100 rounded" />
          {/* Recipient */}
          <div className="h-3 w-28 bg-gray-100 rounded" />
          {/* Body paragraphs */}
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-3/4 bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>
          {/* Closing */}
          <div className="space-y-3 pt-4">
            <div className="h-3 w-20 bg-gray-100 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoverLetterPreview() {
  const { coverLetterData, isGenerating, isInitialized } = useCoverLetterStore()
  const { cvData } = useCVStore()
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [isExportingDocx, setIsExportingDocx] = useState(false)

  const { personalInfo } = cvData

  const handleExportPDF = async () => {
    setIsExportingPDF(true)
    try {
      const el = document.querySelector('.cover-letter-preview') as HTMLElement
      if (!el) throw new Error('Preview element not found')

      const filename = coverLetterData.company
        ? `Cover-Letter-${coverLetterData.company.replace(/\s+/g, '-')}.pdf`
        : 'cover-letter.pdf'
      await exportToPDF(el, filename, '.cover-letter-page')
    } catch (error) {
      console.error('Failed to export PDF:', error)
      toast.error('Failed to export PDF. Please try again.')
    } finally {
      setIsExportingPDF(false)
    }
  }

  const handleExportDocx = async () => {
    setIsExportingDocx(true)
    try {
      await exportCoverLetterToDocx(coverLetterData, cvData)
    } catch (error) {
      console.error('Failed to export DOCX:', error)
      toast.error('Failed to export DOCX. Please try again.')
    } finally {
      setIsExportingDocx(false)
    }
  }

  const isExporting = isExportingPDF || isExportingDocx

  const hasContent = !!coverLetterData.content?.trim()

  if (!isInitialized) return <PreviewSkeleton />

  return (
    <div className="h-full flex flex-col bg-muted/50">
      {/* Toolbar */}
      <div className="bg-card border-b border-border px-4 py-3.5 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Preview</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button disabled={isExporting} size="sm" asChild>
              <span>
                <Download className="w-4 h-4 mr-1.5" />
                {isExportingPDF ? 'Exporting PDF\u2026' : isExportingDocx ? 'Exporting DOCX\u2026' : 'Export'}
                <ChevronDown className="w-3 h-3 ml-1" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportPDF} disabled={isExportingPDF}>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportDocx} disabled={isExportingDocx}>
              Export as DOCX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="cover-letter-preview">
          {hasContent ? (
            <CoverLetterPaginator>
              {/* Sender info */}
              {(personalInfo.fullName || personalInfo.email || personalInfo.phone || personalInfo.location) && (
                <div data-section="sender-info" className="mb-6">
                  {personalInfo.fullName && (
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo.fullName}
                    </p>
                  )}
                  {(personalInfo.email || personalInfo.phone || personalInfo.location) && (
                    <p className="text-sm text-gray-500 mt-1">
                      {[personalInfo.email, personalInfo.phone, personalInfo.location]
                        .filter(Boolean)
                        .join(' | ')}
                    </p>
                  )}
                </div>
              )}

              {/* Date */}
              <div data-section="date" className="mb-6">
                <p className="text-sm text-gray-600">
                  {new Intl.DateTimeFormat(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date())}
                </p>
              </div>

              {/* Recipient */}
              {coverLetterData.company && (
                <div data-section="recipient" className="mb-6">
                  <p className="text-sm text-gray-600">{coverLetterData.company}</p>
                </div>
              )}

              {/* Body — single prose wrapper for continuous spacing */}
              <div
                data-section="body"
                className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: coverLetterData.content }}
              />

              {/* Closing */}
              <div data-section="closing" className="mt-8">
                <p className="text-sm text-gray-800">Sincerely,</p>
                {personalInfo.fullName && (
                  <p className="text-sm font-semibold text-gray-900 mt-4">
                    {personalInfo.fullName}
                  </p>
                )}
              </div>
            </CoverLetterPaginator>
          ) : isGenerating ? (
            <CoverLetterPaginator>
              <div data-section="generating" className="flex flex-col items-center justify-center text-muted-foreground py-20">
                <Loader2 className="w-8 h-8 animate-spin motion-reduce:animate-none mb-3" aria-hidden="true" />
                <p className="text-lg">Generating your cover letter&#8230;</p>
              </div>
            </CoverLetterPaginator>
          ) : (
            <CoverLetterPaginator>
              <div data-section="empty" className="text-center text-gray-400 py-20">
                <p className="text-lg">Your cover letter will appear here</p>
                <p className="text-sm mt-2">
                  Start typing in the editor or use the AI assistant to generate one
                </p>
              </div>
            </CoverLetterPaginator>
          )}
        </div>
      </div>
    </div>
  )
}

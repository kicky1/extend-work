'use client'

import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_PADDING_PX,
} from '@/components/cv/preview/cv-page'

interface CoverLetterPageProps {
  children: React.ReactNode
  pageNumber?: number
  totalPages?: number
  className?: string
}

export default function CoverLetterPage({
  children,
  pageNumber,
  totalPages,
  className = '',
}: CoverLetterPageProps) {
  const showPageNumbers = pageNumber && totalPages && totalPages > 1

  return (
    <div
      className={`cover-letter-page bg-white shadow-lg relative ${className}`}
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        minWidth: `${A4_WIDTH_PX}px`,
        minHeight: `${A4_HEIGHT_PX}px`,
        color: '#1f2937',
      }}
    >
      <div
        className="flex flex-col overflow-hidden"
        style={{
          padding: `${A4_PADDING_PX}px`,
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>

        {showPageNumbers && (
          <div className="shrink-0 pt-2 text-xs text-gray-400 text-center" style={{ height: '30px' }}>
            {pageNumber} / {totalPages}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import type { CVTheme } from '@/lib/types/cv'

// A4 dimensions at 96 DPI (standard screen resolution)
// 210mm × 297mm → 794px × 1123px
export const A4_WIDTH_PX = 794
export const A4_HEIGHT_PX = 1123
export const A4_ASPECT_RATIO = A4_HEIGHT_PX / A4_WIDTH_PX // ~1.414

// Fixed padding for A4 page (in pixels at native size)
export const A4_PADDING_PX = 48

// Available content area
export const A4_CONTENT_WIDTH = A4_WIDTH_PX - (A4_PADDING_PX * 2) // 698px
export const A4_CONTENT_HEIGHT = A4_HEIGHT_PX - (A4_PADDING_PX * 2) // 1027px

interface CVPageProps {
  children: React.ReactNode
  theme: CVTheme
  pageNumber?: number
  totalPages?: number
  className?: string
  isEditing?: boolean
  footer?: React.ReactNode
}

export default function CVPage({
  children,
  theme,
  pageNumber,
  totalPages,
  className = '',
  isEditing = false,
  footer,
}: CVPageProps) {
  const showPageNumbers = theme.pageNumbers?.show && pageNumber && totalPages && totalPages > 1
  const pageNumberPosition = theme.pageNumbers?.position || 'center'

  const positionClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Page number takes ~30px when shown
  const pageNumberHeight = showPageNumbers ? 30 : 0

  return (
    <div
      className={`cv-page bg-white shadow-lg relative ${className}`}
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        minWidth: `${A4_WIDTH_PX}px`,
        minHeight: `${A4_HEIGHT_PX}px`,
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Page content wrapper with fixed padding */}
      <div
        className={`flex flex-col ${isEditing ? '' : 'overflow-hidden'}`}
        style={{
          padding: `${A4_PADDING_PX}px`,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Main content area - flex-1 to fill space, min-h-0 for proper flex behavior */}
        <div
          className={`flex-1 min-h-0 ${isEditing ? '' : 'overflow-hidden'}`}
        >
          {children}
        </div>

        {/* Footer - pinned to bottom of last page */}
        {footer && (
          <div className="shrink-0 mt-auto">
            {footer}
          </div>
        )}

        {/* Page number */}
        {showPageNumbers && (
          <div
            className={`shrink-0 pt-2 text-xs text-gray-400 ${positionClasses[pageNumberPosition]}`}
            style={{
              fontFamily: theme.fonts.body,
              height: `${pageNumberHeight}px`,
            }}
          >
            {pageNumber} / {totalPages}
          </div>
        )}
      </div>
    </div>
  )
}

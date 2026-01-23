'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react'
import CVPage, {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_PADDING_PX,
  A4_CONTENT_HEIGHT,
} from './cv-page'
import type { CVTheme } from '@/lib/types/cv'

interface MeasuredSection {
  id: string
  element: ReactElement
  height: number
}

interface CVPaginatorProps {
  theme: CVTheme
  children: ReactNode
  footer?: ReactNode
}

// Page number height when shown
const PAGE_NUMBER_HEIGHT = 30

export default function CVPaginator({ theme, children }: CVPaginatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<MeasuredSection[][]>([])
  const [scale, setScale] = useState(1)
  const [hasMeasured, setHasMeasured] = useState(false)

  // Convert children to array, filtering out nulls and separating footer
  const { childArray, footerChild } = useMemo(() => {
    const items: ReactElement[] = []
    let footer: ReactElement | null = null
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const sectionId = (child.props as Record<string, unknown>)?.['data-section']
        if (sectionId === 'footer') {
          footer = child
        } else {
          items.push(child)
        }
      }
    })
    return { childArray: items, footerChild: footer }
  }, [children])

  // Calculate available content height (fixed A4 size)
  const baseAvailableHeight = useMemo(() => {
    const pageNumberSpace = theme.pageNumbers?.show ? PAGE_NUMBER_HEIGHT : 0
    return A4_CONTENT_HEIGHT - pageNumberSpace
  }, [theme.pageNumbers?.show])

  // Calculate scale to fit container
  const updateScale = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    // Add some padding around the scaled page
    const targetWidth = containerWidth - 32 // 16px padding on each side
    const newScale = Math.min(1, targetWidth / A4_WIDTH_PX)
    setScale(newScale)
  }, [])

  // Measure and distribute content
  const measureAndPaginate = useCallback(() => {
    const measureContainer = measureRef.current
    if (!measureContainer) return

    const sections = measureContainer.querySelectorAll('[data-section-measure]')
    const measured: MeasuredSection[] = []

    // Measure footer separately
    const footerEl = measureContainer.querySelector('[data-section-measure="footer"]') as HTMLElement
    const measuredFooterHeight = footerEl ? footerEl.offsetHeight : 0

    console.log('[CVPaginator] ========== MEASUREMENT START ==========')
    console.log('[CVPaginator] Fixed A4 width:', A4_WIDTH_PX)
    console.log('[CVPaginator] Fixed A4 height:', A4_HEIGHT_PX)
    console.log('[CVPaginator] Content padding:', A4_PADDING_PX)
    console.log('[CVPaginator] Base available height:', baseAvailableHeight)
    console.log('[CVPaginator] Footer height:', measuredFooterHeight)
    console.log('[CVPaginator] Number of sections:', sections.length)

    let childIndex = 0
    sections.forEach((section) => {
      const el = section as HTMLElement
      const id = el.dataset.sectionMeasure || `section-${childIndex}`
      const height = el.offsetHeight

      // Skip footer section - it's handled separately
      if (id === 'footer') return

      console.log(`[CVPaginator] Section "${id}": height=${height}px`)

      if (childArray[childIndex]) {
        measured.push({
          id,
          element: childArray[childIndex],
          height,
        })
      }
      childIndex++
    })

    // Distribute to pages - greedy fit
    // We need to reserve space for footer on the last page
    const newPages: MeasuredSection[][] = []
    let currentPage: MeasuredSection[] = []
    let currentHeight = 0
    const availableHeight = baseAvailableHeight

    console.log('[CVPaginator] Starting distribution...')

    for (let i = 0; i < measured.length; i++) {
      const section = measured[i]
      const isLastSection = i === measured.length - 1
      // On the last section, we need to reserve space for the footer
      const footerReserve = isLastSection && measuredFooterHeight > 0 ? measuredFooterHeight : 0
      const heightLimit = availableHeight - footerReserve
      const newHeight = currentHeight + section.height

      if (newHeight <= heightLimit) {
        currentPage.push(section)
        currentHeight = newHeight
        console.log(`[CVPaginator] "${section.id}" fits (total: ${newHeight}px, limit: ${heightLimit}px)`)
      } else {
        // Current section doesn't fit, start new page
        console.log(`[CVPaginator] "${section.id}" doesn't fit (${newHeight} > ${heightLimit}), new page`)
        if (currentPage.length > 0) {
          newPages.push(currentPage)
        }
        currentPage = [section]
        // If this is the last section on a new page, it still needs footer space accounted
        currentHeight = section.height
      }
    }

    if (currentPage.length > 0) {
      newPages.push(currentPage)
    }

    if (newPages.length === 0 && measured.length > 0) {
      newPages.push(measured)
    }

    // Log page distribution
    console.log('[CVPaginator] Page distribution:')
    newPages.forEach((page, i) => {
      const totalHeight = page.reduce((sum, s) => sum + s.height, 0)
      console.log(`  Page ${i + 1}: ${page.map(s => s.id).join(', ')} (${totalHeight}px / ${availableHeight}px)`)
    })

    setPages(newPages)
    setHasMeasured(true)
  }, [childArray, baseAvailableHeight])

  // Measure on mount and when dependencies change
  useEffect(() => {
    setHasMeasured(false)

    const doMeasure = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureAndPaginate()
          updateScale()
        })
      })
    }

    // Wait for fonts to load
    if (document.fonts?.ready) {
      document.fonts.ready.then(doMeasure)
    } else {
      const timeoutId = setTimeout(doMeasure, 150)
      return () => clearTimeout(timeoutId)
    }
  }, [measureAndPaginate, updateScale, children, theme])

  // Update scale on resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      updateScale()
    })

    resizeObserver.observe(container)
    updateScale() // Initial scale

    return () => resizeObserver.disconnect()
  }, [updateScale])

  // Calculate scaled dimensions for container sizing
  const scaledWidth = A4_WIDTH_PX * scale
  const scaledHeight = A4_HEIGHT_PX * scale

  return (
    <div ref={containerRef} className="w-full">
      {/* Hidden measurement container at fixed A4 content width */}
      <div
        ref={measureRef}
        className="fixed pointer-events-none"
        style={{
          top: '-99999px',
          left: 0,
          width: `${A4_WIDTH_PX - (A4_PADDING_PX * 2)}px`, // Content width only
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          visibility: 'hidden',
        }}
        aria-hidden="true"
      >
        {childArray.map((child, index) => {
          const sectionId = (child.props as Record<string, unknown>)?.['data-section'] as string || `section-${index}`
          return (
            <div key={`m-${sectionId}`} data-section-measure={sectionId} className="overflow-hidden">
              {child}
            </div>
          )
        })}
        {/* Measure footer separately */}
        {footerChild && (
          <div data-section-measure="footer" className="overflow-hidden">
            {footerChild}
          </div>
        )}
      </div>

      {/* Visible pages with scaling */}
      <div className="flex flex-col items-center gap-8">
        {hasMeasured && pages.length > 0 ? (
          pages.map((pageSections, pageIndex) => {
            const isLastPage = pageIndex === pages.length - 1
            return (
              <div
                key={pageIndex}
                style={{
                  width: `${scaledWidth}px`,
                  height: `${scaledHeight}px`,
                }}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <CVPage
                    theme={theme}
                    pageNumber={pageIndex + 1}
                    totalPages={pages.length}
                    footer={isLastPage ? footerChild : undefined}
                  >
                    {pageSections.map((section) => (
                      <div key={section.id} className="overflow-hidden">
                        {section.element}
                      </div>
                    ))}
                  </CVPage>
                </div>
              </div>
            )
          })
        ) : (
          <div
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              <CVPage theme={theme} pageNumber={1} totalPages={1}>
                {children}
              </CVPage>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

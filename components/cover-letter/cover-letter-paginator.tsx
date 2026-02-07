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
import CoverLetterPage from './cover-letter-page'
import {
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
  A4_PADDING_PX,
  A4_CONTENT_HEIGHT,
  A4_CONTENT_WIDTH,
} from '@/components/cv/preview/cv-page'

// Page number height when shown
const PAGE_NUMBER_HEIGHT = 30

interface MeasuredSection {
  id: string
  element: ReactElement
  height: number
}

interface CoverLetterPaginatorProps {
  children: ReactNode
}

/** Recursively flatten children and extract elements with data-section props */
function flattenChildren(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as Record<string, unknown>
    if (props['data-section']) {
      result.push(child)
      return
    }
    const nestedChildren = props.children as ReactNode
    if (nestedChildren) {
      result.push(...flattenChildren(nestedChildren))
    }
  })
  return result
}

export default function CoverLetterPaginator({ children }: CoverLetterPaginatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<MeasuredSection[][]>([])
  const [scale, setScale] = useState(1)
  const [hasMeasured, setHasMeasured] = useState(false)

  const childArray = useMemo(() => flattenChildren(children), [children])

  const availableHeight = useMemo(() => {
    return A4_CONTENT_HEIGHT - PAGE_NUMBER_HEIGHT
  }, [])

  // Calculate scale to fit container
  const updateScale = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const containerWidth = container.offsetWidth
    const targetWidth = containerWidth - 32
    const newScale = Math.min(1, targetWidth / A4_WIDTH_PX)
    setScale(newScale)
  }, [])

  // Measure and distribute content across pages
  const measureAndPaginate = useCallback(() => {
    const measureContainer = measureRef.current
    if (!measureContainer) return

    const sections = measureContainer.querySelectorAll('[data-section-measure]')
    const measured: MeasuredSection[] = []

    let childIndex = 0
    sections.forEach((section) => {
      const el = section as HTMLElement
      const id = el.dataset.sectionMeasure || `section-${childIndex}`
      const height = el.offsetHeight

      if (childArray[childIndex]) {
        measured.push({
          id,
          element: childArray[childIndex],
          height,
        })
      }
      childIndex++
    })

    // Greedy-fit distribution
    const newPages: MeasuredSection[][] = []
    let currentPage: MeasuredSection[] = []
    let currentHeight = 0

    for (const section of measured) {
      if (currentHeight + section.height <= availableHeight || currentPage.length === 0) {
        currentPage.push(section)
        currentHeight += section.height
      } else {
        newPages.push(currentPage)
        currentPage = [section]
        currentHeight = section.height
      }
    }

    if (currentPage.length > 0) {
      newPages.push(currentPage)
    }

    // Fallback: at least one page
    if (newPages.length === 0 && measured.length > 0) {
      newPages.push(measured)
    }

    setPages(newPages)
    setHasMeasured(true)
  }, [childArray, availableHeight])

  // Measure on mount and when deps change
  useEffect(() => {
    const doMeasure = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureAndPaginate()
          updateScale()
        })
      })
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(doMeasure)
    } else {
      const timeoutId = setTimeout(doMeasure, 150)
      return () => clearTimeout(timeoutId)
    }
  }, [measureAndPaginate, updateScale, children])

  // Update scale on resize
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      updateScale()
    })

    resizeObserver.observe(container)
    updateScale()

    return () => resizeObserver.disconnect()
  }, [updateScale])

  const scaledWidth = A4_WIDTH_PX * scale
  const scaledHeight = A4_HEIGHT_PX * scale

  return (
    <div ref={containerRef} className="w-full">
      {/* Hidden measurement container */}
      <div
        ref={measureRef}
        className="fixed pointer-events-none"
        style={{
          top: '-99999px',
          left: 0,
          width: `${A4_CONTENT_WIDTH}px`,
          color: '#1f2937',
          backgroundColor: '#ffffff',
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
      </div>

      {/* Visible pages with scaling */}
      <div className="flex flex-col items-center gap-8">
        {hasMeasured && pages.length > 0 ? (
          pages.map((pageSections, pageIndex) => (
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
                <CoverLetterPage
                  pageNumber={pageIndex + 1}
                  totalPages={pages.length}
                >
                  {pageSections.map((section) => (
                    <div key={section.id} className="overflow-hidden">
                      {section.element}
                    </div>
                  ))}
                </CoverLetterPage>
              </div>
            </div>
          ))
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
              <CoverLetterPage pageNumber={1} totalPages={1}>
                {children}
              </CoverLetterPage>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

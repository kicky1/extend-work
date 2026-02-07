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
  A4_CONTENT_WIDTH,
} from './cv-page'
import type { CVTheme, SidebarStyle } from '@/lib/types/cv'
import { defaultSidebarStyle } from '@/lib/types/cv'

// Gap between sidebar and main content in pixels
const SIDEBAR_GAP_PX = 24

interface MeasuredSection {
  id: string
  element: ReactElement
  height: number
}

interface CVPaginatorProps {
  theme: CVTheme
  children: ReactNode
  footer?: ReactNode
  /** Sidebar sections as array of data-section elements (for sidebar layouts) */
  sidebarSections?: ReactElement[]
  /** Position of the sidebar */
  sidebarPosition?: 'left' | 'right'
  /** Width of the sidebar as percentage (default 30) */
  sidebarWidth?: number
}

// Page number height when shown
const PAGE_NUMBER_HEIGHT = 30

// Helper functions for sidebar styling
function getSidebarCornerRadius(corners: SidebarStyle['corners']): string {
  switch (corners) {
    case 'none': return '0'
    case 'subtle': return '8px'
    case 'rounded': return '16px'
    case 'pill': return '9999px'
    default: return '8px'
  }
}

function getSidebarBackground(
  background: SidebarStyle['background'],
  primaryColor: string,
  accentColor: string
): string {
  switch (background) {
    case 'solid': return primaryColor
    case 'light': return `${primaryColor}10`
    case 'gradient': return `linear-gradient(180deg, ${primaryColor}15 0%, ${accentColor}10 100%)`
    case 'none': return 'transparent'
    default: return `${primaryColor}10`
  }
}

function getSidebarBorder(
  border: SidebarStyle['border'],
  primaryColor: string,
  accentColor: string
): string {
  switch (border) {
    case 'none': return 'none'
    case 'subtle': return `1px solid ${primaryColor}20`
    case 'accent': return `2px solid ${accentColor}`
    default: return 'none'
  }
}

function getSidebarTextColor(background: SidebarStyle['background'], primaryColor: string, textColor: string): string {
  // For solid backgrounds, use white text; otherwise use normal text
  return background === 'solid' ? '#FFFFFF' : textColor
}

// Recursively flatten children and extract elements with data-section props
function flattenChildren(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    // Check if this element has a data-section prop
    const props = child.props as Record<string, unknown>
    if (props['data-section']) {
      result.push(child)
      return
    }

    // If it's a Fragment or a component with children, recurse into them
    // This handles both <></> fragments and wrapper components like SidebarMainContent
    const nestedChildren = props.children as ReactNode
    if (nestedChildren) {
      result.push(...flattenChildren(nestedChildren))
    }
  })

  return result
}

interface PageContent {
  main: MeasuredSection[]
  sidebar: MeasuredSection[]
}

export default function CVPaginator({
  theme,
  children,
  sidebarSections,
  sidebarPosition = 'left',
  sidebarWidth = 30,
}: CVPaginatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const sidebarMeasureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<PageContent[]>([])
  const [scale, setScale] = useState(1)
  const [hasMeasured, setHasMeasured] = useState(false)

  // Convert children to array, recursively flattening and separating footer
  const { childArray, footerChild } = useMemo(() => {
    const allSections = flattenChildren(children)
    const items: ReactElement[] = []
    let footer: ReactElement | null = null

    for (const child of allSections) {
      const sectionId = (child.props as Record<string, unknown>)?.['data-section']
      if (sectionId === 'footer') {
        footer = child
      } else {
        items.push(child)
      }
    }

    return { childArray: items, footerChild: footer }
  }, [children])

  // Calculate available content height (fixed A4 size)
  const baseAvailableHeight = useMemo(() => {
    const pageNumberSpace = theme.pageNumbers?.show ? PAGE_NUMBER_HEIGHT : 0
    return A4_CONTENT_HEIGHT - pageNumberSpace
  }, [theme.pageNumbers?.show])

  // Calculate main content width when sidebar is present
  const mainContentWidth = useMemo(() => {
    if (!sidebarSections || sidebarSections.length === 0) {
      return A4_CONTENT_WIDTH
    }
    const sidebarPx = (A4_CONTENT_WIDTH * sidebarWidth) / 100
    return A4_CONTENT_WIDTH - sidebarPx - SIDEBAR_GAP_PX
  }, [sidebarSections, sidebarWidth])

  // Calculate sidebar width in pixels
  const sidebarWidthPx = useMemo(() => {
    if (!sidebarSections || sidebarSections.length === 0) return 0
    return (A4_CONTENT_WIDTH * sidebarWidth) / 100
  }, [sidebarSections, sidebarWidth])

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
    const sidebarMeasureContainer = sidebarMeasureRef.current
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
    console.log('[CVPaginator] Number of main sections:', sections.length)

    let childIndex = 0
    sections.forEach((section) => {
      const el = section as HTMLElement
      const id = el.dataset.sectionMeasure || `section-${childIndex}`
      const height = el.offsetHeight

      // Skip footer section - it's handled separately
      if (id === 'footer') return

      console.log(`[CVPaginator] Main section "${id}": height=${height}px`)

      if (childArray[childIndex]) {
        measured.push({
          id,
          element: childArray[childIndex],
          height,
        })
      }
      childIndex++
    })

    // Measure sidebar sections if present
    const measuredSidebar: MeasuredSection[] = []
    if (sidebarMeasureContainer && sidebarSections && sidebarSections.length > 0) {
      const sidebarSectionEls = sidebarMeasureContainer.querySelectorAll('[data-section-measure]')
      let sidebarIndex = 0
      sidebarSectionEls.forEach((section) => {
        const el = section as HTMLElement
        const id = el.dataset.sectionMeasure || `sidebar-section-${sidebarIndex}`
        const height = el.offsetHeight

        console.log(`[CVPaginator] Sidebar section "${id}": height=${height}px`)

        if (sidebarSections[sidebarIndex]) {
          measuredSidebar.push({
            id,
            element: sidebarSections[sidebarIndex],
            height,
          })
        }
        sidebarIndex++
      })
    }

    // Distribute to pages - greedy fit for both main and sidebar
    const availableHeight = baseAvailableHeight
    const newPages: PageContent[] = []

    // Track positions in both arrays
    let mainIndex = 0
    let sidebarIndex = 0
    let currentMainHeight = 0
    let currentSidebarHeight = 0
    let currentMainSections: MeasuredSection[] = []
    let currentSidebarSections: MeasuredSection[] = []

    console.log('[CVPaginator] Starting distribution...')

    // Keep adding pages until both main and sidebar content are exhausted
    while (mainIndex < measured.length || sidebarIndex < measuredSidebar.length) {
      // Reset for new page
      currentMainHeight = 0
      currentSidebarHeight = 0
      currentMainSections = []
      currentSidebarSections = []

      // Determine if this might be the last page (for footer reservation)
      const remainingMain = measured.length - mainIndex
      const remainingSidebar = measuredSidebar.length - sidebarIndex

      // Fill main content for this page
      while (mainIndex < measured.length) {
        const section = measured[mainIndex]
        const isLastMainSection = mainIndex === measured.length - 1
        // Reserve footer space only on the page that will have the last main section
        const footerReserve = isLastMainSection && measuredFooterHeight > 0 ? measuredFooterHeight : 0
        const heightLimit = availableHeight - footerReserve
        const newHeight = currentMainHeight + section.height

        if (newHeight <= heightLimit) {
          currentMainSections.push(section)
          currentMainHeight = newHeight
          mainIndex++
          console.log(`[CVPaginator] Main "${section.id}" fits (total: ${newHeight}px, limit: ${heightLimit}px)`)
        } else {
          console.log(`[CVPaginator] Main "${section.id}" doesn't fit (${newHeight} > ${heightLimit}), next page`)
          break
        }
      }

      // Fill sidebar content for this page
      while (sidebarIndex < measuredSidebar.length) {
        const section = measuredSidebar[sidebarIndex]
        const newHeight = currentSidebarHeight + section.height

        if (newHeight <= availableHeight) {
          currentSidebarSections.push(section)
          currentSidebarHeight = newHeight
          sidebarIndex++
          console.log(`[CVPaginator] Sidebar "${section.id}" fits (total: ${newHeight}px, limit: ${availableHeight}px)`)
        } else {
          console.log(`[CVPaginator] Sidebar "${section.id}" doesn't fit (${newHeight} > ${availableHeight}), next page`)
          break
        }
      }

      // Only add a page if there's content
      if (currentMainSections.length > 0 || currentSidebarSections.length > 0) {
        newPages.push({
          main: currentMainSections,
          sidebar: currentSidebarSections,
        })
      }
    }

    // Fallback: if no pages were created but we have measured content
    if (newPages.length === 0 && (measured.length > 0 || measuredSidebar.length > 0)) {
      newPages.push({
        main: measured,
        sidebar: measuredSidebar,
      })
    }

    // Log page distribution
    console.log('[CVPaginator] Page distribution:')
    newPages.forEach((page, i) => {
      const mainHeight = page.main.reduce((sum, s) => sum + s.height, 0)
      const sidebarHeight = page.sidebar.reduce((sum, s) => sum + s.height, 0)
      console.log(`  Page ${i + 1}: main=[${page.main.map(s => s.id).join(', ')}] (${mainHeight}px), sidebar=[${page.sidebar.map(s => s.id).join(', ')}] (${sidebarHeight}px)`)
    })

    setPages(newPages)
    setHasMeasured(true)
  }, [childArray, sidebarSections, baseAvailableHeight])

  // Measure on mount and when dependencies change
  // Don't reset hasMeasured to false - keep old pages visible during re-measurement
  useEffect(() => {
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

  // Get sidebar style from theme or use default
  const sidebarStyleConfig = theme.sidebarStyle || defaultSidebarStyle

  // Helper to render sidebar content for a page
  const renderSidebarForPage = (sidebarPageSections: MeasuredSection[], isFirstPage: boolean) => {
    if (!sidebarSections || sidebarSections.length === 0) return null

    const background = getSidebarBackground(
      sidebarStyleConfig.background,
      theme.colors.primary,
      theme.colors.accent
    )
    const borderRadius = getSidebarCornerRadius(sidebarStyleConfig.corners)
    const border = getSidebarBorder(
      sidebarStyleConfig.border,
      theme.colors.primary,
      theme.colors.accent
    )
    const textColor = getSidebarTextColor(
      sidebarStyleConfig.background,
      theme.colors.primary,
      theme.colors.text
    )

    const isGradient = sidebarStyleConfig.background === 'gradient'
    const isFullBleed = sidebarStyleConfig.fullBleed

    // When fullBleed, background/border/color are on the outer container div
    return (
      <div
        className="p-4 h-full"
        style={{
          background: isFullBleed ? undefined : (isGradient ? background : undefined),
          backgroundColor: isFullBleed ? undefined : (!isGradient ? background : undefined),
          borderRadius: isFullBleed ? '0' : borderRadius,
          border: isFullBleed ? 'none' : border,
          color: isFullBleed ? undefined : textColor,
        }}
      >
        {sidebarPageSections.map((section) => (
          <div key={section.id} className="overflow-hidden">
            {section.element}
          </div>
        ))}
      </div>
    )
  }

  // Helper to get empty sidebar container style (for pages without sidebar content)
  const getEmptySidebarStyle = () => {
    const background = getSidebarBackground(
      sidebarStyleConfig.background,
      theme.colors.primary,
      theme.colors.accent
    )
    const borderRadius = getSidebarCornerRadius(sidebarStyleConfig.corners)
    const border = getSidebarBorder(
      sidebarStyleConfig.border,
      theme.colors.primary,
      theme.colors.accent
    )
    const isGradient = sidebarStyleConfig.background === 'gradient'

    const isFullBleed = sidebarStyleConfig.fullBleed
    return {
      background: isFullBleed ? undefined : (isGradient ? background : undefined),
      backgroundColor: isFullBleed ? undefined : (!isGradient ? background : undefined),
      borderRadius: isFullBleed ? '0' : borderRadius,
      border: isFullBleed ? 'none' : border,
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* Hidden measurement container for main content */}
      <div
        ref={measureRef}
        className="fixed pointer-events-none"
        style={{
          top: '-99999px',
          left: 0,
          width: `${mainContentWidth}px`,
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

      {/* Hidden measurement container for sidebar content */}
      {sidebarSections && sidebarSections.length > 0 && (
        <div
          ref={sidebarMeasureRef}
          className="fixed pointer-events-none"
          style={{
            top: '-99999px',
            left: 0,
            width: `${sidebarWidthPx}px`,
            fontFamily: theme.fonts.body,
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
            visibility: 'hidden',
          }}
          aria-hidden="true"
        >
          {sidebarSections.map((child, index) => {
            const sectionId = (child.props as Record<string, unknown>)?.['data-section'] as string || `sidebar-section-${index}`
            return (
              <div key={`sm-${sectionId}`} data-section-measure={sectionId} className="overflow-hidden">
                {child}
              </div>
            )
          })}
        </div>
      )}

      {/* Visible pages with scaling */}
      <div className="flex flex-col items-center gap-8">
        {hasMeasured && pages.length > 0 ? (
          pages.map((pageContent, pageIndex) => {
            const isLastPage = pageIndex === pages.length - 1
            const isFirstPage = pageIndex === 0
            const hasSidebar = sidebarSections && sidebarSections.length > 0
            const actualSidebarWidth = sidebarStyleConfig.width || sidebarWidth

            const isFullBleed = sidebarStyleConfig.fullBleed && hasSidebar
            const P = A4_PADDING_PX

            // When fullBleed: main content handles its own padding (no CVPage padding)
            // Sidebar-facing side has no padding since the gap provides separation
            const mainContentEl = (
              <div style={{
                flex: 1,
                ...(isFullBleed ? {
                  padding: sidebarPosition === 'left'
                    ? `${P}px ${P}px ${P}px 0`
                    : `${P}px 0 ${P}px ${P}px`,
                  display: 'flex',
                  flexDirection: 'column' as const,
                } : {}),
              }}>
                <div style={isFullBleed ? { flex: 1 } : undefined}>
                  {pageContent.main.map((section) => (
                    <div key={section.id} className="overflow-hidden">
                      {section.element}
                    </div>
                  ))}
                </div>
                {isFullBleed && isLastPage && footerChild && (
                  <div className="shrink-0 mt-auto">
                    {footerChild}
                  </div>
                )}
              </div>
            )

            // Sidebar container style
            const sidebarContainerStyle: React.CSSProperties = (() => {
              if (isFullBleed) {
                // fullBleed: CVPage has no padding, so sidebar fills full page height naturally
                const bg = getSidebarBackground(sidebarStyleConfig.background, theme.colors.primary, theme.colors.accent)
                const textColor = getSidebarTextColor(sidebarStyleConfig.background, theme.colors.primary, theme.colors.text)
                const isGradient = sidebarStyleConfig.background === 'gradient'
                // Padding: 48px on outer edge + top + bottom, smaller on inner edge (gap provides separation)
                const padding = sidebarPosition === 'left'
                  ? `${P}px 0 ${P}px ${P}px`
                  : `${P}px ${P}px ${P}px 0`
                return {
                  width: `${actualSidebarWidth}%`,
                  flexShrink: 0,
                  padding,
                  background: isGradient ? bg : undefined,
                  backgroundColor: !isGradient ? bg : undefined,
                  color: textColor,
                }
              }
              return { width: `${actualSidebarWidth}%`, flexShrink: 0 }
            })()

            const sidebarEl = (
              <div className="h-full" style={sidebarContainerStyle}>
                {pageContent.sidebar.length > 0
                  ? renderSidebarForPage(pageContent.sidebar, isFirstPage)
                  : <div className="p-4 h-full" style={getEmptySidebarStyle()} />
                }
              </div>
            )

            const pageEl = hasSidebar ? (
              <div className="flex h-full" style={{ gap: `${SIDEBAR_GAP_PX}px` }}>
                {sidebarPosition === 'left' && sidebarEl}
                {mainContentEl}
                {sidebarPosition === 'right' && sidebarEl}
              </div>
            ) : (
              mainContentEl
            )

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
                    footer={isLastPage && !isFullBleed ? footerChild : undefined}
                    fullBleedSidebar={isFullBleed ? sidebarPosition : undefined}
                  >
                    {pageEl}
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
              <CVPage
                theme={theme}
                pageNumber={1}
                totalPages={1}
                fullBleedSidebar={sidebarStyleConfig.fullBleed ? sidebarPosition : undefined}
              >
                {sidebarSections && sidebarSections.length > 0 ? (
                  <div className="flex h-full" style={{ gap: `${SIDEBAR_GAP_PX}px` }}>
                    {sidebarPosition === 'left' && (
                      <div
                        className="h-full"
                        style={{ width: `${sidebarStyleConfig.width || sidebarWidth}%`, flexShrink: 0 }}
                      >
                        <div
                          className="p-4 h-full"
                          style={getEmptySidebarStyle()}
                        >
                          {sidebarSections}
                        </div>
                      </div>
                    )}
                    <div style={{ flex: 1 }}>{children}</div>
                    {sidebarPosition === 'right' && (
                      <div
                        className="h-full"
                        style={{ width: `${sidebarStyleConfig.width || sidebarWidth}%`, flexShrink: 0 }}
                      >
                        <div
                          className="p-4 h-full"
                          style={getEmptySidebarStyle()}
                        >
                          {sidebarSections}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  children
                )}
              </CVPage>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

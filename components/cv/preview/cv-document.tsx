'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { CVData, CVSectionType, CVTheme } from '@/lib/types/cv'
import { defaultSectionOrder } from '@/lib/types/cv'
import CVHeader from './header'
import WorkSection from './work-section'
import EducationSection from './education-section'
import SkillsSection from './skills-section'
import LanguagesSection from './languages-section'
import FooterSection from './footer-section'
import CVPaginator from './cv-paginator'
import CVPage, { A4_WIDTH_PX, A4_HEIGHT_PX } from './cv-page'
import HighlightWrapper from './highlight-wrapper'

interface CVDocumentProps {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
}

function SectionDivider({ style, color }: { style: CVTheme['sectionDivider']; color: string }) {
  switch (style) {
    case 'line':
      return <div className="border-b-2 mb-2 pb-1" style={{ borderColor: color }} />
    case 'dotted':
      return <div className="border-b-2 border-dotted mb-2 pb-1" style={{ borderColor: color }} />
    case 'accent-bar':
      return <div className="h-1 w-12 rounded mb-3" style={{ backgroundColor: color }} />
    case 'none':
    default:
      return null
  }
}

function SummarySection({ summary, theme }: { summary: string; theme: CVTheme }) {
  if (!summary) return null
  return (
    <HighlightWrapper sectionRef={{ type: 'summary' }}>
      <section className="mt-6">
        <h2
          className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
          }}
        >
          Professional Summary
        </h2>
        <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />
        <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
      </section>
    </HighlightWrapper>
  )
}

// Two-column layout content
function TwoColumnContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  return (
    <div className="flex gap-6" style={{ minHeight: '100%' }}>
      {/* Left Sidebar */}
      <div
        className="w-[30%] shrink-0 p-4 rounded-lg"
        style={{ backgroundColor: `${theme.colors.primary}10` }}
      >
        {/* Profile Image in sidebar if exists */}
        {cvData.personalInfo.profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={cvData.personalInfo.profileImage}
              alt={cvData.personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover border-2"
              style={{ borderColor: theme.colors.primary }}
            />
          </div>
        )}

        {/* Contact Info in sidebar */}
        <div className="mb-6">
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-2"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            Contact
          </h3>
          <div className="space-y-1.5 text-xs">
            {cvData.personalInfo.email && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.email}</p>
            )}
            {cvData.personalInfo.phone && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.phone}</p>
            )}
            {cvData.personalInfo.location && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.location}</p>
            )}
            {cvData.personalInfo.website && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.website}</p>
            )}
            {cvData.personalInfo.linkedIn && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.linkedIn}</p>
            )}
            {cvData.personalInfo.github && (
              <p style={{ color: theme.colors.text }}>{cvData.personalInfo.github}</p>
            )}
          </div>
        </div>

        {/* Skills in sidebar */}
        {cvData.skills.length > 0 && (
          <HighlightWrapper sectionRef={{ type: 'skills' }}>
            <SkillsSection skills={cvData.skills} theme={theme} compact />
          </HighlightWrapper>
        )}

        {/* Languages in sidebar */}
        {cvData.languages.length > 0 && (
          <HighlightWrapper sectionRef={{ type: 'languages' }}>
            <LanguagesSection languages={cvData.languages} theme={theme} compact />
          </HighlightWrapper>
        )}
      </div>

      {/* Right Main Content */}
      <div className="flex-1">
        {/* Name & Title */}
        <div className="mb-4">
          <h1
            className="text-2xl font-bold"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            {cvData.personalInfo.fullName}
          </h1>
        </div>

        {/* Summary */}
        {cvData.summary && (
          <HighlightWrapper sectionRef={{ type: 'summary' }}>
            <section className="mb-4">
              <h2
                className="text-lg font-bold uppercase tracking-wide mb-2"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
              >
                Professional Summary
              </h2>
              <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{cvData.summary}</p>
            </section>
          </HighlightWrapper>
        )}

        {/* Work Experience */}
        {cvData.workExperience.length > 0 && (
          <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
            <WorkSection experiences={cvData.workExperience} theme={theme} />
          </HighlightWrapper>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <HighlightWrapper sectionRef={{ type: 'education' }}>
            <EducationSection education={cvData.education} theme={theme} />
          </HighlightWrapper>
        )}

        {/* Footer */}
        {cvData.footer?.rodoConsent && (
          <FooterSection footer={cvData.footer} theme={theme} />
        )}
      </div>
    </div>
  )
}

// Scaled wrapper for two-column layout
function ScaledView({
  theme,
  children,
}: {
  theme: CVTheme
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const updateScale = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.offsetWidth
    const targetWidth = containerWidth - 32 // 16px padding on each side
    const newScale = Math.min(1, targetWidth / A4_WIDTH_PX)
    setScale(newScale)
  }, [])

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
    <div
      ref={containerRef}
      className="cv-preview w-full"
      style={{
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
      }}
    >
      <div className="flex justify-center">
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
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CVDocument({ cvData }: CVDocumentProps) {
  const { theme } = cvData
  const sectionOrder = cvData.sectionOrder ?? defaultSectionOrder

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--cv-primary', theme.colors.primary)
    root.style.setProperty('--cv-accent', theme.colors.accent)
    root.style.setProperty('--cv-text', theme.colors.text)
    root.style.setProperty('--cv-background', theme.colors.background)
  }, [theme])

  const renderSectionContent = (section: CVSectionType) => {
    switch (section) {
      case 'summary':
        return cvData.summary ? <SummarySection summary={cvData.summary} theme={theme} /> : null
      case 'workExperience':
        return cvData.workExperience.length > 0 ? (
          <WorkSection experiences={cvData.workExperience} theme={theme} />
        ) : null
      case 'education':
        return cvData.education.length > 0 ? (
          <EducationSection education={cvData.education} theme={theme} />
        ) : null
      case 'skills':
        return cvData.skills.length > 0 ? (
          <SkillsSection skills={cvData.skills} theme={theme} />
        ) : null
      case 'languages':
        return cvData.languages.length > 0 ? (
          <LanguagesSection languages={cvData.languages} theme={theme} />
        ) : null
      default:
        return null
    }
  }

  // Two-column layout (scaled to fit, no pagination)
  if (theme.layout === 'two-column') {
    return (
      <ScaledView theme={theme}>
        <CVPage theme={theme} pageNumber={1} totalPages={1}>
          <TwoColumnContent cvData={cvData} theme={theme} />
        </CVPage>
      </ScaledView>
    )
  }

  // Standard single-column paginated view
  return (
    <div
      className="cv-preview"
      style={{
        fontFamily: theme.fonts.body,
        color: theme.colors.text,
      }}
    >
      <CVPaginator theme={theme}>
        {/* Header - can't break from first content */}
        <div data-section="header" data-can-break={false}>
          <CVHeader
            personalInfo={cvData.personalInfo}
            theme={theme}
          />
        </div>

        {/* Sections - can break between them */}
        {sectionOrder.map((section) => {
          const content = renderSectionContent(section)
          if (!content) return null
          return (
            <div key={section} data-section={section} data-can-break={true}>
              {content}
            </div>
          )
        })}

        {/* Footer */}
        {cvData.footer?.rodoConsent && (
          <div data-section="footer" data-can-break={true}>
            <FooterSection footer={cvData.footer} theme={theme} />
          </div>
        )}
      </CVPaginator>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import type { CVData, CVSectionType, CVTheme, CVLayout, SummaryStyle } from '@/lib/types/cv'
import { defaultSectionOrder } from '@/lib/types/cv'
import CVHeader from './header'
import WorkSection from './work-section'
import EducationSection from './education-section'
import SkillsSection from './skills-section'
import LanguagesSection from './languages-section'
import FooterSection from './footer-section'
import CVPaginator from './cv-paginator'
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

  const summaryStyle: SummaryStyle = theme.summaryStyle || 'plain'

  const renderSummary = () => {
    switch (summaryStyle) {
      case 'boxed':
        return (
          <div
            className="p-4 rounded-lg border"
            style={{
              borderColor: `${theme.colors.primary}30`,
              backgroundColor: `${theme.colors.primary}05`,
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
          </div>
        )
      case 'quoted':
        return (
          <div className="border-l-4 pl-4" style={{ borderColor: theme.colors.accent }}>
            <p className="text-sm leading-relaxed italic" style={{ color: theme.colors.text }}>"{summary}"</p>
          </div>
        )
      case 'highlighted':
        return (
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${theme.colors.primary}10` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
          </div>
        )
      case 'sidebar':
        return (
          <div className="flex gap-3">
            <div className="w-1 rounded" style={{ backgroundColor: theme.colors.primary }} />
            <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
          </div>
        )
      case 'plain':
      default:
        return <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
    }
  }

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
        {renderSummary()}
      </section>
    </HighlightWrapper>
  )
}

// Sidebar header styles for two-column layouts
function SidebarHeaderContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  const headerStyle = theme.headerStyle || 'sidebar-header'

  switch (headerStyle) {
    case 'compact-sidebar':
      // Minimal header - just name, no photo
      return (
        <>
          <h1
            className="text-lg font-bold mb-2"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            {cvData.personalInfo.fullName}
          </h1>
          <div className="h-0.5 w-10 mb-4" style={{ backgroundColor: theme.colors.accent }} />
        </>
      )
    case 'split-header':
      // Photo prominently displayed
      return (
        <>
          {cvData.personalInfo.profileImage && (
            <div className="flex justify-center mb-4">
              <img
                src={cvData.personalInfo.profileImage}
                alt={cvData.personalInfo.fullName}
                className="w-28 h-28 rounded-lg object-cover border-2"
                style={{ borderColor: theme.colors.primary }}
              />
            </div>
          )}
        </>
      )
    case 'banner-overlay':
      // Gradient banner style in sidebar
      return (
        <div
          className="p-4 -mx-4 mb-4 rounded-lg"
          style={{ background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` }}
        >
          {cvData.personalInfo.profileImage && (
            <div className="flex justify-center mb-3">
              <img
                src={cvData.personalInfo.profileImage}
                alt={cvData.personalInfo.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-white/50"
              />
            </div>
          )}
          <h1
            className="text-lg font-bold text-white text-center"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {cvData.personalInfo.fullName}
          </h1>
        </div>
      )
    case 'sidebar-header':
    default:
      // Default sidebar header - photo and name
      return (
        <>
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
          <h1
            className="text-lg font-bold text-center mb-4"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            {cvData.personalInfo.fullName}
          </h1>
        </>
      )
  }
}

// Sidebar summary styles for two-column layouts
function SidebarSummaryContent({
  summary,
  theme,
}: {
  summary: string
  theme: CVTheme
}) {
  if (!summary) return null

  const summaryStyle = theme.summaryStyle || 'sidebar-summary'

  switch (summaryStyle) {
    case 'boxed-sidebar':
      return (
        <div
          className="p-3 rounded-lg border mb-4"
          style={{
            borderColor: `${theme.colors.primary}30`,
            backgroundColor: `${theme.colors.primary}05`,
          }}
        >
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-2"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            About
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
        </div>
      )
    case 'sidebar-summary':
      return (
        <div className="mb-4">
          <h3
            className="text-sm font-bold uppercase tracking-wide mb-2"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            About
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
        </div>
      )
    default:
      // For main-summary and split-summary, don't render in sidebar
      return null
  }
}

// Helper function for sidebar layouts - returns array of data-section elements for sidebar pagination
function getSidebarSections(
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  theme: CVTheme
): React.ReactElement[] {
  const sections: React.ReactElement[] = []
  const summaryStyle = theme.summaryStyle || 'sidebar-summary'
  const showSummaryInSidebar = summaryStyle === 'sidebar-summary' || summaryStyle === 'boxed-sidebar'

  // Header + Contact Info (grouped together, shouldn't break)
  sections.push(
    <div key="sidebar-contact" data-section="sidebar-contact" data-can-break={false}>
      <SidebarHeaderContent cvData={cvData} theme={theme} />
      <div className="mb-6">
        <h3
          className="text-sm font-bold uppercase tracking-wide mb-2"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          Contact
        </h3>
        <div className="space-y-1.5 text-xs break-words" style={{ color: theme.colors.text, overflowWrap: 'anywhere' }}>
          {cvData.personalInfo.email && <p className="break-all">{cvData.personalInfo.email}</p>}
          {cvData.personalInfo.phone && <p>{cvData.personalInfo.phone}</p>}
          {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
          {cvData.personalInfo.website && <p className="break-all">{cvData.personalInfo.website}</p>}
          {cvData.personalInfo.linkedIn && <p className="break-all">{cvData.personalInfo.linkedIn}</p>}
          {cvData.personalInfo.github && <p className="break-all">{cvData.personalInfo.github}</p>}
        </div>
      </div>
    </div>
  )

  // Summary in sidebar (if applicable)
  if (cvData.summary && showSummaryInSidebar) {
    sections.push(
      <div key="sidebar-summary" data-section="sidebar-summary" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'summary' }}>
          <SidebarSummaryContent summary={cvData.summary} theme={theme} />
        </HighlightWrapper>
      </div>
    )
  }

  // Skills
  if (cvData.skills.length > 0) {
    sections.push(
      <div key="sidebar-skills" data-section="sidebar-skills" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'skills' }}>
          <SkillsSection skills={cvData.skills} theme={theme} compact />
        </HighlightWrapper>
      </div>
    )
  }

  // Languages
  if (cvData.languages.length > 0) {
    sections.push(
      <div key="sidebar-languages" data-section="sidebar-languages" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'languages' }}>
          <LanguagesSection languages={cvData.languages} theme={theme} compact />
        </HighlightWrapper>
      </div>
    )
  }

  return sections
}

// Main content header for split-header style (text in main area)
function MainHeaderContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  const headerStyle = theme.headerStyle || 'sidebar-header'

  // Only show name in main for split-header (photo is in sidebar, name goes here)
  // Other styles already show the name in the sidebar
  if (headerStyle !== 'split-header') {
    return null
  }

  return (
    <div className="mb-4">
      <h1
        className="text-2xl font-bold mb-1"
        style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
      >
        {cvData.personalInfo.fullName}
      </h1>
      <div className="h-0.5 w-16 mb-2" style={{ backgroundColor: theme.colors.accent }} />
    </div>
  )
}

// Main content summary for main-summary and split-summary styles
function MainSummaryContent({
  summary,
  theme,
}: {
  summary: string
  theme: CVTheme
}) {
  if (!summary) return null

  const summaryStyle = theme.summaryStyle || 'main-summary'

  switch (summaryStyle) {
    case 'split-summary':
      return (
        <section className="mb-4">
          <div className="flex gap-3">
            <div className="w-1 rounded" style={{ backgroundColor: theme.colors.primary }} />
            <div>
              <h2
                className="text-lg font-bold uppercase tracking-wide mb-2"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
              >
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
            </div>
          </div>
        </section>
      )
    case 'main-summary':
    default:
      return (
        <section className="mb-4">
          <h2
            className="text-lg font-bold uppercase tracking-wide mb-2"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>{summary}</p>
        </section>
      )
  }
}

// Helper function for sidebar layouts - returns array of data-section elements for pagination
function getSidebarMainSections(
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  theme: CVTheme
): React.ReactElement[] {
  const sections: React.ReactElement[] = []
  const summaryStyle = theme.summaryStyle || 'main-summary'
  const showSummaryInMain = summaryStyle === 'main-summary' || summaryStyle === 'split-summary'

  // Header - Name (skip if banner-overlay since name is in sidebar)
  const headerStyle = theme.headerStyle || 'sidebar-header'
  if (headerStyle !== 'banner-overlay') {
    sections.push(
      <div key="header" data-section="header" data-can-break={false}>
        <HighlightWrapper sectionRef={{ type: 'personalInfo' }}>
          <MainHeaderContent cvData={cvData} theme={theme} />
        </HighlightWrapper>
      </div>
    )
  }

  // Summary in main content (if applicable)
  if (cvData.summary && showSummaryInMain) {
    sections.push(
      <div key="summary" data-section="summary" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'summary' }}>
          <MainSummaryContent summary={cvData.summary} theme={theme} />
        </HighlightWrapper>
      </div>
    )
  }

  // Work Experience
  if (cvData.workExperience.length > 0) {
    sections.push(
      <div key="workExperience" data-section="workExperience" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
          <WorkSection experiences={cvData.workExperience} theme={theme} />
        </HighlightWrapper>
      </div>
    )
  }

  // Education
  if (cvData.education.length > 0) {
    sections.push(
      <div key="education" data-section="education" data-can-break={true}>
        <HighlightWrapper sectionRef={{ type: 'education' }}>
          <EducationSection education={cvData.education} theme={theme} />
        </HighlightWrapper>
      </div>
    )
  }

  // Footer
  if (cvData.footer?.rodoConsent) {
    sections.push(
      <div key="footer" data-section="footer" data-can-break={true}>
        <FooterSection footer={cvData.footer} theme={theme} />
      </div>
    )
  }

  return sections
}

// Top Banner layout content (outputs data-section markers for pagination)
function TopBannerContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  return (
    <>
      {/* Banner Header */}
      <div data-section="header" data-can-break={false}>
        <CVHeader personalInfo={cvData.personalInfo} theme={{ ...theme, headerStyle: 'banner' }} />
      </div>

      {/* Summary */}
      {cvData.summary && (
        <div data-section="summary" data-can-break={true}>
          <SummarySection summary={cvData.summary} theme={theme} />
        </div>
      )}

      {/* Work Experience */}
      {cvData.workExperience.length > 0 && (
        <div data-section="workExperience" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
            <WorkSection experiences={cvData.workExperience} theme={theme} />
          </HighlightWrapper>
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div data-section="education" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'education' }}>
            <EducationSection education={cvData.education} theme={theme} />
          </HighlightWrapper>
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div data-section="skills" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'skills' }}>
            <SkillsSection skills={cvData.skills} theme={theme} />
          </HighlightWrapper>
        </div>
      )}

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <div data-section="languages" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'languages' }}>
            <LanguagesSection languages={cvData.languages} theme={theme} />
          </HighlightWrapper>
        </div>
      )}

      {/* Footer */}
      {cvData.footer?.rodoConsent && (
        <div data-section="footer" data-can-break={true}>
          <FooterSection footer={cvData.footer} theme={theme} />
        </div>
      )}
    </>
  )
}

// Timeline layout content (outputs data-section markers for pagination)
function TimelineContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  // Force timeline style for experience
  const timelineTheme = { ...theme, experienceStyle: 'timeline' as const }

  return (
    <>
      <div data-section="header" data-can-break={false}>
        <CVHeader personalInfo={cvData.personalInfo} theme={theme} />
      </div>
      {cvData.summary && (
        <div data-section="summary" data-can-break={true}>
          <SummarySection summary={cvData.summary} theme={theme} />
        </div>
      )}
      {cvData.workExperience.length > 0 && (
        <div data-section="workExperience" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
            <WorkSection experiences={cvData.workExperience} theme={timelineTheme} />
          </HighlightWrapper>
        </div>
      )}
      {cvData.education.length > 0 && (
        <div data-section="education" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'education' }}>
            <EducationSection education={cvData.education} theme={theme} />
          </HighlightWrapper>
        </div>
      )}
      {cvData.skills.length > 0 && (
        <div data-section="skills" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'skills' }}>
            <SkillsSection skills={cvData.skills} theme={theme} />
          </HighlightWrapper>
        </div>
      )}
      {cvData.languages.length > 0 && (
        <div data-section="languages" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'languages' }}>
            <LanguagesSection languages={cvData.languages} theme={theme} />
          </HighlightWrapper>
        </div>
      )}
      {cvData.footer?.rodoConsent && (
        <div data-section="footer" data-can-break={true}>
          <FooterSection footer={cvData.footer} theme={theme} />
        </div>
      )}
    </>
  )
}

// Compact layout content (outputs data-section markers for pagination)
function CompactContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  // Force compact styles
  const compactTheme = {
    ...theme,
    headerStyle: 'compact' as const,
    experienceStyle: 'compact' as const,
    educationStyle: 'compact' as const,
    spacing: 'compact' as const,
  }

  return (
    <div className="text-sm">
      <div data-section="header" data-can-break={false}>
        <CVHeader personalInfo={cvData.personalInfo} theme={compactTheme} />
      </div>
      {cvData.summary && (
        <div data-section="summary" data-can-break={true}>
          <section className="mt-2">
            <p className="text-xs leading-relaxed" style={{ color: theme.colors.text }}>{cvData.summary}</p>
          </section>
        </div>
      )}
      {cvData.workExperience.length > 0 && (
        <div data-section="workExperience" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
            <WorkSection experiences={cvData.workExperience} theme={compactTheme} />
          </HighlightWrapper>
        </div>
      )}
      {cvData.education.length > 0 && (
        <div data-section="education" data-can-break={true}>
          <HighlightWrapper sectionRef={{ type: 'education' }}>
            <EducationSection education={cvData.education} theme={compactTheme} />
          </HighlightWrapper>
        </div>
      )}
      <div data-section="skills-languages" data-can-break={true}>
        <div className="flex gap-6 mt-4">
          <div className="flex-1">
            {cvData.skills.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'skills' }}>
                <SkillsSection skills={cvData.skills} theme={compactTheme} />
              </HighlightWrapper>
            )}
          </div>
          <div className="flex-1">
            {cvData.languages.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'languages' }}>
                <LanguagesSection languages={cvData.languages} theme={compactTheme} />
              </HighlightWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Magazine layout content (outputs data-section markers for pagination)
function MagazineContent({
  cvData,
  theme,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  theme: CVTheme
}) {
  return (
    <>
      <div data-section="header" data-can-break={false}>
        <CVHeader personalInfo={cvData.personalInfo} theme={theme} />
      </div>

      {cvData.summary && (
        <div data-section="summary" data-can-break={true}>
          <div className="mt-4 mb-4">
            <SummarySection summary={cvData.summary} theme={theme} />
          </div>
        </div>
      )}

      <div data-section="main-content" data-can-break={true}>
        <div className="grid grid-cols-2 gap-6">
          {/* Left column */}
          <div>
            {cvData.workExperience.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'workExperience' }}>
                <WorkSection experiences={cvData.workExperience} theme={theme} />
              </HighlightWrapper>
            )}
          </div>

          {/* Right column */}
          <div>
            {cvData.education.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'education' }}>
                <EducationSection education={cvData.education} theme={theme} />
              </HighlightWrapper>
            )}
            {cvData.skills.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'skills' }}>
                <SkillsSection skills={cvData.skills} theme={theme} />
              </HighlightWrapper>
            )}
            {cvData.languages.length > 0 && (
              <HighlightWrapper sectionRef={{ type: 'languages' }}>
                <LanguagesSection languages={cvData.languages} theme={theme} />
              </HighlightWrapper>
            )}
          </div>
        </div>
      </div>

      {cvData.footer?.rodoConsent && (
        <div data-section="footer" data-can-break={true}>
          <FooterSection footer={cvData.footer} theme={theme} />
        </div>
      )}
    </>
  )
}

export default function CVDocument({ cvData }: CVDocumentProps) {
  const { theme } = cvData
  const sectionOrder = cvData.sectionOrder ?? defaultSectionOrder
  const layout: CVLayout = theme.layout || 'classic'

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

  // Sidebar layouts (two-column, sidebar-left, sidebar-right) - use CVPaginator with sidebar
  if (layout === 'two-column' || layout === 'sidebar-left') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator
          theme={theme}
          sidebarSections={getSidebarSections(cvData, theme)}
          sidebarPosition="left"
          sidebarWidth={30}
        >
          {getSidebarMainSections(cvData, theme)}
        </CVPaginator>
      </div>
    )
  }

  if (layout === 'sidebar-right') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator
          theme={theme}
          sidebarSections={getSidebarSections(cvData, theme)}
          sidebarPosition="right"
          sidebarWidth={30}
        >
          {getSidebarMainSections(cvData, theme)}
        </CVPaginator>
      </div>
    )
  }

  // Other special layouts - use CVPaginator for multi-page support
  if (layout === 'top-banner') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator theme={theme}>
          <TopBannerContent cvData={cvData} theme={theme} />
        </CVPaginator>
      </div>
    )
  }

  if (layout === 'timeline') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator theme={theme}>
          <TimelineContent cvData={cvData} theme={theme} />
        </CVPaginator>
      </div>
    )
  }

  if (layout === 'compact') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator theme={theme}>
          <CompactContent cvData={cvData} theme={theme} />
        </CVPaginator>
      </div>
    )
  }

  if (layout === 'magazine') {
    return (
      <div
        className="cv-preview"
        style={{
          fontFamily: theme.fonts.body,
          color: theme.colors.text,
        }}
      >
        <CVPaginator theme={theme}>
          <MagazineContent cvData={cvData} theme={theme} />
        </CVPaginator>
      </div>
    )
  }

  // Standard single-column paginated view (classic, modern, minimal, etc.)
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

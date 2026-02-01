import type { Education, CVTheme, EducationStyle, DateFormat } from '@/lib/types/cv'
import { format } from 'date-fns'
import HighlightWrapper from './highlight-wrapper'

interface EducationSectionProps {
  education: Education[]
  theme: CVTheme
}

function SectionDivider({ style, color }: { style: CVTheme['sectionDivider']; color: string }) {
  switch (style) {
    case 'line':
      return <div className="border-b-2 mb-3 pb-1" style={{ borderColor: color }} />
    case 'dotted':
      return <div className="border-b-2 border-dotted mb-3 pb-1" style={{ borderColor: color }} />
    case 'accent-bar':
      return <div className="h-1 w-12 rounded mb-3" style={{ backgroundColor: color }} />
    case 'none':
    default:
      return null
  }
}

function formatDateWithFormat(date: string, current: boolean, dateFormat: DateFormat = 'short'): string {
  if (current) return 'Present'
  if (!date) return ''
  try {
    const d = new Date(date)
    switch (dateFormat) {
      case 'full':
        return format(d, 'MMMM yyyy')
      case 'short':
        return format(d, 'MMM yyyy')
      case 'numeric':
        return format(d, 'MM/yyyy')
      case 'year-only':
        return format(d, 'yyyy')
      default:
        return format(d, 'MMM yyyy')
    }
  } catch {
    return date
  }
}

// Classic education style
function ClassicEducation({ edu, theme, formatDate }: { edu: Education; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-sm" style={{ color: theme.colors.text }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold" style={{ color: theme.colors.primary }}>
            {edu.degree} in {edu.field}
          </h3>
          <p>{edu.institution}</p>
          {edu.gpa && <p className="text-xs" style={{ opacity: 0.85 }}>GPA: {edu.gpa}</p>}
        </div>
        <p className="text-xs" style={{ opacity: 0.85 }}>
          {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
        </p>
      </div>

      {edu.description && (
        <p className="leading-relaxed mt-1">{edu.description}</p>
      )}
    </div>
  )
}

// Cards education style
function CardsEducation({ edu, theme, formatDate }: { edu: Education; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div
      className="p-4 rounded-lg border text-sm"
      style={{
        borderColor: `${theme.colors.primary}20`,
        backgroundColor: `${theme.colors.primary}05`,
        color: theme.colors.text,
      }}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold" style={{ color: theme.colors.primary }}>
          {edu.degree} in {edu.field}
        </h3>
        <p className="text-xs font-medium" style={{ color: theme.colors.accent }}>
          {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
        </p>
      </div>
      <p className="text-xs" style={{ opacity: 0.85 }}>{edu.institution}</p>
      {edu.gpa && (
        <p className="text-xs mt-1" style={{ opacity: 0.85 }}>
          <span className="font-medium">GPA:</span> {edu.gpa}
        </p>
      )}
      {edu.description && (
        <p className="text-xs leading-relaxed mt-2">{edu.description}</p>
      )}
    </div>
  )
}

// Compact education style
function CompactEducation({ edu, theme, formatDate }: { edu: Education; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-xs" style={{ color: theme.colors.text }}>
      <div className="flex justify-between items-baseline gap-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <h3 className="font-bold shrink-0" style={{ color: theme.colors.primary }}>
            {edu.degree}
          </h3>
          <span style={{ opacity: 0.6 }}>in</span>
          <span className="truncate">{edu.field}</span>
          <span style={{ opacity: 0.6 }}>·</span>
          <span className="truncate">{edu.institution}</span>
          {edu.gpa && (
            <>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>GPA: {edu.gpa}</span>
            </>
          )}
        </div>
        <p className="shrink-0" style={{ opacity: 0.85 }}>
          {formatDate(edu.endDate, edu.current)}
        </p>
      </div>
    </div>
  )
}

// Academic education style (detailed, scholarly format)
function AcademicEducation({ edu, theme, formatDate }: { edu: Education; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-sm" style={{ color: theme.colors.text }}>
      {/* Header with institution emphasis */}
      <div className="mb-1">
        <h3 className="font-bold" style={{ color: theme.colors.primary }}>
          {edu.institution}
        </h3>
        <div className="flex items-center justify-between">
          <p className="italic">{edu.degree} in {edu.field}</p>
          <p className="text-xs" style={{ opacity: 0.85 }}>
            {formatDate(edu.startDate, false)} - {formatDate(edu.endDate, edu.current)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ opacity: 0.85 }}>
        {edu.gpa && (
          <div>
            <span className="font-medium">Cumulative GPA:</span> {edu.gpa}
          </div>
        )}
      </div>

      {edu.description && (
        <div className="mt-2 text-xs">
          <p className="font-medium mb-1" style={{ color: theme.colors.accent }}>Relevant Coursework & Activities:</p>
          <p className="leading-relaxed">{edu.description}</p>
        </div>
      )}
    </div>
  )
}

export default function EducationSection({ education, theme }: EducationSectionProps) {
  const educationStyle: EducationStyle = theme.educationStyle || 'classic'
  const dateFormat = theme.dateFormat || 'short'

  const formatDate = (date: string, current: boolean) => formatDateWithFormat(date, current, dateFormat)

  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact':
        return 'space-y-2'
      case 'relaxed':
        return 'space-y-5'
      default:
        return 'space-y-3'
    }
  }

  const renderEducation = (edu: Education) => {
    switch (educationStyle) {
      case 'cards':
        return <CardsEducation edu={edu} theme={theme} formatDate={formatDate} />
      case 'compact':
        return <CompactEducation edu={edu} theme={theme} formatDate={formatDate} />
      case 'academic':
        return <AcademicEducation edu={edu} theme={theme} formatDate={formatDate} />
      case 'classic':
      default:
        return <ClassicEducation edu={edu} theme={theme} formatDate={formatDate} />
    }
  }

  return (
    <section className="mt-6">
      <h2
        className="text-lg font-bold uppercase tracking-wide mb-2"
        style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
        }}
      >
        Education
      </h2>
      <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />

      <div className={getSpacing()}>
        {education.map((edu) => (
          <HighlightWrapper key={edu.id} sectionRef={{ type: 'education', id: edu.id }}>
            {renderEducation(edu)}
          </HighlightWrapper>
        ))}
      </div>
    </section>
  )
}

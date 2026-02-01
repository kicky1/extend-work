import type { WorkExperience, CVTheme, ExperienceStyle, DateFormat } from '@/lib/types/cv'
import { format } from 'date-fns'
import HighlightWrapper from './highlight-wrapper'

interface WorkSectionProps {
  experiences: WorkExperience[]
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

const bulletSymbols: Record<CVTheme['bulletStyle'], string> = {
  disc: '•',
  circle: '○',
  square: '▪',
  dash: '–',
  arrow: '→',
}

interface BulletListProps {
  items: string[]
  bulletStyle: CVTheme['bulletStyle']
  textColor?: string
}

function BulletList({ items, bulletStyle, textColor }: BulletListProps) {
  const bullet = bulletSymbols[bulletStyle] || '•'

  return (
    <ul className="space-y-1" style={{ color: textColor }}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="shrink-0 mt-0.5">{bullet}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
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

// Classic experience style
function ClassicExperience({ exp, theme, formatDate }: { exp: WorkExperience; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-sm" style={{ color: theme.colors.text }}>
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-bold" style={{ color: theme.colors.primary }}>
            {exp.position}
          </h3>
          <p>{exp.company}</p>
        </div>
        <div className="text-right text-xs" style={{ opacity: 0.85 }}>
          <p>{exp.location}</p>
          <p>
            {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
          </p>
        </div>
      </div>

      {exp.description && (
        <p className="leading-relaxed mb-2">{exp.description}</p>
      )}

      {exp.achievements && exp.achievements.length > 0 && (
        <BulletList items={exp.achievements} bulletStyle={theme.bulletStyle} textColor={theme.colors.text} />
      )}
    </div>
  )
}

// Timeline experience style
function TimelineExperience({ exp, theme, formatDate, isLast }: { exp: WorkExperience; theme: CVTheme; formatDate: (date: string, current: boolean) => string; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2 shrink-0"
          style={{ borderColor: theme.colors.primary, backgroundColor: exp.current ? theme.colors.primary : 'transparent' }}
        />
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[40px]" style={{ backgroundColor: `${theme.colors.primary}30` }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4 text-sm" style={{ color: theme.colors.text }}>
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-bold" style={{ color: theme.colors.primary }}>
              {exp.position}
            </h3>
            <p className="text-xs" style={{ opacity: 0.85 }}>{exp.company} · {exp.location}</p>
          </div>
          <p className="text-xs shrink-0" style={{ opacity: 0.85 }}>
            {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
          </p>
        </div>

        {exp.description && (
          <p className="leading-relaxed mb-2 text-xs">{exp.description}</p>
        )}

        {exp.achievements && exp.achievements.length > 0 && (
          <div className="text-xs">
            <BulletList items={exp.achievements} bulletStyle={theme.bulletStyle} textColor={theme.colors.text} />
          </div>
        )}
      </div>
    </div>
  )
}

// Cards experience style
function CardsExperience({ exp, theme, formatDate }: { exp: WorkExperience; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div
      className="p-4 rounded-lg border text-sm"
      style={{
        borderColor: `${theme.colors.primary}20`,
        backgroundColor: `${theme.colors.primary}05`,
        color: theme.colors.text,
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold" style={{ color: theme.colors.primary }}>
            {exp.position}
          </h3>
          <p className="text-xs" style={{ opacity: 0.85 }}>{exp.company}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium" style={{ color: theme.colors.accent }}>
            {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
          </p>
          <p className="text-xs" style={{ opacity: 0.85 }}>{exp.location}</p>
        </div>
      </div>

      {exp.description && (
        <p className="leading-relaxed mb-2 text-xs">{exp.description}</p>
      )}

      {exp.achievements && exp.achievements.length > 0 && (
        <div className="text-xs">
          <BulletList items={exp.achievements} bulletStyle={theme.bulletStyle} textColor={theme.colors.text} />
        </div>
      )}
    </div>
  )
}

// Compact experience style
function CompactExperience({ exp, theme, formatDate }: { exp: WorkExperience; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-xs" style={{ color: theme.colors.text }}>
      <div className="flex justify-between items-baseline gap-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <h3 className="font-bold shrink-0" style={{ color: theme.colors.primary }}>
            {exp.position}
          </h3>
          <span className="text-xs" style={{ opacity: 0.6 }}>at</span>
          <span className="truncate">{exp.company}</span>
        </div>
        <p className="shrink-0" style={{ opacity: 0.85 }}>
          {formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}
        </p>
      </div>

      {exp.achievements && exp.achievements.length > 0 && (
        <p className="mt-1" style={{ opacity: 0.85 }}>
          {exp.achievements.slice(0, 2).join(' • ')}
        </p>
      )}
    </div>
  )
}

// Detailed experience style
function DetailedExperience({ exp, theme, formatDate }: { exp: WorkExperience; theme: CVTheme; formatDate: (date: string, current: boolean) => string }) {
  return (
    <div className="text-sm" style={{ color: theme.colors.text }}>
      {/* Header with accent bar */}
      <div className="border-l-4 pl-3 mb-2" style={{ borderColor: theme.colors.primary }}>
        <h3 className="font-bold text-base" style={{ color: theme.colors.primary }}>
          {exp.position}
        </h3>
        <div className="flex items-center gap-2 text-xs" style={{ opacity: 0.85 }}>
          <span className="font-medium">{exp.company}</span>
          <span>•</span>
          <span>{exp.location}</span>
          <span>•</span>
          <span>{formatDate(exp.startDate, false)} - {formatDate(exp.endDate, exp.current)}</span>
        </div>
      </div>

      {exp.description && (
        <p className="leading-relaxed mb-3 italic" style={{ opacity: 0.9 }}>{exp.description}</p>
      )}

      {exp.achievements && exp.achievements.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: theme.colors.accent }}>
            Key Achievements
          </p>
          <BulletList items={exp.achievements} bulletStyle={theme.bulletStyle} textColor={theme.colors.text} />
        </div>
      )}
    </div>
  )
}

export default function WorkSection({ experiences, theme }: WorkSectionProps) {
  const experienceStyle: ExperienceStyle = theme.experienceStyle || 'classic'
  const dateFormat = theme.dateFormat || 'short'

  const formatDate = (date: string, current: boolean) => formatDateWithFormat(date, current, dateFormat)

  const getSpacing = () => {
    switch (theme.spacing) {
      case 'compact':
        return 'space-y-2'
      case 'relaxed':
        return 'space-y-6'
      default:
        return 'space-y-4'
    }
  }

  const renderExperience = (exp: WorkExperience, index: number) => {
    const isLast = index === experiences.length - 1

    switch (experienceStyle) {
      case 'timeline':
        return <TimelineExperience exp={exp} theme={theme} formatDate={formatDate} isLast={isLast} />
      case 'cards':
        return <CardsExperience exp={exp} theme={theme} formatDate={formatDate} />
      case 'compact':
        return <CompactExperience exp={exp} theme={theme} formatDate={formatDate} />
      case 'detailed':
        return <DetailedExperience exp={exp} theme={theme} formatDate={formatDate} />
      case 'classic':
      default:
        return <ClassicExperience exp={exp} theme={theme} formatDate={formatDate} />
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
        Work Experience
      </h2>
      <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />

      <div className={getSpacing()}>
        {experiences.map((exp, index) => (
          <HighlightWrapper key={exp.id} sectionRef={{ type: 'workExperience', id: exp.id }}>
            {renderExperience(exp, index)}
          </HighlightWrapper>
        ))}
      </div>
    </section>
  )
}

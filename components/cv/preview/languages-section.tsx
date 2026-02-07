import type { Language, CVTheme } from '@/lib/types/cv'
import HighlightWrapper from './highlight-wrapper'

interface LanguagesSectionProps {
  languages: Language[]
  theme: CVTheme
  compact?: boolean
}

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert / Native',
}

const levelToPercent = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
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

function InlineStyle({ languages, theme }: { languages: Language[]; theme: CVTheme }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1" style={{ color: theme.colors.text }}>
      {languages.map((language) => (
        <div key={language.id} className="text-sm">
          <span className="font-medium">{language.name}</span>
          <span style={{ opacity: 0.8 }}> - {levelLabels[language.level]}</span>
        </div>
      ))}
    </div>
  )
}

function PillsStyle({ languages, theme }: { languages: Language[]; theme: CVTheme }) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <span
          key={language.id}
          className="px-3 py-1 text-xs rounded-full font-medium"
          style={{
            backgroundColor: `${theme.colors.primary}15`,
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}30`,
          }}
        >
          {language.name} ({levelLabels[language.level]})
        </span>
      ))}
    </div>
  )
}

function BarsStyle({ languages, theme }: { languages: Language[]; theme: CVTheme }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {languages.map((language) => (
        <div key={language.id} className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-700">{language.name}</span>
            <span className="text-xs text-gray-500">{levelLabels[language.level]}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${levelToPercent[language.level]}%`,
                backgroundColor: theme.colors.primary,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function GridStyle({ languages, theme }: { languages: Language[]; theme: CVTheme }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {languages.map((language) => (
        <div key={language.id} className="flex items-center gap-2 text-sm">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
          <span className="font-medium text-gray-700">{language.name}</span>
          <span className="text-gray-500 text-xs">({levelLabels[language.level]})</span>
        </div>
      ))}
    </div>
  )
}

function getSpacing(spacing?: string) {
  switch (spacing) {
    case 'compact': return 'mt-4'
    case 'relaxed': return 'mt-8'
    default: return 'mt-6'
  }
}

export default function LanguagesSection({ languages, theme, compact = false }: LanguagesSectionProps) {
  if (languages.length === 0) return null

  const languagesStyle = theme.languagesStyle || 'inline'

  const renderLanguages = () => {
    // In compact mode, use inline style for better fit
    if (compact) {
      return (
        <div className="space-y-1">
          {languages.map((language) => (
            <div key={language.id} className="text-xs">
              <span className="font-medium" style={{ color: theme.colors.text }}>{language.name}</span>
              <span className="text-gray-500"> - {levelLabels[language.level]}</span>
            </div>
          ))}
        </div>
      )
    }
    switch (languagesStyle) {
      case 'pills':
        return <PillsStyle languages={languages} theme={theme} />
      case 'bars':
        return <BarsStyle languages={languages} theme={theme} />
      case 'grid':
        return <GridStyle languages={languages} theme={theme} />
      case 'inline':
      default:
        return <InlineStyle languages={languages} theme={theme} />
    }
  }

  // Compact mode for two-column sidebar
  if (compact) {
    return (
      <section className="mb-4">
        <h3
          className="text-sm font-bold uppercase tracking-wide mb-2"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          Languages
        </h3>
        {renderLanguages()}
      </section>
    )
  }

  return (
    <HighlightWrapper sectionRef={{ type: 'languages' }}>
      <section className={getSpacing(theme.spacing)}>
        <h2
          className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
          }}
        >
          Languages
        </h2>
        <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />
        {renderLanguages()}
      </section>
    </HighlightWrapper>
  )
}

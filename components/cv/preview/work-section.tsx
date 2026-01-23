import type { WorkExperience, CVTheme } from '@/lib/types/cv'
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
}

function BulletList({ items, bulletStyle, textColor }: BulletListProps & { textColor?: string }) {
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

export default function WorkSection({ experiences, theme }: WorkSectionProps) {
  const formatDate = (date: string, current: boolean) => {
    if (current) return 'Present'
    if (!date) return ''
    try {
      return format(new Date(date), 'MMM yyyy')
    } catch {
      return date
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

      <div className="space-y-4">
        {experiences.map((exp) => (
          <HighlightWrapper key={exp.id} sectionRef={{ type: 'workExperience', id: exp.id }}>
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
                    {formatDate(exp.startDate, false)} -{' '}
                    {formatDate(exp.endDate, exp.current)}
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
          </HighlightWrapper>
        ))}
      </div>
    </section>
  )
}

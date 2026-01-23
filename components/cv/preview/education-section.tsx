import type { Education, CVTheme } from '@/lib/types/cv'
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

export default function EducationSection({ education, theme }: EducationSectionProps) {
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
        Education
      </h2>
      <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />

      <div className="space-y-3">
        {education.map((edu) => (
          <HighlightWrapper key={edu.id} sectionRef={{ type: 'education', id: edu.id }}>
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
                  {formatDate(edu.startDate, false)} -{' '}
                  {formatDate(edu.endDate, edu.current)}
                </p>
              </div>

              {edu.description && (
                <p className="leading-relaxed mt-1">{edu.description}</p>
              )}
            </div>
          </HighlightWrapper>
        ))}
      </div>
    </section>
  )
}

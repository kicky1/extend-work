import type { Skill, CVTheme } from '@/lib/types/cv'
import HighlightWrapper from './highlight-wrapper'

interface SkillsSectionProps {
  skills: Skill[]
  theme: CVTheme
  compact?: boolean
}

const categoryLabels: Record<string, string> = {
  technical: 'Technical Skills',
  soft: 'Soft Skills',
  tool: 'Tools & Technologies',
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

function PillsStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="px-3 py-1 text-xs rounded-full font-medium"
          style={{
            backgroundColor: `${theme.colors.primary}15`,
            color: theme.colors.primary,
            border: `1px solid ${theme.colors.primary}30`,
          }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  )
}

function ListStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-2">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="text-sm" style={{ color: theme.colors.text }}>
          <span className="font-semibold" style={{ color: theme.colors.primary }}>
            {categoryLabels[category] || category}:
          </span>{' '}
          <span>
            {categorySkills.map((skill) => skill.name).join(', ')}
          </span>
        </div>
      ))}
    </div>
  )
}

function GridStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category}>
          <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: theme.colors.primary }}>
            {categoryLabels[category] || category}
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {categorySkills.map((skill) => (
              <li key={skill.id} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function BarsStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {skills.map((skill) => (
        <div key={skill.id} className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-700">{skill.name}</span>
            <span className="text-xs text-gray-500 capitalize">{skill.level || 'intermediate'}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${levelToPercent[skill.level || 'intermediate']}%`,
                backgroundColor: theme.colors.primary,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SkillsSection({ skills, theme, compact = false }: SkillsSectionProps) {
  const skillsStyle = theme.skillsStyle || 'list'

  const renderSkills = () => {
    // In compact mode, always use list style for better fit in sidebar
    if (compact) {
      return <ListStyle skills={skills} theme={theme} />
    }
    switch (skillsStyle) {
      case 'pills':
        return <PillsStyle skills={skills} theme={theme} />
      case 'grid':
        return <GridStyle skills={skills} theme={theme} />
      case 'bars':
        return <BarsStyle skills={skills} theme={theme} />
      case 'list':
      default:
        return <ListStyle skills={skills} theme={theme} />
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
          Skills
        </h3>
        {renderSkills()}
      </section>
    )
  }

  return (
    <HighlightWrapper sectionRef={{ type: 'skills' }}>
      <section className="mt-6">
        <h2
          className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
          }}
        >
          Skills
        </h2>
        <SectionDivider style={theme.sectionDivider} color={theme.colors.primary} />
        {renderSkills()}
      </section>
    </HighlightWrapper>
  )
}

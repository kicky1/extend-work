import type { Skill, CVTheme, SkillsStyle } from '@/lib/types/cv'
import HighlightWrapper from './highlight-wrapper'
import { Star, Code, Users, Wrench, Globe } from 'lucide-react'

interface SkillsSectionProps {
  skills: Skill[]
  theme: CVTheme
  compact?: boolean
}

const categoryLabels: Record<string, string> = {
  technical: 'Technical Skills',
  soft: 'Soft Skills',
  tool: 'Tools & Technologies',
  language: 'Languages',
}

const categoryIcons: Record<string, typeof Code> = {
  technical: Code,
  soft: Users,
  tool: Wrench,
  language: Globe,
}

const levelToPercent = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const levelToStars = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
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

// Pills style
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

// List style (grouped by category)
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

// Grid style
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

// Bars style
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

// Tags outlined style
function TagsOutlinedStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="px-3 py-1 text-xs font-medium border-2 rounded"
          style={{
            borderColor: theme.colors.primary,
            color: theme.colors.primary,
            backgroundColor: 'transparent',
          }}
        >
          {skill.name}
        </span>
      ))}
    </div>
  )
}

// Chips style (Material Design inspired)
function ChipsStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5"
          style={{
            backgroundColor: theme.colors.primary,
            color: '#FFFFFF',
          }}
        >
          <span className="w-1 h-1 rounded-full bg-white/60" />
          {skill.name}
        </span>
      ))}
    </div>
  )
}

// Icons style (with category icons)
function IconsStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-4">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => {
        const Icon = categoryIcons[category] || Code
        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4" style={{ color: theme.colors.primary }} />
              <h4 className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.colors.primary }}>
                {categoryLabels[category] || category}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {categorySkills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 text-xs rounded"
                  style={{
                    backgroundColor: `${theme.colors.primary}10`,
                    color: theme.colors.text,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Rating stars style
function RatingStarsStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {skills.map((skill) => {
        const starCount = levelToStars[skill.level || 'intermediate']
        return (
          <div key={skill.id} className="flex items-center justify-between text-sm">
            <span className="font-medium" style={{ color: theme.colors.text }}>{skill.name}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="w-3.5 h-3.5"
                  style={{
                    color: star <= starCount ? theme.colors.accent : '#E5E7EB',
                    fill: star <= starCount ? theme.colors.accent : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Percentage style
function PercentageStyle({ skills, theme }: { skills: Skill[]; theme: CVTheme }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {skills.map((skill) => {
        const percent = levelToPercent[skill.level || 'intermediate']
        return (
          <div key={skill.id} className="flex items-center justify-between text-sm">
            <span className="font-medium" style={{ color: theme.colors.text }}>{skill.name}</span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${theme.colors.primary}15`,
                color: theme.colors.primary,
              }}
            >
              {percent}%
            </span>
          </div>
        )
      })}
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

export default function SkillsSection({ skills, theme, compact = false }: SkillsSectionProps) {
  const skillsStyle: SkillsStyle = theme.skillsStyle || 'list'

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
      case 'tags-outlined':
        return <TagsOutlinedStyle skills={skills} theme={theme} />
      case 'chips':
        return <ChipsStyle skills={skills} theme={theme} />
      case 'icons':
        return <IconsStyle skills={skills} theme={theme} />
      case 'rating-stars':
        return <RatingStarsStyle skills={skills} theme={theme} />
      case 'percentage':
        return <PercentageStyle skills={skills} theme={theme} />
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
      <section className={getSpacing(theme.spacing)}>
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

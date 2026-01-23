import type { PersonalInfo, CVTheme } from '@/lib/types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import HighlightWrapper from './highlight-wrapper'

interface CVHeaderProps {
  personalInfo: PersonalInfo
  theme: CVTheme
}

function ContactInfo({
  personalInfo,
  centered = true,
  showIcons = true
}: {
  personalInfo: PersonalInfo
  centered?: boolean
  showIcons?: boolean
}) {
  const items = [
    personalInfo.email && { icon: Mail, value: personalInfo.email },
    personalInfo.phone && { icon: Phone, value: personalInfo.phone },
    personalInfo.location && { icon: MapPin, value: personalInfo.location },
    personalInfo.website && { icon: Globe, value: personalInfo.website },
    personalInfo.linkedIn && { icon: Linkedin, value: personalInfo.linkedIn },
    personalInfo.github && { icon: Github, value: personalInfo.github },
  ].filter(Boolean) as { icon: typeof Mail; value: string }[]

  // ATS-optimized: pipe-separated text when icons are hidden
  if (!showIcons) {
    return (
      <div className={`text-xs ${centered ? 'text-center' : ''}`} style={{ opacity: 0.85 }}>
        {items.map(({ value }) => value).join(' | ')}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 text-xs ${centered ? 'justify-center' : ''}`} style={{ opacity: 0.85 }}>
      {items.map(({ icon: Icon, value }, idx) => (
        <div key={idx} className="flex items-center gap-1">
          {showIcons && <Icon className="w-3 h-3" />}
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

function ProfileImage({ src, size = 'md' }: { src: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  return (
    <img
      src={src}
      alt="Profile"
      className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
    />
  )
}

export default function CVHeader({ personalInfo, theme }: CVHeaderProps) {
  const headerStyle = theme.headerStyle || 'centered'
  const showIcons = theme.showHeaderIcons !== false

  if (headerStyle === 'split') {
    return (
      <HighlightWrapper sectionRef={{ type: 'personalInfo' }}>
        <header className="flex justify-between items-start border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
          <div className="flex items-center gap-4">
            {personalInfo.profileImage && (
              <ProfileImage src={personalInfo.profileImage} size="lg" />
            )}
            <div>
              <h1
                className="text-3xl font-bold mb-1"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
              >
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="h-1 w-16 rounded" style={{ backgroundColor: theme.colors.accent }} />
            </div>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-1">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.email}</span>
                {showIcons && <Mail className="w-3 h-3" />}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.phone}</span>
                {showIcons && <Phone className="w-3 h-3" />}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.location}</span>
                {showIcons && <MapPin className="w-3 h-3" />}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.website}</span>
                {showIcons && <Globe className="w-3 h-3" />}
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.linkedIn}</span>
                {showIcons && <Linkedin className="w-3 h-3" />}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center justify-end gap-1">
                <span>{personalInfo.github}</span>
                {showIcons && <Github className="w-3 h-3" />}
              </div>
            )}
          </div>
        </header>
      </HighlightWrapper>
    )
  }

  if (headerStyle === 'left-aligned') {
    return (
      <HighlightWrapper sectionRef={{ type: 'personalInfo' }}>
        <header className="border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
          <div className="flex items-center gap-4 mb-2">
            {personalInfo.profileImage && (
              <ProfileImage src={personalInfo.profileImage} size="md" />
            )}
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
          </div>
          <ContactInfo personalInfo={personalInfo} centered={false} showIcons={showIcons} />
        </header>
      </HighlightWrapper>
    )
  }

  // Default: centered
  return (
    <HighlightWrapper sectionRef={{ type: 'personalInfo' }}>
      <header className="text-center border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
        {personalInfo.profileImage && (
          <div className="flex justify-center mb-3">
            <ProfileImage src={personalInfo.profileImage} size="lg" />
          </div>
        )}
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <ContactInfo personalInfo={personalInfo} centered showIcons={showIcons} />
      </header>
    </HighlightWrapper>
  )
}

import type { PersonalInfo, CVTheme, HeaderStyle, PhotoStyle, PhotoTheme } from '@/lib/types/cv'
import { defaultPhotoTheme } from '@/lib/types/cv'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'
import HighlightWrapper from './highlight-wrapper'

interface CVHeaderProps {
  personalInfo: PersonalInfo
  theme: CVTheme
}

function ContactInfo({
  personalInfo,
  centered = true,
  showIcons = true,
  small = false,
}: {
  personalInfo: PersonalInfo
  centered?: boolean
  showIcons?: boolean
  small?: boolean
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
      <div className={`${small ? 'text-[10px]' : 'text-xs'} ${centered ? 'text-center' : ''}`} style={{ opacity: 0.85 }}>
        {items.map(({ value }) => value).join(' | ')}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${small ? 'text-[10px]' : 'text-xs'} ${centered ? 'justify-center' : ''}`} style={{ opacity: 0.85 }}>
      {items.map(({ icon: Icon, value }, idx) => (
        <div key={idx} className="flex items-center gap-1">
          {showIcons && <Icon className={small ? 'w-2.5 h-2.5' : 'w-3 h-3'} />}
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

// Size mappings for photos
const photoSizeMap = {
  sm: { width: 48, height: 48, class: 'w-12 h-12' },
  md: { width: 64, height: 64, class: 'w-16 h-16' },
  lg: { width: 80, height: 80, class: 'w-20 h-20' },
  xl: { width: 112, height: 112, class: 'w-28 h-28' },
}

// Get border color based on PhotoTheme borderColor
function getBorderColor(borderColor: PhotoTheme['borderColor'], theme: CVTheme): string {
  switch (borderColor) {
    case 'primary': return theme.colors.primary
    case 'accent': return theme.colors.accent
    case 'white': return '#FFFFFF'
    case 'gray': return '#E5E7EB'
    default: return '#E5E7EB'
  }
}

// Get border width based on PhotoTheme border
function getBorderWidth(border: PhotoTheme['border']): string {
  switch (border) {
    case 'none': return '0'
    case 'thin': return '2px'
    case 'thick': return '4px'
    case 'double': return '4px'
    default: return '2px'
  }
}

// Get shadow style based on PhotoTheme shadow
function getShadowStyle(shadow: PhotoTheme['shadow']): string {
  switch (shadow) {
    case 'none': return 'none'
    case 'subtle': return '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)'
    case 'medium': return '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
    case 'strong': return '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)'
    default: return 'none'
  }
}

// Get shape styles - including hexagon via clip-path
function getShapeStyles(shape: PhotoTheme['shape']): { borderRadius: string; clipPath?: string } {
  switch (shape) {
    case 'circle':
      return { borderRadius: '9999px' }
    case 'square':
      return { borderRadius: '0' }
    case 'rounded':
      return { borderRadius: '12px' }
    case 'hexagon':
      return { borderRadius: '0', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }
    default:
      return { borderRadius: '9999px' }
  }
}

// Convert legacy PhotoStyle to PhotoTheme for backward compatibility
function legacyToPhotoTheme(style: PhotoStyle, size: 'sm' | 'md' | 'lg' | 'xl'): PhotoTheme {
  const base: PhotoTheme = {
    ...defaultPhotoTheme,
    size,
  }

  switch (style) {
    case 'none':
      return { ...base, visible: false }
    case 'circle':
      return { ...base, shape: 'circle', border: 'thin', borderColor: 'gray' }
    case 'square':
      return { ...base, shape: 'square', border: 'thin', borderColor: 'gray' }
    case 'rounded':
      return { ...base, shape: 'rounded', border: 'thin', borderColor: 'gray' }
    case 'bordered':
      return { ...base, shape: 'rounded', border: 'thick', borderColor: 'primary' }
    default:
      return base
  }
}

function ProfileImage({
  src,
  style,
  theme,
  size = 'md',
  photoTheme: explicitPhotoTheme,
}: {
  src: string
  style: PhotoStyle
  theme: CVTheme
  size?: 'sm' | 'md' | 'lg' | 'xl'
  photoTheme?: PhotoTheme
}) {
  // Use explicit photoTheme if provided, otherwise check theme.photoTheme, otherwise convert legacy style
  const photoTheme: PhotoTheme = explicitPhotoTheme
    || theme.photoTheme
    || legacyToPhotoTheme(style, size)

  // Check visibility
  if (!photoTheme.visible || style === 'none') return null

  const sizeConfig = photoSizeMap[photoTheme.size || size]
  const shapeStyles = getShapeStyles(photoTheme.shape)
  const borderColor = getBorderColor(photoTheme.borderColor, theme)
  const borderWidth = getBorderWidth(photoTheme.border)
  const shadowStyle = getShadowStyle(photoTheme.shadow)

  // Build the image style
  const imageStyle: React.CSSProperties = {
    width: sizeConfig.width,
    height: sizeConfig.height,
    objectFit: 'cover',
    borderRadius: shapeStyles.borderRadius,
    clipPath: shapeStyles.clipPath,
    border: photoTheme.border !== 'none' ? `${borderWidth} ${photoTheme.border === 'double' ? 'double' : 'solid'} ${borderColor}` : 'none',
    boxShadow: shadowStyle,
  }

  // Background ring wrapper
  if (photoTheme.background !== 'none') {
    const ringPadding = 4
    const ringSize = sizeConfig.width + ringPadding * 2

    let ringBackground: string
    if (photoTheme.background === 'ring') {
      ringBackground = theme.colors.primary
    } else {
      // gradient-ring
      ringBackground = `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
    }

    const ringStyle: React.CSSProperties = {
      width: ringSize,
      height: ringSize,
      background: ringBackground,
      borderRadius: shapeStyles.borderRadius,
      clipPath: shapeStyles.clipPath,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: ringPadding,
    }

    return (
      <div style={ringStyle}>
        <img
          src={src}
          alt="Profile"
          style={imageStyle}
        />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt="Profile"
      style={imageStyle}
    />
  )
}

// Centered header style
function CenteredHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header className="text-center border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
      {personalInfo.profileImage && (
        <div className="flex justify-center mb-3">
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="lg" />
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
  )
}

// Left-aligned header style
function LeftAlignedHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header className="border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
      <div className="flex items-center gap-4 mb-2">
        {personalInfo.profileImage && (
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="md" />
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
  )
}

// Split header style
function SplitHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header className="flex justify-between items-start border-b-2 pb-4" style={{ borderColor: theme.colors.primary }}>
      <div className="flex items-center gap-4">
        {personalInfo.profileImage && (
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="lg" />
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
  )
}

// Banner header style (full-width colored background)
function BannerHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header
      className="px-6 py-5 rounded-lg mb-4 text-white"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="flex items-center gap-5">
        {personalInfo.profileImage && (
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="xl" />
        )}
        <div className="flex-1 min-w-0">
          <h1
            className="text-3xl font-bold mb-2 break-words"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-90">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                {showIcons && <Mail className="w-3.5 h-3.5 shrink-0" />}
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                {showIcons && <Phone className="w-3.5 h-3.5 shrink-0" />}
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                {showIcons && <MapPin className="w-3.5 h-3.5 shrink-0" />}
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mt-1 opacity-80">
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                {showIcons && <Globe className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                {showIcons && <Github className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Compact header style (minimal space)
function CompactHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false

  return (
    <header className="pb-2 mb-2 border-b" style={{ borderColor: `${theme.colors.primary}30` }}>
      <div className="flex items-baseline justify-between gap-4">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <ContactInfo personalInfo={personalInfo} centered={false} showIcons={showIcons} small />
      </div>
    </header>
  )
}

// Photo-focus header style (large photo emphasis)
function PhotoFocusHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'rounded'

  return (
    <header className="flex items-center gap-6 pb-4 border-b-2" style={{ borderColor: theme.colors.primary }}>
      {personalInfo.profileImage && (
        <div className="shrink-0">
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="xl" />
        </div>
      )}
      <div className="flex-1">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="h-0.5 w-20 mb-3" style={{ backgroundColor: theme.colors.accent }} />
        <ContactInfo personalInfo={personalInfo} centered={false} showIcons={showIcons} />
      </div>
    </header>
  )
}

// Gradient header style
function GradientHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header
      className="px-6 py-5 rounded-lg mb-4 text-white"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
      }}
    >
      <div className="flex items-center gap-5">
        {personalInfo.profileImage && (
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="lg" />
        )}
        <div className="flex-1 min-w-0">
          <h1
            className="text-3xl font-bold mb-2 break-words"
            style={{ fontFamily: theme.fonts.heading }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-90">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                {showIcons && <Mail className="w-3.5 h-3.5 shrink-0" />}
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                {showIcons && <Phone className="w-3.5 h-3.5 shrink-0" />}
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                {showIcons && <MapPin className="w-3.5 h-3.5 shrink-0" />}
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mt-1 opacity-80">
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                {showIcons && <Globe className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-1">
                {showIcons && <Linkedin className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                {showIcons && <Github className="w-3 h-3 shrink-0" />}
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Bordered header style
function BorderedHeader({ personalInfo, theme }: CVHeaderProps) {
  const showIcons = theme.showHeaderIcons !== false
  const photoStyle = theme.photoStyle || 'circle'

  return (
    <header
      className="p-4 border-2 rounded-lg mb-4"
      style={{ borderColor: theme.colors.primary }}
    >
      <div className="flex items-center gap-4">
        {personalInfo.profileImage && (
          <ProfileImage src={personalInfo.profileImage} style={photoStyle} theme={theme} size="lg" />
        )}
        <div className="flex-1">
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <ContactInfo personalInfo={personalInfo} centered={false} showIcons={showIcons} />
        </div>
      </div>
    </header>
  )
}

export default function CVHeader({ personalInfo, theme }: CVHeaderProps) {
  const headerStyle: HeaderStyle = theme.headerStyle || 'centered'

  const renderHeader = () => {
    switch (headerStyle) {
      case 'split':
        return <SplitHeader personalInfo={personalInfo} theme={theme} />
      case 'left-aligned':
        return <LeftAlignedHeader personalInfo={personalInfo} theme={theme} />
      case 'banner':
        return <BannerHeader personalInfo={personalInfo} theme={theme} />
      case 'compact':
        return <CompactHeader personalInfo={personalInfo} theme={theme} />
      case 'photo-focus':
        return <PhotoFocusHeader personalInfo={personalInfo} theme={theme} />
      case 'gradient':
        return <GradientHeader personalInfo={personalInfo} theme={theme} />
      case 'bordered':
        return <BorderedHeader personalInfo={personalInfo} theme={theme} />
      case 'centered':
      default:
        return <CenteredHeader personalInfo={personalInfo} theme={theme} />
    }
  }

  return (
    <HighlightWrapper sectionRef={{ type: 'personalInfo' }}>
      {renderHeader()}
    </HighlightWrapper>
  )
}

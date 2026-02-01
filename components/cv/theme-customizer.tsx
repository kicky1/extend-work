'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCVStore from '@/lib/stores/cv-store'
import { predefinedThemes, fontOptions, layoutOptions, themePresets, getThemesByCategory, detectIndustryFromText, colorPresets, type ThemePreset } from '@/lib/cv-themes'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Palette,
  Type,
  X,
  Check,
  Layout,
  Minus,
  MoreHorizontal,
  Rows3,
  Sparkles,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Grid3X3,
  LayoutGrid,
  Search,
  Briefcase,
  Star,
  Code,
  PieChart,
  Heart,
  Scale,
  GraduationCap,
  Building2,
  Megaphone,
  ShoppingBag,
  Landmark,
  Zap,
  Plus,
  Eye,
  EyeOff,
  ChevronDown,
  Globe,
  Camera,
} from 'lucide-react'
import type { CVTheme, SpacingDensity, ExperienceStyle, EducationStyle, SkillsStyle, HeaderStyle, SummaryStyle, ThemeCategory, Industry, LanguagesStyle, SidebarStyle, PhotoTheme } from '@/lib/types/cv'
import { defaultSidebarStyle, defaultPhotoTheme } from '@/lib/types/cv'

const dividerStyles: { value: CVTheme['sectionDivider']; label: string; icon: typeof Minus }[] = [
  { value: 'line', label: 'Line', icon: Minus },
  { value: 'dotted', label: 'Dotted', icon: MoreHorizontal },
  { value: 'accent-bar', label: 'Accent', icon: Rows3 },
  { value: 'none', label: 'None', icon: X },
]

const bulletStyles: { value: CVTheme['bulletStyle']; label: string; preview: string }[] = [
  { value: 'disc', label: 'Disc', preview: '•' },
  { value: 'circle', label: 'Circle', preview: '○' },
  { value: 'square', label: 'Square', preview: '▪' },
  { value: 'dash', label: 'Dash', preview: '–' },
  { value: 'arrow', label: 'Arrow', preview: '→' },
]

const experienceStyles: { value: ExperienceStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'cards', label: 'Cards' },
  { value: 'compact', label: 'Compact' },
  { value: 'detailed', label: 'Detailed' },
]

const educationStyles: { value: EducationStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'cards', label: 'Cards' },
  { value: 'compact', label: 'Compact' },
  { value: 'academic', label: 'Academic' },
]

const skillsStyles: { value: SkillsStyle; label: string }[] = [
  { value: 'list', label: 'List' },
  { value: 'pills', label: 'Pills' },
  { value: 'grid', label: 'Grid' },
  { value: 'bars', label: 'Bars' },
  { value: 'chips', label: 'Chips' },
  { value: 'tags-outlined', label: 'Tags' },
  { value: 'icons', label: 'Icons' },
  { value: 'rating-stars', label: 'Stars' },
  { value: 'percentage', label: 'Percentage' },
]

const headerStyles: { value: HeaderStyle; label: string }[] = [
  { value: 'left-aligned', label: 'Left' },
  { value: 'centered', label: 'Centered' },
  { value: 'split', label: 'Split' },
  { value: 'banner', label: 'Banner' },
  { value: 'compact', label: 'Compact' },
  { value: 'photo-focus', label: 'Photo Focus' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'bordered', label: 'Bordered' },
]

const twoColumnHeaderStyles: { value: HeaderStyle; label: string }[] = [
  { value: 'sidebar-header', label: 'Sidebar' },
  { value: 'split-header', label: 'Split' },
  { value: 'compact-sidebar', label: 'Compact' },
  { value: 'banner-overlay', label: 'Banner' },
]

const summaryStyles: { value: SummaryStyle; label: string }[] = [
  { value: 'plain', label: 'Plain' },
  { value: 'boxed', label: 'Boxed' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'highlighted', label: 'Highlighted' },
  { value: 'sidebar', label: 'Sidebar' },
]

const twoColumnSummaryStyles: { value: SummaryStyle; label: string }[] = [
  { value: 'sidebar-summary', label: 'In Sidebar' },
  { value: 'main-summary', label: 'In Main' },
  { value: 'split-summary', label: 'Split' },
  { value: 'boxed-sidebar', label: 'Boxed' },
]

const languagesStyles: { value: LanguagesStyle; label: string }[] = [
  { value: 'inline', label: 'Inline' },
  { value: 'pills', label: 'Pills' },
  { value: 'bars', label: 'Bars' },
  { value: 'grid', label: 'Grid' },
]

const spacingOptions: { value: SpacingDensity; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'relaxed', label: 'Relaxed' },
]

const categoryConfig: Record<ThemeCategory, { label: string; icon: typeof Sparkles; description: string }> = {
  industry: {
    label: 'By Industry',
    icon: Briefcase,
    description: 'Templates optimized for specific industries',
  },
  style: {
    label: 'By Style',
    icon: Palette,
    description: 'Design-focused templates',
  },
  specialty: {
    label: 'Specialty',
    icon: Star,
    description: 'Purpose-specific templates',
  },
}

const industryIcons: Record<Industry, typeof Code> = {
  tech: Code,
  finance: PieChart,
  healthcare: Heart,
  legal: Scale,
  academia: GraduationCap,
  creative: Palette,
  engineering: Building2,
  marketing: Megaphone,
  consulting: Briefcase,
  retail: ShoppingBag,
  government: Landmark,
  general: Zap,
}

type ThemeTab = 'templates' | 'colors' | 'typography' | 'layout' | 'sections'

const themeTabs: { id: ThemeTab; label: string }[] = [
  { id: 'templates', label: 'Templates' },
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'layout', label: 'Layout' },
  { id: 'sections', label: 'Sections' },
]

interface ThemeCustomizerButtonProps {
  isCustomizing: boolean
  onClick: () => void
}

export function ThemeCustomizerButton({ isCustomizing, onClick }: ThemeCustomizerButtonProps) {
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Button
        onClick={onClick}
        size="icon"
        className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
      >
        {isCustomizing ? <X className="w-5 h-5" /> : <Palette className="w-5 h-5" />}
      </Button>
    </motion.div>
  )
}

interface ThemeCustomizerPanelProps {
  onClose: () => void
}

export function ThemeCustomizerPanel({ onClose }: ThemeCustomizerPanelProps) {
  const [activeTab, setActiveTab] = useState<ThemeTab>('templates')
  const { cvData, updateTheme } = useCVStore()
  const { theme } = cvData

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Theme Customizer</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex overflow-x-auto">
          {themeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded ${
                activeTab === tab.id
                  ? 'text-primary bg-muted'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'templates' && (
          <TemplatesTab
            theme={theme}
            updateTheme={updateTheme}
            cvData={cvData}
          />
        )}
        {activeTab === 'colors' && <div className="p-6"><ColorsTab theme={theme} updateTheme={updateTheme} /></div>}
        {activeTab === 'typography' && <div className="p-6"><TypographyTab theme={theme} updateTheme={updateTheme} /></div>}
        {activeTab === 'layout' && <div className="p-6"><LayoutTab theme={theme} updateTheme={updateTheme} /></div>}
        {activeTab === 'sections' && <div className="p-6"><SectionsTab theme={theme} updateTheme={updateTheme} /></div>}
      </div>
    </div>
  )
}

interface TabProps {
  theme: CVTheme
  updateTheme: (updates: Partial<CVTheme>) => void
}

interface TemplatesTabProps extends TabProps {
  cvData: {
    summary: string
    workExperience: Array<{ position: string; company: string; description: string }>
    skills: Array<{ name: string }>
  }
}

function TemplateCard({
  preset,
  isActive,
  isRecommended,
  onSelect,
}: {
  preset: ThemePreset
  isActive: boolean
  isRecommended: boolean
  onSelect: () => void
}) {
  const IndustryIcon = preset.industry ? industryIcons[preset.industry] : Sparkles

  return (
    <motion.button
      onClick={onSelect}
      className={`relative p-3 rounded-xl border-2 transition-all text-left w-full group ${
        isActive
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50 bg-card hover:bg-muted/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg z-10">
          <Sparkles className="w-3 h-3" />
          AI Pick
        </div>
      )}

      {/* Active Check */}
      {isActive && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primary" />
        </div>
      )}

      {/* Color Preview */}
      <div className="flex gap-1 mb-2">
        <div
          className="w-6 h-6 rounded-md border border-border shadow-sm"
          style={{ backgroundColor: preset.colors.primary }}
        />
        <div
          className="w-6 h-6 rounded-md border border-border shadow-sm"
          style={{ backgroundColor: preset.colors.accent }}
        />
        <div
          className="w-6 h-6 rounded-md border border-border shadow-sm flex items-center justify-center text-[10px] font-medium"
          style={{ backgroundColor: preset.colors.background, color: preset.colors.text }}
        >
          Aa
        </div>
      </div>

      {/* Template Info */}
      <div className="flex items-start gap-1.5">
        <IndustryIcon
          className="w-3.5 h-3.5 mt-0.5 shrink-0"
          style={{ color: preset.colors.primary }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-xs text-foreground truncate">{preset.name}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{preset.description}</p>
        </div>
      </div>

      {/* Style Tags */}
      <div className="flex flex-wrap gap-0.5 mt-2">
        <span
          className="text-[9px] px-1 py-0.5 rounded"
          style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}
        >
          {preset.layout}
        </span>
        <span
          className="text-[9px] px-1 py-0.5 rounded"
          style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}
        >
          {preset.headerStyle}
        </span>
      </div>
    </motion.button>
  )
}

function TemplatesTab({ theme, updateTheme, cvData }: TemplatesTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Detect industry from CV content
  const detectedIndustry = useMemo(() => {
    const contentText = [
      cvData.summary,
      ...cvData.workExperience.map(w => `${w.position} ${w.company} ${w.description}`),
      ...cvData.skills.map(s => s.name),
    ].join(' ')

    return detectIndustryFromText(contentText)
  }, [cvData])

  // Get recommended template
  const recommendedTemplate = useMemo(() => {
    return themePresets.find(t => t.industry === detectedIndustry) || themePresets[0]
  }, [detectedIndustry])

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let templates = selectedCategory === 'all'
      ? themePresets
      : getThemesByCategory(selectedCategory)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      templates = templates.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.industry?.toLowerCase().includes(query)
      )
    }

    // Sort to put recommended first
    return templates.sort((a, b) => {
      if (a.id === recommendedTemplate?.id) return -1
      if (b.id === recommendedTemplate?.id) return 1
      return 0
    })
  }, [selectedCategory, searchQuery, recommendedTemplate])

  const handleSelectTemplate = (preset: ThemePreset) => {
    updateTheme(preset)
  }

  const isActiveTemplate = (preset: ThemePreset) => {
    return (
      theme.colors.primary === preset.colors.primary &&
      theme.layout === preset.layout &&
      theme.headerStyle === preset.headerStyle
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search & Category Tabs - Sticky */}
      <div className="px-4 py-3 border-b border-border space-y-3 bg-card sticky top-0 z-10">
        {/* Header with count */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {themePresets.length} templates
            {detectedIndustry !== 'general' && (
              <span className="ml-1 text-primary">• {detectedIndustry}</span>
            )}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            All
          </button>
          {(Object.entries(categoryConfig) as [ThemeCategory, typeof categoryConfig.industry][]).map(
            ([category, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {config.label}
                </button>
              )
            }
          )}
        </div>
      </div>

      {/* Template Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No templates found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredTemplates.map((preset) => (
              <TemplateCard
                key={preset.id}
                preset={preset}
                isActive={isActiveTemplate(preset)}
                isRecommended={preset.id === recommendedTemplate?.id}
                onSelect={() => handleSelectTemplate(preset)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Color picker component with better styling
function ColorPickerField({
  label,
  color,
  onChange,
  icon: Icon,
}: {
  label: string
  color: string
  onChange: (color: string) => void
  icon: typeof Palette
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(color)

  const handleInputChange = (value: string) => {
    setInputValue(value)
    // Auto-update if valid hex
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value)
    }
  }

  const handleInputBlur = () => {
    setIsEditing(false)
    // Reset to current color if invalid
    if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      setInputValue(color)
    }
  }

  return (
    <div className="group relative p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-all">
      <div className="flex items-center gap-3">
        {/* Color swatch with picker */}
        <div className="relative">
          <div
            className="w-12 h-12 rounded-lg shadow-sm border-2 border-white ring-1 ring-border transition-transform group-hover:scale-105"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => {
              onChange(e.target.value)
              setInputValue(e.target.value)
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Label and hex value */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{label}</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={handleInputBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleInputBlur()}
              autoFocus
              className="w-full h-6 px-2 text-xs font-mono bg-muted/50 border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="#000000"
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {color}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Sidebar style options
const sidebarCornerOptions: { value: SidebarStyle['corners']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'pill', label: 'Pill' },
]

const sidebarBackgroundOptions: { value: SidebarStyle['background']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'solid', label: 'Solid' },
  { value: 'gradient', label: 'Gradient' },
]

const sidebarBorderOptions: { value: SidebarStyle['border']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'accent', label: 'Accent' },
]

const sidebarWidthOptions: { value: SidebarStyle['width']; label: string }[] = [
  { value: 25, label: '25%' },
  { value: 30, label: '30%' },
  { value: 35, label: '35%' },
  { value: 40, label: '40%' },
]

// Photo theme options
const photoShapeOptions: { value: PhotoTheme['shape']; label: string }[] = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'hexagon', label: 'Hexagon' },
]

const photoBorderOptions: { value: PhotoTheme['border']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'thin', label: 'Thin' },
  { value: 'thick', label: 'Thick' },
  { value: 'double', label: 'Double' },
]

const photoBorderColorOptions: { value: PhotoTheme['borderColor']; label: string }[] = [
  { value: 'gray', label: 'Gray' },
  { value: 'primary', label: 'Primary' },
  { value: 'accent', label: 'Accent' },
  { value: 'white', label: 'White' },
]

const photoShadowOptions: { value: PhotoTheme['shadow']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'subtle', label: 'Subtle' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
]

const photoBackgroundOptions: { value: PhotoTheme['background']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'ring', label: 'Ring' },
  { value: 'gradient-ring', label: 'Gradient' },
]

const photoSizeOptions: { value: PhotoTheme['size']; label: string }[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'X-Large' },
]

function ColorsTab({ theme, updateTheme }: TabProps) {
  return (
    <div className="space-y-4">
      {/* Color pickers */}
      <div className="space-y-3">
        <ColorPickerField
          label="Primary Color"
          color={theme.colors.primary}
          onChange={(color) => updateTheme({ colors: { ...theme.colors, primary: color } })}
          icon={Palette}
        />
        <ColorPickerField
          label="Accent Color"
          color={theme.colors.accent}
          onChange={(color) => updateTheme({ colors: { ...theme.colors, accent: color } })}
          icon={Sparkles}
        />
        <ColorPickerField
          label="Text Color"
          color={theme.colors.text}
          onChange={(color) => updateTheme({ colors: { ...theme.colors, text: color } })}
          icon={Type}
        />
        <ColorPickerField
          label="Background"
          color={theme.colors.background}
          onChange={(color) => updateTheme({ colors: { ...theme.colors, background: color } })}
          icon={Layout}
        />
      </div>

      {/* Quick presets */}
      <div className="pt-2 border-t border-border">
        <Label className="text-xs text-muted-foreground mb-3 block">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {/* Primary presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Primary</span>
            <div className="flex flex-wrap gap-1">
              {colorPresets.primary.map((color) => (
                <button
                  key={color}
                  onClick={() => updateTheme({ colors: { ...theme.colors, primary: color } })}
                  className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${
                    theme.colors.primary === color ? 'border-foreground ring-2 ring-primary/30' : 'border-white'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
          {/* Accent presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Accent</span>
            <div className="flex flex-wrap gap-1">
              {colorPresets.accent.map((color) => (
                <button
                  key={color}
                  onClick={() => updateTheme({ colors: { ...theme.colors, accent: color } })}
                  className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${
                    theme.colors.accent === color ? 'border-foreground ring-2 ring-primary/30' : 'border-white'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="pt-3 border-t border-border">
        <Label className="text-xs text-muted-foreground mb-2 block">Preview</Label>
        <div
          className="p-4 rounded-lg border border-border"
          style={{ backgroundColor: theme.colors.background }}
        >
          <div className="space-y-2">
            <h3
              className="text-sm font-semibold"
              style={{ color: theme.colors.primary }}
            >
              Section Title
            </h3>
            <p
              className="text-xs"
              style={{ color: theme.colors.text }}
            >
              Sample text showing how your content will appear with these colors.
            </p>
            <span
              className="inline-block text-[10px] px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${theme.colors.accent}20`,
                color: theme.colors.accent,
              }}
            >
              Accent Tag
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypographyTab({ theme, updateTheme }: TabProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Heading Font</Label>
        <select
          value={theme.fonts.heading}
          onChange={(e) =>
            updateTheme({ fonts: { ...theme.fonts, heading: e.target.value } })
          }
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Body Font</Label>
        <select
          value={theme.fonts.body}
          onChange={(e) =>
            updateTheme({ fonts: { ...theme.fonts, body: e.target.value } })
          }
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

// Section accordion component - reusable for Layout and Sections tabs
function SectionAccordion({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  title: string
  icon: typeof Layout
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground flex-1 text-left">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 border-t border-border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LayoutTab({ theme, updateTheme }: TabProps) {
  const isSidebarLayout = twoColumnLayouts.includes(theme.layout || 'classic')
  const sidebarStyle = theme.sidebarStyle || defaultSidebarStyle

  const updateSidebarStyle = (updates: Partial<SidebarStyle>) => {
    updateTheme({
      sidebarStyle: { ...sidebarStyle, ...updates },
    })
  }

  return (
    <div className="space-y-3">
      {/* Layout Style */}
      <SectionAccordion title="Page Layout" icon={LayoutGrid} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-2">
          {layoutOptions.slice(0, 6).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateTheme({ layout: value })}
              className={`p-2.5 rounded-lg border transition-all text-center ${
                theme.layout === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Sidebar Style - only visible for sidebar layouts */}
      {isSidebarLayout && (
        <SectionAccordion title="Sidebar Style" icon={Layout}>
          <div className="space-y-4">
            {/* Width */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-2 block">Width</Label>
              <div className="flex gap-1.5">
                {sidebarWidthOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateSidebarStyle({ width: value })}
                    className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                      sidebarStyle.width === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-[11px] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Corners */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-2 block">Corners</Label>
              <div className="flex gap-1.5">
                {sidebarCornerOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateSidebarStyle({ corners: value })}
                    className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                      sidebarStyle.corners === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-[11px] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-2 block">Background</Label>
              <div className="flex gap-1.5">
                {sidebarBackgroundOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateSidebarStyle({ background: value })}
                    className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                      sidebarStyle.background === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-[11px] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Border */}
            <div>
              <Label className="text-[10px] text-muted-foreground mb-2 block">Border</Label>
              <div className="flex gap-1.5">
                {sidebarBorderOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateSidebarStyle({ border: value })}
                    className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                      sidebarStyle.border === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/50 text-muted-foreground'
                    }`}
                  >
                    <span className="text-[11px] font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Full Height Toggle */}
            <button
              onClick={() => updateSidebarStyle({ fullHeight: !sidebarStyle.fullHeight })}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                sidebarStyle.fullHeight
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {sidebarStyle.fullHeight ? (
                  <Eye className="w-4 h-4 text-primary" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={`text-xs font-medium ${sidebarStyle.fullHeight ? 'text-primary' : 'text-muted-foreground'}`}>
                  Full Height
                </span>
              </div>
              <div
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  sidebarStyle.fullHeight ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-all top-0.5 ${
                    sidebarStyle.fullHeight ? 'left-4' : 'left-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </SectionAccordion>
      )}

      {/* Spacing */}
      <SectionAccordion title="Spacing" icon={Rows3}>
        <div className="flex gap-2">
          {spacingOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateTheme({ spacing: value })}
              className={`flex-1 p-2.5 rounded-lg border transition-all text-center ${
                theme.spacing === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Section Dividers */}
      <SectionAccordion title="Section Dividers" icon={Minus}>
        <div className="flex gap-2">
          {dividerStyles.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => updateTheme({ sectionDivider: value })}
              className={`flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all ${
                theme.sectionDivider === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Bullet Style */}
      <SectionAccordion title="Bullet Points" icon={Grid3X3}>
        <div className="flex gap-2">
          {bulletStyles.map(({ value, label, preview }) => (
            <button
              key={value}
              onClick={() => updateTheme({ bulletStyle: value })}
              className={`flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg border transition-all ${
                theme.bulletStyle === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-lg leading-none">{preview}</span>
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Page Numbers */}
      <SectionAccordion title="Page Numbers" icon={Hash}>
        <div className="space-y-3">
          {/* Toggle */}
          <button
            onClick={() =>
              updateTheme({
                pageNumbers: {
                  show: !theme.pageNumbers?.show,
                  position: theme.pageNumbers?.position || 'center',
                },
              })
            }
            className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
              theme.pageNumbers?.show
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {theme.pageNumbers?.show ? (
                <Eye className="w-4 h-4 text-primary" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <span className={`text-xs font-medium ${theme.pageNumbers?.show ? 'text-primary' : 'text-muted-foreground'}`}>
                {theme.pageNumbers?.show ? 'Visible' : 'Hidden'}
              </span>
            </div>
            <div
              className={`w-9 h-5 rounded-full transition-colors relative ${
                theme.pageNumbers?.show ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-all top-0.5 ${
                  theme.pageNumbers?.show ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
          </button>

          {/* Position selector - only show when page numbers are enabled */}
          {theme.pageNumbers?.show && (
            <div className="flex gap-2">
              {[
                { value: 'left' as const, label: 'Left', icon: AlignLeft },
                { value: 'center' as const, label: 'Center', icon: AlignCenter },
                { value: 'right' as const, label: 'Right', icon: AlignRight },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() =>
                    updateTheme({
                      pageNumbers: {
                        show: true,
                        position: value,
                      },
                    })
                  }
                  className={`flex-1 flex flex-col items-center gap-1.5 p-2.5 rounded-lg border transition-all ${
                    theme.pageNumbers?.position === value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-medium">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </SectionAccordion>
    </div>
  )
}

// Layout compatibility: which styles are available for each layout
const twoColumnLayouts = ['two-column', 'sidebar-left', 'sidebar-right']

function getAvailableHeaderStyles(layout: string) {
  if (twoColumnLayouts.includes(layout)) return twoColumnHeaderStyles
  if (layout === 'top-banner') return headerStyles.filter(s => s.value === 'banner')
  if (layout === 'compact') return headerStyles.filter(s => s.value === 'compact')
  return headerStyles
}

function getAvailableSummaryStyles(layout: string) {
  if (twoColumnLayouts.includes(layout)) return twoColumnSummaryStyles
  return summaryStyles
}

function SectionsTab({ theme, updateTheme }: TabProps) {
  const layout = theme.layout || 'classic'
  const availableHeaderStyles = getAvailableHeaderStyles(layout)
  const availableSummaryStyles = getAvailableSummaryStyles(layout)
  const isTwoColumn = twoColumnLayouts.includes(layout)

  const photoTheme = theme.photoTheme || defaultPhotoTheme

  const updatePhotoTheme = (updates: Partial<PhotoTheme>) => {
    updateTheme({
      photoTheme: { ...photoTheme, ...updates },
    })
  }

  return (
    <div className="space-y-3">
      {/* Photo Style */}
      <SectionAccordion title="Photo" icon={Camera}>
        <div className="space-y-4">
          {/* Visibility Toggle */}
          <button
            onClick={() => updatePhotoTheme({ visible: !photoTheme.visible })}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all ${
              photoTheme.visible
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-2">
              {photoTheme.visible ? (
                <Eye className="w-4 h-4 text-primary" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
              <span className={`text-xs font-medium ${photoTheme.visible ? 'text-primary' : 'text-muted-foreground'}`}>
                {photoTheme.visible ? 'Photo Visible' : 'Photo Hidden'}
              </span>
            </div>
            <div
              className={`w-9 h-5 rounded-full transition-colors relative ${
                photoTheme.visible ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute w-4 h-4 rounded-full bg-white shadow-sm transition-all top-0.5 ${
                  photoTheme.visible ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
          </button>

          {photoTheme.visible && (
            <>
              {/* Shape */}
              <div>
                <Label className="text-[10px] text-muted-foreground mb-2 block">Shape</Label>
                <div className="flex gap-1.5">
                  {photoShapeOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updatePhotoTheme({ shape: value })}
                      className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                        photoTheme.shape === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <Label className="text-[10px] text-muted-foreground mb-2 block">Size</Label>
                <div className="flex gap-1.5">
                  {photoSizeOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updatePhotoTheme({ size: value })}
                      className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                        photoTheme.size === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Border */}
              <div>
                <Label className="text-[10px] text-muted-foreground mb-2 block">Border</Label>
                <div className="flex gap-1.5">
                  {photoBorderOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updatePhotoTheme({ border: value })}
                      className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                        photoTheme.border === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Color - only show when border is not 'none' */}
              {photoTheme.border !== 'none' && (
                <div>
                  <Label className="text-[10px] text-muted-foreground mb-2 block">Border Color</Label>
                  <div className="flex gap-1.5">
                    {photoBorderColorOptions.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => updatePhotoTheme({ borderColor: value })}
                        className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                          photoTheme.borderColor === value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        <span className="text-[11px] font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Shadow */}
              <div>
                <Label className="text-[10px] text-muted-foreground mb-2 block">Shadow</Label>
                <div className="flex gap-1.5">
                  {photoShadowOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updatePhotoTheme({ shadow: value })}
                      className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                        photoTheme.shadow === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background (Ring) */}
              <div>
                <Label className="text-[10px] text-muted-foreground mb-2 block">Background</Label>
                <div className="flex gap-1.5">
                  {photoBackgroundOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updatePhotoTheme({ background: value })}
                      className={`flex-1 p-2 rounded-lg border transition-all text-center ${
                        photoTheme.background === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <span className="text-[11px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SectionAccordion>

      {/* Header Style */}
      <SectionAccordion title="Header" icon={Layout} defaultOpen={true}>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-1.5">
            {availableHeaderStyles.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateTheme({ headerStyle: value })}
                className={`p-2 rounded-lg border transition-all text-center ${
                  theme.headerStyle === value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <span className="text-[11px] font-medium">{label}</span>
              </button>
            ))}
          </div>
          {/* Contact Icons Toggle */}
          <button
            onClick={() => updateTheme({ showHeaderIcons: !theme.showHeaderIcons })}
            className={`flex items-center gap-2 w-full p-2 rounded-lg border transition-all ${
              theme.showHeaderIcons
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {theme.showHeaderIcons ? (
              <Eye className="w-4 h-4 text-primary" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={`text-xs font-medium ${theme.showHeaderIcons ? 'text-primary' : 'text-muted-foreground'}`}>
              {theme.showHeaderIcons ? 'Contact icons visible' : 'Contact icons hidden'}
            </span>
          </button>
        </div>
      </SectionAccordion>

      {/* Summary Style */}
      <SectionAccordion title="Summary" icon={AlignLeft}>
        <div className="flex flex-wrap gap-1.5">
          {availableSummaryStyles.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateTheme({ summaryStyle: value })}
              className={`px-3 py-2 rounded-lg border transition-all ${
                theme.summaryStyle === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Experience Style */}
      <SectionAccordion title="Experience" icon={Briefcase}>
        <div className="flex flex-wrap gap-1.5">
          {experienceStyles.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateTheme({ experienceStyle: value })}
              className={`px-3 py-2 rounded-lg border transition-all ${
                theme.experienceStyle === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Education Style */}
      <SectionAccordion title="Education" icon={GraduationCap}>
        <div className="flex flex-wrap gap-1.5">
          {educationStyles.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateTheme({ educationStyle: value })}
              className={`px-3 py-2 rounded-lg border transition-all ${
                theme.educationStyle === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SectionAccordion>

      {/* Skills Style - hidden in two-column layouts (uses compact style) */}
      {!isTwoColumn && (
        <SectionAccordion title="Skills" icon={Star}>
          <div className="grid grid-cols-3 gap-1.5">
            {skillsStyles.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateTheme({ skillsStyle: value })}
                className={`p-2 rounded-lg border transition-all text-center ${
                  theme.skillsStyle === value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <span className="text-[11px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </SectionAccordion>
      )}

      {/* Languages Style - hidden in two-column layouts (uses compact style) */}
      {!isTwoColumn && (
        <SectionAccordion title="Languages" icon={Globe}>
          <div className="grid grid-cols-2 gap-1.5">
            {languagesStyles.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updateTheme({ languagesStyle: value })}
                className={`p-2 rounded-lg border transition-all text-center ${
                  theme.languagesStyle === value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <span className="text-[11px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </SectionAccordion>
      )}
    </div>
  )
}

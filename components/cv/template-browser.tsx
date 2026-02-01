'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCVStore from '@/lib/stores/cv-store'
import { themePresets, getThemesByCategory, detectIndustryFromText, type ThemePreset } from '@/lib/cv-themes'
import type { ThemeCategory, Industry } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import {
  X,
  Check,
  Sparkles,
  Briefcase,
  Palette,
  Star,
  Search,
  Building2,
  GraduationCap,
  Heart,
  Scale,
  Code,
  Megaphone,
  PieChart,
  ShoppingBag,
  Landmark,
  Zap,
} from 'lucide-react'

interface TemplateBrowserProps {
  isOpen: boolean
  onClose: () => void
  suggestedIndustry?: Industry
}

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
      className={`relative p-4 rounded-xl border-2 transition-all text-left w-full group ${
        isActive
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50 bg-card hover:bg-muted/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          AI Pick
        </div>
      )}

      {/* Active Check */}
      {isActive && (
        <div className="absolute top-3 right-3">
          <Check className="w-5 h-5 text-primary" />
        </div>
      )}

      {/* Color Preview */}
      <div className="flex gap-1.5 mb-3">
        <div
          className="w-8 h-8 rounded-lg border border-border shadow-sm"
          style={{ backgroundColor: preset.colors.primary }}
        />
        <div
          className="w-8 h-8 rounded-lg border border-border shadow-sm"
          style={{ backgroundColor: preset.colors.accent }}
        />
        <div
          className="w-8 h-8 rounded-lg border border-border shadow-sm flex items-center justify-center text-xs font-medium"
          style={{ backgroundColor: preset.colors.background, color: preset.colors.text }}
        >
          Aa
        </div>
      </div>

      {/* Template Info */}
      <div className="flex items-start gap-2">
        <IndustryIcon
          className="w-4 h-4 mt-0.5 shrink-0"
          style={{ color: preset.colors.primary }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{preset.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{preset.description}</p>
        </div>
      </div>

      {/* Style Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}
        >
          {preset.layout}
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}
        >
          {preset.headerStyle}
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded"
          style={{ backgroundColor: `${preset.colors.primary}15`, color: preset.colors.primary }}
        >
          {preset.skillsStyle}
        </span>
      </div>
    </motion.button>
  )
}

export default function TemplateBrowser({ isOpen, onClose, suggestedIndustry }: TemplateBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { cvData, updateTheme } = useCVStore()
  const { theme } = cvData

  // Detect industry from CV content
  const detectedIndustry = useMemo(() => {
    if (suggestedIndustry) return suggestedIndustry

    const contentText = [
      cvData.summary,
      ...cvData.workExperience.map(w => `${w.position} ${w.company} ${w.description}`),
      ...cvData.skills.map(s => s.name),
    ].join(' ')

    return detectIndustryFromText(contentText)
  }, [cvData, suggestedIndustry])

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

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-background rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">Choose a Template</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {themePresets.length} templates available
                {detectedIndustry !== 'general' && (
                  <span className="ml-2 text-primary">
                    • Detected: {detectedIndustry}
                  </span>
                )}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search & Category Tabs */}
          <div className="px-6 py-4 border-b border-border space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
              >
                All Templates
              </button>
              {(Object.entries(categoryConfig) as [ThemeCategory, typeof categoryConfig.industry][]).map(
                ([category, config]) => {
                  const Icon = config.icon
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {config.label}
                    </button>
                  )
                }
              )}
            </div>
          </div>

          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No templates found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Click a template to apply it instantly. Your content will be preserved.
              </p>
              <Button variant="outline" onClick={onClose}>
                Done
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

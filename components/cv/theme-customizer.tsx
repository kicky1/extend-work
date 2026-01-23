'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCVStore from '@/lib/stores/cv-store'
import { predefinedThemes, fontOptions } from '@/lib/cv-themes'
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
  ChevronDown,
  Sparkles,
  Hash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Columns2,
  Rows2,
} from 'lucide-react'
import type { CVTheme } from '@/lib/types/cv'

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

const layoutStyles: { value: CVTheme['layout']; label: string; description: string; icon: typeof Rows2 }[] = [
  { value: 'modern', label: 'Single Column', description: 'Classic single-column layout', icon: Rows2 },
  { value: 'two-column', label: 'Two Columns', description: 'Sidebar with skills & languages', icon: Columns2 },
]

interface AccordionSectionProps {
  title: string
  icon: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

function AccordionSection({ title, icon, defaultOpen = true, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
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
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false)
  const { cvData, updateTheme } = useCVStore()
  const { theme } = cvData

  return (
    <>
      {/* Floating Button - Always visible */}
      <motion.div
        className="fixed bottom-24 right-6 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Palette className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="theme-customizer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-background border-r border-border shadow-xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Theme Customizer</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Predefined Themes */}
          <AccordionSection
            title="Preset Themes"
            icon={<Sparkles className="w-4 h-4 text-primary" />}
            defaultOpen={true}
          >
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(predefinedThemes).map(([name, themeData]) => {
                const isActive =
                  theme.colors.primary === themeData.colors.primary &&
                  theme.headerStyle === themeData.headerStyle
                return (
                  <button
                    key={name}
                    onClick={() => updateTheme(themeData)}
                    className={`relative p-3 rounded-lg border transition-all text-left ${
                      isActive
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className="flex gap-1.5 mb-2">
                      <div
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: themeData.colors.primary }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: themeData.colors.accent }}
                      />
                    </div>
                    <span className="text-sm font-medium capitalize text-foreground">
                      {name}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {themeData.headerStyle} · {themeData.skillsStyle}
                    </p>
                  </button>
                )
              })}
            </div>
          </AccordionSection>

          {/* Colors */}
          <AccordionSection
            title="Colors"
            icon={<Palette className="w-4 h-4 text-primary" />}
            defaultOpen={false}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Primary</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.primary}
                    onChange={(e) =>
                      updateTheme({ colors: { ...theme.colors, primary: e.target.value } })
                    }
                    className="w-8 h-8 rounded-md border border-border cursor-pointer"
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.colors.primary}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Accent</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.accent}
                    onChange={(e) =>
                      updateTheme({ colors: { ...theme.colors, accent: e.target.value } })
                    }
                    className="w-8 h-8 rounded-md border border-border cursor-pointer"
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.colors.accent}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Text</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.text}
                    onChange={(e) =>
                      updateTheme({ colors: { ...theme.colors, text: e.target.value } })
                    }
                    className="w-8 h-8 rounded-md border border-border cursor-pointer"
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.colors.text}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Background</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.colors.background}
                    onChange={(e) =>
                      updateTheme({ colors: { ...theme.colors, background: e.target.value } })
                    }
                    className="w-8 h-8 rounded-md border border-border cursor-pointer"
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    {theme.colors.background}
                  </span>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* Typography */}
          <AccordionSection
            title="Typography"
            icon={<Type className="w-4 h-4 text-primary" />}
            defaultOpen={false}
          >
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Heading Font</Label>
                <select
                  value={theme.fonts.heading}
                  onChange={(e) =>
                    updateTheme({ fonts: { ...theme.fonts, heading: e.target.value } })
                  }
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5">Body Font</Label>
                <select
                  value={theme.fonts.body}
                  onChange={(e) =>
                    updateTheme({ fonts: { ...theme.fonts, body: e.target.value } })
                  }
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AccordionSection>

          {/* Layout */}
          <AccordionSection
            title="Document Layout"
            icon={<Layout className="w-4 h-4 text-primary" />}
            defaultOpen={false}
          >
            <div className="space-y-4">
              {/* Layout Style */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2">Layout</Label>
                <div className="grid grid-cols-2 gap-2">
                  {layoutStyles.map(({ value, label, description, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateTheme({ layout: value })}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                        theme.layout === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Dividers */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2">Section Dividers</Label>
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
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bullet Style */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2">Bullet Points</Label>
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
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Numbers */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2">Page Numbers</Label>
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
                      <Hash className="w-4 h-4" />
                      <span className="text-sm font-medium">Show page numbers</span>
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
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AccordionSection>

              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              key="theme-customizer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

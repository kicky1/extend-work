'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCVStore from '@/lib/stores/cv-store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { AlignLeft, AlignCenter, SplitSquareHorizontal, Eye, EyeOff, Upload, X, User, ChevronDown } from 'lucide-react'
import type { CVTheme } from '@/lib/types/cv'

const headerStyles: { value: CVTheme['headerStyle']; label: string; icon: typeof AlignCenter }[] = [
  { value: 'centered', label: 'Centered', icon: AlignCenter },
  { value: 'left-aligned', label: 'Left', icon: AlignLeft },
  { value: 'split', label: 'Split', icon: SplitSquareHorizontal },
]

interface AccordionSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function AccordionSection({ title, defaultOpen = true, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
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
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PersonalInfoForm() {
  const { cvData, updatePersonalInfo, updateSummary, updateTheme } = useCVStore()
  const { personalInfo, summary } = cvData
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo({ profileImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    updatePersonalInfo({ profileImage: undefined })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4">
      <AccordionSection title="Personal Information" defaultOpen={true}>
        <div className="space-y-4">
          {/* Profile Photo - First Element */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Profile Photo</h4>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {personalInfo.profileImage ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 w-full p-4 rounded-lg border border-dashed border-border hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground">Add Profile Photo</span>
                  <p className="text-xs text-muted-foreground">Optional - appears in header</p>
                </div>
              </button>
            )}
          </div>

          <Field>
            <FieldLabel htmlFor="fullName">
              Full Name *
            </FieldLabel>
            <Input
              id="fullName"
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="John Doe"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="email">
                Email *
              </FieldLabel>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="john@example.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">
                Phone *
              </FieldLabel>
              <Input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="location">
              Location *
            </FieldLabel>
            <Input
              id="location"
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field>
              <FieldLabel htmlFor="website">
                Website
              </FieldLabel>
              <Input
                id="website"
                type="url"
                value={personalInfo.website || ''}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                placeholder="yoursite.com"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="linkedIn">
                LinkedIn
              </FieldLabel>
              <Input
                id="linkedIn"
                type="url"
                value={personalInfo.linkedIn || ''}
                onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
                placeholder="linkedin.com/in/username"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="github">
                GitHub
              </FieldLabel>
              <Input
                id="github"
                type="url"
                value={personalInfo.github || ''}
                onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                placeholder="github.com/username"
              />
            </Field>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Professional Summary" defaultOpen={true}>
        <Field>
          <FieldLabel htmlFor="summary">
            Summary
          </FieldLabel>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => updateSummary(e.target.value)}
            rows={6}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
          />
        </Field>
      </AccordionSection>

      <AccordionSection title="Header Layout" defaultOpen={false}>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Choose how your name and contact info appear
            </p>
            <div className="flex gap-2">
              {headerStyles.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateTheme({ headerStyle: value })}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                    cvData.theme.headerStyle === value
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

          {/* Show Icons Toggle */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Contact Icons</h4>
            <button
              onClick={() => updateTheme({ showHeaderIcons: !cvData.theme.showHeaderIcons })}
              className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-all ${
                cvData.theme.showHeaderIcons
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {cvData.theme.showHeaderIcons ? (
                <Eye className="w-5 h-5 text-primary" />
              ) : (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              )}
              <div className="text-left">
                <span className={`text-sm font-medium ${cvData.theme.showHeaderIcons ? 'text-primary' : 'text-foreground'}`}>
                  {cvData.theme.showHeaderIcons ? 'Icons Visible' : 'Icons Hidden'}
                </span>
                <p className="text-xs text-muted-foreground">
                  {cvData.theme.showHeaderIcons ? 'Showing icons next to contact info' : 'Text only contact info'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </AccordionSection>
    </div>
  )
}

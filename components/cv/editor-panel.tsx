'use client'

import { useState } from 'react'
import useCVStore from '@/lib/stores/cv-store'
import PersonalInfoForm from './sections/personal-info-form'
import WorkExperienceForm from './sections/work-experience-form'
import EducationForm from './sections/education-form'
import SkillsForm from './sections/skills-form'
import LanguagesForm from './sections/languages-form'
import CertificatesForm from './sections/certificates-form'
import FooterForm from './sections/footer-form'

function FormContentSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-32 bg-muted rounded" />
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-24 w-full bg-muted rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'certificates' | 'footer'

export default function EditorPanel() {
  const [activeSection, setActiveSection] = useState<Section>('personal')
  const { isInitialized } = useCVStore()

  const sections = [
    { id: 'personal' as Section, label: 'Personal Info' },
    { id: 'experience' as Section, label: 'Experience' },
    { id: 'education' as Section, label: 'Education' },
    { id: 'skills' as Section, label: 'Skills' },
    { id: 'languages' as Section, label: 'Languages' },
    { id: 'certificates' as Section, label: 'Certificates' },
    { id: 'footer' as Section, label: 'Footer' },
  ]

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Tabs */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded ${
                activeSection === section.id
                  ? 'text-primary bg-muted'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!isInitialized ? (
          <FormContentSkeleton />
        ) : (
          <>
            {activeSection === 'personal' && <PersonalInfoForm />}
            {activeSection === 'experience' && <WorkExperienceForm />}
            {activeSection === 'education' && <EducationForm />}
            {activeSection === 'skills' && <SkillsForm />}
            {activeSection === 'languages' && <LanguagesForm />}
            {activeSection === 'certificates' && <CertificatesForm />}
            {activeSection === 'footer' && <FooterForm />}
          </>
        )}
      </div>
    </div>
  )
}

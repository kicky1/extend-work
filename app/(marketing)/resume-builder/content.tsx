'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import {
  CVCreatorFeatureMockup,
  CVEvaluationFeatureMockup,
  ThemeCustomizerFeatureMockup,
  AIAssistantFeatureMockup,
} from '@/components/seo/feature-mockups'

export function ResumeBuilderContent() {
  return (
    <>
      <MarketingHero
        badge="Resume Builder"
        title="Build, evaluate, and perfect your resume with AI"
        subtitle="A complete resume toolkit — intuitive editor with live preview, AI-powered scoring and auto-fix, 30+ customizable themes, and a conversational AI assistant that writes and improves your CV for you."
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Split-screen editor with live preview"
            description="See every change in real time as you type. Our side-by-side editor shows your formatted resume updating instantly, so you never have to guess how it looks."
            bullets={[
              'Edit personal info, summary, experience, education, skills, languages, certificates, and GDPR footer',
              'Drag-and-drop reordering for experience, education, skills, languages, and certificates',
              'Real-time preview updates instantly as you type',
            ]}
            mockup={<CVCreatorFeatureMockup />}
          />

          <FeatureSection
            title="AI evaluation and resume scoring"
            description="Get an instant, detailed score for your resume based on completeness, content quality, and ATS compatibility — then fix every issue with a single click."
            bullets={[
              'Overall score based on completeness, quality, and ATS-friendliness',
              'ATS compatibility score with keyword analysis — found and suggested keywords',
              'Section-by-section scoring, strengths, and issues with severity levels',
              'One-click AI auto-fix for issues, with before/after preview and re-evaluation',
              'Optional job description input for job match scoring',
            ]}
            mockup={<CVEvaluationFeatureMockup />}
            reverse
          />

          <FeatureSection
            title="Theme customizer"
            description="Go beyond templates — fine-tune every visual detail of your resume until it looks exactly the way you want."
            bullets={[
              '30+ templates searchable by industry (tech, finance, healthcare, creative, etc.)',
              'Full color control: primary, accent, text, and background with hex input',
              'Typography, layout (single/two-column, sidebar), spacing, dividers, bullet styles, page numbers',
              'Photo styling (shape, size, border, shadow), header layout, summary style, section styles',
              'Experience, education, skills, and languages display styles (timeline, cards, pills, bars, etc.)',
            ]}
            mockup={<ThemeCustomizerFeatureMockup />}
          />

          <FeatureSection
            title="AI assistant"
            description="Chat with an AI that understands resumes. Generate content, rewrite bullets, add sections, and tailor your CV to any job — all through conversation."
            bullets={[
              'Generate an entire CV from scratch through conversation',
              'Rewrite summaries, improve bullet points, add quantified achievements',
              'Add and manage skills, certificates, languages, and experience entries',
              'Tailor content to specific job descriptions with keyword optimization',
              'Quick actions: add skill, improve summary, suggest theme, add achievement',
            ]}
            mockup={<AIAssistantFeatureMockup />}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Add your content', description: 'Fill in sections by hand or let the AI assistant generate everything.' },
          { title: 'Evaluate and improve', description: 'Get an AI score, fix issues with one click, and re-evaluate.' },
          { title: 'Customize and export', description: 'Pick a theme, fine-tune every visual detail, and download your PDF.' },
        ]}
      />

      <MarketingCTA
        title="Your best resume is one conversation away"
        subtitle="Build, score, and perfect your CV with AI — completely free."
      />
    </>
  )
}

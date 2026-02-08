'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA, RelatedToolsGrid } from '@/components/seo/marketing-page-sections'
import { CVEvaluationFeatureMockup } from '@/components/seo/feature-mockups'
import { AutoFixBeforeAfterFeatureMockup } from '@/components/seo/mockups'
import { ScanSearch, KeyRound, Target, Wrench } from 'lucide-react'

const relatedTools = [
  {
    title: 'ATS Resume Checker',
    description: 'Check if your resume passes ATS scanners with a detailed compatibility score.',
    href: '/ats-resume-checker',
    icon: ScanSearch,
  },
  {
    title: 'Resume Keyword Checker',
    description: 'Analyze keyword density and find missing keywords that ATS systems look for.',
    href: '/resume-keyword-checker',
    icon: KeyRound,
  },
  {
    title: 'Job Match Checker',
    description: 'Score how well your resume matches a specific job description.',
    href: '/resume-job-match-checker',
    icon: Target,
  }
]

export function ResumeCheckerContent() {
  return (
    <>
      <MarketingHero
        badge="Resume Checker"
        title="Score your resume and fix every issue in seconds"
        subtitle="AI-powered evaluation with scoring, ATS keyword analysis, and one-click auto-fix for every issue."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Overall score and section-by-section breakdown"
            description="See exactly where your resume stands. The AI scores your CV on completeness, content quality, and ATS-friendliness — then breaks it down section by section with individual scores, strengths, and issues."
            bullets={[
              'Overall score based on completeness, quality, and ATS-friendliness',
              'Section-by-section scoring for summary, experience, education, skills, and more',
              'Strengths highlighted per section so you know what\'s already working',
              'Issues flagged with severity levels: critical, warning, and suggestion',
              'ATS compatibility score with keyword breakdown and density analysis',
            ]}
            mockup={<CVEvaluationFeatureMockup />}
          />

          <FeatureSection
            title="One-click AI auto-fix with before/after preview"
            description="Don't just see the problems — fix them instantly. Every issue comes with a one-click fix button that rewrites the affected content using AI. Preview the before and after, apply the change, and re-evaluate to watch your score climb."
            bullets={[
              'One-click AI fix button on every detected issue',
              'Before/after preview so you see exactly what changes before applying',
              'Re-evaluate after fixes to confirm your score improved',
              'Paste a job description for targeted match scoring and keyword gap analysis',
              'AI rewrites preserve your voice while fixing the flagged problem',
            ]}
            mockup={<AutoFixBeforeAfterFeatureMockup />}
            reverse
          />
        </div>
      </section>

      <RelatedToolsGrid
        title="Dive deeper into resume analysis"
        tools={relatedTools}
      />

      <HowItWorksSection
        steps={[
          { title: 'Evaluate your resume', description: 'Run the AI checker on your CV and get an instant score with a full breakdown.' },
          { title: 'Fix issues with one click', description: 'Review flagged issues, preview AI-generated fixes, and apply them.' },
          { title: 'Re-evaluate and export', description: 'Run the checker again to confirm improvements, then download your PDF.' },
        ]}
      />

      <MarketingCTA
        title="Find out if your resume is ready"
        subtitle="Score your CV, fix every issue with AI, and re-evaluate — completely free."
      />
    </>
  )
}

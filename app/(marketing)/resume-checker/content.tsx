'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CVEvaluationFeatureMockup } from '@/components/seo/feature-mockups'

export function ResumeCheckerContent() {
  return (
    <>
      <MarketingHero
        badge="Resume Checker"
        title="Score your resume, fix every issue, and re-evaluate — in seconds"
        subtitle="Get an AI-powered evaluation with an overall score, section-by-section breakdown, ATS keyword analysis, and one-click auto-fix for every issue it finds."
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
            ]}
            mockup={<CVEvaluationFeatureMockup />}
          />

          <FeatureSection
            title="ATS compatibility and keyword analysis"
            description="Find out if your resume will pass ATS scanners before you apply. The checker analyzes keyword density, identifies found keywords, and suggests missing ones — with an optional job description input for targeted scoring."
            bullets={[
              'ATS compatibility score with detailed keyword breakdown',
              'Found keywords extracted from your resume content',
              'Suggested keywords missing from your resume that ATS systems look for',
              'Optional job description input for job-specific match scoring',
              'Keyword density analysis to avoid over-stuffing',
            ]}
            reverse
          />

          <FeatureSection
            title="One-click AI auto-fix with before/after preview"
            description="Don\'t just see the problems — fix them instantly. Every issue comes with a one-click fix button that rewrites the affected content using AI. Preview the before and after, apply the change, and re-evaluate to watch your score climb."
            bullets={[
              'One-click AI fix button on every detected issue',
              'Before/after preview so you see exactly what changes before applying',
              'Re-evaluate after fixes to confirm your score improved',
              'Fix all issues in a section at once or address them one by one',
              'AI rewrites preserve your voice while fixing the flagged problem',
            ]}
          />

          <FeatureSection
            title="Job match scoring"
            description="Paste a job description and get a dedicated match score that shows how well your resume aligns with the role. The checker identifies gaps in skills, experience, and keywords — and suggests targeted fixes to close them."
            bullets={[
              'Overall job match percentage based on requirements alignment',
              'Missing skills and qualifications flagged against the job description',
              'Keyword gap analysis specific to the target role',
              'Targeted fix suggestions to improve your match score',
            ]}
            reverse
          />
        </div>
      </section>

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

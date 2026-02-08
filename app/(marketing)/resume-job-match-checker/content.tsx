'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { JobMatchEvaluationFeatureMockup } from '@/components/seo/feature-mockups'

export function ResumeJobMatchCheckerContent() {
  return (
    <>
      <div className="px-6 pt-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/resume-checker"
            className="inline-flex items-center gap-1 text-xs text-[#5a6a6a] hover:text-[#1a2a2a] transition-colors"
          >
            Resume Evaluator <ChevronRight className="w-3 h-3" /> Job Match Checker
          </Link>
        </div>
      </div>

      <MarketingHero
        badge="Resume Job Match Checker"
        title="How well does your resume match the job?"
        subtitle="Paste a job description and get a match score instantly. See skill gaps, missing keywords, and targeted suggestions to improve your fit."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <FeatureSection
            title="Job match scoring with skill gap analysis"
            description="Paste a job description and get a dedicated match score that shows how well your resume aligns with the role. The checker breaks down your match by skills, experience, and qualifications — and identifies the gaps holding your score back."
            bullets={[
              'Overall job match percentage based on requirements alignment',
              'Skill-by-skill breakdown: matched, partially matched, and missing',
              'Experience and qualification gap analysis',
              'Keyword gap analysis specific to the target role',
              'Targeted fix suggestions ranked by impact on your match score',
              'Re-evaluate after applying fixes to track improvement',
            ]}
            mockup={<JobMatchEvaluationFeatureMockup />}
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Paste the job description', description: 'Copy the job listing and paste it alongside your resume.' },
          { title: 'Review your match score', description: 'See an overall match percentage with a breakdown by skills, experience, and keywords.' },
          { title: 'Close the gaps', description: 'Apply targeted suggestions, re-evaluate, and watch your match score climb.' },
        ]}
      />

      <MarketingCTA
        title="Know your fit before you apply"
        subtitle="Score your resume against any job description and close the gaps — completely free."
      />
    </>
  )
}

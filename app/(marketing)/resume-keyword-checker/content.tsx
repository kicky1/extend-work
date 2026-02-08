'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CVEvaluationFeatureMockup } from '@/components/seo/feature-mockups'

export function ResumeKeywordCheckerContent() {
  return (
    <>
      <div className="px-6 pt-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/resume-checker"
            className="inline-flex items-center gap-1 text-xs text-[#5a6a6a] hover:text-[#1a2a2a] transition-colors"
          >
            Resume Evaluator <ChevronRight className="w-3 h-3" /> Keyword Checker
          </Link>
        </div>
      </div>

      <MarketingHero
        badge="Resume Keyword Checker"
        title="Find the keywords your resume is missing"
        subtitle="AI-powered keyword analysis that extracts, scores, and suggests the right keywords to get your resume past ATS and in front of recruiters."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <FeatureSection
            title="Keyword extraction, density, and gap analysis"
            description="The checker scans your resume and extracts every keyword, calculates density, and compares against industry standards. Paste a job description for targeted analysis — see exactly which keywords you're missing and where to add them."
            bullets={[
              'Found keywords extracted from your resume content with frequency counts',
              'Keyword density analysis to ensure natural, non-spammy content',
              'Missing keywords suggested based on your industry and target roles',
              'Optional job description input for job-specific keyword gap analysis',
              'Priority ranking — most impactful missing keywords highlighted first',
              'Suggestions for where to naturally incorporate missing keywords',
            ]}
            mockup={<CVEvaluationFeatureMockup />}
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Upload your resume', description: 'Upload or select your resume to start the keyword analysis.' },
          { title: 'Review keyword report', description: 'See found keywords, density scores, and a list of missing keywords ranked by importance.' },
          { title: 'Optimize and re-check', description: 'Add suggested keywords to your resume, re-run the checker, and confirm your improvement.' },
        ]}
      />

      <MarketingCTA
        title="Stop guessing which keywords to use"
        subtitle="Analyze your resume keywords and find exactly what's missing — completely free."
      />
    </>
  )
}

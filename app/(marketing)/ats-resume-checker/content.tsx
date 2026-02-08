'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CVEvaluationFeatureMockup } from '@/components/seo/feature-mockups'

export function ATSResumeCheckerContent() {
  return (
    <>
      <div className="px-6 pt-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/resume-checker"
            className="inline-flex items-center gap-1 text-xs text-[#5a6a6a] hover:text-[#1a2a2a] transition-colors"
          >
            Resume Evaluator <ChevronRight className="w-3 h-3" /> ATS Checker
          </Link>
        </div>
      </div>

      <MarketingHero
        badge="ATS Resume Checker"
        title="Will your resume pass the ATS?"
        subtitle="Check ATS compatibility before you apply. Get a detailed score, find formatting issues, and ensure your resume reaches human reviewers."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <FeatureSection
            title="ATS compatibility score with detailed breakdown"
            description="Upload your resume and get an instant ATS compatibility score. The checker analyzes formatting, structure, and content to identify issues that cause ATS scanners to reject or misparse your resume — and shows you exactly how to fix them."
            bullets={[
              'ATS compatibility score based on formatting, structure, and content',
              'Detects problematic formatting: tables, headers, images, and special characters',
              'Checks section headings against ATS-recognized labels',
              'Identifies parsing issues that cause ATS systems to misread your content',
              'Suggests missing keywords that ATS scanners commonly look for',
              'Keyword density analysis to avoid over-stuffing',
            ]}
            mockup={<CVEvaluationFeatureMockup />}
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Upload your resume', description: 'Upload or select your resume — the ATS checker runs instantly.' },
          { title: 'Review the ATS score', description: 'See your compatibility score and a list of ATS issues with severity levels.' },
          { title: 'Fix and re-check', description: 'Apply the suggested fixes, re-run the checker, and confirm your score improved.' },
        ]}
      />

      <MarketingCTA
        title="Stop getting filtered out by ATS"
        subtitle="Check your resume's ATS compatibility and fix every issue — completely free."
      />
    </>
  )
}

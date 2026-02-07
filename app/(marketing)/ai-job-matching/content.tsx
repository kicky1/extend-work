'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { JobsFeatureMockup, JobDetailFeatureMockup } from '@/components/seo/feature-mockups'

export function AIJobMatchingContent() {
  return (
    <>
      <MarketingHero
        badge="AI Job Matching"
        title="Jobs picked for you — ranked by how well you fit"
        subtitle="AI reads your CV and finds the best-matching jobs every day. Search, filter, sort by match score, save jobs, and generate a cover letter — all from one board."
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="AI-powered job recommendations from your CV"
            description="Every job gets a match score based on your skills, experience, and career profile. The AI analyzes your resume and surfaces the roles you're most qualified for — updated automatically once per day."
            bullets={[
              'Match scores calculated from your CV against each job listing',
              'Recommendations refresh daily with new and updated listings',
              'Highlights matching skills and flags missing qualifications',
              'No manual searching — relevant jobs come to you',
            ]}
            mockup={<JobsFeatureMockup />}
          />

          <FeatureSection
            title="Search, sort, and filter to find the right role"
            description="Browse your matched jobs with powerful filters. Search by keyword, sort by match score, date, or salary, and filter by work type, employment type, salary range, and more."
            bullets={[
              'Sort by match score, posting date, or salary',
              'Filter by match score range and salary range',
              'Work type filter: remote, hybrid, or on-site',
              'Employment type: full-time, part-time, contractor, or temporary',
              'Toggle to show only jobs with salary information',
            ]}
            reverse
          />

          <FeatureSection
            title="Job page with actions"
            description="Open any job to see the full description, match breakdown, and matched vs. missing skills. Save it for later, or generate a tailored cover letter directly from the job page."
            bullets={[
              'Full job description with role details, salary, and work type',
              'Match score breakdown by skills, experience, and qualifications',
              'Save jobs to review or apply later',
              'Generate a cover letter tailored to this specific job in one click',
            ]}
            mockup={<JobDetailFeatureMockup />}
          />

          <FeatureSection
            title="One-click cover letter from any job"
            description="Found the right role? Generate a cover letter directly from the job listing. The AI uses your CV and the job description to write a personalized letter — ready to edit and export."
            bullets={[
              'Generate a cover letter matched to the job description and your CV',
              'AI highlights your most relevant experience for the specific role',
              'Edit in the rich text editor, then export as PDF or DOCX',
              'Works for any job in your recommendations or search results',
            ]}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Build your CV', description: 'Create or upload your resume — the AI starts matching immediately.' },
          { title: 'Browse your matches', description: 'Search, filter, and sort jobs ranked by how well you fit.' },
          { title: 'Save, apply, or generate a cover letter', description: 'Take action on any job — save it, open it, or create a tailored cover letter.' },
        ]}
      />

      <MarketingCTA
        title="Let AI find the jobs you deserve"
        subtitle="Get daily job recommendations matched to your CV — completely free."
      />
    </>
  )
}

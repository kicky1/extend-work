'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { JobsFeatureMockup, JobDetailFeatureMockup } from '@/components/seo/feature-mockups'

export function AIJobMatchingContent() {
  return (
    <>
      <MarketingHero
        badge="AI Job Matching"
        title="Jobs ranked by how well you fit"
        subtitle="AI finds the best-matching jobs from your CV. Search, filter, sort by match score, and generate a cover letter."
        videoSrc="https://utfs.io/f/zGi357RvYr0HqQNkqPwxjNOLveHQlomMazSIRC8h5pifnYJ2"
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
              'Sort by match score, posting date, or salary — filter by work type, salary range, and more',
            ]}
            mockup={<JobsFeatureMockup />}
          />

          <FeatureSection
            title="Job page with actions"
            description="Open any job to see the full description, match breakdown, and matched vs. missing skills. Save it for later, or generate a tailored cover letter directly from the job page — the AI uses your CV and the job description to write a personalized letter."
            bullets={[
              'Full job description with role details, salary, and work type',
              'Match score breakdown by skills, experience, and qualifications',
              'Save jobs to review or apply later',
              'Generate a cover letter tailored to this specific job in one click',
              'Edit in the rich text editor, then export as PDF or DOCX',
            ]}
            mockup={<JobDetailFeatureMockup />}
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

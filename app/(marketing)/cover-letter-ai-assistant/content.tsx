'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CoverLetterFeatureMockup, CoverLetterAIFeatureMockup } from '@/components/seo/feature-mockups'

export function CoverLetterAIAssistantContent() {
  return (
    <>
      <MarketingHero
        badge="Cover Letter AI Assistant"
        title="AI that writes your cover letter"
        subtitle="Chat with an AI assistant that generates, rewrites, and tailors cover letters using your CV — all through conversation."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Generate a full cover letter from your CV"
            description="Tell the AI a job title, company name, and any details — it reads your resume and drafts a complete, tailored cover letter. No templates, no copy-pasting. Just a conversation that produces a ready-to-send letter."
            bullets={[
              'Generates a full cover letter from your CV data and a job description',
              'References your actual experience, skills, and achievements',
              'Adapts tone and style to the company and industry',
              'Always in sync — pulls fresh data from your CV automatically',
              'Produces a polished letter in seconds, not hours',
            ]}
            mockup={<CoverLetterAIFeatureMockup />}
          />

          <FeatureSection
            title="Tailor and refine for any job"
            description="Paste a job description and the AI analyzes requirements, identifies keyword gaps, and rewrites your cover letter to match. Rewrite paragraphs, adjust tone, expand on specific achievements, or shorten verbose sections — all through conversation."
            bullets={[
              'Analyzes job requirements and matches them to your experience',
              'Identifies missing keywords and suggests targeted additions',
              'Rewrite individual paragraphs with specific instructions',
              'Adjust tone — more formal, more conversational, more confident',
              'Ensures consistency between your cover letter and resume',
            ]}
            mockup={<CoverLetterFeatureMockup />}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Provide the context', description: 'Share a job title, company name, or paste a job description to get started.' },
          { title: 'Generate and refine', description: 'The AI drafts your cover letter from your CV. Edit, rewrite, and tailor through chat.' },
          { title: 'Export and apply', description: 'Download your finished cover letter as PDF or DOCX and apply.' },
        ]}
      />

      <MarketingCTA
        title="Write cover letters that get interviews"
        subtitle="Generate a tailored cover letter from your CV and any job description — completely free."
      />
    </>
  )
}

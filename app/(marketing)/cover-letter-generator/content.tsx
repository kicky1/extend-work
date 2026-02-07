'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CoverLetterFeatureMockup, CoverLetterAIFeatureMockup } from '@/components/seo/feature-mockups'

export function CoverLetterGeneratorContent() {
  return (
    <>
      <MarketingHero
        badge="Cover Letter Generator"
        title="Write the perfect cover letter — by hand or with AI"
        subtitle="A rich text editor with live preview and PDF/DOCX export, plus an AI agent that drafts, rewrites, and tailors your cover letter using your CV and the job you're applying to."
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Rich text editor with live preview"
            description="Write your cover letter in a full-featured editor on the left and see a formatted preview on the right — updating in real time as you type. When you're done, export as PDF or DOCX."
            bullets={[
              'Split-screen layout: rich text editor on the left, formatted letter preview on the right',
              'Full formatting toolbar — bold, italic, underline, lists, and more',
              'Real-time preview updates instantly as you type',
              'Export as PDF or DOCX with a single click',
            ]}
            mockup={<CoverLetterFeatureMockup />}
          />

          <FeatureSection
            title="AI agent that writes your cover letter"
            description="Tell the AI what you need and it drafts a complete cover letter using your CV data. Provide a job title, company name, and any details — the AI builds a tailored letter from your experience and the role's requirements."
            bullets={[
              'Generates a full cover letter from your CV, job title, and company name',
              'Uses your resume data to highlight the most relevant experience and skills',
              'Tell the AI what to change — rewrite paragraphs, adjust tone, add details',
              'Adapts writing style to the company culture and industry',
            ]}
            mockup={<CoverLetterAIFeatureMockup />}
            reverse
          />

          <FeatureSection
            title="One click from any job listing"
            description="Found a job you like? Click to generate a cover letter directly from the job page. The AI pulls the job description, matches it with your CV, and creates a cover letter specifically tailored to that role."
            bullets={[
              'Generate a cover letter directly from any job listing in the job board',
              'AI extracts requirements from the job description automatically',
              'Matches your experience and skills to the specific role',
              'Cover letter is ready to review, edit, and export in seconds',
            ]}
          />

          <FeatureSection
            title="Built on your CV — always consistent"
            description="The AI reads your entire resume so your cover letter and CV tell a cohesive story. It references your actual achievements, skills, and experience — no generic filler."
            bullets={[
              'Automatically pulls data from your CV — experience, skills, education, and summary',
              'References specific achievements and metrics from your resume',
              'Ensures consistency between your cover letter and CV content',
              'Updates when your CV changes — regenerate any time with fresh data',
            ]}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Provide the context', description: 'Enter a job title and company, paste a job description, or click from a job listing.' },
          { title: 'Generate or write', description: 'Let the AI draft your letter from your CV — or write it yourself in the editor.' },
          { title: 'Export and apply', description: 'Review, edit, and download as PDF or DOCX.' },
        ]}
      />

      <MarketingCTA
        title="Your next cover letter is one click away"
        subtitle="Generate a tailored cover letter from your CV and any job description — completely free."
      />
    </>
  )
}

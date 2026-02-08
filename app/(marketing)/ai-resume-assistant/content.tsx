'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { AIAssistantFeatureMockup, CVCreatorFeatureMockup } from '@/components/seo/feature-mockups'

export function AIResumeAssistantContent() {
  return (
    <>
      <MarketingHero
        badge="AI Resume Assistant"
        title="Your trusted AI resume assistant"
        subtitle="Chat with an AI that generates, rewrites, and tailors your resume — all through conversation."
        videoSrc=""
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Generate a full CV through conversation"
            description="Start from nothing and build a complete resume just by chatting. The AI asks the right questions, structures your answers, and fills in every section — personal info, summary, experience, education, skills, and more."
            bullets={[
              'Build a complete CV from scratch without typing into a single form field',
              'AI asks targeted questions about your background and career goals',
              'Generates professional summaries, experience bullets, and skills automatically',
              'Adapts tone and language to your industry and seniority level',
              'Quick actions: add skill, improve summary, suggest theme, add achievement',
            ]}
            mockup={<AIAssistantFeatureMockup />}
          />

          <FeatureSection
            title="Rewrite, tailor, and improve any section"
            description="Paste in weak bullet points or a job description and get polished, achievement-focused rewrites instantly. The AI adds quantified results, stronger action verbs, and industry-specific language — and tailors your content to match what hiring managers are looking for."
            bullets={[
              'Turn vague responsibilities into quantified achievements',
              'Rewrite professional summaries to highlight your strongest selling points',
              'Paste a job description and get keyword gap analysis with targeted rewrites',
              'Adjusts skills section to match the role\'s tech stack and qualifications',
              'Every change previews live on your resume before you confirm',
            ]}
            mockup={<CVCreatorFeatureMockup />}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Start a conversation', description: 'Tell the AI about your background — or paste a job description to get started.' },
          { title: 'Review and refine', description: 'The AI generates content. Pick what you like, request rewrites, and fine-tune.' },
          { title: 'Apply the changes', description: 'Every suggestion updates your resume live. Export when you\'re happy.' },
        ]}
      />

      <MarketingCTA
        title="Stop writing your resume alone"
        subtitle="Chat with an AI that turns your experience into a polished, job-ready CV — completely free."
      />
    </>
  )
}

'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { AIAssistantFeatureMockup } from '@/components/seo/feature-mockups'

export function AIResumeAssistantContent() {
  return (
    <>
      <MarketingHero
        badge="AI Resume Assistant"
        title="Your resume, written by AI — guided by you"
        subtitle="Have a conversation with an AI that understands resumes. Generate content from scratch, rewrite weak sections, tailor to job descriptions, and manage every detail — all through chat."
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
            ]}
            mockup={<AIAssistantFeatureMockup />}
          />

          <FeatureSection
            title="Rewrite and improve any section"
            description="Paste in weak bullet points or vague descriptions and get polished, achievement-focused rewrites instantly. The AI adds quantified results, stronger action verbs, and industry-specific language."
            bullets={[
              'Turn vague responsibilities into quantified achievements',
              'Rewrite professional summaries to highlight your strongest selling points',
              'Improve individual bullet points with stronger action verbs and metrics',
              'Generate multiple variations so you can pick the best one',
            ]}
            reverse
          />

          <FeatureSection
            title="Tailor your resume to any job"
            description="Paste a job description and the AI analyzes keyword gaps, suggests content changes, and rewrites sections to match what the hiring manager is looking for — maximizing your ATS compatibility."
            bullets={[
              'Keyword gap analysis — found keywords and suggested additions',
              'Rewrites experience bullets to align with job requirements',
              'Adjusts skills section to match the role\'s tech stack and qualifications',
              'Optimizes content for ATS scanners while keeping it natural for human readers',
            ]}
          />

          <FeatureSection
            title="Manage sections with quick actions"
            description="Skip the back-and-forth — use quick action chips to add skills, certificates, languages, and experience entries in one tap. The AI fills in the details and you approve the changes."
            bullets={[
              'Quick actions: add skill, improve summary, suggest theme, add achievement',
              'Add and manage experience, education, certificates, and language entries',
              'Bulk-add skills by pasting a job description or listing them in chat',
              'Every change previews live on your resume before you confirm',
            ]}
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

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CalendarFeatureMockup } from '@/components/seo/feature-mockups'
import { easeOut } from './constants'
import { FeatureShowcase } from './feature-showcase'
import {
  CVCreatorFeatureMockup,
  CVEvaluationFeatureMockup,
  JobsFeatureMockup,
  CoverLetterFeatureMockup,
  EmailsFeatureMockup,
} from './mockups'

export function FeaturesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            Built for your entire job search
          </h2>
          <p className="text-[#5a6a6a] text-lg max-w-xl mx-auto">
            See how each module helps you move forward
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-20 lg:space-y-28">
          <FeatureShowcase
            title="Craft the perfect resume"
            description="Choose from 80+ professionally designed templates, fully customize fonts, colors and layouts, and let AI handle the writing. Add a GDPR/RODO consent footer for EU applications — all in a split-screen editor with live preview."
            bullets={[
              '80+ themes with AI-recommended picks',
              'Full style customization (fonts, colors, layouts)',
              'GDPR / RODO consent footer for EU',
              'AI assistant for writing and editing',
            ]}
            mockup={<CVCreatorFeatureMockup />}
          />

          <FeatureShowcase
            title="Evaluate your CV instantly"
            description="Get a detailed AI-powered evaluation of your resume with scores, issue detection, and one-click fixes. See exactly what to improve to stand out."
            bullets={[
              'Overall, ATS, and keyword scores',
              'Issue detection with severity levels',
              'AI-powered one-click fixes',
            ]}
            mockup={<CVEvaluationFeatureMockup />}
            reverse
          />

          <FeatureShowcase
            title="Find jobs that match your skills"
            description="Our AI analyzes your CV and searches for the most relevant job opportunities with match scores. Browse detailed job listings and easily check if a role is the right fit."
            bullets={[
              'AI-powered match scoring',
              'Advanced filters and saved searches',
              'Easy job details review',
            ]}
            mockup={<JobsFeatureMockup />}
          />

          <FeatureShowcase
            title="Tailor your cover letter"
            description="Generate a job-specific cover letter in one click from any job listing. Edit it in a rich text editor with live preview, or let the AI assistant refine it for you."
            bullets={[
              'One-click generation from job listings',
              'Rich text editor with live preview',
              'AI assistant for refinement',
            ]}
            mockup={<CoverLetterFeatureMockup />}
            reverse
          />

          <FeatureShowcase
            title="Manage all your conversations"
            description="Keep every job search email in one place. View threads, compose replies, star important messages, and never miss an important conversation with recruiters."
            bullets={[
              'Gmail and Outlook integration',
              'Thread-based conversation view',
              'Star, search and filter messages',
            ]}
            mockup={<EmailsFeatureMockup />}
          />

          <FeatureShowcase
            title="Track interviews & schedule"
            description="See all your interviews on a monthly calendar with Google Calendar sync. Track every recruitment process from application to offer, and let AI schedule, reschedule, or cancel calls for you."
            bullets={[
              'Google Calendar two-way sync',
              'Video, phone and onsite call types',
              'Recruitment pipeline tracking',
              'AI-powered scheduling and management',
            ]}
            mockup={<CalendarFeatureMockup />}
            reverse
          />
        </div>
      </div>
    </section>
  )
}

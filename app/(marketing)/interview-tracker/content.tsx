'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { CalendarFeatureMockup, InterviewScheduleFeatureMockup, CalendarAIAssistantFeatureMockup } from '@/components/seo/feature-mockups'

export function InterviewTrackerContent() {
  return (
    <>
      <MarketingHero
        badge="Interview Tracker"
        title="Schedule, track, and manage every interview — with AI"
        subtitle="A full calendar with Google Calendar sync, interview scheduling, outcome tracking, application timelines, and an AI assistant that manages it all through conversation."
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Calendar with Google Calendar sync"
            description="View all your interviews in a calendar that syncs with Google Calendar. When you schedule or update an interview here, it automatically appears in your Google Calendar."
            bullets={[
              'One-way sync — interviews added here appear in your Google Calendar automatically',
              'See upcoming interviews at a glance with color-coded event types',
              'Click any day to schedule a new interview directly from the calendar',
            ]}
            mockup={<CalendarFeatureMockup />}
          />

          <FeatureSection
            title="Schedule and manage interviews"
            description="Click to schedule a new interview — choose phone, video, or on-site, set the time, duration, and timezone, add a meeting link, interviewer details, and notes. After the interview, record the outcome, reschedule, or cancel."
            bullets={[
              'Interview types: phone, video, or on-site',
              'Set time, duration, timezone, and add meeting links',
              'Add interviewer information and notes',
              'Record outcome, reschedule, or cancel any interview',
              'View the full interview process for each application',
            ]}
            mockup={<InterviewScheduleFeatureMockup />}
            reverse
          />

          <FeatureSection
            title="Application timeline and next steps"
            description="Track your progress through each job application in a timeline view. See every stage from first contact to final decision, set next steps that auto-add to your calendar, and mark outcomes — accepted, rejected, or withdrawn."
            bullets={[
              'Timeline view of every stage in your application process',
              'Set next steps that automatically add to your calendar',
              'Mark applications as accepted, rejected, or withdrawn',
              'Track multiple application pipelines simultaneously',
            ]}
          />

          <FeatureSection
            title="AI assistant for your calendar"
            description="Skip the forms — just tell the AI what you need. Add interviews, update times, cancel meetings, reschedule, record outcomes, and manage everything by typing in natural language. Whatever you can do manually, the AI can do for you."
            bullets={[
              'Add, update, reschedule, and cancel interviews through conversation',
              'Record outcomes and set next steps by typing',
              'Manage interviewer details, meeting links, and notes via chat',
              'Everything the AI adds syncs to your Google Calendar automatically',
            ]}
            mockup={<CalendarAIAssistantFeatureMockup />}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Connect Google Calendar', description: 'Sync so every interview you add here appears in your Google Calendar.' },
          { title: 'Schedule and track', description: 'Add interviews manually or through the AI assistant — track outcomes and next steps.' },
          { title: 'Manage with AI', description: 'Type what you need — the AI handles scheduling, updates, and cancellations for you.' },
        ]}
      />

      <MarketingCTA
        title="Let AI manage your interview schedule"
        subtitle="Schedule, track, and manage every interview from one calendar — completely free."
      />
    </>
  )
}

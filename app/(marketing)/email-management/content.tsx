'use client'

import { MarketingHero, FeatureSection, HowItWorksSection, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { EmailsFeatureMockup, EmailComposeFeatureMockup } from '@/components/seo/feature-mockups'

export function EmailManagementContent() {
  return (
    <>
      <MarketingHero
        badge="Email Management"
        title="Your job search inbox — all in one place"
        subtitle="Sync Gmail or Outlook and manage every email without leaving the platform. Read, compose, reply, search, star, use templates — a full email system built into your job search toolkit."
      />

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 lg:space-y-28">
          <FeatureSection
            title="Gmail and Outlook sync"
            description="Connect your Gmail or Outlook account and your emails sync automatically. Read, reply, and compose — all without switching to another tab. Your inbox stays in sync both ways."
            bullets={[
              'One-click integration with Gmail and Microsoft Outlook',
              'Full two-way sync — changes reflect in both places',
              'Read, reply, and compose emails directly in the platform',
              'View sent, starred, and inbox folders in one interface',
            ]}
            mockup={<EmailsFeatureMockup />}
          />

          <FeatureSection
            title="Search, star, and organize"
            description="Find any email instantly with full-text search. Star important conversations to access them quickly, and browse by inbox, sent, or starred — just like your regular email client."
            bullets={[
              'Full-text search across all synced emails',
              'Star emails to mark important conversations',
              'Browse inbox, sent, and starred folders',
              'Threaded conversation view for each contact',
            ]}
            reverse
          />

          <FeatureSection
            title="Compose and reply with templates"
            description="Write new emails or reply to conversations with a full compose editor. Use pre-built email templates for common scenarios — follow-ups, thank-yous, scheduling calls, and more — to reply faster."
            bullets={[
              'Full compose editor for new emails and replies',
              'Email templates for follow-ups, thank-yous, scheduling, and more',
              'Insert templates with one click and customize before sending',
              'Reply directly from any conversation thread',
            ]}
            mockup={<EmailComposeFeatureMockup />}
          />

          <FeatureSection
            title="Everything in one place"
            description="Stop switching between your email, job board, calendar, and resume editor. With email built into your job search toolkit, every conversation is right next to the jobs, CVs, and cover letters they relate to."
            bullets={[
              'Email lives alongside your CV, jobs, cover letters, and calendar',
              'No context switching — read a recruiter email and update your CV in the same tab',
              'Keep your entire job search workflow in a single platform',
              'Works with your existing email — nothing to migrate',
            ]}
            reverse
          />
        </div>
      </section>

      <HowItWorksSection
        steps={[
          { title: 'Connect your email', description: 'Sync your Gmail or Outlook account with one click.' },
          { title: 'Read, reply, and compose', description: 'Manage all your emails directly in the platform — search, star, and use templates.' },
          { title: 'Stay organized', description: 'Keep every job search conversation next to your CV, jobs, and cover letters.' },
        ]}
      />

      <MarketingCTA
        title="Bring your inbox into your job search"
        subtitle="Sync Gmail or Outlook and manage every email in one place — completely free."
      />
    </>
  )
}

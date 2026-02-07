import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { InterviewTrackerContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'interview-tracker',
  'Interview Tracker — Track Interviews & Prep With AI | Extend Career',
  'Track all your interviews, get AI-generated prep materials, and never miss a follow-up. Calendar sync, reminders, and progress tracking in one tool.',
)

export default function InterviewTrackerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Interview Tracker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Interview tracking tool with calendar sync, AI prep materials, and automated reminders.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <InterviewTrackerContent />
    </>
  )
}

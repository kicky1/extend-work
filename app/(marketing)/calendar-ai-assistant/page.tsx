import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { CalendarAIAssistantContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'calendar-ai-assistant',
  'Calendar AI Assistant — Smart Interview Scheduling | Extend Career',
  'AI assistant for managing your interview calendar. Schedule interviews, get reminders, and stay organized through your job search.',
)

export default function CalendarAIAssistantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Calendar AI Assistant',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered calendar assistant for scheduling interviews and managing your job search timeline.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <CalendarAIAssistantContent />
    </>
  )
}

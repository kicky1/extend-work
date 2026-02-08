import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { CoverLetterAIAssistantContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'cover-letter-ai-assistant',
  'Cover Letter AI Assistant — Write Tailored Cover Letters | Extend Career',
  'Chat with an AI that writes, rewrites, and tailors your cover letter using your CV data. Generate job-specific cover letters in seconds.',
)

export default function CoverLetterAIAssistantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Cover Letter AI Assistant',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered cover letter writing assistant that generates and tailors cover letters from your CV.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <CoverLetterAIAssistantContent />
    </>
  )
}

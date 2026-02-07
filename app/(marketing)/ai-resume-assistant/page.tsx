import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { AIResumeAssistantContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'ai-resume-assistant',
  'AI Resume Assistant — Smart Writing Suggestions | Extend Career',
  'Get AI-powered writing suggestions for every section of your resume. Improve bullet points, tailor content to job descriptions, and stand out to recruiters.',
)

export default function AIResumeAssistantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career AI Resume Assistant',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered resume writing assistant that improves your content and tailors it to job descriptions.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <AIResumeAssistantContent />
    </>
  )
}

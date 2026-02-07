import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { AIJobMatchingContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'ai-job-matching',
  'AI Job Matching — Find Jobs That Fit Your Skills | Extend Career',
  'Discover jobs that match your skills and experience with AI-powered scoring. Get personalized job recommendations from multiple sources in one dashboard.',
)

export default function AIJobMatchingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career AI Job Matching',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered job matching that analyzes your resume and finds the most relevant opportunities with match scores.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <AIJobMatchingContent />
    </>
  )
}

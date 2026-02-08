import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { ResumeKeywordCheckerContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'resume-keyword-checker',
  'Resume Keyword Checker — Find Missing Keywords | Extend Career',
  'Analyze your resume keywords with our free AI tool. Find missing keywords, check density, and optimize your resume for ATS systems and recruiters.',
)

export default function ResumeKeywordCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Resume Keyword Checker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Free AI-powered resume keyword analyzer that identifies missing keywords and optimizes keyword density.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ResumeKeywordCheckerContent />
    </>
  )
}

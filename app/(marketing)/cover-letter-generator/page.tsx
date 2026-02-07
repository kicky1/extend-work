import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { CoverLetterGeneratorContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'cover-letter-generator',
  'AI Cover Letter Generator — Tailored Cover Letters in Minutes | Extend Career',
  'Generate personalized cover letters matched to any job description. Our AI writes compelling, professional cover letters that complement your resume.',
)

export default function CoverLetterGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Cover Letter Generator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered cover letter generator that creates personalized, job-matched cover letters.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <CoverLetterGeneratorContent />
    </>
  )
}

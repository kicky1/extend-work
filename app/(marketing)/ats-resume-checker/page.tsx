import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { ATSResumeCheckerContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'ats-resume-checker',
  'Free ATS Resume Checker — Check ATS Compatibility | Extend Career',
  'Check if your resume passes ATS scanners with our free AI-powered ATS checker. Get a compatibility score, find missing keywords, and fix formatting issues.',
)

export default function ATSResumeCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career ATS Resume Checker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Free AI-powered ATS resume checker that scores your resume for ATS compatibility and suggests improvements.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ATSResumeCheckerContent />
    </>
  )
}

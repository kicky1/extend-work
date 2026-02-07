import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { ResumeCheckerContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'resume-checker',
  'Free Resume Checker — Score & Improve Your Resume | Extend Career',
  'Get an instant score for your resume with our free AI resume checker. Identify issues, get actionable fix suggestions, and improve your chances of landing interviews.',
)

export default function ResumeCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Resume Checker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Free AI-powered resume checker that scores your resume and provides actionable improvement suggestions.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ResumeCheckerContent />
    </>
  )
}

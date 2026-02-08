import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { ResumeJobMatchCheckerContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'resume-job-match-checker',
  'Resume Job Match Checker — Score Your Fit | Extend Career',
  'Get a match score showing how well your resume aligns with any job description. Identify skill gaps, missing keywords, and get targeted fix suggestions.',
)

export default function ResumeJobMatchCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Resume Job Match Checker',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Free AI tool that scores how well your resume matches a job description and suggests improvements.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ResumeJobMatchCheckerContent />
    </>
  )
}

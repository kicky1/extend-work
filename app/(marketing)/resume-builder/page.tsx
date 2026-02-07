import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { ResumeBuilderContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'resume-builder',
  'Free AI Resume Builder — Create Professional Resumes | Extend Career',
  'Build a professional, ATS-optimized resume in minutes with our free AI resume builder. 30+ templates, real-time preview, and one-click PDF export.',
)

export default function ResumeBuilderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Resume Builder',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-powered resume builder with 30+ professional templates and real-time preview.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <ResumeBuilderContent />
    </>
  )
}

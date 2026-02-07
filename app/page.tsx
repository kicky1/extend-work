import type { Metadata } from 'next'
import { LandingContent } from './landing-content'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function LandingPage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Extend Career',
        url: siteUrl,
        description:
          'AI-powered career management platform for resumes, job matching, email management, and interview tracking.',
      },
      {
        '@type': 'WebSite',
        name: 'Extend Career',
        url: siteUrl,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Extend Career',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Craft ATS-optimized resumes, discover AI-matched jobs, manage recruiter emails, and track interviews.',
        offers: [
          {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free plan with CV editing and basic templates',
          },
          {
            '@type': 'Offer',
            price: '19.99',
            priceCurrency: 'USD',
            description: 'Pro plan — unlimited resumes, AI features, job matching, and email integration',
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingContent />
    </>
  )
}

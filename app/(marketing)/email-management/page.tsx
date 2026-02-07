import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { EmailManagementContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'email-management',
  'Recruitment Email Management — All Job Emails in One Place | Extend Career',
  'Manage all your recruitment emails and conversations in one place. Sync Gmail and Outlook, use reply templates, and never miss a recruiter message.',
)

export default function EmailManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Extend Career Email Management',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Recruitment email management tool that syncs Gmail and Outlook to keep all job search communications in one place.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <EmailManagementContent />
    </>
  )
}

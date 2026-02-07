import type { Metadata } from 'next'
import { generateMarketingPageMetadata } from '@/lib/seo/metadata'
import { PricingContent } from './content'

export const metadata: Metadata = generateMarketingPageMetadata(
  'pricing',
  'Pricing — Free & Pro Plans | Extend Career',
  'Simple, transparent pricing for your career toolkit. Start free with 3 resumes and basic templates, or upgrade to Pro for unlimited resumes, AI features, and ATS optimization.',
)

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Extend Career Pricing',
            description: 'Simple, transparent pricing. Start free or upgrade to Pro.',
            offers: [
              {
                '@type': 'Offer',
                name: 'Free',
                price: '0',
                priceCurrency: 'USD',
                description: 'Get started with 3 resumes, basic templates, and PDF export.',
              },
              {
                '@type': 'Offer',
                name: 'Pro',
                price: '19.99',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '19.99',
                  priceCurrency: 'USD',
                  billingDuration: 'P1M',
                },
                description: 'Unlimited resumes, AI features, ATS optimization, and priority support.',
              },
            ],
          }),
        }}
      />
      <PricingContent />
    </>
  )
}

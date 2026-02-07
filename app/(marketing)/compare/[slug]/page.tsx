import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { competitors, getCompetitor } from '@/lib/seo/data/competitors'
import { extendCareer } from '@/lib/seo/data/extend-career'
import { generateCompareMetadata } from '@/lib/seo/metadata'
import { competitorSlugToCompareSlug, parseCompareSlug } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { LastUpdatedBadge } from '@/components/seo/last-updated-badge'
import { FeatureComparisonTable } from '@/components/seo/feature-comparison-table'
import { PricingComparison } from '@/components/seo/pricing-comparison'
import { RatingBadges } from '@/components/seo/rating-badges'
import { ProsCons } from '@/components/seo/pros-cons'
import { FAQSection } from '@/components/seo/faq-section'
import { MarketingCTA } from '@/components/seo/marketing-cta'
import { RelatedPages, type RelatedPage } from '@/components/seo/related-pages'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getCompetitorFromSlug(slug: string) {
  const parsed = parseCompareSlug(slug)
  if (!parsed) return null
  return getCompetitor(parsed.competitor)
}

export async function generateStaticParams() {
  return competitors.map((c) => ({
    slug: competitorSlugToCompareSlug(c.slug),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const competitor = getCompetitorFromSlug(slug)
  if (!competitor) return {}
  return generateCompareMetadata(competitor.name, slug)
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params
  const competitor = getCompetitorFromSlug(slug)
  if (!competitor) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const relatedPages: RelatedPage[] = competitor.relatedSlugs
    .reduce<RelatedPage[]>((acc, s) => {
      const c = getCompetitor(s)
      if (c) {
        acc.push({
          title: `Extend Career vs ${c.name}`,
          href: `/compare/${competitorSlugToCompareSlug(s)}`,
          description: c.quickVerdict,
        })
      }
      return acc
    }, [])
    .slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Extend Career vs ${competitor.name}`,
    url: `${siteUrl}/compare/${slug}`,
    description: `Detailed comparison of Extend Career and ${competitor.name}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          name: 'Extend Career',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
        },
        {
          '@type': 'SoftwareApplication',
          name: competitor.name,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          ...(competitor.website ? { url: competitor.website } : {}),
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-6 py-8 max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Compare', href: '/compare' },
            { label: `vs ${competitor.name}` },
          ]}
        />

        {/* Hero */}
        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <LastUpdatedBadge date={competitor.updatedAt} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            Extend Career vs {competitor.name}
          </h1>
          <p className="text-lg text-[#5a6a6a] leading-relaxed max-w-2xl">
            {competitor.quickVerdict}
          </p>
        </header>

        {/* Feature Comparison */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Feature Comparison
          </h2>
          <FeatureComparisonTable
            extendFeatures={extendCareer.features}
            competitorFeatures={competitor.features}
            competitorName={competitor.name}
          />
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Pricing Comparison
          </h2>
          <PricingComparison
            extendPricing={extendCareer.pricing}
            competitorPricing={competitor.pricing}
            competitorName={competitor.name}
          />
        </section>

        {/* Detailed Breakdown */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">
            {competitor.name}: Detailed Review
          </h2>
          <div className="prose prose-sm max-w-none text-[#3a4a4a] leading-relaxed whitespace-pre-line">
            {competitor.detailedBreakdown}
          </div>
        </section>

        {/* Ratings */}
        {competitor.ratings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
              User Ratings
            </h2>
            <RatingBadges ratings={competitor.ratings} />
          </section>
        )}

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            {competitor.name} Pros & Cons
          </h2>
          <ProsCons
            name={competitor.name}
            pros={competitor.pros}
            cons={competitor.cons}
          />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Frequently Asked Questions
          </h2>
          <FAQSection
            faqs={competitor.faqs}
            pageUrl={`${siteUrl}/compare/${slug}`}
          />
        </section>

        {/* CTA */}
        <MarketingCTA
          title={`Ready to try Extend Career?`}
          description={`See why job seekers are choosing Extend Career over ${competitor.name}.`}
        />

        {/* Related Comparisons */}
        {relatedPages.length > 0 && (
          <section className="mt-12">
            <RelatedPages
              title="Related Comparisons"
              pages={relatedPages}
            />
          </section>
        )}
      </article>
    </>
  )
}

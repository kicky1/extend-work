import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { competitors, getCompetitor } from '@/lib/seo/data/competitors'
import { extendCareer } from '@/lib/seo/data/extend-career'
import { generateAlternativesMetadata } from '@/lib/seo/metadata'
import { competitorSlugToCompareSlug } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { LastUpdatedBadge } from '@/components/seo/last-updated-badge'
import { FeatureComparisonTable } from '@/components/seo/feature-comparison-table'
import { FAQSection } from '@/components/seo/faq-section'
import { MarketingCTA } from '@/components/seo/marketing-cta'
import { RelatedPages, type RelatedPage } from '@/components/seo/related-pages'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const competitor = getCompetitor(slug)
  if (!competitor) return {}
  return generateAlternativesMetadata(competitor.name, slug)
}

export default async function AlternativesPage({ params }: PageProps) {
  const { slug } = await params
  const competitor = getCompetitor(slug)
  if (!competitor) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const alternatives = [
    extendCareer,
    ...competitor.relatedSlugs
      .map(getCompetitor)
      .filter((c): c is NonNullable<typeof c> => c !== undefined && c.slug !== slug),
  ].slice(0, 5)

  const relatedPages: RelatedPage[] = competitor.relatedSlugs
    .reduce<RelatedPage[]>((acc, s) => {
      const c = getCompetitor(s)
      if (c) {
        acc.push({
          title: `${c.name} Alternatives`,
          href: `/alternatives/${s}`,
          description: `Best alternatives to ${c.name}`,
        })
      }
      return acc
    }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${competitor.name} Alternatives`,
    url: `${siteUrl}/alternatives/${slug}`,
    itemListElement: alternatives.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: alt.name,
        applicationCategory: 'BusinessApplication',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-6 py-8 max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Alternatives', href: '/alternatives' },
            { label: `${competitor.name} Alternatives` },
          ]}
        />

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <LastUpdatedBadge date={competitor.updatedAt} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            Best {competitor.name} Alternatives in {new Date().getFullYear()}
          </h1>
          <p className="text-lg text-[#5a6a6a] leading-relaxed max-w-2xl">
            Looking for a {competitor.name} alternative? Here are the best options
            for job seekers who need more features, better pricing, or a different approach.
          </p>
        </header>

        {/* Why People Switch */}
        {competitor.whyPeopleSwitch && competitor.whyPeopleSwitch.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">
              Why People Look for {competitor.name} Alternatives
            </h2>
            <div className="space-y-3">
              {competitor.whyPeopleSwitch.map((reason, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/30"
                >
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#3a4a4a]">{reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top Alternatives */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Top {competitor.name} Alternatives
          </h2>
          <div className="space-y-6">
            {alternatives.map((alt, i) => (
              <div
                key={alt.slug}
                className={`p-6 rounded-2xl border ${
                  i === 0
                    ? 'border-[#1a4a4a] bg-white shadow-lg'
                    : 'border-[#e8e4df] bg-[#faf9f7]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a4a4a] text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-[#1a2a2a]">
                        {alt.name}
                      </h3>
                      {i === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          Best Alternative
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#5a6a6a]">{alt.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-[#3a4a4a] mb-3">{alt.bestFor}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {alt.pros.slice(0, 3).map((pro, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs"
                    >
                      <Check className="w-3 h-3" />
                      {pro.split(' ').slice(0, 5).join(' ')}
                    </span>
                  ))}
                </div>
                {alt.slug === 'extend-career' ? (
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1a4a4a] hover:underline"
                  >
                    Try Extend Career free
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href={`/compare/${competitorSlugToCompareSlug(alt.slug)}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1a4a4a] hover:underline"
                  >
                    Compare with Extend Career
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Feature Comparison: Extend Career vs {competitor.name}
          </h2>
          <FeatureComparisonTable
            extendFeatures={extendCareer.features}
            competitorFeatures={competitor.features}
            competitorName={competitor.name}
          />
        </section>

        {/* Migration Guide */}
        <section className="mb-12 p-6 rounded-2xl bg-[#faf9f7] border border-[#e8e4df]">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-3">
            Switching to Extend Career
          </h2>
          <p className="text-sm text-[#5a6a6a] mb-4">
            Making the switch is simple. Extend Career&apos;s AI assistant can help you
            rebuild your resume in minutes, optimized for ATS from the start.
          </p>
          <ol className="space-y-3">
            <li className="flex gap-3 text-sm text-[#3a4a4a]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a4a4a] text-white text-xs font-bold flex-shrink-0">1</span>
              Sign up for a free Extend Career account
            </li>
            <li className="flex gap-3 text-sm text-[#3a4a4a]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a4a4a] text-white text-xs font-bold flex-shrink-0">2</span>
              Paste your existing resume content or start fresh with AI
            </li>
            <li className="flex gap-3 text-sm text-[#3a4a4a]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a4a4a] text-white text-xs font-bold flex-shrink-0">3</span>
              Use AI optimization to tailor your resume for each application
            </li>
            <li className="flex gap-3 text-sm text-[#3a4a4a]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1a4a4a] text-white text-xs font-bold flex-shrink-0">4</span>
              Explore job matching, email integration, and interview tracking
            </li>
          </ol>
        </section>

        {/* FAQ */}
        {competitor.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection
              faqs={competitor.faqs}
              pageUrl={`${siteUrl}/alternatives/${slug}`}
            />
          </section>
        )}

        <MarketingCTA
          title={`Switch from ${competitor.name} to Extend Career`}
          description={`Get a free account and see why ${competitor.name} users are making the switch.`}
        />

        {relatedPages.length > 0 && (
          <section className="mt-12">
            <RelatedPages title="More Alternatives" pages={relatedPages} />
          </section>
        )}
      </article>
    </>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { generateBestOfMetadata } from '@/lib/seo/metadata'
import { getCompetitor } from '@/lib/seo/data/competitors'
import { extendCareer } from '@/lib/seo/data/extend-career'
import { getBestOfCategory, bestOfCategories } from '@/lib/seo/data/categories'
import { competitorSlugToCompareSlug } from '@/lib/seo/utils'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { LastUpdatedBadge } from '@/components/seo/last-updated-badge'
import { FeatureComparisonTable } from '@/components/seo/feature-comparison-table'
import { FAQSection } from '@/components/seo/faq-section'
import { MarketingCTA } from '@/components/seo/marketing-cta'
import { RelatedPages, type RelatedPage } from '@/components/seo/related-pages'
import { Star, ArrowRight, Check } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return bestOfCategories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getBestOfCategory(slug)
  if (!category) return {}
  return generateBestOfMetadata(category.metaTitle, category.metaDescription, slug)
}

export default async function BestOfPage({ params }: PageProps) {
  const { slug } = await params
  const category = getBestOfCategory(slug)
  if (!category) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const rankedTools = [extendCareer, ...category.competitorSlugs.map(getCompetitor).filter(Boolean)] as typeof extendCareer[]

  const relatedPages: RelatedPage[] = category.relatedCategorySlugs
    .reduce<RelatedPage[]>((acc, s) => {
      const c = getBestOfCategory(s)
      if (c) acc.push({ title: c.title, href: `/best/${s}`, description: c.metaDescription })
      return acc
    }, [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    description: category.metaDescription,
    url: `${siteUrl}/best/${slug}`,
    itemListElement: rankedTools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
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
            { label: 'Best Tools', href: '/best' },
            { label: category.title },
          ]}
        />

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <LastUpdatedBadge date={category.updatedAt} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-[#5a6a6a] leading-relaxed max-w-2xl">
            {category.intro}
          </p>
        </header>

        {/* Selection Criteria */}
        <section className="mb-10 p-6 rounded-2xl bg-[#faf9f7] border border-[#e8e4df]">
          <h2 className="font-semibold text-[#1a2a2a] mb-3">How We Chose</h2>
          <ul className="space-y-2">
            {category.selectionCriteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a4a]">
                <Check className="w-4 h-4 text-[#1a4a4a] flex-shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Ranked Tools */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Our Top Picks
          </h2>
          <div className="space-y-6">
            {rankedTools.map((tool, i) => (
              <div
                key={tool.slug}
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
                        {tool.name}
                      </h3>
                      {i === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" /> Top Pick
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#5a6a6a]">{tool.tagline}</p>
                  </div>
                </div>
                <p className="text-sm text-[#3a4a4a] mb-3">{tool.bestFor}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tool.pros.slice(0, 3).map((pro, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs"
                    >
                      <Check className="w-3 h-3" />
                      {pro.split(' ').slice(0, 5).join(' ')}
                    </span>
                  ))}
                </div>
                {tool.slug !== 'extend-career' && (
                  <Link
                    href={`/compare/${competitorSlugToCompareSlug(tool.slug)}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1a4a4a] hover:underline"
                  >
                    Compare with Extend Career
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {tool.slug === 'extend-career' && (
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#1a4a4a] hover:underline"
                  >
                    Try Extend Career free
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Buyer's Guide */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">
            Buyer&apos;s Guide
          </h2>
          <div className="prose prose-sm max-w-none text-[#3a4a4a] leading-relaxed whitespace-pre-line">
            {category.buyersGuide}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            Frequently Asked Questions
          </h2>
          <FAQSection
            faqs={category.faqs}
            pageUrl={`${siteUrl}/best/${slug}`}
          />
        </section>

        <MarketingCTA />

        {relatedPages.length > 0 && (
          <section className="mt-12">
            <RelatedPages title="Related Lists" pages={relatedPages} />
          </section>
        )}
      </article>
    </>
  )
}

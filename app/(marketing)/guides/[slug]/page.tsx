import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getUseCase, useCases } from '@/lib/seo/data/use-cases'
import { generateGuideMetadata } from '@/lib/seo/metadata'
import { featureLabels } from '@/lib/seo/data/types'
import type { FeatureKey } from '@/lib/seo/data/types'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'
import { LastUpdatedBadge } from '@/components/seo/last-updated-badge'
import { UseCaseSection } from '@/components/seo/use-case-section'
import { UseCaseChecklist } from '@/components/seo/use-case-checklist'
import { FAQSection } from '@/components/seo/faq-section'
import { MarketingCTA } from '@/components/seo/marketing-cta'
import { RelatedPages, type RelatedPage } from '@/components/seo/related-pages'
import { AlertTriangle, BookOpen } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const uc = getUseCase(slug)
  if (!uc) return {}
  return generateGuideMetadata(uc.metaTitle, uc.metaDescription, slug)
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const uc = getUseCase(slug)
  if (!uc) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const relatedPages: RelatedPage[] = uc.relatedSlugs
    .reduce<RelatedPage[]>((acc, s) => {
      const related = getUseCase(s)
      if (related) {
        acc.push({
          title: related.title,
          href: `/guides/${s}`,
          description: related.metaDescription,
        })
      }
      return acc
    }, [])
    .slice(0, 6)

  const isHowTo = uc.sections.length >= 3
  const jsonLd = isHowTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: uc.title,
        description: uc.metaDescription,
        step: uc.sections.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.body.replace(/<[^>]*>/g, ''),
        })),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: uc.title,
        description: uc.metaDescription,
        dateModified: uc.updatedAt,
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
            { label: 'Guides', href: '/guides' },
            { label: uc.title },
          ]}
        />

        {/* Hero */}
        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <LastUpdatedBadge date={uc.updatedAt} />
            <span className="text-xs text-[#8a9a9a]">
              {uc.readTimeMinutes} min read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-3">
            {uc.title}
          </h1>
          <p className="text-lg text-[#5a6a6a] leading-relaxed">
            {uc.subtitle}
          </p>
        </header>

        {/* Key Takeaways */}
        <div className="mb-10 p-6 rounded-2xl bg-[#1a4a4a]/[0.03] border border-[#1a4a4a]/10">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[#1a4a4a]" />
            <h2 className="font-semibold text-[#1a2a2a]">Key Takeaways</h2>
          </div>
          <ul className="space-y-2">
            {uc.keyTakeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a4a]">
                <span className="text-[#1a4a4a] font-bold mt-0.5">&bull;</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="mb-10">
          {uc.sections.map((section, i) => (
            <UseCaseSection key={i} section={section} />
          ))}
        </div>

        {/* Checklist */}
        <section className="mb-10">
          <UseCaseChecklist items={uc.checklist} title={`${uc.title} Checklist`} />
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {uc.commonMistakes.map((mistake, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-red-50/50 border border-red-200/30"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#3a4a4a]">{mistake}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How Extend Career Helps */}
        <section className="mb-10 p-6 rounded-2xl bg-[#faf9f7] border border-[#e8e4df]">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">
            How Extend Career Helps
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {uc.relevantFeatures.map((key) => (
              <div
                key={key}
                className="flex items-center gap-2 p-3 rounded-lg bg-white border border-[#e8e4df]"
              >
                <div className="w-2 h-2 rounded-full bg-[#1a4a4a]" />
                <span className="text-sm text-[#3a4a4a]">
                  {featureLabels[key as FeatureKey]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <MarketingCTA
          title="Build your resume with AI"
          description="Extend Career helps you create ATS-optimized resumes tailored to your target role."
          buttonText="Try Extend Career free"
        />

        {/* Related Guides */}
        {relatedPages.length > 0 && (
          <section className="mt-12">
            <RelatedPages title="Related Guides" pages={relatedPages} />
          </section>
        )}
      </article>
    </>
  )
}

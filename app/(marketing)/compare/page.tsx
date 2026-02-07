import type { Metadata } from 'next'
import { competitors } from '@/lib/seo/data/competitors'
import { competitorSlugToCompareSlug } from '@/lib/seo/utils'
import { generateHubMetadata } from '@/lib/seo/metadata'
import { HubPageGrid, type HubCard } from '@/components/seo/hub-page-grid'

export const metadata: Metadata = generateHubMetadata('compare')

export default function CompareHub() {
  const cards: HubCard[] = competitors.map((c) => ({
    title: `Extend Career vs ${c.name}`,
    description: c.quickVerdict,
    href: `/compare/${competitorSlugToCompareSlug(c.slug)}`,
    badge: c.bestFor.split(' ').slice(0, 4).join(' ') + '...',
  }))

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
          Resume Builder Comparisons
        </h1>
        <p className="text-lg text-[#5a6a6a] max-w-2xl">
          See how Extend Career compares to other resume builders and career
          platforms. Side-by-side feature, pricing, and rating comparisons.
        </p>
      </header>

      <HubPageGrid cards={cards} />

      <div className="mt-16 grid sm:grid-cols-3 gap-6">
        <a
          href="/best"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Best-of Lists</h3>
          <p className="text-xs text-[#5a6a6a]">Curated rankings of the top career tools</p>
        </a>
        <a
          href="/alternatives"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Alternatives</h3>
          <p className="text-xs text-[#5a6a6a]">Find the best alternative to any tool</p>
        </a>
        <a
          href="/guides"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Career Guides</h3>
          <p className="text-xs text-[#5a6a6a]">Resume tips, interview prep, and more</p>
        </a>
      </div>
    </div>
  )
}

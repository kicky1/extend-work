import type { Metadata } from 'next'
import { bestOfCategories } from '@/lib/seo/data/categories'
import { generateHubMetadata } from '@/lib/seo/metadata'
import { HubPageGrid, type HubCard } from '@/components/seo/hub-page-grid'

export const metadata: Metadata = generateHubMetadata('best')

export default function BestHub() {
  const cards: HubCard[] = bestOfCategories.map((c) => ({
    title: c.title,
    description: c.metaDescription,
    href: `/best/${c.slug}`,
    badge: `${c.competitorSlugs.length + 1} tools ranked`,
  }))

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
          Best Career Tools
        </h1>
        <p className="text-lg text-[#5a6a6a] max-w-2xl">
          Curated lists of the best AI resume builders, career platforms, and job
          search tools. Expert-reviewed and ranked to help you find the right fit.
        </p>
      </header>

      <HubPageGrid cards={cards} />

      <div className="mt-16 grid sm:grid-cols-3 gap-6">
        <a
          href="/compare"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Tool Comparisons</h3>
          <p className="text-xs text-[#5a6a6a]">Compare resume builders side-by-side</p>
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

import type { Metadata } from 'next'
import { competitors } from '@/lib/seo/data/competitors'
import { generateHubMetadata } from '@/lib/seo/metadata'
import { HubPageGrid, type HubCard } from '@/components/seo/hub-page-grid'

export const metadata: Metadata = generateHubMetadata('alternatives')

export default function AlternativesHub() {
  const cards: HubCard[] = competitors.map((c) => ({
    title: `${c.name} Alternatives`,
    description: `Best alternatives to ${c.name}. Compare features, pricing, and find the right career platform for your needs.`,
    href: `/alternatives/${c.slug}`,
    badge: c.name,
  }))

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
          Resume Builder Alternatives
        </h1>
        <p className="text-lg text-[#5a6a6a] max-w-2xl">
          Looking for an alternative to your current resume builder? Explore the
          best options and find the right career platform for your needs.
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
          href="/best"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Best-of Lists</h3>
          <p className="text-xs text-[#5a6a6a]">Curated rankings of the top career tools</p>
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

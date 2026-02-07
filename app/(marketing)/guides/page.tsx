import type { Metadata } from 'next'
import { useCases } from '@/lib/seo/data/use-cases'
import { generateHubMetadata } from '@/lib/seo/metadata'
import { GuidesHubContent } from './guides-hub-content'

export const metadata: Metadata = generateHubMetadata('guides')

export default function GuidesHub() {
  const guides = useCases.map((uc) => ({
    title: uc.title,
    metaDescription: uc.metaDescription,
    slug: uc.slug,
    category: uc.category,
    readTimeMinutes: uc.readTimeMinutes,
  }))

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
          Career Guides
        </h1>
        <p className="text-lg text-[#5a6a6a] max-w-2xl">
          Expert career guides on resume writing, job search strategy, interview
          preparation, and career transitions. Actionable advice for every stage.
        </p>
      </header>

      <GuidesHubContent guides={guides} />

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
          href="/alternatives"
          className="p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-all"
        >
          <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1">Alternatives</h3>
          <p className="text-xs text-[#5a6a6a]">Find the best alternative to any tool</p>
        </a>
      </div>
    </div>
  )
}

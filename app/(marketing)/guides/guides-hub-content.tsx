'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { useCaseCategoryLabels } from '@/lib/seo/data/types'
import type { UseCaseCategory } from '@/lib/seo/data/types'
import { HubPageGrid, type HubCard } from '@/components/seo/hub-page-grid'

interface Guide {
  title: string
  metaDescription: string
  slug: string
  category: string
  readTimeMinutes: number
}

export function GuidesHubContent({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return guides
    const q = query.toLowerCase()
    return guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.metaDescription.toLowerCase().includes(q) ||
        g.slug.toLowerCase().includes(q),
    )
  }, [guides, query])

  const grouped = filtered.reduce<Record<string, Guide[]>>((acc, g) => {
    if (!acc[g.category]) acc[g.category] = []
    acc[g.category].push(g)
    return acc
  }, {})

  return (
    <>
      <div className="relative mb-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6a6a]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides by role..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e8e4df] bg-white text-sm text-[#1a2a2a] placeholder:text-[#5a6a6a]/60 focus:outline-none focus:border-[#1a4a4a]/30 focus:ring-1 focus:ring-[#1a4a4a]/10 transition-all"
        />
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="text-sm text-[#5a6a6a] py-8 text-center">
          No guides found for &ldquo;{query}&rdquo;
        </p>
      )}

      {Object.entries(grouped).map(([category, categoryGuides]) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">
            {useCaseCategoryLabels[category as UseCaseCategory]}
          </h2>
          <HubPageGrid
            cards={categoryGuides.map(
              (g): HubCard => ({
                title: g.title,
                description: g.metaDescription,
                href: `/guides/${g.slug}`,
                badge: `${g.readTimeMinutes} min read`,
              }),
            )}
          />
        </section>
      ))}
    </>
  )
}

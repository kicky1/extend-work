import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface HubCard {
  title: string
  description: string
  href: string
  badge?: string
}

interface HubPageGridProps {
  cards: HubCard[]
}

export function HubPageGrid({ cards }: HubPageGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group relative p-6 rounded-2xl bg-white border border-[#e8e4df] hover:border-[#1a4a4a]/20 hover:shadow-md transition-all"
        >
          {card.badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1a4a4a]/5 text-xs font-medium text-[#1a4a4a] mb-3">
              {card.badge}
            </span>
          )}
          <h2 className="text-base font-semibold text-[#1a2a2a] mb-2 group-hover:text-[#1a4a4a] transition-colors">
            {card.title}
          </h2>
          <p className="text-sm text-[#5a6a6a] mb-4 line-clamp-2">
            {card.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1a4a4a]">
            Read comparison
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      ))}
    </div>
  )
}

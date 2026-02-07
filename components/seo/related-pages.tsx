import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface RelatedPage {
  title: string
  href: string
  description?: string
}

interface RelatedPagesProps {
  title?: string
  pages: RelatedPage[]
}

export function RelatedPages({
  title = 'Related Comparisons',
  pages,
}: RelatedPagesProps) {
  if (!pages.length) return null

  return (
    <div>
      <h2 className="text-xl font-bold text-[#1a2a2a] mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group p-5 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 hover:shadow-sm transition-all"
          >
            <h3 className="text-sm font-semibold text-[#1a2a2a] mb-1 group-hover:text-[#1a4a4a] transition-colors">
              {page.title}
            </h3>
            {page.description && (
              <p className="text-xs text-[#5a6a6a] mb-3 line-clamp-2">
                {page.description}
              </p>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a4a4a]">
              Read more
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

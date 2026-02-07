import { Lightbulb } from 'lucide-react'
import type { UseCaseSection as SectionData } from '@/lib/seo/data/types'

interface UseCaseSectionProps {
  section: SectionData
}

export function UseCaseSection({ section }: UseCaseSectionProps) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-[#1a2a2a] mb-4">{section.title}</h2>
      <div
        className="prose prose-sm max-w-none text-[#3a4a4a] leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: section.body }}
      />
      {section.tip && (
        <div className="mt-4 flex gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#3a4a4a]">{section.tip}</p>
        </div>
      )}
    </div>
  )
}

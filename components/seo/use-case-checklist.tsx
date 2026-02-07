import { CheckCircle } from 'lucide-react'

interface UseCaseChecklistProps {
  items: string[]
  title?: string
}

export function UseCaseChecklist({
  items,
  title = 'Resume Checklist',
}: UseCaseChecklistProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#faf9f7] border border-[#e8e4df]">
      <h3 className="font-semibold text-[#1a2a2a] mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#1a4a4a] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[#3a4a4a]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

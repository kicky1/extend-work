import { formatDate } from '@/lib/seo/utils'

interface LastUpdatedBadgeProps {
  date: string
}

export function LastUpdatedBadge({ date }: LastUpdatedBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a4a4a]/5 text-xs font-medium text-[#5a6a6a]">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Updated {formatDate(date)}
    </span>
  )
}

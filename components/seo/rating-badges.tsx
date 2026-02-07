import { Star } from 'lucide-react'
import type { Rating } from '@/lib/seo/data/types'

interface RatingBadgesProps {
  ratings: Rating[]
}

function RatingBadge({ rating }: { rating: Rating }) {
  return (
    <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#e8e4df]">
      <div className="text-sm font-medium text-[#1a2a2a] mb-1">
        {rating.platform}
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="text-lg font-bold text-[#1a2a2a]">
          {rating.score.toFixed(1)}
        </span>
        <span className="text-sm text-[#5a6a6a]">/5</span>
      </div>
      <div className="text-xs text-[#8a9a9a]">
        {rating.reviewCount.toLocaleString()} reviews
      </div>
    </div>
  )
}

export function RatingBadges({ ratings }: RatingBadgesProps) {
  if (!ratings.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {ratings.map((rating) => (
        <RatingBadge key={rating.platform} rating={rating} />
      ))}
    </div>
  )
}

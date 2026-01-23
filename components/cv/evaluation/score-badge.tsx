interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  previousScore?: number // For showing delta
}

function getScoreColor(score: number): { bg: string; text: string; ring: string } {
  if (score >= 80) {
    return {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      ring: 'ring-emerald-500',
    }
  }
  if (score >= 60) {
    return {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      ring: 'ring-amber-500',
    }
  }
  return {
    bg: 'bg-red-100',
    text: 'text-red-700',
    ring: 'ring-red-500',
  }
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Fair'
  return 'Needs Work'
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-20 h-20 text-2xl',
}

export default function ScoreBadge({ score, size = 'md', showLabel = false, previousScore }: ScoreBadgeProps) {
  const colors = getScoreColor(score)
  const label = getScoreLabel(score)
  const delta = previousScore !== undefined ? score - previousScore : null
  const showDelta = delta !== null && delta !== 0

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${colors.bg} ${colors.text} rounded-full flex items-center justify-center font-bold ring-2 ${colors.ring}`}
        >
          {score}
        </div>
        {showDelta && (
          <div
            className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
              delta > 0
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {delta > 0 ? `+${delta}` : delta}
          </div>
        )}
      </div>
      {showLabel && (
        <span className={`text-xs font-medium ${colors.text}`}>{label}</span>
      )}
    </div>
  )
}

// Mini progress bar for section scores
interface SectionScoreBarProps {
  label: string
  score: number
  previousScore?: number
}

export function SectionScoreBar({ label, score, previousScore }: SectionScoreBarProps) {
  const colors = getScoreColor(score)
  const delta = previousScore !== undefined ? score - previousScore : null
  const showDelta = delta !== null && delta !== 0

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 capitalize">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className={`font-medium ${colors.text}`}>{score}</span>
          {showDelta && (
            <span
              className={`text-xs font-medium ${
                delta > 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              ({delta > 0 ? `+${delta}` : delta})
            </span>
          )}
        </div>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.ring.replace('ring-', 'bg-')}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

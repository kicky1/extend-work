'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

interface CompatibilityBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function CompatibilityBadge({ score, size = 'md', showLabel = true }: CompatibilityBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
    if (score >= 40) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent match'
    if (score >= 60) return 'Good match'
    if (score >= 40) return 'Fair match'
    return 'Low match'
  }

  const sizeClasses = {
    sm: 'h-6 text-xs gap-1 px-2',
    md: 'h-8 text-sm gap-1.5 px-3',
    lg: 'h-10 text-base gap-2 px-4',
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        getScoreColor(score)
      )}
    >
      <Sparkles className={iconSizes[size]} />
      <span>{score}%</span>
      {showLabel && size !== 'sm' && (
        <span className="text-muted-foreground ml-1">
          • {getScoreLabel(score)}
        </span>
      )}
    </div>
  )
}

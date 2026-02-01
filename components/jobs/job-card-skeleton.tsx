'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface JobCardSkeletonProps {
  compact?: boolean
}

export function JobCardSkeleton({ compact = false }: JobCardSkeletonProps) {
  return (
    <Card className={cn(compact ? 'py-3' : '')}>
      <CardHeader className={compact ? 'pb-2' : ''}>
        <div className="flex items-start gap-3">
          {/* Company logo skeleton */}
          <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />

          <div className="flex-1 min-w-0 space-y-2">
            {/* Title skeleton */}
            <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
            {/* Company skeleton */}
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Bookmark button skeleton */}
        <div className="absolute right-4 top-4">
          <div className="h-8 w-8 rounded bg-muted animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className={cn('space-y-3', compact ? 'pt-0' : '')}>
        {/* Location and badges skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
        </div>

        {/* Salary skeleton */}
        <div className="h-5 w-32 bg-muted rounded animate-pulse" />

        {/* Skills skeleton */}
        {!compact && (
          <div className="flex flex-wrap gap-1.5">
            <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
            <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
            <div className="h-5 w-18 bg-muted rounded-full animate-pulse" />
          </div>
        )}

        {/* Footer skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-muted animate-pulse" />
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

interface JobCardSkeletonGridProps {
  count?: number
  compact?: boolean
}

export function JobCardSkeletonGrid({ count = 6, compact = false }: JobCardSkeletonGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} compact={compact} />
      ))}
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'

function UpcomingInterviewsSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-[#e8e4df] p-4 space-y-3">
      {/* Header */}
      <div className="h-5 w-40 bg-muted rounded animate-pulse" />
      {/* Interview items */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 p-2">
          <div className="h-10 w-10 rounded-lg bg-muted animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

function CalendarGridSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-8 bg-muted rounded animate-pulse" />
        <div className="h-6 w-36 bg-muted rounded animate-pulse" />
        <div className="h-6 w-8 bg-muted rounded animate-pulse" />
      </div>
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded animate-pulse mx-auto w-8" />
        ))}
      </div>
      {/* Calendar grid - 5 rows of 7 */}
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="grid grid-cols-7 gap-1 mb-1">
          {Array.from({ length: 7 }).map((_, col) => (
            <div
              key={col}
              className="aspect-square rounded-lg bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CalendarPageSkeleton() {
  return (
    <div className="flex flex-col lg:grid gap-4 lg:gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden lg:block space-y-4">
        <UpcomingInterviewsSkeleton />
      </div>
      {/* Calendar */}
      <CalendarGridSkeleton />
    </div>
  )
}

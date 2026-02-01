'use client'

import { FileSearch, Brain, Search, BarChart3, Database, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RecommendationsProgress as ProgressType } from '@/lib/stores/job-store'

interface RecommendationsProgressProps {
  progress: ProgressType | null
  className?: string
}

const stages = [
  { id: 'auth', label: 'Checking...', icon: Loader2 },
  { id: 'analyzing', label: 'Analyzing CV', icon: Brain },
  { id: 'detecting', label: 'Detecting location', icon: FileSearch },
  { id: 'searching', label: 'Searching jobs', icon: Search },
  { id: 'inserting', label: 'Processing', icon: Database },
  { id: 'scoring', label: 'Scoring matches', icon: BarChart3 },
  { id: 'complete', label: 'Complete', icon: CheckCircle2 },
] as const

// Map stage IDs to their index for progress dots
const stageIndexMap: Record<string, number> = {
  auth: 0,
  analyzing: 1,
  detecting: 2,
  searching: 3,
  inserting: 4,
  scoring: 5,
  complete: 6,
}

export function RecommendationsProgress({ progress, className }: RecommendationsProgressProps) {
  // Default to initial state if no progress
  const currentProgress = progress || { stage: 'auth', message: 'Starting...', progress: 0 }
  const currentStageIndex = stageIndexMap[currentProgress.stage] ?? 0
  const currentStage = stages[currentStageIndex] || stages[0]
  const StageIcon = currentStage.icon

  // Build details string if available
  let detailsText = ''
  if (currentProgress.details) {
    const { totalApis, completedApis, jobsFound, jobsInserted, jobsScored, cached } = currentProgress.details
    if (cached) {
      detailsText = 'Loaded from cache'
    } else if (jobsScored !== undefined) {
      detailsText = `${jobsScored} matches scored`
    } else if (jobsInserted !== undefined && jobsFound !== undefined) {
      detailsText = `${jobsInserted} new jobs stored`
    } else if (completedApis !== undefined && totalApis !== undefined) {
      detailsText = `${completedApis}/${totalApis} sources searched`
    } else if (jobsFound !== undefined) {
      detailsText = `${jobsFound} jobs found`
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1a4a4a] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${currentProgress.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{Math.round(currentProgress.progress)}%</span>
          <span>{detailsText || 'Finding the best matches for you'}</span>
        </div>
      </div>

      {/* Current stage indicator */}
      <div className="flex items-center gap-3 text-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a4a4a]/10">
          <StageIcon className={cn(
            'h-4 w-4 text-[#1a4a4a]',
            currentProgress.stage !== 'complete' && 'animate-pulse'
          )} />
        </div>
        <span className="text-[#5a6a6a] font-medium">{currentProgress.message}</span>
      </div>

      {/* Stage indicators - show 5 dots representing main phases */}
      <div className="flex items-center gap-2">
        {['analyzing', 'detecting', 'searching', 'inserting', 'scoring'].map((stageId, index) => {
          const stageIdx = stageIndexMap[stageId]
          const isComplete = currentStageIndex > stageIdx
          const isCurrent = currentStageIndex === stageIdx
          const isPending = currentStageIndex < stageIdx

          return (
            <div
              key={stageId}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors duration-300',
                isComplete && 'bg-[#1a4a4a]',
                isCurrent && 'bg-[#1a4a4a]/50',
                isPending && 'bg-muted'
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

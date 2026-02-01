'use client'

import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { Interview } from '@/lib/types/interview'
import { interviewTypeConfig, interviewStatusConfig } from '@/lib/types/interview'
import { InterviewTypeIcon } from './interview-icons'

interface InterviewCardProps {
  interview: Interview
  onClick?: () => void
  compact?: boolean
}

export function InterviewCard({ interview, onClick, compact = false }: InterviewCardProps) {
  const typeConfig = interviewTypeConfig[interview.interviewType]
  const statusConfig = interviewStatusConfig[interview.status]
  const time = format(new Date(interview.scheduledAt), 'h:mm a')

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'w-full text-left px-2 py-1 rounded text-xs truncate transition-colors',
          typeConfig.bgColor,
          typeConfig.color,
          'hover:opacity-80'
        )}
      >
        <InterviewTypeIcon type={interview.interviewType} className="w-3 h-3 mr-1 inline-block" colored={false} />
        <span className="font-medium">{time}</span>
        <span className="ml-1 opacity-75">{interview.company}</span>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-3 rounded-lg border border-transparent transition-all',
        'hover:border-[#e8e4df] hover:bg-[#f8f6f4]'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#1a2a2a] truncate">{interview.title}</span>
          </div>
          <p className="text-sm text-[#5a6a6a] truncate mt-0.5">{interview.company}</p>
          <p className="text-xs text-[#5a6a6a] mt-1">{interview.position}</p>
        </div>
        <span
          className={cn(
            'shrink-0 px-2 py-0.5 rounded text-xs font-medium',
            statusConfig.bgColor,
            statusConfig.color
          )}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-3 text-xs text-[#5a6a6a]">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {time}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {interview.duration} min
        </span>
        {interview.location && (
          <span className="flex items-center gap-1 truncate">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {interview.location}
          </span>
        )}
      </div>
    </button>
  )
}

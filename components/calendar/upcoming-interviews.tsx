'use client'

import { format, isToday, isTomorrow } from 'date-fns'
import { CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Interview } from '@/lib/types/interview'
import { InterviewTypeIcon } from './interview-icons'

interface UpcomingInterviewsProps {
  interviews: Interview[]
  onSelectInterview: (interview: Interview) => void
}

export function UpcomingInterviews({ interviews, onSelectInterview }: UpcomingInterviewsProps) {
  if (interviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
        <h3 className="text-sm font-medium text-[#1a2a2a] mb-3 flex items-center gap-2">
          <CalendarClock className="w-4 h-4" />
          Upcoming Interviews
        </h3>
        <p className="text-sm text-[#5a6a6a] text-center py-4">
          No upcoming interviews scheduled
        </p>
      </div>
    )
  }

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'EEE, MMM d')
  }

  return (
    <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
      <h3 className="text-sm font-medium text-[#1a2a2a] mb-3 flex items-center gap-2">
        <CalendarClock className="w-4 h-4" />
        Upcoming Interviews
      </h3>

      <div className="space-y-2 max-h-[270px] overflow-y-auto">
        {interviews.map((interview) => {
          const scheduledAt = new Date(interview.scheduledAt)

          return (
            <button
              key={interview.id}
              onClick={() => onSelectInterview(interview)}
              className={cn(
                'w-full text-left p-3 rounded-lg border border-transparent transition-all',
                'hover:border-[#e8e4df] hover:bg-[#f8f6f4]'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a2a2a] truncate">
                    {interview.title}
                  </p>
                  <p className="text-xs text-[#5a6a6a] truncate">{interview.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded',
                        isToday(scheduledAt)
                          ? 'bg-red-100 text-red-700'
                          : isTomorrow(scheduledAt)
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {getDateLabel(scheduledAt)}
                    </span>
                    <span className="text-xs text-[#5a6a6a]">
                      {format(scheduledAt, 'h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

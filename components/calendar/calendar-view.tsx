'use client'

import { useMemo } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Interview } from '@/lib/types/interview'
import { interviewTypeConfig } from '@/lib/types/interview'
import { InterviewTypeIcon } from './interview-icons'

interface CalendarViewProps {
  interviews: Interview[]
  currentMonth: Date
  selectedDate: Date | null
  onMonthChange: (date: Date) => void
  onSelectDate: (date: Date) => void
  onSelectInterview: (interview: Interview) => void
}

export function CalendarView({
  interviews,
  currentMonth,
  selectedDate,
  onMonthChange,
  onSelectDate,
  onSelectInterview,
}: CalendarViewProps) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  // Group interviews by date
  const interviewsByDate = useMemo(() => {
    const map = new Map<string, Interview[]>()
    interviews.forEach((interview) => {
      const dateStr = format(new Date(interview.scheduledAt), 'yyyy-MM-dd')
      const existing = map.get(dateStr) || []
      map.set(dateStr, [...existing, interview])
    })
    return map
  }, [interviews])

  // Generate calendar days
  const days: Date[] = []
  let day = startDate
  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }

  // Split into weeks
  const weeks: Date[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="bg-white rounded-lg border border-[#e8e4df] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e8e4df]">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-base sm:text-lg font-semibold text-[#1a2a2a] min-w-[140px] sm:min-w-[180px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date()
            onMonthChange(today)
            onSelectDate(today)
          }}
        >
          Today
        </Button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 border-b border-[#e8e4df]">
        {weekDays.map((d) => (
          <div
            key={d}
            className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-medium text-[#5a6a6a] uppercase tracking-wide"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="divide-y divide-[#e8e4df]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 divide-x divide-[#e8e4df]">
            {week.map((d, dayIndex) => {
              const dateStr = format(d, 'yyyy-MM-dd')
              const dayInterviews = interviewsByDate.get(dateStr) || []
              const isCurrentMonth = isSameMonth(d, currentMonth)
              const isSelected = selectedDate && isSameDay(d, selectedDate)
              const isToday = isSameDay(d, new Date())

              return (
                <div
                  key={dayIndex}
                  className={cn(
                    'min-h-[100px] sm:min-h-[120px] p-1.5 sm:p-2 cursor-pointer transition-colors',
                    !isCurrentMonth && 'bg-[#f8f6f4]',
                    isSelected && 'bg-[#1a4a4a]/5',
                    'hover:bg-[#1a4a4a]/5'
                  )}
                  onClick={() => onSelectDate(d)}
                >
                  {/* Day number */}
                  <div
                    className={cn(
                      'w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-xs sm:text-sm mb-1',
                      !isCurrentMonth && 'text-[#5a6a6a]/50',
                      isCurrentMonth && 'text-[#1a2a2a]',
                      isToday && 'bg-[#1a4a4a] text-white font-medium'
                    )}
                  >
                    {format(d, 'd')}
                  </div>

                  {/* Interviews */}
                  <div className="space-y-0.5 sm:space-y-1">
                    {dayInterviews.slice(0, 3).map((interview) => {
                      const typeConfig = interviewTypeConfig[interview.interviewType]
                      const isPast = new Date(interview.scheduledAt) < new Date()
                      return (
                        <button
                          key={interview.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectInterview(interview)
                          }}
                          className={cn(
                            'w-full text-left px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs truncate transition-colors min-h-[24px] sm:min-h-0',
                            typeConfig.bgColor,
                            typeConfig.color,
                            'hover:opacity-80',
                            (interview.status === 'cancelled' || isPast) && 'opacity-50',
                            interview.status === 'cancelled' && 'line-through'
                          )}
                        >
                          <InterviewTypeIcon type={interview.interviewType} className="w-3 h-3 mr-0.5 sm:mr-1 inline-block" colored={false} />
                          <span className="font-medium">
                            {format(new Date(interview.scheduledAt), 'h:mm a')}
                          </span>
                          <span className="ml-1 opacity-75 truncate hidden sm:inline">{interview.company}</span>
                        </button>
                      )
                    })}
                    {dayInterviews.length > 3 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectDate(d)
                        }}
                        className="w-full text-left px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs text-[#5a6a6a] hover:text-[#1a2a2a] min-h-[24px] sm:min-h-0"
                      >
                        +{dayInterviews.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

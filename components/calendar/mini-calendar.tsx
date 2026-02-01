'use client'

import { useState } from 'react'
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

interface MiniCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  interviews: Interview[]
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

export function MiniCalendar({
  selectedDate,
  onSelectDate,
  interviews,
  currentMonth,
  onMonthChange,
}: MiniCalendarProps) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const days: Date[] = []
  let day = startDate
  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }

  const hasInterviewOnDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return interviews.some((interview) => {
      const interviewDate = new Date(interview.scheduledAt).toISOString().split('T')[0]
      return interviewDate === dateStr
    })
  }

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  return (
    <div className="bg-white rounded-lg border border-[#e8e4df] p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-7 sm:w-7"
          onClick={() => onMonthChange(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium text-[#1a2a2a]">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-7 sm:w-7"
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
        {weekDays.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] sm:text-xs font-medium text-[#5a6a6a] py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days.map((d, i) => {
          const isCurrentMonth = isSameMonth(d, currentMonth)
          const isSelected = selectedDate && isSameDay(d, selectedDate)
          const isToday = isSameDay(d, new Date())
          const hasInterview = hasInterviewOnDate(d)

          return (
            <button
              key={i}
              onClick={() => onSelectDate(d)}
              className={cn(
                'h-9 w-full sm:h-8 sm:w-8 rounded-full text-xs transition-colors relative',
                'hover:bg-[#1a4a4a]/10',
                !isCurrentMonth && 'text-[#5a6a6a]/50',
                isCurrentMonth && 'text-[#1a2a2a]',
                isToday && !isSelected && 'ring-1 ring-[#1a4a4a]',
                isSelected && 'bg-[#1a4a4a] text-white hover:bg-[#1a4a4a]'
              )}
            >
              {format(d, 'd')}
              {hasInterview && (
                <span
                  className={cn(
                    'absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full',
                    isSelected ? 'bg-white' : 'bg-[#1a4a4a]'
                  )}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Today button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-3 text-xs h-9 sm:h-8"
        onClick={() => {
          const today = new Date()
          onMonthChange(today)
          onSelectDate(today)
        }}
      >
        Today
      </Button>
    </div>
  )
}

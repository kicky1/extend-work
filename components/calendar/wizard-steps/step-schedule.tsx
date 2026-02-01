'use client'

import { useState, useMemo } from 'react'
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
  isBefore,
  startOfDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Interview, InterviewFormData } from '@/lib/types/interview'
import { commonTimezones } from '@/lib/types/interview'

interface StepScheduleProps {
  formData: InterviewFormData
  onChange: (field: keyof InterviewFormData, value: InterviewFormData[keyof InterviewFormData]) => void
  interviews?: Interview[]
}

// Time slots from 9:00 to 18:00 in 30-min increments
const timeSlots = Array.from({ length: 19 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9
  const minute = (i % 2) * 30
  return {
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    label: format(new Date().setHours(hour, minute), 'h:mm a'),
  }
})

// Duration options as pills
const durationPills = [
  { value: 30, label: '30min' },
  { value: 45, label: '45min' },
  { value: 60, label: '1hr' },
  { value: 90, label: '1.5hr' },
  { value: 120, label: '2hr' },
]

export function StepSchedule({ formData, onChange, interviews = [] }: StepScheduleProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    return formData.scheduledAt ? new Date(formData.scheduledAt) : new Date()
  })

  const selectedDate = useMemo(() => {
    return formData.scheduledAt ? new Date(formData.scheduledAt) : null
  }, [formData.scheduledAt])

  const selectedTime = useMemo(() => {
    if (!formData.scheduledAt) return null
    const date = new Date(formData.scheduledAt)
    return format(date, 'HH:mm')
  }, [formData.scheduledAt])

  // Get taken time slots for selected date
  const takenTimeSlots = useMemo(() => {
    if (!selectedDate) return new Set<string>()

    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
    const taken = new Set<string>()

    interviews.forEach((interview) => {
      const interviewDate = new Date(interview.scheduledAt)
      const interviewDateStr = format(interviewDate, 'yyyy-MM-dd')

      if (interviewDateStr === selectedDateStr) {
        const startTime = format(interviewDate, 'HH:mm')
        taken.add(startTime)

        // Also block slots during the interview duration
        const durationSlots = Math.ceil(interview.duration / 30)
        for (let i = 1; i < durationSlots; i++) {
          const slotTime = new Date(interviewDate.getTime() + i * 30 * 60 * 1000)
          taken.add(format(slotTime, 'HH:mm'))
        }
      }
    })

    return taken
  }, [selectedDate, interviews])

  // Calendar logic
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

  const today = startOfDay(new Date())
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  // Format date as local ISO string (avoids UTC conversion issues)
  const toLocalISOString = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:00`
  }

  const handleDateSelect = (date: Date) => {
    const time = selectedTime || '10:00'
    const [hours, minutes] = time.split(':')
    const newDate = new Date(date)
    newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    onChange('scheduledAt', toLocalISOString(newDate))
  }

  const handleTimeSelect = (time: string) => {
    const date = selectedDate || new Date()
    const [hours, minutes] = time.split(':')
    const newDate = new Date(date)
    newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    onChange('scheduledAt', toLocalISOString(newDate))
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div>
        <Label className="text-sm font-medium text-[#1a2a2a] mb-3 block">
          Select Date
        </Label>
        <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-[#1a2a2a]">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-[#5a6a6a] py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              const isCurrentMonth = isSameMonth(d, currentMonth)
              const isSelected = selectedDate && isSameDay(d, selectedDate)
              const isToday = isSameDay(d, new Date())
              const isPast = isBefore(d, today)

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDateSelect(d)}
                  className={cn(
                    'h-10 w-full rounded-lg text-sm transition-colors relative',
                    'hover:bg-[#1a4a4a]/10',
                    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                    !isCurrentMonth && 'text-[#5a6a6a]/50',
                    isCurrentMonth && 'text-[#1a2a2a]',
                    isToday && !isSelected && 'ring-1 ring-[#1a4a4a]',
                    isSelected && 'bg-[#1a4a4a] text-white hover:bg-[#1a4a4a]'
                  )}
                >
                  {format(d, 'd')}
                </button>
              )
            })}
          </div>

          {/* Today button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-xs"
            onClick={() => {
              setCurrentMonth(new Date())
              handleDateSelect(new Date())
            }}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <Label className="text-sm font-medium text-[#1a2a2a] mb-3 block">
          Select Time
        </Label>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {timeSlots.map((slot) => {
            const isTaken = takenTimeSlots.has(slot.value)
            return (
              <button
                key={slot.value}
                type="button"
                disabled={isTaken}
                onClick={() => handleTimeSelect(slot.value)}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg border transition-colors',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[#e8e4df]',
                  selectedTime === slot.value
                    ? 'border-[#1a4a4a] bg-[#1a4a4a]/5 text-[#1a4a4a] font-medium'
                    : 'border-[#e8e4df] text-[#5a6a6a] hover:border-[#1a4a4a]/50 hover:bg-[#f8f6f4]'
                )}
              >
                {slot.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Duration Pills */}
      <div>
        <Label className="text-sm font-medium text-[#1a2a2a] mb-3 block">
          Duration
        </Label>
        <div className="flex flex-wrap gap-2">
          {durationPills.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('duration', opt.value)}
              className={cn(
                'px-4 py-2 text-sm rounded-full border transition-colors',
                'hover:border-[#1a4a4a]/50 hover:bg-[#f8f6f4]',
                formData.duration === opt.value
                  ? 'border-[#1a4a4a] bg-[#1a4a4a] text-white'
                  : 'border-[#e8e4df] text-[#5a6a6a]'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timezone */}
      <div>
        <Label htmlFor="timezone">Timezone</Label>
        <Select
          value={formData.timezone}
          onValueChange={(value) => value && onChange('timezone', value)}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {commonTimezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected date/time preview */}
      {selectedDate && selectedTime && (
        <div className="p-3 bg-[#f8f6f4] rounded-lg">
          <p className="text-xs text-[#5a6a6a] mb-1">Selected date & time</p>
          <p className="text-sm font-medium text-[#1a2a2a]">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')} at{' '}
            {format(new Date().setHours(
              parseInt(selectedTime.split(':')[0]),
              parseInt(selectedTime.split(':')[1])
            ), 'h:mm a')}
          </p>
        </div>
      )}
    </div>
  )
}

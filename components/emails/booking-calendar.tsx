'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { format, addDays, startOfDay, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Loader2, Check, Calendar } from 'lucide-react'
import type { AvailableSlot } from '@/lib/types/email'

interface BookingCalendarProps {
  userId: string
  hostName?: string
}

export function BookingCalendar({ userId, hostName }: BookingCalendarProps) {
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfDay(new Date()))

  // Form state
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  useEffect(() => {
    fetchSlots()
  }, [userId, currentWeekStart])

  const fetchSlots = async () => {
    setIsLoading(true)
    try {
      const from = currentWeekStart.toISOString()
      const to = addDays(currentWeekStart, 7).toISOString()
      const response = await fetch(
        `/api/emails/schedule/slots?userId=${userId}&from=${from}&to=${to}`
      )
      if (!response.ok) throw new Error('Failed to load slots')
      const { slots } = await response.json()
      setSlots(slots || [])
    } catch (err) {
      console.error('Failed to fetch slots:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBook = async () => {
    if (!selectedSlot || !guestName || !guestEmail) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsBooking(true)

    try {
      const response = await fetch('/api/emails/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          guestName,
          guestEmail,
          title: title || `Meeting with ${guestName}`,
          description,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          timezone: selectedSlot.timezone,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Booking failed')
      }

      setBookingComplete(true)
    } catch (err: any) {
      toast.error(err.message || 'Failed to book meeting')
    } finally {
      setIsBooking(false)
    }
  }

  // Group slots by day
  const slotsByDay = slots.reduce((acc, slot) => {
    const day = startOfDay(new Date(slot.startTime)).toISOString()
    if (!acc[day]) acc[day] = []
    acc[day].push(slot)
    return acc
  }, {} as Record<string, AvailableSlot[]>)

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  if (bookingComplete) {
    return (
      <Card className="mx-auto max-w-md p-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Booking Confirmed!</h2>
        <p className="text-muted-foreground">
          Your meeting has been scheduled for{' '}
          {format(new Date(selectedSlot!.startTime), 'EEEE, MMMM d, yyyy')} at{' '}
          {format(new Date(selectedSlot!.startTime), 'h:mm a')}.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          You will receive a confirmation email shortly.
        </p>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Book a meeting{hostName ? ` with ${hostName}` : ''}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select an available time slot below
        </p>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}
          disabled={isSameDay(currentWeekStart, startOfDay(new Date()))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">
          {format(currentWeekStart, 'MMM d')} -{' '}
          {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-7">
          {weekDays.map((day) => {
            const daySlots = slotsByDay[startOfDay(day).toISOString()] || []
            const isToday = isSameDay(day, new Date())

            return (
              <div key={day.toISOString()} className="space-y-2">
                <div
                  className={`text-center text-sm font-medium ${
                    isToday ? 'text-primary' : ''
                  }`}
                >
                  <div>{format(day, 'EEE')}</div>
                  <div
                    className={`${
                      isToday
                        ? 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'
                        : ''
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
                <div className="space-y-1">
                  {daySlots.length === 0 ? (
                    <div className="rounded bg-muted/50 px-2 py-1 text-center text-xs text-muted-foreground">
                      No slots
                    </div>
                  ) : (
                    daySlots.map((slot) => {
                      const isSelected =
                        selectedSlot?.startTime === slot.startTime
                      return (
                        <button
                          key={slot.startTime}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full rounded px-2 py-1 text-xs transition-colors ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-accent'
                          }`}
                        >
                          {format(new Date(slot.startTime), 'h:mm a')}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Booking form */}
      {selectedSlot && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Book your meeting</h3>
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(new Date(selectedSlot.startTime), 'EEEE, MMMM d, yyyy')} at{' '}
            {format(new Date(selectedSlot.startTime), 'h:mm a')} -{' '}
            {format(new Date(selectedSlot.endTime), 'h:mm a')}
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guestName">Your Name *</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestEmail">Your Email *</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Quick chat about the position"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Notes</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Anything you'd like to discuss..."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleBook} disabled={isBooking} className="gap-2">
                {isBooking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Confirm Booking
              </Button>
              <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

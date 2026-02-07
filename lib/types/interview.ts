// =============================================
// Interview/Calendar Module Types
// =============================================

// Interview type enumeration
export type InterviewType = 'phone' | 'video' | 'onsite'

// Interview status
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show'

// Interview outcome
export type InterviewOutcome = 'positive' | 'neutral' | 'negative'

// Core interview interface
export interface Interview {
  id: string
  userId: string
  jobApplicationId?: string
  recruitmentProcessId?: string

  // Core data
  title: string
  company: string
  position: string
  interviewType: InterviewType
  status: InterviewStatus

  // Scheduling
  scheduledAt: string // ISO datetime
  duration: number // minutes
  timezone: string

  // Location/Meeting
  location?: string
  meetingLink?: string

  // Interviewer info
  interviewerName?: string
  interviewerEmail?: string
  interviewerPhone?: string

  // Notes
  notes?: string
  prepNotes?: string
  questions?: string[]

  // Outcome (post-interview)
  outcome?: InterviewOutcome
  feedback?: string
  nextSteps?: string

  // Google Calendar
  googleCalendarEventId?: string

  // Reminder tracking
  reminderSent24h: boolean
  reminderSent1h: boolean

  // Timestamps
  createdAt: string
  updatedAt: string
}

// Database row type (snake_case for Supabase)
export interface InterviewRow {
  id: string
  user_id: string
  job_application_id: string | null
  recruitment_process_id: string | null
  title: string
  company: string
  position: string
  interview_type: InterviewType
  status: InterviewStatus
  scheduled_at: string
  duration: number
  timezone: string
  location: string | null
  meeting_link: string | null
  interviewer_name: string | null
  interviewer_email: string | null
  interviewer_phone: string | null
  notes: string | null
  prep_notes: string | null
  questions: string[] | null
  outcome: InterviewOutcome | null
  feedback: string | null
  next_steps: string | null
  google_calendar_event_id: string | null
  reminder_sent_24h: boolean
  reminder_sent_1h: boolean
  created_at: string
  updated_at: string
}

// Conversion utility
export function interviewFromRow(row: InterviewRow): Interview {
  return {
    id: row.id,
    userId: row.user_id,
    jobApplicationId: row.job_application_id ?? undefined,
    recruitmentProcessId: row.recruitment_process_id ?? undefined,
    title: row.title,
    company: row.company,
    position: row.position,
    interviewType: row.interview_type,
    status: row.status,
    scheduledAt: row.scheduled_at,
    duration: row.duration,
    timezone: row.timezone,
    location: row.location ?? undefined,
    meetingLink: row.meeting_link ?? undefined,
    interviewerName: row.interviewer_name ?? undefined,
    interviewerEmail: row.interviewer_email ?? undefined,
    interviewerPhone: row.interviewer_phone ?? undefined,
    notes: row.notes ?? undefined,
    prepNotes: row.prep_notes ?? undefined,
    questions: row.questions ?? undefined,
    outcome: row.outcome ?? undefined,
    feedback: row.feedback ?? undefined,
    nextSteps: row.next_steps ?? undefined,
    googleCalendarEventId: row.google_calendar_event_id ?? undefined,
    reminderSent24h: row.reminder_sent_24h,
    reminderSent1h: row.reminder_sent_1h,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// Convert Interview to row for database insert/update
export function interviewToRow(interview: Partial<Interview>): Partial<InterviewRow> {
  const row: Partial<InterviewRow> = {}

  if (interview.userId !== undefined) row.user_id = interview.userId
  if (interview.jobApplicationId !== undefined) row.job_application_id = interview.jobApplicationId ?? null
  if (interview.recruitmentProcessId !== undefined) row.recruitment_process_id = interview.recruitmentProcessId ?? null
  if (interview.title !== undefined) row.title = interview.title
  if (interview.company !== undefined) row.company = interview.company
  if (interview.position !== undefined) row.position = interview.position
  if (interview.interviewType !== undefined) row.interview_type = interview.interviewType
  if (interview.status !== undefined) row.status = interview.status
  if (interview.scheduledAt !== undefined) row.scheduled_at = interview.scheduledAt
  if (interview.duration !== undefined) row.duration = interview.duration
  if (interview.timezone !== undefined) row.timezone = interview.timezone
  if (interview.location !== undefined) row.location = interview.location ?? null
  if (interview.meetingLink !== undefined) row.meeting_link = interview.meetingLink ?? null
  if (interview.interviewerName !== undefined) row.interviewer_name = interview.interviewerName ?? null
  if (interview.interviewerEmail !== undefined) row.interviewer_email = interview.interviewerEmail ?? null
  if (interview.interviewerPhone !== undefined) row.interviewer_phone = interview.interviewerPhone ?? null
  if (interview.notes !== undefined) row.notes = interview.notes ?? null
  if (interview.prepNotes !== undefined) row.prep_notes = interview.prepNotes ?? null
  if (interview.questions !== undefined) row.questions = interview.questions ?? null
  if (interview.outcome !== undefined) row.outcome = interview.outcome ?? null
  if (interview.feedback !== undefined) row.feedback = interview.feedback ?? null
  if (interview.nextSteps !== undefined) row.next_steps = interview.nextSteps ?? null

  return row
}

// Form data for creating/editing interviews
export interface InterviewFormData {
  title: string
  company: string
  position: string
  interviewType: InterviewType
  scheduledAt: string
  duration: number
  timezone: string
  location?: string
  meetingLink?: string
  interviewerName?: string
  interviewerEmail?: string
  interviewerPhone?: string
  notes?: string
  prepNotes?: string
  questions?: string[]
  jobApplicationId?: string
  recruitmentProcessId?: string
}

// Default form values
export const defaultInterviewFormData: InterviewFormData = {
  title: '',
  company: '',
  position: '',
  interviewType: 'video',
  scheduledAt: '',
  duration: 60,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  location: '',
  meetingLink: '',
  interviewerName: '',
  interviewerEmail: '',
  interviewerPhone: '',
  notes: '',
  prepNotes: '',
  questions: [],
}

// Interview type configuration (colors and labels)
// Icon names reference Lucide icons - render them in components
export const interviewTypeConfig: Record<InterviewType, { label: string; color: string; bgColor: string; borderColor: string; icon: string }> = {
  phone: { label: 'Phone', color: 'text-blue-600', bgColor: 'bg-blue-600/10', borderColor: 'border-blue-600', icon: 'phone' },
  video: { label: 'Video', color: 'text-purple-600', bgColor: 'bg-purple-600/10', borderColor: 'border-purple-600', icon: 'video' },
  onsite: { label: 'Onsite', color: 'text-green-600', bgColor: 'bg-green-600/10', borderColor: 'border-green-600', icon: 'building-2' },
}

// Interview status configuration
export const interviewStatusConfig: Record<InterviewStatus, { label: string; color: string; bgColor: string }> = {
  scheduled: { label: 'Scheduled', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  completed: { label: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100' },
  cancelled: { label: 'Cancelled', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  rescheduled: { label: 'Rescheduled', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  no_show: { label: 'No Show', color: 'text-red-600', bgColor: 'bg-red-100' },
}

// Interview outcome configuration
export const interviewOutcomeConfig: Record<InterviewOutcome, { label: string; color: string; bgColor: string; icon: string }> = {
  positive: { label: 'Positive', color: 'text-green-600', bgColor: 'bg-green-100', icon: '👍' },
  neutral: { label: 'Neutral', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: '👐' },
  negative: { label: 'Negative', color: 'text-red-600', bgColor: 'bg-red-100', icon: '👎' },
}

// Duration options for forms
export const durationOptions = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' },
]

// Common timezones
export const commonTimezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Warsaw',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Australia/Sydney',
  'Pacific/Auckland',
]

// Helper to generate ICS file content
export function generateICS(interview: Interview): string {
  const start = new Date(interview.scheduledAt)
  const end = new Date(start.getTime() + interview.duration * 60 * 1000)

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const escapeText = (text: string) => {
    return text.replace(/[\\;,\n]/g, (match) => {
      if (match === '\n') return '\\n'
      return '\\' + match
    })
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Extend Career//Interview Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${interview.id}@Extend Career.app`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${escapeText(interview.title)} - ${escapeText(interview.company)}`,
  ]

  if (interview.location) {
    lines.push(`LOCATION:${escapeText(interview.location)}`)
  }

  if (interview.meetingLink) {
    lines.push(`URL:${interview.meetingLink}`)
  }

  const description = [
    `Position: ${interview.position}`,
    `Type: ${interviewTypeConfig[interview.interviewType].label}`,
    interview.interviewerName ? `Interviewer: ${interview.interviewerName}` : '',
    interview.interviewerEmail ? `Contact: ${interview.interviewerEmail}` : '',
    interview.meetingLink ? `Meeting Link: ${interview.meetingLink}` : '',
    interview.notes ? `Notes: ${interview.notes}` : '',
  ].filter(Boolean).join('\\n')

  lines.push(`DESCRIPTION:${escapeText(description)}`)

  // Add reminder 1 hour before
  lines.push('BEGIN:VALARM')
  lines.push('TRIGGER:-PT1H')
  lines.push('ACTION:DISPLAY')
  lines.push(`DESCRIPTION:Interview reminder: ${interview.title}`)
  lines.push('END:VALARM')

  // Add reminder 24 hours before
  lines.push('BEGIN:VALARM')
  lines.push('TRIGGER:-PT24H')
  lines.push('ACTION:DISPLAY')
  lines.push(`DESCRIPTION:Interview tomorrow: ${interview.title}`)
  lines.push('END:VALARM')

  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')

  return lines.join('\r\n')
}

// Helper to download ICS file
export function downloadICS(interview: Interview): void {
  const icsContent = generateICS(interview)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `interview-${interview.company}-${new Date(interview.scheduledAt).toISOString().split('T')[0]}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// =============================================
// Email Module Types
// =============================================

// Email participant (from/to/cc/bcc)
export interface EmailParticipant {
  name?: string
  email: string
}

// Email attachment
export interface EmailAttachment {
  id: string
  filename: string
  mimeType: string
  size: number
  url?: string
}

// Email thread (conversation)
export interface EmailThread {
  id: string
  userId: string
  emailAccountId: string
  providerThreadId: string
  subject?: string
  snippet?: string
  participants: EmailParticipant[]
  lastMessageAt?: string
  isRead: boolean
  isStarred: boolean
  isArchived: boolean
  isDraft: boolean
  isSent: boolean
  labels: string[]
  messageCount: number
  createdAt: string
  updatedAt: string
}

// Individual email message
export interface EmailMessage {
  id: string
  threadId: string
  providerMessageId: string
  from: EmailParticipant
  to: EmailParticipant[]
  cc: EmailParticipant[]
  bcc: EmailParticipant[]
  subject?: string
  bodyText?: string
  bodyHtml?: string
  attachments: EmailAttachment[]
  isDraft: boolean
  isSent: boolean
  sentAt?: string
  receivedAt?: string
  createdAt: string
  updatedAt: string
}

// Email template
export interface EmailTemplate {
  id: string
  userId: string
  name: string
  subject: string
  body: string
  variables: string[]
  category?: string
  useCount: number
  createdAt: string
  updatedAt: string
}

// Template categories
export type TemplateCategory =
  | 'application'
  | 'follow-up'
  | 'thank-you'
  | 'scheduling'
  | 'general'

// Day of week (0 = Sunday, 6 = Saturday)
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

// Slot duration options
export type SlotDuration = 15 | 30 | 60

// Scheduling availability slot
export interface SchedulingAvailability {
  id: string
  userId: string
  dayOfWeek: DayOfWeek
  startTime: string // HH:mm format
  endTime: string   // HH:mm format
  timezone: string
  slotDuration: SlotDuration
  isEnabled: boolean
  createdAt: string
  updatedAt: string
}

// Meeting status
export type MeetingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

// Scheduled meeting
export interface ScheduledMeeting {
  id: string
  userId: string
  guestName: string
  guestEmail: string
  title: string
  description?: string
  startTime: string
  endTime: string
  timezone: string
  meetingLink?: string
  status: MeetingStatus
  jobApplicationId?: string
  cancellationReason?: string
  reminderSentAt?: string
  createdAt: string
  updatedAt: string
}

// Available time slot for booking
export interface AvailableSlot {
  startTime: string // ISO string
  endTime: string   // ISO string
  timezone: string
}

// Email inbox filter
export type EmailFilter = 'inbox' | 'sent' | 'starred'

// Compose email data
export interface ComposeEmailData {
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  body: string
  replyToThreadId?: string
  replyToMessageId?: string
  attachments?: File[]
}

// =============================================
// Database Row Types (snake_case for Supabase)
// =============================================

export interface EmailThreadRow {
  id: string
  user_id: string
  email_account_id: string
  provider_thread_id: string
  subject: string | null
  snippet: string | null
  participants: EmailParticipant[]
  last_message_at: string | null
  is_read: boolean
  is_starred: boolean
  is_archived: boolean
  is_draft: boolean
  is_sent: boolean
  labels: string[]
  message_count: number
  created_at: string
  updated_at: string
}

export interface EmailMessageRow {
  id: string
  thread_id: string
  provider_message_id: string
  from_address: EmailParticipant
  to_addresses: EmailParticipant[]
  cc_addresses: EmailParticipant[]
  bcc_addresses: EmailParticipant[]
  subject: string | null
  body_text: string | null
  body_html: string | null
  attachments: EmailAttachment[]
  is_draft: boolean
  is_sent: boolean
  sent_at: string | null
  received_at: string | null
  created_at: string
  updated_at: string
}

export interface EmailTemplateRow {
  id: string
  user_id: string
  name: string
  subject: string
  body: string
  variables: string[]
  category: string | null
  use_count: number
  created_at: string
  updated_at: string
}

export interface SchedulingAvailabilityRow {
  id: string
  user_id: string
  day_of_week: number
  start_time: string
  end_time: string
  timezone: string
  slot_duration: number
  is_enabled: boolean
  created_at: string
  updated_at: string
}

export interface ScheduledMeetingRow {
  id: string
  user_id: string
  guest_name: string
  guest_email: string
  title: string
  description: string | null
  start_time: string
  end_time: string
  timezone: string
  meeting_link: string | null
  status: MeetingStatus
  job_application_id: string | null
  cancellation_reason: string | null
  reminder_sent_at: string | null
  created_at: string
  updated_at: string
}

// =============================================
// Conversion Utilities
// =============================================

export function emailThreadFromRow(row: EmailThreadRow): EmailThread {
  return {
    id: row.id,
    userId: row.user_id,
    emailAccountId: row.email_account_id,
    providerThreadId: row.provider_thread_id,
    subject: row.subject ?? undefined,
    snippet: row.snippet ?? undefined,
    participants: row.participants ?? [],
    lastMessageAt: row.last_message_at ?? undefined,
    isRead: row.is_read,
    isStarred: row.is_starred,
    isArchived: row.is_archived,
    isDraft: row.is_draft,
    isSent: row.is_sent ?? false,
    labels: row.labels ?? [],
    messageCount: row.message_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function emailMessageFromRow(row: EmailMessageRow): EmailMessage {
  return {
    id: row.id,
    threadId: row.thread_id,
    providerMessageId: row.provider_message_id,
    from: row.from_address,
    to: row.to_addresses ?? [],
    cc: row.cc_addresses ?? [],
    bcc: row.bcc_addresses ?? [],
    subject: row.subject ?? undefined,
    bodyText: row.body_text ?? undefined,
    bodyHtml: row.body_html ?? undefined,
    attachments: row.attachments ?? [],
    isDraft: row.is_draft,
    isSent: row.is_sent,
    sentAt: row.sent_at ?? undefined,
    receivedAt: row.received_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function emailTemplateFromRow(row: EmailTemplateRow): EmailTemplate {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    subject: row.subject,
    body: row.body,
    variables: row.variables ?? [],
    category: row.category ?? undefined,
    useCount: row.use_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function schedulingAvailabilityFromRow(row: SchedulingAvailabilityRow): SchedulingAvailability {
  return {
    id: row.id,
    userId: row.user_id,
    dayOfWeek: row.day_of_week as DayOfWeek,
    startTime: row.start_time,
    endTime: row.end_time,
    timezone: row.timezone,
    slotDuration: row.slot_duration as SlotDuration,
    isEnabled: row.is_enabled,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function scheduledMeetingFromRow(row: ScheduledMeetingRow): ScheduledMeeting {
  return {
    id: row.id,
    userId: row.user_id,
    guestName: row.guest_name,
    guestEmail: row.guest_email,
    title: row.title,
    description: row.description ?? undefined,
    startTime: row.start_time,
    endTime: row.end_time,
    timezone: row.timezone,
    meetingLink: row.meeting_link ?? undefined,
    status: row.status,
    jobApplicationId: row.job_application_id ?? undefined,
    cancellationReason: row.cancellation_reason ?? undefined,
    reminderSentAt: row.reminder_sent_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// =============================================
// Default Values
// =============================================

export const defaultAvailability: Omit<SchedulingAvailability, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  dayOfWeek: 1, // Monday
  startTime: '09:00',
  endTime: '17:00',
  timezone: 'Europe/Warsaw',
  slotDuration: 30,
  isEnabled: true,
}

export const templateCategories: { value: TemplateCategory; label: string }[] = [
  { value: 'application', label: 'Job Application' },
  { value: 'follow-up', label: 'Follow Up' },
  { value: 'thank-you', label: 'Thank You' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'general', label: 'General' },
]

export const dayOfWeekLabels: Record<DayOfWeek, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

export const meetingStatusConfig: Record<MeetingStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  confirmed: { label: 'Confirmed', color: 'text-green-600', bgColor: 'bg-green-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bgColor: 'bg-red-100' },
  completed: { label: 'Completed', color: 'text-gray-600', bgColor: 'bg-gray-100' },
}

// Template variable helpers
export const commonTemplateVariables = [
  '{{name}}',
  '{{company}}',
  '{{job_title}}',
  '{{date}}',
  '{{time}}',
  '{{meeting_link}}',
]

export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string>
): string {
  let result = template
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
  }
  return result
}

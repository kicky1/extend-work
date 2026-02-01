'use client'

import { create } from 'zustand'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import type {
  EmailThread,
  EmailMessage,
  EmailTemplate,
  SchedulingAvailability,
  ScheduledMeeting,
  EmailFilter,
  ComposeEmailData,
  EmailThreadRow,
  EmailMessageRow,
  EmailTemplateRow,
  SchedulingAvailabilityRow,
  ScheduledMeetingRow,
  DayOfWeek,
  SlotDuration,
} from '@/lib/types/email'
import {
  emailThreadFromRow,
  emailMessageFromRow,
  emailTemplateFromRow,
  schedulingAvailabilityFromRow,
  scheduledMeetingFromRow,
} from '@/lib/types/email'
import type { UserEmailAccount } from '@/lib/types/job'

interface EmailStore {
  // Accounts state
  accounts: UserEmailAccount[]
  selectedAccountId: string | null
  isAccountsLoading: boolean

  // Threads state
  threads: EmailThread[]
  selectedThreadId: string | null
  isThreadsLoading: boolean
  isLoadingMore: boolean
  filter: EmailFilter
  page: number
  hasMore: boolean

  // Messages state
  messages: EmailMessage[]
  isMessagesLoading: boolean

  // Templates state
  templates: EmailTemplate[]
  isTemplatesLoading: boolean

  // Sync state
  lastSyncAt: string | null
  isSyncing: boolean
  syncError: string | null
  nextPageToken: string | null
  isFetchingMore: boolean

  // Scheduling state
  availability: SchedulingAvailability[]
  isAvailabilityLoading: boolean
  meetings: ScheduledMeeting[]
  isMeetingsLoading: boolean

  // Compose state
  isComposing: boolean
  composeData: Partial<ComposeEmailData> | null
  replyToThread: EmailThread | null

  // Account actions
  loadAccounts: () => Promise<void>
  selectAccount: (accountId: string | null) => void
  deleteAccount: (accountId: string) => Promise<void>

  // Thread actions
  loadThreads: (filter?: EmailFilter, reset?: boolean) => Promise<void>
  loadMoreThreads: () => Promise<void>
  selectThread: (threadId: string | null) => void
  setFilter: (filter: EmailFilter) => void
  archiveThread: (threadId: string) => Promise<void>
  markRead: (threadId: string, isRead: boolean) => Promise<void>
  toggleStar: (threadId: string) => Promise<void>
  deleteThread: (threadId: string) => Promise<void>

  // Message actions
  loadMessages: (threadId: string) => Promise<void>
  sendMessage: (data: ComposeEmailData) => Promise<void>
  saveDraft: (data: ComposeEmailData) => Promise<void>

  // Template actions
  loadTemplates: () => Promise<void>
  createTemplate: (template: Omit<EmailTemplate, 'id' | 'userId' | 'useCount' | 'createdAt' | 'updatedAt'>) => Promise<EmailTemplate | null>
  updateTemplate: (id: string, template: Partial<EmailTemplate>) => Promise<void>
  deleteTemplate: (id: string) => Promise<void>
  incrementTemplateUse: (id: string) => Promise<void>

  // Sync actions
  syncEmails: () => Promise<void>
  fetchMoreFromProvider: () => Promise<void>

  // Scheduling actions
  loadAvailability: () => Promise<void>
  updateAvailability: (dayOfWeek: DayOfWeek, data: Partial<SchedulingAvailability>) => Promise<void>
  setAvailabilityForDay: (dayOfWeek: DayOfWeek, startTime: string, endTime: string, slotDuration: SlotDuration, isEnabled: boolean) => Promise<void>
  clearAllAvailability: () => Promise<void>

  // Meeting actions
  loadMeetings: () => Promise<void>
  cancelMeeting: (meetingId: string, reason?: string) => Promise<void>
  confirmMeeting: (meetingId: string) => Promise<void>
  deleteMeeting: (meetingId: string) => Promise<void>

  // Compose actions
  openCompose: (data?: Partial<ComposeEmailData>, replyTo?: EmailThread) => void
  closeCompose: () => void
  updateComposeData: (data: Partial<ComposeEmailData>) => void
}

const useEmailStore = create<EmailStore>((set, get) => ({
  // Initial state
  accounts: [],
  selectedAccountId: null,
  isAccountsLoading: false,

  threads: [],
  selectedThreadId: null,
  isThreadsLoading: false,
  isLoadingMore: false,
  filter: 'inbox',
  page: 1,
  hasMore: false,

  messages: [],
  isMessagesLoading: false,

  templates: [],
  isTemplatesLoading: false,

  lastSyncAt: null,
  isSyncing: false,
  syncError: null,
  nextPageToken: null,
  isFetchingMore: false,

  availability: [],
  isAvailabilityLoading: false,
  meetings: [],
  isMeetingsLoading: false,

  isComposing: false,
  composeData: null,
  replyToThread: null,

  // Account actions
  loadAccounts: async () => {
    set({ isAccountsLoading: true })

    try {
      const response = await fetch('/api/emails/accounts')
      if (!response.ok) {
        if (response.status === 401) {
          set({ accounts: [], isAccountsLoading: false })
          return
        }
        throw new Error('Failed to load accounts')
      }

      const { accounts } = await response.json()
      const firstAccount = accounts?.[0]
      set({
        accounts: accounts || [],
        selectedAccountId: firstAccount?.id || null,
        nextPageToken: firstAccount?.syncPageToken || null,
        isAccountsLoading: false,
      })
    } catch (error) {
      console.error('[EmailStore] Error loading accounts:', error)
      set({ isAccountsLoading: false })
    }
  },

  selectAccount: (accountId) => {
    const account = get().accounts.find(a => a.id === accountId)
    set({
      selectedAccountId: accountId,
      threads: [],
      selectedThreadId: null,
      nextPageToken: account?.syncPageToken || null,
    })
    if (accountId) {
      get().loadThreads()
    }
  },

  deleteAccount: async (accountId) => {
    try {
      const response = await fetch(`/api/emails/accounts?id=${accountId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete account')

      const { accounts, selectedAccountId } = get()
      const remainingAccounts = accounts.filter(a => a.id !== accountId)
      const newSelectedId = selectedAccountId === accountId
        ? remainingAccounts[0]?.id || null
        : selectedAccountId

      set({
        accounts: remainingAccounts,
        selectedAccountId: newSelectedId,
        threads: selectedAccountId === accountId ? [] : get().threads,
      })

      if (newSelectedId && selectedAccountId === accountId) {
        get().loadThreads()
      }
    } catch (error) {
      console.error('[EmailStore] Error deleting account:', error)
      throw error
    }
  },

  // Thread actions
  loadThreads: async (filter, reset = true) => {
    const { selectedAccountId } = get()
    if (!selectedAccountId) return

    const currentFilter = filter || get().filter
    const page = reset ? 1 : get().page

    if (reset) {
      set({ isThreadsLoading: true, filter: currentFilter, page: 1 })
    }

    try {
      const params = new URLSearchParams({
        accountId: selectedAccountId,
        filter: currentFilter,
        page: page.toString(),
        limit: '50',
      })

      const response = await fetch(`/api/emails/threads?${params}`)
      if (!response.ok) throw new Error('Failed to load threads')

      const { threads: newThreads, hasMore } = await response.json()

      if (reset) {
        set({ threads: newThreads || [], hasMore, isThreadsLoading: false })
      } else {
        set((state) => ({
          threads: [...state.threads, ...(newThreads || [])],
          hasMore,
        }))
      }
    } catch (error) {
      console.error('[EmailStore] Error loading threads:', error)
      set({ isThreadsLoading: false })
    }
  },

  loadMoreThreads: async () => {
    const { selectedAccountId, hasMore, isLoadingMore, page, filter } = get()
    if (!selectedAccountId || !hasMore || isLoadingMore) return

    set({ isLoadingMore: true })

    try {
      const nextPage = page + 1
      const params = new URLSearchParams({
        accountId: selectedAccountId,
        filter,
        page: nextPage.toString(),
        limit: '50',
      })

      const response = await fetch(`/api/emails/threads?${params}`)
      if (!response.ok) throw new Error('Failed to load more threads')

      const { threads: newThreads, hasMore: moreAvailable } = await response.json()

      set((state) => ({
        threads: [...state.threads, ...(newThreads || [])],
        page: nextPage,
        hasMore: moreAvailable,
        isLoadingMore: false,
      }))
    } catch (error) {
      console.error('[EmailStore] Error loading more threads:', error)
      set({ isLoadingMore: false })
    }
  },

  selectThread: (threadId) => {
    set({ selectedThreadId: threadId, messages: [] })
    if (threadId) {
      get().loadMessages(threadId)
      // Mark as read when selected
      const thread = get().threads.find(t => t.id === threadId)
      if (thread && !thread.isRead) {
        get().markRead(threadId, true)
      }
    }
  },

  setFilter: (filter) => {
    set({ filter })
    get().loadThreads(filter)
  },

  archiveThread: async (threadId) => {
    try {
      const response = await fetch(`/api/emails/threads/${threadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: true }),
      })

      if (!response.ok) throw new Error('Failed to archive thread')

      set((state) => ({
        threads: state.threads.map(t =>
          t.id === threadId ? { ...t, isArchived: true } : t
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error archiving thread:', error)
      throw error
    }
  },

  markRead: async (threadId, isRead) => {
    try {
      const response = await fetch(`/api/emails/threads/${threadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead }),
      })

      if (!response.ok) throw new Error('Failed to update read status')

      set((state) => ({
        threads: state.threads.map(t =>
          t.id === threadId ? { ...t, isRead } : t
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error updating read status:', error)
      throw error
    }
  },

  toggleStar: async (threadId) => {
    const thread = get().threads.find(t => t.id === threadId)
    if (!thread) return

    try {
      const response = await fetch(`/api/emails/threads/${threadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isStarred: !thread.isStarred }),
      })

      if (!response.ok) throw new Error('Failed to toggle star')

      set((state) => ({
        threads: state.threads.map(t =>
          t.id === threadId ? { ...t, isStarred: !t.isStarred } : t
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error toggling star:', error)
      throw error
    }
  },

  deleteThread: async (threadId) => {
    try {
      const response = await fetch(`/api/emails/threads/${threadId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete thread')

      set((state) => ({
        threads: state.threads.filter(t => t.id !== threadId),
        selectedThreadId: state.selectedThreadId === threadId ? null : state.selectedThreadId,
      }))
    } catch (error) {
      console.error('[EmailStore] Error deleting thread:', error)
      throw error
    }
  },

  // Message actions
  loadMessages: async (threadId) => {
    set({ isMessagesLoading: true })

    try {
      const response = await fetch(`/api/emails/threads/${threadId}`)
      if (!response.ok) throw new Error('Failed to load messages')

      const { messages } = await response.json()
      set({ messages: messages || [], isMessagesLoading: false })
    } catch (error) {
      console.error('[EmailStore] Error loading messages:', error)
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (data) => {
    const { selectedAccountId } = get()
    if (!selectedAccountId) throw new Error('No account selected')

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailAccountId: selectedAccountId,
          to: data.to[0],
          subject: data.subject,
          htmlBody: data.body,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send email')
      }

      // Close compose and refresh threads
      set({ isComposing: false, composeData: null, replyToThread: null })
      get().loadThreads()
    } catch (error) {
      console.error('[EmailStore] Error sending message:', error)
      throw error
    }
  },

  saveDraft: async (data) => {
    const { selectedAccountId } = get()
    if (!selectedAccountId) throw new Error('No account selected')

    try {
      const response = await fetch('/api/emails/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: selectedAccountId,
          ...data,
        }),
      })

      if (!response.ok) throw new Error('Failed to save draft')

      set({ isComposing: false, composeData: null, replyToThread: null })
    } catch (error) {
      console.error('[EmailStore] Error saving draft:', error)
      throw error
    }
  },

  // Template actions
  loadTemplates: async () => {
    set({ isTemplatesLoading: true })

    try {
      const response = await fetch('/api/emails/templates')
      if (!response.ok) {
        if (response.status === 401) {
          set({ templates: [], isTemplatesLoading: false })
          return
        }
        throw new Error('Failed to load templates')
      }

      const { templates } = await response.json()
      set({ templates: templates || [], isTemplatesLoading: false })
    } catch (error) {
      console.error('[EmailStore] Error loading templates:', error)
      set({ isTemplatesLoading: false })
    }
  },

  createTemplate: async (template) => {
    try {
      const response = await fetch('/api/emails/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      })

      if (!response.ok) throw new Error('Failed to create template')

      const { template: newTemplate } = await response.json()
      set((state) => ({
        templates: [newTemplate, ...state.templates],
      }))
      return newTemplate
    } catch (error) {
      console.error('[EmailStore] Error creating template:', error)
      throw error
    }
  },

  updateTemplate: async (id, template) => {
    try {
      const response = await fetch(`/api/emails/templates?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template),
      })

      if (!response.ok) throw new Error('Failed to update template')

      const { template: updated } = await response.json()
      set((state) => ({
        templates: state.templates.map(t => t.id === id ? updated : t),
      }))
    } catch (error) {
      console.error('[EmailStore] Error updating template:', error)
      throw error
    }
  },

  deleteTemplate: async (id) => {
    try {
      const response = await fetch(`/api/emails/templates?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete template')

      set((state) => ({
        templates: state.templates.filter(t => t.id !== id),
      }))
    } catch (error) {
      console.error('[EmailStore] Error deleting template:', error)
      throw error
    }
  },

  incrementTemplateUse: async (id) => {
    try {
      await fetch(`/api/emails/templates?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incrementUse: true }),
      })

      set((state) => ({
        templates: state.templates.map(t =>
          t.id === id ? { ...t, useCount: t.useCount + 1 } : t
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error incrementing template use:', error)
    }
  },

  // Sync actions
  syncEmails: async () => {
    const { selectedAccountId } = get()
    if (!selectedAccountId) return

    set({ isSyncing: true, syncError: null })

    try {
      const response = await fetch('/api/emails/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: selectedAccountId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Sync failed')
      }

      const { syncedAt, nextPageToken } = await response.json()
      set((state) => ({
        lastSyncAt: syncedAt,
        isSyncing: false,
        nextPageToken: nextPageToken || null,
        // Also update the account's syncPageToken
        accounts: state.accounts.map(a =>
          a.id === selectedAccountId ? { ...a, syncPageToken: nextPageToken || null } : a
        ),
      }))

      // Reload threads after sync
      get().loadThreads()
    } catch (error: any) {
      console.error('[EmailStore] Sync error:', error)
      set({ syncError: error.message, isSyncing: false })
    }
  },

  fetchMoreFromProvider: async () => {
    const { selectedAccountId, nextPageToken, isFetchingMore } = get()
    if (!selectedAccountId || !nextPageToken || isFetchingMore) return

    set({ isFetchingMore: true, syncError: null })

    try {
      const response = await fetch('/api/emails/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: selectedAccountId, pageToken: nextPageToken }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch more emails')
      }

      const { nextPageToken: newNextPageToken } = await response.json()

      // Show toast if no more emails available from provider
      if (!newNextPageToken) {
        toast.info('All emails have been synced from your mailbox')
      }

      set((state) => ({
        isFetchingMore: false,
        nextPageToken: newNextPageToken || null,
        // Also update the account's syncPageToken
        accounts: state.accounts.map(a =>
          a.id === selectedAccountId ? { ...a, syncPageToken: newNextPageToken || null } : a
        ),
      }))

      // Fetch newly synced emails starting from current position
      // Calculate page based on actual threads loaded to avoid page counter issues
      const { threads, filter } = get()
      const nextPage = Math.floor(threads.length / 50) + 1

      const params = new URLSearchParams({
        accountId: selectedAccountId,
        filter,
        page: nextPage.toString(),
        limit: '50',
      })

      const threadsResponse = await fetch(`/api/emails/threads?${params}`)
      if (threadsResponse.ok) {
        const { threads: newThreads, hasMore } = await threadsResponse.json()
        if (newThreads && newThreads.length > 0) {
          set((state) => ({
            threads: [...state.threads, ...newThreads],
            page: nextPage,
            hasMore,
          }))
        } else {
          set({ hasMore })
        }
      }
    } catch (error: any) {
      console.error('[EmailStore] Fetch more error:', error)
      set({ syncError: error.message, isFetchingMore: false })
    }
  },

  // Scheduling actions
  loadAvailability: async () => {
    set({ isAvailabilityLoading: true })

    try {
      const response = await fetch('/api/emails/schedule/availability')
      if (!response.ok) {
        if (response.status === 401) {
          set({ availability: [], isAvailabilityLoading: false })
          return
        }
        throw new Error('Failed to load availability')
      }

      const { availability } = await response.json()
      set({ availability: availability || [], isAvailabilityLoading: false })
    } catch (error) {
      console.error('[EmailStore] Error loading availability:', error)
      set({ isAvailabilityLoading: false })
    }
  },

  updateAvailability: async (dayOfWeek, data) => {
    try {
      const response = await fetch('/api/emails/schedule/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayOfWeek, ...data }),
      })

      if (!response.ok) throw new Error('Failed to update availability')

      const { availability: updated } = await response.json()
      set((state) => ({
        availability: state.availability.map(a =>
          a.dayOfWeek === dayOfWeek ? updated : a
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error updating availability:', error)
      throw error
    }
  },

  setAvailabilityForDay: async (dayOfWeek, startTime, endTime, slotDuration, isEnabled) => {
    try {
      const response = await fetch('/api/emails/schedule/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayOfWeek, startTime, endTime, slotDuration, isEnabled }),
      })

      if (!response.ok) throw new Error('Failed to set availability')

      // Reload all availability
      get().loadAvailability()
    } catch (error) {
      console.error('[EmailStore] Error setting availability:', error)
      throw error
    }
  },

  clearAllAvailability: async () => {
    try {
      const response = await fetch('/api/emails/schedule/availability', {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to clear availability')

      set({ availability: [] })
    } catch (error) {
      console.error('[EmailStore] Error clearing availability:', error)
      throw error
    }
  },

  // Meeting actions
  loadMeetings: async () => {
    set({ isMeetingsLoading: true })

    try {
      const response = await fetch('/api/emails/meetings')
      if (!response.ok) {
        if (response.status === 401) {
          set({ meetings: [], isMeetingsLoading: false })
          return
        }
        throw new Error('Failed to load meetings')
      }

      const { meetings } = await response.json()
      set({ meetings: meetings || [], isMeetingsLoading: false })
    } catch (error) {
      console.error('[EmailStore] Error loading meetings:', error)
      set({ isMeetingsLoading: false })
    }
  },

  cancelMeeting: async (meetingId, reason) => {
    try {
      const response = await fetch(`/api/emails/meetings?id=${meetingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled', cancellationReason: reason }),
      })

      if (!response.ok) throw new Error('Failed to cancel meeting')

      set((state) => ({
        meetings: state.meetings.map(m =>
          m.id === meetingId ? { ...m, status: 'cancelled' as const, cancellationReason: reason } : m
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error cancelling meeting:', error)
      throw error
    }
  },

  confirmMeeting: async (meetingId) => {
    try {
      const response = await fetch(`/api/emails/meetings?id=${meetingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'confirmed' }),
      })

      if (!response.ok) throw new Error('Failed to confirm meeting')

      set((state) => ({
        meetings: state.meetings.map(m =>
          m.id === meetingId ? { ...m, status: 'confirmed' as const } : m
        ),
      }))
    } catch (error) {
      console.error('[EmailStore] Error confirming meeting:', error)
      throw error
    }
  },

  deleteMeeting: async (meetingId) => {
    try {
      const response = await fetch(`/api/emails/meetings?id=${meetingId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete meeting')

      set((state) => ({
        meetings: state.meetings.filter(m => m.id !== meetingId),
      }))
    } catch (error) {
      console.error('[EmailStore] Error deleting meeting:', error)
      throw error
    }
  },

  // Compose actions
  openCompose: (data, replyTo) => {
    set({
      isComposing: true,
      composeData: data || {},
      replyToThread: replyTo || null,
    })
  },

  closeCompose: () => {
    set({
      isComposing: false,
      composeData: null,
      replyToThread: null,
    })
  },

  updateComposeData: (data) => {
    set((state) => ({
      composeData: { ...state.composeData, ...data },
    }))
  },
}))

export default useEmailStore

// Selector hooks
export const useEmailAccounts = () => useEmailStore((state) => state.accounts)
export const useSelectedAccount = () => useEmailStore((state) =>
  state.accounts.find(a => a.id === state.selectedAccountId)
)
export const useEmailThreads = () => useEmailStore((state) => state.threads)
export const useSelectedThread = () => useEmailStore((state) =>
  state.threads.find(t => t.id === state.selectedThreadId)
)
export const useEmailMessages = () => useEmailStore((state) => state.messages)
export const useEmailTemplates = () => useEmailStore((state) => state.templates)
export const useSchedulingAvailability = () => useEmailStore((state) => state.availability)
export const useScheduledMeetings = () => useEmailStore((state) => state.meetings)
export const useUpcomingMeetings = () => useEmailStore((state) =>
  state.meetings.filter(m =>
    m.status !== 'cancelled' &&
    m.status !== 'completed' &&
    new Date(m.startTime) > new Date()
  ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
)

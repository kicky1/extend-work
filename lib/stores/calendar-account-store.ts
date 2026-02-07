'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'

interface CalendarAccount {
  id: string
  email: string
  provider: string
  isActive: boolean
}

interface CalendarAccountStore {
  account: CalendarAccount | null
  isLoading: boolean
  isConnecting: boolean

  loadAccount: () => Promise<void>
  connectAccount: (code: string, state: string) => Promise<void>
  disconnectAccount: () => Promise<void>
}

const useCalendarAccountStore = create<CalendarAccountStore>((set) => ({
  account: null,
  isLoading: false,
  isConnecting: false,

  loadAccount: async () => {
    const supabase = createClient()
    set({ isLoading: true })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        set({ account: null, isLoading: false })
        return
      }

      const { data, error } = await supabase
        .from('user_calendar_accounts')
        .select('id, email, provider, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle()

      if (error) throw error

      set({
        account: data ? {
          id: data.id,
          email: data.email,
          provider: data.provider,
          isActive: data.is_active,
        } : null,
        isLoading: false,
      })
    } catch (error: any) {
      console.error('Error loading calendar account:', error)
      set({ isLoading: false })
    }
  },

  connectAccount: async (code: string, state: string) => {
    set({ isConnecting: true })

    try {
      const response = await fetch('/api/calendar/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to connect calendar')
      }

      // Reload account data
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('user_calendar_accounts')
        .select('id, email, provider, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle()

      if (error) throw error

      set({
        account: data ? {
          id: data.id,
          email: data.email,
          provider: data.provider,
          isActive: data.is_active,
        } : null,
        isConnecting: false,
      })
    } catch (error: any) {
      console.error('Error connecting calendar:', error)
      set({ isConnecting: false })
      throw error
    }
  },

  disconnectAccount: async () => {
    try {
      const response = await fetch('/api/calendar/connect', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to disconnect')
      }

      set({ account: null })
    } catch (error: any) {
      console.error('Error disconnecting calendar:', error)
      throw error
    }
  },
}))

export default useCalendarAccountStore

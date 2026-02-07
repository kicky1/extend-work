import { create } from 'zustand'
import type { CoverLetterData } from '@/lib/types/cover-letter'
import { defaultCoverLetterData } from '@/lib/types/cover-letter'
import { createClient } from '@/lib/supabase/client'

interface CoverLetterStore {
  // State
  coverLetterData: Omit<CoverLetterData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  selectedId: string | null
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  isDirty: boolean
  error: string | null
  isInitialized: boolean
  isGenerating: boolean
  pendingGeneration: { jobTitle?: string; company?: string; jobDescription?: string } | null

  // Actions
  updateContent: (content: string) => void
  updateTone: (tone: CoverLetterData['tone']) => void
  updateLanguage: (language: CoverLetterData['language']) => void
  updateJobInfo: (data: { jobTitle?: string; company?: string; jobDescription?: string }) => void
  setFullData: (data: Partial<CoverLetterData>) => void
  setIsGenerating: (v: boolean) => void
  setPendingGeneration: (data: { jobTitle?: string; company?: string; jobDescription?: string } | null) => void
  reset: () => void

  // Database
  saveToDB: () => Promise<void>
  loadFromDB: (id: string) => Promise<void>
  getOrCreateCoverLetter: () => Promise<string | null>
}

const useCoverLetterStore = create<CoverLetterStore>((set, get) => ({
  coverLetterData: defaultCoverLetterData,
  selectedId: null,
  saveStatus: 'idle',
  isDirty: false,
  error: null,
  isInitialized: false,
  isGenerating: false,
  pendingGeneration: null,

  updateContent: (content) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, content },
      isDirty: true,
    })),

  updateTone: (tone) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, tone },
      isDirty: true,
    })),

  updateLanguage: (language) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, language },
      isDirty: true,
    })),

  updateJobInfo: (data) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, ...data },
      isDirty: true,
    })),

  setFullData: (data) =>
    set((state) => ({
      coverLetterData: { ...state.coverLetterData, ...data },
    })),

  setIsGenerating: (v) => set({ isGenerating: v }),

  setPendingGeneration: (data) => set({ pendingGeneration: data }),

  reset: () =>
    set({
      coverLetterData: defaultCoverLetterData,
      selectedId: null,
      saveStatus: 'idle',
      isDirty: false,
      error: null,
      isInitialized: false,
      isGenerating: false,
      pendingGeneration: null,
    }),

  saveToDB: async () => {
    const { coverLetterData, selectedId, isInitialized } = get()
    if (!isInitialized) return

    const supabase = createClient()
    set({ saveStatus: 'saving', error: null })

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('cover_letters')
        .upsert(
          {
            user_id: user.id,
            title: coverLetterData.company
              ? `Cover Letter - ${coverLetterData.company}`
              : 'My Cover Letter',
            data: coverLetterData,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' },
        )
        .select()
        .single()

      if (error) throw error
      if (data && !selectedId) set({ selectedId: data.id })

      set({ saveStatus: 'saved', isDirty: false })
      setTimeout(() => set({ saveStatus: 'idle' }), 2000)
    } catch (error: any) {
      const msg = error?.message || error?.details || JSON.stringify(error) || 'Unknown error'
      set({ saveStatus: 'error', error: msg })
      console.error('Error saving cover letter:', msg, error)
    }
  },

  loadFromDB: async (id) => {
    const supabase = createClient()
    try {
      const { data, error } = await supabase
        .from('cover_letters')
        .select('id, data')
        .eq('id', id)
        .single()

      if (error) throw error
      if (data) {
        set({
          coverLetterData: data.data,
          selectedId: data.id,
          saveStatus: 'idle',
          error: null,
          isInitialized: true,
        })
      }
    } catch (error: any) {
      set({ error: error.message, isInitialized: true })
      console.error('Error loading cover letter:', error)
    }
  },

  getOrCreateCoverLetter: async () => {
    const supabase = createClient()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: existing } = await supabase
        .from('cover_letters')
        .select('id, data')
        .eq('user_id', user.id)
        .single()

      if (existing) {
        set({
          coverLetterData: existing.data,
          selectedId: existing.id,
          saveStatus: 'idle',
          error: null,
          isInitialized: true,
        })
        return existing.id
      }

      const { data: newRecord, error } = await supabase
        .from('cover_letters')
        .insert({
          user_id: user.id,
          title: 'My Cover Letter',
          data: defaultCoverLetterData,
        })
        .select()
        .single()

      if (error) throw error
      if (newRecord) {
        set({
          coverLetterData: newRecord.data,
          selectedId: newRecord.id,
          saveStatus: 'idle',
          error: null,
          isInitialized: true,
        })
        return newRecord.id
      }

      return null
    } catch (error: any) {
      set({ error: error.message, isInitialized: true })
      console.error('Error getting/creating cover letter:', error)
      return null
    }
  },
}))

export default useCoverLetterStore

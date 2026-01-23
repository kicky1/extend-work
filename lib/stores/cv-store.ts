import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type {
  CVData,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Language,
  Certificate,
  Footer,
  CVTheme,
  CV,
  CVSectionType,
} from '@/lib/types/cv'
import { defaultCVData } from '@/lib/types/cv'
import { createClient } from '@/lib/supabase/client'

interface CVStore {
  // State
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  selectedCVId: string | null
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  error: string | null

  // Personal Info Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void

  // Summary Actions
  updateSummary: (summary: string) => void

  // Work Experience Actions
  addWorkExperience: () => void
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
  reorderWorkExperience: (workExperience: WorkExperience[]) => void

  // Education Actions
  addEducation: () => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  reorderEducation: (education: Education[]) => void

  // Skills Actions
  addSkill: () => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  updateSkills: (skills: Skill[]) => void
  addCustomCategory: (category: string) => void
  removeCustomCategory: (category: string) => void

  // Languages Actions
  addLanguage: () => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  removeLanguage: (id: string) => void
  updateLanguages: (languages: Language[]) => void

  // Certificates Actions
  addCertificate: () => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
  removeCertificate: (id: string) => void
  reorderCertificates: (certificates: Certificate[]) => void

  // Footer Actions
  updateFooter: (footer: Partial<Footer>) => void

  // Theme Actions
  updateTheme: (theme: Partial<CVTheme>) => void

  // Section Order Actions
  updateSectionOrder: (order: CVSectionType[]) => void

  // Database Actions
  saveToDB: () => Promise<void>
  loadFromDB: (id: string) => Promise<void>
  getOrCreateCV: () => Promise<string | null>
  setSelectedCV: (id: string | null) => void
  resetCV: () => void
}

const useCVStore = create<CVStore>((set, get) => ({
  // Initial State
  cvData: defaultCVData,
  selectedCVId: null,
  saveStatus: 'idle',
  error: null,

  // Personal Info Actions
  updatePersonalInfo: (info) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      },
    })),

  // Summary Actions
  updateSummary: (summary) =>
    set((state) => ({
      cvData: { ...state.cvData, summary },
    })),

  // Work Experience Actions
  addWorkExperience: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        workExperience: [
          ...state.cvData.workExperience,
          {
            id: nanoid(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            location: '',
            description: '',
            achievements: [],
          },
        ],
      },
    })),

  updateWorkExperience: (id, experience) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        workExperience: state.cvData.workExperience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
    })),

  removeWorkExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        workExperience: state.cvData.workExperience.filter(
          (exp) => exp.id !== id
        ),
      },
    })),

  reorderWorkExperience: (workExperience) =>
    set((state) => ({
      cvData: { ...state.cvData, workExperience },
    })),

  // Education Actions
  addEducation: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [
          ...state.cvData.education,
          {
            id: nanoid(),
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            current: false,
            gpa: '',
            description: '',
          },
        ],
      },
    })),

  updateEducation: (id, education) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter((edu) => edu.id !== id),
      },
    })),

  reorderEducation: (education) =>
    set((state) => ({
      cvData: { ...state.cvData, education },
    })),

  // Skills Actions
  addSkill: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: [
          ...state.cvData.skills,
          {
            id: nanoid(),
            name: '',
            category: 'technical',
            level: 'intermediate',
          },
        ],
      },
    })),

  updateSkill: (id, skill) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter((s) => s.id !== id),
      },
    })),

  updateSkills: (skills) =>
    set((state) => ({
      cvData: { ...state.cvData, skills },
    })),

  addCustomCategory: (category) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        customSkillCategories: [
          ...(state.cvData.customSkillCategories || []),
          category,
        ],
      },
    })),

  removeCustomCategory: (category) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        customSkillCategories: (state.cvData.customSkillCategories || []).filter(
          (c) => c !== category
        ),
      },
    })),

  // Languages Actions
  addLanguage: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: [
          ...state.cvData.languages,
          {
            id: nanoid(),
            name: '',
            level: 'intermediate',
          },
        ],
      },
    })),

  updateLanguage: (id, language) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: state.cvData.languages.map((lang) =>
          lang.id === id ? { ...lang, ...language } : lang
        ),
      },
    })),

  removeLanguage: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        languages: state.cvData.languages.filter((lang) => lang.id !== id),
      },
    })),

  updateLanguages: (languages) =>
    set((state) => ({
      cvData: { ...state.cvData, languages },
    })),

  // Certificates Actions
  addCertificate: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        certificates: [
          ...state.cvData.certificates,
          {
            id: nanoid(),
            name: '',
            issuer: '',
            issueDate: '',
          },
        ],
      },
    })),

  updateCertificate: (id, certificate) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        certificates: state.cvData.certificates.map((cert) =>
          cert.id === id ? { ...cert, ...certificate } : cert
        ),
      },
    })),

  removeCertificate: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        certificates: state.cvData.certificates.filter((cert) => cert.id !== id),
      },
    })),

  reorderCertificates: (certificates) =>
    set((state) => ({
      cvData: { ...state.cvData, certificates },
    })),

  // Footer Actions
  updateFooter: (footer) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        footer: { ...state.cvData.footer, ...footer },
      },
    })),

  // Theme Actions
  updateTheme: (theme) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        theme: { ...state.cvData.theme, ...theme },
      },
    })),

  // Section Order Actions
  updateSectionOrder: (order) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        sectionOrder: order,
      },
    })),

  // Database Actions
  saveToDB: async () => {
    const { cvData, selectedCVId } = get()
    const supabase = createClient()

    set({ saveStatus: 'saving', error: null })

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Not authenticated')

      if (selectedCVId) {
        // Update existing CV
        const { error } = await supabase
          .from('cvs')
          .update({
            data: cvData,
            theme: cvData.theme,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedCVId)

        if (error) throw error
      } else {
        // Create new CV
        const { data, error } = await supabase
          .from('cvs')
          .insert({
            user_id: user.id,
            title: cvData.personalInfo.fullName || 'Untitled CV',
            data: cvData,
            theme: cvData.theme,
          })
          .select()
          .single()

        if (error) throw error
        if (data) set({ selectedCVId: data.id })
      }

      set({ saveStatus: 'saved' })
      setTimeout(() => set({ saveStatus: 'idle' }), 2000)
    } catch (error: any) {
      set({ saveStatus: 'error', error: error.message })
      console.error('Error saving CV:', error)
    }
  },

  loadFromDB: async (id) => {
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        set({
          cvData: data.data,
          selectedCVId: data.id,
          saveStatus: 'idle',
          error: null,
        })
      }
    } catch (error: any) {
      set({ error: error.message })
      console.error('Error loading CV:', error)
    }
  },

  getOrCreateCV: async () => {
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Not authenticated')

      // Try to get existing CV
      const { data: existingCV } = await supabase
        .from('cvs')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (existingCV) {
        return existingCV.id
      }

      // Create new CV if none exists
      const { data: newCV, error } = await supabase
        .from('cvs')
        .insert({
          user_id: user.id,
          title: 'My CV',
          data: defaultCVData,
          theme: defaultCVData.theme,
        })
        .select()
        .single()

      if (error) throw error

      if (newCV) {
        set({
          cvData: newCV.data,
          selectedCVId: newCV.id,
          saveStatus: 'idle',
          error: null,
        })
        return newCV.id
      }

      return null
    } catch (error: any) {
      set({ error: error.message })
      console.error('Error getting/creating CV:', error)
      return null
    }
  },

  setSelectedCV: (id) => set({ selectedCVId: id }),

  resetCV: () =>
    set({
      cvData: defaultCVData,
      selectedCVId: null,
      saveStatus: 'idle',
      error: null,
    }),
}))

export default useCVStore

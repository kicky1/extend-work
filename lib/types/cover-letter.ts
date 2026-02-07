export interface CoverLetterData {
  id?: string
  userId?: string
  content: string
  company?: string
  jobTitle?: string
  jobDescription?: string
  tone: 'professional' | 'friendly' | 'formal'
  language: 'en' | 'pl'
  createdAt?: string
  updatedAt?: string
}

export interface CoverLetter {
  id: string
  user_id: string
  title: string
  data: Omit<CoverLetterData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  created_at: string
  updated_at: string
}

export const defaultCoverLetterData: Omit<CoverLetterData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  content: '',
  company: '',
  jobTitle: '',
  jobDescription: '',
  tone: 'professional',
  language: 'en',
}

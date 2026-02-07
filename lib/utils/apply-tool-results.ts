import useCVStore from '@/lib/stores/cv-store'
import type { CVTheme, CVSectionType, WorkExperience, Education, Skill, Language, Certificate } from '@/lib/types/cv'

// Tool result type from server
export interface ToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
}

// Extended result with error info
export interface ApplyResult {
  success: boolean
  description: string | null
  error?: string
}

/**
 * Validate tool result data before applying
 * Returns an error message if validation fails, null if valid
 */
function validateToolResult(action: string, data: Record<string, unknown>): string | null {
  const store = useCVStore.getState()
  const { cvData } = store

  switch (action) {
    case 'updateWorkExperience':
    case 'deleteWorkExperience': {
      const id = data.id as string
      if (!id) return 'Missing work experience ID'
      const exists = cvData.workExperience.some(e => e.id === id)
      if (!exists) return `Work experience with ID "${id}" not found`
      break
    }

    case 'updateEducation':
    case 'deleteEducation': {
      const id = data.id as string
      if (!id) return 'Missing education ID'
      const exists = cvData.education.some(e => e.id === id)
      if (!exists) return `Education with ID "${id}" not found`
      break
    }

    case 'updateSkill':
    case 'deleteSkill': {
      const id = data.id as string
      if (!id) return 'Missing skill ID'
      const exists = cvData.skills.some(e => e.id === id)
      if (!exists) return `Skill with ID "${id}" not found`
      break
    }

    case 'updateLanguage':
    case 'deleteLanguage': {
      const id = data.id as string
      if (!id) return 'Missing language ID'
      const exists = cvData.languages.some(e => e.id === id)
      if (!exists) return `Language with ID "${id}" not found`
      break
    }

    case 'updateCertificate':
    case 'deleteCertificate': {
      const id = data.id as string
      if (!id) return 'Missing certificate ID'
      const exists = cvData.certificates.some(e => e.id === id)
      if (!exists) return `Certificate with ID "${id}" not found`
      break
    }
  }

  return null
}

/**
 * Apply a single tool result to the CV store
 * Returns detailed result with success status and description
 */
export function applyToolResult(result: ToolResult): ApplyResult {
  if (!result.success || !result.data) {
    return { success: false, description: null, error: 'Invalid tool result' }
  }

  const store = useCVStore.getState()
  const { action, data } = result

  // Validate before applying
  const validationError = validateToolResult(action, data)
  if (validationError) {
    return { success: false, description: null, error: validationError }
  }

  try {
    switch (action) {
    case 'updatePersonalInfo': {
      store.updatePersonalInfo(data as Parameters<typeof store.updatePersonalInfo>[0])
      const fields = Object.keys(data).filter(k => data[k] !== undefined)
      return { success: true, description: `Updated ${fields.join(', ')}` }
    }

    case 'updateSummary': {
      store.updateSummary((data as { summary: string }).summary)
      return { success: true, description: 'Updated professional summary' }
    }

    case 'addWorkExperience': {
      store.addWorkExperience()
      const newExpId = useCVStore.getState().cvData.workExperience.at(-1)?.id
      if (newExpId) {
        const { id: _id, ...expData } = data as unknown as WorkExperience
        store.updateWorkExperience(newExpId, expData)
      }
      const company = (data as { company?: string }).company
      const position = (data as { position?: string }).position
      const startDate = (data as { startDate?: string }).startDate
      let desc = position && company ? `Added ${position} at ${company}` : company ? `Added role at ${company}` : 'Added work experience'
      if (startDate) desc += ` (${startDate})`
      return { success: true, description: desc }
    }

    case 'updateWorkExperience': {
      const { id, updates } = data as { id: string; updates: Partial<WorkExperience> }
      store.updateWorkExperience(id, updates)
      const parts: string[] = []
      if (updates.position) parts.push(`position → '${updates.position}'`)
      if (updates.company) parts.push(`company → '${updates.company}'`)
      if (updates.location) parts.push(`location → '${updates.location}'`)
      if (updates.startDate) parts.push(`start → '${updates.startDate}'`)
      if (updates.endDate) parts.push(`end → '${updates.endDate}'`)
      if (updates.current !== undefined) parts.push(updates.current ? 'marked as current' : 'marked as ended')
      if (updates.description) parts.push('description updated')
      if (updates.achievements) parts.push(`${updates.achievements.length} achievement(s)`)
      const desc = parts.length > 0 ? `Updated experience: ${parts.join(', ')}` : 'Updated experience'
      return { success: true, description: desc }
    }

    case 'deleteWorkExperience': {
      const { cvData } = useCVStore.getState()
      const prevExp = cvData.workExperience.find(e => e.id === (data as { id: string }).id)
      store.removeWorkExperience((data as { id: string }).id)
      return {
        success: true,
        description: prevExp ? `Deleted ${prevExp.position} at ${prevExp.company}` : 'Deleted work experience',
      }
    }

    case 'addEducation': {
      store.addEducation()
      const newEduId = useCVStore.getState().cvData.education.at(-1)?.id
      if (newEduId) {
        const { id: _id, ...eduData } = data as unknown as Education
        store.updateEducation(newEduId, eduData)
      }
      const institution = (data as { institution?: string }).institution
      const degree = (data as { degree?: string }).degree
      return {
        success: true,
        description: degree && institution ? `Added ${degree} at ${institution}` : institution ? `Added education at ${institution}` : 'Added education',
      }
    }

    case 'updateEducation': {
      const { id, updates } = data as { id: string; updates: Partial<Education> }
      store.updateEducation(id, updates)
      const parts: string[] = []
      if (updates.degree) parts.push(`degree → '${updates.degree}'`)
      if (updates.field) parts.push(`field → '${updates.field}'`)
      if (updates.institution) parts.push(`institution → '${updates.institution}'`)
      if (updates.startDate) parts.push(`start → '${updates.startDate}'`)
      if (updates.endDate) parts.push(`end → '${updates.endDate}'`)
      if (updates.gpa) parts.push(`GPA → '${updates.gpa}'`)
      if (updates.description) parts.push('description updated')
      const desc = parts.length > 0 ? `Updated education: ${parts.join(', ')}` : 'Updated education'
      return { success: true, description: desc }
    }

    case 'deleteEducation': {
      const { cvData } = useCVStore.getState()
      const prevEdu = cvData.education.find(e => e.id === (data as { id: string }).id)
      store.removeEducation((data as { id: string }).id)
      return {
        success: true,
        description: prevEdu ? `Deleted ${prevEdu.degree} at ${prevEdu.institution}` : 'Deleted education',
      }
    }

    case 'addSkill': {
      store.addSkill()
      const newSkillId = useCVStore.getState().cvData.skills.at(-1)?.id
      if (newSkillId) {
        const { id: _id, ...skillData } = data as unknown as Skill
        store.updateSkill(newSkillId, skillData)
      }
      const skillName = (data as { name?: string }).name
      const skillLevel = (data as { level?: string }).level
      const skillCategory = (data as { category?: string }).category
      const skillParts = [skillName, skillLevel, skillCategory].filter(Boolean)
      return {
        success: true,
        description: skillParts.length > 0 ? `Added skill: ${skillParts.join(' · ')}` : 'Added skill',
      }
    }

    case 'updateSkill': {
      const { id, updates } = data as { id: string; updates: Partial<Skill> }
      store.updateSkill(id, updates)
      const parts: string[] = []
      if (updates.name) parts.push(updates.name)
      if (updates.level) parts.push(updates.level)
      if (updates.category) parts.push(updates.category)
      const desc = parts.length > 0 ? `Updated skill: ${parts.join(' · ')}` : 'Updated skill'
      return { success: true, description: desc }
    }

    case 'deleteSkill': {
      const { cvData } = useCVStore.getState()
      const prevSkill = cvData.skills.find(e => e.id === (data as { id: string }).id)
      store.removeSkill((data as { id: string }).id)
      return {
        success: true,
        description: prevSkill ? `Deleted skill: ${prevSkill.name}` : 'Deleted skill',
      }
    }

    case 'addLanguage': {
      store.addLanguage()
      const newLangId = useCVStore.getState().cvData.languages.at(-1)?.id
      if (newLangId) {
        const { id: _id, ...langData } = data as unknown as Language
        store.updateLanguage(newLangId, langData)
      }
      const langName = (data as { name?: string }).name
      const langLevel = (data as { level?: string }).level
      return {
        success: true,
        description: langName ? `Added language: ${[langName, langLevel].filter(Boolean).join(' · ')}` : 'Added language',
      }
    }

    case 'updateLanguage': {
      const { id, updates } = data as { id: string; updates: Partial<Language> }
      store.updateLanguage(id, updates)
      const parts: string[] = []
      if (updates.name) parts.push(updates.name)
      if (updates.level) parts.push(updates.level)
      const desc = parts.length > 0 ? `Updated language: ${parts.join(' · ')}` : 'Updated language'
      return { success: true, description: desc }
    }

    case 'deleteLanguage': {
      const { cvData } = useCVStore.getState()
      const prevLang = cvData.languages.find(e => e.id === (data as { id: string }).id)
      store.removeLanguage((data as { id: string }).id)
      return {
        success: true,
        description: prevLang ? `Deleted language: ${prevLang.name}` : 'Deleted language',
      }
    }

    case 'addCertificate': {
      store.addCertificate()
      const newCertId = useCVStore.getState().cvData.certificates.at(-1)?.id
      if (newCertId) {
        const { id: _id, ...certData } = data as unknown as Certificate
        store.updateCertificate(newCertId, certData)
      }
      const certName = (data as { name?: string }).name
      const certIssuer = (data as { issuer?: string }).issuer
      return {
        success: true,
        description: certName ? `Added certificate: ${certName}${certIssuer ? ` (${certIssuer})` : ''}` : 'Added certificate',
      }
    }

    case 'updateCertificate': {
      const { id, updates } = data as { id: string; updates: Partial<Certificate> }
      store.updateCertificate(id, updates)
      const parts: string[] = []
      if (updates.name) parts.push(`name → '${updates.name}'`)
      if (updates.issuer) parts.push(`issuer → '${updates.issuer}'`)
      if (updates.issueDate) parts.push(`issued ${updates.issueDate}`)
      const desc = parts.length > 0 ? `Updated certificate: ${parts.join(', ')}` : 'Updated certificate'
      return { success: true, description: desc }
    }

    case 'deleteCertificate': {
      const { cvData } = useCVStore.getState()
      const prevCert = cvData.certificates.find(e => e.id === (data as { id: string }).id)
      store.removeCertificate((data as { id: string }).id)
      return {
        success: true,
        description: prevCert ? `Deleted certificate: ${prevCert.name}` : 'Deleted certificate',
      }
    }

    case 'updateFooter': {
      store.updateFooter(data as Parameters<typeof store.updateFooter>[0])
      return { success: true, description: 'Updated footer' }
    }

    case 'addCustomCategory': {
      store.addCustomCategory((data as { category: string }).category)
      return {
        success: true,
        description: `Added category: ${(data as { category: string }).category}`,
      }
    }

    case 'removeCustomCategory': {
      store.removeCustomCategory((data as { category: string }).category)
      return {
        success: true,
        description: `Removed category: ${(data as { category: string }).category}`,
      }
    }

    case 'updateTheme': {
      const themeData = data as { theme: Partial<CVTheme>; preset?: string }
      store.updateTheme(themeData.theme)
      return {
        success: true,
        description: themeData.preset ? `Applied ${themeData.preset} theme` : 'Updated theme',
      }
    }

    case 'reorderSections': {
      const { order } = data as { order: CVSectionType[] }
      store.updateSectionOrder(order)
      return { success: true, description: 'Reordered sections' }
    }

    default:
      return { success: false, description: null, error: `Unknown action: ${action}` }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[applyToolResult] Error applying ${action}:`, err)
    return { success: false, description: null, error: errorMessage }
  }
}

/**
 * Apply multiple tool results to the CV store
 * Returns an array of results with descriptions
 */
export function applyToolResults(results: ToolResult[]): ApplyResult[] {
  const applied: ApplyResult[] = []
  for (const result of results) {
    const applyResult = applyToolResult(result)
    applied.push(applyResult)
  }
  return applied
}

/**
 * Generate human-readable descriptions of what tool results will do
 * (for preview purposes, without actually applying)
 */
export function describeToolResults(results: ToolResult[]): string[] {
  return results
    .filter(r => r.success && r.data)
    .map(({ action, data }) => {
      switch (action) {
        case 'updatePersonalInfo': {
          const fields = Object.keys(data!).filter(k => data![k] !== undefined)
          return `Update personal info: ${fields.join(', ')}`
        }
        case 'updateSummary':
          return 'Update professional summary'
        case 'addWorkExperience':
          return `Add work experience at ${(data as { company?: string }).company || 'new company'}`
        case 'updateWorkExperience':
          return 'Update work experience'
        case 'deleteWorkExperience':
          return 'Delete work experience'
        case 'addEducation':
          return `Add education at ${(data as { institution?: string }).institution || 'new institution'}`
        case 'updateEducation':
          return 'Update education'
        case 'deleteEducation':
          return 'Delete education'
        case 'addSkill':
          return `Add skill: ${(data as { name?: string }).name || 'new skill'}`
        case 'updateSkill':
          return 'Update skill'
        case 'deleteSkill':
          return 'Delete skill'
        case 'addLanguage':
          return `Add language: ${(data as { name?: string }).name || 'new language'}`
        case 'updateLanguage':
          return 'Update language'
        case 'deleteLanguage':
          return 'Delete language'
        case 'addCertificate':
          return `Add certificate: ${(data as { name?: string }).name || 'new certificate'}`
        case 'updateCertificate':
          return 'Update certificate'
        case 'deleteCertificate':
          return 'Delete certificate'
        case 'updateFooter':
          return 'Update footer'
        case 'addCustomCategory':
          return `Add category: ${(data as { category?: string }).category}`
        case 'removeCustomCategory':
          return `Remove category: ${(data as { category?: string }).category}`
        case 'updateTheme': {
          const preset = (data as { preset?: string }).preset
          return preset ? `Apply ${preset} theme` : 'Update theme'
        }
        case 'reorderSections':
          return 'Reorder sections'
        default:
          return `Execute ${action}`
      }
    })
}

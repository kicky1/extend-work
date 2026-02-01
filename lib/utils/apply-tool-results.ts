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
  previousValue?: unknown // For undo support
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
 * Get current value for undo support
 */
function getPreviousValue(action: string, data: Record<string, unknown>): unknown {
  const { cvData } = useCVStore.getState()

  switch (action) {
    case 'updatePersonalInfo':
      return { ...cvData.personalInfo }
    case 'updateSummary':
      return cvData.summary
    case 'updateWorkExperience': {
      const id = data.id as string
      return cvData.workExperience.find(e => e.id === id)
    }
    case 'deleteWorkExperience': {
      const id = data.id as string
      return cvData.workExperience.find(e => e.id === id)
    }
    case 'updateEducation': {
      const id = data.id as string
      return cvData.education.find(e => e.id === id)
    }
    case 'deleteEducation': {
      const id = data.id as string
      return cvData.education.find(e => e.id === id)
    }
    case 'updateSkill': {
      const id = data.id as string
      return cvData.skills.find(e => e.id === id)
    }
    case 'deleteSkill': {
      const id = data.id as string
      return cvData.skills.find(e => e.id === id)
    }
    case 'updateLanguage': {
      const id = data.id as string
      return cvData.languages.find(e => e.id === id)
    }
    case 'deleteLanguage': {
      const id = data.id as string
      return cvData.languages.find(e => e.id === id)
    }
    case 'updateCertificate': {
      const id = data.id as string
      return cvData.certificates.find(e => e.id === id)
    }
    case 'deleteCertificate': {
      const id = data.id as string
      return cvData.certificates.find(e => e.id === id)
    }
    case 'updateTheme':
      return { ...cvData.theme }
    case 'reorderSections':
      return [...(cvData.sectionOrder || [])]
    default:
      return undefined
  }
}

/**
 * Apply a single tool result to the CV store
 * Returns detailed result with success status, description, and previous value for undo
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

  // Get previous value for undo support
  const previousValue = getPreviousValue(action, data)

  try {
    switch (action) {
    case 'updatePersonalInfo': {
      store.updatePersonalInfo(data as Parameters<typeof store.updatePersonalInfo>[0])
      const fields = Object.keys(data).filter(k => data[k] !== undefined)
      return { success: true, description: `Updated ${fields.join(', ')}`, previousValue }
    }

    case 'updateSummary': {
      store.updateSummary((data as { summary: string }).summary)
      return { success: true, description: 'Updated professional summary', previousValue }
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
      return {
        success: true,
        description: position && company ? `Added ${position} at ${company}` : company ? `Added role at ${company}` : 'Added work experience',
        previousValue: newExpId // Store new ID for undo (delete)
      }
    }

    case 'updateWorkExperience': {
      const { id, updates } = data as { id: string; updates: Partial<WorkExperience> }
      store.updateWorkExperience(id, updates)
      const fields = Object.keys(updates).filter(k => updates[k as keyof typeof updates] !== undefined)
      return { success: true, description: `Updated experience: ${fields.join(', ')}`, previousValue }
    }

    case 'deleteWorkExperience': {
      const prevExp = previousValue as WorkExperience | undefined
      store.removeWorkExperience((data as { id: string }).id)
      return {
        success: true,
        description: prevExp ? `Deleted ${prevExp.position} at ${prevExp.company}` : 'Deleted work experience',
        previousValue
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
        previousValue: newEduId
      }
    }

    case 'updateEducation': {
      const { id, updates } = data as { id: string; updates: Partial<Education> }
      store.updateEducation(id, updates)
      const fields = Object.keys(updates).filter(k => updates[k as keyof typeof updates] !== undefined)
      return { success: true, description: `Updated education: ${fields.join(', ')}`, previousValue }
    }

    case 'deleteEducation': {
      const prevEdu = previousValue as Education | undefined
      store.removeEducation((data as { id: string }).id)
      return {
        success: true,
        description: prevEdu ? `Deleted ${prevEdu.degree} at ${prevEdu.institution}` : 'Deleted education',
        previousValue
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
      return {
        success: true,
        description: skillName ? `Added skill: ${skillName}` : 'Added skill',
        previousValue: newSkillId
      }
    }

    case 'updateSkill': {
      const { id, updates } = data as { id: string; updates: Partial<Skill> }
      store.updateSkill(id, updates)
      return { success: true, description: `Updated skill: ${updates.name || 'details changed'}`, previousValue }
    }

    case 'deleteSkill': {
      const prevSkill = previousValue as Skill | undefined
      store.removeSkill((data as { id: string }).id)
      return {
        success: true,
        description: prevSkill ? `Deleted skill: ${prevSkill.name}` : 'Deleted skill',
        previousValue
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
      return {
        success: true,
        description: langName ? `Added language: ${langName}` : 'Added language',
        previousValue: newLangId
      }
    }

    case 'updateLanguage': {
      const { id, updates } = data as { id: string; updates: Partial<Language> }
      store.updateLanguage(id, updates)
      return { success: true, description: `Updated language: ${updates.name || 'level changed'}`, previousValue }
    }

    case 'deleteLanguage': {
      const prevLang = previousValue as Language | undefined
      store.removeLanguage((data as { id: string }).id)
      return {
        success: true,
        description: prevLang ? `Deleted language: ${prevLang.name}` : 'Deleted language',
        previousValue
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
      return {
        success: true,
        description: certName ? `Added certificate: ${certName}` : 'Added certificate',
        previousValue: newCertId
      }
    }

    case 'updateCertificate': {
      const { id, updates } = data as { id: string; updates: Partial<Certificate> }
      store.updateCertificate(id, updates)
      return { success: true, description: `Updated certificate: ${updates.name || 'details changed'}`, previousValue }
    }

    case 'deleteCertificate': {
      const prevCert = previousValue as Certificate | undefined
      store.removeCertificate((data as { id: string }).id)
      return {
        success: true,
        description: prevCert ? `Deleted certificate: ${prevCert.name}` : 'Deleted certificate',
        previousValue
      }
    }

    case 'updateFooter': {
      store.updateFooter(data as Parameters<typeof store.updateFooter>[0])
      return { success: true, description: 'Updated footer', previousValue }
    }

    case 'addCustomCategory': {
      store.addCustomCategory((data as { category: string }).category)
      return {
        success: true,
        description: `Added category: ${(data as { category: string }).category}`,
        previousValue
      }
    }

    case 'removeCustomCategory': {
      store.removeCustomCategory((data as { category: string }).category)
      return {
        success: true,
        description: `Removed category: ${(data as { category: string }).category}`,
        previousValue
      }
    }

    case 'updateTheme': {
      const themeData = data as { theme: Partial<CVTheme>; preset?: string }
      store.updateTheme(themeData.theme)
      return {
        success: true,
        description: themeData.preset ? `Applied ${themeData.preset} theme` : 'Updated theme',
        previousValue
      }
    }

    case 'reorderSections': {
      const { order } = data as { order: CVSectionType[] }
      store.updateSectionOrder(order)
      return { success: true, description: 'Reordered sections', previousValue }
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
 * Returns an array of results with descriptions and undo info
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
 * Undo a previously applied tool result
 * Takes the action and previousValue from ApplyResult
 */
export function undoToolResult(action: string, previousValue: unknown): boolean {
  const store = useCVStore.getState()

  try {
    switch (action) {
      case 'updatePersonalInfo':
        store.updatePersonalInfo(previousValue as Parameters<typeof store.updatePersonalInfo>[0])
        return true

      case 'updateSummary':
        store.updateSummary(previousValue as string)
        return true

      case 'addWorkExperience':
        // previousValue is the ID of the added item
        if (previousValue) store.removeWorkExperience(previousValue as string)
        return true

      case 'updateWorkExperience':
        if (previousValue) {
          const prev = previousValue as WorkExperience
          store.updateWorkExperience(prev.id, prev)
        }
        return true

      case 'deleteWorkExperience':
        // Restore the deleted item
        if (previousValue) {
          store.addWorkExperience()
          const newId = useCVStore.getState().cvData.workExperience.at(-1)?.id
          if (newId) {
            const { id: _id, ...data } = previousValue as WorkExperience
            store.updateWorkExperience(newId, data)
          }
        }
        return true

      case 'addEducation':
        if (previousValue) store.removeEducation(previousValue as string)
        return true

      case 'updateEducation':
        if (previousValue) {
          const prev = previousValue as Education
          store.updateEducation(prev.id, prev)
        }
        return true

      case 'deleteEducation':
        if (previousValue) {
          store.addEducation()
          const newId = useCVStore.getState().cvData.education.at(-1)?.id
          if (newId) {
            const { id: _id, ...data } = previousValue as Education
            store.updateEducation(newId, data)
          }
        }
        return true

      case 'addSkill':
        if (previousValue) store.removeSkill(previousValue as string)
        return true

      case 'updateSkill':
        if (previousValue) {
          const prev = previousValue as Skill
          store.updateSkill(prev.id, prev)
        }
        return true

      case 'deleteSkill':
        if (previousValue) {
          store.addSkill()
          const newId = useCVStore.getState().cvData.skills.at(-1)?.id
          if (newId) {
            const { id: _id, ...data } = previousValue as Skill
            store.updateSkill(newId, data)
          }
        }
        return true

      case 'addLanguage':
        if (previousValue) store.removeLanguage(previousValue as string)
        return true

      case 'updateLanguage':
        if (previousValue) {
          const prev = previousValue as Language
          store.updateLanguage(prev.id, prev)
        }
        return true

      case 'deleteLanguage':
        if (previousValue) {
          store.addLanguage()
          const newId = useCVStore.getState().cvData.languages.at(-1)?.id
          if (newId) {
            const { id: _id, ...data } = previousValue as Language
            store.updateLanguage(newId, data)
          }
        }
        return true

      case 'addCertificate':
        if (previousValue) store.removeCertificate(previousValue as string)
        return true

      case 'updateCertificate':
        if (previousValue) {
          const prev = previousValue as Certificate
          store.updateCertificate(prev.id, prev)
        }
        return true

      case 'deleteCertificate':
        if (previousValue) {
          store.addCertificate()
          const newId = useCVStore.getState().cvData.certificates.at(-1)?.id
          if (newId) {
            const { id: _id, ...data } = previousValue as Certificate
            store.updateCertificate(newId, data)
          }
        }
        return true

      case 'updateTheme':
        if (previousValue) store.updateTheme(previousValue as Partial<CVTheme>)
        return true

      case 'reorderSections':
        if (previousValue) store.updateSectionOrder(previousValue as CVSectionType[])
        return true

      default:
        return false
    }
  } catch (err) {
    console.error(`[undoToolResult] Error undoing ${action}:`, err)
    return false
  }
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

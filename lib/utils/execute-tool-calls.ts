import { CV_TOOLS, type CVToolName, type UpdateThemeParams, type ReorderSectionsParams } from '@/lib/cv-tools'
import { predefinedThemes } from '@/lib/cv-themes'
import useCVStore from '@/lib/stores/cv-store'
import type { CVSectionType } from '@/lib/types/cv'

export interface ToolCall {
  toolName: CVToolName
  args: Record<string, unknown>
}

export function executeToolCalls(toolCalls: ToolCall[]): string[] {
  const store = useCVStore.getState()
  const {
    cvData,
    updatePersonalInfo,
    updateSummary,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertificate,
    updateCertificate,
    removeCertificate,
    updateFooter,
    addCustomCategory,
    removeCustomCategory,
    updateTheme,
    updateSectionOrder,
  } = store

  const executedActions: string[] = []

  for (const { toolName, args } of toolCalls) {
    switch (toolName) {
      case CV_TOOLS.UPDATE_PERSONAL_INFO:
        updatePersonalInfo(args as Parameters<typeof updatePersonalInfo>[0])
        executedActions.push('Updated personal info')
        break

      case CV_TOOLS.UPDATE_SUMMARY:
        updateSummary((args as { summary: string }).summary)
        executedActions.push('Updated summary')
        break

      case CV_TOOLS.ADD_EXPERIENCE: {
        addWorkExperience()
        const newExpId = useCVStore.getState().cvData.workExperience.at(-1)?.id
        if (newExpId) {
          updateWorkExperience(newExpId, args as Parameters<typeof updateWorkExperience>[1])
        }
        executedActions.push('Added work experience')
        break
      }

      case CV_TOOLS.UPDATE_EXPERIENCE: {
        const { id, ...expData } = args as { id: string } & Parameters<typeof updateWorkExperience>[1]
        updateWorkExperience(id, expData)
        executedActions.push('Updated work experience')
        break
      }

      case CV_TOOLS.DELETE_EXPERIENCE:
        removeWorkExperience((args as { id: string }).id)
        executedActions.push('Deleted work experience')
        break

      case CV_TOOLS.ADD_EDUCATION: {
        addEducation()
        const newEduId = useCVStore.getState().cvData.education.at(-1)?.id
        if (newEduId) {
          updateEducation(newEduId, args as Parameters<typeof updateEducation>[1])
        }
        executedActions.push('Added education')
        break
      }

      case CV_TOOLS.UPDATE_EDUCATION: {
        const { id: eduId, ...eduData } = args as { id: string } & Parameters<typeof updateEducation>[1]
        updateEducation(eduId, eduData)
        executedActions.push('Updated education')
        break
      }

      case CV_TOOLS.DELETE_EDUCATION:
        removeEducation((args as { id: string }).id)
        executedActions.push('Deleted education')
        break

      case CV_TOOLS.ADD_SKILL: {
        addSkill()
        const newSkillId = useCVStore.getState().cvData.skills.at(-1)?.id
        if (newSkillId) {
          updateSkill(newSkillId, args as Parameters<typeof updateSkill>[1])
        }
        executedActions.push('Added skill')
        break
      }

      case CV_TOOLS.UPDATE_SKILL: {
        const { id: skillId, ...skillData } = args as { id: string } & Parameters<typeof updateSkill>[1]
        updateSkill(skillId, skillData)
        executedActions.push('Updated skill')
        break
      }

      case CV_TOOLS.DELETE_SKILL:
        removeSkill((args as { id: string }).id)
        executedActions.push('Deleted skill')
        break

      case CV_TOOLS.ADD_LANGUAGE: {
        addLanguage()
        const newLangId = useCVStore.getState().cvData.languages.at(-1)?.id
        if (newLangId) {
          updateLanguage(newLangId, args as Parameters<typeof updateLanguage>[1])
        }
        executedActions.push('Added language')
        break
      }

      case CV_TOOLS.UPDATE_LANGUAGE: {
        const { id: langId, ...langData } = args as { id: string } & Parameters<typeof updateLanguage>[1]
        updateLanguage(langId, langData)
        executedActions.push('Updated language')
        break
      }

      case CV_TOOLS.DELETE_LANGUAGE:
        removeLanguage((args as { id: string }).id)
        executedActions.push('Deleted language')
        break

      case CV_TOOLS.ADD_CERTIFICATE: {
        addCertificate()
        const newCertId = useCVStore.getState().cvData.certificates.at(-1)?.id
        if (newCertId) {
          updateCertificate(newCertId, args as Parameters<typeof updateCertificate>[1])
        }
        executedActions.push('Added certificate')
        break
      }

      case CV_TOOLS.UPDATE_CERTIFICATE: {
        const { id: certId, ...certData } = args as { id: string } & Parameters<typeof updateCertificate>[1]
        updateCertificate(certId, certData)
        executedActions.push('Updated certificate')
        break
      }

      case CV_TOOLS.DELETE_CERTIFICATE:
        removeCertificate((args as { id: string }).id)
        executedActions.push('Deleted certificate')
        break

      case CV_TOOLS.UPDATE_FOOTER:
        updateFooter(args as Parameters<typeof updateFooter>[0])
        executedActions.push('Updated footer')
        break

      case CV_TOOLS.ADD_CUSTOM_CATEGORY:
        addCustomCategory((args as { category: string }).category)
        executedActions.push('Added custom skill category')
        break

      case CV_TOOLS.REMOVE_CUSTOM_CATEGORY:
        removeCustomCategory((args as { category: string }).category)
        executedActions.push('Removed custom skill category')
        break

      case CV_TOOLS.UPDATE_THEME: {
        const themeArgs = args as UpdateThemeParams
        if (themeArgs.preset && predefinedThemes[themeArgs.preset]) {
          updateTheme(predefinedThemes[themeArgs.preset])
          executedActions.push(`Applied ${themeArgs.preset} theme`)
        }
        const hasCustomizations =
          themeArgs.colors ||
          themeArgs.fonts ||
          themeArgs.layout ||
          themeArgs.headerStyle ||
          themeArgs.skillsStyle ||
          themeArgs.languagesStyle ||
          themeArgs.sectionDivider ||
          themeArgs.bulletStyle ||
          themeArgs.showHeaderIcons !== undefined ||
          themeArgs.pageNumbers
        if (hasCustomizations) {
          const customTheme: Parameters<typeof updateTheme>[0] = {}
          if (themeArgs.colors) {
            customTheme.colors = { ...cvData.theme.colors, ...themeArgs.colors }
          }
          if (themeArgs.fonts) {
            customTheme.fonts = { ...cvData.theme.fonts, ...themeArgs.fonts }
          }
          if (themeArgs.layout) {
            customTheme.layout = themeArgs.layout
          }
          if (themeArgs.headerStyle) {
            customTheme.headerStyle = themeArgs.headerStyle
          }
          if (themeArgs.skillsStyle) {
            customTheme.skillsStyle = themeArgs.skillsStyle
          }
          if (themeArgs.languagesStyle) {
            customTheme.languagesStyle = themeArgs.languagesStyle
          }
          if (themeArgs.sectionDivider) {
            customTheme.sectionDivider = themeArgs.sectionDivider
          }
          if (themeArgs.bulletStyle) {
            customTheme.bulletStyle = themeArgs.bulletStyle
          }
          if (themeArgs.showHeaderIcons !== undefined) {
            customTheme.showHeaderIcons = themeArgs.showHeaderIcons
          }
          if (themeArgs.pageNumbers) {
            customTheme.pageNumbers = {
              show: themeArgs.pageNumbers.show ?? cvData.theme.pageNumbers?.show ?? false,
              position: themeArgs.pageNumbers.position ?? cvData.theme.pageNumbers?.position ?? 'center',
            }
          }
          updateTheme(customTheme)
          executedActions.push('Updated theme customization')
        }
        break
      }

      case CV_TOOLS.REORDER_SECTIONS: {
        const { order } = args as ReorderSectionsParams
        updateSectionOrder(order as CVSectionType[])
        executedActions.push('Reordered sections')
        break
      }
    }
  }

  return executedActions
}

// Generate a human-readable description of what tool calls will do
export function describeToolCalls(toolCalls: ToolCall[]): string[] {
  return toolCalls.map(({ toolName, args }) => {
    switch (toolName) {
      case CV_TOOLS.UPDATE_PERSONAL_INFO:
        const fields = Object.keys(args).filter(k => args[k] !== undefined)
        return `Update personal info: ${fields.join(', ')}`

      case CV_TOOLS.UPDATE_SUMMARY:
        return 'Update professional summary'

      case CV_TOOLS.ADD_EXPERIENCE:
        return `Add work experience at ${(args as { company?: string }).company || 'new company'}`

      case CV_TOOLS.UPDATE_EXPERIENCE:
        return `Update work experience`

      case CV_TOOLS.DELETE_EXPERIENCE:
        return 'Delete work experience'

      case CV_TOOLS.ADD_EDUCATION:
        return `Add education at ${(args as { institution?: string }).institution || 'new institution'}`

      case CV_TOOLS.UPDATE_EDUCATION:
        return 'Update education'

      case CV_TOOLS.DELETE_EDUCATION:
        return 'Delete education'

      case CV_TOOLS.ADD_SKILL:
        return `Add skill: ${(args as { name?: string }).name || 'new skill'}`

      case CV_TOOLS.UPDATE_SKILL:
        return 'Update skill'

      case CV_TOOLS.DELETE_SKILL:
        return 'Delete skill'

      case CV_TOOLS.ADD_LANGUAGE:
        return `Add language: ${(args as { name?: string }).name || 'new language'}`

      case CV_TOOLS.UPDATE_LANGUAGE:
        return 'Update language'

      case CV_TOOLS.DELETE_LANGUAGE:
        return 'Delete language'

      case CV_TOOLS.ADD_CERTIFICATE:
        return `Add certificate: ${(args as { name?: string }).name || 'new certificate'}`

      case CV_TOOLS.UPDATE_CERTIFICATE:
        return 'Update certificate'

      case CV_TOOLS.DELETE_CERTIFICATE:
        return 'Delete certificate'

      case CV_TOOLS.UPDATE_FOOTER:
        return 'Update footer'

      case CV_TOOLS.ADD_CUSTOM_CATEGORY:
        return `Add category: ${(args as { category?: string }).category}`

      case CV_TOOLS.REMOVE_CUSTOM_CATEGORY:
        return `Remove category: ${(args as { category?: string }).category}`

      case CV_TOOLS.UPDATE_THEME:
        return 'Update theme'

      case CV_TOOLS.REORDER_SECTIONS:
        return 'Reorder sections'

      default:
        return `Execute ${toolName}`
    }
  })
}

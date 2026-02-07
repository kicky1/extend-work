import useCoverLetterStore from '@/lib/stores/cover-letter-store'

export interface CoverLetterToolResult {
  action: string
  success: boolean
  data?: Record<string, unknown>
}

export interface ApplyResult {
  success: boolean
  description: string | null
  error?: string
}

export function applyCoverLetterToolResult(result: CoverLetterToolResult): ApplyResult {
  if (!result.success || !result.data) {
    return { success: false, description: null, error: 'Invalid tool result' }
  }

  const store = useCoverLetterStore.getState()
  const { action, data } = result

  try {
    switch (action) {
      case 'updateContent': {
        store.updateContent(data.content as string)
        return { success: true, description: 'Updated cover letter content' }
      }

      case 'updateSection': {
        const section = data.section as 'intro' | 'body' | 'closing'
        const newContent = data.content as string
        const current = store.coverLetterData.content

        // Parse current content into block-level elements using DOM
        const temp = document.createElement('div')
        temp.innerHTML = current
        const blocks = Array.from(temp.children).map(
          (child) => (child as HTMLElement).outerHTML,
        )

        if (blocks.length === 0) {
          // No existing content, just set the new content directly
          store.updateContent(newContent)
        } else if (section === 'intro') {
          blocks[0] = newContent
          store.updateContent(blocks.join(''))
        } else if (section === 'closing') {
          blocks[blocks.length - 1] = newContent
          store.updateContent(blocks.join(''))
        } else {
          // body = everything between first and last block
          const intro = blocks[0]
          const closing = blocks.length > 1 ? blocks[blocks.length - 1] : ''
          store.updateContent(intro + newContent + closing)
        }
        return { success: true, description: `Updated ${section} section` }
      }

      case 'updateTone': {
        store.updateTone(data.tone as 'professional' | 'friendly' | 'formal')
        return { success: true, description: `Changed tone to ${data.tone}` }
      }

      case 'updateRecipient': {
        const { company, jobTitle } = data as {
          company?: string
          jobTitle?: string
        }
        store.updateJobInfo({ ...(company && { company }), ...(jobTitle && { jobTitle }) })
        const fields = Object.keys(data).filter((k) => data[k])
        return { success: true, description: `Updated: ${fields.join(', ')}` }
      }

      case 'updateLanguage': {
        store.updateLanguage(data.language as 'en' | 'pl')
        return { success: true, description: `Switched language to ${data.language === 'en' ? 'English' : 'Polish'}` }
      }

      case 'regenerate': {
        // The regeneration will be handled by the chat route
        // This just signals the intent
        return { success: true, description: 'Regenerating cover letter...' }
      }

      default:
        return { success: false, description: null, error: `Unknown action: ${action}` }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[applyCoverLetterToolResult] Error applying ${action}:`, err)
    return { success: false, description: null, error: errorMessage }
  }
}

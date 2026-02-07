import { useEffect, useRef } from 'react'
import { useDebounce } from 'react-use'
import useCoverLetterStore from '@/lib/stores/cover-letter-store'

export function useCoverLetterAutoSave(delay = 2000) {
  const { coverLetterData, saveToDB, isInitialized, isDirty } = useCoverLetterStore()
  const skipNextSaveRef = useRef(true)
  const prevInitializedRef = useRef(false)

  if (isInitialized && !prevInitializedRef.current) {
    prevInitializedRef.current = true
    skipNextSaveRef.current = true
  }

  useDebounce(
    () => {
      if (!isInitialized) return

      if (skipNextSaveRef.current) {
        skipNextSaveRef.current = false
        return
      }

      saveToDB()
    },
    delay,
    [coverLetterData],
  )

  // Flush save on unmount
  const saveToDBRef = useRef(saveToDB)
  saveToDBRef.current = saveToDB
  const isDirtyRef = useRef(isDirty)
  isDirtyRef.current = isDirty

  useEffect(() => {
    return () => {
      if (isDirtyRef.current) {
        saveToDBRef.current()
      }
    }
  }, [])

  // Save + warn before closing tab/window with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const state = useCoverLetterStore.getState()
      if (state.isDirty) {
        // Fire off save attempt before page unloads
        state.saveToDB()
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return null
}

import { useRef } from 'react'
import { useDebounce } from 'react-use'
import useCVStore from '@/lib/stores/cv-store'

export function useAutoSave(delay = 2000) {
  const { cvData, saveToDB, isInitialized } = useCVStore()
  const skipNextSaveRef = useRef(true)
  const prevInitializedRef = useRef(false)

  // When isInitialized transitions from false to true, skip the next save
  // (that save would just be saving the data we just loaded from DB)
  if (isInitialized && !prevInitializedRef.current) {
    prevInitializedRef.current = true
    skipNextSaveRef.current = true
  }

  // Debounce and save when cvData changes
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
    [cvData]
  )

  return null
}

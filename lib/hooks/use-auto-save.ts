import { useEffect, useRef } from 'react'
import { useDebounce } from 'react-use'
import useCVStore from '@/lib/stores/cv-store'

export function useAutoSave(delay = 2000) {
  const { cvData, selectedCVId, saveToDB } = useCVStore()
  const isInitialMount = useRef(true)

  // Skip auto-save on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
  }, [])

  // Debounce the CV data changes
  const [debouncedValue, setDebouncedValue] = useDebounce(
    () => cvData,
    delay,
    [cvData]
  )

  // Auto-save when debounced value changes
  useEffect(() => {
    if (!isInitialMount.current && selectedCVId) {
      saveToDB()
    }
  }, [debouncedValue])

  return null
}

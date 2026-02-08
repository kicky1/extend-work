import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ScaledCVPreview } from '@/components/cv/preview/scaled-cv-preview'
import { fadeUp, easeOut } from './constants'
import type { CVData } from '@/lib/types/cv'

export const CVStyleCard = memo(function CVStyleCard({
  cvData,
}: {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2, ease: easeOut } }}
      className="flex justify-center"
    >
      <ScaledCVPreview cvData={cvData} scale={0.42} />
    </motion.div>
  )
})

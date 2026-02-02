'use client'

import { memo } from 'react'
import type { CVData } from '@/lib/types/cv'
import CVDocument from './cv-document'

interface ScaledCVPreviewProps {
  cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  scale?: number
  className?: string
}

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH = 794
const A4_HEIGHT = 1123

function ScaledCVPreviewComponent({ cvData, scale = 0.30, className = '' }: ScaledCVPreviewProps) {
  // Calculate container dimensions based on scale
  const containerWidth = A4_WIDTH * scale
  const containerHeight = A4_HEIGHT * scale

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
        // Prevent any interaction
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Scaled inner container */}
      <div
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          // Off-screen content optimization
          contentVisibility: 'auto',
        }}
      >
        <CVDocument cvData={cvData} />
      </div>
    </div>
  )
}

// Memoize for performance - static preview cards don't need re-renders
export const ScaledCVPreview = memo(ScaledCVPreviewComponent)
export default ScaledCVPreview

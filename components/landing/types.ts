import type { ReactNode } from 'react'
import type { moduleAccents } from './constants'

export interface FeatureShowcaseProps {
  title: string
  description: string
  bullets?: string[]
  mockup: ReactNode
  reverse?: boolean
}

export type ModuleData = {
  id: string
  icon: React.ElementType
  label: string
  title: string
  description: string
  features: string[]
}

export type AccentKey = keyof typeof moduleAccents

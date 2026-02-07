import type { FeatureKey, FeatureSupport } from './data/types'
import { featureLabels } from './data/types'

export function getFeatureLabel(key: FeatureKey): string {
  return featureLabels[key]
}

export function getFeatureStatus(features: FeatureSupport, key: FeatureKey): boolean | 'partial' {
  return features[key]
}

export function competitorSlugToCompareSlug(competitorSlug: string): string {
  return `extend-career-vs-${competitorSlug}`
}

export function parseCompareSlug(slug: string): { competitor: string } | null {
  const match = slug.match(/^extend-career-vs-(.+)$/)
  if (!match) return null
  return { competitor: match[1] }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function estimateReadTime(text: string): number {
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 250))
}

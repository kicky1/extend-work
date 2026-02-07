import type { Competitor } from '../types'
import { resumeIo } from './resume-io'
import { zety } from './zety'
import { novoresume } from './novoresume'
import { teal } from './teal'
import { jobscan } from './jobscan'

export const competitors: Competitor[] = [
  resumeIo,
  zety,
  novoresume,
  teal,
  jobscan,
]

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}

export { resumeIo, zety, novoresume, teal, jobscan }

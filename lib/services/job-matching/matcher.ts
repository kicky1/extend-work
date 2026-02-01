import { createAnthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { z } from 'zod'

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const batchScoreSchema = z.object({
  scores: z.array(z.object({
    jobId: z.string(),
    score: z.number().min(0).max(100),
    matchingSkills: z.array(z.string()),
    missingSkills: z.array(z.string()),
  })),
})

export interface JobScoreResult {
  jobId: string
  score: number
  matchingSkills: string[]
  missingSkills: string[]
}

export async function scoreJobBatch(
  cvSummary: string,
  jobs: { id: string; title: string; company: string; description: string }[]
): Promise<JobScoreResult[]> {
  const jobList = jobs
    .map((j, i) => `[${i + 1}] ID: ${j.id}\nTitle: ${j.title}\nCompany: ${j.company}\nDescription: ${j.description?.slice(0, 500) || 'N/A'}`)
    .join('\n\n')

  const result = await generateObject({
    model: anthropic('claude-haiku-4-20250414'),
    schema: batchScoreSchema,
    temperature: 0,
    system: `You are a recruiter scoring job-candidate fit. For each job, return a score 0-100, matching skills, and missing skills. Be concise. Return results for ALL jobs provided.`,
    prompt: `CANDIDATE CV:\n${cvSummary}\n\nJOBS TO SCORE:\n${jobList}\n\nScore each job's compatibility with this candidate.`,
  })

  return result.object.scores
}

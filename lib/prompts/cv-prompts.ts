import type { CVData } from '@/lib/types/cv'

export type AIMode = 'generate' | 'ats' | 'grammar'
export type Section = 'summary' | 'experience' | 'education' | 'skills'

export const systemPrompts: Record<AIMode, string> = {
  generate: `You are a professional CV writing assistant. Generate compelling, professional content for CVs/resumes.
- Use action verbs and quantifiable achievements
- Keep language clear, concise, and professional
- Tailor content to highlight skills and accomplishments
- Return ONLY the generated text, no additional commentary`,

  ats: `You are an ATS (Applicant Tracking System) optimization expert. Optimize CV content to improve ATS scores.
- Incorporate relevant industry keywords
- Use standard section headings and formatting
- Highlight measurable achievements and metrics
- Ensure content is ATS-friendly (no tables, complex formatting)
- Return ONLY the optimized text, no additional commentary`,

  grammar: `You are a professional editor specializing in CV/resume content. Fix grammar, spelling, and improve clarity.
- Correct spelling and grammatical errors
- Improve sentence structure and flow
- Maintain professional tone
- Keep the original meaning intact
- Return ONLY the corrected text, no additional commentary`,
}

export function buildPrompt(
  mode: AIMode,
  section: Section,
  data: Partial<CVData>,
  userInput?: string
): string {
  const prompts: Record<Section, (mode: AIMode, data: Partial<CVData>, input?: string) => string> = {
    summary: (mode, data, input) => {
      if (mode === 'generate') {
        return `Generate a professional summary for a CV based on this information:
- Name: ${data.personalInfo?.fullName || 'Not provided'}
- Current role/experience: ${input || 'Not provided'}
- Work history: ${data.workExperience?.map(exp => `${exp.position} at ${exp.company}`).join(', ') || 'Not provided'}
- Education: ${data.education?.map(edu => `${edu.degree} in ${edu.field}`).join(', ') || 'Not provided'}

Write a compelling 2-3 sentence professional summary.`
      } else if (mode === 'ats') {
        return `Optimize this professional summary for ATS:
"${data.summary || input}"

Add relevant keywords and improve ATS compatibility while maintaining natural language.`
      } else {
        return `Fix grammar and improve clarity of this professional summary:
"${data.summary || input}"`
      }
    },

    experience: (mode, data, input) => {
      if (mode === 'generate') {
        return `Generate professional work experience description and achievements for:
- Position: ${input || 'Not provided'}
- Additional context: Describe key responsibilities and achievements

Format as:
Description: [2-3 sentence overview]
Achievements:
- [Achievement 1]
- [Achievement 2]
- [Achievement 3]`
      } else if (mode === 'ats') {
        return `Optimize this work experience description for ATS:
"${input}"

Add relevant keywords, quantify achievements, and improve ATS compatibility.`
      } else {
        return `Fix grammar and improve this work experience description:
"${input}"`
      }
    },

    education: (mode, data, input) => {
      if (mode === 'generate') {
        return `Generate a brief description for this education entry:
${input}

Write 1-2 sentences about notable courses, honors, or relevant activities.`
      } else {
        return `${mode === 'ats' ? 'Optimize for ATS' : 'Fix grammar in'} this education description:
"${input}"`
      }
    },

    skills: (mode, data, input) => {
      if (mode === 'generate') {
        return `Based on this role/industry: "${input}", suggest 8-12 relevant skills.
Return as a comma-separated list categorized by type.

Format:
Technical: [skills]
Soft Skills: [skills]
Tools: [skills]`
      } else if (mode === 'ats') {
        return `Optimize this skills list for ATS in the ${input} industry:
Current skills: ${data.skills?.map(s => s.name).join(', ') || 'None'}

Add missing relevant keywords and industry-standard terms.`
      } else {
        return `Review and fix any issues in this skills list:
${data.skills?.map(s => s.name).join(', ') || input}`
      }
    },
  }

  return prompts[section](mode, data, userInput)
}

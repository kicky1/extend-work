import type { CVData } from '@/lib/types/cv'

interface BuildCVSummaryOptions {
  maxExperiences?: number
  maxSkills?: number
}

export function buildCVSummary(cvData: CVData, options?: BuildCVSummaryOptions): string {
  const parts: string[] = []

  if (cvData.personalInfo) {
    parts.push(`Name: ${cvData.personalInfo.fullName || 'Not specified'}`)
    if (cvData.personalInfo.location) parts.push(`Location: ${cvData.personalInfo.location}`)
  }

  if (cvData.summary) parts.push(`\nProfessional Summary:\n${cvData.summary}`)

  if (cvData.workExperience?.length > 0) {
    parts.push('\nWork Experience:')
    const experiences = options?.maxExperiences
      ? cvData.workExperience.slice(0, options.maxExperiences)
      : cvData.workExperience
    for (const exp of experiences) {
      const duration = exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`
      parts.push(`- ${exp.position} at ${exp.company} (${duration})`)
      if (exp.description) parts.push(`  ${exp.description}`)
      if (exp.achievements?.length > 0) {
        parts.push(`  Achievements: ${exp.achievements.join('; ')}`)
      }
    }
  }

  if (cvData.education?.length > 0) {
    parts.push('\nEducation:')
    for (const edu of cvData.education) {
      parts.push(`- ${edu.degree} in ${edu.field} from ${edu.institution}`)
      if (edu.gpa) parts.push(`  GPA: ${edu.gpa}`)
      if (edu.description) parts.push(`  ${edu.description}`)
    }
  }

  if (cvData.skills?.length > 0) {
    const skills = options?.maxSkills
      ? cvData.skills.slice(0, options.maxSkills)
      : cvData.skills
    const grouped: Record<string, string[]> = {}
    for (const s of skills) {
      const cat = s.category || 'Other'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(s.level ? `${s.name} (${s.level})` : s.name)
    }
    parts.push('\nSkills:')
    for (const [cat, skillList] of Object.entries(grouped)) {
      parts.push(`- ${cat}: ${skillList.join(', ')}`)
    }
  }

  if (cvData.languages?.length > 0) {
    parts.push(`\nLanguages: ${cvData.languages.map((l) => l.level ? `${l.name} (${l.level})` : l.name).join(', ')}`)
  }

  if (cvData.certificates?.length > 0) {
    parts.push('\nCertificates:')
    for (const c of cvData.certificates) {
      parts.push(`- ${c.name}${c.issuer ? ` — ${c.issuer}` : ''}${c.issueDate ? ` (${c.issueDate})` : ''}`)
    }
  }

  return parts.join('\n')
}

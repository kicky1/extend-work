export function buildCVSummary(cvData: any): string {
  const parts: string[] = []

  // Personal info
  if (cvData.personalInfo) {
    parts.push(`Name: ${cvData.personalInfo.fullName || 'Not specified'}`)
    if (cvData.personalInfo.location) {
      parts.push(`Location: ${cvData.personalInfo.location}`)
    }
  }

  // Summary
  if (cvData.summary) {
    parts.push(`\nProfessional Summary:\n${cvData.summary}`)
  }

  // Work experience
  if (cvData.workExperience?.length > 0) {
    parts.push('\nWork Experience:')
    for (const exp of cvData.workExperience) {
      const duration = exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`
      parts.push(`- ${exp.position} at ${exp.company} (${duration})`)
      if (exp.description) {
        parts.push(`  ${exp.description}`)
      }
      if (exp.achievements?.length > 0) {
        parts.push(`  Achievements: ${exp.achievements.join('; ')}`)
      }
    }
  }

  // Education
  if (cvData.education?.length > 0) {
    parts.push('\nEducation:')
    for (const edu of cvData.education) {
      parts.push(`- ${edu.degree} in ${edu.field} from ${edu.institution}`)
    }
  }

  // Skills
  if (cvData.skills?.length > 0) {
    const skillNames = cvData.skills.map((s: any) => s.name)
    parts.push(`\nSkills: ${skillNames.join(', ')}`)
  }

  // Languages
  if (cvData.languages?.length > 0) {
    const langs = cvData.languages.map((l: any) => `${l.name} (${l.level})`)
    parts.push(`\nLanguages: ${langs.join(', ')}`)
  }

  // Certificates
  if (cvData.certificates?.length > 0) {
    parts.push('\nCertifications:')
    for (const cert of cvData.certificates) {
      parts.push(`- ${cert.name} from ${cert.issuer}`)
    }
  }

  return parts.join('\n')
}

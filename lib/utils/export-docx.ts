import type { CVData } from '@/lib/types/cv'
import type { CoverLetterData } from '@/lib/types/cover-letter'

// Shared helpers
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function createContactLine(cvData: CVData): string {
  const parts: string[] = []
  const { personalInfo } = cvData
  if (personalInfo.email) parts.push(personalInfo.email)
  if (personalInfo.phone) parts.push(personalInfo.phone)
  if (personalInfo.location) parts.push(personalInfo.location)
  if (personalInfo.website) parts.push(personalInfo.website)
  if (personalInfo.linkedIn) parts.push(personalInfo.linkedIn)
  if (personalInfo.github) parts.push(personalInfo.github)
  return parts.join(' | ')
}

// CV DOCX Export
export async function exportCVToDocx(
  cvData: CVData,
  filename?: string,
): Promise<void> {
  const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } = await import('docx')

  const sectionHeading = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text, bold: true, size: 24 })],
    })

  const bulletParagraph = (text: string) =>
    new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 40 },
      children: [new TextRun({ text, size: 20 })],
    })

  const sections: InstanceType<typeof Paragraph>[] = []
  const order = cvData.sectionOrder || ['summary', 'workExperience', 'education', 'skills', 'languages', 'certificates']

  // Header: name + contact
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: cvData.personalInfo.fullName || 'My CV',
          bold: true,
          size: 36,
        }),
      ],
    }),
  )

  const contact = createContactLine(cvData)
  if (contact) {
    sections.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: contact, size: 18, color: '666666' })],
      }),
    )
  }

  // Build sections in order
  for (const section of order) {
    switch (section) {
      case 'summary':
        if (cvData.summary) {
          sections.push(sectionHeading('Professional Summary'))
          sections.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: cvData.summary, size: 20 })],
            }),
          )
        }
        break

      case 'workExperience':
        if (cvData.workExperience.length > 0) {
          sections.push(sectionHeading('Work Experience'))
          for (const exp of cvData.workExperience) {
            const dateRange = exp.current
              ? `${exp.startDate} – Present`
              : `${exp.startDate} – ${exp.endDate}`

            sections.push(
              new Paragraph({
                spacing: { before: 120, after: 40 },
                children: [
                  new TextRun({ text: exp.position, bold: true, size: 22 }),
                  new TextRun({ text: ` at ${exp.company}`, size: 22 }),
                ],
              }),
            )
            sections.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: dateRange, size: 18, color: '666666', italics: true }),
                  ...(exp.location ? [new TextRun({ text: ` | ${exp.location}`, size: 18, color: '666666' })] : []),
                ],
              }),
            )
            if (exp.description) {
              sections.push(
                new Paragraph({
                  spacing: { after: 40 },
                  children: [new TextRun({ text: exp.description, size: 20 })],
                }),
              )
            }
            for (const ach of exp.achievements) {
              sections.push(bulletParagraph(ach))
            }
          }
        }
        break

      case 'education':
        if (cvData.education.length > 0) {
          sections.push(sectionHeading('Education'))
          for (const edu of cvData.education) {
            const dateRange = edu.current
              ? `${edu.startDate} – Present`
              : `${edu.startDate} – ${edu.endDate}`

            sections.push(
              new Paragraph({
                spacing: { before: 120, after: 40 },
                children: [
                  new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true, size: 22 }),
                ],
              }),
            )
            sections.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: edu.institution, size: 20 }),
                  new TextRun({ text: ` | ${dateRange}`, size: 18, color: '666666' }),
                  ...(edu.gpa ? [new TextRun({ text: ` | GPA: ${edu.gpa}`, size: 18, color: '666666' })] : []),
                ],
              }),
            )
            if (edu.description) {
              sections.push(
                new Paragraph({
                  spacing: { after: 40 },
                  children: [new TextRun({ text: edu.description, size: 20 })],
                }),
              )
            }
          }
        }
        break

      case 'skills':
        if (cvData.skills.length > 0) {
          sections.push(sectionHeading('Skills'))
          // Group by category
          const grouped = new Map<string, string[]>()
          for (const skill of cvData.skills) {
            const cat = skill.category || 'Other'
            if (!grouped.has(cat)) grouped.set(cat, [])
            grouped.get(cat)!.push(skill.name)
          }
          for (const [category, names] of grouped) {
            sections.push(
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: `${category}: `, bold: true, size: 20 }),
                  new TextRun({ text: names.join(', '), size: 20 }),
                ],
              }),
            )
          }
        }
        break

      case 'languages':
        if (cvData.languages?.length > 0) {
          sections.push(sectionHeading('Languages'))
          const langText = cvData.languages
            .map((l) => `${l.name} (${l.level})`)
            .join(', ')
          sections.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: langText, size: 20 })],
            }),
          )
        }
        break

      case 'certificates':
        if (cvData.certificates?.length > 0) {
          sections.push(sectionHeading('Certificates'))
          for (const cert of cvData.certificates) {
            sections.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: cert.name, bold: true, size: 20 }),
                  new TextRun({ text: ` – ${cert.issuer}`, size: 20 }),
                  new TextRun({ text: ` (${cert.issueDate})`, size: 18, color: '666666' }),
                ],
              }),
            )
          }
        }
        break
    }
  }

  // Footer: RODO consent
  if (cvData.footer?.rodoConsent) {
    sections.push(
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: cvData.footer.rodoConsent, size: 14, italics: true, color: '999999' }),
        ],
      }),
    )
  }

  const doc = new Document({
    sections: [{ children: sections }],
  })

  const blob = await Packer.toBlob(doc)
  const name = filename || (cvData.personalInfo.fullName
    ? `${cvData.personalInfo.fullName.replace(/\s+/g, '-')}-CV.docx`
    : 'my-cv.docx')
  downloadBlob(blob, name)
}

// Cover Letter DOCX Export
export async function exportCoverLetterToDocx(
  data: CoverLetterData,
  cvData: CVData,
  filename?: string,
): Promise<void> {
  const { Document, Paragraph, TextRun, Packer } = await import('docx')

  const paragraphs: InstanceType<typeof Paragraph>[] = []

  // Sender info from CV
  const { personalInfo } = cvData
  if (personalInfo.fullName) {
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.fullName, bold: true, size: 24 })],
      }),
    )
  }
  const contactParts = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean)
  if (contactParts.length > 0) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: contactParts.join(' | '), size: 20, color: '666666' })],
      }),
    )
  }

  // Date
  paragraphs.push(
    new Paragraph({
      spacing: { before: 200, after: 200 },
      children: [new TextRun({ text: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), size: 20 })],
    }),
  )

  // Recipient
  if (data.company) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: data.company, size: 20 })],
      }),
    )
  }

  // Body content - parse HTML to text paragraphs
  if (data.content) {
    const textContent = data.content
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<li>/gi, '• ')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')

    const lines = textContent.split('\n').filter((l) => l.trim())
    for (const line of lines) {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [new TextRun({ text: line.trim(), size: 20 })],
        }),
      )
    }
  }

  // Closing signature
  paragraphs.push(
    new Paragraph({
      spacing: { before: 200 },
      children: [new TextRun({ text: 'Sincerely,', size: 20 })],
    }),
  )
  if (personalInfo.fullName) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({ text: personalInfo.fullName, bold: true, size: 20 })],
      }),
    )
  }

  const doc = new Document({
    sections: [{ children: paragraphs }],
  })

  const blob = await Packer.toBlob(doc)
  const name = filename || (data.company
    ? `Cover-Letter-${data.company.replace(/\s+/g, '-')}.docx`
    : 'cover-letter.docx')
  downloadBlob(blob, name)
}

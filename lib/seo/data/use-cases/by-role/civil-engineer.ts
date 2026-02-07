import type { UseCase } from '../../types'

export const civilEngineerResume: UseCase = {
  slug: 'civil-engineer-resume',
  category: 'resume-by-role',
  title: 'Civil Engineer Resume Guide',
  metaTitle: 'Civil Engineer Resume: Expert Guide [2025]',
  metaDescription:
    'Create a compelling civil engineer resume that highlights your PE license, project management skills, and technical expertise. Covers AutoCAD, structural analysis, and construction oversight.',
  subtitle:
    'Showcase your engineering credentials, project delivery track record, and technical proficiency to land your next civil engineering role.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with your PE license and relevant certifications — they are non-negotiable qualifications for most senior civil engineering positions.',
    'Quantify project scope using budget figures, square footage, lane-miles, or population served to demonstrate the scale of your work.',
    'Highlight proficiency in industry-standard software like AutoCAD Civil 3D, Revit, and HEC-RAS alongside your field experience.',
    'Include permitting, regulatory compliance, and environmental review experience — these skills differentiate senior engineers from junior candidates.',
  ],
  sections: [
    {
      title: 'Highlighting Licensure and Certifications',
      body: `<p>In civil engineering, your <strong>Professional Engineer (PE) license</strong> is the single most important credential on your resume. It signals to employers that you can stamp drawings, take legal responsibility for designs, and lead projects independently.</p>
<p>Place licensure information prominently — either in your professional summary or in a dedicated "Licenses & Certifications" section near the top of your resume.</p>
<ul>
  <li><strong>PE License:</strong> Include the state(s) of licensure, license number, and expiration date.</li>
  <li><strong>EIT/FE Certification:</strong> If you haven't yet earned your PE, your Engineer-in-Training status shows you're on the path.</li>
  <li><strong>Specialty certifications:</strong> LEED AP, PMP, OSHA 30-Hour, or state-specific environmental certifications add significant value.</li>
  <li><strong>Continuing education:</strong> Mention relevant PDH credits if you've completed advanced coursework in seismic design, stormwater management, or geotechnical analysis.</li>
</ul>
<p>If you hold PE licenses in multiple states, list all of them — multi-state licensure is a strong differentiator for firms with regional or national project portfolios.</p>`,
      tip: 'If your PE exam is scheduled, include "PE Exam scheduled [Month Year]" to signal your intent without misrepresenting your current status.',
    },
    {
      title: 'Structuring Your Project Experience',
      body: `<p>Civil engineering hiring managers care less about your daily responsibilities and more about the <strong>projects you delivered</strong>. Structure your experience section around project outcomes rather than generic duties.</p>
<p>For each role, highlight 2-3 signature projects using this framework:</p>
<ul>
  <li><strong>Project scope:</strong> "Led structural design for a 120,000 SF mixed-use development with a $45M construction budget."</li>
  <li><strong>Your specific role:</strong> "Served as lead design engineer responsible for foundation design, structural calculations, and construction document preparation."</li>
  <li><strong>Technical details:</strong> Name the codes you designed to (IBC, AASHTO, ACI 318), software used, and analysis methods employed.</li>
  <li><strong>Outcome:</strong> "Delivered project 3 weeks ahead of schedule and 8% under budget through value-engineering alternatives."</li>
</ul>
<p>Group your experience by project type (transportation, water resources, structural) if you've worked across multiple sub-disciplines. This helps recruiters quickly assess your domain relevance.</p>`,
    },
    {
      title: 'Showcasing Technical Software Proficiency',
      body: `<p>Modern civil engineering relies heavily on specialized software, and your proficiency directly impacts your productivity and value to an employer. A well-organized technical skills section can set you apart from candidates who only list generic tools.</p>
<ul>
  <li><strong>Design & Drafting:</strong> AutoCAD Civil 3D, MicroStation, Revit, SketchUp — specify version familiarity where relevant.</li>
  <li><strong>Analysis & Modeling:</strong> SAP2000, STAAD.Pro, RISA-3D, HEC-RAS, HEC-HMS, EPANET, GeoStudio.</li>
  <li><strong>Project Management:</strong> Primavera P6, Microsoft Project, Procore, Bluebeam Revu.</li>
  <li><strong>GIS & Survey:</strong> ArcGIS, QGIS, Trimble Business Center — increasingly important for infrastructure and land development projects.</li>
</ul>
<p>Don't just list software names — weave them into your experience bullets. "Developed grading plans using AutoCAD Civil 3D for a 200-lot residential subdivision" is far more compelling than simply listing "AutoCAD Civil 3D" in a skills section.</p>`,
      tip: 'Mirror the exact software names from the job posting. If the listing says "Civil 3D," don\'t abbreviate to "C3D" — ATS systems may not recognize the abbreviation.',
    },
    {
      title: 'Demonstrating Construction and Field Experience',
      body: `<p>Employers highly value civil engineers who can bridge the gap between design and construction. Field experience demonstrates that you understand constructability, can communicate with contractors, and can solve problems in real time.</p>
<ul>
  <li><strong>Construction oversight:</strong> Describe your role in construction administration — RFI responses, shop drawing review, site inspections, and punch list management.</li>
  <li><strong>Permitting and regulatory work:</strong> Detail your experience securing permits from agencies such as the Army Corps of Engineers, state DOTs, or local municipalities.</li>
  <li><strong>Environmental compliance:</strong> Highlight NEPA review, SWPPP development, erosion control design, or wetland mitigation experience.</li>
  <li><strong>Stakeholder coordination:</strong> Mention collaboration with architects, geotechnical engineers, MEP consultants, utility companies, and public agencies.</li>
</ul>
<p>If you've managed construction budgets, include the dollar amounts. "Managed construction administration for $22M in active projects simultaneously" immediately communicates your capacity and trustworthiness.</p>`,
    },
    {
      title: 'Formatting and Professional Presentation',
      body: `<p>Civil engineering resumes should project the same precision and attention to detail you bring to your engineering work. Sloppy formatting undermines your credibility before a hiring manager reads a single bullet point.</p>
<ul>
  <li>Use a clean, single-column layout with clear section headers. Avoid decorative elements that distract from content.</li>
  <li>Keep your resume to one page for under 10 years of experience, or two pages maximum for senior engineers with extensive project portfolios.</li>
  <li>List your ABET-accredited degree prominently, including your concentration (structural, transportation, geotechnical, water resources).</li>
  <li>Include professional affiliations — ASCE membership, local engineering society involvement, or committee participation signals industry engagement.</li>
</ul>
<p>Export as PDF and name the file professionally: <code>FirstName_LastName_PE_Civil_Resume.pdf</code>. Including "PE" in the filename catches the eye of recruiters scanning a folder of applications.</p>`,
      tip: 'If you have published papers, presented at conferences, or hold patents, include a brief "Publications & Presentations" section — it distinguishes you from engineers who only do project work.',
    },
  ],
  checklist: [
    'PE license (or EIT/FE status) listed prominently with state and license number',
    'Professional summary mentioning years of experience, sub-discipline, and signature achievement',
    'At least 2-3 projects described with scope, budget, and measurable outcomes',
    'Technical software proficiency organized by category (design, analysis, project management)',
    'Construction administration and field experience highlighted',
    'Permitting, environmental compliance, and regulatory experience included',
    'ABET-accredited degree with concentration listed in education section',
    'Professional affiliations (ASCE, local societies) mentioned',
    'Single-column, ATS-friendly PDF format with clean fonts',
    'File named with your name, PE designation, and target role',
  ],
  commonMistakes: [
    'Burying your PE license in the education section instead of featuring it prominently — this is your most important credential and should be visible within seconds.',
    'Writing generic duty-based bullets like "Responsible for design tasks" instead of project-specific achievements with quantified scope and outcomes.',
    'Listing every software you\'ve ever opened rather than curating for the target role — emphasize the tools mentioned in the job description.',
    'Omitting construction and field experience in favor of design-only descriptions — employers want engineers who understand the full project lifecycle.',
    'Failing to specify which codes and standards you design to (IBC, AASHTO, ACI) — these are critical keywords for ATS matching in civil engineering roles.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'mechanical-engineer-resume',
    'architect-resume',
    'project-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

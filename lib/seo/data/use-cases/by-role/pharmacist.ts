import type { UseCase } from '../../types'

export const pharmacistResume: UseCase = {
  slug: 'pharmacist-resume',
  category: 'resume-by-role',
  title: 'Pharmacist Resume Guide',
  metaTitle: 'Pharmacist Resume: Expert Guide [2025]',
  metaDescription:
    'Build a professional pharmacist resume that highlights your PharmD, licensure, clinical expertise, and patient care skills. Covers drug utilization review, compounding, and pharmacy management.',
  subtitle:
    'Present your clinical knowledge, regulatory expertise, and patient counseling skills to secure your next pharmacy position.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Feature your PharmD degree and active pharmacist license at the top of your resume — they are baseline requirements that reviewers check first.',
    'Quantify your clinical impact with metrics like prescription volume processed, medication error reduction rates, or patient satisfaction scores.',
    'Highlight both clinical competencies (drug utilization review, therapeutic monitoring) and operational skills (inventory management, staff supervision).',
    'Tailor your resume to the practice setting — retail, hospital, clinical, or specialty pharmacy each value different skill sets.',
  ],
  sections: [
    {
      title: 'Showcasing Your Credentials and Licensure',
      body: `<p>Pharmacy is a licensed profession, and your <strong>PharmD degree and state licensure</strong> are the first things any employer verifies. Position these credentials where they cannot be missed.</p>
<ul>
  <li><strong>Pharmacist license:</strong> List the state(s) of licensure, license number, and current status. Multi-state licensure is valuable for retail chains and telepharmacy roles.</li>
  <li><strong>PharmD degree:</strong> Include your graduating institution, year, and any honors or distinctions (magna cum laude, Rho Chi Society membership).</li>
  <li><strong>Board certifications:</strong> BCPS, BCOP, BCACP, BCGP, or other Board of Pharmacy Specialties certifications signal advanced clinical competence.</li>
  <li><strong>Additional credentials:</strong> Immunization certification, MTM certification, controlled substance DEA registration, or specialty training in oncology, critical care, or ambulatory care.</li>
</ul>
<p>If you completed a PGY-1 or PGY-2 residency, treat it as a distinct experience entry — residency training is a major differentiator for clinical and hospital pharmacy roles.</p>`,
      tip: 'List your NPI number availability and any state-specific collaborative practice agreement authority if you are applying for clinical pharmacist roles with prescriptive authority.',
    },
    {
      title: 'Describing Clinical Experience Effectively',
      body: `<p>Pharmacy hiring managers want to see that you can manage clinical responsibilities independently, communicate with prescribers, and improve patient outcomes. Generic descriptions of "filling prescriptions" won't differentiate you from hundreds of other applicants.</p>
<p>Structure your experience bullets around clinical interventions and their outcomes:</p>
<ul>
  <li><strong>Drug utilization review:</strong> "Conducted prospective DUR on 300+ prescriptions daily, identifying and resolving an average of 15 drug interactions or therapeutic duplications per shift."</li>
  <li><strong>Patient counseling:</strong> "Provided medication therapy management counseling to 40+ patients weekly, improving adherence rates by 22% over 6 months as measured by PDC scores."</li>
  <li><strong>Clinical protocols:</strong> "Developed anticoagulation monitoring protocol adopted across 3 hospital campuses, reducing warfarin-related adverse events by 31%."</li>
  <li><strong>Immunizations:</strong> "Administered 2,500+ immunizations annually including COVID-19, influenza, shingles, and pneumococcal vaccines under standing orders."</li>
</ul>
<p>Whenever possible, tie your clinical activities to measurable patient outcomes, cost savings, or quality improvement metrics. These numbers transform your resume from a job description into an achievement record.</p>`,
    },
    {
      title: 'Highlighting Pharmacy Operations and Technology',
      body: `<p>Modern pharmacy practice is technology-driven, and employers need pharmacists who can navigate complex systems efficiently. Your familiarity with pharmacy management systems and automation is a significant competitive advantage.</p>
<ul>
  <li><strong>Pharmacy management systems:</strong> QS/1, Rx30, Enterprise Rx, Epic Willow, Cerner PharmNet — name the specific platforms you've used.</li>
  <li><strong>Automation and robotics:</strong> ScriptPro, Parata, BD Pyxis, Omnicell — describe your experience with automated dispensing and inventory management.</li>
  <li><strong>Clinical decision support:</strong> Clinical Pharmacology, Lexicomp, Micromedex, UpToDate — reference tools you use for drug information and clinical decision-making.</li>
  <li><strong>Operational metrics:</strong> Include prescription volume (daily/weekly), inventory management results, and workflow optimization achievements.</li>
</ul>
<p>If you've led a pharmacy technology implementation or system migration, feature it prominently. "Led transition from QS/1 to Enterprise Rx across 12 retail locations, completing data migration and staff training in 6 weeks with zero dispensing interruptions" demonstrates both technical and leadership capability.</p>`,
      tip: 'Mention experience with 340B drug pricing programs, specialty pharmacy accreditation (URAC, ACHC), or telepharmacy platforms if relevant to your target role.',
    },
    {
      title: 'Emphasizing Regulatory Compliance and Leadership',
      body: `<p>Pharmacists operate in one of the most heavily regulated healthcare environments. Demonstrating your knowledge of compliance requirements and your ability to maintain inspection-ready operations is essential for mid-career and senior roles.</p>
<ul>
  <li><strong>Regulatory compliance:</strong> Describe your experience with state Board of Pharmacy inspections, DEA audits, and CMS requirements. "Maintained 100% compliance across 3 consecutive state board inspections with zero deficiencies."</li>
  <li><strong>Controlled substance management:</strong> Highlight experience with Schedule II-V inventory reconciliation, PDMP reporting, and suspicious order monitoring.</li>
  <li><strong>Staff supervision:</strong> Quantify your leadership scope — number of pharmacy technicians supervised, training programs developed, and scheduling responsibility.</li>
  <li><strong>Quality improvement:</strong> Document participation in pharmacy and therapeutics (P&T) committees, formulary management, medication error reporting, and root cause analysis.</li>
</ul>
<p>Pharmacy managers should include financial metrics such as revenue growth, cost-per-prescription reduction, or generic dispensing rate improvements. These business-oriented metrics resonate strongly with district managers and regional directors.</p>`,
    },
    {
      title: 'Tailoring Your Resume to Practice Settings',
      body: `<p>A pharmacist resume that works for a retail chain will fall flat in a clinical hospital setting, and vice versa. Customize your resume for the specific practice environment you're targeting.</p>
<ul>
  <li><strong>Retail/community pharmacy:</strong> Emphasize prescription volume, patient counseling, immunization programs, OTC recommendations, and front-end management.</li>
  <li><strong>Hospital/institutional pharmacy:</strong> Focus on clinical interventions, interdisciplinary rounding, IV compounding (USP 797/800 compliance), and formulary management.</li>
  <li><strong>Clinical/ambulatory care:</strong> Highlight collaborative practice agreements, chronic disease management (diabetes, hypertension, anticoagulation), and outcomes research.</li>
  <li><strong>Specialty pharmacy:</strong> Emphasize experience with high-cost biologics, limited distribution drugs, prior authorization navigation, and patient access programs.</li>
</ul>
<p>Review each job posting carefully and reorder your experience bullets to lead with the skills most relevant to that setting. A clinical pharmacist applying to a hospital should lead with rounding experience, not prescription counting.</p>`,
      tip: 'If transitioning between practice settings, write a professional summary that bridges your current experience to the new environment — for example, highlighting your clinical intervention skills when moving from retail to hospital pharmacy.',
    },
  ],
  checklist: [
    'PharmD degree and active state pharmacist license listed prominently with license number',
    'Board certifications (BCPS, BCOP, etc.) and specialty credentials clearly visible',
    'Clinical experience described with specific interventions and measurable patient outcomes',
    'Prescription volume and operational metrics quantified',
    'Pharmacy management system proficiency listed with specific platform names',
    'Regulatory compliance and inspection history documented',
    'Residency training (PGY-1/PGY-2) featured as a distinct experience entry if applicable',
    'Resume tailored to the target practice setting (retail, hospital, clinical, specialty)',
    'Professional affiliations (APhA, ASHP, state pharmacy association) included',
    'PDF format with professional file naming convention',
  ],
  commonMistakes: [
    'Using the same resume for retail and clinical positions — each practice setting values fundamentally different skills and metrics.',
    'Describing duties instead of achievements — "Filled prescriptions" says nothing, while "Processed 250+ prescriptions daily with a 99.97% accuracy rate" demonstrates excellence.',
    'Omitting board certifications or burying them at the bottom — BCPS, BCOP, and similar credentials are major differentiators that belong near the top.',
    'Failing to mention specific pharmacy management systems and automation platforms — hiring managers need to know you can operate their technology stack from day one.',
    'Neglecting to include regulatory compliance experience — pharmacists who can maintain inspection-ready operations and navigate DEA audits are in high demand.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'registered-nurse-resume',
    'dental-hygienist-resume',
    'physical-therapist-resume',
  ],
  updatedAt: '2025-01-15',
}

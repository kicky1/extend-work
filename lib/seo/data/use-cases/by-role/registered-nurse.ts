import type { UseCase } from '../../types'

export const registeredNurseResume: UseCase = {
  slug: 'registered-nurse-resume',
  category: 'resume-by-role',
  title: 'Registered Nurse Resume Guide',
  metaTitle: 'Registered Nurse Resume: Expert Guide [2025]',
  metaDescription:
    'Write a registered nurse resume that highlights clinical competencies, patient outcomes, and certifications. Covers ATS optimization, specialty formatting, and common mistakes.',
  subtitle:
    'Translate your clinical expertise, patient care outcomes, and specialized certifications into a resume that gets you hired at the facility you want.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Place your nursing license (RN, BSN, MSN) and specialty certifications (CCRN, CEN, OCN) directly after your name in the header.',
    'Quantify patient care with unit size, patient ratios, and outcome metrics — not just duties performed.',
    'Tailor for the specialty: ICU, ER, OR, L&D, oncology, and pediatrics each require different emphasis.',
    'Include clinical skills, EHR system proficiency, and any preceptor or charge nurse experience.',
  ],
  sections: [
    {
      title: 'Structuring Credentials and Licenses',
      body: `<p>In nursing, credentials are the first thing hiring managers look for. Make them <strong>impossible to miss</strong> by structuring them correctly.</p>
<ul>
  <li>Place credentials after your name in the header: "Sarah Johnson, BSN, RN, CCRN." Follow the ANCC-recommended order: degree, licensure, state designations, national certifications, awards, other.</li>
  <li>Create a dedicated "Licenses & Certifications" section near the top of your resume listing: active RN license with state and number, BLS, ACLS, PALS, and any specialty certifications.</li>
  <li>Include expiration dates for time-limited certifications so recruiters can verify currency: "ACLS — American Heart Association (exp. 09/2026)."</li>
  <li>If you hold compact/multistate licenses, state that explicitly — it's a significant advantage for travel nursing and remote triage roles.</li>
</ul>
<p>Don't bury certifications in a skills section. In healthcare hiring, credentials are non-negotiable prerequisites. A recruiter who can't find your RN license within 5 seconds may move to the next candidate.</p>`,
      tip: 'If you recently earned a new certification, note the date. "CCRN (obtained January 2025)" shows professional development momentum.',
    },
    {
      title: 'Quantifying Patient Care and Outcomes',
      body: `<p>Many nursing resumes default to duty-based descriptions: "Provided patient care in the ICU." This tells the hiring manager nothing they don't already know. Instead, <strong>quantify your environment and impact</strong>.</p>
<ul>
  <li><strong>Unit scope:</strong> "Managed care for 4-5 critically ill patients per shift in a 32-bed Level I Trauma ICU."</li>
  <li><strong>Patient outcomes:</strong> "Reduced CLABSI rate on the unit by 40% through implementation of a standardized central line bundle protocol."</li>
  <li><strong>Volume and acuity:</strong> "Triaged 60+ patients per shift in a high-volume ED with 85,000 annual visits."</li>
  <li><strong>Efficiency:</strong> "Decreased average ED door-to-bed time by 12 minutes through a nurse-initiated protocol for chest pain assessment."</li>
</ul>
<p>If your unit achieved recognition — Magnet status, Beacon Award, Leapfrog grade — mention it. It contextualizes the quality standard you worked within.</p>`,
    },
    {
      title: 'Highlighting Clinical Skills and Specializations',
      body: `<p>Your clinical skills section should be specific to your specialty and use the exact terminology that ATS systems and nurse recruiters search for.</p>
<ul>
  <li><strong>ICU:</strong> Ventilator management, hemodynamic monitoring, arterial line management, CRRT, targeted temperature management, vasoactive drip titration.</li>
  <li><strong>Emergency:</strong> Trauma assessment, rapid sequence intubation assistance, stroke and STEMI protocol activation, forensic evidence collection.</li>
  <li><strong>OR:</strong> Surgical instrumentation, sterile technique, circulating and scrubbing, specimen management, surgical count protocols.</li>
  <li><strong>L&D:</strong> Fetal monitoring interpretation, labor augmentation, postpartum hemorrhage management, neonatal resuscitation (NRP).</li>
</ul>
<p>Include EHR proficiency: Epic, Cerner, Meditech, or CPSI. Specify modules you've used: Epic Flowsheets, Cerner PowerChart, Meditech Expanse. EHR fluency is a hiring priority because it directly impacts onboarding time.</p>`,
      tip: 'Mirror the exact clinical skills listed in the job posting. If they say "hemodynamic monitoring," don\'t write "cardiac monitoring" — ATS matching is often literal.',
    },
    {
      title: 'Showcasing Leadership and Professional Development',
      body: `<p>Nursing hiring managers look for candidates who contribute beyond direct patient care. Leadership and professional development activities signal commitment to the profession and readiness for advancement.</p>
<ul>
  <li><strong>Charge nurse experience:</strong> "Served as charge nurse 3-4 shifts per week, coordinating patient assignments for 12 nurses and managing bed flow for a 28-bed unit."</li>
  <li><strong>Preceptorship:</strong> "Precepted 8 new graduate nurses through the 12-week orientation program, with 100% retention at 1-year mark."</li>
  <li><strong>Committee work:</strong> "Served on the hospital's Falls Prevention Committee, contributing to a 25% reduction in patient falls over 12 months."</li>
  <li><strong>Evidence-based practice:</strong> "Led a journal club and initiated an EBP project on early mobilization in the ICU, resulting in a protocol change adopted unit-wide."</li>
</ul>
<p>If you've presented at nursing conferences, published in journals, or participated in research, include these under a "Professional Development" or "Scholarly Activity" section.</p>`,
    },
  ],
  checklist: [
    'Credentials listed after name in ANCC-recommended order: degree, licensure, certifications',
    'Licenses & Certifications section includes state RN license, BLS, ACLS, PALS, and specialty certs',
    'Patient care quantified with unit size, patient ratios, and outcome metrics',
    'Clinical skills tailored to specialty and matching job posting terminology',
    'EHR system proficiency specified by name and module (Epic, Cerner, Meditech)',
    'Leadership experience included: charge nurse, preceptor, committee participation',
    'Professional development activities: conferences, publications, EBP projects',
    'Resume uses standard formatting compatible with healthcare ATS systems',
  ],
  commonMistakes: [
    'Writing duty-based bullets ("provided patient care") instead of outcome-based bullets ("reduced CLABSI rate by 40% through bundle compliance").',
    'Burying credentials and licenses in a skills section instead of placing them in the header and a dedicated section.',
    'Using generic clinical skills that could apply to any specialty instead of tailoring to the target unit.',
    'Omitting EHR system experience — hospitals invest heavily in specific systems and strongly prefer nurses who already know theirs.',
    'Failing to include leadership activities like charge nurse shifts, preceptoring, or committee work that differentiate you from staff-level candidates.',
    'Not mentioning Magnet status, Beacon Awards, or other unit/hospital recognitions that contextualize your practice environment.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'teacher-resume',
    'project-manager-resume',
    'sales-representative-resume',
  ],
  updatedAt: '2025-01-15',
}

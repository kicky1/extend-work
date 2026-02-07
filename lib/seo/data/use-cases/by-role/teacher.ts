import type { UseCase } from '../../types'

export const teacherResume: UseCase = {
  slug: 'teacher-resume',
  category: 'resume-by-role',
  title: 'Teacher Resume Guide',
  metaTitle: 'Teacher Resume: Expert Guide [2025]',
  metaDescription:
    'Create a teacher resume that showcases student outcomes, curriculum development, and classroom innovation. Includes K-12 and higher ed formatting, ATS tips, and common mistakes.',
  subtitle:
    'Go beyond listing subjects taught. Show administrators you drive student growth, innovate in the classroom, and contribute to the school community.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Quantify student outcomes: test score improvements, graduation rates, college acceptance rates, or growth percentile gains.',
    'Highlight curriculum development and instructional innovation as evidence of your teaching philosophy in action.',
    'Include certifications, endorsements, and state-specific licensure prominently — they are non-negotiable for hiring.',
    'Show school community involvement: coaching, club sponsorship, committee work, parent engagement initiatives.',
    'Tailor for the specific role: elementary, secondary, special education, ESL, and higher education resumes differ significantly.',
  ],
  sections: [
    {
      title: 'Quantifying Student Outcomes',
      body: `<p>Principals and hiring committees want evidence that you <strong>move the needle on student achievement</strong>. Data-driven teaching is the expectation in 2025, and your resume should reflect that.</p>
<ul>
  <li><strong>Standardized tests:</strong> "Students achieved a 94% pass rate on the AP Chemistry exam, 22 points above the national average."</li>
  <li><strong>Growth metrics:</strong> "Average student growth percentile of 78 on MAP Reading assessments, placing in the top quartile among district teachers."</li>
  <li><strong>Graduation and college readiness:</strong> "Mentored 45 seniors through the college application process, with 92% gaining admission to their first-choice institution."</li>
  <li><strong>Behavior and engagement:</strong> "Reduced chronic absenteeism in homeroom from 18% to 6% through a restorative justice and mentoring program."</li>
</ul>
<p>If standardized test data isn't available (e.g., for elective courses), use course completion rates, student satisfaction surveys, portfolio quality assessments, or competition results.</p>`,
      tip: 'Keep a data folder each year: save assessment results, student feedback forms, and administrator evaluations. This makes resume updates far easier.',
    },
    {
      title: 'Showcasing Curriculum Development and Innovation',
      body: `<p>Writing and refining curriculum demonstrates that you think deeply about <strong>pedagogy, standards alignment, and student engagement</strong> — qualities that distinguish strong teachers from adequate ones.</p>
<ul>
  <li>"Designed and implemented a project-based learning unit on environmental science, culminating in student-led community action projects that earned coverage in the local newspaper."</li>
  <li>"Developed a differentiated reading intervention program for struggling readers (Lexile 200-500), resulting in an average 1.5 grade-level improvement over one academic year."</li>
  <li>"Created a blended learning curriculum integrating Google Classroom, Nearpod, and Khan Academy, increasing student engagement scores by 30% in post-unit surveys."</li>
  <li>"Wrote and piloted a new AP Computer Science Principles course for the district, adopted by 4 additional schools the following year."</li>
</ul>
<p>Name the standards you align to (Common Core, NGSS, state standards) and the pedagogical approaches you employ (UDL, differentiated instruction, inquiry-based learning, culturally responsive teaching). These keywords matter for both ATS and human reviewers.</p>`,
    },
    {
      title: 'Presenting Certifications and Endorsements',
      body: `<p>Teaching certifications are hard requirements. Present them clearly so that HR departments and ATS systems can verify your eligibility without friction.</p>
<ul>
  <li>Create a dedicated "Certifications & Licensure" section with: state teaching license, subject endorsements, grade-level authorization, and expiration dates.</li>
  <li>Example: "Illinois Professional Educator License (PEL) — Secondary Education, Mathematics Endorsement (Type 09), Valid through 06/2028."</li>
  <li>Include additional endorsements: ESL/ELL, Special Education (LBS1), Gifted Education, Reading Specialist.</li>
  <li>If you hold National Board Certification (NBPTS), feature it prominently — it's the gold standard of teaching credentials.</li>
</ul>
<p>List Praxis or edTPA scores if they are strong and relevant. For applications in a new state, note reciprocity status: "Applying for Texas Standard Certificate via interstate reciprocity (Illinois PEL active)."</p>
<p>If you're alternatively certified (Teach for America, TNTP, iTeach), frame it positively and emphasize the classroom experience you've gained.</p>`,
      tip: 'Check the specific certification language in the job posting and mirror it exactly. "Type 09 Endorsement" and "Secondary Mathematics Certification" may refer to the same thing, but ATS treats them as different keywords.',
    },
    {
      title: 'Highlighting School Community Contributions',
      body: `<p>Administrators hire teachers who contribute to the <strong>whole school community</strong>, not just their classroom. Extracurricular involvement is often the tiebreaker between equally qualified candidates.</p>
<ul>
  <li><strong>Coaching:</strong> "Head coach of the varsity debate team for 3 years, qualifying 6 students for the state tournament."</li>
  <li><strong>Club sponsorship:</strong> "Founded and advised the school's Robotics Club, growing membership from 8 to 35 students and competing in FIRST Robotics regionals."</li>
  <li><strong>Committee work:</strong> "Served on the School Improvement Plan committee, contributing to a strategic initiative that raised the school's accountability rating from C to B."</li>
  <li><strong>Parent engagement:</strong> "Organized quarterly STEM Family Nights attended by 80+ families, strengthening school-community partnerships."</li>
  <li><strong>Mentorship:</strong> "Mentored 4 student teachers through their clinical placement, providing weekly observation feedback and co-teaching support."</li>
</ul>
<p>These activities also demonstrate soft skills — leadership, organization, communication, initiative — that are harder to show through classroom teaching bullets alone.</p>`,
    },
    {
      title: 'Formatting and Technology Integration',
      body: `<p>Teacher resumes should be clean and professional, but they can also reflect your facility with educational technology — a growing priority for school districts.</p>
<ul>
  <li>Include a "Technology & Tools" section: Google Workspace for Education, Canvas, Schoology, Clever, Seesaw, Kahoot, Nearpod, IXL, Smart Boards, Chromebook management.</li>
  <li>Reference technology integration in experience bullets: "Implemented a 1:1 Chromebook program with a flipped classroom model, increasing homework completion by 25%."</li>
  <li>If you've led professional development on ed-tech, call it out: "Facilitated 6 PD sessions on Google Classroom best practices for 40+ faculty."</li>
</ul>
<p>Keep the resume to 1-2 pages. Early-career teachers should aim for one page. Experienced teachers with extensive curriculum development, leadership, and professional development may use two.</p>
<p>Export as PDF for digital submissions, but keep a DOCX version ready — many school district application portals require Word format.</p>`,
      tip: 'Many school districts use specific ATS platforms like Frontline (AppliTrack) or TalentEd. Test your resume format with these systems if possible, as they parse differently than corporate ATS.',
    },
  ],
  checklist: [
    'Certifications and endorsements listed with state, type, and expiration dates',
    'Student outcomes quantified with test scores, growth metrics, or achievement data',
    'Curriculum development highlighted with standards alignment and pedagogical approach',
    'Technology integration demonstrated with specific tools and measurable outcomes',
    'School community contributions included: coaching, clubs, committees, parent engagement',
    'Mentorship of student teachers or new colleagues mentioned if applicable',
    'Professional development led or attended is noted',
    'Resume tailored to grade level and subject area of the target position',
    'Format is ATS-friendly for school district application systems (Frontline, TalentEd)',
    'Both PDF and DOCX versions prepared',
  ],
  commonMistakes: [
    'Writing "taught 10th grade English" without describing what made your teaching effective — outcomes, innovations, and differentiation strategies are what matter.',
    'Omitting certification details or using inconsistent terminology that confuses ATS systems looking for exact matches.',
    'Failing to quantify student outcomes — even approximate improvements ("students showed ~20% growth") are better than no data.',
    'Leaving out extracurricular involvement — this is often a deciding factor in hiring, especially at smaller schools where everyone wears multiple hats.',
    'Using overly casual or creative formatting that doesn\'t parse well through district ATS platforms.',
    'Not tailoring for the specific teaching position — a special education resume requires fundamentally different emphasis than a secondary math resume.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'docxExport',
    'coverLetterBuilder',
  ],
  relatedSlugs: [
    'registered-nurse-resume',
    'project-manager-resume',
    'ux-designer-resume',
  ],
  updatedAt: '2025-01-15',
}

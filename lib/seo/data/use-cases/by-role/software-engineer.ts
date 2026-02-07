import type { UseCase } from '../../types'

export const softwareEngineerResume: UseCase = {
  slug: 'software-engineer-resume',
  category: 'resume-by-role',
  title: 'Software Engineer Resume Guide',
  metaTitle: 'Software Engineer Resume: Expert Guide [2025]',
  metaDescription:
    'Build a standout software engineer resume that passes ATS screening and impresses hiring managers. Covers technical skills, project highlights, and formatting best practices.',
  subtitle:
    'Land your next engineering role with a resume that highlights your technical depth, system design experience, and measurable impact.',
  readTimeMinutes: 10,
  keyTakeaways: [
    'Lead every bullet point with quantifiable impact — latency reduced, uptime improved, users served.',
    'Tailor your skills section to the exact tech stack listed in the job description.',
    'Include a concise "Projects" section for open-source contributions or side projects that demonstrate initiative.',
    'Use reverse-chronological format and keep your resume to one page unless you have 10+ years of experience.',
  ],
  sections: [
    {
      title: 'Structuring Your Technical Experience',
      body: `<p>Hiring managers at tech companies spend an average of 7 seconds on an initial resume scan. Your experience section needs to immediately communicate <strong>what you built, which tools you used, and what impact it had</strong>.</p>
<p>Use the <em>Action–Technology–Result</em> formula for each bullet:</p>
<ul>
  <li><strong>Action:</strong> Start with a strong verb — "Architected," "Optimized," "Migrated," "Instrumented."</li>
  <li><strong>Technology:</strong> Name the specific frameworks, languages, or infrastructure — "using Go, gRPC, and Kubernetes."</li>
  <li><strong>Result:</strong> Quantify the business or engineering impact — "reducing p99 latency by 40%."</li>
</ul>
<p>Group bullets under each role by theme (performance, reliability, feature delivery) rather than listing them chronologically. This makes it easier for reviewers to map your strengths to their team's needs.</p>`,
      tip: 'If you lack production metrics, reference pull-request throughput, test coverage improvements, or deployment frequency instead.',
    },
    {
      title: 'Optimizing Your Skills Section for ATS',
      body: `<p>Applicant Tracking Systems parse your resume for keyword matches before a human ever reads it. A poorly formatted skills section can cause your application to be silently rejected.</p>
<ul>
  <li>Mirror the exact terminology from the job posting — if they say "TypeScript," don't just list "JavaScript."</li>
  <li>Organize skills into clear sub-groups: <strong>Languages</strong>, <strong>Frameworks & Libraries</strong>, <strong>Infrastructure & DevOps</strong>, <strong>Databases</strong>.</li>
  <li>Avoid rating yourself with bars or percentages — they confuse ATS parsers and add no credible signal.</li>
  <li>Include relevant certifications (AWS Solutions Architect, Kubernetes CKA) inline with skills rather than in a separate section.</li>
</ul>
<p>Keep the section near the top of your resume, immediately after a brief professional summary. Most ATS tools weight content that appears in the first third of the document more heavily.</p>`,
      tip: 'Run your resume through an ATS simulator before submitting. Extend\'s ATS optimization feature flags missing keywords automatically.',
    },
    {
      title: 'Showcasing Projects and Open-Source Work',
      body: `<p>A dedicated "Projects" section is one of the strongest differentiators on a software engineer resume, especially for early-career candidates or those transitioning into a new domain.</p>
<p>For each project, include:</p>
<ul>
  <li><strong>Project name and one-line description</strong> — e.g., "Real-time analytics dashboard for e-commerce metrics."</li>
  <li><strong>Your specific contribution</strong> — "Designed the WebSocket event pipeline and wrote the React charting layer."</li>
  <li><strong>Scale or usage indicator</strong> — "Serving 2,000 daily active users" or "500+ GitHub stars."</li>
  <li><strong>Link</strong> — GitHub repo, live demo, or portfolio page.</li>
</ul>
<p>Open-source contributions are particularly valuable because they provide verifiable proof of your coding ability, collaboration style, and communication skills through commit history and code reviews.</p>`,
    },
    {
      title: 'Writing a Compelling Professional Summary',
      body: `<p>A professional summary sits at the top of your resume and gives the reader context before they dive into details. For software engineers, this should be 2-3 sentences covering <strong>years of experience, core domain, and signature achievement</strong>.</p>
<p>Example: <em>"Backend engineer with 6 years of experience building high-throughput distributed systems at fintech companies. Led the migration of a monolithic payments service to event-driven microservices, reducing settlement time from 24 hours to under 90 seconds."</em></p>
<ul>
  <li>Avoid vague descriptors like "passionate" or "team player" — they waste space and carry no signal.</li>
  <li>Name the business domain you operate in (fintech, healthtech, e-commerce) to help recruiters pattern-match.</li>
  <li>Mention the seniority level you're targeting if it differs from your current title.</li>
</ul>
<p>Skip the summary entirely if you're a new graduate — use that space for education and projects instead.</p>`,
      tip: 'Customize the summary for each application. Swapping two or three keywords to match the job description can significantly improve ATS ranking.',
    },
    {
      title: 'Formatting and Layout Best Practices',
      body: `<p>Technical recruiters and engineering managers often review resumes on small screens or printed on paper. Clean formatting isn't just aesthetic — it directly affects readability and ATS compatibility.</p>
<ul>
  <li>Use a single-column layout. Multi-column designs often break ATS parsing.</li>
  <li>Stick to standard fonts: Calibri, Helvetica, or Georgia at 10-11pt for body text.</li>
  <li>Use consistent heading hierarchy: role title in bold, company name in regular weight, dates right-aligned.</li>
  <li>Keep margins between 0.5" and 0.75" — tighter margins give you more space without feeling cramped.</li>
</ul>
<p>Export as PDF unless the application specifically requests DOCX. PDF preserves layout across all devices and operating systems. Name the file <code>FirstName_LastName_SWE_Resume.pdf</code> for easy identification in applicant pools.</p>`,
    },
  ],
  checklist: [
    'Professional summary tailored to target role and company domain',
    'Skills section organized by category and aligned with job description keywords',
    'Every experience bullet follows Action–Technology–Result format',
    'Quantified impact in at least 60% of bullet points',
    'Projects section with links to repos or live demos',
    'Education section includes relevant coursework or honors (if < 5 years experience)',
    'PDF format, single-column layout, ATS-friendly fonts',
    'File named with your name and target role',
    'No spelling or grammatical errors — proofread by a second person',
    'Resume is one page (or two pages maximum for 10+ years experience)',
  ],
  commonMistakes: [
    'Listing every technology you\'ve ever touched instead of curating for the target role — a sprawling skills section dilutes your strongest qualifications.',
    'Writing duty-based bullets ("Responsible for backend development") instead of achievement-based bullets ("Reduced API response time by 35% through query optimization").',
    'Using a creative multi-column layout that breaks ATS parsing and results in automatic rejection.',
    'Omitting links to GitHub, portfolio, or LinkedIn — hiring managers expect to verify your work.',
    'Including an objective statement instead of a professional summary — objectives focus on what you want, not what you offer.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'data-scientist-resume',
    'product-manager-resume',
    'ux-designer-resume',
  ],
  updatedAt: '2025-01-15',
}

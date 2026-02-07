import type { UseCase } from '../../types'

export const projectManagerResume: UseCase = {
  slug: 'project-manager-resume',
  category: 'resume-by-role',
  title: 'Project Manager Resume Guide',
  metaTitle: 'Project Manager Resume: Expert Guide [2025]',
  metaDescription:
    'Create a project manager resume that highlights delivery track record, stakeholder management, and process improvement. Includes PMP-specific tips and ATS best practices.',
  subtitle:
    'Demonstrate that you deliver projects on time, on budget, and with measurable business outcomes that stakeholders care about.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Quantify every project with scope, timeline, budget, and outcome — these are the four pillars of PM credibility.',
    'Highlight your methodology expertise (Agile, Waterfall, hybrid) and certifications (PMP, PRINCE2, CSM) prominently.',
    'Show stakeholder management skills by naming the seniority levels you have reported to and influenced.',
    'Include process improvement examples that demonstrate you don\'t just manage projects — you make the organization better at delivering them.',
  ],
  sections: [
    {
      title: 'Quantifying Delivery Track Record',
      body: `<p>Project managers are judged on delivery. Your resume must make your track record <strong>immediately visible and credible</strong> through specific numbers.</p>
<p>For every major project or program, include these four dimensions:</p>
<ul>
  <li><strong>Scope:</strong> "Managed a platform migration involving 12 microservices, 40+ API endpoints, and 3 third-party integrations."</li>
  <li><strong>Timeline:</strong> "Delivered 2 weeks ahead of the 6-month deadline despite a mid-project scope change."</li>
  <li><strong>Budget:</strong> "Managed a $2.4M project budget, finishing 8% under budget through vendor renegotiation."</li>
  <li><strong>Outcome:</strong> "Reduced order processing time by 60%, enabling the operations team to handle 3x volume without additional headcount."</li>
</ul>
<p>If you've managed multiple concurrent projects, state the portfolio size: "Oversaw a portfolio of 8 simultaneous projects with a combined budget of $5.6M and 45 cross-functional team members."</p>`,
      tip: 'Create a "delivery scorecard" for yourself: list every project with its on-time, on-budget, and satisfaction metrics. Pull from this scorecard when writing bullets.',
    },
    {
      title: 'Showcasing Methodology and Certifications',
      body: `<p>Project management certifications carry real weight in hiring decisions — many job descriptions list them as hard requirements. Position yours for maximum visibility.</p>
<ul>
  <li>Place certifications directly after your name in the header: "Jane Doe, PMP, CSM" — this ensures ATS picks them up and recruiters see them instantly.</li>
  <li>In your skills section, list methodologies you've practiced in production: Agile (Scrum, Kanban), Waterfall, SAFe, PRINCE2, Lean Six Sigma.</li>
  <li>Reference methodology usage in your experience bullets: "Implemented Kanban with WIP limits across 3 engineering teams, reducing cycle time by 35%."</li>
</ul>
<p>If you're pursuing a certification but haven't completed it, you can list it as "PMP (in progress, expected March 2025)" — but only if you've actually started the process. Don't claim credentials you haven't earned.</p>
<p>Beyond formal certifications, mention specific tools: Jira, Asana, Monday.com, Microsoft Project, Smartsheet, Confluence. Tool fluency signals you can hit the ground running.</p>`,
    },
    {
      title: 'Demonstrating Stakeholder Management',
      body: `<p>Technical delivery is only half the job. The other half is <strong>managing expectations, resolving conflicts, and keeping stakeholders aligned</strong>. Your resume should show this soft-skill dimension with concrete examples.</p>
<ul>
  <li>Name the stakeholder levels: "Presented bi-weekly status reports to the VP of Engineering and CFO, managing expectations through three scope changes."</li>
  <li>Describe conflict resolution: "Mediated a resource contention issue between the mobile team and backend team, brokering a shared sprint commitment that unblocked both workstreams."</li>
  <li>Highlight communication artifacts: "Created a risk register and RAID log that became the standard template adopted across all PMO projects."</li>
  <li>Show vendor management: "Negotiated contract terms with 4 external vendors, reducing total vendor spend by 15% while maintaining SLA compliance."</li>
</ul>
<p>Cross-functional coordination is a PM superpower. Quantify the breadth: "Coordinated delivery across 6 departments, 3 time zones, and 2 external partners."</p>`,
      tip: 'Use the word "aligned" liberally — it signals you bring people together. "Aligned engineering, legal, and compliance on a data migration plan that met GDPR requirements."',
    },
    {
      title: 'Highlighting Process Improvement',
      body: `<p>The best project managers don't just deliver individual projects — they <strong>improve the organization's ability to deliver all projects</strong>. This is what separates a PM from a coordinator.</p>
<ul>
  <li>"Introduced a project intake process that reduced project initiation time from 3 weeks to 5 days and improved stakeholder satisfaction scores by 40%."</li>
  <li>"Standardized sprint ceremonies and retrospective formats across 5 Agile teams, leading to a 25% increase in sprint commitment accuracy."</li>
  <li>"Built a PMO dashboard tracking 12 health metrics across all active projects, enabling early intervention on at-risk initiatives."</li>
  <li>"Developed a post-mortem template and review process that captured 30+ actionable improvements, 70% of which were implemented within the next quarter."</li>
</ul>
<p>Process improvement bullets are especially powerful for senior PM roles and PMO positions. They demonstrate systems thinking and a commitment to continuous improvement that goes beyond individual project execution.</p>`,
    },
  ],
  checklist: [
    'Certifications (PMP, CSM, PRINCE2) listed after your name in the header',
    'Every project bullet includes scope, timeline, budget, and outcome dimensions',
    'Methodology expertise specified with concrete implementation examples',
    'Stakeholder management demonstrated with named seniority levels',
    'Process improvement contributions included to show organizational impact',
    'Project management tools listed: Jira, Asana, MS Project, Smartsheet, etc.',
    'Portfolio size quantified for concurrent project management experience',
    'Resume is ATS-compliant with standard formatting and certification keywords',
    'Vendor management and contract negotiation experience included if applicable',
  ],
  commonMistakes: [
    'Describing project activities ("facilitated meetings, updated status reports") instead of project outcomes ("delivered $2.4M platform migration 2 weeks ahead of schedule").',
    'Omitting budget figures — project managers who can manage seven-figure budgets need to say so explicitly.',
    'Burying certifications in an "Education" section at the bottom instead of featuring them in the header.',
    'Failing to differentiate between project management and project coordination — if you owned the project end-to-end, make that clear.',
    'Using generic agile buzzwords ("embraced agile values") without showing specific methodology implementations and their measurable impact.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'coverLetterBuilder',
  ],
  relatedSlugs: [
    'product-manager-resume',
    'software-engineer-resume',
    'marketing-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

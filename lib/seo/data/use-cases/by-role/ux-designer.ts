import type { UseCase } from '../../types'

export const uxDesignerResume: UseCase = {
  slug: 'ux-designer-resume',
  category: 'resume-by-role',
  title: 'UX Designer Resume Guide',
  metaTitle: 'UX Designer Resume: Expert Guide [2025]',
  metaDescription:
    'Create a UX designer resume that balances visual storytelling with ATS compliance. Learn how to present research, design process, and measurable user outcomes.',
  subtitle:
    'Bridge the gap between your portfolio and your resume by showcasing research rigor, design process, and user-centered impact.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Your resume is not your portfolio — it should complement your case studies, not replace them.',
    'Quantify design impact with usability metrics: task completion rate, time-on-task, SUS scores, NPS lifts.',
    'Describe your process (research, synthesis, ideation, testing) to show you practice real UX, not just UI decoration.',
    'Include a prominent link to your portfolio — make it the first thing a recruiter sees after your name.',
  ],
  sections: [
    {
      title: 'Balancing Visual Appeal with ATS Compliance',
      body: `<p>UX designers face a unique tension: you want your resume to reflect your design sensibility, but overly creative layouts break ATS parsing and get filtered out before a human ever sees them.</p>
<ul>
  <li>Use a clean, single-column layout with generous white space. Let typography and alignment do the visual work — not graphics, icons, or multi-column grids.</li>
  <li>Avoid embedding text inside images or using custom fonts that ATS cannot read. Stick to system fonts like Inter, Helvetica, or Georgia.</li>
  <li>Demonstrate your design taste through restraint: consistent spacing, a clear hierarchy of headings, and intentional use of bold and italic for emphasis.</li>
</ul>
<p>Think of your resume as a design artifact itself. A well-structured, readable document <em>is</em> a demonstration of UX skill. Recruiters will notice the craft even in a simple layout.</p>
<p>Export as PDF for visual fidelity, but keep a plain-text version for ATS-heavy application portals.</p>`,
      tip: 'Test your resume by copying and pasting it into a plain text editor. If the content is garbled or out of order, ATS will struggle too.',
    },
    {
      title: 'Showcasing Your Design Process',
      body: `<p>Hiring managers want to see that you follow a <strong>rigorous, user-centered process</strong>, not just produce pretty screens. Your resume should hint at the depth your portfolio explores in full.</p>
<ul>
  <li><strong>Research:</strong> "Conducted 25 contextual inquiries and 3 diary studies to map the patient onboarding journey."</li>
  <li><strong>Synthesis:</strong> "Affinity-mapped 200+ data points into 5 behavioral archetypes that informed persona development."</li>
  <li><strong>Ideation:</strong> "Facilitated 4 design sprints with engineering and product to explore checkout flow alternatives."</li>
  <li><strong>Testing:</strong> "Ran moderated usability tests with 12 participants, iterating on 3 prototype rounds before final handoff."</li>
</ul>
<p>Not every bullet needs all four phases, but across your resume, the reader should see evidence of each. This differentiates you from visual-only designers and UI developers.</p>`,
    },
    {
      title: 'Quantifying UX Impact',
      body: `<p>Design impact can be harder to quantify than engineering or sales outcomes, but it is absolutely possible. Use the metrics your team already tracks:</p>
<ul>
  <li><strong>Usability metrics:</strong> Task completion rate improved from 62% to 89%. Average time-on-task reduced by 35 seconds.</li>
  <li><strong>Business metrics:</strong> Redesigned checkout flow increased conversion by 18%, adding $1.4M in quarterly revenue.</li>
  <li><strong>Satisfaction metrics:</strong> System Usability Scale (SUS) score improved from 54 to 78. NPS increased by 12 points post-redesign.</li>
  <li><strong>Efficiency metrics:</strong> New design system reduced developer implementation time by 40% across 6 product teams.</li>
</ul>
<p>If you don't have direct access to business metrics, partner with your PM or data analyst to get them. Even approximate figures like "reduced support tickets related to onboarding by ~30%" are valuable.</p>`,
      tip: 'Create a personal metrics log. After every project, write down 2-3 measurable outcomes while they\'re fresh. You\'ll thank yourself at resume-writing time.',
    },
    {
      title: 'Highlighting Tools and Design Systems Work',
      body: `<p>Your tools section should reflect the modern UX toolkit and signal that you work efficiently within design-to-development workflows.</p>
<ul>
  <li><strong>Design:</strong> Figma, Sketch, Adobe XD, Framer, Principle.</li>
  <li><strong>Research:</strong> Dovetail, Maze, UserTesting, Optimal Workshop, Hotjar.</li>
  <li><strong>Prototyping:</strong> Figma prototyping, ProtoPie, InVision, Axure.</li>
  <li><strong>Collaboration:</strong> FigJam, Miro, Notion, Jira, Confluence.</li>
</ul>
<p>If you've contributed to or built a design system, give it prominent placement. Design systems work demonstrates that you think about scalability, consistency, and developer handoff — all qualities senior UX roles demand.</p>
<p>Example: "Created and maintained a Figma component library with 120+ components, adopted by 4 product teams, reducing design-to-dev handoff time by 50%."</p>`,
    },
    {
      title: 'Portfolio Integration and Presentation',
      body: `<p>Your resume and portfolio must work as a cohesive pair. The resume drives interest; the portfolio provides depth.</p>
<ul>
  <li>Place your portfolio URL directly under your name and contact info — make it impossible to miss.</li>
  <li>In each experience bullet, reference the relevant case study: "See full case study at portfolio.com/checkout-redesign."</li>
  <li>If you have a particularly strong project, add a brief "Featured Work" section with a 2-3 line summary and link.</li>
</ul>
<p>Ensure your portfolio loads quickly and is mobile-friendly. Recruiters often open links on their phones between meetings. A slow-loading or broken portfolio undermines your credibility as a UX professional.</p>
<p>If your portfolio is password-protected for confidentiality, include the password in your resume or cover letter to reduce friction.</p>`,
      tip: 'Use a custom short link (e.g., yourname.design) for your portfolio URL. It looks cleaner on the resume and is easier to remember.',
    },
  ],
  checklist: [
    'Portfolio URL is prominently placed below your name and contact info',
    'Resume uses a clean single-column layout that passes ATS parsing',
    'Design process is visible across bullets: research, synthesis, ideation, testing',
    'At least 50% of bullets include quantified usability or business metrics',
    'Tools section covers design, research, prototyping, and collaboration categories',
    'Design systems contributions are highlighted with scale and adoption metrics',
    'Featured work section links to 2-3 strongest portfolio case studies',
    'Resume complements portfolio — hints at depth without duplicating it',
  ],
  commonMistakes: [
    'Using an overly creative resume layout that breaks ATS parsing — ironic for a UX designer, whose job is to design for the system\'s constraints.',
    'Listing only tools and software without describing the process and outcomes of using them.',
    'Omitting a portfolio link or burying it at the bottom of the page where it\'s easy to miss.',
    'Writing bullets that describe visual output ("Designed 50+ screens") without mentioning research inputs or user outcomes.',
    'Failing to quantify impact — if you can\'t point to a metric, you haven\'t completed the design feedback loop.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'product-manager-resume',
    'software-engineer-resume',
    'marketing-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

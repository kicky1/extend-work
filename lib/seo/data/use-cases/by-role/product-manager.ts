import type { UseCase } from '../../types'

export const productManagerResume: UseCase = {
  slug: 'product-manager-resume',
  category: 'resume-by-role',
  title: 'Product Manager Resume Guide',
  metaTitle: 'Product Manager Resume: Expert Guide [2025]',
  metaDescription:
    'Craft a product manager resume that demonstrates strategic thinking, cross-functional leadership, and measurable business outcomes. Includes templates, checklist, and common mistakes.',
  subtitle:
    'Show hiring teams you can own a product vision, rally cross-functional teams, and deliver business results backed by data.',
  readTimeMinutes: 10,
  keyTakeaways: [
    'Frame every accomplishment around business outcomes — revenue growth, user retention, market share — not feature launches.',
    'Demonstrate cross-functional leadership by naming the disciplines you partnered with (engineering, design, data science, marketing).',
    'Include a "Product Highlights" section that showcases 2-3 flagship products or features with concise impact summaries.',
    'Tailor your resume to the PM archetype the company needs: growth PM, platform PM, 0-to-1 PM, or technical PM.',
    'Keep jargon in check — your resume may be screened by HR recruiters before reaching the hiring manager.',
  ],
  sections: [
    {
      title: 'Leading with Business Impact',
      body: `<p>Product management hiring committees care about one thing above all else: <strong>can you move the needle on metrics that matter?</strong> Every bullet on your resume should answer that question.</p>
<p>Use the <em>Situation–Action–Outcome</em> framework:</p>
<ul>
  <li><strong>Situation:</strong> What problem or opportunity did you identify? "Checkout abandonment was 68% on mobile."</li>
  <li><strong>Action:</strong> What did you do? "Led a 6-person squad to redesign the mobile checkout flow, running 12 A/B tests over 3 sprints."</li>
  <li><strong>Outcome:</strong> What changed? "Reduced abandonment to 41%, adding $2.3M ARR."</li>
</ul>
<p>Avoid listing features you shipped without context. "Launched dark mode" tells the reader nothing. "Launched dark mode based on accessibility research, increasing evening session duration by 22%" tells a story.</p>`,
      tip: 'If you cannot share exact revenue numbers due to confidentiality, use percentages or multipliers — "grew activation rate 3x" is still compelling.',
    },
    {
      title: 'Demonstrating Strategic Thinking',
      body: `<p>Senior PM roles require evidence that you think beyond the sprint. Your resume should show you can <strong>set direction, prioritize ruthlessly, and make trade-offs</strong> that align with company strategy.</p>
<ul>
  <li>Reference the frameworks you used: RICE scoring, opportunity-solution trees, jobs-to-be-done, competitive positioning matrices.</li>
  <li>Mention how you gathered and synthesized customer insights — "Conducted 40+ user interviews to validate the self-serve onboarding hypothesis."</li>
  <li>Highlight decisions you <em>didn't</em> make — saying no is as important as saying yes. "Deprioritized 3 feature requests to focus on reducing churn among enterprise accounts."</li>
</ul>
<p>If you've contributed to product strategy documents, OKR setting, or roadmap presentations to executives, call that out explicitly. It signals you operate at the strategic layer, not just the execution layer.</p>`,
    },
    {
      title: 'Showcasing Cross-Functional Leadership',
      body: `<p>Product managers lead without formal authority. Your resume must make this visible by naming the teams you influenced and the outcomes you achieved together.</p>
<ul>
  <li>Specify team size and composition: "Led a cross-functional squad of 4 engineers, 1 designer, and 1 data analyst."</li>
  <li>Describe stakeholder alignment work: "Aligned VP Engineering and CMO on a phased rollout plan, securing $500K in incremental budget."</li>
  <li>Highlight conflict resolution: "Brokered a prioritization compromise between Sales and Engineering that unblocked Q3 delivery."</li>
</ul>
<p>Use verbs that convey influence rather than hierarchy: "Facilitated," "Aligned," "Championed," "Negotiated," "Mobilized." Avoid "Managed" for cross-functional work — it implies reporting authority you didn't have.</p>
<p>If you mentored junior PMs or ran rituals like sprint reviews and retrospectives, include that to show you invest in team health.</p>`,
      tip: 'Quantify collaboration where possible — "Coordinated a launch across 5 teams in 3 time zones" is more memorable than "Worked with cross-functional teams."',
    },
    {
      title: 'Structuring Your Skills and Tools Section',
      body: `<p>PM skills sections often feel generic ("leadership, communication, strategy"). Make yours specific and verifiable by grouping competencies into clear categories.</p>
<ul>
  <li><strong>Product Craft:</strong> Roadmapping, PRD writing, user story mapping, A/B experimentation, funnel analysis.</li>
  <li><strong>Technical Fluency:</strong> SQL, REST APIs, data modeling, Figma, basic Python scripting.</li>
  <li><strong>Tools:</strong> Jira, Linear, Amplitude, Mixpanel, Dovetail, Notion, Miro.</li>
  <li><strong>Methodologies:</strong> Agile/Scrum, Dual-Track Discovery, Lean Startup, Design Sprints.</li>
</ul>
<p>Technical fluency is increasingly important. If you can write SQL queries, read code, or prototype in Figma, say so — it differentiates you from PMs who rely entirely on others for data and design exploration.</p>`,
    },
    {
      title: 'Tailoring to PM Archetypes',
      body: `<p>Not all PM roles are the same. Companies hire for specific archetypes, and your resume should lean into the one that matches the job description.</p>
<ul>
  <li><strong>Growth PM:</strong> Emphasize experimentation velocity, funnel optimization, and metrics like activation rate, LTV, and payback period.</li>
  <li><strong>Platform PM:</strong> Highlight API adoption, developer experience improvements, and internal tooling that scaled engineering productivity.</li>
  <li><strong>0-to-1 PM:</strong> Focus on discovery research, MVP definition, market validation, and the journey from concept to product-market fit.</li>
  <li><strong>Technical PM:</strong> Showcase infrastructure decisions, system design trade-offs, and partnership with engineering on deeply technical challenges.</li>
</ul>
<p>Read the job description carefully for signals: "experimentation" points to growth, "developer ecosystem" points to platform, "ambiguous problem spaces" points to 0-to-1. Mirror that language in your resume.</p>`,
      tip: 'Keep a "master resume" with all your bullets, then create role-specific versions by selecting the most relevant 60% for each application.',
    },
  ],
  checklist: [
    'Professional summary names your PM archetype and signature achievement',
    'Every bullet includes a measurable business outcome',
    'Cross-functional leadership is demonstrated with specific team compositions',
    'Skills section is grouped into Product Craft, Technical Fluency, Tools, and Methodologies',
    'Product highlights or case studies section included for 2-3 key products',
    'Strategic contributions (roadmapping, OKRs, executive presentations) are called out',
    'Language mirrors the target job description\'s PM archetype',
    'Resume is ATS-friendly: single-column, standard fonts, PDF format',
  ],
  commonMistakes: [
    'Listing features shipped without business context — "Launched notification system" carries no signal without usage or revenue impact.',
    'Overusing "Managed" when you should be using influence verbs — PMs lead through alignment, not authority.',
    'Writing a generic skills section ("leadership, communication") that could belong to any profession.',
    'Failing to tailor for the specific PM archetype — a growth PM resume looks very different from a 0-to-1 PM resume.',
    'Burying quantified results at the end of long bullets instead of leading with the metric.',
    'Neglecting to mention technical fluency — in 2025, PMs who can write SQL and read code have a significant edge.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'coverLetterBuilder',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'project-manager-resume',
    'ux-designer-resume',
    'software-engineer-resume',
    'marketing-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

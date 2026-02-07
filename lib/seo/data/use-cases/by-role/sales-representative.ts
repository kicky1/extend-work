import type { UseCase } from '../../types'

export const salesRepresentativeResume: UseCase = {
  slug: 'sales-representative-resume',
  category: 'resume-by-role',
  title: 'Sales Representative Resume Guide',
  metaTitle: 'Sales Representative Resume: Expert Guide [2025]',
  metaDescription:
    'Write a sales resume that proves you can close. Covers quota attainment, deal metrics, CRM proficiency, and formatting strategies that get past ATS gatekeepers.',
  subtitle:
    'Your resume is your first pitch. Make it close the deal on getting you an interview by proving quota attainment and deal-closing ability with hard numbers.',
  readTimeMinutes: 8,
  keyTakeaways: [
    'Quota attainment is the single most important metric on a sales resume — lead with it in every role.',
    'Include deal-level details: average deal size, sales cycle length, win rate, and pipeline generated.',
    'Show progression from SDR to AE to senior roles — sales hiring managers value trajectory.',
    'Name the CRM and sales tools you use — Salesforce, Outreach, Gong, LinkedIn Sales Navigator — they are table-stakes keywords.',
    'Tailor for the sales motion: transactional vs. enterprise, inbound vs. outbound, new business vs. expansion.',
  ],
  sections: [
    {
      title: 'Leading with Quota Attainment and Revenue',
      body: `<p>In sales, the numbers do the talking. Your resume should make your <strong>quota attainment and revenue contribution impossible to miss</strong>.</p>
<ul>
  <li><strong>Quota attainment:</strong> "Achieved 127% of $1.8M annual quota, ranking #2 out of 35 representatives in the Mid-Market segment."</li>
  <li><strong>Revenue closed:</strong> "Closed $2.3M in new business ARR across 42 deals in FY2024."</li>
  <li><strong>Pipeline generated:</strong> "Self-sourced $4.5M in qualified pipeline through outbound prospecting, LinkedIn engagement, and event networking."</li>
  <li><strong>Deal metrics:</strong> "Maintained a 34% win rate on opportunities with an average deal size of $54K and a 45-day sales cycle."</li>
</ul>
<p>Create a "Performance Highlights" section at the top of your resume with 3-4 of your best metrics. Sales hiring managers scan for numbers first — give them what they want immediately.</p>`,
      tip: 'If you exceeded quota in multiple consecutive periods, call out the streak: "Exceeded quarterly quota for 8 consecutive quarters (Q1 2023 – Q4 2024)." Consistency is as impressive as a single blowout quarter.',
    },
    {
      title: 'Describing Your Sales Motion and ICP',
      body: `<p>Not all sales roles are the same. Your resume needs to make your <strong>specific sales motion and ideal customer profile (ICP)</strong> immediately clear so hiring managers can assess fit.</p>
<ul>
  <li><strong>Market segment:</strong> "Sold to mid-market SaaS companies with 200-2,000 employees" or "Focused on enterprise accounts with $500M+ revenue."</li>
  <li><strong>Buyer personas:</strong> "Primary buyers: VP Engineering and CTO. Economic buyers: CFO and VP Operations."</li>
  <li><strong>Sales motion:</strong> "Full-cycle outbound sales with 90-day average cycle. Managed demos, procurement negotiations, and security reviews."</li>
  <li><strong>Deal complexity:</strong> "Navigated multi-threaded deals involving 4-7 stakeholders across technical, business, and legal teams."</li>
</ul>
<p>This context helps hiring managers envision you in their specific selling environment. A rep who has sold six-figure enterprise deals to C-suite buyers is a very different candidate than one who closes high-volume transactional deals.</p>`,
    },
    {
      title: 'Showcasing Sales Methodology and Process',
      body: `<p>Modern sales organizations run on structured methodologies. Demonstrating fluency shows you can <strong>integrate into an existing team's playbook</strong> or bring proven frameworks to a less mature org.</p>
<ul>
  <li>Name the methodologies you've used: MEDDIC, MEDDPICC, Challenger Sale, SPIN Selling, Sandler, Command of the Message.</li>
  <li>Show methodology in action: "Applied MEDDPICC qualification to reduce pipeline bloat by 30%, increasing forecast accuracy from 65% to 88%."</li>
  <li>Reference discovery and demo skills: "Conducted 200+ discovery calls annually, achieving a 45% demo-to-proposal conversion rate."</li>
  <li>Highlight coaching and enablement: "Mentored 3 SDRs through the BDR-to-AE promotion path, all achieving quota within their first quarter."</li>
</ul>
<p>If you've built or improved sales processes — territory plans, outbound sequences, competitive battle cards — include these. They show you think beyond your own number.</p>`,
      tip: 'If the job description mentions a specific methodology (e.g., "MEDDPICC experience required"), mirror that exact term in your resume. ATS will flag it as a match.',
    },
    {
      title: 'Listing Sales Tools and CRM Proficiency',
      body: `<p>Sales technology proficiency is non-negotiable. Hiring managers expect you to be productive on Day 1 with their tech stack.</p>
<ul>
  <li><strong>CRM:</strong> Salesforce (most common), HubSpot CRM, Pipedrive, Close.</li>
  <li><strong>Sales Engagement:</strong> Outreach, SalesLoft, Apollo, Lemlist.</li>
  <li><strong>Intelligence:</strong> Gong, Chorus, Clari, 6sense, ZoomInfo, LinkedIn Sales Navigator.</li>
  <li><strong>Proposal & Contract:</strong> PandaDoc, DocuSign, DealHub, Proposify.</li>
</ul>
<p>Don't just list these in a skills section — embed them in your experience bullets: "Leveraged Gong call analytics to identify winning talk patterns, then codified them into a coaching playbook that improved team win rate by 8%."</p>
<p>Salesforce proficiency deserves special attention. If you can build custom reports, manage pipeline views, and maintain forecast hygiene, say so. Many companies consider Salesforce fluency a hard requirement.</p>`,
    },
    {
      title: 'Showing Career Progression',
      body: `<p>Sales career trajectories are highly valued. If you've been promoted from SDR to AE, or from AE to Senior AE or Sales Manager, <strong>make the progression visually obvious</strong>.</p>
<ul>
  <li>List promotions under the same company header with separate date ranges to show upward momentum.</li>
  <li>Include promotion context: "Promoted to Senior AE after 4 consecutive quarters of 120%+ attainment and mentorship of 3 junior reps."</li>
  <li>If you've taken on leadership responsibilities without a title change, call them out: "Selected to lead a 4-person tiger team targeting a new vertical, generating $800K in pipeline within 60 days."</li>
</ul>
<p>For experienced reps looking at management roles, show player-coach capabilities: your own quota performance alongside team enablement, onboarding, and mentorship contributions.</p>
<p>Include President's Club, Chairman's Circle, or similar awards. These are universally understood signals of top performance in sales organizations.</p>`,
      tip: 'If you\'ve won sales awards, create a single-line "Awards" section: "President\'s Club 2023, 2024 | Rookie of the Year 2022 | Q3 2024 Top Performer." Awards are social proof that requires no further explanation.',
    },
  ],
  checklist: [
    'Performance Highlights section with quota attainment, revenue, and ranking',
    'Sales motion clearly described: segment, ICP, buyer personas, cycle length',
    'Methodology expertise named and demonstrated in context',
    'CRM and sales tool proficiency listed and woven into experience bullets',
    'Career progression from SDR to AE (or equivalent) is visually clear',
    'Awards and recognition (President\'s Club, top performer) prominently featured',
    'Pipeline generation and self-sourcing activity quantified',
    'Mentorship and team contributions included for senior-level roles',
  ],
  commonMistakes: [
    'Omitting quota attainment — the single most important data point on a sales resume. Always include your number vs. your target.',
    'Being vague about deal size and complexity — "$54K ACV, 45-day cycle, 4-7 stakeholders" is infinitely more useful than "closed enterprise deals."',
    'Failing to specify the sales motion — inbound vs. outbound, transactional vs. consultative, new business vs. expansion all require different skills.',
    'Listing only revenue closed without showing pipeline generation — this matters especially for outbound-heavy roles.',
    'Not including CRM proficiency, particularly Salesforce — this is a hard filter for many recruiters.',
    'Burying awards and rankings at the bottom of the resume instead of featuring them in a prominent position.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'coverLetterBuilder',
    'pdfExport',
    'aiJobMatching',
  ],
  relatedSlugs: [
    'marketing-manager-resume',
    'financial-analyst-resume',
    'project-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

import type { UseCase } from '../../types'

export const marketingManagerResume: UseCase = {
  slug: 'marketing-manager-resume',
  category: 'resume-by-role',
  title: 'Marketing Manager Resume Guide',
  metaTitle: 'Marketing Manager Resume: Expert Guide [2025]',
  metaDescription:
    'Write a marketing manager resume that demonstrates campaign ROI, brand strategy, and data-driven decision-making. Includes ATS tips, checklists, and formatting advice.',
  subtitle:
    'Prove you can drive pipeline, build brands, and measure everything — all on a single page that sells you as effectively as your best campaign.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with campaign ROI and revenue attribution, not vanity metrics like impressions or followers.',
    'Demonstrate proficiency across the marketing stack: paid media, content, SEO, email, analytics, and marketing automation.',
    'Show that you are data-driven by including specific KPIs, A/B test results, and attribution models you have used.',
    'Differentiate between brand marketing, demand generation, and growth marketing — tailor your resume to the sub-function.',
    'Include a link to your portfolio, published content, or case studies whenever possible.',
  ],
  sections: [
    {
      title: 'Leading with Revenue and ROI',
      body: `<p>Marketing has evolved from a cost center to a revenue engine, and your resume needs to reflect that. Every bullet should tie your work to <strong>pipeline, revenue, or efficiency gains</strong>.</p>
<ul>
  <li><strong>Demand gen:</strong> "Launched a multi-channel ABM campaign targeting 200 enterprise accounts, generating $4.2M in qualified pipeline within 90 days."</li>
  <li><strong>Content marketing:</strong> "Built an organic content engine that grew blog traffic from 15K to 120K monthly visitors, contributing 35% of inbound MQLs."</li>
  <li><strong>Paid media:</strong> "Managed $1.2M annual ad budget across Google, LinkedIn, and Meta, achieving a 5.8x blended ROAS."</li>
  <li><strong>Email:</strong> "Redesigned the lifecycle email program, increasing trial-to-paid conversion by 22% and reducing CAC by $18 per customer."</li>
</ul>
<p>If you operate in brand marketing where revenue attribution is less direct, use proxy metrics: unaided brand awareness lift, share of voice, or earned media value. The key is proving that you measure your impact, not just execute campaigns.</p>`,
      tip: 'When in doubt, use the formula: "[Action verb] [campaign/channel], resulting in [X% improvement] in [metric], translating to [$Y impact]."',
    },
    {
      title: 'Showcasing Your Marketing Stack Expertise',
      body: `<p>Modern marketing managers are expected to be fluent across multiple platforms and disciplines. Your skills section should reflect this breadth while signaling depth in your core area.</p>
<ul>
  <li><strong>Marketing Automation:</strong> HubSpot, Marketo, Pardot, Iterable, Customer.io.</li>
  <li><strong>Analytics:</strong> Google Analytics 4, Amplitude, Mixpanel, Looker, Tableau.</li>
  <li><strong>Paid Media:</strong> Google Ads, Meta Business Suite, LinkedIn Campaign Manager, programmatic (DV360, The Trade Desk).</li>
  <li><strong>SEO & Content:</strong> Ahrefs, SEMrush, Clearscope, Surfer SEO, WordPress.</li>
  <li><strong>CRM:</strong> Salesforce, HubSpot CRM, Pipedrive.</li>
</ul>
<p>Don't just list tools — weave them into your experience bullets. "Used Marketo and Salesforce to build a lead scoring model that improved sales acceptance rate by 30%" is far more compelling than a standalone tools list.</p>`,
    },
    {
      title: 'Demonstrating Data-Driven Decision-Making',
      body: `<p>The strongest marketing resumes in 2025 read like a data analyst's output wrapped in marketing context. Show that you <strong>test hypotheses, measure results, and iterate</strong>.</p>
<ul>
  <li>Reference specific A/B tests: "A/B tested 14 landing page variants, identifying a headline change that lifted conversion rate from 3.2% to 5.7%."</li>
  <li>Name your attribution model: "Implemented multi-touch attribution using a U-shaped model, revealing that webinar attendance was the highest-converting mid-funnel touchpoint."</li>
  <li>Describe reporting cadences: "Built weekly dashboards tracking CAC, LTV, payback period, and channel contribution, presented to the C-suite monthly."</li>
</ul>
<p>If you have experience with SQL, Python, or R for marketing analytics, include that in your skills section. Technical marketing managers are in high demand, and this differentiates you from purely creative marketers.</p>`,
      tip: 'Reference a specific instance where data changed your strategy — "Discovered through cohort analysis that 60-day re-engagement emails outperformed 30-day, shifting our entire nurture cadence."',
    },
    {
      title: 'Tailoring for Marketing Sub-Functions',
      body: `<p>Marketing manager is a broad title. Companies hire for specific sub-functions, and your resume should match their needs precisely.</p>
<ul>
  <li><strong>Demand Generation:</strong> Emphasize pipeline contribution, lead scoring, ABM campaigns, and sales-marketing alignment. Metrics: MQLs, SQLs, pipeline velocity, win rate influence.</li>
  <li><strong>Brand Marketing:</strong> Highlight brand campaigns, creative direction, PR/earned media, and brand health metrics. Include links to notable campaigns.</li>
  <li><strong>Growth Marketing:</strong> Focus on experimentation velocity, funnel optimization, referral programs, and product-led growth tactics. Metrics: activation rate, retention curves, viral coefficient.</li>
  <li><strong>Content Marketing:</strong> Showcase editorial strategy, organic traffic growth, content-attributed pipeline, and thought leadership positioning.</li>
</ul>
<p>Read the job description for signals. "Pipeline targets" means demand gen. "Brand awareness" means brand marketing. "Experiment-driven" means growth. Use the matching vocabulary throughout your resume.</p>`,
    },
  ],
  checklist: [
    'Professional summary specifies your marketing sub-function and headline metric',
    'Every campaign bullet includes ROI, revenue, or efficiency metrics',
    'Skills section covers marketing automation, analytics, paid media, SEO, and CRM tools',
    'Data-driven approach is visible through A/B tests, attribution models, and dashboards',
    'Budget management experience is quantified with dollar amounts',
    'Cross-functional collaboration with sales, product, or creative teams is mentioned',
    'Resume is tailored to the specific marketing sub-function in the job description',
    'Portfolio or campaign case study links are included where applicable',
  ],
  commonMistakes: [
    'Leading with vanity metrics (impressions, followers, page views) instead of business outcomes (pipeline, revenue, CAC reduction).',
    'Failing to specify budget sizes — "managed paid media" could mean $5K/month or $5M/year, and the distinction matters enormously.',
    'Writing generically about "marketing strategy" without naming specific channels, tools, or frameworks used.',
    'Omitting data and analytics skills that differentiate you from execution-only marketers.',
    'Not tailoring for the marketing sub-function — a demand gen resume should look very different from a brand marketing resume.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'coverLetterBuilder',
    'pdfExport',
    'analytics',
  ],
  relatedSlugs: [
    'product-manager-resume',
    'sales-representative-resume',
    'project-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

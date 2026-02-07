import type { UseCase } from '../../types'

export const customerSuccessManagerResume: UseCase = {
  slug: 'customer-success-manager-resume',
  category: 'resume-by-role',
  title: 'Customer Success Manager Resume Guide',
  metaTitle: 'Customer Success Manager Resume: Expert Guide [2025]',
  metaDescription:
    'Build a customer success manager resume that showcases retention metrics, expansion revenue, and client relationship skills. Expert tips on formatting, ATS optimization, and quantifying impact.',
  subtitle:
    'Prove you can retain, grow, and delight customers by leading with metrics that tie directly to revenue and satisfaction.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with retention and expansion metrics — net revenue retention, churn reduction, and upsell ARR are the numbers hiring managers scan for first.',
    'Showcase your ability to manage a book of business with specific portfolio size and customer segment details.',
    'Highlight CRM and CS platform proficiency (Salesforce, Gainsight, Vitally) as core technical competencies.',
    'Demonstrate cross-functional influence by referencing collaboration with Product, Sales, and Engineering teams to drive customer outcomes.',
  ],
  sections: [
    {
      title: 'Quantifying Your Customer Success Impact',
      body: `<p>Customer success is a revenue function, and your resume must reflect that. Every bullet in your experience section should tie back to a <strong>retention, expansion, or satisfaction metric</strong> that demonstrates your direct contribution to the bottom line.</p>
<p>Use the <em>Situation–Action–Metric</em> framework for maximum impact:</p>
<ul>
  <li><strong>Situation:</strong> Set the context — "Managed a $4.2M ARR portfolio of 45 mid-market SaaS accounts."</li>
  <li><strong>Action:</strong> Describe your intervention — "Implemented a proactive health-score monitoring system using Gainsight and redesigned the QBR framework."</li>
  <li><strong>Metric:</strong> Quantify the result — "Improved net revenue retention from 102% to 118% and reduced logo churn by 30% year-over-year."</li>
</ul>
<p>Prioritize metrics that hiring managers care about most: <strong>net revenue retention (NRR)</strong>, <strong>gross revenue retention (GRR)</strong>, <strong>expansion revenue</strong>, <strong>NPS/CSAT scores</strong>, and <strong>time-to-value</strong>. If you influenced product adoption, include activation rates or feature adoption percentages.</p>`,
      tip: 'If your company did not track NRR formally, calculate it from renewal and upsell data. Even a self-calculated figure backed by methodology shows analytical rigor.',
    },
    {
      title: 'Showcasing Client Relationship and Portfolio Management',
      body: `<p>Hiring managers need to quickly assess whether your experience matches their customer segment and deal size. Be explicit about the <strong>scope and complexity</strong> of the accounts you managed.</p>
<ul>
  <li><strong>Portfolio size:</strong> "Owned a book of 60 accounts representing $8M in ARR" or "Managed 5 enterprise accounts with average contract value of $500K."</li>
  <li><strong>Customer segment:</strong> Specify whether you worked with SMB, mid-market, or enterprise clients — each requires fundamentally different skill sets.</li>
  <li><strong>Stakeholder level:</strong> "Served as primary executive sponsor contact for C-suite stakeholders at Fortune 500 companies."</li>
  <li><strong>Renewal complexity:</strong> "Led multi-threaded renewal negotiations involving procurement, legal, and IT stakeholders with an average cycle of 90 days."</li>
</ul>
<p>If you managed strategic accounts, describe the depth of those relationships. Mention executive business reviews (EBRs), success plans, and joint roadmap sessions that demonstrate consultative engagement rather than reactive support.</p>`,
    },
    {
      title: 'Highlighting Tools, Processes, and CS Operations',
      body: `<p>Modern customer success is increasingly data-driven and operationalized. Your resume should demonstrate fluency with the <strong>CS tech stack</strong> and methodologies that power scalable customer management.</p>
<ul>
  <li><strong>CS Platforms:</strong> Gainsight, Vitally, Totango, ChurnZero — specify which modules you used (health scores, playbooks, journey orchestration).</li>
  <li><strong>CRM:</strong> Salesforce (including reports, dashboards, opportunity management), HubSpot, or Dynamics 365.</li>
  <li><strong>Analytics & BI:</strong> Looker, Tableau, Mixpanel, Amplitude — any tool you used to track product adoption or build customer health models.</li>
  <li><strong>Communication:</strong> Gong, Chorus (call intelligence), Loom (async video), Slack Connect.</li>
</ul>
<p>Beyond tools, highlight process contributions: "Designed the customer health scoring model that became the company-wide standard" or "Built the playbook library for onboarding, renewal risk, and expansion triggers covering 15 lifecycle scenarios."</p>`,
      tip: 'If you helped select or implement a CS platform, call it out — it demonstrates strategic thinking and operational leadership beyond day-to-day account management.',
    },
    {
      title: 'Writing a Customer Success Professional Summary',
      body: `<p>Your professional summary is your elevator pitch. In 2-3 sentences, establish your <strong>experience level, customer segment, and headline metric</strong>.</p>
<p>Example: <em>"Customer Success Manager with 6 years of experience driving retention and expansion in B2B SaaS. Managed a $12M ARR portfolio of enterprise accounts, achieving 120% net revenue retention and maintaining an NPS of 72. Recognized for building scalable onboarding programs that reduced time-to-value by 40%."</em></p>
<ul>
  <li>Specify the industry vertical (B2B SaaS, fintech, healthtech) to help recruiters pattern-match immediately.</li>
  <li>Include your strongest metric — NRR above 110% or churn below industry benchmarks are strong openers.</li>
  <li>Mention the customer segment (SMB, mid-market, enterprise) since this is often the first filter in CS hiring.</li>
  <li>Avoid cliches like "customer-obsessed" or "relationship builder" without evidence — they tell the reader nothing.</li>
</ul>
<p>Customize this for each application. An early-stage startup cares about scrappiness and process creation, while an enterprise company wants evidence of managing complex, high-value accounts.</p>`,
    },
    {
      title: 'Formatting and ATS Optimization for CS Resumes',
      body: `<p>Customer success manager resumes are reviewed by HR generalists, CS leaders, and sometimes CROs — each scanning for different signals. Clean formatting ensures all three audiences can extract what they need quickly.</p>
<ul>
  <li>Place your metrics-heavy professional summary at the top, above the fold. Reviewers should see your NRR and portfolio size within the first 5 seconds.</li>
  <li>Use a single-column layout to maximize ATS compatibility. Avoid sidebar designs that split your skills into a visually appealing but machine-unreadable panel.</li>
  <li>Create a dedicated "Key Metrics" or "Performance Highlights" section near the top with 3-4 of your strongest numbers — this draws the eye immediately.</li>
  <li>Include LinkedIn URL — CS hiring heavily relies on network and referral, and recruiters will check your profile.</li>
</ul>
<p>Export as PDF and name the file <code>FirstName_LastName_CSM_Resume.pdf</code>. Keep to one page for under 7 years of experience; two pages are acceptable for senior or director-level CS roles with cross-functional scope.</p>`,
    },
  ],
  checklist: [
    'Professional summary includes customer segment, portfolio size, and headline retention metric',
    'Experience bullets follow Situation–Action–Metric format with quantified outcomes',
    'Net revenue retention, churn rate, or expansion ARR explicitly stated',
    'Book of business details included: number of accounts, total ARR, average deal size',
    'CS platform and CRM proficiency listed (Gainsight, Salesforce, Vitally, etc.)',
    'Cross-functional collaboration with Sales, Product, and Engineering highlighted',
    'QBR, EBR, or success planning experience mentioned',
    'NPS, CSAT, or customer health score improvements quantified',
    'Single-column ATS-friendly layout, exported as PDF',
    'LinkedIn URL included in the resume header',
  ],
  commonMistakes: [
    'Writing vague bullets like "Managed customer relationships" without specifying portfolio size, revenue, or outcomes — this tells the reader nothing about your scope or impact.',
    'Positioning yourself as a reactive support role instead of a strategic revenue partner — CS resumes must emphasize retention and expansion, not ticket resolution.',
    'Omitting expansion and upsell contributions — even if Sales closes the deal, your influence on identifying and nurturing expansion opportunities should be documented.',
    'Failing to mention the customer segment (SMB vs. enterprise) — a CS manager handling 200 SMB accounts has fundamentally different skills than one managing 10 enterprise logos.',
    'Listing soft skills like "empathetic communicator" without backing them up with results — instead, write "Led executive de-escalation for 8 at-risk accounts, retaining 100% of ARR."',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'sales-representative-resume',
    'project-manager-resume',
    'marketing-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

import type { UseCase } from '../../types'

export const financialAnalystResume: UseCase = {
  slug: 'financial-analyst-resume',
  category: 'resume-by-role',
  title: 'Financial Analyst Resume Guide',
  metaTitle: 'Financial Analyst Resume: Expert Guide [2025]',
  metaDescription:
    'Build a financial analyst resume that highlights modeling expertise, strategic recommendations, and measurable impact on business decisions. ATS tips and formatting included.',
  subtitle:
    'Prove you can build models that drive decisions, present insights to leadership, and influence capital allocation through rigorous financial analysis.',
  readTimeMinutes: 10,
  keyTakeaways: [
    'Lead with the dollar value of decisions your analysis influenced — budgets managed, cost savings identified, revenue forecasts delivered.',
    'Specify your modeling expertise: DCF, LBO, three-statement models, scenario analysis, Monte Carlo simulations.',
    'Demonstrate tool proficiency beyond Excel — SQL, Python, Tableau, and ERP systems are increasingly expected.',
    'Tailor for the sub-function: FP&A, investment banking, equity research, corporate development, or risk management.',
  ],
  sections: [
    {
      title: 'Quantifying Your Analytical Impact',
      body: `<p>Financial analysts produce analysis. But the <strong>value</strong> of a financial analyst is the decisions their analysis enables. Every resume bullet should connect your work to a business outcome.</p>
<ul>
  <li><strong>FP&A:</strong> "Built the annual operating budget model for a $180M business unit, identifying $4.2M in cost optimization opportunities adopted by the CFO."</li>
  <li><strong>Investment banking:</strong> "Developed DCF and comparable company analyses for 6 M&A transactions totaling $850M in enterprise value."</li>
  <li><strong>Corporate development:</strong> "Created the financial model for a $45M acquisition that passed the board, identifying $8M in synergy value."</li>
  <li><strong>Risk management:</strong> "Built a VaR model for the fixed-income portfolio that improved risk-adjusted returns by 120 bps over 12 months."</li>
</ul>
<p>If your analysis didn't directly lead to a decision, describe its influence: "Revenue forecast model achieved 97% accuracy over 4 quarters, becoming the primary input for headcount planning."</p>`,
      tip: 'Always name the audience for your analysis. "Presented to the CFO" carries different weight than "shared with my manager." The seniority of your stakeholders signals the trust placed in your work.',
    },
    {
      title: 'Showcasing Financial Modeling Expertise',
      body: `<p>Financial modeling is the core technical skill of the profession. Your resume should make the <strong>type, complexity, and scale</strong> of your models immediately clear.</p>
<ul>
  <li>Name the model types: three-statement models, DCF valuations, LBO models, merger models, scenario and sensitivity analyses, Monte Carlo simulations.</li>
  <li>Describe scale and complexity: "Built a 50-tab integrated financial model covering 3 business segments, 12 revenue streams, and 5-year projections."</li>
  <li>Reference modeling standards: "Followed FAST modeling standards for consistent, auditable workbook architecture."</li>
  <li>Include automation: "Automated monthly reporting through VBA macros and Power Query, reducing manual data entry by 15 hours per cycle."</li>
</ul>
<p>If you've built models that are still in use or became team standards, mention it: "Model adopted as the template for all subsequent deal evaluations, used by 8 analysts." Longevity signals quality.</p>`,
    },
    {
      title: 'Expanding Beyond Excel',
      body: `<p>The modern financial analyst toolkit extends well beyond spreadsheets. Showing proficiency with data tools signals that you can handle scale, complexity, and speed.</p>
<ul>
  <li><strong>Data querying:</strong> SQL for pulling from ERP systems, data warehouses, and financial databases. "Wrote SQL queries against the SAP data warehouse to automate variance analysis, replacing a 3-day manual process."</li>
  <li><strong>Programming:</strong> Python (pandas, NumPy) for financial modeling, automation, and statistical analysis. R for econometric work.</li>
  <li><strong>Visualization:</strong> Tableau, Power BI, Looker for executive dashboards. "Built a CFO dashboard in Tableau tracking 18 KPIs across P&L, balance sheet, and cash flow."</li>
  <li><strong>ERP systems:</strong> SAP, Oracle Financials, NetSuite, Workday Adaptive Planning.</li>
  <li><strong>Financial platforms:</strong> Bloomberg Terminal, Capital IQ, FactSet, PitchBook.</li>
</ul>
<p>Even if the job description only mentions Excel, including SQL and Python differentiates you. FP&A teams are increasingly seeking analysts who can bridge the gap between finance and data engineering.</p>`,
      tip: 'If you automated a manual process, quantify the time saved and the error reduction. "Reduced month-end close from 8 days to 5 days by automating 12 reconciliation steps" is a powerful bullet.',
    },
    {
      title: 'Education, Certifications, and Credentials',
      body: `<p>Finance is one of the most credential-sensitive professions. Your education and certifications section needs to be precise and prominently placed.</p>
<ul>
  <li><strong>CFA designation:</strong> If you're a CFA charterholder, place it after your name: "John Smith, CFA." If in progress, state the level: "CFA Level III Candidate (exam June 2025)."</li>
  <li><strong>CPA:</strong> Relevant for FP&A and accounting-adjacent roles. List the state and status.</li>
  <li><strong>FMVA (CFI):</strong> Financial Modeling & Valuation Analyst certification — valuable for early-career analysts.</li>
  <li><strong>Education:</strong> Finance, accounting, economics, or mathematics degrees. Include GPA if above 3.5 and you graduated within the last 5 years.</li>
  <li><strong>MBA:</strong> If you have one, lead with it for senior roles. Include concentration and notable achievements.</li>
</ul>
<p>For investment banking and equity research, the pedigree of your education and credentials matters more than in corporate finance. Tailor the prominence accordingly.</p>`,
    },
    {
      title: 'Formatting for Finance Industry Standards',
      body: `<p>Finance resumes follow tighter conventions than most industries. Deviating from these norms can signal a lack of industry fluency.</p>
<ul>
  <li>Keep it to <strong>one page</strong> unless you have 15+ years of experience. Investment banking resumes are almost always one page, regardless of seniority.</li>
  <li>Use a conservative layout: single column, Times New Roman or Calibri, 10-11pt, 0.5" margins.</li>
  <li>Right-align dates, bold company names, and italicize titles. This is the near-universal format in finance.</li>
  <li>Include a "Relevant Coursework" line if you're within 3 years of graduation and your courses are directly applicable.</li>
</ul>
<p>No colors, no graphics, no creative layouts. Finance hiring managers expect polished restraint. Your resume should read like a well-formatted memo — clean, precise, and efficient. Export as PDF.</p>`,
      tip: 'In investment banking, the resume bullet order convention is: action verb, task, result, all in one concise line. Keep bullets to 1-2 lines maximum.',
    },
  ],
  checklist: [
    'Dollar value of decisions influenced or budgets managed is stated clearly',
    'Financial model types are named: DCF, LBO, three-statement, scenario analysis',
    'Tools extend beyond Excel: SQL, Python, Tableau, ERP systems, Bloomberg',
    'Certifications (CFA, CPA, FMVA) placed prominently — in header if applicable',
    'Sub-function is clear: FP&A, investment banking, equity research, corporate dev',
    'Automation and process improvement contributions are quantified',
    'Conservative formatting: single column, standard fonts, one page',
    'Education includes GPA (if >3.5 and recent) and relevant coursework',
    'Stakeholder audience named for key deliverables (CFO, board, deal team)',
  ],
  commonMistakes: [
    'Describing models built without naming the decision they informed — "built a DCF model" is incomplete; "built a DCF model that supported a $45M acquisition approved by the board" tells the story.',
    'Limiting the tools section to just Excel — in 2025, SQL and Python proficiency are increasingly expected and differentiate you significantly.',
    'Using a creative or colorful resume layout in finance — this industry values conservative presentation and may interpret deviation as a lack of cultural fit.',
    'Omitting CFA progress — even Level I candidacy shows commitment to the profession and should be listed.',
    'Writing two-page resumes for investment banking or early-career roles — one page is the standard, and exceeding it signals poor prioritization skills.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'docxExport',
  ],
  relatedSlugs: [
    'data-scientist-resume',
    'sales-representative-resume',
    'project-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

import type { UseCase } from '../../types'

export const accountantResume: UseCase = {
  slug: 'accountant-resume',
  category: 'resume-by-role',
  title: 'Accountant Resume Guide',
  metaTitle: 'Accountant Resume: Expert Guide [2025]',
  metaDescription:
    'Create an accountant resume that highlights your certifications, regulatory expertise, and financial reporting impact. Covers CPA credentials, ERP systems, and ATS-friendly formatting.',
  subtitle:
    'Demonstrate your mastery of financial reporting, regulatory compliance, and audit processes with a resume that speaks the language hiring managers expect.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with your CPA, CMA, or other professional certifications — they are often hard requirements that recruiters filter for before reading anything else.',
    'Quantify your impact through audit findings, cost savings, error reduction rates, and the size of budgets or portfolios you managed.',
    'Specify your ERP and accounting software proficiency — SAP, Oracle, QuickBooks, NetSuite — and mirror the exact tools listed in the job description.',
    'Demonstrate knowledge of applicable standards (GAAP, IFRS, SOX) and tie them to concrete compliance outcomes you delivered.',
  ],
  sections: [
    {
      title: 'Leading with Certifications and Credentials',
      body: `<p>In accounting, certifications are gatekeepers. Many positions require a CPA, CMA, or EA before a recruiter will even open your resume. Make these credentials <strong>impossible to miss</strong>.</p>
<ul>
  <li><strong>CPA (Certified Public Accountant):</strong> Place it directly after your name in the header — "Jane Doe, CPA." If in progress, state: "CPA Candidate — passed all four sections, license pending."</li>
  <li><strong>CMA (Certified Management Accountant):</strong> Particularly valuable for management accounting, cost analysis, and FP&A-adjacent roles.</li>
  <li><strong>EA (Enrolled Agent):</strong> Essential for tax-focused positions. Include your PTIN number if applying to firms.</li>
  <li><strong>CIA (Certified Internal Auditor):</strong> A differentiator for internal audit and risk management roles.</li>
</ul>
<p>If you hold multiple certifications, list them all in the header. In accounting, credentials carry more weight than in almost any other profession — they signal both competence and commitment to ethical standards.</p>`,
      tip: 'If you are still working toward your CPA, include the number of sections passed and your expected completion date. Recruiters recognize that passing even one section demonstrates serious commitment.',
    },
    {
      title: 'Quantifying Your Financial Reporting Impact',
      body: `<p>Accounting is fundamentally about accuracy, timeliness, and compliance. Your resume bullets need to prove you deliver all three — with numbers.</p>
<ul>
  <li><strong>Scale:</strong> "Managed the general ledger for a $240M revenue subsidiary, overseeing 1,200+ monthly journal entries across 45 cost centers."</li>
  <li><strong>Accuracy:</strong> "Maintained a 99.8% accuracy rate across 3 consecutive fiscal years, with zero material misstatements."</li>
  <li><strong>Efficiency:</strong> "Reduced month-end close from 12 business days to 7 by automating 18 reconciliation steps through NetSuite workflows."</li>
  <li><strong>Audit outcomes:</strong> "Led preparation for annual external audits (Big 4), achieving clean opinions for 5 consecutive years with zero adjusting entries."</li>
</ul>
<p>Hiring managers want to know the scope of your responsibility. Always include the revenue size, transaction volume, or team size associated with your work. A general ledger for a $10M business is a different role than one for a $500M enterprise.</p>`,
    },
    {
      title: 'Demonstrating Regulatory and Compliance Expertise',
      body: `<p>Regulatory knowledge is a core competency, not a soft skill. Your resume should explicitly reference the standards and regulations you work with and the compliance outcomes you achieved.</p>
<ul>
  <li><strong>GAAP/IFRS:</strong> Specify which framework you operate under. If you have experience with both, highlight that — it's a significant differentiator, especially in multinational companies.</li>
  <li><strong>SOX compliance:</strong> "Designed and documented 24 internal controls for SOX 404 compliance across revenue recognition and accounts payable processes."</li>
  <li><strong>Tax compliance:</strong> "Prepared and filed federal and multi-state corporate tax returns for 8 entities, ensuring 100% on-time filing and identifying $1.2M in R&D tax credits."</li>
  <li><strong>Revenue recognition (ASC 606):</strong> "Led the ASC 606 implementation for a SaaS company with $80M ARR, reclassifying 340 contracts and retraining the sales team on booking criteria."</li>
</ul>
<p>If you have experience navigating regulatory changes — new lease standards (ASC 842), revenue recognition updates, or international tax reform — call it out explicitly. Adaptability in a shifting regulatory landscape is highly valued.</p>`,
      tip: 'Reference specific codification numbers (ASC 606, ASC 842, IAS 16) rather than generic terms like "revenue recognition rules." Precision signals expertise.',
    },
    {
      title: 'Highlighting ERP Systems and Technical Skills',
      body: `<p>Modern accountants are expected to be proficient in enterprise software. Your technology section should reflect the tools you use daily and any automation you have built.</p>
<ul>
  <li><strong>ERP systems:</strong> SAP (specify modules — FI, CO, MM), Oracle Financials, NetSuite, Microsoft Dynamics 365, Sage Intacct, Workday.</li>
  <li><strong>Spreadsheet mastery:</strong> Advanced Excel (VLOOKUP, INDEX-MATCH, pivot tables, Power Query, VBA macros). Specify if you built models or templates used by the broader team.</li>
  <li><strong>Reporting and BI tools:</strong> Power BI, Tableau, SAP Crystal Reports, Hyperion. "Built a monthly P&L dashboard in Power BI that replaced a 40-page static report."</li>
  <li><strong>Automation:</strong> "Developed VBA macros to automate bank reconciliations across 12 accounts, reducing manual effort by 20 hours per month."</li>
  <li><strong>Tax software:</strong> Thomson Reuters UltraTax, Lacerte, ProConnect, CCH Axcess — relevant for public accounting and tax roles.</li>
</ul>
<p>Place your technical skills section near the top of your resume, immediately after your professional summary. ATS systems parse this section early, and keyword matches here carry significant weight.</p>`,
    },
    {
      title: 'Formatting and Structure for Accounting Resumes',
      body: `<p>Accounting is a profession that values precision, organization, and attention to detail. Your resume format should reflect these qualities.</p>
<ul>
  <li>Use a <strong>reverse-chronological format</strong> — this is the standard in accounting and finance. Functional formats raise red flags about gaps in employment.</li>
  <li>Keep it to <strong>one page</strong> for under 10 years of experience, two pages maximum for senior controllers, directors, or partners.</li>
  <li>Use conservative fonts (Calibri, Garamond, Times New Roman) at 10-11pt. No colors beyond black and a single subtle accent for headings.</li>
  <li>Right-align dates, bold company names, italicize your title. This is the expected convention in financial services.</li>
  <li>Include a clear <strong>Education</strong> section with your degree, university, and graduation year. If your GPA was 3.5+ and you graduated within the last 5 years, include it.</li>
</ul>
<p>Export as PDF to preserve formatting. Name the file <code>FirstName_LastName_CPA_Resume.pdf</code> — including your certification in the filename makes your credentials visible before the file is even opened.</p>`,
      tip: 'If you completed the 150 credit-hour requirement for CPA eligibility through a Master of Accountancy or additional coursework, mention it in your education section. It signals diligence to recruiters.',
    },
  ],
  checklist: [
    'CPA, CMA, or other certifications displayed in resume header after your name',
    'Professional summary mentions years of experience, specialization area, and a signature achievement',
    'Every experience bullet quantifies scope: revenue managed, transactions processed, team size, or audit outcomes',
    'GAAP, IFRS, SOX, or other regulatory frameworks referenced with specific compliance outcomes',
    'ERP systems (SAP, Oracle, NetSuite) and accounting software listed and matched to job description',
    'Month-end close, year-end close, or audit preparation experience described with timelines and results',
    'Technical skills section includes advanced Excel capabilities and any automation work',
    'Education section includes degree, CPA eligibility hours, and GPA if above 3.5 and recent',
    'Conservative formatting: single column, standard fonts, one page for under 10 years experience',
    'File exported as PDF with certifications included in the filename',
  ],
  commonMistakes: [
    'Burying certifications in a bottom section instead of placing them in the header — CPA, CMA, and EA credentials are the first thing recruiters look for and should be visible within one second.',
    'Writing generic bullets like "Responsible for month-end close" without specifying the scope, timeline improvement, or accuracy metrics that demonstrate the quality of your work.',
    'Omitting the size of the organization or portfolio you managed — "maintained the general ledger" gives no indication of whether you handled $5M or $500M in revenue.',
    'Listing only one accounting software when you have experience with multiple systems — cross-platform proficiency is a differentiator, especially in companies undergoing ERP migrations.',
    'Using a creative or unconventional resume layout — accounting hiring managers expect the same precision and conservatism in your resume that they expect in your financial reports.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'financial-analyst-resume',
    'business-analyst-resume',
    'operations-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

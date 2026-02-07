import type { UseCase } from '../../types'

export const businessAnalystResume: UseCase = {
  slug: 'business-analyst-resume',
  category: 'resume-by-role',
  title: 'Business Analyst Resume Guide',
  metaTitle: 'Business Analyst Resume: Expert Guide [2025]',
  metaDescription:
    'Craft a business analyst resume that showcases requirements gathering, stakeholder management, and data-driven decision-making. Covers CBAP certification, Agile methodology, and process mapping skills.',
  subtitle:
    'Position yourself as the bridge between business stakeholders and technical teams with a resume that demonstrates analytical rigor, communication skills, and measurable process improvements.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Frame every achievement around business outcomes — revenue generated, costs reduced, time saved, or risks mitigated — not just deliverables produced.',
    'Demonstrate your requirements methodology: how you elicit, document, validate, and manage requirements through BRDs, user stories, and acceptance criteria.',
    'Highlight your dual fluency in business and technology — SQL, data visualization, and process modeling skills alongside stakeholder management and strategic thinking.',
    'Reference Agile/Scrum experience with specific metrics: sprint velocity improvements, backlog refinement efficiency, or release cadence acceleration.',
  ],
  sections: [
    {
      title: 'Structuring Your Requirements and Analysis Experience',
      body: `<p>The core of a business analyst's value is translating ambiguous business problems into clear, actionable requirements. Your resume must demonstrate this translation capability with <strong>concrete examples</strong>.</p>
<ul>
  <li><strong>Requirements elicitation:</strong> "Conducted 40+ stakeholder interviews, focus groups, and workshops to define requirements for a $3.2M CRM migration, producing a 120-page BRD approved by 5 department heads."</li>
  <li><strong>User stories and acceptance criteria:</strong> "Authored 280+ user stories with detailed acceptance criteria for an Agile product team, maintaining a 94% first-sprint acceptance rate."</li>
  <li><strong>Gap analysis:</strong> "Performed gap analysis between current-state and target-state processes for the order fulfillment workflow, identifying 12 automation opportunities that reduced manual touchpoints by 65%."</li>
  <li><strong>Traceability:</strong> "Maintained a requirements traceability matrix linking 350 requirements to test cases, ensuring 100% coverage at UAT sign-off."</li>
</ul>
<p>Use the <em>Situation-Analysis-Recommendation-Result</em> framework for your bullets. Show not just what you documented, but how your analysis drove decisions and delivered value.</p>`,
      tip: 'Include the methodology you used for requirements gathering (JAD sessions, prototyping, document analysis, observation) — it signals process maturity and helps hiring managers assess your fit for their team\'s way of working.',
    },
    {
      title: 'Demonstrating Stakeholder Management and Communication',
      body: `<p>Business analysts succeed or fail based on their ability to manage relationships across organizational boundaries. Your resume should demonstrate that you can <strong>navigate competing priorities, build consensus, and communicate at every level</strong>.</p>
<ul>
  <li><strong>Cross-functional collaboration:</strong> "Served as the primary liaison between the product team (12 engineers), sales operations (25 reps), and executive leadership for a Salesforce re-implementation."</li>
  <li><strong>Executive communication:</strong> "Presented cost-benefit analyses and project recommendations to the VP of Operations and CFO, securing $1.8M in budget approval for process automation."</li>
  <li><strong>Conflict resolution:</strong> "Facilitated requirements prioritization across 4 business units with competing requests, using MoSCoW analysis to build a roadmap that satisfied 90% of critical needs within budget."</li>
  <li><strong>Change management:</strong> "Developed training materials and led 8 workshops for 150 end users during ERP go-live, achieving 95% adoption within the first month."</li>
</ul>
<p>Name the seniority level of your stakeholders. Presenting to a team lead is different from presenting to the CFO. The higher the stakeholder level you routinely engage with, the more strategic your role appears.</p>`,
    },
    {
      title: 'Showcasing Technical and Data Analysis Skills',
      body: `<p>Modern business analysts are expected to be technically capable. Your resume should demonstrate <strong>hands-on proficiency</strong> with data querying, visualization, and process modeling tools.</p>
<ul>
  <li><strong>SQL and data analysis:</strong> "Wrote SQL queries against a 50M-row data warehouse to identify order fulfillment bottlenecks, discovering a $340K annual revenue leakage from duplicate shipments."</li>
  <li><strong>Process modeling:</strong> "Created current-state and future-state BPMN process maps for 8 core business processes using Visio and Lucidchart, identifying $1.2M in annual efficiency gains."</li>
  <li><strong>Data visualization:</strong> "Built executive dashboards in Tableau tracking 15 KPIs across sales, operations, and customer success — dashboards adopted as the standard reporting format for monthly business reviews."</li>
  <li><strong>Advanced Excel:</strong> "Developed a scenario analysis model in Excel (10,000-row dataset, 15 variables) to evaluate vendor contract options, informing a $2.4M procurement decision."</li>
  <li><strong>Agile tools:</strong> Jira, Azure DevOps, Confluence, Rally — specify your role: writing stories, managing the backlog, configuring workflows, or running sprint ceremonies.</li>
</ul>
<p>Organize your technical skills by function: <strong>Data & Analysis</strong> (SQL, Python, Excel), <strong>Visualization</strong> (Tableau, Power BI), <strong>Process Modeling</strong> (Visio, BPMN, Lucidchart), <strong>Project & Agile Tools</strong> (Jira, Confluence, Azure DevOps).</p>`,
      tip: 'If you have Python or R experience, include it even if it\'s not in the job description. Business analysts who can write scripts for data cleaning, automation, or statistical analysis are increasingly in demand.',
    },
    {
      title: 'Certifications, Methodology, and Professional Development',
      body: `<p>Certifications validate your expertise and methodology alignment. For business analysts, they signal a commitment to structured, professional practice.</p>
<ul>
  <li><strong>CBAP (Certified Business Analysis Professional):</strong> The gold-standard certification from IIBA. Requires 7,500 hours of BA work experience. Place it in your header if held.</li>
  <li><strong>CCBA (Certification of Capability in Business Analysis):</strong> The mid-career alternative to CBAP, requiring 3,750 hours of experience.</li>
  <li><strong>PMI-PBA (Professional in Business Analysis):</strong> Offered by PMI, valued particularly in organizations that also use PMP-certified project managers.</li>
  <li><strong>Agile certifications:</strong> CSM (Certified Scrum Master), CSPO (Certified Scrum Product Owner), SAFe Agilist — especially valuable for BAs working in Agile environments.</li>
  <li><strong>Methodology knowledge:</strong> Reference BABOK Guide, Agile Extension to the BABOK Guide, or Six Sigma (Green Belt, Black Belt) if applicable to your process improvement work.</li>
</ul>
<p>If you don't yet hold a certification, mention relevant training: "Completed IIBA CBAP preparation program (35 CDU hours)" or "Six Sigma Green Belt training — certification exam scheduled Q2 2025."</p>`,
    },
    {
      title: 'Formatting and Resume Structure for Business Analysts',
      body: `<p>Business analysts are professional communicators. Your resume should reflect the same clarity, structure, and precision you bring to a BRD or stakeholder presentation.</p>
<ul>
  <li>Use a <strong>reverse-chronological format</strong> with clear section delineation: Summary, Skills, Experience, Certifications, Education.</li>
  <li>Keep it to <strong>one page for under 7 years of experience</strong>, two pages maximum for senior or lead BAs.</li>
  <li>Open with a <strong>professional summary</strong> (2-3 sentences) that states your specialization: "Senior Business Analyst with 8 years of experience in financial services, specializing in regulatory compliance systems and Agile delivery."</li>
  <li>Use standard, ATS-friendly fonts (Calibri, Arial, Helvetica) at 10-11pt. Single-column layout with consistent heading hierarchy.</li>
  <li>Include a <strong>Key Projects</strong> subsection under experience for complex, high-visibility initiatives: name the project, budget, duration, team size, and your specific contribution.</li>
</ul>
<p>Export as PDF and name the file <code>FirstName_LastName_Business_Analyst_Resume.pdf</code>. If you hold CBAP or PMI-PBA, include the credential in the filename for instant recognition.</p>`,
      tip: 'Mirror the industry language of the company you\'re applying to. A BA resume for a healthcare company should reference HIPAA, HL7, and EHR systems; one for financial services should mention KYC, AML, and regulatory reporting.',
    },
  ],
  checklist: [
    'Professional summary names your industry domain, years of experience, and core BA methodology',
    'CBAP, CCBA, PMI-PBA, or Agile certifications displayed prominently',
    'Requirements experience described with specific deliverables: BRDs, user stories, process maps, traceability matrices',
    'Stakeholder management examples include the seniority level of stakeholders engaged',
    'At least 4 bullets quantify business impact: cost savings, revenue gains, efficiency improvements, risk reductions',
    'SQL, data analysis, and visualization skills listed with examples of insights delivered',
    'Agile/Scrum experience includes specific metrics: sprint velocity, acceptance rates, release frequency',
    'Process modeling tools and notation (BPMN, UML, Visio) specified',
    'Technical skills organized by function: data, visualization, process modeling, Agile tools',
    'Clean, ATS-friendly format with standard sections and one to two pages maximum',
  ],
  commonMistakes: [
    'Describing requirements work as simply "gathering requirements" without specifying the methodology, scope, or quality metrics — this reads as junior-level and gives no indication of analytical depth.',
    'Omitting business impact entirely and listing only deliverables ("wrote BRDs, created process maps") without connecting them to outcomes like cost savings, revenue growth, or risk mitigation.',
    'Failing to demonstrate technical skills — in 2025, business analysts without SQL, data visualization, or scripting capabilities are at a significant competitive disadvantage.',
    'Using generic stakeholder descriptions ("worked with cross-functional teams") instead of naming the functions, seniority levels, and specific outcomes of stakeholder collaboration.',
    'Neglecting to mention Agile experience or framing all experience in Waterfall terms — even traditional enterprises are adopting Agile, and lack of Agile fluency can be disqualifying for many roles.',
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
    'project-manager-resume',
  ],
  updatedAt: '2025-01-15',
}

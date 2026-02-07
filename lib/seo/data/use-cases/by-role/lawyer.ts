import type { UseCase } from '../../types'

export const lawyerResume: UseCase = {
  slug: 'lawyer-resume',
  category: 'resume-by-role',
  title: 'Lawyer Resume Guide',
  metaTitle: 'Lawyer Resume: Expert Guide [2025]',
  metaDescription:
    'Craft a persuasive lawyer resume that showcases your bar admissions, practice area expertise, and case outcomes. Covers litigation, client management, and legal research tools.',
  subtitle:
    'Build a results-driven legal resume that demonstrates your advocacy skills, case outcomes, and professional credentials to top law firms and legal departments.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'List bar admissions and court admissions at the top of your resume — they determine where and how you can practice.',
    'Quantify your impact with case values, settlement amounts, transaction volumes, and billable hour targets met or exceeded.',
    'Organize your experience around practice areas rather than generic responsibilities to help recruiters assess your specialization.',
    'Include publications, speaking engagements, and pro bono work — they signal thought leadership and professional engagement.',
  ],
  sections: [
    {
      title: 'Presenting Bar Admissions and Education',
      body: `<p>In the legal profession, your <strong>bar admissions and law school credentials</strong> carry more weight than in almost any other field. Legal recruiters and hiring partners check these details first, and missing or poorly presented credentials can disqualify you immediately.</p>
<ul>
  <li><strong>Bar admissions:</strong> List every state and federal court where you are admitted to practice. Include admission year and current status (active, in good standing).</li>
  <li><strong>Federal court admissions:</strong> If admitted to practice before specific U.S. District Courts, Circuit Courts, or the Supreme Court, list them separately — they signal litigation experience at the federal level.</li>
  <li><strong>Law school:</strong> Include your J.D. institution, graduation year, class rank or GPA (if top 25%), law review or journal membership, moot court honors, and relevant concentrations.</li>
  <li><strong>Undergraduate education:</strong> Include your bachelor's degree, especially if from a prestigious institution or if your major is relevant to your practice area (e.g., engineering for patent law).</li>
</ul>
<p>For attorneys with 5+ years of experience, education moves below your experience section. For junior associates, keep it near the top — your law school pedigree and academic honors are still your strongest signals.</p>`,
      tip: 'If you passed a notoriously difficult bar exam (California, New York) on the first attempt, consider noting it — legal recruiters recognize the significance.',
    },
    {
      title: 'Showcasing Practice Area Expertise and Case Outcomes',
      body: `<p>Law firms and legal departments hire for specific practice areas. Your resume must clearly communicate <strong>what type of law you practice and the results you've achieved</strong> in that domain.</p>
<p>Structure your experience bullets around matters and outcomes rather than generic duties:</p>
<ul>
  <li><strong>Litigation:</strong> "First-chaired a breach of contract trial in state court, securing a $4.2M verdict for the plaintiff — the largest recovery in the firm's commercial litigation practice that year."</li>
  <li><strong>Transactional:</strong> "Led due diligence and drafting for 15 M&A transactions totaling $380M in aggregate deal value, closing all within negotiated timelines."</li>
  <li><strong>Regulatory:</strong> "Represented pharmaceutical clients before the FDA, successfully obtaining 510(k) clearance for 3 medical device applications with zero deficiency letters."</li>
  <li><strong>Intellectual property:</strong> "Prosecuted 60+ patent applications across mechanical and software technologies with a 92% allowance rate."</li>
</ul>
<p>Always include the <strong>dollar value, case volume, or strategic significance</strong> of the matters you handled. Partners and hiring managers use these numbers to gauge your experience level and the sophistication of your work.</p>`,
    },
    {
      title: 'Demonstrating Client Management and Business Development',
      body: `<p>As attorneys advance past the mid-level associate stage, client relationship management and business development become critical differentiators. Your resume should reflect your ability to <strong>originate work, manage client relationships, and contribute to firm revenue</strong>.</p>
<ul>
  <li><strong>Book of business:</strong> If you have portable business, quantify it — "Maintained a $1.2M book of portable business across 8 institutional clients."</li>
  <li><strong>Client management:</strong> "Served as primary outside counsel for a Fortune 500 technology company, managing a $2M annual legal spend across employment, IP, and commercial matters."</li>
  <li><strong>Billable hours:</strong> If you consistently exceeded targets, state it — "Billed an average of 2,100 hours annually over 4 years, exceeding the firm's 1,950-hour target."</li>
  <li><strong>Business development:</strong> Describe pitches won, client seminars organized, industry conferences attended, and cross-selling initiatives that resulted in new engagements.</li>
</ul>
<p>For in-house counsel positions, shift the emphasis from billable hours to <strong>cost savings, outside counsel management, and strategic business partnership</strong>. "Reduced outside legal spend by 28% ($1.4M annually) through in-sourcing routine commercial contract review and implementing a preferred vendor panel."</p>`,
      tip: 'When applying to in-house roles, reframe your law firm experience in business terms — "advised the board" instead of "counseled the client," "managed regulatory risk" instead of "handled compliance matters."',
    },
    {
      title: 'Highlighting Legal Technology and Research Skills',
      body: `<p>Legal employers increasingly value attorneys who can leverage technology to work more efficiently. Your proficiency with legal research platforms and practice management tools signals that you can deliver high-quality work without excessive overhead.</p>
<ul>
  <li><strong>Legal research:</strong> Westlaw, LexisNexis, Bloomberg Law, Fastcase — specify which platforms you're proficient in and any advanced search or analytics features you use regularly.</li>
  <li><strong>E-discovery:</strong> Relativity, Concordance, Logikcull, DISCO — if you've managed document review projects, note the volume (e.g., "Managed review of 2.3M documents in a multi-district antitrust litigation").</li>
  <li><strong>Practice management:</strong> Clio, MyCase, iManage, NetDocuments — name the document management and billing systems you've used.</li>
  <li><strong>Legal analytics:</strong> Lex Machina, Ravel Law, Premonition — experience with litigation analytics tools demonstrates a data-driven approach to case strategy.</li>
</ul>
<p>If you've implemented legal technology solutions or trained teams on new platforms, highlight that experience. Law firms and legal departments are actively seeking attorneys who can drive technology adoption and improve operational efficiency.</p>`,
    },
    {
      title: 'Including Publications, Pro Bono, and Professional Leadership',
      body: `<p>The legal profession places significant value on thought leadership, community service, and professional engagement. These sections often distinguish a strong candidate from an exceptional one.</p>
<ul>
  <li><strong>Publications:</strong> List articles published in law reviews, bar journals, legal trade publications, or client alerts. Include the publication name, date, and topic — "Published 'Navigating CCPA Compliance for Mid-Market Companies' in the ABA Business Law Journal, March 2024."</li>
  <li><strong>Speaking engagements:</strong> Note CLE presentations, conference panels, and webinars — they establish you as a recognized authority in your practice area.</li>
  <li><strong>Pro bono work:</strong> Describe meaningful pro bono matters with the same specificity as paid work — "Represented 12 asylum-seekers in immigration proceedings through a partnership with the local legal aid society, achieving favorable outcomes in 10 cases."</li>
  <li><strong>Bar association leadership:</strong> Committee memberships, section chair positions, or board roles in state or local bar associations demonstrate professional commitment.</li>
</ul>
<p>Keep these sections concise but specific. A targeted list of 3-5 publications or speaking engagements is more impressive than a padded list of 15 minor items.</p>`,
      tip: 'If you mentor junior associates, supervise summer associates, or lead firm training programs, include these activities — they demonstrate leadership capacity beyond client work.',
    },
  ],
  checklist: [
    'Bar admissions listed with states, admission years, and current status',
    'Federal court admissions included if applicable',
    'J.D. institution, honors, law review membership, and class rank (if favorable) clearly presented',
    'Experience organized by practice area with specific matter descriptions',
    'Case outcomes quantified with dollar values, volumes, or strategic significance',
    'Client management and business development contributions highlighted',
    'Legal technology proficiency documented (Westlaw, LexisNexis, e-discovery tools)',
    'Publications, speaking engagements, and pro bono work included',
    'Professional affiliations and bar association leadership noted',
    'Resume formatted in a clean, conservative layout appropriate for the legal profession',
  ],
  commonMistakes: [
    'Omitting bar admission details or failing to specify the courts where you are admitted — this is the legal equivalent of a software engineer leaving off their programming languages.',
    'Writing duty-based descriptions ("Responsible for contract review") instead of outcome-based achievements ("Negotiated 85+ commercial contracts totaling $120M, reducing average turnaround time from 14 days to 5").',
    'Failing to quantify case values, deal sizes, or document volumes — legal recruiters use these numbers to assess the sophistication and scale of your practice.',
    'Using an overly creative or modern resume format — the legal profession is conservative, and a traditional, text-heavy layout projects the professionalism expected by hiring partners.',
    'Neglecting to include pro bono work and publications — these are not optional extras in legal hiring; they signal professional engagement and intellectual depth.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'business-analyst-resume',
    'human-resources-manager-resume',
    'financial-analyst-resume',
  ],
  updatedAt: '2025-01-15',
}

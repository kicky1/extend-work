import type { UseCase } from '../../types'

export const architectResume: UseCase = {
  slug: 'architect-resume',
  category: 'resume-by-role',
  title: 'Architect Resume Guide',
  metaTitle: 'Architect Resume: Expert Guide [2025]',
  metaDescription:
    'Build an architect resume that showcases licensure, built projects, and design software proficiency. Covers portfolio integration, ATS optimization, and common formatting mistakes.',
  subtitle:
    'Present your licensure, design portfolio, and project delivery experience in a resume that earns interviews at top firms and owner-developers.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with your licensure status (RA, AIA, NCARB) and ARE completion directly after your name in the resume header.',
    'Quantify project scope with budget, square footage, team size, and timeline — not just aesthetic descriptions.',
    'List software proficiency in a dedicated skills section: Revit, Rhino, AutoCAD, SketchUp, Grasshopper, Enscape, and BIM coordination tools.',
    'Highlight sustainability credentials (LEED AP, Passive House, WELL AP) and code compliance experience to differentiate from unlicensed designers.',
  ],
  sections: [
    {
      title: 'Presenting Licensure and Professional Credentials',
      body: `<p>Architecture is a licensed profession, and your credentials are the single most important differentiator on your resume. Make them <strong>prominently visible</strong> from the first line.</p>
<ul>
  <li>Place credentials after your name in the header: "Michael Torres, RA, AIA, LEED AP BD+C." If you have NCARB certification, include it — it signals interstate mobility and is valued by national firms.</li>
  <li>Create a dedicated "Licensure & Certifications" section listing: state registration(s) with license number, ARE completion status, NCARB certification, LEED AP or GA, Passive House certification, and any WELL credentials.</li>
  <li>If you are completing the ARE, list divisions passed with dates: "ARE 5.0 — 4 of 6 divisions passed (PcM, PjM, CE, PPD). Remaining scheduled Q2 2025." This shows momentum without misrepresenting your status.</li>
  <li>Include IDP/AXP hours completed if you are pre-licensure. Hiring managers at firms that invest in emerging professionals want to see how close you are to eligibility.</li>
</ul>
<p>Never claim "Licensed Architect" if you hold a degree but haven't passed the ARE and obtained state registration. Misrepresenting licensure status is an ethics violation and legal issue in every jurisdiction.</p>`,
      tip: 'If you hold registrations in multiple states, list all of them. Multi-state licensure is a competitive advantage for firms with geographically distributed projects.',
    },
    {
      title: 'Quantifying Project Experience and Delivery',
      body: `<p>Architecture resumes often read like project descriptions from a firm website. Hiring managers want to see <strong>your specific role, scope, and measurable contributions</strong> — not a poetic narrative about materiality.</p>
<ul>
  <li><strong>Budget and scale:</strong> "Served as Project Architect for a $42M, 185,000 SF mixed-use development comprising 220 residential units and 18,000 SF of ground-floor retail."</li>
  <li><strong>Team leadership:</strong> "Led a design team of 6 architects and 3 interior designers from schematic design through construction administration over a 28-month project lifecycle."</li>
  <li><strong>Timeline performance:</strong> "Delivered CD set 3 weeks ahead of schedule, enabling the client to pull permits before the municipal fee increase deadline."</li>
  <li><strong>Code and approval:</strong> "Navigated a 14-month entitlement process including zoning variance hearings, design review board presentations, and historic preservation commission approvals."</li>
  <li><strong>Cost management:</strong> "Reduced construction costs by $1.8M through value engineering of the curtain wall system while maintaining design intent and energy performance targets."</li>
</ul>
<p>Organize projects by role (Project Architect, Designer, Job Captain) rather than listing every project you touched. Focus on 3-5 significant projects where your contribution was substantial and demonstrable.</p>`,
    },
    {
      title: 'Showcasing Software and Technical Proficiency',
      body: `<p>Architecture firms hire for specific technical workflows. Your software section should reflect <strong>production-level proficiency</strong>, not just familiarity from a workshop.</p>
<ul>
  <li><strong>BIM and documentation:</strong> Revit (families, schedules, worksharing), AutoCAD (production drawing sets), ArchiCAD, Vectorworks. Specify BIM coordination experience: Navisworks, Solibri, BIM 360.</li>
  <li><strong>Design and visualization:</strong> Rhino + Grasshopper (parametric design), SketchUp, 3ds Max, V-Ray, Enscape, Lumion, Twinmotion, Blender. Note if you produce client-facing renderings or leave that to visualization specialists.</li>
  <li><strong>Graphics and presentation:</strong> Adobe Creative Suite (InDesign for portfolios, Illustrator for diagrams, Photoshop for post-production), PowerPoint/Keynote for client presentations.</li>
  <li><strong>Computational and analysis:</strong> Grasshopper with Ladybug/Honeybee for environmental analysis, EnergyPlus, WUFI, daylighting simulation tools. These are increasingly critical for sustainable design roles.</li>
</ul>
<p>Rate your proficiency honestly. Firms will test you. If you list Grasshopper, expect to be asked about specific definition workflows. If you list Revit, expect to discuss family creation and worksharing protocols during the interview.</p>`,
      tip: 'If you have experience establishing BIM standards or Revit templates for a firm, highlight it. BIM management is a high-demand skill that many architects undervalue on their resumes.',
    },
    {
      title: 'Integrating Sustainability and Code Expertise',
      body: `<p>Sustainability and building code compliance are where architects demonstrate technical depth that goes beyond design aesthetics. These competencies are <strong>increasingly decisive</strong> in hiring decisions.</p>
<ul>
  <li><strong>LEED experience:</strong> "Led LEED documentation for 3 projects achieving Gold or Platinum certification, managing credit tracking across design and construction phases." Specify your LEED AP specialty (BD+C, ID+C, O+M, ND).</li>
  <li><strong>Energy performance:</strong> "Designed building envelope systems achieving 35% energy reduction below ASHRAE 90.1 baseline through high-performance glazing, continuous insulation, and heat recovery ventilation."</li>
  <li><strong>Code navigation:</strong> "Resolved complex code issues for Type I-A high-rise construction including egress analysis, fire-rated assemblies, and accessibility compliance across IBC, local amendments, and ADA/FHA requirements."</li>
  <li><strong>Passive House / Net Zero:</strong> "Completed Passive House design for a 12-unit residential building achieving 4.75 kBtu/ft2/yr heating demand, certified through PHIUS."</li>
</ul>
<p>If you have experience with local green building mandates (NYC Local Law 97, Boston BERDO, Denver Green Code), mention them specifically. Firms pursuing work in those jurisdictions need architects who understand the regulatory landscape.</p>`,
    },
    {
      title: 'Presenting Client Engagement and Business Development',
      body: `<p>Senior architects and principals must demonstrate that they can win and retain work. Even at the mid-level, <strong>client-facing experience</strong> sets you apart from candidates who only produce drawings.</p>
<ul>
  <li><strong>Client presentations:</strong> "Presented design concepts to ownership groups, municipal review boards, and community stakeholders across 15+ public hearings with 100% project approval rate."</li>
  <li><strong>Business development:</strong> "Contributed to 8 RFP/RFQ responses resulting in $12M of awarded contracts, including shortlist interviews for 3 institutional clients."</li>
  <li><strong>Relationship management:</strong> "Managed client relationships for 4 repeat institutional clients representing 40% of the studio's annual revenue."</li>
  <li><strong>Mentorship and culture:</strong> "Mentored 5 IDP/AXP candidates through licensure preparation, with 4 completing the ARE within 18 months. Led weekly design pin-ups for the studio."</li>
</ul>
<p>If you've been published — whether in Architect Magazine, ArchDaily, Dezeen, or local AIA chapter publications — include a "Publications & Recognition" section. Design awards (AIA Honor Awards, local chapter awards) are also worth listing, especially if they include jury citations.</p>`,
      tip: 'For portfolio-required applications, note "Portfolio available upon request" on your resume. Some firms want a separate PDF portfolio; others prefer an online link. Having both ready shows professionalism.',
    },
  ],
  checklist: [
    'Licensure status (RA, AIA, NCARB) displayed after name in resume header',
    'Dedicated Licensure & Certifications section with state registration numbers and ARE status',
    'Projects quantified with budget, square footage, unit count, and team size',
    'Software proficiency section organized by category: BIM, visualization, graphics, analysis',
    'Sustainability credentials listed: LEED AP specialty, Passive House, WELL AP',
    'Building code experience described with specific code references (IBC, ADA, local amendments)',
    'Client-facing experience highlighted: presentations, approvals, business development contributions',
    'Portfolio availability noted with link or "available upon request"',
    'Resume formatted cleanly without excessive graphic design that confuses ATS parsing',
    'Project list organized by role (Project Architect, Designer, Job Captain) with clear scope descriptions',
  ],
  commonMistakes: [
    'Using a heavily designed resume layout with columns, graphics, and non-standard fonts that ATS systems cannot parse — save the visual design for your portfolio.',
    'Describing projects in aesthetic terms ("a dialogue between light and material") instead of measurable outcomes (budget, timeline, energy performance, approval outcomes).',
    'Listing every project you contributed to rather than focusing on 3-5 significant ones where your role and impact are clearly defined.',
    'Omitting licensure status or burying it in a skills section — for a licensed profession, credentials must be in the header.',
    'Failing to distinguish between Revit familiarity and production-level BIM proficiency — firms will test your claims during interviews.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'civil-engineer-resume',
    'graphic-designer-resume',
    'mechanical-engineer-resume',
  ],
  updatedAt: '2025-01-15',
}

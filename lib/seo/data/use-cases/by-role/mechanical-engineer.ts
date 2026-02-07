import type { UseCase } from '../../types'

export const mechanicalEngineerResume: UseCase = {
  slug: 'mechanical-engineer-resume',
  category: 'resume-by-role',
  title: 'Mechanical Engineer Resume Guide',
  metaTitle: 'Mechanical Engineer Resume: Expert Guide [2025]',
  metaDescription:
    'Build a mechanical engineer resume that highlights your CAD proficiency, FEA/CFD analysis skills, manufacturing experience, and PE licensure. Covers patents, GD&T, and quantifiable project impact.',
  subtitle:
    'Showcase your design expertise, analytical rigor, and manufacturing knowledge with a resume that demonstrates both technical depth and measurable engineering impact.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with your PE license if you hold one — it is a hard requirement for many senior roles and immediately elevates your candidacy above unlicensed engineers.',
    'Specify your CAD and simulation software proficiency (SolidWorks, AutoCAD, CATIA, ANSYS, COMSOL) and the complexity of the models you build.',
    'Quantify engineering impact through cost savings, weight reductions, yield improvements, cycle time decreases, and patent contributions.',
    'Reference industry standards and tolerancing knowledge (GD&T per ASME Y14.5, ISO 2768) to demonstrate your manufacturing awareness.',
  ],
  sections: [
    {
      title: 'Highlighting CAD and Simulation Software Proficiency',
      body: `<p>CAD and simulation tools are the fundamental instruments of mechanical engineering. Your resume must communicate not just which tools you know, but <strong>the complexity and scale of the work you do with them</strong>.</p>
<ul>
  <li><strong>3D CAD:</strong> SolidWorks, CATIA, Creo (Pro/E), Siemens NX, Autodesk Inventor. Specify what you model: "Designed 150+ part assemblies for automotive HVAC systems in CATIA V5, including full packaging studies and interference checks."</li>
  <li><strong>2D drafting:</strong> AutoCAD for production drawings, detail drawings, and legacy documentation. "Created GD&T-compliant production drawings per ASME Y14.5 for 40+ machined and sheet metal components."</li>
  <li><strong>FEA (Finite Element Analysis):</strong> ANSYS Mechanical, SolidWorks Simulation, Abaqus, COMSOL Multiphysics. "Performed nonlinear FEA on a titanium hip implant under ISO 7206 loading conditions, validating fatigue life of 10M cycles."</li>
  <li><strong>CFD (Computational Fluid Dynamics):</strong> ANSYS Fluent, STAR-CCM+, OpenFOAM. "Conducted thermal-fluid analysis on a liquid cooling system for power electronics, optimizing fin geometry to reduce junction temperature by 18°C."</li>
  <li><strong>PLM and PDM:</strong> Teamcenter, Windchill, ENOVIA — critical for enterprises managing thousands of parts. "Managed a 12,000-part product structure in Windchill with full revision history and ECO workflows."</li>
</ul>
<p>Group your software by function in your skills section. A hiring manager scanning for "ANSYS" should find it instantly, not buried in a mixed list of 30 tools.</p>`,
      tip: 'If you have experience with generative design, topology optimization, or additive manufacturing design tools, highlight them. These capabilities are increasingly valued as companies adopt DfAM (Design for Additive Manufacturing) workflows.',
    },
    {
      title: 'Quantifying Engineering Impact and Project Results',
      body: `<p>Engineering achievements must be expressed in numbers. Every bullet on your resume should connect your technical work to a <strong>measurable outcome</strong> that a hiring manager can evaluate.</p>
<ul>
  <li><strong>Cost reduction:</strong> "Redesigned a die-cast aluminum housing, switching from a 4-piece welded assembly to a single-piece casting. Reduced part cost by 34% ($12.40 to $8.18) and eliminated 3 assembly steps."</li>
  <li><strong>Weight optimization:</strong> "Applied topology optimization to a structural bracket, reducing mass by 42% while maintaining a 3.0x factor of safety under FAR 25.571 fatigue loading."</li>
  <li><strong>Yield improvement:</strong> "Identified root cause of 8% scrap rate on CNC-machined valve bodies through dimensional analysis. Revised tolerances and fixture design, reducing scrap to 1.2%."</li>
  <li><strong>Time-to-market:</strong> "Led the design and prototyping of a new consumer product from concept to pilot production in 14 weeks, 3 weeks ahead of schedule, by implementing concurrent engineering practices."</li>
  <li><strong>Patent contributions:</strong> "Co-inventor on 3 utility patents (US 11,XXX,XXX) for a novel thermal management system used in data center cooling infrastructure."</li>
</ul>
<p>Use specific units, percentages, and dollar amounts. "Improved performance" is weak. "Increased heat transfer coefficient by 27%, enabling a 15% reduction in heat exchanger size and $180K annual material savings" tells the complete story.</p>`,
    },
    {
      title: 'Demonstrating Manufacturing and Materials Knowledge',
      body: `<p>The best mechanical engineers design for manufacturability. Your resume should demonstrate that you understand <strong>how things are made</strong>, not just how they are drawn.</p>
<ul>
  <li><strong>Manufacturing processes:</strong> CNC machining, injection molding, sheet metal fabrication, die casting, welding (MIG, TIG, laser), 3D printing (SLS, SLA, FDM, DMLS). "Designed injection-molded parts with 2-degree draft angles, uniform wall thickness, and snap-fit features, achieving first-shot approval on 4 of 5 mold tools."</li>
  <li><strong>GD&T (Geometric Dimensioning and Tolerancing):</strong> "Applied GD&T per ASME Y14.5-2018 to all critical features, specifying datum schemes that ensured assembly interchangeability across 3 supplier plants."</li>
  <li><strong>Materials selection:</strong> "Selected glass-filled nylon (PA66-GF30) for a structural automotive bracket, balancing creep resistance, cost, and moldability. Validated through accelerated aging tests at 120°C for 1,000 hours."</li>
  <li><strong>DFM/DFA (Design for Manufacturing and Assembly):</strong> "Conducted DFM reviews with tooling vendors for every new part, reducing average ECO (Engineering Change Order) count from 4.2 to 1.1 per part."</li>
  <li><strong>Quality and inspection:</strong> PPAP, FMEA, SPC, CMM inspection. "Authored DFMEA documents for 3 safety-critical components, identifying 12 high-RPN failure modes and implementing design mitigations."</li>
</ul>
<p>If you have hands-on manufacturing experience — running CNC machines, operating 3D printers, performing inspections — include it. Engineers who understand the shop floor produce better designs.</p>`,
      tip: 'When listing materials knowledge, go beyond material names. Show you understand trade-offs: "Selected 6061-T6 aluminum over 7075 for corrosion resistance in marine applications, accepting a 25% reduction in yield strength offset by a thicker cross-section."',
    },
    {
      title: 'Professional Licensure, Patents, and Certifications',
      body: `<p>Professional credentials carry significant weight in mechanical engineering, especially for roles involving public safety, consulting, or senior technical leadership.</p>
<ul>
  <li><strong>PE (Professional Engineer) license:</strong> If you hold a PE, place it after your name: "David Chen, PE." Specify the state(s) of licensure. For roles requiring stamp authority, this is non-negotiable.</li>
  <li><strong>EIT/FE (Engineer in Training / Fundamentals of Engineering):</strong> If you've passed the FE exam but haven't yet obtained your PE, list it: "EIT — FE Mechanical exam passed, April 2023."</li>
  <li><strong>Patents:</strong> List utility patents with their number and a one-line description. "Co-inventor, US Patent 11,234,567 — Variable-geometry turbine nozzle for improved part-load efficiency in gas turbines."</li>
  <li><strong>Industry certifications:</strong> Six Sigma (Green Belt, Black Belt), ASME certifications, AWS Certified Welding Inspector, GD&T certifications (ETI, ASME).</li>
  <li><strong>Publications:</strong> Peer-reviewed journal papers or conference presentations (ASME, SAE, IEEE). List up to 3 most relevant; include a "Publications" section if you have more.</li>
</ul>
<p>For engineers targeting consulting or infrastructure roles, the PE license is often the single most important resume element. It should be as visible as possible — header, summary, and the dedicated certifications section.</p>`,
    },
    {
      title: 'Formatting and Industry-Specific Best Practices',
      body: `<p>Mechanical engineering resumes follow engineering conventions — clear, precise, and structured. Your resume should read like a well-organized technical document.</p>
<ul>
  <li>Use a <strong>reverse-chronological format</strong>. Engineering hiring managers expect to see your career progression clearly.</li>
  <li>Keep it to <strong>one page for under 8 years of experience</strong>, two pages maximum for senior engineers, principals, or those with extensive patent portfolios.</li>
  <li>Open with a <strong>technical summary</strong>: "Mechanical engineer with 7 years of experience in automotive powertrain design, specializing in thermal management systems for electric vehicles. PE-licensed in Michigan."</li>
  <li>Use a dedicated <strong>Technical Skills</strong> section organized by category: CAD/CAM, Simulation & Analysis, Manufacturing, Standards & Codes, Programming (MATLAB, Python).</li>
  <li>Include a <strong>Key Projects</strong> subsection for high-impact work: project name, budget, team size, your role, and quantified outcome.</li>
</ul>
<p>Export as PDF. Name the file <code>FirstName_LastName_ME_Resume.pdf</code> or include your PE designation: <code>FirstName_LastName_PE_Resume.pdf</code>. Use standard fonts (Calibri, Arial) and a single-column layout for ATS compatibility.</p>`,
      tip: 'If you work in a regulated industry (aerospace, medical devices, automotive), reference the applicable standards in your experience bullets: FAR 25, FDA 21 CFR 820, ISO 13485, IATF 16949. This signals domain fluency to hiring managers.',
    },
  ],
  checklist: [
    'PE license or EIT/FE status displayed prominently in the header and professional summary',
    'CAD software listed with complexity indicators: part count, assembly size, or specific application area',
    'FEA/CFD analysis experience described with loading conditions, validation methods, and design outcomes',
    'At least 4 bullets quantify impact: cost savings, weight reductions, yield improvements, cycle time',
    'Manufacturing process knowledge demonstrated: CNC, injection molding, sheet metal, additive manufacturing',
    'GD&T proficiency referenced with applicable standard (ASME Y14.5) and practical examples',
    'Patents listed with patent numbers and one-line descriptions of the invention',
    'Industry standards and codes referenced (ASME, ISO, SAE, FDA, FAR) where applicable',
    'Technical skills organized by category: CAD, simulation, manufacturing, programming, standards',
    'Resume is one to two pages with clean, single-column, ATS-friendly formatting',
  ],
  commonMistakes: [
    'Listing CAD software without indicating the complexity of your work — "Proficient in SolidWorks" tells a hiring manager nothing about whether you model simple brackets or 500-part vehicle assemblies.',
    'Omitting manufacturing process knowledge — engineers who only show design skills without DFM, GD&T, or shop-floor awareness are perceived as theoretical rather than practical.',
    'Failing to quantify engineering impact — "redesigned the bracket" is incomplete; "redesigned the bracket, reducing weight by 38% and annual tooling cost by $95K" demonstrates value.',
    'Not mentioning PE licensure status — even if you only hold EIT/FE, showing progress toward PE signals long-term professional commitment in industries where licensure matters.',
    'Using an overly creative or graphical resume format — engineering hiring managers expect the same precision and clarity in your resume that they expect in your technical documentation.',
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
    'software-engineer-resume',
    'architect-resume',
  ],
  updatedAt: '2025-01-15',
}

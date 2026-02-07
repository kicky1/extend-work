import type { UseCase } from '../../types'

export const webDeveloperResume: UseCase = {
  slug: 'web-developer-resume',
  category: 'resume-by-role',
  title: 'Web Developer Resume Guide',
  metaTitle: 'Web Developer Resume: Expert Guide [2025]',
  metaDescription:
    'Build a web developer resume that highlights your front-end and full-stack skills, framework expertise, and portfolio projects. Covers React, Next.js, responsive design, and accessibility.',
  subtitle:
    'Stand out in a competitive market with a resume that demonstrates your front-end mastery, performance optimization skills, and commitment to building accessible, production-ready web applications.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Distinguish between front-end, back-end, and full-stack expertise clearly — hiring managers filter candidates by specialization before reading further.',
    'Include links to your portfolio site, GitHub profile, and 2-3 deployed projects that showcase your best work.',
    'Quantify your impact with performance metrics: Lighthouse scores improved, page load times reduced, Core Web Vitals optimized, or user engagement increased.',
    'Demonstrate accessibility knowledge (WCAG 2.1 AA compliance) and responsive design proficiency — these are increasingly non-negotiable requirements.',
  ],
  sections: [
    {
      title: 'Defining Your Developer Profile and Tech Stack',
      body: `<p>Web development encompasses a broad spectrum of specializations, and your resume must <strong>immediately clarify what kind of developer you are</strong>. A vague "web developer" title forces the recruiter to guess, while a specific profile creates instant alignment.</p>
<p>In your professional summary, establish your specialization and primary tech stack:</p>
<ul>
  <li><strong>Front-end developer:</strong> "Front-end developer with 5 years of experience building responsive, accessible web applications using React, TypeScript, and Next.js. Focused on performance optimization and component library development."</li>
  <li><strong>Full-stack developer:</strong> "Full-stack developer experienced in building end-to-end web applications with React/Next.js front-ends and Node.js/Express back-ends, deployed on AWS with CI/CD pipelines."</li>
  <li><strong>Back-end focused:</strong> "Web developer specializing in API design, database architecture, and server-side rendering with Node.js, PostgreSQL, and Redis."</li>
</ul>
<p>Organize your technical skills into clear categories that map to the job description:</p>
<ul>
  <li><strong>Languages:</strong> HTML5, CSS3, JavaScript (ES2024+), TypeScript, Python, PHP</li>
  <li><strong>Frameworks & Libraries:</strong> React, Next.js, Vue.js, Svelte, Tailwind CSS, Styled Components</li>
  <li><strong>Back-end & APIs:</strong> Node.js, Express, GraphQL, REST, tRPC, Prisma</li>
  <li><strong>Tools & Infrastructure:</strong> Git, Webpack/Vite, Docker, Vercel, AWS (S3, Lambda, CloudFront), GitHub Actions</li>
</ul>`,
      tip: 'If the job posting lists a specific framework (e.g., "Vue.js experience required"), make sure that framework appears in both your skills section and at least one experience bullet — ATS systems check for keyword presence in context.',
    },
    {
      title: 'Showcasing Projects with Measurable Impact',
      body: `<p>For web developers, your project work is often more persuasive than your job titles. Structure your experience bullets and project descriptions around <strong>what you built, how you built it, and what measurable impact it delivered</strong>.</p>
<ul>
  <li><strong>E-commerce:</strong> "Built a headless e-commerce storefront using Next.js 14, Shopify Storefront API, and Tailwind CSS. Achieved a 95+ Lighthouse performance score and increased mobile conversion rate by 23%."</li>
  <li><strong>SaaS platform:</strong> "Developed the front-end dashboard for a B2B analytics platform using React, TypeScript, and D3.js. Implemented real-time data visualization handling 10,000+ data points with sub-100ms render times."</li>
  <li><strong>Content platform:</strong> "Migrated a WordPress blog with 500+ articles to a Next.js static site with MDX, reducing average page load time from 4.2s to 0.8s and improving organic search traffic by 40%."</li>
  <li><strong>Internal tools:</strong> "Designed and built an internal admin panel using React, React Query, and a Node.js/PostgreSQL back-end, replacing a legacy PHP system and reducing data entry time by 60%."</li>
</ul>
<p>For each project, include the <strong>tech stack used, your specific role and contributions, and at least one quantified outcome</strong>. If you worked on a team, specify your individual contribution to avoid overstating scope.</p>`,
    },
    {
      title: 'Demonstrating Performance Optimization and Core Web Vitals',
      body: `<p>Web performance is no longer a nice-to-have — it directly impacts SEO rankings, user engagement, and conversion rates. Demonstrating <strong>performance optimization expertise</strong> on your resume signals that you build production-ready applications, not just prototypes.</p>
<ul>
  <li><strong>Core Web Vitals:</strong> "Optimized LCP from 4.1s to 1.2s through image optimization (WebP/AVIF, lazy loading, responsive srcset), critical CSS inlining, and server-side rendering improvements."</li>
  <li><strong>Bundle optimization:</strong> "Reduced JavaScript bundle size by 45% through code splitting, tree shaking, and migrating from Webpack to Vite, improving TTI by 2.3 seconds on mobile devices."</li>
  <li><strong>Caching and CDN:</strong> "Implemented edge caching strategy using Cloudflare Workers and stale-while-revalidate patterns, reducing server response time by 70% and cutting infrastructure costs by $2,400/month."</li>
  <li><strong>Rendering strategies:</strong> "Architected a hybrid rendering approach using Next.js ISR for product pages and SSR for search results, balancing freshness requirements with performance targets."</li>
</ul>
<p>Reference specific Lighthouse scores, WebPageTest results, or Core Web Vitals improvements whenever possible. "Improved Lighthouse performance score from 42 to 96" is concrete evidence that speaks louder than claiming you "care about performance."</p>`,
      tip: 'If you have experience with performance monitoring tools (Datadog RUM, Sentry Performance, SpeedCurve, or Chrome UX Report), mention them — they show you measure performance in production, not just in development.',
    },
    {
      title: 'Highlighting Accessibility and Responsive Design',
      body: `<p>Accessibility (a11y) compliance is increasingly a legal requirement and a core engineering expectation. Web developers who can build <strong>WCAG 2.1 AA-compliant interfaces</strong> have a significant competitive advantage in the job market.</p>
<ul>
  <li><strong>Standards knowledge:</strong> "Ensured WCAG 2.1 AA compliance across all customer-facing pages, including keyboard navigation, screen reader compatibility, proper ARIA labeling, and sufficient color contrast ratios."</li>
  <li><strong>Testing tools:</strong> Mention specific tools — axe-core, Lighthouse Accessibility audit, WAVE, NVDA, VoiceOver — to demonstrate that you test rather than assume compliance.</li>
  <li><strong>Responsive design:</strong> "Implemented mobile-first responsive layouts supporting breakpoints from 320px to 2560px, achieving consistent UX across iOS Safari, Chrome Android, and desktop browsers."</li>
  <li><strong>Component architecture:</strong> "Built an accessible component library with 40+ components following WAI-ARIA design patterns, including combobox, dialog, tabs, and data table — reducing accessibility defects by 75% across 3 product teams."</li>
</ul>
<p>If you've remediated accessibility issues to meet legal compliance deadlines (ADA, Section 508, European Accessibility Act), describe the scope and timeline. "Led accessibility remediation of a 200-page e-commerce site to meet ADA compliance within a 6-week deadline" demonstrates both technical skill and project execution under pressure.</p>`,
    },
    {
      title: 'Portfolio, GitHub, and Online Presence',
      body: `<p>Web developer resumes benefit from something most other professions lack: the ability to <strong>show your work directly</strong>. A well-curated online presence can be more persuasive than any bullet point on your resume.</p>
<ul>
  <li><strong>Portfolio site:</strong> Build and host your own portfolio — it is itself a demonstration of your skills. Include 3-5 projects with live demos, source code links, technology descriptions, and your specific role on each.</li>
  <li><strong>GitHub profile:</strong> Ensure your GitHub has a professional README, pinned repositories showcasing your best work, and meaningful commit history. Recruiters check contribution graphs and code quality.</li>
  <li><strong>Live deployments:</strong> Hosted projects on Vercel, Netlify, or AWS demonstrate that you can deploy and maintain production applications, not just push code to a repository.</li>
  <li><strong>Technical writing:</strong> Blog posts about technical challenges you solved, architecture decisions you made, or technologies you evaluated add credibility and improve your discoverability in recruiter searches.</li>
</ul>
<p>Place your portfolio URL, GitHub link, and LinkedIn profile in your resume header alongside your contact information. Use hyperlinks in your PDF so reviewers can click through directly. If a recruiter has to search for your work, most won't bother.</p>`,
      tip: 'Make sure every project in your portfolio loads quickly and works on mobile — hiring managers will judge your portfolio site with the same standards they apply to production work.',
    },
  ],
  checklist: [
    'Professional summary clearly defining your specialization (front-end, full-stack, back-end)',
    'Technical skills organized by category and aligned with job description keywords',
    'At least 3 project descriptions with tech stack, your role, and quantified outcomes',
    'Performance optimization achievements documented with specific metrics (Lighthouse scores, load times)',
    'Accessibility experience described with WCAG standards and testing tools used',
    'Responsive design proficiency demonstrated with device and browser coverage',
    'Portfolio URL, GitHub profile, and LinkedIn link in the resume header',
    'Live deployed projects accessible and functional for recruiter review',
    'Single-column, ATS-friendly PDF format with clean, developer-appropriate styling',
    'File named professionally: FirstName_LastName_Web_Developer_Resume.pdf',
  ],
  commonMistakes: [
    'Listing every technology you have ever touched instead of curating for the target role — a bloated skills section suggests you are a generalist who lacks depth in any area.',
    'Omitting links to portfolio, GitHub, or live projects — web development is a visual, demonstrable profession, and resumes without links seem incomplete to reviewers.',
    'Describing what you built without quantifying the impact — "Built a React dashboard" is a duty; "Built a React dashboard that reduced data analysis time by 50% for a team of 15 analysts" is an achievement.',
    'Ignoring accessibility and performance entirely — these are core competencies in modern web development, and their absence from your resume signals outdated practices.',
    'Using a visually complex resume template with multi-column layouts, custom graphics, or JavaScript-rendered PDFs that break ATS parsing — ironic for a developer, but extremely common.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'software-engineer-resume',
    'ux-designer-resume',
    'devops-engineer-resume',
  ],
  updatedAt: '2025-01-15',
}

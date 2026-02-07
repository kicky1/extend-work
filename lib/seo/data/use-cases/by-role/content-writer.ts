import type { UseCase } from '../../types'

export const contentWriterResume: UseCase = {
  slug: 'content-writer-resume',
  category: 'resume-by-role',
  title: 'Content Writer Resume Guide',
  metaTitle: 'Content Writer Resume: Expert Guide [2025]',
  metaDescription:
    'Create a content writer resume that highlights SEO expertise, portfolio links, and measurable content performance. Covers strategy, brand voice, analytics, and formatting best practices.',
  subtitle:
    'Show hiring managers you can drive traffic, engage audiences, and align content with business goals — not just write well.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Include a portfolio link in your resume header — no portfolio means no interview for most content roles.',
    'Quantify your content performance with traffic, conversion, and engagement metrics rather than just listing content types.',
    'Demonstrate SEO expertise by referencing keyword research, SERP rankings, and organic growth percentages.',
    'Showcase versatility across content formats (blog posts, whitepapers, email campaigns, social copy) while emphasizing depth in your strongest area.',
  ],
  sections: [
    {
      title: 'Leading with Content Performance Metrics',
      body: `<p>The biggest mistake content writers make on their resumes is treating writing as an art rather than a <strong>business function</strong>. Hiring managers want to see that your words move numbers — traffic, leads, conversions, and revenue.</p>
<p>Use the <em>Content–Channel–Result</em> formula for each bullet:</p>
<ul>
  <li><strong>Content:</strong> Specify the type and volume — "Wrote 8 long-form blog posts per month targeting competitive SaaS keywords."</li>
  <li><strong>Channel:</strong> Name the distribution platform — "Published on company blog, syndicated via LinkedIn and industry newsletters."</li>
  <li><strong>Result:</strong> Quantify the impact — "Grew organic blog traffic from 15K to 85K monthly sessions in 12 months, generating 400+ marketing-qualified leads."</li>
</ul>
<p>If you lack access to downstream conversion data, reference engagement metrics: average time on page, social shares, email open rates, or search ranking improvements. Even "Ranked 6 articles on page 1 of Google for target keywords within 90 days" is a powerful proof point.</p>`,
      tip: 'Screenshot your Google Analytics or Search Console data before leaving a role. You will need these numbers for your resume, and you lose access after departure.',
    },
    {
      title: 'Building a Portfolio Section That Gets Clicks',
      body: `<p>Your portfolio is the single most important element on a content writer resume. It is the equivalent of a developer's GitHub profile — <strong>verifiable proof of your ability</strong>.</p>
<ul>
  <li><strong>Link placement:</strong> Put your portfolio URL in the resume header, right next to your email and LinkedIn. Do not bury it at the bottom.</li>
  <li><strong>Curation over quantity:</strong> Feature 8-12 of your best pieces, not everything you have ever written. Organize by content type or industry vertical.</li>
  <li><strong>Context per piece:</strong> For each portfolio sample, include a one-line note: the goal of the piece, your role (sole author vs. editor), and a performance metric if available.</li>
  <li><strong>Format diversity:</strong> Include a mix of blog posts, landing pages, email sequences, whitepapers, or case studies to demonstrate range.</li>
</ul>
<p>If your published work is behind a paywall or the company blog has been taken down, use a personal website with PDFs or screenshots. Clipping services like Contently or Journo Portfolio work well as hosted solutions. Never submit a resume for a writing role without a link to your work.</p>`,
    },
    {
      title: 'Showcasing SEO and Content Strategy Skills',
      body: `<p>Modern content writing is inseparable from SEO and content strategy. Hiring managers increasingly expect writers to <strong>own the entire content lifecycle</strong> — from keyword research to publication to performance analysis.</p>
<ul>
  <li><strong>Keyword research:</strong> "Conducted keyword research using Ahrefs and SEMrush, identifying 50+ content opportunities with combined monthly search volume of 120K."</li>
  <li><strong>Content strategy:</strong> "Developed a quarterly editorial calendar aligned with product launches and seasonal demand, increasing content output by 60% without additional headcount."</li>
  <li><strong>On-page SEO:</strong> "Optimized 80+ existing blog posts for search intent, internal linking, and structured data — improving average position from 14 to 5 for target keywords."</li>
  <li><strong>Content audits:</strong> "Led a full-site content audit of 300+ pages, consolidating thin content and updating outdated posts, resulting in a 25% increase in domain authority."</li>
</ul>
<p>List your SEO tool proficiency in a dedicated skills section: Ahrefs, SEMrush, Clearscope, SurferSEO, Google Search Console, Google Analytics, Screaming Frog. These are ATS keywords that recruiters actively search for.</p>`,
      tip: 'If you are transitioning from journalism or creative writing, emphasize your research and interviewing skills — these translate directly to thought-leadership and subject-matter-expert content.',
    },
    {
      title: 'Demonstrating Brand Voice and Editorial Excellence',
      body: `<p>Companies hire content writers not just for output volume but for the ability to <strong>internalize and execute a brand voice</strong> consistently across channels and content types. Your resume should demonstrate editorial judgment and adaptability.</p>
<ul>
  <li><strong>Brand voice development:</strong> "Created the brand voice and style guide for a Series B fintech startup, establishing tone, terminology, and formatting standards adopted by a 12-person marketing team."</li>
  <li><strong>Multi-format fluency:</strong> "Produced content across 6 formats — blog posts, gated whitepapers, email nurture sequences, product release notes, social media copy, and webinar scripts."</li>
  <li><strong>Editorial process:</strong> "Managed end-to-end editorial workflow from brief to publication using Asana and Google Docs, maintaining a 95% on-time delivery rate across 40+ pieces per month."</li>
  <li><strong>Stakeholder collaboration:</strong> "Partnered with subject-matter experts (engineers, product managers, data scientists) to produce technical content, conducting 200+ interviews over 2 years."</li>
</ul>
<p>If you have experience managing other writers, freelancers, or an editorial calendar, include this. It signals leadership readiness and the ability to scale content operations beyond your individual output.</p>`,
    },
    {
      title: 'Formatting Your Content Writer Resume',
      body: `<p>A content writer's resume is itself a writing sample. Sloppy formatting, typos, or unclear structure will disqualify you faster than in almost any other profession. Treat every word on the page as an audition.</p>
<ul>
  <li>Use crisp, concise language — if you cannot write a tight resume, employers will doubt your ability to write tight copy.</li>
  <li>Stick to a single-column layout with generous white space. Creative layouts can work for content roles, but ATS compatibility must come first.</li>
  <li>Include a "Tools & Skills" section listing: CMS platforms (WordPress, Webflow, Contentful), SEO tools, analytics platforms, project management tools, and content types you specialize in.</li>
  <li>Proofread obsessively — a single typo on a writer's resume is a dealbreaker. Have at least two other people review it.</li>
</ul>
<p>Export as PDF and name the file <code>FirstName_LastName_ContentWriter_Resume.pdf</code>. Keep it to one page unless you have 8+ years of experience or significant editorial leadership roles. Your portfolio does the heavy lifting — the resume gets you to the portfolio.</p>`,
    },
  ],
  checklist: [
    'Portfolio URL prominently placed in the resume header',
    'Professional summary specifies content niche, experience level, and headline performance metric',
    'Experience bullets quantify traffic, conversions, rankings, or engagement metrics',
    'SEO skills section includes specific tools: Ahrefs, SEMrush, Google Search Console, Clearscope',
    'Content types listed: blog, whitepaper, email, social, landing pages, case studies',
    'Editorial workflow and CMS proficiency mentioned (WordPress, Webflow, Contentful)',
    'Brand voice and style guide experience highlighted if applicable',
    'Cross-functional collaboration with design, product, or sales teams referenced',
    'Zero typos and grammatical errors — proofread by at least two people',
    'Single-column ATS-friendly layout, exported as PDF, with clean formatting as a writing sample',
  ],
  commonMistakes: [
    'Submitting a resume without a portfolio link — for content roles this is an automatic disqualification, regardless of how strong your experience section reads.',
    'Listing content types without performance data — "Wrote blog posts and emails" tells the reader nothing; "Wrote weekly blog posts that averaged 4,500 organic sessions each" shows impact.',
    'Ignoring SEO entirely — even if you consider yourself a "creative writer," most content hiring managers expect baseline SEO literacy and keyword awareness.',
    'Using an overly designed or visually complex resume template that prioritizes aesthetics over readability and ATS parsing.',
    'Writing a resume full of long, dense paragraphs instead of scannable bullets — ironic for someone whose job is to write clearly.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'marketing-manager-resume',
    'graphic-designer-resume',
    'ux-designer-resume',
  ],
  updatedAt: '2025-01-15',
}

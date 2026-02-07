import type { Competitor } from '../types'

export const jobscan: Competitor = {
  slug: 'jobscan',
  name: 'Jobscan',
  tagline: 'ATS resume optimization scanner and job search tools',
  website: 'https://jobscan.co',
  foundedYear: 2014,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '5 resume scans per month',
        'Basic match rate',
        'Keyword comparison',
        'Limited formatting tips',
      ],
    },
    {
      name: 'Pro',
      price: 49.99,
      period: 'month',
      features: [
        'Unlimited resume scans',
        'Full match rate analysis',
        'ATS-specific tips',
        'Cover letter optimization',
        'LinkedIn profile optimization',
        'Recruiter insights',
        'Power Edit (AI rewriting)',
      ],
    },
    {
      name: 'Pro - Quarterly',
      price: 29.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Billed quarterly at $89.97',
      ],
    },
    {
      name: 'Pro - Annual',
      price: 16.58,
      period: 'month',
      features: [
        'Everything in Pro',
        'Billed annually at $199',
        'Job tracker',
        'Interview prep',
      ],
    },
  ],
  features: {
    aiResumeBuilder: false,
    atsOptimization: true,
    aiJobMatching: 'partial',
    emailIntegration: false,
    calendarIntegration: false,
    coverLetterBuilder: 'partial',
    interviewPrep: 'partial',
    multipleTemplates: false,
    pdfExport: false,
    docxExport: false,
    aiWritingAssistant: 'partial',
    customDomain: false,
    analytics: true,
    teamFeatures: false,
  },
  ratings: [
    {
      platform: 'Trustpilot',
      score: 4.2,
      reviewCount: 3100,
      url: 'https://www.trustpilot.com/review/jobscan.co',
    },
    {
      platform: 'G2',
      score: 4.4,
      reviewCount: 110,
      url: 'https://www.g2.com/products/jobscan/reviews',
    },
  ],
  pros: [
    'Industry-leading ATS optimization analysis with detailed keyword breakdown',
    'Shows exactly which keywords are missing and their importance weight',
    'LinkedIn profile optimization scanning feature is unique',
    'Understands specifics of different ATS platforms (Taleo, Greenhouse, Lever)',
    'Power Edit feature can rewrite bullet points to include target keywords',
  ],
  cons: [
    'Not a resume builder — you need to create your resume elsewhere first',
    'Expensive at $49.99/month for a scanning tool, even if powerful',
    'Free tier limited to only 5 scans per month, which is quickly exhausted',
    'Focuses narrowly on ATS optimization without broader career support',
    'No email or calendar integration for managing applications',
  ],
  bestFor:
    'Job seekers who already have a resume and want the most thorough ATS optimization analysis available to maximize their interview callback rate.',
  detailedBreakdown: `Jobscan occupies a unique niche in the job search tools market. Unlike Resume.io, Zety, or Novoresume, it is not a resume builder at all. Instead, it is an optimization scanner: you paste in your existing resume and a job description, and Jobscan analyzes how well they match. The result is a detailed breakdown showing your match rate percentage, missing hard skills, missing soft skills, keyword frequency comparisons, and formatting issues that might trip up specific ATS platforms. This analysis is genuinely best-in-class — no other tool provides this depth of ATS-specific insight.

What makes Jobscan's analysis particularly valuable is its understanding of different ATS platforms. The tool recognizes whether an employer uses Taleo, Greenhouse, Lever, Workday, or other systems, and tailors its formatting recommendations accordingly. For example, it knows that Taleo handles multi-column layouts differently than Greenhouse, or that certain date formats parse better in specific systems. This ATS-specific knowledge is something that general resume builders simply do not offer.

The keyword analysis goes beyond simple matching. Jobscan weights keywords by importance — distinguishing between must-have requirements mentioned in the job title and description versus nice-to-haves buried in the qualifications section. It shows you not just which keywords are missing, but how many times they appear in the job description and how many times they appear in your resume. The Power Edit feature, available on paid plans, can rewrite your bullet points to naturally incorporate missing keywords, which is useful but not as sophisticated as a full AI writing assistant.

The main limitation is that Jobscan is fundamentally a diagnostic tool, not a creation tool. You still need to build your resume somewhere else — in Word, Google Docs, or another resume builder — and then bring it to Jobscan for analysis. This creates a fragmented workflow where you are constantly switching between tools. Make changes, re-upload, re-scan, identify new gaps, switch back to your editor. Extend Career eliminates this loop by building ATS optimization directly into the resume creation process, so you can see match scores and keyword suggestions as you write.

LinkedIn profile optimization is a standout feature that few competitors offer. Jobscan scans your LinkedIn headline, summary, and experience against target job descriptions and suggests improvements. Given that recruiters heavily use LinkedIn for sourcing, this is genuinely valuable.

Jobscan's pricing is aggressive for what is essentially a scanning service. At $49.99/month for the Pro plan, it costs more than most full-featured resume builders. The free tier's 5 monthly scans get used up fast when you are actively applying — tailoring a resume to each application means scanning multiple times per job. The quarterly and annual plans bring the cost down, but you are still paying a premium for analysis without getting document creation, job tracking, email integration, or calendar sync.

For users who already have a strong resume and just want to maximize their ATS performance, Jobscan delivers. But for anyone who needs help writing their resume, managing their job search, or handling the full application lifecycle, Jobscan is only one piece of the puzzle. Extend Career combines ATS optimization with a conversational AI resume builder, AI job matching with compatibility scores, Gmail and Outlook inbox sync, and Google Calendar integration for interview tracking — all in a single platform at $19.99/month.`,
  quickVerdict:
    'Jobscan is the gold standard for ATS optimization analysis, but it is a diagnostic tool, not a resume builder or job search platform. Extend Career builds ATS optimization directly into its AI resume builder and adds AI job matching, Gmail and Outlook sync, and Google Calendar integration that Jobscan lacks.',
  whyPeopleSwitch: [
    'Tired of the fragmented workflow of building elsewhere and scanning in Jobscan',
    'Expensive for a tool that only analyzes but does not help create resumes',
    'Free tier of 5 scans per month is insufficient for active job seekers',
    'Want ATS optimization built into the resume creation process, not as a separate step',
    'Need job tracking and application management alongside optimization',
  ],
  faqs: [
    {
      question: 'Can Jobscan build my resume for me?',
      answer:
        'No. Jobscan is a resume scanning and analysis tool, not a builder. You need to create your resume in another tool (Word, Google Docs, or a resume builder) and then upload it to Jobscan for ATS optimization analysis. Extend Career combines both — it builds your resume with AI assistance and optimizes it for ATS in real-time as you write, eliminating the need for a separate scanning step.',
    },
    {
      question:
        'Is Jobscan worth the price compared to Extend Career?',
      answer:
        'Jobscan Pro costs $49.99/month for scanning and analysis features. This is expensive considering you still need a separate resume builder and other job search tools. Extend Career at $19.99/month includes ATS optimization as part of its resume builder, plus a conversational AI writing assistant, AI job matching, Gmail and Outlook sync, and Google Calendar integration for interview tracking.',
    },
    {
      question: 'How accurate is Jobscan ATS match score?',
      answer:
        'Jobscan match scores are well-regarded in the industry and based on analysis of how major ATS platforms (Taleo, Greenhouse, Lever, Workday) actually parse resumes. The keyword analysis is thorough and the ATS-specific formatting tips are genuinely useful. However, a high match score does not guarantee an interview — hiring managers also evaluate quality, relevance, and impact of your experience beyond keyword matching.',
    },
    {
      question:
        'Does Jobscan help with anything besides resume scanning?',
      answer:
        'Beyond resume scanning, Jobscan offers LinkedIn profile optimization, a basic cover letter scanner, and on annual plans, a job tracker and interview prep module. However, these additional features are less developed than the core scanning tool. The job tracker is basic compared to dedicated tools like Teal or Extend Career, and the interview prep is limited to general tips rather than personalized preparation.',
    },
    {
      question:
        'Can I use Jobscan and Extend Career together?',
      answer:
        'You can, but it is usually unnecessary. Extend Career builds ATS optimization directly into the resume creation process, analyzing job descriptions and optimizing your content as you write. If you want a second opinion on your ATS readiness, you could scan your Extend Career resume in Jobscan, but most users find that Extend Career optimization handles their needs without the additional cost of a Jobscan subscription.',
    },
  ],
  relatedSlugs: ['teal', 'resume-io', 'zety', 'novoresume'],
  updatedAt: '2026-02-07',
}

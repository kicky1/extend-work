import type { Competitor } from '../types'

export const zety: Competitor = {
  slug: 'zety',
  name: 'Zety',
  tagline: 'AI-powered resume and cover letter builder with expert tips',
  website: 'https://zety.com',
  foundedYear: 2016,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Resume editor access',
        'Limited templates',
        'No downloads',
        'Preview only',
      ],
    },
    {
      name: 'Monthly',
      price: 23.99,
      period: 'month',
      features: [
        'Unlimited downloads',
        'All templates',
        'Cover letter builder',
        'PDF and TXT export',
        'AI content suggestions',
      ],
    },
    {
      name: 'Quarterly',
      price: 17.99,
      period: 'month',
      features: [
        'Everything in monthly',
        'Billed quarterly at $53.97',
        'Website and online resume',
      ],
    },
    {
      name: 'Annual',
      price: 11.99,
      period: 'month',
      features: [
        'Everything in quarterly',
        'Billed annually at $143.88',
        'Priority support',
      ],
    },
  ],
  features: {
    aiResumeBuilder: true,
    atsOptimization: 'partial',
    aiJobMatching: false,
    emailIntegration: false,
    calendarIntegration: false,
    coverLetterBuilder: true,
    interviewPrep: 'partial',
    multipleTemplates: true,
    pdfExport: true,
    docxExport: false,
    aiWritingAssistant: true,
    customDomain: false,
    analytics: false,
    teamFeatures: false,
  },
  ratings: [
    {
      platform: 'Trustpilot',
      score: 4.5,
      reviewCount: 6200,
      url: 'https://www.trustpilot.com/review/zety.com',
    },
    {
      platform: 'G2',
      score: 4.4,
      reviewCount: 190,
      url: 'https://www.g2.com/products/zety/reviews',
    },
  ],
  pros: [
    'Strong AI writing assistant that generates role-specific bullet points',
    'Extensive career content library with resume examples for 500+ job titles',
    'Cover letter builder with matching templates to resume designs',
    'Built-in resume checker that scores your document and suggests improvements',
    'Clean, professional templates that are widely recognized as ATS-safe',
  ],
  cons: [
    'Free plan lets you build a resume but blocks you from downloading it',
    'No DOCX export — only PDF and TXT formats available',
    'Completely lacks job search features like tracking, matching, or scheduling',
    'ATS optimization is limited to general formatting rules, not job-specific tailoring',
    'Annual plan is required to get a reasonable per-month price',
  ],
  bestFor:
    'Job seekers who want strong AI-powered writing suggestions and a polished resume builder with career content guidance.',
  detailedBreakdown: `Zety is one of the most well-known resume builders on the market, and for good reason — its AI writing assistant is genuinely useful for generating professional bullet points. When you enter a job title, Zety pulls from a database of expert-written content suggestions specific to that role, giving you a strong starting point that you can customize. This is a step above tools like Resume.io that rely on generic phrase banks, though it still falls short of true AI that can analyze a specific job description and tailor your content accordingly.

The resume checker feature is one of Zety's standout tools. After you finish building your resume, the checker scores it on criteria like word choice, measurable results, section completeness, and formatting. It then provides specific suggestions for improvement. While this is helpful, the analysis is formulaic — it follows the same rubric for every resume rather than understanding the nuances of your target role or industry. Extend Career's AI takes a fundamentally different approach by analyzing the actual job posting you are targeting and tailoring suggestions to match what that specific employer is looking for.

Zety's pricing model has drawn criticism for its paywall approach. You can spend 30 minutes building your entire resume in the editor, only to discover at the download step that you need a paid subscription. The monthly rate of $23.99 is high for a resume builder, and the free plan is essentially a try-before-you-buy demo with no actual output. This is a deliberate conversion strategy, but it frustrates users who expected to get a free resume.

The cover letter builder deserves recognition — it walks you through creating a cover letter step by step and offers AI-generated paragraphs tailored to common job scenarios. The templates match the resume designs, creating a cohesive application package. However, like the resume builder, it does not analyze specific job postings.

Where Zety clearly falls short is in the broader job search workflow. There is no job tracking, no application management, no email integration, and no calendar sync. You build your documents and then you are on your own. For someone actively managing dozens of applications across multiple job boards, this gap becomes a real productivity problem. Extend Career addresses this by combining intelligent document creation with job search management tools — Gmail and Outlook inbox sync for managing recruiter conversations, Google Calendar integration for interview tracking, and AI job matching with compatibility scores — creating a single platform for the entire job search process rather than just the document creation step.

The career content library, featuring resume examples and writing guides for over 500 job titles, is a valuable resource for inspiration. But static examples cannot replace dynamic AI that understands your unique background and adapts to each application.`,
  quickVerdict:
    'Zety offers a capable AI writing assistant and resume checker, but its paywall approach and lack of job search management features limit its value. Extend Career provides conversational AI for job-specific tailoring plus email inbox sync, calendar integration, and AI job matching that Zety completely lacks.',
  whyPeopleSwitch: [
    'Frustrated by building a full resume only to hit a paywall at download',
    'AI suggestions are role-generic, not tailored to specific job descriptions',
    'No job tracking or application management to organize their search',
    'Missing DOCX export format that some employers require',
    'Want a unified platform for resume building AND job search management',
  ],
  faqs: [
    {
      question: 'Can I download my resume from Zety for free?',
      answer:
        'No. Zety lets you use the resume editor for free, but downloading your finished resume in any format requires a paid subscription. The cheapest option is the monthly plan at $23.99. This is a common frustration among users who invest time building their resume before discovering the paywall. Extend Career provides a more transparent approach to pricing with clear feature access at each tier.',
    },
    {
      question:
        'How does Zety AI compare to Extend Career AI for resume writing?',
      answer:
        'Zety generates role-specific content suggestions from a database of expert-written bullet points for hundreds of job titles. This gives you a solid starting point, but the suggestions are the same regardless of which specific job you are applying to. Extend Career uses a conversational AI assistant that can analyze job descriptions and generate tailored content — rewriting sections, adding experience, and adjusting tone directly on your document through natural chat.',
    },
    {
      question: 'Does Zety help with job applications beyond the resume?',
      answer:
        'Zety offers a cover letter builder and some interview prep content in their career blog, but does not provide any job application management tools. There is no job tracking, no email integration, and no calendar features. Extend Career provides Gmail and Outlook inbox sync, interview tracking with Google Calendar integration, and AI job matching alongside resume and cover letter building.',
    },
    {
      question: 'Is Zety better than Extend Career for ATS optimization?',
      answer:
        'Zety focuses on general ATS formatting best practices — clean layouts, standard section headings, and readable fonts. Its resume checker scores formatting compliance but does not analyze whether your content matches a specific job description. Extend Career includes a resume checker that scores your CV on completeness, quality, and ATS compatibility — and lets you paste a specific job description to get a targeted match score with keyword analysis.',
    },
    {
      question: 'Does Zety offer DOCX export for my resume?',
      answer:
        'No, Zety only supports PDF and TXT export formats. Some employers and applicant tracking systems specifically request DOCX files, which can be a problem. Extend Career supports both PDF and DOCX exports, ensuring you can submit your resume in whatever format is required.',
    },
  ],
  relatedSlugs: ['resume-io', 'novoresume', 'teal', 'jobscan'],
  updatedAt: '2026-02-07',
}

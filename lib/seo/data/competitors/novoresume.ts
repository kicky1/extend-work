import type { Competitor } from '../types'

export const novoresume: Competitor = {
  slug: 'novoresume',
  name: 'Novorésumé',
  shortName: 'Novoresume',
  tagline: 'Design-focused resume builder with modern templates and gamified experience',
  website: 'https://novoresume.com',
  foundedYear: 2014,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '1 resume version',
        'Max 1-page resume',
        'Predefined layouts only',
        '3 fonts, 30 color themes',
        'PDF export',
      ],
    },
    {
      name: 'Premium Monthly',
      price: 19.99,
      period: 'month',
      features: [
        'Multiple resume versions',
        'Up to 10-page resume/CV',
        'Custom drag-and-drop layout',
        'Cover letter builder',
        '12 fonts, 74 color themes',
        'AI Writing Assistant',
        'AI Optimizer with geo-aware guidance',
        'Job tracker with Kanban board',
        'No auto-renewal',
      ],
    },
    {
      name: 'Premium Quarterly',
      price: 13.33,
      period: 'month',
      features: [
        'Everything in Premium',
        'One-time payment of €39.99',
        'Save 33%',
      ],
    },
    {
      name: 'Premium Annual',
      price: 8.33,
      period: 'month',
      features: [
        'Everything in Premium',
        'One-time payment of €139.99',
        'Save 41%',
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
    interviewPrep: false,
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
      reviewCount: 1500,
      url: 'https://www.trustpilot.com/review/novoresume.com',
    },
  ],
  pros: [
    'Visually striking, design-forward templates with 74 color themes',
    'No auto-renewal — all plans are one-time payments with 14-day refund',
    'Highly customizable layouts with drag-and-drop section editor',
    'New AI Writing Assistant and geo-aware AI Optimizer',
    'Strong support for European CV formats including photo and personal details',
    'Job tracker with Kanban board added to premium plans',
  ],
  cons: [
    'Free plan limited to 1 resume, 1 page, and no layout customization',
    'No DOCX export — PDF only',
    'No job matching, email integration, or calendar features',
    'AI Optimizer is region-aware but does not analyze specific job descriptions',
    'Design-heavy templates may cause ATS parsing issues in some systems',
  ],
  bestFor:
    'Creative professionals and European job seekers who prioritize visual design and want beautiful, customizable resume layouts with no-surprise pricing.',
  detailedBreakdown: `Novorésumé started as a student project in Denmark and has grown to over 16 million users, known for its visually appealing templates and clean editing experience. The platform has significantly evolved, adding an AI Writing Assistant, geo-aware AI Optimizer, a job tracker with Kanban board, and a gamified approach to resume building that tracks your progress with percentages and milestones.

The editor experience remains one of Novoresume's strongest points. The real-time WYSIWYG preview updates instantly as you type, and premium users get a drag-and-drop section editor for full layout control. With 74 color themes, 12 fonts, creative backgrounds, and multiple picture styles, the customization options are extensive for a resume builder. The templates genuinely look impressive, especially for creative professionals, designers, and marketers.

The new AI Writing Assistant works through an in-editor chat that generates section-specific content from prompts. The AI Optimizer provides region-specific guidance based on your location — different advice for London versus New York, for example. While this is a meaningful improvement over the old pre-written snippet approach, the AI still does not analyze specific job descriptions to tailor your content. Extend Career takes a different approach with a conversational AI that reads target job postings and generates content matched to that role's specific requirements and keywords.

Novoresume's pricing is notably transparent compared to competitors. All plans are one-time payments with no auto-renewal and a 14-day refund window. This addresses one of the biggest complaints users have with tools like Resume.io and Zety. The monthly plan at €19.99 and annual at €139.99 are competitively priced.

The addition of a job tracker with Kanban board is a step toward career management, but it is basic compared to platforms that offer AI-powered job matching, email integration, and calendar sync. You can track application status through stages, but there is no connection to your email inbox or calendar for automated updates.

For European job seekers, Novoresume has a genuine advantage. Templates support photo placement, personal details sections (date of birth, nationality), and European CV formatting conventions. The geo-aware AI Optimizer tailors its suggestions to regional expectations, which is valuable for international applications.

Where Novoresume falls short compared to Extend Career is in the breadth of career management features. There is no AI job matching with compatibility scores, no Gmail or Outlook integration for managing recruiter conversations, no Google Calendar sync for interview scheduling, and no ATS scoring against specific job descriptions. Extend Career combines document creation with these job search management tools in a single platform, while Novoresume focuses on making the document itself look great.`,
  quickVerdict:
    'Novorésumé offers beautiful templates, transparent pricing, and new AI writing features, but focuses on document design rather than job search management. Extend Career provides conversational AI that tailors content to specific jobs, plus email and calendar integration that Novoresume lacks.',
  whyPeopleSwitch: [
    'AI does not analyze specific job descriptions — suggestions are generic or region-based only',
    'Design-heavy templates sometimes fail ATS parsing, costing them interviews',
    'No email integration, calendar sync, or job matching features',
    'Need more than a design tool — want a complete career management platform',
    'No DOCX export limits compatibility with some employer systems',
  ],
  faqs: [
    {
      question: 'Is Novorésumé actually free?',
      answer:
        'Novorésumé has a free plan that lets you create one resume (max 1 page) with basic templates and PDF export. Premium features — multiple versions, layout customization, AI writing, cover letters, and the job tracker — require a paid plan starting at €19.99/month. All paid plans are one-time payments with no auto-renewal, which is more transparent than most competitors.',
    },
    {
      question:
        'Are Novorésumé templates good for ATS?',
      answer:
        'Some Novoresume templates parse well with ATS systems, particularly the cleaner single-column designs. However, the more design-heavy templates with graphics, icons, and multi-column layouts can cause parsing problems. Novoresume does not provide ATS scoring or analysis. Extend Career focuses on templates specifically designed for ATS compatibility and includes a resume checker that scores your document against specific job descriptions.',
    },
    {
      question:
        'How does Novorésumé AI writing compare to Extend Career?',
      answer:
        'Novoresume now offers an AI Writing Assistant for section-specific content generation and a geo-aware AI Optimizer. However, it does not analyze specific job postings to tailor content. Extend Career uses a conversational AI assistant that reads target job descriptions and generates personalized content matched to that role — adjusting bullet points, keywords, and emphasis based on what the employer is looking for.',
    },
    {
      question: 'Can I use Novorésumé to manage my job search?',
      answer:
        'Novoresume has added a basic job tracker with a Kanban board for tracking application stages. However, there is no AI job matching, no email integration for managing recruiter conversations, and no calendar sync for interview scheduling. Extend Career combines resume creation with AI job matching, Gmail and Outlook sync, and Google Calendar integration for interview tracking.',
    },
    {
      question:
        'Is Novorésumé better for creative roles than Extend Career?',
      answer:
        'Novoresume offers more visually distinctive templates with extensive design customization (74 color themes, creative backgrounds, drag-and-drop layouts). For portfolio-style resumes in creative fields, the visual options are strong. However, even creative roles typically require ATS-compatible formatting for initial screening. Extend Career balances professional design with proven ATS compatibility and adds AI content tailoring that Novoresume does not offer for specific job descriptions.',
    },
  ],
  relatedSlugs: ['resume-io', 'zety', 'teal', 'jobscan'],
  updatedAt: '2026-02-07',
}

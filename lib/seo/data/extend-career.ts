import type { Competitor } from './types'

export const extendCareer: Competitor = {
  slug: 'extend-career',
  name: 'Extend Career',
  tagline: 'AI-Powered Career Management Platform',
  website: 'https://extendcareer.com',
  foundedYear: 2024,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '3 resumes',
        'Basic templates',
        'PDF export',
      ],
    },
    {
      name: 'Pro',
      price: 19.99,
      period: 'month',
      features: [
        'Unlimited resumes',
        'All premium templates',
        'PDF & DOCX export',
        '500 AI requests/month',
        'ATS optimization',
        'Smart job matching',
        'Gmail & Outlook sync',
        'Priority support',
      ],
    },
  ],
  features: {
    aiResumeBuilder: true,
    atsOptimization: true,
    aiJobMatching: true,
    emailIntegration: true,
    calendarIntegration: true,
    coverLetterBuilder: true,
    interviewPrep: false,
    multipleTemplates: true,
    pdfExport: true,
    docxExport: true,
    aiWritingAssistant: true,
    customDomain: false,
    analytics: true,
    teamFeatures: false,
  },
  ratings: [],
  pros: [
    'All-in-one career platform (resume, jobs, email, calendar)',
    'AI writing assistant built into every feature',
    'ATS optimization with real-time scoring',
    'Smart job matching with compatibility scores',
    'Gmail and Outlook email integration',
    'Interview tracking with calendar sync',
  ],
  cons: [
    'Newer platform with smaller user base',
    'No team or enterprise plan yet',
    'Limited template library compared to design-focused tools',
  ],
  bestFor:
    'Job seekers who want a single AI-powered platform for their entire career journey — from resume building and ATS optimization to job matching, email management, and interview scheduling.',
  detailedBreakdown: `Extend Career is a unified career management platform that combines AI-powered resume building, job matching, email management, and interview tracking into a single workflow. Rather than juggling separate tools for each stage of a job search, everything lives in one place.

The resume builder is the platform's centerpiece. It features a split-screen editor with live preview, 30+ professionally designed templates organized by industry and style, and deep customization options — colors, fonts, layouts, spacing, photo styles, and section ordering are all adjustable. The built-in AI assistant works through a conversational chat interface: you can ask it to generate bullet points, rewrite sections, add new experience entries, or adjust your resume's tone. The AI operates directly on your document, making changes you can see in real-time rather than generating suggestions you need to copy-paste.

The resume checker evaluates your CV across multiple dimensions — completeness, content quality, and ATS compatibility — producing an overall score with section-by-section breakdowns. It identifies specific issues at three severity levels (critical, warning, suggestion) and offers one-click AI auto-fix for each finding. You can also paste a job description to get a targeted match score showing how well your resume aligns with that specific role's requirements and keywords.

Cover letter generation follows a similar AI-driven approach. The rich text editor supports full formatting with live preview, and the AI can draft, rewrite, or tailor cover letters based on your CV and a target job description. From the job matching view, you can generate a cover letter for any listing with one click.

AI job matching analyzes your resume and surfaces relevant positions ranked by compatibility score. Each listing shows which of your skills match and which qualifications you are missing. You can search, filter by match score, salary range, work type, and employment type, save jobs for later, and generate tailored cover letters directly from any listing.

Email management connects your Gmail or Outlook inbox to the platform. You can read, reply, compose, search, and star emails without leaving Extend Career. Pre-built templates for common job search emails — applications, follow-ups, thank-you notes, and interview scheduling — speed up communication.

The interview tracker provides a calendar view with Google Calendar sync. You can schedule interviews (phone, video, or on-site), set times, durations, and timezones, add meeting links and interviewer details, and record outcomes. An AI assistant helps manage your schedule through conversation. The application timeline view shows your full history with each company.

The platform runs on a freemium model: the free tier includes 3 resumes with basic templates and PDF export, while the Pro plan at $19.99/month unlocks unlimited resumes, all templates, AI features, job matching, email sync, and calendar integration.`,
  quickVerdict:
    'Extend Career is an all-in-one AI career platform that combines resume building, ATS optimization, cover letters, job matching, email management, and interview tracking — replacing the need for multiple separate tools.',
  faqs: [
    {
      question: 'What makes Extend Career different from other resume builders?',
      answer:
        'Extend Career is not just a resume builder — it is a complete career management platform. While most competitors focus only on creating resume documents, Extend Career adds AI job matching with compatibility scores, Gmail and Outlook email integration, interview tracking with Google Calendar sync, and an AI cover letter generator. Everything works together in a single workflow instead of requiring separate tools.',
    },
    {
      question: 'How does the AI assistant work in Extend Career?',
      answer:
        'The AI assistant uses a conversational chat interface built into each feature. In the resume builder, you can ask it to generate bullet points, rewrite sections, add experience, or change the tone of your content — and it makes changes directly on your document in real-time. In the cover letter generator, it can draft, rewrite, or tailor letters based on your CV and target job descriptions. The interview tracker also has an AI assistant for managing your schedule through conversation.',
    },
    {
      question: 'Does Extend Career help with ATS optimization?',
      answer:
        'Yes. The resume checker scores your CV on ATS compatibility, identifies missing keywords, flags formatting issues, and offers one-click AI fixes. You can paste a specific job description to get a targeted match score showing how well your resume aligns with that role. The resume builder templates are all designed to parse correctly with applicant tracking systems.',
    },
    {
      question: 'What email providers does Extend Career integrate with?',
      answer:
        'Extend Career integrates with Gmail and Outlook. Once connected, you can read, reply, compose, search, and star emails directly within the platform. Pre-built email templates for job applications, follow-ups, thank-you notes, and interview scheduling are included.',
    },
    {
      question: 'Is Extend Career free to use?',
      answer:
        'Extend Career offers a free plan that includes 3 resumes, basic templates, and PDF export. The Pro plan at $19.99/month unlocks unlimited resumes, all premium templates, PDF and DOCX export, 500 AI requests per month, ATS optimization, smart job matching, and email and calendar integrations.',
    },
  ],
  relatedSlugs: ['resume-io', 'zety', 'novoresume', 'teal', 'jobscan'],
  updatedAt: '2026-02-07',
}

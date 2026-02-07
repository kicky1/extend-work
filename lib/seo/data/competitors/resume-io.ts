import type { Competitor } from '../types'

export const resumeIo: Competitor = {
  slug: 'resume-io',
  name: 'Resume.io',
  tagline: 'Professional resume builder with ATS-friendly templates',
  website: 'https://resume.io',
  foundedYear: 2016,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        '1 resume and 1 cover letter',
        'Limited templates',
        'TXT download only',
        'Limited sharing and analytics',
      ],
    },
    {
      name: '7-Day Trial',
      price: 2.95,
      period: 'month',
      features: [
        'Full premium access',
        'All templates',
        'PDF and DOCX export',
        'AI writing and ATS checker',
        'Auto-renews at $29.95/4 weeks',
      ],
    },
    {
      name: 'Monthly',
      price: 29.95,
      period: 'month',
      features: [
        'Unlimited resumes and cover letters',
        'All premium templates',
        'PDF and DOCX export',
        'AI summary writer and keyword suggestions',
        'ATS resume checker',
        'Job search and application tracker',
        'Auto Apply and resume distribution',
      ],
    },
    {
      name: 'Annual',
      price: 74.95,
      period: 'year',
      features: [
        'Everything in monthly',
        'Best value at ~$6.25/month',
      ],
    },
  ],
  features: {
    aiResumeBuilder: true,
    atsOptimization: true,
    aiJobMatching: 'partial',
    emailIntegration: false,
    calendarIntegration: false,
    coverLetterBuilder: true,
    interviewPrep: false,
    multipleTemplates: true,
    pdfExport: true,
    docxExport: true,
    aiWritingAssistant: true,
    customDomain: false,
    analytics: 'partial',
    teamFeatures: false,
  },
  ratings: [
    {
      platform: 'Trustpilot',
      score: 4.3,
      reviewCount: 54800,
      url: 'https://www.trustpilot.com/review/resume.io',
    },
  ],
  pros: [
    'Large library of professionally designed, ATS-compatible templates',
    'Very intuitive drag-and-drop editor with real-time preview',
    'Supports 20+ languages for international job seekers',
    'New AI keyword suggestions and one-click resume tailoring from job URLs',
    'Auto Apply feature distributes your resume to matching jobs globally',
    'Job search powered by ZipRecruiter built into the platform',
  ],
  cons: [
    'Free plan only allows TXT downloads — PDF and DOCX require payment',
    'Trial auto-renews at $29.95 every 4 weeks without prominent warning',
    'No email or calendar integration for managing your job search',
    'AI writing is improving but still more template-driven than contextual',
    'Difficult cancellation process reported by many users',
  ],
  bestFor:
    'Job seekers who want a polished, template-driven resume with AI writing assistance and built-in job search distribution.',
  detailedBreakdown: `Resume.io has grown into one of the most widely-used online resume builders, with a polished interface and a broad template library. The core experience centers on choosing from professionally designed templates, filling in your details through a guided process, and exporting a polished document. Recent updates have added AI-powered features including a summary writer, keyword suggestions from job postings, and one-click resume tailoring where you paste a job URL and get AI-suggested edits.

The platform now includes an ATS resume checker that scores your document for compatibility with applicant tracking systems. Combined with the AI keyword tool, this represents a significant upgrade from the earlier version that relied solely on pre-written phrase banks. The one-click tailoring feature analyzes a job posting and suggests changes to better align your resume, though the depth of analysis is still more keyword-focused than the contextual AI approach Extend Career uses through its conversational assistant.

Resume.io has also added job search integration powered by ZipRecruiter and an Auto Apply feature that distributes your resume to matching positions globally. This is a step toward becoming more of a career platform, though the job features are more of an add-on than a core experience. There is an application tracker as well, though it is basic compared to dedicated job tracking tools.

The pricing model remains a common frustration point. The $2.95 trial is appealing but auto-renews at $29.95 every 4 weeks — and many users report the cancellation process requires multiple confirmation steps. The free plan now only allows TXT downloads, making it essentially a preview experience. The annual plan at $74.95/year (~$6.25/month) is reasonable value if you commit upfront.

Where Resume.io still falls short compared to Extend Career is in the depth of its AI and the breadth of its integrations. There is no email integration for managing recruiter conversations, no calendar sync for interview scheduling, and the AI works through suggestions rather than a conversational interface that can directly edit your document. Extend Career's AI assistant can generate content, rewrite sections, add entries, and adjust tone through natural conversation — all updating your resume in real-time. Resume.io's approach requires you to accept or reject individual suggestions, which is less fluid.

For job seekers who primarily need a well-designed resume quickly, Resume.io delivers. The template quality and multi-language support are genuine strengths. But for managing the broader job search — tracking applications, handling email, scheduling interviews, and tailoring resumes to specific postings through AI conversation — Extend Career provides a more complete workflow.`,
  quickVerdict:
    'Resume.io has improved with AI keyword suggestions and an ATS checker, but remains primarily a template-based builder. Extend Career offers deeper AI through a conversational assistant, plus email and calendar integration that Resume.io lacks.',
  whyPeopleSwitch: [
    'AI suggestions are keyword-focused rather than contextual to their specific experience',
    'No way to manage recruiter emails or schedule interviews within the platform',
    'Trial auto-renewal and difficult cancellation process',
    'Free plan limited to TXT-only downloads',
    'Want a conversational AI that edits their resume directly, not just suggestions to accept or reject',
  ],
  faqs: [
    {
      question: 'Is Resume.io really free to use?',
      answer:
        'Resume.io has a free plan, but it only allows one resume, limited templates, and TXT-only downloads. To get PDF or DOCX exports, AI features, and all templates, you need a paid plan. The 7-day trial costs $2.95 but auto-renews at $29.95 every 4 weeks. The annual plan at $74.95/year offers the best value.',
    },
    {
      question: 'Does Resume.io have AI-powered resume writing?',
      answer:
        'Yes, Resume.io has added AI features including a summary writer, keyword suggestions from job postings, and one-click resume tailoring from job URLs. However, the AI works through individual suggestions rather than a conversational interface. Extend Career uses a chat-based AI assistant that can generate content, rewrite sections, and make changes directly on your document through natural conversation.',
    },
    {
      question:
        'Can Resume.io help me track my job applications?',
      answer:
        'Resume.io has added a basic application tracker and job search powered by ZipRecruiter. However, it does not include email integration for managing recruiter conversations or calendar sync for interview scheduling. Extend Career combines resume building with Gmail and Outlook sync, interview tracking with Google Calendar integration, and AI job matching in a single platform.',
    },
    {
      question:
        'How do Resume.io templates compare to Extend Career templates?',
      answer:
        'Resume.io offers a large library of visually polished templates with multi-language support. Extend Career provides 30+ templates with deeper customization — adjustable colors, fonts, layouts, spacing, photo styles, and section ordering — all designed to be ATS-compatible. The key difference is that Extend Career pairs templates with a conversational AI that tailors content to specific job descriptions.',
    },
    {
      question:
        'Is it easy to cancel a Resume.io subscription?',
      answer:
        'Many users report that the cancellation process requires multiple confirmation steps and is not immediately obvious. The 7-day trial auto-renews at $29.95 every 4 weeks, so canceling before the trial ends is important if you only need temporary access. Extend Career offers straightforward pricing with no trial auto-renewal traps.',
    },
  ],
  relatedSlugs: ['zety', 'novoresume', 'teal', 'jobscan'],
  updatedAt: '2026-02-07',
}

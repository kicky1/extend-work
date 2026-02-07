import type { Competitor } from '../types'

export const teal: Competitor = {
  slug: 'teal',
  name: 'Teal',
  tagline: 'AI-powered job search platform with resume builder, job tracking, and interview practice',
  website: 'https://tealhq.com',
  foundedYear: 2019,
  pricing: [
    {
      name: 'Free',
      price: 'Free',
      features: [
        'Unlimited resume creation and PDF export',
        '10 resume templates',
        'Basic resume analysis',
        'Unlimited job tracking and bookmarks',
        'Chrome extension for saving jobs',
        'LinkedIn profile reviewer',
        'Networking CRM',
        'AI Interview Practice Agent',
        'Limited AI generation credits',
      ],
    },
    {
      name: 'Teal+ Weekly',
      price: 9,
      period: 'month',
      features: [
        'Billed at $9/week',
        'Unlimited AI generation',
        'Advanced resume analysis',
        'Full ATS keyword matching',
        'Unlimited cover letter generation',
        'Job-specific resume recommendations',
        'Full email template library',
      ],
    },
    {
      name: 'Teal+ Monthly',
      price: 29,
      period: 'month',
      features: [
        'Everything in Teal+',
        'Billed monthly at $29',
      ],
    },
    {
      name: 'Teal+ Quarterly',
      price: 26.33,
      period: 'month',
      features: [
        'Everything in Teal+',
        'Billed quarterly at $79',
        'Best value',
      ],
    },
  ],
  features: {
    aiResumeBuilder: true,
    atsOptimization: true,
    aiJobMatching: true,
    emailIntegration: 'partial',
    calendarIntegration: false,
    coverLetterBuilder: true,
    interviewPrep: true,
    multipleTemplates: 'partial',
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
      reviewCount: 87,
      url: 'https://www.trustpilot.com/review/tealhq.com',
    },
  ],
  pros: [
    'Comprehensive job tracker with CRM-like pipeline and networking tools',
    'AI match score shows how well your resume fits each job description',
    'Chrome extension for one-click job saving from any job board (4.9 stars, 3K+ reviews)',
    'New AI Interview Practice Agent with behavioral, technical, and situational questions',
    'Generous free tier with resume builder, job tracker, and interview practice',
    'AI Resume Agent for agentic resume building assistance',
  ],
  cons: [
    'Limited to 10 templates compared to dedicated resume builders',
    'No annual plan — pricing is weekly ($9/week), monthly ($29), or quarterly ($79)',
    'No calendar integration for interview scheduling',
    'AI cover letter quality is inconsistent and often needs heavy editing',
    'Match score algorithm can be overly keyword-focused, missing contextual fit',
    'Small Trustpilot presence (87 reviews) with polarized ratings',
  ],
  bestFor:
    'Active job seekers who want a unified platform for job tracking, resume tailoring, AI interview practice, and application management.',
  detailedBreakdown: `Teal has evolved from a resume builder with job tracking into a more comprehensive job search platform. The most significant recent additions are an AI Resume Agent and an AI Interview Practice Agent, positioning Teal as one of the few tools covering the full application-to-interview pipeline.

The job tracker remains Teal's strongest core feature. It functions like a CRM for your job search, with bookmarking, pipeline stages, and a Chrome extension (rated 4.9 stars with 3,000+ reviews) that saves jobs from LinkedIn, Indeed, Glassdoor, and most other boards with one click. The networking CRM for tracking companies and contacts is a unique feature most competitors lack.

Teal's AI resume tailoring compares your resume against a job description and surfaces matching and missing keywords. On the paid plan, you get unlimited AI generation for resume bullets, summaries, and cover letters. The new AI Resume Agent goes further — it works as an agentic assistant that helps with resume building beyond simple generation. The keyword matching approach is thorough but can be overly focused on surface-level keyword density rather than contextual understanding of your experience.

The AI Interview Practice Agent is a notable addition that is free for all users. It generates behavioral, technical, and situational interview questions pulled from your saved jobs and uploaded resume. Sessions include performance feedback, answer-level analysis, recording, transcripts, and performance tracking over time. This is a genuine differentiator — most competitors (including Extend Career) do not offer AI-powered mock interview practice.

The free tier is generous: unlimited resume creation with PDF export, 10 templates, unlimited job tracking, the Chrome extension, LinkedIn profile review, networking CRM, and the Interview Practice Agent. However, the most powerful AI features — unlimited generation, advanced analysis, full keyword matching, and cover letters — require Teal+ at $29/month or $79/quarter. There is no annual plan, and the weekly pricing at $9/week is expensive for longer commitments.

Where Teal falls short compared to Extend Career is in email and calendar integration. Teal has partial email features but no Gmail or Outlook inbox sync for reading and composing messages within the platform. There is no Google Calendar integration for interview scheduling. Extend Career connects your full email inbox and calendar, so you can manage recruiter conversations, schedule interviews, and track correspondence without switching tools.

Extend Career also takes a different approach to AI. Rather than keyword-focused tailoring, Extend Career uses a conversational AI assistant that can generate content, rewrite sections, add entries, and adjust tone through natural chat — all updating your resume in real-time. Teal's AI is more structured and form-driven, working through analysis panels and suggestion lists rather than open conversation.

Template variety is limited in Teal — 10 templates versus 30+ in Extend Career with deep customization for colors, fonts, layouts, spacing, and photo styles. For users who care about visual design and template options, Teal feels restrictive.`,
  quickVerdict:
    'Teal has grown into a strong job search platform with a new AI Interview Practice Agent, but its keyword-focused approach and missing calendar integration leave gaps. Extend Career provides deeper conversational AI, full email inbox sync, Google Calendar integration, and more template options.',
  whyPeopleSwitch: [
    'AI match scoring is too keyword-focused and pushes unnatural keyword stuffing',
    'Missing calendar integration makes interview scheduling disjointed',
    'Cover letter AI quality is inconsistent and requires heavy manual editing',
    'Limited to 10 templates with minimal design customization',
    'No full email inbox sync — cannot read and compose within the platform',
  ],
  faqs: [
    {
      question: 'How does Teal compare to Extend Career for job tracking?',
      answer:
        'Both platforms offer job tracking. Teal has a CRM-style tracker with a Chrome extension for one-click job saving and a networking contacts feature. Extend Career offers job tracking through its AI job matching system with compatibility scores, plus Gmail and Outlook sync for managing recruiter conversations and Google Calendar integration for interview scheduling. Teal is stronger for pipeline organization, while Extend Career provides more integration with your communication tools.',
    },
    {
      question: 'Is Teal free resume builder good enough?',
      answer:
        'Teal free tier is genuinely generous — unlimited resume creation, PDF export, 10 templates, job tracker, Chrome extension, and AI Interview Practice Agent. However, the most valuable AI features — unlimited generation, advanced analysis, cover letters, and full keyword matching — require Teal+ at $29/month or $79/quarter. If you need AI-powered tailoring, you need to upgrade.',
    },
    {
      question:
        'Does Teal AI tailor resumes better than Extend Career?',
      answer:
        'Teal uses a keyword-matching approach — it identifies keywords in the job description and suggests adding them to your resume to improve your match score. Extend Career uses a conversational AI that understands the context of your experience and helps you articulate relevant skills naturally, rather than optimizing for keyword density. Teal also has a new AI Resume Agent for more agentic assistance. The approaches differ: Teal is more structured and keyword-driven, Extend Career is more conversational and contextual.',
    },
    {
      question: 'Does Teal offer interview preparation?',
      answer:
        'Yes — Teal recently added an AI Interview Practice Agent that generates behavioral, technical, and situational questions based on your saved jobs and resume. It includes session recording, transcripts, performance feedback, and progress tracking. This is free for all users and is a genuine strength. Extend Career focuses on interview tracking and scheduling with Google Calendar sync rather than mock interview practice.',
    },
    {
      question: 'Does Teal have a calendar integration for interviews?',
      answer:
        'No, Teal does not offer calendar integration. Interview dates need to be managed separately from the platform. Extend Career provides Google Calendar integration that syncs interviews, sets scheduling with time, duration, and timezone details, and tracks outcomes for each interview stage.',
    },
  ],
  relatedSlugs: ['jobscan', 'resume-io', 'zety', 'novoresume'],
  updatedAt: '2026-02-07',
}

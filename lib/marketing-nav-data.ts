import {
  FileText,
  Bot,
  CheckCircle,
  PenLine,
  Briefcase,
  Mail,
  CalendarDays,
  ArrowLeftRight,
  Repeat,
  Award,
  BookOpen,
  ScanSearch,
  KeyRound,
  Target,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavToolItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export interface NavLinkItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export interface NavToolGroup {
  label: string
  items: NavToolItem[]
}

export const moduleItems: NavToolItem[] = [
  {
    title: 'Resume Builder',
    description: 'Create professional, ATS-optimized resumes with 100+ templates',
    href: '/resume-builder',
    icon: FileText,
  },
  {
    title: 'Cover Letter',
    description: 'Generate tailored cover letters matched to job descriptions',
    href: '/cover-letter-generator',
    icon: PenLine,
  },
  {
    title: 'AI Job Matching',
    description: 'Discover jobs that match your skills with AI-powered scoring',
    href: '/ai-job-matching',
    icon: Briefcase,
  },
  {
    title: 'Email Management',
    description: 'Manage all recruitment emails and conversations in one place',
    href: '/email-management',
    icon: Mail,
  },
  {
    title: 'Interview Tracker',
    description: 'Track interviews, prep materials, and follow-ups',
    href: '/interview-tracker',
    icon: CalendarDays,
  },
]

export const aiToolGroups: NavToolGroup[] = [
  {
    label: 'AI Assistants',
    items: [
      {
        title: 'AI Resume Assistant',
        description: 'AI-powered suggestions to improve every section of your CV',
        href: '/ai-resume-assistant',
        icon: Bot,
      },
      {
        title: 'Cover Letter AI',
        description: 'AI agent that writes and tailors cover letters from your CV',
        href: '/cover-letter-ai-assistant',
        icon: PenLine,
      },
      {
        title: 'Calendar AI',
        description: 'Schedule interviews and manage your calendar with AI',
        href: '/calendar-ai-assistant',
        icon: CalendarDays,
      },
    ],
  },
  {
    label: 'Resume Analysis',
    items: [
      {
        title: 'Resume Evaluator',
        description: 'Instant scoring and issue detection for your resume',
        href: '/resume-checker',
        icon: CheckCircle,
      },
      {
        title: 'ATS Checker',
        description: 'Check if your resume passes ATS scanners',
        href: '/ats-resume-checker',
        icon: ScanSearch,
      },
      {
        title: 'Keyword Checker',
        description: 'Analyze keyword density and find missing keywords',
        href: '/resume-keyword-checker',
        icon: KeyRound,
      },
      {
        title: 'Job Match Checker',
        description: 'Score how well your resume matches a job description',
        href: '/resume-job-match-checker',
        icon: Target,
      },
    ],
  },
  {
    label: 'Jobs',
    items: [
      {
        title: 'AI Job Matching',
        description: 'Discover jobs that match your skills with AI scoring',
        href: '/ai-job-matching',
        icon: Briefcase,
      },
    ],
  },
]

/** Flat list of all AI tool items — for backward compat (footer, etc.) */
export const aiToolItems: NavToolItem[] = aiToolGroups.flatMap((g) => g.items)

export const resourceItems: NavLinkItem[] = [
  { title: 'Comparisons', description: 'Side-by-side comparisons of popular career tools', href: '/compare', icon: ArrowLeftRight },
  { title: 'Alternatives', description: 'Find the best alternatives to your current tools', href: '/alternatives', icon: Repeat },
  { title: 'Best Tools', description: 'Curated lists of the best career and resume tools', href: '/best', icon: Award },
  { title: 'Career Guides', description: 'Expert guides on resumes, interviews, and job search', href: '/guides', icon: BookOpen },
]

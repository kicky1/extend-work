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

export const toolItems: NavToolItem[] = [
  {
    title: 'Resume Builder',
    description: 'Create professional, ATS-optimized resumes with 30+ templates',
    href: '/resume-builder',
    icon: FileText,
  },
  {
    title: 'AI Resume Assistant',
    description: 'Get AI-powered suggestions to improve every section of your CV',
    href: '/ai-resume-assistant',
    icon: Bot,
  },
  {
    title: 'Resume Checker',
    description: 'Instant scoring and issue detection for your resume',
    href: '/resume-checker',
    icon: CheckCircle,
  },
  {
    title: 'Cover Letter Generator',
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

export const resourceItems: NavLinkItem[] = [
  { title: 'Comparisons', description: 'Side-by-side comparisons of popular career tools', href: '/compare', icon: ArrowLeftRight },
  { title: 'Alternatives', description: 'Find the best alternatives to your current tools', href: '/alternatives', icon: Repeat },
  { title: 'Best Tools', description: 'Curated lists of the best career and resume tools', href: '/best', icon: Award },
  { title: 'Career Guides', description: 'Expert guides on resumes, interviews, and job search', href: '/guides', icon: BookOpen },
]

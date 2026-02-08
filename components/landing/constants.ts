import { FileText, ScrollText, Briefcase, Mail, CalendarDays } from 'lucide-react'

// Custom easing curves
export const easeOut = [0.22, 1, 0.36, 1] as const
export const easeInOut = [0.65, 0, 0.35, 1] as const

// Fade up with percentage-based transform
export const fadeUp = {
  initial: { opacity: 0, y: '20%' },
  animate: { opacity: 1, y: 0 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

// Floating animations with custom cubic-bezier
export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 1, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
}

export const floatAnimationDelayed = {
  animate: {
    y: [0, -16, 0],
    rotate: [0, -1.5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
      delay: 1,
    },
  },
}

export const floatAnimationSlow = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: easeInOut,
      delay: 0.5,
    },
  },
}

export const floatAnimationFast = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
      delay: 1.5,
    },
  },
}

// Module accent colors
export const moduleAccents = {
  teal: {
    bg: 'bg-[#1a4a4a]/5',
    border: 'border-[#1a4a4a]/20',
    iconBg: 'bg-[#1a4a4a]/10',
    icon: 'text-[#1a4a4a]',
    gradient: 'from-[#1a4a4a]/5 to-transparent',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/50',
    iconBg: 'bg-emerald-100',
    icon: 'text-emerald-600',
    gradient: 'from-emerald-50 to-transparent',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200/50',
    iconBg: 'bg-violet-100',
    icon: 'text-violet-600',
    gradient: 'from-violet-50 to-transparent',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200/50',
    iconBg: 'bg-amber-100',
    icon: 'text-amber-600',
    gradient: 'from-amber-50 to-transparent',
  },
}

export const modules = [
  {
    id: 'cv',
    icon: FileText,
    label: 'CV',
    title: 'AI-crafted resumes',
    description: 'Create professional, ATS-friendly resumes that get you noticed.',
    features: ['12+ designed layouts', 'ATS optimization', 'One-click PDF export'],
  },
  {
    id: 'cover-letter',
    icon: ScrollText,
    label: 'Cover Letter',
    title: 'AI cover letters',
    description: 'Generate tailored cover letters matched to each job application.',
    features: ['AI-powered generation', 'Tone customization', 'PDF & DOCX export'],
  },
  {
    id: 'jobs',
    icon: Briefcase,
    label: 'Jobs',
    title: 'Smart job matching',
    description: 'Discover opportunities that align with your experience and goals.',
    features: ['AI match scoring', 'Multi-source aggregation', 'Application tracking'],
  },
  {
    id: 'emails',
    icon: Mail,
    label: 'Emails',
    title: 'Email management',
    description: 'Manage all your job search communications in one place.',
    features: ['Gmail & Outlook sync', 'Email templates', 'Meeting scheduling'],
  },
  {
    id: 'calendar',
    icon: CalendarDays,
    label: 'Calendar',
    title: 'Interview tracker',
    description: 'Stay on top of every interview and follow-up with ease.',
    features: ['Tracking & reminders', 'Scheduling overview', 'Calendar sync'],
  },
]

export const moduleVideoKeys: Record<string, string> = {
  cv: 'zGi357RvYr0HyeC5gHS8RpFtCvxno3f6Hbi9YmNezT5hErw1',
  'cover-letter': 'zGi357RvYr0HHCFqElelwHy9hJQsDUZ1ciTK7f4NGAW8bPpF',
  jobs: 'zGi357RvYr0HqQNkqPwxjNOLveHQlomMazSIRC8h5pifnYJ2',
}

export const allVideoUrls = Object.values(moduleVideoKeys).map((k) => `https://utfs.io/f/${k}`)

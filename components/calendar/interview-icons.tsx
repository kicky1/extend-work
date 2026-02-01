'use client'

import { Phone, Video, Building2, Code, MessageCircle, Users } from 'lucide-react'
import type { InterviewType } from '@/lib/types/interview'
import { interviewTypeConfig } from '@/lib/types/interview'
import { cn } from '@/lib/utils'

const iconComponents: Record<InterviewType, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  video: Video,
  onsite: Building2,
  technical: Code,
  behavioral: MessageCircle,
  panel: Users,
}

interface InterviewTypeIconProps {
  type: InterviewType
  className?: string
  colored?: boolean
}

export function InterviewTypeIcon({ type, className, colored = true }: InterviewTypeIconProps) {
  const Icon = iconComponents[type]
  const config = interviewTypeConfig[type]

  return (
    <Icon className={cn(
      className,
      colored ? config.color : 'text-[#5a6a6a]'
    )} />
  )
}

export { iconComponents as interviewTypeIcons }

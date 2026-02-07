'use client'

import { format } from 'date-fns'
import {
  Send,
  Phone,
  Video,
  Building2,

  Calendar,
  SkipForward,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import type {
  RecruitmentProcess,
  RecruitmentStage,
  RecruitmentStageType,
  RecruitmentStageStatus,
} from '@/lib/types/recruitment'
import { stageStatusConfig } from '@/lib/types/recruitment'
import type { Interview } from '@/lib/types/interview'

const stageIcons: Record<RecruitmentStageType, React.ReactNode> = {
  application_sent: <Send className="w-4 h-4" />,
  phone_screen: <Phone className="w-4 h-4" />,
  video_interview: <Video className="w-4 h-4" />,
  onsite_final: <Building2 className="w-4 h-4" />,
}

interface StageDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stage: RecruitmentStage
  process: RecruitmentProcess
  linkedInterview?: Interview | null
  onInterviewClick?: (interview: Interview) => void
}

export function StageDetailDialog({
  open,
  onOpenChange,
  stage,
  process,
  linkedInterview,
  onInterviewClick,
}: StageDetailDialogProps) {
  const { updateStage } = useRecruitmentStore()

  const statusCfg = stageStatusConfig[stage.status]

  const handleToggleSkip = () => {
    const newStatus: RecruitmentStageStatus = stage.status === 'skipped' ? 'pending' : 'skipped'
    updateStage(process.id, stage.id, { status: newStatus })
  }

  const handleMarkComplete = () => {
    updateStage(process.id, stage.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-4">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-[#5a6a6a]">{stageIcons[stage.type]}</span>
            <DialogTitle className="text-base">{stage.label}</DialogTitle>
            <Badge className={cn(statusCfg.bgColor, statusCfg.color, 'border-0 text-xs ml-auto')}>
              {statusCfg.label}
            </Badge>
          </div>
          {stage.scheduledAt && (
            <p className="text-xs text-[#5a6a6a] mt-1">
              {format(new Date(stage.scheduledAt), 'EEEE, MMM d, yyyy · h:mm a')}
            </p>
          )}
        </DialogHeader>

        {/* Linked interview chip */}
        {linkedInterview && (
          <button
            onClick={() => {
              onInterviewClick?.(linkedInterview)
              onOpenChange(false)
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#1a4a4a]/5 hover:bg-[#1a4a4a]/10 transition-colors text-xs text-[#1a4a4a] w-fit"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate">
              {format(new Date(linkedInterview.scheduledAt), 'MMM d')} — {linkedInterview.title}
            </span>
          </button>
        )}

        {/* Actions */}
        {stage.type !== 'application_sent' && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#e8e4df]">
            {stage.status !== 'completed' && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1 text-[#5a6a6a]"
                onClick={handleToggleSkip}
              >
                <SkipForward className="w-3 h-3" />
                {stage.status === 'skipped' ? 'Unskip' : 'Skip'}
              </Button>
            )}
            {stage.status === 'scheduled' && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={handleMarkComplete}
              >
                <CheckCircle2 className="w-3 h-3" />
                Mark Complete
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Phone,
  Video,
  Building2,

  CheckCircle2,
  Circle,
  SkipForward,
  Clock,
  Plus,
  MoreHorizontal,
  CheckCheck,
  XCircle,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import useInterviewStore from '@/lib/stores/interview-store'
import { StageDetailDialog } from './stage-detail-dialog'
import type {
  RecruitmentProcess,
  RecruitmentStage,
  RecruitmentStageType,
  RecruitmentStageStatus,
  RecruitmentProcessStatus,
} from '@/lib/types/recruitment'
import {
  recruitmentStatusConfig,
  stageStatusConfig,
  ADDABLE_STAGE_TYPES,
} from '@/lib/types/recruitment'

const stageIcons: Record<RecruitmentStageType, React.ReactNode> = {
  application_sent: <Send className="w-3.5 h-3.5" />,
  phone_screen: <Phone className="w-3.5 h-3.5" />,
  video_interview: <Video className="w-3.5 h-3.5" />,
  onsite_final: <Building2 className="w-3.5 h-3.5" />,
}

const stageNodeIcon: Record<RecruitmentStageStatus, React.ReactNode> = {
  completed: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  scheduled: <Clock className="w-5 h-5 text-blue-600" />,
  pending: <Circle className="w-5 h-5 text-gray-300" />,
  skipped: <SkipForward className="w-5 h-5 text-gray-400" />,
}

const stageNodeBg: Record<RecruitmentStageStatus, string> = {
  completed: 'bg-green-50 ring-green-200',
  scheduled: 'bg-blue-50 ring-blue-200',
  pending: 'bg-white ring-gray-200',
  skipped: 'bg-gray-50 ring-gray-200',
}

interface RecruitmentProcessPanelProps {
  process: RecruitmentProcess
  onCreateInterview?: (stageType: RecruitmentStageType) => void
}

export function RecruitmentProcessPanel({ process, onCreateInterview }: RecruitmentProcessPanelProps) {
  const { selectProcess, updateProcess, addStage } = useRecruitmentStore()
  const { selectInterview, interviews } = useInterviewStore()
  const [dialogStage, setDialogStage] = useState<RecruitmentStage | null>(null)
  const [showAddStep, setShowAddStep] = useState(false)

  const statusConfig = recruitmentStatusConfig[process.status]
  const isTerminal = process.status === 'accepted' || process.status === 'rejected' || process.status === 'withdrawn'

  const handleStageClick = (stage: RecruitmentStage) => {
    setDialogStage(stage)
  }

  const handleInterviewClick = (interview: { id: string }) => {
    const found = interviews.find((i) => i.id === interview.id)
    if (found) selectInterview(found)
  }

  const handleAddStage = async (stageType: RecruitmentStageType) => {
    await addStage(process.id, stageType)
    setShowAddStep(false)
    onCreateInterview?.(stageType)
  }

  const handleStatusChange = (status: RecruitmentProcessStatus) => {
    updateProcess(process.id, { status })
  }

  return (
    <>
      <motion.div
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-lg border border-[#e8e4df] overflow-hidden flex flex-col h-fit max-h-[calc(100vh-200px)]"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#e8e4df] shrink-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[#1a2a2a] truncate">{process.company}</h3>
              <p className="text-xs text-[#5a6a6a] truncate">{process.position}</p>
            </div>
            <div className="flex items-center gap-1 ml-2 shrink-0">
              <Badge className={cn(statusConfig.bgColor, statusConfig.color, 'border-0 text-xs')}>
                {statusConfig.label}
              </Badge>

              {/* Status dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom" sideOffset={4}>
                  <DropdownMenuItem onClick={() => handleStatusChange('accepted')}>
                    <CheckCheck className="w-4 h-4 text-green-600" />
                    <span>Mark Accepted</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('rejected')}>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Mark Rejected</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange('withdrawn')}>
                    <LogOut className="w-4 h-4 text-gray-600" />
                    <span>Mark Withdrawn</span>
                  </DropdownMenuItem>
                  {isTerminal && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleStatusChange('active')}>
                        <span>Reopen as Active</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => selectProcess(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Terminal state banner */}
        {isTerminal && (
          <div
            className={cn(
              'px-4 py-2 text-xs font-medium',
              process.status === 'accepted' && 'bg-green-50 text-green-700',
              process.status === 'rejected' && 'bg-red-50 text-red-700',
              process.status === 'withdrawn' && 'bg-gray-50 text-gray-600'
            )}
          >
            {process.status === 'accepted' && 'You accepted this offer!'}
            {process.status === 'rejected' && 'This application was not successful.'}
            {process.status === 'withdrawn' && 'You withdrew from this process.'}
          </div>
        )}

        {/* Timeline */}
        <div className="overflow-y-auto flex-1 p-4">
          <div className="relative">
            <div className="space-y-0">
              {process.stages.map((stage) => {
                return (
                  <div key={stage.id} className="relative">
                    <button
                      onClick={() => handleStageClick(stage)}
                      className={cn(
                        'flex items-center gap-3 w-full text-left py-2 rounded-lg hover:bg-[#f8f6f4] px-2 -mx-1 transition-colors group',
                      )}
                      style={{ height: 52 }}
                    >
                      {/* Node icon */}
                      <div className={cn(
                        'relative z-10 shrink-0 rounded-full ring-1 p-0.5',
                        stageNodeBg[stage.status]
                      )}>
                        {stageNodeIcon[stage.status]}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            'text-[13px] font-medium truncate block',
                            stage.status === 'skipped' ? 'text-gray-400 line-through' : 'text-[#1a2a2a]'
                          )}
                        >
                          {stage.label}
                        </span>
                        {stage.scheduledAt && (
                          <p className="text-[11px] text-[#8a9a9a] mt-0.5">
                            {format(new Date(stage.scheduledAt), 'MMM d, h:mm a')}
                          </p>
                        )}
                      </div>

                      {/* Right side: status badge */}
                      <Badge
                        className={cn(
                          stageStatusConfig[stage.status].bgColor,
                          stageStatusConfig[stage.status].color,
                          'border-0 text-[10px] px-1.5 py-0 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity'
                        )}
                      >
                        {stageStatusConfig[stage.status].label}
                      </Badge>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Add Next Step */}
            {process.status === 'active' && (
              <div className="relative mt-1">
                <AnimatePresence mode="wait">
                  {!showAddStep ? (
                    <motion.button
                      key="add-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowAddStep(true)}
                      className="flex items-center gap-3 w-full text-left py-2 px-2 -mx-1 rounded-lg hover:bg-[#f8f6f4] transition-colors"
                    >
                      <div className="relative z-10 shrink-0 w-[22px] h-[22px] rounded-full border-2 border-dashed border-[#d0ccc7] flex items-center justify-center bg-white ring-1 ring-gray-200">
                        <Plus className="w-3 h-3 text-[#999]" />
                      </div>
                      <span className="text-[13px] text-[#999]">Add Next Step</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="add-pills"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 px-1">
                        <div className="flex flex-wrap gap-1.5">
                          {ADDABLE_STAGE_TYPES.map(({ type, label }) => (
                            <button
                              key={type}
                              onClick={() => handleAddStage(type)}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#e8e4df] text-xs text-[#5a6a6a] hover:bg-[#f8f6f4] hover:border-[#d0ccc7] transition-colors"
                            >
                              {stageIcons[type]}
                              {label}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setShowAddStep(false)}
                          className="text-[10px] text-[#999] mt-2 hover:text-[#666] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stage detail dialog */}
      {dialogStage && (
        <StageDetailDialog
          open={!!dialogStage}
          onOpenChange={(open) => {
            if (!open) setDialogStage(null)
          }}
          stage={
            // Always use latest stage data from process
            process.stages.find((s) => s.id === dialogStage.id) || dialogStage
          }
          process={process}
          linkedInterview={
            dialogStage.interviewId
              ? interviews.find((i) => i.id === dialogStage.interviewId) ?? null
              : null
          }
          onInterviewClick={(interview) => handleInterviewClick(interview)}
        />
      )}
    </>
  )
}

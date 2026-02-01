'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  User,
  Mail,
  Phone,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Interview, InterviewStatus, InterviewOutcome } from '@/lib/types/interview'
import {
  interviewStatusConfig,
  interviewOutcomeConfig,
  downloadICS,
} from '@/lib/types/interview'
import { InterviewForm } from './interview-form'
import { InterviewTypeIcon } from './interview-icons'
import type { InterviewFormData } from '@/lib/types/interview'

interface InterviewDetailModalProps {
  interview: Interview
  open: boolean
  onClose: () => void
  onUpdate: (id: string, data: Partial<InterviewFormData>) => Promise<void>
  onUpdateStatus: (id: string, status: InterviewStatus) => Promise<void>
  onUpdateOutcome: (id: string, outcome: InterviewOutcome, feedback?: string, nextSteps?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function InterviewDetailModal({
  interview,
  open,
  onClose,
  onUpdate,
  onUpdateStatus,
  onUpdateOutcome,
  onDelete,
}: InterviewDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showOutcomeForm, setShowOutcomeForm] = useState(false)
  const [outcomeData, setOutcomeData] = useState<{
    outcome: InterviewOutcome
    feedback: string
    nextSteps: string
  }>({
    outcome: interview.outcome || 'neutral',
    feedback: interview.feedback || '',
    nextSteps: interview.nextSteps || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statusConfig = interviewStatusConfig[interview.status]
  const scheduledAt = new Date(interview.scheduledAt)
  const isPast = scheduledAt < new Date()

  const handleUpdate = async (data: InterviewFormData) => {
    setIsSubmitting(true)
    try {
      await onUpdate(interview.id, data)
      setIsEditing(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(interview.id)
      onClose()
    } finally {
      setIsDeleting(false)
      setShowDeleteAlert(false)
    }
  }

  const handleStatusChange = async (status: InterviewStatus) => {
    await onUpdateStatus(interview.id, status)
  }

  const handleOutcomeSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onUpdateOutcome(
        interview.id,
        outcomeData.outcome,
        outcomeData.feedback,
        outcomeData.nextSteps
      )
      setShowOutcomeForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEditing) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Interview</DialogTitle>
          </DialogHeader>
          <InterviewForm
            interview={interview}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-start justify-between pr-8">
              <div className="flex items-center gap-3">
                <InterviewTypeIcon type={interview.interviewType} className="w-7 h-7" />
                <div>
                  <DialogTitle className="text-lg">{interview.title}</DialogTitle>
                  <p className="text-sm text-[#5a6a6a]">{interview.company}</p>
                </div>
              </div>
              <Badge className={cn(statusConfig.bgColor, statusConfig.color, 'border-0')}>
                {statusConfig.label}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Schedule Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#5a6a6a]">
                <Calendar className="w-4 h-4" />
                <span>{format(scheduledAt, 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5a6a6a]">
                <Clock className="w-4 h-4" />
                <span>
                  {format(scheduledAt, 'h:mm a')} ({interview.duration} min)
                </span>
              </div>
              {interview.location && (
                <div className="flex items-center gap-2 text-[#5a6a6a] col-span-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{interview.location}</span>
                </div>
              )}
              {interview.meetingLink && (
                <div className="col-span-2">
                  <a
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#1a4a4a] hover:underline"
                  >
                    <LinkIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">Join Meeting</span>
                  </a>
                </div>
              )}
            </div>

            {/* Position */}
            <div>
              <h4 className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wide mb-1">
                Position
              </h4>
              <p className="text-sm text-[#1a2a2a]">{interview.position}</p>
            </div>

            {/* Interviewer */}
            {(interview.interviewerName || interview.interviewerEmail || interview.interviewerPhone) && (
              <div>
                <h4 className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wide mb-2">
                  Interviewer
                </h4>
                <div className="space-y-1 text-sm">
                  {interview.interviewerName && (
                    <div className="flex items-center gap-2 text-[#1a2a2a]">
                      <User className="w-4 h-4 text-[#5a6a6a]" />
                      {interview.interviewerName}
                    </div>
                  )}
                  {interview.interviewerEmail && (
                    <a
                      href={`mailto:${interview.interviewerEmail}`}
                      className="flex items-center gap-2 text-[#1a4a4a] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {interview.interviewerEmail}
                    </a>
                  )}
                  {interview.interviewerPhone && (
                    <a
                      href={`tel:${interview.interviewerPhone}`}
                      className="flex items-center gap-2 text-[#1a4a4a] hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {interview.interviewerPhone}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {interview.notes && (
              <div>
                <h4 className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wide mb-1">
                  Notes
                </h4>
                <p className="text-sm text-[#1a2a2a] whitespace-pre-wrap">{interview.notes}</p>
              </div>
            )}

            {/* Prep Notes */}
            {interview.prepNotes && (
              <div>
                <h4 className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wide mb-1">
                  Preparation Notes
                </h4>
                <p className="text-sm text-[#1a2a2a] whitespace-pre-wrap">{interview.prepNotes}</p>
              </div>
            )}

            {/* Questions */}
            {interview.questions && interview.questions.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wide mb-2">
                  Questions to Ask
                </h4>
                <ul className="space-y-1">
                  {interview.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1a2a2a]">
                      <span className="text-[#5a6a6a]">•</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome (if completed) */}
            {interview.outcome && (
              <div className="p-4 rounded-lg bg-[#f8f6f4]">
                <div className="flex items-center gap-2 mb-2">
                  <span>{interviewOutcomeConfig[interview.outcome].icon}</span>
                  <Badge
                    className={cn(
                      interviewOutcomeConfig[interview.outcome].bgColor,
                      interviewOutcomeConfig[interview.outcome].color,
                      'border-0'
                    )}
                  >
                    {interviewOutcomeConfig[interview.outcome].label} Outcome
                  </Badge>
                </div>
                {interview.feedback && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-[#5a6a6a]">Feedback</p>
                    <p className="text-sm text-[#1a2a2a]">{interview.feedback}</p>
                  </div>
                )}
                {interview.nextSteps && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-[#5a6a6a]">Next Steps</p>
                    <p className="text-sm text-[#1a2a2a]">{interview.nextSteps}</p>
                  </div>
                )}
              </div>
            )}

            {/* Outcome Form */}
            {showOutcomeForm && (
              <div className="p-4 rounded-lg border border-[#e8e4df] space-y-4">
                <h4 className="text-sm font-medium text-[#1a2a2a]">Record Outcome</h4>

                <div className="flex gap-2">
                  {(Object.keys(interviewOutcomeConfig) as InterviewOutcome[]).map((outcome) => (
                    <Button
                      key={outcome}
                      type="button"
                      variant={outcomeData.outcome === outcome ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setOutcomeData((prev) => ({ ...prev, outcome }))}
                    >
                      <span className="mr-1">{interviewOutcomeConfig[outcome].icon}</span>
                      {interviewOutcomeConfig[outcome].label}
                    </Button>
                  ))}
                </div>

                <div>
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={outcomeData.feedback}
                    onChange={(e) =>
                      setOutcomeData((prev) => ({ ...prev, feedback: e.target.value }))
                    }
                    placeholder="How did the interview go?"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="nextSteps">Next Steps</Label>
                  <Textarea
                    id="nextSteps"
                    value={outcomeData.nextSteps}
                    onChange={(e) =>
                      setOutcomeData((prev) => ({ ...prev, nextSteps: e.target.value }))
                    }
                    placeholder="What are the next steps?"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOutcomeForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleOutcomeSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Outcome'}
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e8e4df]">
              <Button variant="outline" size="sm" onClick={() => downloadICS(interview)}>
                <Download className="w-4 h-4 mr-1" />
                Export to Calendar
              </Button>

              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>

              {interview.status === 'scheduled' && (
                <>
                  {isPast && !showOutcomeForm && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowOutcomeForm(true)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Record Outcome
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange('cancelled')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange('rescheduled')}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reschedule
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                onClick={() => setShowDeleteAlert(true)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this interview? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

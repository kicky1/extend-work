// =============================================
// Recruitment Process Types
// =============================================

export type RecruitmentProcessStatus =
  | 'active'
  | 'offer_received'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'

export type RecruitmentStageType =
  | 'application_sent'
  | 'phone_screen'
  | 'video_interview'
  | 'onsite_final'

export type RecruitmentStageStatus = 'pending' | 'scheduled' | 'completed' | 'skipped'

export interface RecruitmentStage {
  id: string
  type: RecruitmentStageType
  label: string
  status: RecruitmentStageStatus
  interviewId?: string
  scheduledAt?: string
  completedAt?: string
  prepQuestions?: string[]
  notes?: string
  outcome?: string
}

export interface RecruitmentProcess {
  id: string
  userId: string
  company: string
  position: string
  status: RecruitmentProcessStatus
  stages: RecruitmentStage[]
  jobApplicationId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Database row type (snake_case)
export interface RecruitmentProcessRow {
  id: string
  user_id: string
  company: string
  position: string
  status: RecruitmentProcessStatus
  stages: RecruitmentStage[]
  job_application_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export function processFromRow(row: RecruitmentProcessRow): RecruitmentProcess {
  return {
    id: row.id,
    userId: row.user_id,
    company: row.company,
    position: row.position,
    status: row.status,
    stages: row.stages || [],
    jobApplicationId: row.job_application_id ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function processToRow(process: Partial<RecruitmentProcess>): Partial<RecruitmentProcessRow> {
  const row: Partial<RecruitmentProcessRow> = {}

  if (process.userId !== undefined) row.user_id = process.userId
  if (process.company !== undefined) row.company = process.company
  if (process.position !== undefined) row.position = process.position
  if (process.status !== undefined) row.status = process.status
  if (process.stages !== undefined) row.stages = process.stages
  if (process.jobApplicationId !== undefined) row.job_application_id = process.jobApplicationId ?? null
  if (process.notes !== undefined) row.notes = process.notes ?? null

  return row
}

let stageIdCounter = 0

function generateStageId(): string {
  stageIdCounter++
  return `stage-${Date.now()}-${stageIdCounter}`
}

export function getDefaultStages(): RecruitmentStage[] {
  return [
    { id: generateStageId(), type: 'application_sent', label: 'Application Sent', status: 'completed' },
    { id: generateStageId(), type: 'phone_screen', label: 'Phone Screen', status: 'pending' },
    { id: generateStageId(), type: 'video_interview', label: 'Video Interview', status: 'pending' },
    { id: generateStageId(), type: 'onsite_final', label: 'Onsite / Final Round', status: 'pending' },
  ]
}

export function getInitialStages(): RecruitmentStage[] {
  return [
    { id: generateStageId(), type: 'application_sent', label: 'Application Sent', status: 'completed' },
  ]
}

export const ADDABLE_STAGE_TYPES: { type: RecruitmentStageType; label: string }[] = [
  { type: 'phone_screen', label: 'Phone Screen' },
  { type: 'video_interview', label: 'Video Interview' },
  { type: 'onsite_final', label: 'Onsite / Final' },
]

export function createStage(type: RecruitmentStageType, labelOverride?: string): RecruitmentStage {
  const config = recruitmentStageConfig[type]
  return {
    id: generateStageId(),
    type,
    label: labelOverride || config.label,
    status: 'pending',
  }
}

export const recruitmentStageConfig: Record<
  RecruitmentStageType,
  { icon: string; label: string; color: string; bgColor: string }
> = {
  application_sent: { icon: 'send', label: 'Application Sent', color: 'text-blue-600', bgColor: 'bg-blue-600/10' },
  phone_screen: { icon: 'phone', label: 'Phone Screen', color: 'text-cyan-600', bgColor: 'bg-cyan-600/10' },
  video_interview: { icon: 'video', label: 'Video Interview', color: 'text-purple-600', bgColor: 'bg-purple-600/10' },
  onsite_final: { icon: 'building-2', label: 'Onsite / Final', color: 'text-green-600', bgColor: 'bg-green-600/10' },
}

export const recruitmentStatusConfig: Record<
  RecruitmentProcessStatus,
  { label: string; color: string; bgColor: string }
> = {
  active: { label: 'Active', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  offer_received: { label: 'Offer Received', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  accepted: { label: 'Accepted', color: 'text-green-600', bgColor: 'bg-green-100' },
  rejected: { label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100' },
  withdrawn: { label: 'Withdrawn', color: 'text-gray-600', bgColor: 'bg-gray-100' },
}

export const stageStatusConfig: Record<
  RecruitmentStageStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: 'Pending', color: 'text-gray-500', bgColor: 'bg-gray-100' },
  scheduled: { label: 'Scheduled', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  completed: { label: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100' },
  skipped: { label: 'Skipped', color: 'text-gray-400', bgColor: 'bg-gray-50' },
}

// Maps InterviewType → RecruitmentStageType for auto-linking
export function mapInterviewTypeToStageType(
  interviewType: string
): RecruitmentStageType {
  switch (interviewType) {
    case 'phone':
      return 'phone_screen'
    case 'video':
      return 'video_interview'
    case 'onsite':
      return 'onsite_final'
    default:
      return 'video_interview'
  }
}

// Maps RecruitmentStageType → InterviewType for pre-filling wizard
export function mapStageTypeToInterviewType(
  stageType: RecruitmentStageType
): string {
  switch (stageType) {
    case 'phone_screen':
      return 'phone'
    case 'video_interview':
      return 'video'
    case 'onsite_final':
      return 'onsite'
    default:
      return 'video'
  }
}

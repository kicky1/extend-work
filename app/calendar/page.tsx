'use client'

import { useEffect, useState } from 'react'
import { format, isSameDay } from 'date-fns'
import { Plus, Filter, CalendarDays, PanelLeftClose, PanelLeft, CalendarCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import {
  CalendarView,
  InterviewCard,
  InterviewDetailModal,
  InterviewForm,
  InterviewWizard,
  UpcomingInterviews,
  RecruitmentProcessPanel,
  CalendarPageSkeleton,
} from '@/components/calendar'

const CalendarAIAssistant = dynamic(() => import('@/components/calendar/calendar-ai-assistant'), { ssr: false })
import useInterviewStore from '@/lib/stores/interview-store'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import useCalendarAccountStore from '@/lib/stores/calendar-account-store'
import type { Interview, InterviewFormData, InterviewStatus } from '@/lib/types/interview'
import { interviewStatusConfig } from '@/lib/types/interview'
import type { RecruitmentStageType } from '@/lib/types/recruitment'
import { mapStageTypeToInterviewType } from '@/lib/types/recruitment'
import { cn } from '@/lib/utils'

export default function CalendarPage() {
  const {
    interviews,
    isLoading,
    selectedInterview,
    currentMonth,
    selectedDate,
    statusFilter,
    loadInterviews,
    createInterview,
    updateInterview,
    updateInterviewStatus,
    updateInterviewOutcome,
    deleteInterview,
    selectInterview,
    setCurrentMonth,
    setSelectedDate,
    setStatusFilter,
    getInterviewsForDate,
  } = useInterviewStore()

  const {
    processes,
    selectedProcessId,
    loadProcesses,
    selectProcess,
    getProcessForInterview,
  } = useRecruitmentStore()

  const selectedProcess = processes.find((p) => p.id === selectedProcessId) || null

  const {
    account: calendarAccount,
    isConnecting: isCalendarConnecting,
    loadAccount: loadCalendarAccount,
    connectAccount: connectCalendarAccount,
    disconnectAccount: disconnectCalendarAccount,
  } = useCalendarAccountStore()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [wizardPrefill, setWizardPrefill] = useState<Partial<InterviewFormData> | undefined>(undefined)

  useEffect(() => {
    loadInterviews()
    loadProcesses()
    loadCalendarAccount()
  }, [loadInterviews, loadProcesses, loadCalendarAccount])

  // Handle Google Calendar OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('cal_code')
    const state = params.get('cal_state')

    if (code && state) {
      // Clean URL
      window.history.replaceState({}, '', '/calendar')
      connectCalendarAccount(code, state).catch((err) => {
        console.error('Calendar connect error:', err)
      })
    }
  }, [connectCalendarAccount])

  const handleCreateInterview = async (data: InterviewFormData) => {
    setIsCreating(true)
    try {
      await createInterview(data)
      setShowCreateModal(false)
      setWizardPrefill(undefined)
    } finally {
      setIsCreating(false)
    }
  }

  const handleCreateInterviewFromStage = (stageType: RecruitmentStageType) => {
    if (!selectedProcess) return
    const interviewType = mapStageTypeToInterviewType(stageType)
    setWizardPrefill({
      company: selectedProcess.company,
      position: selectedProcess.position,
      interviewType: interviewType as InterviewFormData['interviewType'],
      title: `${selectedProcess.company} — ${selectedProcess.position}`,
    })
    setShowCreateModal(true)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowCreateModal(true)
  }

  const handleAddOnDate = () => {
    setShowCreateModal(true)
  }

  const selectedDateInterviews = selectedDate ? getInterviewsForDate(selectedDate) : []

  // Filter interviews based on status filter
  const filteredInterviews =
    statusFilter === 'all'
      ? interviews
      : interviews.filter((i) => i.status === statusFilter)

  // Upcoming interviews from filtered list (exclude cancelled)
  const now = new Date()
  const upcomingInterviews = filteredInterviews
    .filter((i) => new Date(i.scheduledAt) >= now && i.status !== 'cancelled')
    .slice(0, 10)

  return (
    <>
      {/* Page Header */}
      <div className="bg-white border-b border-[#e8e4df]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Sidebar toggle - mobile only */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? (
                  <PanelLeftClose className="w-5 h-5" />
                ) : (
                  <PanelLeft className="w-5 h-5" />
                )}
              </Button>
              <Badge variant="secondary">
                {interviews.filter((i) => i.status === 'scheduled').length} scheduled
              </Badge>

              {/* Google Calendar connection */}
              {calendarAccount ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs text-green-700">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{calendarAccount.email}</span>
                  <span className="sm:hidden">Synced</span>
                  <button
                    onClick={() => disconnectCalendarAccount()}
                    className="ml-0.5 hover:text-green-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1.5 text-[#5a6a6a]"
                  disabled={isCalendarConnecting}
                  onClick={() => {
                    window.location.href = '/api/calendar/connect'
                  }}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  {isCalendarConnecting ? 'Connecting...' : 'Connect Google Calendar'}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as InterviewStatus | 'all')}
              >
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2 hidden sm:block" />
                  <SelectValue>
                    {statusFilter === 'all'
                      ? 'All Interviews'
                      : interviewStatusConfig[statusFilter].label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interviews</SelectItem>
                  {(Object.keys(interviewStatusConfig) as InterviewStatus[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full',
                            interviewStatusConfig[status].bgColor
                          )}
                        />
                        {interviewStatusConfig[status].label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {isLoading ? (
          <CalendarPageSkeleton />
        ) : (
          <div
            className={cn(
              'flex flex-col lg:grid gap-4 lg:gap-6',
              selectedProcess
                ? 'lg:grid-cols-[280px_1fr_320px]'
                : 'lg:grid-cols-[280px_1fr]'
            )}
          >
            {/* Sidebar - hidden on mobile by default, shown when toggled */}
            <div
              className={cn(
                'space-y-4 lg:space-y-6',
                'lg:block',
                showSidebar ? 'block' : 'hidden'
              )}
            >
              <UpcomingInterviews
                interviews={upcomingInterviews}
                onSelectInterview={(interview) => {
                  selectInterview(interview)
                  // Auto-show process panel
                  const process = getProcessForInterview(interview.id)
                  if (process) {
                    selectProcess(process.id)
                  }
                  // Auto-hide sidebar on mobile
                  if (window.innerWidth < 1024) {
                    setShowSidebar(false)
                  }
                }}
              />

              {/* Selected Date Panel */}
              {selectedDate && (
                <div className="bg-white rounded-lg border border-[#e8e4df] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-[#1a2a2a]">
                      {isSameDay(selectedDate, new Date())
                        ? 'Today'
                        : format(selectedDate, 'EEEE, MMM d')}
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleAddOnDate}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {selectedDateInterviews.length === 0 ? (
                    <p className="text-sm text-[#5a6a6a] text-center py-4">
                      No interviews on this date
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDateInterviews.map((interview) => (
                        <InterviewCard
                          key={interview.id}
                          interview={interview}
                          onClick={() => selectInterview(interview)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Calendar - horizontal scroll on mobile */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[600px] sm:min-w-0">
                <CalendarView
                  interviews={filteredInterviews}
                  currentMonth={currentMonth}
                  selectedDate={selectedDate}
                  onMonthChange={setCurrentMonth}
                  onSelectDate={handleDateClick}
                  onSelectInterview={(interview) => {
                    selectInterview(interview)
                    // Auto-show process panel for this interview
                    const process = getProcessForInterview(interview.id)
                    if (process) {
                      selectProcess(process.id)
                    }
                  }}
                />
              </div>
            </div>

            {/* Recruitment Process Panel */}
            <AnimatePresence>
              {selectedProcess && (
                <div className="hidden lg:block">
                  <RecruitmentProcessPanel
                    process={selectedProcess}
                    onCreateInterview={handleCreateInterviewFromStage}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create Interview Modal */}
      <Dialog open={showCreateModal} onOpenChange={(open) => {
        setShowCreateModal(open)
        if (!open) setWizardPrefill(undefined)
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Interview</DialogTitle>
          </DialogHeader>
          <InterviewWizard
            initialDate={selectedDate || undefined}
            initialData={wizardPrefill}
            interviews={interviews}
            onSubmit={handleCreateInterview}
            onCancel={() => {
              setShowCreateModal(false)
              setWizardPrefill(undefined)
            }}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* Interview Detail Modal */}
      {selectedInterview && (
        <InterviewDetailModal
          interview={selectedInterview}
          open={!!selectedInterview}
          onClose={() => selectInterview(null)}
          onUpdate={updateInterview}
          onUpdateStatus={updateInterviewStatus}
          onUpdateOutcome={updateInterviewOutcome}
          onDelete={deleteInterview}
        />
      )}

      {/* AI Assistant */}
      <CalendarAIAssistant />
    </>
  )
}

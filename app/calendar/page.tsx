'use client'

import { useEffect, useState } from 'react'
import { format, isSameDay } from 'date-fns'
import { Plus, Filter, CalendarDays, PanelLeftClose, PanelLeft } from 'lucide-react'
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
import {
  CalendarView,
  InterviewCard,
  InterviewDetailModal,
  InterviewForm,
  InterviewWizard,
  UpcomingInterviews,
  CalendarAIAssistant,
} from '@/components/calendar'
import useInterviewStore from '@/lib/stores/interview-store'
import type { Interview, InterviewFormData, InterviewStatus } from '@/lib/types/interview'
import { interviewStatusConfig } from '@/lib/types/interview'
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

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    loadInterviews()
  }, [loadInterviews])

  const handleCreateInterview = async (data: InterviewFormData) => {
    setIsCreating(true)
    try {
      await createInterview(data)
      setShowCreateModal(false)
    } finally {
      setIsCreating(false)
    }
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

  // Upcoming interviews from filtered list
  const now = new Date()
  const upcomingInterviews = filteredInterviews
    .filter((i) => new Date(i.scheduledAt) >= now)
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

              <Button onClick={() => setShowCreateModal(true)} className="shrink-0">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">New Interview</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#1a4a4a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#5a6a6a]">Loading interviews...</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-6">
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
                  onSelectInterview={selectInterview}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Interview Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Interview</DialogTitle>
          </DialogHeader>
          <InterviewWizard
            initialDate={selectedDate || undefined}
            interviews={interviews}
            onSubmit={handleCreateInterview}
            onCancel={() => setShowCreateModal(false)}
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

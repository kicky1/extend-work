'use client'

import { useState, useEffect } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import {
  Building2,
  Calendar,
  Clock,
  MoreVertical,
  ExternalLink,
  Trash2,
  Edit2,
  Bell,
  MessageSquare,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useJobStore from '@/lib/stores/job-store'
import type { JobApplication, ApplicationStatus } from '@/lib/types/job'
import { applicationStatusConfig } from '@/lib/types/job'
import { cn } from '@/lib/utils'

const statusOrder: ApplicationStatus[] = ['saved', 'applied', 'interviewing', 'offer', 'rejected', 'withdrawn']

interface ApplicationTrackerProps {
  view?: 'list' | 'kanban'
}

export function ApplicationTracker({ view = 'list' }: ApplicationTrackerProps) {
  const { applications, isApplicationsLoading, loadApplications, updateApplicationStatus, deleteApplication } = useJobStore()
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null)

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  if (isApplicationsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No applications yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Start applying to jobs to track your progress here
        </p>
      </div>
    )
  }

  if (view === 'kanban') {
    return <KanbanView applications={applications} onStatusChange={updateApplicationStatus} />
  }

  return <ListView applications={applications} onDelete={deleteApplication} />
}

// List view component
function ListView({
  applications,
  onDelete,
}: {
  applications: JobApplication[]
  onDelete: (id: string) => Promise<void>
}) {
  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} onDelete={onDelete} />
      ))}
    </div>
  )
}

// Individual application card
function ApplicationCard({
  application,
  onDelete,
}: {
  application: JobApplication
  onDelete: (id: string) => Promise<void>
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const statusConfig = applicationStatusConfig[application.status]

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this application?')) {
      setIsDeleting(true)
      try {
        await onDelete(application.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        {/* Company icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted shrink-0">
          <Building2 className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{application.jobTitle}</h3>
          <p className="text-sm text-muted-foreground truncate">{application.companyName}</p>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Applied {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}
            </span>
            {application.nextFollowUpAt && (
              <span className="flex items-center gap-1 text-primary">
                <Bell className="h-3 w-3" />
                Follow-up {format(new Date(application.nextFollowUpAt), 'MMM d')}
              </span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <Badge
          variant="secondary"
          className={cn('shrink-0', statusConfig.color, statusConfig.bgColor)}
        >
          {statusConfig.label}
        </Badge>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {application.jobUrl && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
              <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Kanban view component
function KanbanView({
  applications,
  onStatusChange,
}: {
  applications: JobApplication[]
  onStatusChange: (id: string, status: ApplicationStatus) => Promise<void>
}) {
  const columns = statusOrder.filter((status) =>
    ['applied', 'interviewing', 'offer', 'rejected'].includes(status)
  )

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          applications={applications.filter((a) => a.status === status)}
          onStatusChange={onStatusChange}
          allStatuses={columns}
        />
      ))}
    </div>
  )
}

// Kanban column
function KanbanColumn({
  status,
  applications,
  onStatusChange,
  allStatuses,
}: {
  status: ApplicationStatus
  applications: JobApplication[]
  onStatusChange: (id: string, status: ApplicationStatus) => Promise<void>
  allStatuses: ApplicationStatus[]
}) {
  const config = applicationStatusConfig[status]
  const currentIndex = allStatuses.indexOf(status)

  return (
    <div className="w-72 shrink-0">
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('h-3 w-3 rounded-full', config.bgColor)} />
        <h3 className="font-medium">{config.label}</h3>
        <Badge variant="secondary" className="ml-auto">
          {applications.length}
        </Badge>
      </div>

      <div className="space-y-2 min-h-[200px] rounded-lg border border-dashed bg-muted/30 p-2">
        {applications.map((app) => (
          <Card key={app.id} className="cursor-pointer hover:ring-2 hover:ring-primary/20">
            <CardContent className="p-3">
              <h4 className="font-medium text-sm truncate">{app.jobTitle}</h4>
              <p className="text-xs text-muted-foreground truncate">{app.companyName}</p>

              {/* Quick actions to move to next/prev status */}
              <div className="flex gap-1 mt-2">
                {currentIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => onStatusChange(app.id, allStatuses[currentIndex - 1])}
                  >
                    ← Back
                  </Button>
                )}
                {currentIndex < allStatuses.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs ml-auto"
                    onClick={() => onStatusChange(app.id, allStatuses[currentIndex + 1])}
                  >
                    Next →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

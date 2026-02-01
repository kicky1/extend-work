'use client'

import { useState } from 'react'
import { MapPin, Building2, Clock, Bookmark, BookmarkCheck, ExternalLink, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useJobStore from '@/lib/stores/job-store'
import type { JobListing } from '@/lib/types/job'
import { jobSourceConfig } from '@/lib/types/job'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface JobCardProps {
  job: JobListing
  onClick?: () => void
  compact?: boolean
}

export function JobCard({ job, onClick, compact = false }: JobCardProps) {
  const { savedJobs, saveJob, unsaveJob } = useJobStore()
  const [isSaving, setIsSaving] = useState(false)

  // Find matching saved job - check by ID or sourceUrl (IDs may differ after deduplication)
  const savedJob = savedJobs.find(s =>
    s.isBookmarked && (s.jobListingId === job.id || s.jobListing?.sourceUrl === job.sourceUrl)
  )
  const saved = !!savedJob
  const sourceConfig = jobSourceConfig[job.source]

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaving(true)
    try {
      if (saved && savedJob) {
        // Use the actual jobListingId from savedJob (may differ from job.id after deduplication)
        await unsaveJob(savedJob.jobListingId)
      } else {
        await saveJob(job)
      }
    } catch (error) {
      console.error('Error toggling save:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const formatSalary = () => {
    if (!job.salary) return null
    const { min, max, currency } = job.salary
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`
    }
    if (min) return `od ${min.toLocaleString()} ${currency}`
    if (max) return `do ${max.toLocaleString()} ${currency}`
    return null
  }

  const salary = formatSalary()

  const remoteLabel = {
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site',
    any: null,
  }[job.remoteType]

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:ring-2 hover:ring-primary/20',
        compact ? 'py-3' : ''
      )}
      onClick={onClick}
    >
      <CardHeader className={compact ? 'pb-2' : ''}>
        <div className="flex items-start gap-3">
          {/* Company logo */}
          {job.companyLogoUrl ? (
            <img
              src={job.companyLogoUrl}
              alt={job.company}
              className="h-10 w-10 rounded-lg object-contain bg-muted"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight line-clamp-1">
              {job.title}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-1">
              {job.company}
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleSaveToggle}
            disabled={isSaving}
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className={cn('space-y-3', compact ? 'pt-0' : '')}>
        {/* Location and remote type */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
          )}
          {remoteLabel && (
            <Badge variant="secondary" className="text-xs">
              {remoteLabel}
            </Badge>
          )}
          {job.employmentType && (
            <Badge variant="outline" className="text-xs">
              {job.employmentType}
            </Badge>
          )}
        </div>

        {/* Salary - always render to maintain consistent card height */}
        <div className="text-sm font-medium text-green-600 dark:text-green-500 min-h-5">
          {salary}
        </div>

        {/* Skills */}
        {job.skills.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 5).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Footer: source and time */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: sourceConfig.color }}
            />
            <span>{sourceConfig.label}</span>
          </div>

          {job.postedAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import {
  MapPin,
  Building2,
  Clock,
  Briefcase,
  DollarSign,
  ChevronLeft,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { JobListing } from '@/lib/types/job'
import { jobSourceConfig } from '@/lib/types/job'
import { formatDistanceToNow } from 'date-fns'

interface JobDetailProps {
  job: JobListing
  onBack?: () => void
  onApply?: () => void
}

// Parse text into structured content (paragraphs, lists)
function parseJobText(text: string) {
  const lines = text.split('\n').filter(line => line.trim())
  const elements: { type: 'paragraph' | 'list-item' | 'heading'; content: string }[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    // Check for bullet points or numbered lists
    if (/^[\-\•\*\◦\○]\s+/.test(trimmed)) {
      elements.push({ type: 'list-item', content: trimmed.replace(/^[\-\•\*\◦\○]\s+/, '') })
    } else if (/^\d+[\.\)]\s+/.test(trimmed)) {
      elements.push({ type: 'list-item', content: trimmed.replace(/^\d+[\.\)]\s+/, '') })
    } else if (trimmed.endsWith(':') && trimmed.length < 60) {
      elements.push({ type: 'heading', content: trimmed })
    } else {
      elements.push({ type: 'paragraph', content: trimmed })
    }
  }
  return elements
}

function RenderJobText({ text }: { text: string }) {
  const elements = parseJobText(text)
  const result: React.ReactNode[] = []
  let currentList: string[] = []
  let listKey = 0

  const flushList = () => {
    if (currentList.length > 0) {
      result.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-1 my-3 text-muted-foreground">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  elements.forEach((el, i) => {
    if (el.type === 'list-item') {
      currentList.push(el.content)
    } else {
      flushList()
      if (el.type === 'heading') {
        result.push(
          <h4 key={i} className="font-semibold text-foreground mt-4 mb-2">{el.content}</h4>
        )
      } else {
        result.push(
          <p key={i} className="text-muted-foreground leading-relaxed my-2">{el.content}</p>
        )
      }
    }
  })
  flushList()

  return <div className="space-y-1">{result}</div>
}

export function JobDetail({ job, onBack, onApply }: JobDetailProps) {
  const sourceConfig = jobSourceConfig[job.source]

  const formatSalary = () => {
    if (!job.salary) return null
    const { min, max, currency, type } = job.salary
    const typeLabel = type === 'monthly' ? '/mo' : type === 'yearly' ? '/yr' : '/hr'
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}${typeLabel}`
    }
    if (min) return `od ${min.toLocaleString()} ${currency}${typeLabel}`
    if (max) return `do ${max.toLocaleString()} ${currency}${typeLabel}`
    return null
  }

  const salary = formatSalary()

  const remoteLabel = {
    remote: 'Fully Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site',
    any: 'Flexible',
  }[job.remoteType]

  return (
    <div className="space-y-6">
      {/* Back button */}
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to results
        </Button>
      )}

      {/* Header card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Company logo */}
            {job.companyLogoUrl ? (
              <img
                src={job.companyLogoUrl}
                alt={job.company}
                className="h-16 w-16 rounded-xl object-contain bg-muted"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

            <div className="flex-1">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{job.company}</p>

              <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-muted-foreground">
                {job.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                )}
                <Badge variant="secondary">{remoteLabel}</Badge>
                {job.employmentType && (
                  <Badge variant="outline">{job.employmentType}</Badge>
                )}
                {job.experienceLevel && (
                  <Badge variant="outline" className="capitalize">
                    {job.experienceLevel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Salary */}
          {salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold text-green-600">{salary}</span>
            </div>
          )}

          {/* Action button */}
          <Button onClick={onApply} size="lg" className="w-full sm:w-auto">
            <Briefcase className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      {job.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {job.description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <RenderJobText text={job.description} />
          </CardContent>
        </Card>
      )}

      {/* Requirements */}
      {job.requirements && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <RenderJobText text={job.requirements} />
          </CardContent>
        </Card>
      )}

      {/* Footer info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: sourceConfig.color }}
          />
          <span>Source: {sourceConfig.label}</span>
        </div>

        {job.postedAt && (
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </span>
        )}
      </div>
    </div>
  )
}

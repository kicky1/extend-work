'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Interview, InterviewFormData, InterviewType } from '@/lib/types/interview'
import {
  defaultInterviewFormData,
  interviewTypeConfig,
  durationOptions,
  commonTimezones,
} from '@/lib/types/interview'
import { InterviewTypeIcon } from './interview-icons'

interface InterviewFormProps {
  interview?: Interview
  initialDate?: Date
  onSubmit: (data: InterviewFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function InterviewForm({
  interview,
  initialDate,
  onSubmit,
  onCancel,
  isLoading = false,
}: InterviewFormProps) {
  const [formData, setFormData] = useState<InterviewFormData>(() => {
    if (interview) {
      return {
        title: interview.title,
        company: interview.company,
        position: interview.position,
        interviewType: interview.interviewType,
        scheduledAt: interview.scheduledAt,
        duration: interview.duration,
        timezone: interview.timezone,
        location: interview.location || '',
        meetingLink: interview.meetingLink || '',
        interviewerName: interview.interviewerName || '',
        interviewerEmail: interview.interviewerEmail || '',
        interviewerPhone: interview.interviewerPhone || '',
        notes: interview.notes || '',
        prepNotes: interview.prepNotes || '',
        questions: interview.questions || [],
        jobApplicationId: interview.jobApplicationId,
      }
    }

    const date = initialDate || new Date()
    // Set default time to 10:00 AM
    date.setHours(10, 0, 0, 0)

    return {
      ...defaultInterviewFormData,
      scheduledAt: date.toISOString(),
    }
  })

  const [newQuestion, setNewQuestion] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleChange = (field: keyof InterviewFormData, value: InterviewFormData[keyof InterviewFormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateTimeChange = (date: string, time: string) => {
    if (date && time) {
      const [hours, minutes] = time.split(':')
      const dateObj = new Date(date)
      dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      handleChange('scheduledAt', dateObj.toISOString())
    }
  }

  const addQuestion = () => {
    if (newQuestion.trim()) {
      handleChange('questions', [...(formData.questions || []), newQuestion.trim()])
      setNewQuestion('')
    }
  }

  const removeQuestion = (index: number) => {
    handleChange(
      'questions',
      (formData.questions || []).filter((_, i) => i !== index)
    )
  }

  const scheduledDate = formData.scheduledAt ? new Date(formData.scheduledAt) : new Date()
  const dateValue = format(scheduledDate, 'yyyy-MM-dd')
  const timeValue = format(scheduledDate, 'HH:mm')

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Basic Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="title">Interview Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Technical Interview Round 1"
              required
            />
          </div>

          <div>
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g., Acme Inc"
              required
            />
          </div>

          <div>
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="e.g., Senior Developer"
              required
            />
          </div>

          <div>
            <Label htmlFor="interviewType">Interview Type *</Label>
            <Select
              value={formData.interviewType}
              onValueChange={(value) => handleChange('interviewType', value as InterviewType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(interviewTypeConfig) as InterviewType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    <span className="flex items-center gap-2">
                      <InterviewTypeIcon type={type} className="w-4 h-4" />
                      {interviewTypeConfig[type].label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration">Duration *</Label>
            <Select
              value={formData.duration.toString()}
              onValueChange={(value) => value && handleChange('duration', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Date & Time</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={dateValue}
              onChange={(e) => handleDateTimeChange(e.target.value, timeValue)}
              required
            />
          </div>

          <div>
            <Label htmlFor="time">Time *</Label>
            <Input
              id="time"
              type="time"
              value={timeValue}
              onChange={(e) => handleDateTimeChange(dateValue, e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => value && handleChange('timezone', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Location</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location">Address / Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g., 123 Main St, Office 4B"
            />
          </div>

          <div>
            <Label htmlFor="meetingLink">Meeting Link</Label>
            <Input
              id="meetingLink"
              type="url"
              value={formData.meetingLink}
              onChange={(e) => handleChange('meetingLink', e.target.value)}
              placeholder="e.g., https://zoom.us/j/..."
            />
          </div>
        </div>
      </div>

      {/* Interviewer Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Interviewer Information</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="interviewerName">Name</Label>
            <Input
              id="interviewerName"
              value={formData.interviewerName}
              onChange={(e) => handleChange('interviewerName', e.target.value)}
              placeholder="e.g., John Smith"
            />
          </div>

          <div>
            <Label htmlFor="interviewerEmail">Email</Label>
            <Input
              id="interviewerEmail"
              type="email"
              value={formData.interviewerEmail}
              onChange={(e) => handleChange('interviewerEmail', e.target.value)}
              placeholder="e.g., john@company.com"
            />
          </div>

          <div>
            <Label htmlFor="interviewerPhone">Phone</Label>
            <Input
              id="interviewerPhone"
              type="tel"
              value={formData.interviewerPhone}
              onChange={(e) => handleChange('interviewerPhone', e.target.value)}
              placeholder="e.g., +1 234 567 8900"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Notes & Preparation</h3>

        <div>
          <Label htmlFor="notes">General Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any notes about the interview..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="prepNotes">Preparation Notes</Label>
          <Textarea
            id="prepNotes"
            value={formData.prepNotes}
            onChange={(e) => handleChange('prepNotes', e.target.value)}
            placeholder="Things to prepare, topics to review..."
            rows={3}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#1a2a2a]">Questions to Ask</h3>

        <div className="flex gap-2">
          <Input
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Add a question..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addQuestion()
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addQuestion}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.questions && formData.questions.length > 0 && (
          <ul className="space-y-2">
            {formData.questions.map((question, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 bg-[#f8f6f4] rounded-lg"
              >
                <span className="flex-1 text-sm text-[#1a2a2a]">{question}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[#5a6a6a] hover:text-red-600"
                  onClick={() => removeQuestion(index)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e4df]">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : interview ? 'Update Interview' : 'Create Interview'}
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { InterviewFormData, InterviewType } from '@/lib/types/interview'

interface StepDetailsProps {
  formData: InterviewFormData
  onChange: (field: keyof InterviewFormData, value: InterviewFormData[keyof InterviewFormData]) => void
}

// Types that typically need meeting links vs physical locations
const virtualTypes: InterviewType[] = ['phone', 'video']
const onsiteTypes: InterviewType[] = ['onsite']

export function StepDetails({ formData, onChange }: StepDetailsProps) {
  const [showInterviewer, setShowInterviewer] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')

  const isVirtual = virtualTypes.includes(formData.interviewType)
  const isOnsite = onsiteTypes.includes(formData.interviewType)

  const addQuestion = () => {
    if (newQuestion.trim()) {
      onChange('questions', [...(formData.questions || []), newQuestion.trim()])
      setNewQuestion('')
    }
  }

  const removeQuestion = (index: number) => {
    onChange(
      'questions',
      (formData.questions || []).filter((_, i) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      {/* Location / Meeting Link - conditional based on type */}
      <div>
        <Label className="text-sm font-medium text-[#1a2a2a] mb-3 block">
          {isVirtual ? 'Meeting Link' : isOnsite ? 'Location' : 'Location / Meeting Link'}
        </Label>

        {(isVirtual || !isOnsite) && (
          <div className={cn(isOnsite ? 'mt-4' : '')}>
            {!isVirtual && <Label htmlFor="meetingLink" className="text-xs text-[#5a6a6a]">Meeting Link</Label>}
            <Input
              id="meetingLink"
              type="url"
              value={formData.meetingLink}
              onChange={(e) => onChange('meetingLink', e.target.value)}
              placeholder="e.g., https://zoom.us/j/..."
              className="mt-1"
            />
          </div>
        )}

        {(isOnsite || !isVirtual) && (
          <div className={cn(isVirtual ? 'mt-4' : '')}>
            {!isOnsite && <Label htmlFor="location" className="text-xs text-[#5a6a6a]">Address</Label>}
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g., 123 Main St, Office 4B"
              className="mt-1"
            />
          </div>
        )}
      </div>

      {/* Interviewer Info - Collapsible */}
      <div className="border border-[#e8e4df] rounded-lg">
        <button
          type="button"
          onClick={() => setShowInterviewer(!showInterviewer)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <span className="text-sm font-medium text-[#1a2a2a]">
            Interviewer Information
          </span>
          {showInterviewer ? (
            <ChevronUp className="w-4 h-4 text-[#5a6a6a]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#5a6a6a]" />
          )}
        </button>

        {showInterviewer && (
          <div className="px-4 pb-4 space-y-4 border-t border-[#e8e4df] pt-4">
            <div>
              <Label htmlFor="interviewerName">Name</Label>
              <Input
                id="interviewerName"
                value={formData.interviewerName}
                onChange={(e) => onChange('interviewerName', e.target.value)}
                placeholder="e.g., John Smith"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interviewerEmail">Email</Label>
                <Input
                  id="interviewerEmail"
                  type="email"
                  value={formData.interviewerEmail}
                  onChange={(e) => onChange('interviewerEmail', e.target.value)}
                  placeholder="e.g., john@company.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="interviewerPhone">Phone</Label>
                <Input
                  id="interviewerPhone"
                  type="tel"
                  value={formData.interviewerPhone}
                  onChange={(e) => onChange('interviewerPhone', e.target.value)}
                  placeholder="e.g., +1 234 567 8900"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any notes about the interview..."
          rows={3}
          className="mt-1.5"
        />
      </div>

      {/* Prep Notes */}
      <div>
        <Label htmlFor="prepNotes">Preparation Notes</Label>
        <Textarea
          id="prepNotes"
          value={formData.prepNotes}
          onChange={(e) => onChange('prepNotes', e.target.value)}
          placeholder="Things to prepare, topics to review..."
          rows={3}
          className="mt-1.5"
        />
      </div>

      {/* Questions to Ask */}
      <div>
        <Label className="mb-2 block">Questions to Ask</Label>

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
          <ul className="space-y-2 mt-3">
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
    </div>
  )
}

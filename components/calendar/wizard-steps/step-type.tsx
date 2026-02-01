'use client'

import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { InterviewType, InterviewFormData } from '@/lib/types/interview'
import { interviewTypeConfig } from '@/lib/types/interview'
import { InterviewTypeIcon } from '../interview-icons'

interface StepTypeProps {
  formData: InterviewFormData
  onChange: (field: keyof InterviewFormData, value: InterviewFormData[keyof InterviewFormData]) => void
}

const interviewTypes: InterviewType[] = ['phone', 'video', 'onsite', 'technical', 'behavioral', 'panel']

export function StepType({ formData, onChange }: StepTypeProps) {
  // Auto-generate title when type or company changes
  useEffect(() => {
    if (formData.company) {
      const typeLabel = interviewTypeConfig[formData.interviewType].label
      const generatedTitle = `${typeLabel} Interview - ${formData.company}`
      onChange('title', generatedTitle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.interviewType, formData.company])

  return (
    <div className="space-y-6">
      {/* Interview Type Cards */}
      <div>
        <Label className="text-sm font-medium text-[#1a2a2a] mb-3 block">
          Interview Type
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {interviewTypes.map((type) => {
            const config = interviewTypeConfig[type]
            const isSelected = formData.interviewType === type

            return (
              <button
                key={type}
                type="button"
                onClick={() => onChange('interviewType', type)}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all',
                  isSelected
                    ? [config.borderColor, config.bgColor]
                    : 'border-[#e8e4df] bg-white hover:border-[#1a4a4a]/50 hover:bg-[#f8f6f4]'
                )}
              >
                <InterviewTypeIcon
                  type={type}
                  className="w-6 h-6"
                  colored={isSelected}
                />
                <span className={cn(
                  'text-sm font-medium',
                  isSelected ? config.color : 'text-[#5a6a6a]'
                )}>
                  {config.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Company & Position */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => onChange('company', e.target.value)}
            placeholder="e.g., Acme Inc"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => onChange('position', e.target.value)}
            placeholder="e.g., Senior Developer"
            className="mt-1.5"
          />
        </div>
      </div>

      {/* Auto-generated title preview */}
      {formData.company && (
        <div className="p-3 bg-[#f8f6f4] rounded-lg">
          <p className="text-xs text-[#5a6a6a] mb-1">Interview title (auto-generated)</p>
          <p className="text-sm font-medium text-[#1a2a2a]">{formData.title}</p>
        </div>
      )}
    </div>
  )
}

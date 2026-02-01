'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { StepType } from './wizard-steps/step-type'
import { StepSchedule } from './wizard-steps/step-schedule'
import { StepDetails } from './wizard-steps/step-details'
import type { Interview, InterviewFormData } from '@/lib/types/interview'
import { defaultInterviewFormData } from '@/lib/types/interview'

interface InterviewWizardProps {
  initialDate?: Date
  interviews?: Interview[]
  onSubmit: (data: InterviewFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

type WizardStep = 'type' | 'schedule' | 'details'

const steps: { id: WizardStep; label: string }[] = [
  { id: 'type', label: 'Type' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'details', label: 'Details' },
]

export function InterviewWizard({
  initialDate,
  interviews = [],
  onSubmit,
  onCancel,
  isLoading = false,
}: InterviewWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('type')
  const [completedSteps, setCompletedSteps] = useState<Set<WizardStep>>(new Set())

  const [formData, setFormData] = useState<InterviewFormData>(() => {
    const date = initialDate || new Date()
    // Set default time to 10:00 AM
    date.setHours(10, 0, 0, 0)

    return {
      ...defaultInterviewFormData,
      scheduledAt: date.toISOString(),
    }
  })

  const handleChange = (field: keyof InterviewFormData, value: InterviewFormData[keyof InterviewFormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const canProceedFromType = formData.company.trim() !== '' && formData.position.trim() !== ''
  const canProceedFromSchedule = formData.scheduledAt !== '' && formData.duration > 0

  const canProceed = () => {
    switch (currentStep) {
      case 'type':
        return canProceedFromType
      case 'schedule':
        return canProceedFromSchedule
      case 'details':
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep === 'type' && canProceedFromType) {
      setCompletedSteps((prev) => new Set([...prev, 'type']))
      setCurrentStep('schedule')
    } else if (currentStep === 'schedule' && canProceedFromSchedule) {
      setCompletedSteps((prev) => new Set([...prev, 'schedule']))
      setCurrentStep('details')
    }
  }

  const handleBack = () => {
    if (currentStep === 'schedule') {
      setCurrentStep('type')
    } else if (currentStep === 'details') {
      setCurrentStep('schedule')
    }
  }

  const handleStepClick = (stepId: WizardStep) => {
    const stepIndex = steps.findIndex((s) => s.id === stepId)
    const currentIndex = steps.findIndex((s) => s.id === currentStep)

    // Can go back to any previous step, or forward only to completed steps
    if (stepIndex < currentIndex || completedSteps.has(stepId)) {
      setCurrentStep(stepId)
    }
  }

  const handleSubmit = async () => {
    await onSubmit(formData)
  }

  const handleSkipAndCreate = async () => {
    await onSubmit(formData)
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id)
          const isCurrent = currentStep === step.id
          const isClickable = index < currentStepIndex || isCompleted

          return (
            <div key={step.id} className="flex items-center">
              {/* Step indicator */}
              <button
                type="button"
                onClick={() => isClickable && handleStepClick(step.id)}
                disabled={!isClickable && !isCurrent}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors',
                  isCurrent && 'bg-[#1a4a4a] text-white',
                  isCompleted && !isCurrent && 'bg-[#1a4a4a]/10 text-[#1a4a4a]',
                  !isCurrent && !isCompleted && 'text-[#5a6a6a]',
                  isClickable && 'cursor-pointer hover:opacity-80',
                  !isClickable && !isCurrent && 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium',
                    isCurrent && 'bg-white text-[#1a4a4a]',
                    isCompleted && !isCurrent && 'bg-[#1a4a4a] text-white',
                    !isCurrent && !isCompleted && 'bg-[#e8e4df] text-[#5a6a6a]'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="text-sm font-medium">{step.label}</span>
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-8 h-0.5 mx-1',
                    completedSteps.has(step.id) ? 'bg-[#1a4a4a]' : 'bg-[#e8e4df]'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 'type' && (
          <StepType formData={formData} onChange={handleChange} />
        )}
        {currentStep === 'schedule' && (
          <StepSchedule formData={formData} onChange={handleChange} interviews={interviews} />
        )}
        {currentStep === 'details' && (
          <StepDetails formData={formData} onChange={handleChange} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#e8e4df]">
        <div>
          {currentStep !== 'type' && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>

          {currentStep === 'details' ? (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkipAndCreate}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Skip & Create'}
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Interview'}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

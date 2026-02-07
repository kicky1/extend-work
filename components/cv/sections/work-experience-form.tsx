'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCVStore from '@/lib/stores/cv-store'
import { Plus, Trash2, ChevronDown, GripVertical } from 'lucide-react'
import type { WorkExperience } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { SortableList } from '@/components/ui/sortable'

interface ExperienceAccordionProps {
  id: string
  index: number
  company: string
  position: string
  defaultOpen?: boolean
  onRemove: () => void
  children: React.ReactNode
  dragHandleProps: Pick<ReturnType<typeof useSortable>, 'attributes' | 'listeners'>
}

function ExperienceAccordion({ id, index, company, position, defaultOpen = false, onRemove, children, dragHandleProps }: ExperienceAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const title = company && position ? `${position} at ${company}` : company || position || `Experience ${index + 1}`

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center bg-muted/30">
        <button
          {...dragHandleProps.attributes as React.HTMLAttributes<HTMLButtonElement>}
          {...dragHandleProps.listeners as React.DOMAttributes<HTMLButtonElement>}
          className="cursor-grab active:cursor-grabbing p-3 hover:bg-muted/50 transition-colors touch-none"
          type="button"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between px-2 py-3 hover:bg-muted/50 transition-colors"
        >
          <div className="text-left">
            <span className="text-sm font-medium text-foreground">{title}</span>
            <span className="text-xs text-muted-foreground ml-2">#{index + 1}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="mr-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DraggableExperienceItemProps {
  exp: WorkExperience
  index: number
  isLast: boolean
  onRemove: () => void
  children: React.ReactNode
  itemRef?: React.RefObject<HTMLDivElement | null>
}

function DraggableExperienceItem({ exp, index, isLast, onRemove, children, itemRef }: DraggableExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exp.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        if (itemRef && node) {
          (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      }}
      style={style}
      className={isDragging ? 'opacity-50 z-50 relative' : ''}
    >
      <ExperienceAccordion
        id={exp.id}
        index={index}
        company={exp.company}
        position={exp.position}
        defaultOpen={isLast}
        onRemove={onRemove}
        dragHandleProps={{ attributes, listeners }}
      >
        {children}
      </ExperienceAccordion>
    </div>
  )
}

export default function WorkExperienceForm() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience, reorderWorkExperience } = useCVStore()
  const { workExperience } = cvData
  const lastItemRef = useRef<HTMLDivElement>(null)
  const prevLengthRef = useRef(workExperience.length)

  useEffect(() => {
    if (workExperience.length > prevLengthRef.current && lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    prevLengthRef.current = workExperience.length
  }, [workExperience.length])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div></div>
        <Button
          onClick={addWorkExperience}
          size="sm"
        >
          <Plus data-icon="inline-start" />
          Add Experience
        </Button>
      </div>

      {workExperience.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No work experience added yet.</p>
          <p className="text-sm mt-1">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <SortableList
          items={workExperience}
          onReorder={reorderWorkExperience}
          strategy="vertical"
          className="space-y-3"
        >
          {workExperience.map((exp, index) => (
              <DraggableExperienceItem
                key={exp.id}
                exp={exp}
                index={index}
                isLast={index === workExperience.length - 1}
                onRemove={() => removeWorkExperience(exp.id)}
                itemRef={index === workExperience.length - 1 ? lastItemRef : undefined}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor={`company-${exp.id}`}>
                      Company *
                    </FieldLabel>
                    <Input
                      id={`company-${exp.id}`}
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, { company: e.target.value })
                      }
                      placeholder="Company Name"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor={`position-${exp.id}`}>
                      Position *
                    </FieldLabel>
                    <Input
                      id={`position-${exp.id}`}
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, { position: e.target.value })
                      }
                      placeholder="Job Title"
                    />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor={`exp-location-${exp.id}`}>
                    Location
                  </FieldLabel>
                  <Input
                    id={`exp-location-${exp.id}`}
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, { location: e.target.value })
                    }
                    placeholder="City, State"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor={`start-date-${exp.id}`}>
                      Start Date
                    </FieldLabel>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, { startDate: e.target.value })
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor={`end-date-${exp.id}`}>
                      End Date
                    </FieldLabel>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, { endDate: e.target.value })
                      }
                      disabled={exp.current}
                    />
                  </Field>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, { current: e.target.checked })
                    }
                    className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
                  />
                  <label
                    htmlFor={`current-${exp.id}`}
                    className="text-sm text-foreground"
                  >
                    I currently work here
                  </label>
                </div>

                <Field>
                  <FieldLabel htmlFor={`description-${exp.id}`}>
                    Description
                  </FieldLabel>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, { description: e.target.value })
                    }
                    rows={3}
                    placeholder="Brief description of your role and responsibilities..."
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`achievements-${exp.id}`}>
                    Key Achievements (one per line)
                  </FieldLabel>
                  <Textarea
                    id={`achievements-${exp.id}`}
                    value={exp.achievements.join('\n')}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, {
                        achievements: e.target.value.split('\n').filter((a) => a.trim()),
                      })
                    }
                    rows={4}
                    placeholder="• Increased sales by 30%&#10;• Led team of 5 engineers&#10;• Launched new product feature"
                  />
                </Field>
              </DraggableExperienceItem>
          ))}
        </SortableList>
      )}
    </div>
  )
}

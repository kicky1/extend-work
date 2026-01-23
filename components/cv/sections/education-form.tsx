'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCVStore from '@/lib/stores/cv-store'
import { Plus, Trash2, ChevronDown, GripVertical } from 'lucide-react'
import type { Education } from '@/lib/types/cv'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel } from '@/components/ui/field'
import { SortableList } from '@/components/ui/sortable'

interface EducationAccordionProps {
  id: string
  index: number
  institution: string
  degree: string
  field: string
  defaultOpen?: boolean
  onRemove: () => void
  children: React.ReactNode
  dragHandleProps: Pick<ReturnType<typeof useSortable>, 'attributes' | 'listeners'>
}

function EducationAccordion({ id, index, institution, degree, field, defaultOpen = false, onRemove, children, dragHandleProps }: EducationAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const degreeField = degree && field ? `${degree} in ${field}` : degree || field || ''
  const title = degreeField && institution ? `${degreeField} - ${institution}` : institution || degreeField || `Education ${index + 1}`

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
            <span className="text-sm font-medium text-foreground truncate">{title}</span>
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

interface DraggableEducationItemProps {
  edu: Education
  index: number
  isLast: boolean
  onRemove: () => void
  children: React.ReactNode
}

function DraggableEducationItem({ edu, index, isLast, onRemove, children }: DraggableEducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: edu.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50 z-50' : ''}
    >
      <EducationAccordion
        id={edu.id}
        index={index}
        institution={edu.institution}
        degree={edu.degree}
        field={edu.field}
        defaultOpen={isLast}
        onRemove={onRemove}
        dragHandleProps={{ attributes, listeners }}
      >
        {children}
      </EducationAccordion>
    </div>
  )
}

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation, reorderEducation } = useCVStore()
  const { education } = cvData

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Education
        </h3>
        <Button
          onClick={addEducation}
          size="sm"
        >
          <Plus data-icon="inline-start" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No education added yet.</p>
          <p className="text-sm mt-1">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <SortableList
          items={education}
          onReorder={reorderEducation}
          strategy="vertical"
          className="space-y-3"
        >
          {education.map((edu, index) => (
            <DraggableEducationItem
              key={edu.id}
              edu={edu}
              index={index}
              isLast={index === education.length - 1}
              onRemove={() => removeEducation(edu.id)}
            >
              <Field>
                <FieldLabel htmlFor={`institution-${edu.id}`}>
                  Institution *
                </FieldLabel>
                <Input
                  id={`institution-${edu.id}`}
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, { institution: e.target.value })
                  }
                  placeholder="University Name"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`degree-${edu.id}`}>
                    Degree *
                  </FieldLabel>
                  <Input
                    id={`degree-${edu.id}`}
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    placeholder="Bachelor's, Master's, etc."
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`field-${edu.id}`}>
                    Field of Study *
                  </FieldLabel>
                  <Input
                    id={`field-${edu.id}`}
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, { field: e.target.value })
                    }
                    placeholder="Computer Science, Business, etc."
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor={`edu-start-date-${edu.id}`}>
                    Start Date
                  </FieldLabel>
                  <Input
                    id={`edu-start-date-${edu.id}`}
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`edu-end-date-${edu.id}`}>
                    End Date
                  </FieldLabel>
                  <Input
                    id={`edu-end-date-${edu.id}`}
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                    disabled={edu.current}
                  />
                </Field>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-edu-${edu.id}`}
                  checked={edu.current}
                  onChange={(e) =>
                    updateEducation(edu.id, { current: e.target.checked })
                  }
                  className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
                />
                <label
                  htmlFor={`current-edu-${edu.id}`}
                  className="text-sm text-foreground"
                >
                  Currently studying here
                </label>
              </div>

              <Field>
                <FieldLabel htmlFor={`gpa-${edu.id}`}>
                  GPA (Optional)
                </FieldLabel>
                <Input
                  id={`gpa-${edu.id}`}
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) =>
                    updateEducation(edu.id, { gpa: e.target.value })
                  }
                  placeholder="3.8/4.0"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor={`edu-description-${edu.id}`}>
                  Description (Optional)
                </FieldLabel>
                <Textarea
                  id={`edu-description-${edu.id}`}
                  value={edu.description || ''}
                  onChange={(e) =>
                    updateEducation(edu.id, { description: e.target.value })
                  }
                  rows={3}
                  placeholder="Notable courses, honors, activities..."
                />
              </Field>
            </DraggableEducationItem>
          ))}
        </SortableList>
      )}
    </div>
  )
}

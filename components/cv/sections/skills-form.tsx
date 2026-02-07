'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCVStore from '@/lib/stores/cv-store'
import { Plus, Trash2, ChevronDown, GripVertical, Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortableList } from '@/components/ui/sortable'
import type { Skill } from '@/lib/types/cv'

const defaultCategories = [
  { label: 'Technical Skills', value: 'technical' },
  { label: 'Soft Skills', value: 'soft' },
  { label: 'Tools & Technologies', value: 'tool' },
]

const defaultCategoryValues = ['technical', 'soft', 'tool']

interface AccordionSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  action?: React.ReactNode
}

function AccordionSection({ title, defaultOpen = true, children, action }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center bg-muted/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
        >
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>
        {action && <div className="pr-4">{action}</div>}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DraggableSkillItemProps {
  skill: Skill
  allCategories: { label: string; value: string }[]
  levelItems: readonly { label: string; value: string }[]
  onUpdate: (id: string, skill: Partial<Skill>) => void
  onRemove: (id: string) => void
  itemRef?: React.RefObject<HTMLDivElement | null>
}

function DraggableSkillItem({ skill, allCategories, levelItems, onUpdate, onRemove, itemRef }: DraggableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id })

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
      <div className="p-3 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors touch-none flex-shrink-0"
            type="button"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <Input
              id={`skill-name-${skill.id}`}
              type="text"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, { name: e.target.value })}
              placeholder="Skill name"
              className="h-9"
            />

            <Select
              items={allCategories}
              value={skill.category}
              onValueChange={(value) => onUpdate(skill.id, { category: value ?? undefined })}
            >
              <SelectTrigger id={`skill-category-${skill.id}`} className="h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {allCategories.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              items={levelItems}
              value={skill.level || 'intermediate'}
              onValueChange={(value) =>
                onUpdate(skill.id, {
                  level: value as 'beginner' | 'intermediate' | 'advanced' | 'expert',
                })
              }
            >
              <SelectTrigger id={`skill-level-${skill.id}`} className="h-9">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {levelItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(skill.id)}
            className="flex-shrink-0 h-9 w-9"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SkillsForm() {
  const { cvData, addSkill, updateSkill, removeSkill, updateSkills, addCustomCategory, removeCustomCategory } = useCVStore()
  const { skills, customSkillCategories = [] } = cvData
  const lastSkillRef = useRef<HTMLDivElement>(null)
  const prevSkillsLengthRef = useRef(skills.length)
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    if (skills.length > prevSkillsLengthRef.current && lastSkillRef.current) {
      lastSkillRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    prevSkillsLengthRef.current = skills.length
  }, [skills.length])

  const allCategories = [
    ...defaultCategories,
    ...customSkillCategories.map(c => ({ label: c, value: c }))
  ]

  const levelItems = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' },
  ] as const

  const handleAddCategory = () => {
    const trimmed = newCategory.trim()
    if (trimmed && !customSkillCategories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      addCustomCategory(trimmed)
      setNewCategory('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Skill Categories Section */}
      <AccordionSection
        title="Skill Categories"
        defaultOpen={false}
      >
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Manage categories to organize your skills. Default categories cannot be removed.
          </p>

          {/* Add new category */}
          <div className="flex gap-2">
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              className="h-9 text-sm"
            />
            <Button onClick={handleAddCategory} size="sm" disabled={!newCategory.trim()} className="h-9">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>

          {/* Default categories */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Default Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {defaultCategories.map((category) => (
                <div
                  key={category.value}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-muted text-muted-foreground rounded-md text-xs"
                >
                  <Tag className="w-3 h-3" />
                  <span>{category.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom categories */}
          {customSkillCategories.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Custom Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {customSkillCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{category}</span>
                    <button
                      onClick={() => removeCustomCategory(category)}
                      className="ml-0.5 hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* Skills Section */}
      <AccordionSection
        title="Skills"
        defaultOpen={true}
        action={
          <Button onClick={addSkill} size="sm">
            <Plus data-icon="inline-start" />
            Add Skill
          </Button>
        }
      >
        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet.</p>
            <p className="text-sm mt-1">Click "Add Skill" to get started.</p>
          </div>
        ) : (
          <SortableList
            items={skills}
            onReorder={updateSkills}
            strategy="vertical"
            className="space-y-2"
          >
            {skills.map((skill, index) => (
                <DraggableSkillItem
                  key={skill.id}
                  skill={skill}
                  allCategories={allCategories}
                  levelItems={levelItems}
                  onUpdate={updateSkill}
                  onRemove={removeSkill}
                  itemRef={index === skills.length - 1 ? lastSkillRef : undefined}
                />
            ))}
          </SortableList>
        )}
      </AccordionSection>
    </div>
  )
}

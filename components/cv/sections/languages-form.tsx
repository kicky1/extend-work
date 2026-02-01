'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useCVStore from '@/lib/stores/cv-store'
import { Plus, Trash2, GripVertical, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortableList } from '@/components/ui/sortable'
import type { Language } from '@/lib/types/cv'

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

const levelItems = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Expert / Native', value: 'expert' },
] as const

interface DraggableLanguageItemProps {
  language: Language
  onUpdate: (id: string, language: Partial<Language>) => void
  onRemove: (id: string) => void
  itemRef?: React.RefObject<HTMLDivElement | null>
}

function DraggableLanguageItem({ language, onUpdate, onRemove, itemRef }: DraggableLanguageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: language.id })

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

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <Input
              id={`language-name-${language.id}`}
              type="text"
              value={language.name}
              onChange={(e) => onUpdate(language.id, { name: e.target.value })}
              placeholder="Language name (e.g., English)"
              className="h-9"
            />

            <Select
              items={levelItems}
              value={language.level}
              onValueChange={(value) =>
                onUpdate(language.id, {
                  level: value as Language['level'],
                })
              }
            >
              <SelectTrigger id={`language-level-${language.id}`} className="h-9">
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
            onClick={() => onRemove(language.id)}
            className="flex-shrink-0 h-9 w-9"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function LanguagesForm() {
  const { cvData, addLanguage, updateLanguage, removeLanguage, updateLanguages } = useCVStore()
  const { languages } = cvData
  const lastLanguageRef = useRef<HTMLDivElement>(null)
  const prevLanguagesLengthRef = useRef(languages.length)

  useEffect(() => {
    if (languages.length > prevLanguagesLengthRef.current && lastLanguageRef.current) {
      lastLanguageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    prevLanguagesLengthRef.current = languages.length
  }, [languages.length])

  return (
    <div className="space-y-4">
      <AccordionSection
        title="Languages"
        defaultOpen={true}
        action={
          <Button onClick={addLanguage} size="sm">
            <Plus data-icon="inline-start" />
            Add Language
          </Button>
        }
      >
        {languages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No languages added yet.</p>
            <p className="text-sm mt-1">Click "Add Language" to get started.</p>
          </div>
        ) : (
          <SortableList
            items={languages}
            onReorder={updateLanguages}
            strategy="vertical"
            className="space-y-2"
          >
            {languages.map((language, index) => (
              <DraggableLanguageItem
                key={language.id}
                language={language}
                onUpdate={updateLanguage}
                onRemove={removeLanguage}
                itemRef={index === languages.length - 1 ? lastLanguageRef : undefined}
              />
            ))}
          </SortableList>
        )}
      </AccordionSection>

      {/* Tips Section */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          Tips for Adding Languages
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>List your strongest languages first</li>
          <li>Be honest about your proficiency level</li>
          <li>Include both spoken and programming languages if relevant</li>
        </ul>
      </div>
    </div>
  )
}

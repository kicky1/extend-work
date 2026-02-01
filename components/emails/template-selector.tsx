'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useEmailStore from '@/lib/stores/email-store'
import { FileText, Search, Loader2 } from 'lucide-react'
import { replaceTemplateVariables, templateCategories } from '@/lib/types/email'
import type { EmailTemplate } from '@/lib/types/email'

interface TemplateSelectorProps {
  onSelect: (subject: string, body: string) => void
  variables?: Record<string, string>
}

export function TemplateSelector({ onSelect, variables = {} }: TemplateSelectorProps) {
  const { templates, loadTemplates, isTemplatesLoading, incrementTemplateUse } = useEmailStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (open && templates.length === 0) {
      loadTemplates()
    }
  }, [open, templates.length, loadTemplates])

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (template: EmailTemplate) => {
    const subject = replaceTemplateVariables(template.subject, variables)
    const body = replaceTemplateVariables(template.body, variables)
    onSelect(subject, body)
    incrementTemplateUse(template.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {isTemplatesLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              {search ? 'No templates match your search' : 'No templates available'}
            </div>
          ) : (
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {filteredTemplates.map((template) => {
                const categoryLabel = templateCategories.find(
                  c => c.value === template.category
                )?.label

                return (
                  <button
                    key={template.id}
                    onClick={() => handleSelect(template)}
                    className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{template.name}</span>
                      {categoryLabel && (
                        <span className="text-xs text-muted-foreground">
                          {categoryLabel}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                      {template.subject}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

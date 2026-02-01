'use client'

import { useEffect, useState } from 'react'
import useEmailStore from '@/lib/stores/email-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Loader2, Copy } from 'lucide-react'
import { TemplateForm } from './template-form'
import type { EmailTemplate } from '@/lib/types/email'
import { templateCategories } from '@/lib/types/email'
import { defaultJobTemplates } from '@/lib/constants/email-templates'

export function TemplateList() {
  const { templates, loadTemplates, isTemplatesLoading, deleteTemplate, createTemplate } = useEmailStore()
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadTemplates()
  }, [loadTemplates])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      await deleteTemplate(id)
    }
  }

  const handleCopyDefaultTemplate = async (defaultTemplate: typeof defaultJobTemplates[number]) => {
    await createTemplate({
      name: defaultTemplate.name,
      subject: defaultTemplate.subject,
      body: defaultTemplate.body,
      variables: defaultTemplate.variables,
      category: defaultTemplate.category,
    })
  }

  if (isTemplatesLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isCreating || editingTemplate) {
    return (
      <TemplateForm
        template={editingTemplate}
        onClose={() => {
          setIsCreating(false)
          setEditingTemplate(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Email Templates</h2>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      {/* User templates */}
      {templates.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">My Templates</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => {
              const categoryLabel = templateCategories.find(
                c => c.value === template.category
              )?.label

              return (
                <Card key={template.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{template.name}</h3>
                        {categoryLabel && (
                          <Badge variant="secondary">{categoryLabel}</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground truncate">
                        {template.subject}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Used {template.useCount} time{template.useCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingTemplate(template)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(template.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Default job application templates */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Job Application Templates</h3>
        <p className="text-xs text-muted-foreground">
          Click &quot;Copy to My Templates&quot; to customize these templates.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {defaultJobTemplates.map((template, index) => {
            const categoryLabel = templateCategories.find(
              c => c.value === template.category
            )?.label

            return (
              <Card key={index} className="p-4 border-dashed">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{template.name}</h3>
                      {categoryLabel && (
                        <Badge variant="outline">{categoryLabel}</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                      {template.subject}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Variables: {template.variables.map(v => `{{${v}}}`).join(', ')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyDefaultTemplate(template)}
                    className="gap-1 shrink-0"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import useEmailStore from '@/lib/stores/email-store'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import type { EmailTemplate, TemplateCategory } from '@/lib/types/email'
import { templateCategories, commonTemplateVariables } from '@/lib/types/email'

interface TemplateFormProps {
  template?: EmailTemplate | null
  onClose: () => void
}

export function TemplateForm({ template, onClose }: TemplateFormProps) {
  const { createTemplate, updateTemplate } = useEmailStore()

  const [name, setName] = useState(template?.name || '')
  const [subject, setSubject] = useState(template?.subject || '')
  const [body, setBody] = useState(template?.body || '')
  const [category, setCategory] = useState<TemplateCategory | ''>(
    (template?.category as TemplateCategory) || ''
  )
  const [isSaving, setIsSaving] = useState(false)

  const isEditing = !!template

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !subject.trim() || !body.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSaving(true)

    try {
      // Extract variables from body
      const variableMatches = body.match(/\{\{(\w+)\}\}/g) || []
      const variables = [...new Set(variableMatches.map(v => v.slice(2, -2)))]

      if (isEditing) {
        await updateTemplate(template.id, {
          name,
          subject,
          body,
          category: category || undefined,
          variables,
        })
      } else {
        await createTemplate({
          name,
          subject,
          body,
          category: category || undefined,
          variables,
        })
      }
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to save template')
    } finally {
      setIsSaving(false)
    }
  }

  const insertVariable = (variable: string) => {
    setBody(prev => prev + variable)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {isEditing ? 'Edit Template' : 'New Template'}
          </h2>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Template Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Job Application Follow-up"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TemplateCategory | '')}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="">Select a category</option>
            {templateCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Email Subject *</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Following up on my application for {{job_title}}"
          />
        </div>

        {/* Body */}
        <div className="space-y-2">
          <Label htmlFor="body">Email Body *</Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email template..."
            className="min-h-[200px]"
          />
        </div>

        {/* Variables */}
        <div className="space-y-2">
          <Label>Insert Variables</Label>
          <div className="flex flex-wrap gap-2">
            {commonTemplateVariables.map((variable) => (
              <Button
                key={variable}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertVariable(variable)}
              >
                {variable}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Variables will be replaced with actual values when using the template.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="gap-2">
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isEditing ? 'Save Changes' : 'Create Template'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

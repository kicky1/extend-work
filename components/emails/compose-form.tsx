'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useEmailStore from '@/lib/stores/email-store'
import { Loader2, Send, Save, X, ChevronDown, ChevronUp } from 'lucide-react'
import { TemplateSelector } from './template-selector'

interface ComposeFormProps {
  onClose: () => void
}

export function ComposeForm({ onClose }: ComposeFormProps) {
  const { composeData, updateComposeData, sendMessage, saveDraft, replyToThread } = useEmailStore()

  const [to, setTo] = useState(composeData?.to?.join(', ') || '')
  const [cc, setCc] = useState(composeData?.cc?.join(', ') || '')
  const [bcc, setBcc] = useState(composeData?.bcc?.join(', ') || '')
  const [subject, setSubject] = useState(composeData?.subject || '')
  const [body, setBody] = useState(composeData?.body || '')
  const [showCcBcc, setShowCcBcc] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const parseEmails = (value: string) =>
    value.split(',').map(e => e.trim()).filter(Boolean)

  const handleSend = async () => {
    if (!to.trim()) {
      toast.error('Please enter a recipient')
      return
    }

    setIsSending(true)

    try {
      await sendMessage({
        to: parseEmails(to),
        cc: parseEmails(cc),
        bcc: parseEmails(bcc),
        subject,
        body,
        replyToThreadId: replyToThread?.id,
      })
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email')
    } finally {
      setIsSending(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)

    try {
      await saveDraft({
        to: parseEmails(to),
        cc: parseEmails(cc),
        bcc: parseEmails(bcc),
        subject,
        body,
        replyToThreadId: replyToThread?.id,
      })
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">
          {replyToThread ? `Reply: ${replyToThread.subject}` : 'New Message'}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* To field */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="to" className="w-12">To</Label>
            <Input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCcBcc(!showCcBcc)}
            >
              Cc/Bcc
              {showCcBcc ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Cc/Bcc fields */}
        {showCcBcc && (
          <>
            <div className="flex items-center gap-2">
              <Label htmlFor="cc" className="w-12">Cc</Label>
              <Input
                id="cc"
                type="email"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="cc@example.com"
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="bcc" className="w-12">Bcc</Label>
              <Input
                id="bcc"
                type="email"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                placeholder="bcc@example.com"
                className="flex-1"
              />
            </div>
          </>
        )}

        {/* Subject field */}
        <div className="flex items-center gap-2">
          <Label htmlFor="subject" className="w-12">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            className="flex-1"
          />
        </div>

        {/* Template selector */}
        <div className="flex items-center gap-2">
          <div className="w-12" />
          <TemplateSelector
            onSelect={(templateSubject, templateBody) => {
              setSubject(templateSubject)
              setBody(templateBody)
            }}
          />
        </div>

        {/* Body */}
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message..."
          className="min-h-[300px] flex-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t p-4">
        <Button
          onClick={handleSend}
          disabled={isSending || isSaving}
          className="gap-2"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Send
        </Button>
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSending || isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Draft
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Discard
        </Button>
      </div>
    </div>
  )
}

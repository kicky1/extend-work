'use client'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Reply, Forward, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { EmailMessage } from '@/lib/types/email'

// Sanitize HTML to remove dangerous elements that could affect the page
function sanitizeEmailHtml(html: string): string {
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Remove style tags and their content (prevents CSS leaking to the page)
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]+/gi, '')
  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
  return sanitized
}

interface MessageBubbleProps {
  message: EmailMessage
  isFirst: boolean
  isLast: boolean
  onReply?: () => void
  onForward?: () => void
}

export function MessageBubble({
  message,
  isFirst,
  isLast,
  onReply,
  onForward,
}: MessageBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(isLast)
  const [showHtml, setShowHtml] = useState(true)

  const timestamp = message.receivedAt || message.sentAt
  const formattedTime = timestamp
    ? format(new Date(timestamp), 'MMM d, yyyy h:mm a')
    : ''

  const fromName = message.from.name || message.from.email
  const toList = message.to.map(t => t.name || t.email).join(', ')

  return (
    <div className={cn('border-b last:border-b-0', isExpanded && 'bg-accent/30')}>
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-3 p-4 text-left hover:bg-accent/50"
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {fromName.charAt(0).toUpperCase()}
        </div>

        {/* From/To info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{fromName}</span>
            {message.isSent && (
              <span className="text-xs text-muted-foreground">to {toList}</span>
            )}
          </div>
          {!isExpanded && (
            <p className="truncate text-sm text-muted-foreground">
              {message.bodyText?.substring(0, 100) || '(No content)'}
            </p>
          )}
        </div>

        {/* Timestamp and expand icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Recipients details */}
          <div className="mb-4 space-y-1 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">From:</span> {message.from.name ? `${message.from.name} <${message.from.email}>` : message.from.email}
            </div>
            <div>
              <span className="font-medium">To:</span> {message.to.map(t => t.name ? `${t.name} <${t.email}>` : t.email).join(', ')}
            </div>
            {message.cc.length > 0 && (
              <div>
                <span className="font-medium">Cc:</span> {message.cc.map(t => t.name ? `${t.name} <${t.email}>` : t.email).join(', ')}
              </div>
            )}
          </div>

          {/* Message body */}
          <div className="rounded-lg border bg-background p-4">
            {showHtml && message.bodyHtml ? (
              <div
                className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-sans prose-p:font-sans prose-li:font-sans prose-td:font-sans"
                dangerouslySetInnerHTML={{ __html: sanitizeEmailHtml(message.bodyHtml) }}
              />
            ) : (
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {message.bodyText || '(No content)'}
              </pre>
            )}
          </div>

          {/* Toggle HTML/Text */}
          {message.bodyHtml && message.bodyText && (
            <button
              onClick={() => setShowHtml(!showHtml)}
              className="mt-2 text-xs text-muted-foreground hover:underline"
            >
              Show {showHtml ? 'plain text' : 'HTML'}
            </button>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={onReply}>
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
            <Button variant="outline" size="sm" onClick={onForward}>
              <Forward className="mr-2 h-4 w-4" />
              Forward
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

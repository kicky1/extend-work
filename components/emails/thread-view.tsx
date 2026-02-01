'use client'

import { useEffect } from 'react'
import useEmailStore from '@/lib/stores/email-store'
import { MessageBubble } from './message-bubble'
import { Button } from '@/components/ui/button'
import {
  Archive,
  Trash2,
  Star,
  MailOpen,
  Mail,
  Reply,
  Loader2,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThreadView() {
  const {
    threads,
    selectedThreadId,
    selectThread,
    messages,
    isMessagesLoading,
    toggleStar,
    archiveThread,
    markRead,
    deleteThread,
    openCompose,
  } = useEmailStore()

  const thread = threads.find(t => t.id === selectedThreadId)

  if (!selectedThreadId || !thread) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select an email to view
      </div>
    )
  }

  const handleReply = () => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage) {
      openCompose({
        to: [lastMessage.from.email],
        subject: thread.subject?.startsWith('Re:')
          ? thread.subject
          : `Re: ${thread.subject || ''}`,
        replyToThreadId: thread.id,
      }, thread)
    }
  }

  const handleForward = () => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage) {
      openCompose({
        subject: thread.subject?.startsWith('Fwd:')
          ? thread.subject
          : `Fwd: ${thread.subject || ''}`,
        body: `<br><br>---------- Forwarded message ----------<br>${lastMessage.bodyHtml || lastMessage.bodyText || ''}`,
      })
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => selectThread(null)}
          className="md:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <h2 className="flex-1 truncate text-lg font-semibold">
          {thread.subject || '(No Subject)'}
        </h2>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleStar(thread.id)}
            className={cn(thread.isStarred && 'text-yellow-500')}
          >
            <Star className={cn('h-4 w-4', thread.isStarred && 'fill-current')} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => markRead(thread.id, !thread.isRead)}
          >
            {thread.isRead ? (
              <Mail className="h-4 w-4" />
            ) : (
              <MailOpen className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => archiveThread(thread.id)}
          >
            <Archive className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              deleteThread(thread.id)
              selectThread(null)
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {isMessagesLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No messages in this thread
          </div>
        ) : (
          <div className="divide-y">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isFirst={index === 0}
                isLast={index === messages.length - 1}
                onReply={handleReply}
                onForward={handleForward}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reply button */}
      {!isMessagesLoading && messages.length > 0 && (
        <div className="border-t p-4">
          <Button onClick={handleReply} className="w-full gap-2">
            <Reply className="h-4 w-4" />
            Reply
          </Button>
        </div>
      )}
    </div>
  )
}

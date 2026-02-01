'use client'

import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { Star, Paperclip } from 'lucide-react'
import type { EmailThread } from '@/lib/types/email'

interface ThreadListItemProps {
  thread: EmailThread
  isSelected: boolean
  onClick: () => void
  onToggleStar: (e: React.MouseEvent) => void
}

export function ThreadListItem({
  thread,
  isSelected,
  onClick,
  onToggleStar,
}: ThreadListItemProps) {
  // For sent emails, show the recipient (second participant)
  // For received emails, show the sender (first participant)
  const displayParticipant = thread.isSent
    ? thread.participants[1] || thread.participants[0]
    : thread.participants[0]
  const displayName = thread.isSent
    ? `To: ${displayParticipant?.name || displayParticipant?.email || 'Unknown'}`
    : displayParticipant?.name || displayParticipant?.email || 'Unknown'
  const timeAgo = thread.lastMessageAt
    ? formatDistanceToNow(new Date(thread.lastMessageAt), { addSuffix: true })
    : ''

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={cn(
        'flex w-full cursor-pointer flex-col gap-1 border-b px-4 py-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isSelected && 'bg-accent',
        !thread.isRead && 'bg-accent/50'
      )}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleStar}
          className={cn(
            'flex-shrink-0 rounded p-0.5 hover:bg-accent-foreground/10',
            thread.isStarred ? 'text-yellow-500' : 'text-muted-foreground'
          )}
        >
          <Star className={cn('h-4 w-4', thread.isStarred && 'fill-current')} />
        </button>
        <span
          className={cn(
            'flex-1 truncate text-sm',
            !thread.isRead && 'font-semibold'
          )}
        >
          {displayName}
        </span>
        {thread.messageCount > 1 && (
          <span className="flex-shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            {thread.messageCount}
          </span>
        )}
        <span className="flex-shrink-0 text-xs text-muted-foreground">
          {timeAgo}
        </span>
      </div>
      <div className="flex items-center gap-2 pl-6">
        <span
          className={cn(
            'flex-1 truncate text-sm',
            !thread.isRead ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {thread.subject || '(No Subject)'}
        </span>
      </div>
      {thread.snippet && (
        <p className="truncate pl-6 text-xs text-muted-foreground">
          {thread.snippet}
        </p>
      )}
    </div>
  )
}

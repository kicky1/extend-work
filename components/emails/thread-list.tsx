'use client'

import { useEffect, useRef } from 'react'
import useEmailStore from '@/lib/stores/email-store'
import { ThreadListItem } from './thread-list-item'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2, InboxIcon, Download } from 'lucide-react'

export function ThreadList() {
  const {
    threads,
    selectedThreadId,
    selectThread,
    toggleStar,
    isThreadsLoading,
    isLoadingMore,
    hasMore,
    loadMoreThreads,
    filter,
    accounts,
    selectedAccountId,
    nextPageToken,
    isFetchingMore,
    fetchMoreFromProvider,
  } = useEmailStore()

  const selectedAccount = accounts.find(a => a.id === selectedAccountId)

  // Infinite scroll observer
  const sentinelRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Use refs to avoid stale closures in IntersectionObserver
  const hasMoreRef = useRef(hasMore)
  const isLoadingMoreRef = useRef(isLoadingMore)
  const nextPageTokenRef = useRef(nextPageToken)
  const isFetchingMoreRef = useRef(isFetchingMore)

  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore
  }, [isLoadingMore])

  useEffect(() => {
    nextPageTokenRef.current = nextPageToken
  }, [nextPageToken])

  useEffect(() => {
    isFetchingMoreRef.current = isFetchingMore
  }, [isFetchingMore])

  useEffect(() => {
    const sentinel = sentinelRef.current
    const scrollContainer = scrollContainerRef.current
    if (!sentinel || !scrollContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          // First try local pagination
          if (hasMoreRef.current && !isLoadingMoreRef.current) {
            loadMoreThreads()
          }
          // Then try provider fetch if local exhausted
          else if (!hasMoreRef.current && nextPageTokenRef.current && !isFetchingMoreRef.current) {
            fetchMoreFromProvider()
          }
        }
      },
      {
        root: scrollContainer,
        rootMargin: '200px',
        threshold: 0,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMoreThreads, fetchMoreFromProvider])

  const handleToggleStar = (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation()
    toggleStar(threadId)
  }

  if (!selectedAccountId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <InboxIcon className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="font-semibold">No email account connected</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Connect a Gmail or Outlook account to start using emails.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <a href="/api/email/connect?provider=gmail">Connect Gmail</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/api/email/connect?provider=outlook">Connect Outlook</a>
          </Button>
        </div>
        <p className="max-w-sm text-xs text-muted-foreground">
          Tip: Use a dedicated email address for job applications to keep your inbox focused and avoid syncing personal emails.
        </p>
      </div>
    )
  }

  if (isThreadsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (threads.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <InboxIcon className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="font-semibold">No emails found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filter === 'inbox'
              ? 'Your inbox is empty. Click sync to fetch new emails.'
              : `No emails in ${filter}.`}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Search bar */}
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Thread list */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <ThreadListItem
            key={thread.id}
            thread={thread}
            isSelected={thread.id === selectedThreadId}
            onClick={() => selectThread(thread.id)}
            onToggleStar={(e) => handleToggleStar(e, thread.id)}
          />
        ))}

       

        {/* Load more from provider button - only show for inbox/all, not for sent/drafts */}
        {nextPageToken && filter !== 'sent' && (
          <div className="flex flex-col items-center gap-2 border-t py-4">
            <p className="text-xs text-muted-foreground">
              {threads.length} emails loaded
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMoreFromProvider}
              disabled={isFetchingMore}
            >
              {isFetchingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Load more from {selectedAccount?.provider === 'gmail' ? 'Gmail' : 'Outlook'}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

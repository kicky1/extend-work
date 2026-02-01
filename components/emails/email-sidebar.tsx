'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import useEmailStore from '@/lib/stores/email-store'
import type { EmailFilter } from '@/lib/types/email'
import {
  Inbox,
  Send,
  Star,
  FileText,
  Plus,
  RefreshCw,
  Trash2,
  Loader2,
} from 'lucide-react'

const filterItems: { value: EmailFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'inbox', label: 'Inbox', icon: Inbox },
  { value: 'sent', label: 'Sent', icon: Send },
  { value: 'starred', label: 'Starred', icon: Star },
]

const navItems = [
  { href: '/emails', label: 'Inbox', icon: Inbox },
  { href: '/emails/templates', label: 'Templates', icon: FileText },
]

interface EmailSidebarProps {
  onNavigate?: () => void
}

export function EmailSidebar({ onNavigate }: EmailSidebarProps) {
  const pathname = usePathname()
  const [isDeleting, setIsDeleting] = useState(false)
  const {
    filter,
    setFilter,
    threads,
    openCompose,
    syncEmails,
    isSyncing,
    accounts,
    selectedAccountId,
    selectAccount,
    deleteAccount,
  } = useEmailStore()

  const handleDeleteAccount = async () => {
    if (!selectedAccountId) return

    setIsDeleting(true)
    try {
      await deleteAccount(selectedAccountId)
    } finally {
      setIsDeleting(false)
    }
  }

  const unreadCount = threads.filter(t => !t.isRead && !t.isArchived).length

  const isOnInboxPage = pathname === '/emails'

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-background">
      <div className="p-4">
        <Button
          onClick={() => {
            openCompose()
            onNavigate?.()
          }}
          className="w-full gap-2"
          disabled={!selectedAccountId}
        >
          <Plus className="h-4 w-4" />
          Compose
        </Button>
      </div>

      {/* Account selector */}
      {accounts.length > 0 && (
        <div className="flex min-w-0 items-center gap-1 px-4 pb-2">
          <select
            value={selectedAccountId || ''}
            onChange={(e) => selectAccount(e.target.value || null)}
            className="min-w-0 flex-1 truncate rounded-md border bg-background px-2 py-1.5 text-sm"
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.email}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            title="Remove account"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}

        {/* Filter items (only shown on inbox page) */}
        {isOnInboxPage && (
          <>
            <div className="my-4 border-t" />
            {filterItems.map((item) => {
              const isActive = filter === item.value
              const showBadge = item.value === 'inbox' && unreadCount > 0
              return (
                <button
                  key={item.value}
                  onClick={() => {
                    setFilter(item.value)
                    onNavigate?.()
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {showBadge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </button>
              )
            })}
          </>
        )}
      </nav>

      {/* Sync button */}
      {selectedAccountId && (
        <div className="border-t p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => syncEmails()}
            disabled={isSyncing}
            className="w-full gap-2"
          >
            <RefreshCw className={cn('h-4 w-4', isSyncing && 'animate-spin')} />
            {isSyncing ? 'Syncing...' : 'Sync emails'}
          </Button>
        </div>
      )}
    </aside>
  )
}

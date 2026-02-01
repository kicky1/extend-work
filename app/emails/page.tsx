'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ThreadList } from '@/components/emails'
import { ThreadView } from '@/components/emails'
import { EmailSidebar } from '@/components/emails'
import useEmailStore from '@/lib/stores/email-store'
import { cn } from '@/lib/utils'
import { Loader2, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EmailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    selectedThreadId,
    loadAccounts,
    loadThreads,
    selectedAccountId,
  } = useEmailStore()
  const [isConnecting, setIsConnecting] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  // Load accounts on mount
  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  // Load threads when account is selected
  useEffect(() => {
    if (selectedAccountId) {
      loadThreads()
    }
  }, [selectedAccountId, loadThreads])

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      router.replace('/emails')
      return
    }

    if (code && state) {
      setIsConnecting(true)

      const exchangeCode = async () => {
        try {
          const response = await fetch('/api/email/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, state }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.error || 'Failed to connect email')
          }

          await loadAccounts()
        } catch (err: any) {
          console.error('Failed to connect email:', err.message)
        } finally {
          setIsConnecting(false)
          router.replace('/emails')
        }
      }

      exchangeCode()
    }
  }, [searchParams, router, loadAccounts])

  if (isConnecting) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Connecting your email account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - hidden on mobile by default, shown when toggled */}
        <div
          className={cn(
            'border-r bg-background',
            'lg:block lg:w-64',
            showSidebar ? 'block w-64 absolute z-10 h-[calc(100vh-4rem)] bg-white' : 'hidden'
          )}
        >
          <EmailSidebar
            onNavigate={() => {
              if (window.innerWidth < 1024) {
                setShowSidebar(false)
              }
            }}
          />
        </div>

        {/* Email content area */}
        <div className="flex flex-1 min-w-0">
          {/* Thread list - hidden on mobile when thread is selected */}
          <div
            className={cn(
              'w-full border-r md:w-96 shrink-0 relative',
              selectedThreadId && 'hidden md:block'
            )}
          >
            {/* Mobile sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden absolute top-2 left-2 z-10"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeft className="w-5 h-5" />
              )}
            </Button>
            <ThreadList />
          </div>

          {/* Thread view */}
          <div
            className={cn(
              'flex-1 min-w-0',
              !selectedThreadId && 'hidden md:block'
            )}
          >
            <ThreadView />
          </div>
        </div>
      </div>
    </div>
  )
}

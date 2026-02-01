'use client'

import { useEffect, useState } from 'react'
import { TemplateList } from '@/components/emails'
import { EmailSidebar } from '@/components/emails'
import useEmailStore from '@/lib/stores/email-store'
import { cn } from '@/lib/utils'
import { Plus, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TemplatesPage() {
  const { loadAccounts, selectedAccountId, loadThreads, openCompose } = useEmailStore()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  useEffect(() => {
    if (selectedAccountId) {
      loadThreads()
    }
  }, [selectedAccountId, loadThreads])

  return (
    <>
      {/* Page Header */}
      <div className="bg-white border-b border-[#e8e4df]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Sidebar toggle - mobile only */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden shrink-0"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? (
                  <PanelLeftClose className="w-5 h-5" />
                ) : (
                  <PanelLeft className="w-5 h-5" />
                )}
              </Button>
              <h1 className="text-lg font-semibold">Templates</h1>
            </div>

            <Button
              onClick={() => openCompose()}
              disabled={!selectedAccountId}
              className="shrink-0"
            >
              <Plus className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Compose</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex min-h-[calc(100vh-8rem)]">
          {/* Sidebar - hidden on mobile by default, shown when toggled */}
          <div
            className={cn(
              'border-r bg-background',
              'lg:block lg:w-64 shrink-0',
              showSidebar ? 'block w-64 absolute z-10 min-h-[calc(100vh-8rem)] bg-white' : 'hidden'
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

          {/* Templates content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <TemplateList />
          </div>
        </div>
      </div>
    </>
  )
}

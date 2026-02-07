'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import useCVStore from '@/lib/stores/cv-store'
import { useAutoSave } from '@/lib/hooks/use-auto-save'
import dynamic from 'next/dynamic'
import EditorPanel from '@/components/cv/editor-panel'
import PreviewPanel from '@/components/cv/preview-panel'
import { ThemeCustomizerButton } from '@/components/cv/theme-customizer'
import AppNavbar from '@/components/layout/app-navbar'
import { useState } from 'react'

const FloatingAIAssistant = dynamic(() => import('@/components/cv/floating-ai-assistant'), { ssr: false })
const ThemeCustomizerPanel = dynamic(() => import('@/components/cv/theme-customizer').then(m => ({ default: m.ThemeCustomizerPanel })), { ssr: false })

export default function CVCreatorPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [isCustomizing, setIsCustomizing] = useState(false)
  const { getOrCreateCV, isInitialized } = useCVStore()
  const supabase = createClient()

  // Auto-save hook
  useAutoSave(2000)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Load user's CV (creates one if doesn't exist)
      await getOrCreateCV()
    }

    checkUser()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-card border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'editor'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <main className="max-w-screen-2xl mx-auto h-[calc(100vh-64px)]">
        {/* Desktop: Side by Side - Editor sticky, Preview scrolls */}
        <div className="hidden lg:flex h-full">
          <div className="w-1/2 sticky top-0 h-full">
            {isCustomizing ? (
              <ThemeCustomizerPanel onClose={() => setIsCustomizing(false)} />
            ) : (
              <EditorPanel />
            )}
          </div>
          <div className="w-1/2 h-full">
            <PreviewPanel />
          </div>
        </div>

        {/* Mobile: Tabs */}
        <div className="lg:hidden h-full">
          {isCustomizing ? (
            <ThemeCustomizerPanel onClose={() => setIsCustomizing(false)} />
          ) : activeTab === 'editor' ? (
            <EditorPanel />
          ) : (
            <PreviewPanel />
          )}
        </div>
      </main>

      {/* Theme Customizer Button */}
      <ThemeCustomizerButton
        isCustomizing={isCustomizing}
        onClick={() => setIsCustomizing(!isCustomizing)}
      />

      {/* Floating AI Assistant - only show when data loaded */}
      {isInitialized && <FloatingAIAssistant />}
    </div>
  )
}

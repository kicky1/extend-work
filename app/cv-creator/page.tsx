'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import useCVStore from '@/lib/stores/cv-store'
import { useAutoSave } from '@/lib/hooks/use-auto-save'
import EditorPanel from '@/components/cv/editor-panel'
import PreviewPanel from '@/components/cv/preview-panel'
import ThemeCustomizer from '@/components/cv/theme-customizer'
import FloatingAIAssistant from '@/components/cv/floating-ai-assistant'

export default function CVCreatorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const { loadFromDB, getOrCreateCV } = useCVStore()
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
      const cvId = await getOrCreateCV()
      if (cvId) {
        await loadFromDB(cvId)
      }

      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading CV Creator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            CV Creator
          </h1>
          <div className="flex items-center gap-3">
            {/* Logout Button */}
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/login')
                router.refresh()
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

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
        {/* Desktop: Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 h-full">
          <EditorPanel />
          <PreviewPanel />
        </div>

        {/* Mobile: Tabs */}
        <div className="lg:hidden h-full">
          {activeTab === 'editor' ? <EditorPanel /> : <PreviewPanel />}
        </div>
      </main>

      {/* Theme Customizer */}
      <ThemeCustomizer />

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  )
}

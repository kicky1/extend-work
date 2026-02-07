'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import useCoverLetterStore from '@/lib/stores/cover-letter-store'
import useCVStore from '@/lib/stores/cv-store'
import { useCoverLetterAutoSave } from '@/lib/hooks/use-cover-letter-auto-save'
import dynamic from 'next/dynamic'
import CoverLetterEditor from '@/components/cover-letter/cover-letter-editor'
import CoverLetterPreview from '@/components/cover-letter/cover-letter-preview'
import UpgradeModal from '@/components/subscription/upgrade-modal'
import AppNavbar from '@/components/layout/app-navbar'

const CoverLetterFloatingAIAssistant = dynamic(() => import('@/components/cover-letter/floating-ai-assistant'), { ssr: false })

export default function CoverLetterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'not_pro' | 'limit_exceeded'>('not_pro')
  const { getOrCreateCoverLetter, isInitialized, updateContent, updateJobInfo, setIsGenerating } = useCoverLetterStore()
  const { getOrCreateCV, isInitialized: cvInitialized } = useCVStore()
  const supabase = createClient()
  const initRan = useRef(false)

  // Auto-save
  useCoverLetterAutoSave(2000)

  useEffect(() => {
    if (initRan.current) return
    initRan.current = true

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      await Promise.all([
        useCVStore.getState().isInitialized ? Promise.resolve() : getOrCreateCV(),
        getOrCreateCoverLetter(),
      ])

      // Check for pending generation AFTER DB load completes
      const pending = useCoverLetterStore.getState().pendingGeneration
      if (!pending) return
      useCoverLetterStore.getState().setPendingGeneration(null)

      const { jobTitle, company, jobDescription } = pending
      const { coverLetterData } = useCoverLetterStore.getState()
      const { cvData } = useCVStore.getState()

      setIsGenerating(true)
      updateJobInfo({ jobTitle, company, jobDescription })

      try {
        const res = await fetch('/api/cover-letter/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cvData,
            jobTitle,
            company,
            jobDescription,
            tone: coverLetterData.tone,
            language: coverLetterData.language,
          }),
        })

        if (!res.ok) {
          if (res.status === 403) {
            setUpgradeReason('not_pro')
            setShowUpgradeModal(true)
          } else if (res.status === 429) {
            setUpgradeReason('limit_exceeded')
            setShowUpgradeModal(true)
          } else {
            toast.error('Failed to generate cover letter')
          }
          return
        }

        const data = await res.json()
        if (data.coverLetter) {
          updateContent(data.coverLetter)
        }
      } catch (err) {
        toast.error('Failed to generate cover letter')
      } finally {
        setIsGenerating(false)
      }
    }
    init()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden bg-card border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-3 text-sm font-medium transition-[color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
              activeTab === 'editor'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-[color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
              activeTab === 'preview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto h-[calc(100vh-64px)]">
        {/* Desktop: Side by Side */}
        <div className="hidden lg:flex h-full">
          <div className="w-1/2 sticky top-0 h-full">
            <CoverLetterEditor />
          </div>
          <div className="w-1/2 h-full">
            <CoverLetterPreview />
          </div>
        </div>

        {/* Mobile: Tabs */}
        <div className="lg:hidden h-full">
          {activeTab === 'editor' ? (
            <CoverLetterEditor />
          ) : (
            <CoverLetterPreview />
          )}
        </div>
      </main>

      {/* Floating AI Assistant */}
      {isInitialized && (
        <CoverLetterFloatingAIAssistant />
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason={upgradeReason}
      />
    </div>
  )
}

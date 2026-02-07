'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isToolUIPart } from 'ai'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useCVStore from '@/lib/stores/cv-store'
import { useSubscription } from '@/lib/hooks/use-subscription'
import UpgradeModal from '@/components/subscription/upgrade-modal'
import { applyToolResult, type ToolResult } from '@/lib/utils/apply-tool-results'
import AIAssistantChat from '@/components/ai-elements/ai-assistant-chat'

const QUICK_ACTIONS = [
  { label: '+ Add skill', prompt: 'Add Python to my skills as an expert level technical skill' },
  { label: 'Improve summary', prompt: 'Rewrite my professional summary to be more impactful and ATS-friendly' },
  { label: 'Suggest theme', prompt: 'What theme would you recommend for my CV based on my experience?' },
  { label: 'Add achievement', prompt: 'Help me add a quantified achievement to my most recent work experience' },
]

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'not_pro' | 'limit_exceeded'>('not_pro')
  const [toolDescriptions, setToolDescriptions] = useState<Map<string, string>>(new Map())
  const processedToolKeys = useRef<Set<string>>(new Set())
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const { cvData } = useCVStore()
  const { subscription, isPro, refetch } = useSubscription()
  const shouldReduceMotion = useReducedMotion()

  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
    stop,
    regenerate,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/cv/chat',
      body: { cvData },
    }),
    experimental_throttle: 30,
    onFinish: () => { refetch() },
    onError: (err) => {
      const errMsg = err.message || ''
      if (errMsg.includes('NOT_PRO') || errMsg.includes('Pro subscription')) {
        setUpgradeReason('not_pro')
        setShowUpgradeModal(true)
      } else if (errMsg.includes('LIMIT_EXCEEDED') || errMsg.includes('limit reached')) {
        setUpgradeReason('limit_exceeded')
        setShowUpgradeModal(true)
      }
    },
  })

  // Process tool results when messages update
  useEffect(() => {
    const lastMessage = messages.at(-1)
    if (lastMessage?.role === 'assistant' && lastMessage.parts) {
      for (const part of lastMessage.parts) {
        if (isToolUIPart(part)) {
          const toolPart = part as {
            state?: string
            output?: ToolResult
            toolName?: string
            toolInvocation?: { toolCallId?: string }
          }
          const toolCallId = toolPart.toolInvocation?.toolCallId
          const toolName = toolPart.toolName || toolPart.output?.action || 'unknown'
          const toolKey = toolCallId ? `${lastMessage.id}-${toolCallId}` : `${lastMessage.id}-${toolName}`

          if (toolPart.state === 'output-available' && toolPart.output && !processedToolKeys.current.has(toolKey)) {
            processedToolKeys.current.add(toolKey)
            const result = applyToolResult(toolPart.output)
            if (result.description) {
              setToolDescriptions((prev) => new Map(prev).set(toolKey, result.description!))
            }
          }
        }
      }
    }
  }, [messages])

  const handleClearChat = useCallback(() => {
    setMessages([])
    setToolDescriptions(new Map())
    processedToolKeys.current.clear()
  }, [setMessages])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    triggerButtonRef.current?.focus()
  }, [])

  const handleUpgrade = useCallback(() => {
    setUpgradeReason('not_pro')
    setShowUpgradeModal(true)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={shouldReduceMotion ? false : { y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          ref={triggerButtonRef}
          onClick={handleToggle}
          aria-label={isOpen ? 'Close CV assistant' : 'Open CV assistant'}
          aria-expanded={isOpen}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          >
            <div role="dialog" aria-label="CV assistant" className="max-w-4xl mx-auto px-4 pb-6 pointer-events-auto">
              <AIAssistantChat
                icon={<Sparkles className="w-5 h-5" />}
                title="AI Assistant"
                messages={messages}
                status={status}
                error={error}
                sendMessage={sendMessage}
                stop={stop}
                regenerate={regenerate}
                clearChat={handleClearChat}
                toolDescriptions={toolDescriptions}
                isPro={isPro}
                subscription={subscription}
                quickActions={QUICK_ACTIONS}
                emptyStateText="Ask me to update your CV, or try a quick action:"
                emptyStateNotProText="Upgrade to Pro to use AI-powered CV editing."
                placeholder="Ask me to update your CV... (⌘+Enter to send)"
                onClose={handleClose}
                onUpgrade={handleUpgrade}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason={upgradeReason}
      />
    </>
  )
}

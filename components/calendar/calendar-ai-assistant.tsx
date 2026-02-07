'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isToolUIPart } from 'ai'
import type { InterviewAgentUIMessage } from '@/lib/interview-tools'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useInterviewStore from '@/lib/stores/interview-store'
import useRecruitmentStore from '@/lib/stores/recruitment-store'
import { useSubscription } from '@/lib/hooks/use-subscription'
import UpgradeModal from '@/components/subscription/upgrade-modal'
import {
  applyInterviewToolResult,
  type InterviewToolResult,
} from '@/lib/utils/apply-interview-tool-results'
import AIAssistantChat from '@/components/ai-elements/ai-assistant-chat'

const QUICK_ACTIONS = [
  { label: 'Schedule interview', prompt: "Schedule an interview with Google for a Software Engineer position tomorrow at 2pm for 1 hour" },
  { label: "What's next?", prompt: "What's my next upcoming interview?" },
  { label: 'Show pipelines', prompt: "Show me all my active recruitment pipelines" },
  { label: 'Record outcome', prompt: "I want to record the outcome of my last interview" },
]

export default function CalendarAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'not_pro' | 'limit_exceeded'>('not_pro')
  const [toolDescriptions, setToolDescriptions] = useState<Map<string, string>>(new Map())
  const processedToolKeys = useRef<Set<string>>(new Set())
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const { loadInterviews } = useInterviewStore()
  const { loadProcesses } = useRecruitmentStore()
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
  } = useChat<InterviewAgentUIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/calendar/chat',
      headers: {
        'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }),
    experimental_throttle: 50,
    onFinish: () => {
      refetch()
      // loadInterviews/loadProcesses moved to tool-result .then() to avoid
      // race condition where reload fetches stale DB data before tool writes land.
    },
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
            output?: InterviewToolResult
            toolName?: string
            toolInvocation?: { toolCallId?: string }
          }
          const toolCallId = toolPart.toolInvocation?.toolCallId
          const toolName = toolPart.toolName || toolPart.output?.action || 'unknown'
          const toolKey = toolCallId ? `${lastMessage.id}-${toolCallId}` : `${lastMessage.id}-${toolName}`

          if (toolPart.state === 'output-available' && toolPart.output && !processedToolKeys.current.has(toolKey)) {
            processedToolKeys.current.add(toolKey)

            applyInterviewToolResult(toolPart.output).then(result => {
              if (result.description) {
                setToolDescriptions(prev => new Map(prev).set(toolKey, result.description!))
              }
              // Reload stores AFTER tool result DB writes complete
              // to avoid stale-read race with onFinish
              loadInterviews()
              loadProcesses()
            })
          }
        }
      }
    }
  }, [messages, loadInterviews, loadProcesses])

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
          aria-label={isOpen ? 'Close interview assistant' : 'Open interview assistant'}
          aria-expanded={isOpen}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-[#1a4a4a] to-[#1a4a4a]/80 hover:from-[#1a4a4a]/90 hover:to-[#1a4a4a]/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Calendar className="w-5 h-5" aria-hidden="true" />
        </Button>
      </motion.div>

      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          >
            <div role="dialog" aria-label="Interview assistant" className="max-w-4xl mx-auto px-4 pb-6 pointer-events-auto">
              <AIAssistantChat
                icon={<Calendar className="w-5 h-5" />}
                title="Interview Assistant"
                accentColor="text-[#1a4a4a]"
                accentBg="bg-[#1a4a4a]/10"
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
                emptyStateText="Tell me about interviews to schedule, or try a quick action:"
                emptyStateNotProText="Upgrade to Pro to use AI-powered interview scheduling."
                placeholder="Schedule, reschedule, or ask about interviews... (⌘+Enter)"
                onClose={handleClose}
                onUpgrade={handleUpgrade}
                userBubbleClassName="bg-[#1a4a4a] text-white"
                userAvatarClassName="bg-[#1a4a4a]"
                sendButtonClassName="bg-[#1a4a4a] hover:bg-[#1a4a4a]/90"
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

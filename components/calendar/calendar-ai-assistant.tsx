'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isToolUIPart } from 'ai'
import type { InterviewAgentUIMessage } from '@/lib/interview-tools'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Send,
  Loader2,
  ChevronDown,
  Lock,
  Trash2,
  User,
  Bot,
  Undo2,
  Square,
  RotateCcw,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useInterviewStore from '@/lib/stores/interview-store'
import { useSubscription } from '@/lib/hooks/use-subscription'
import UsageIndicator from '@/components/subscription/usage-indicator'
import UpgradeModal from '@/components/subscription/upgrade-modal'
import {
  applyInterviewToolResult,
  undoInterviewToolResult,
  type InterviewToolResult,
  type ApplyInterviewResult,
} from '@/lib/utils/apply-interview-tool-results'

// Quick action suggestions
const QUICK_ACTIONS = [
  { label: 'Schedule interview', prompt: "Schedule an interview with Google for a Software Engineer position tomorrow at 2pm for 1 hour" },
  { label: "What's next?", prompt: "What's my next upcoming interview?" },
  { label: 'Cancel', prompt: "Cancel my most recent scheduled interview" },
  { label: 'Reschedule', prompt: "Reschedule my next interview to next Monday at 10am" },
]

// Track applied changes for undo
interface AppliedChange {
  messageId: string
  action: string
  description: string
  previousValue: unknown
  interviewId?: string
}

export default function CalendarAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeReason, setUpgradeReason] = useState<'not_pro' | 'limit_exceeded'>('not_pro')
  const [input, setInput] = useState('')
  const [appliedChanges, setAppliedChanges] = useState<AppliedChange[]>([])
  const [toolDescriptions, setToolDescriptions] = useState<Map<string, string>>(new Map())
  const [processingTools, setProcessingTools] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { interviews, loadInterviews } = useInterviewStore()
  const { subscription, isPro, refetch } = useSubscription()

  // Handle undo for a specific change
  const handleUndo = useCallback(async (change: AppliedChange) => {
    const success = await undoInterviewToolResult(change.action, change.previousValue)
    if (success) {
      setAppliedChanges(prev => prev.filter(c => c !== change))
      // Reload interviews to sync state
      loadInterviews()
    }
  }, [loadInterviews])

  // useChat hook with streaming and conversation memory
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
      body: { interviews },
    }),
    experimental_throttle: 50,
    onFinish: () => {
      refetch() // Update subscription usage
      loadInterviews() // Reload interviews after changes
    },
    onError: (err) => {
      // Check for subscription errors in the error message
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
        // Check for tool parts with output using type-safe helper
        if (isToolUIPart(part)) {
          const toolPart = part as {
            state?: string
            output?: InterviewToolResult
            toolName?: string
          }

          // Create a unique key for this tool execution
          const toolKey = `${lastMessage.id}-${toolPart.toolName || toolPart.output?.action || 'unknown'}`

          if (toolPart.state === 'output-available' && toolPart.output) {
            // Check if we already processed this
            if (!toolDescriptions.has(toolKey) && !processingTools.has(toolKey)) {
              setProcessingTools(prev => new Set(prev).add(toolKey))

              // Apply the tool result asynchronously
              applyInterviewToolResult(toolPart.output).then(result => {
                // Store the description for display
                if (result.description) {
                  setToolDescriptions(prev => new Map(prev).set(toolKey, result.description!))
                }

                // Track for undo if successful and has previous value
                if (result.success && result.previousValue !== undefined) {
                  setAppliedChanges(prev => [...prev, {
                    messageId: lastMessage.id,
                    action: toolPart.output!.action,
                    description: result.description || 'Change applied',
                    previousValue: result.previousValue,
                    interviewId: result.interviewId,
                  }])
                }

                // For create actions, track the new interview ID for undo
                if (result.success && toolPart.output!.action === 'createInterview' && result.interviewId) {
                  setAppliedChanges(prev => [...prev, {
                    messageId: lastMessage.id,
                    action: 'createInterview',
                    description: result.description || 'Interview scheduled',
                    previousValue: result.interviewId, // Store ID for deletion on undo
                    interviewId: result.interviewId,
                  }])
                }

                setProcessingTools(prev => {
                  const next = new Set(prev)
                  next.delete(toolKey)
                  return next
                })
              })
            }
          }
        }
      }
    }
  }, [messages, toolDescriptions, processingTools])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close panel
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Cmd/Ctrl + Enter to send
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && input.trim() && !isLoading && isPro) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  // Handle retry on error
  const handleRetry = () => {
    regenerate()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Check subscription before sending
    if (!isPro) {
      setUpgradeReason('not_pro')
      setShowUpgradeModal(true)
      return
    }

    const userMessage = input.trim()
    setInput('')

    sendMessage({ text: userMessage })
  }

  const handleClearChat = () => {
    setMessages([])
    setAppliedChanges([])
    setToolDescriptions(new Map())
  }

  // Handle quick action click
  const handleQuickAction = (prompt: string) => {
    if (!isPro) {
      setUpgradeReason('not_pro')
      setShowUpgradeModal(true)
      return
    }
    setInput('')
    sendMessage({ text: prompt })
  }

  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-[#1a4a4a] to-[#1a4a4a]/80 hover:from-[#1a4a4a]/90 hover:to-[#1a4a4a]/70"
        >
          <Calendar className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto px-4 pb-6 pointer-events-auto">
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30 shrink-0">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1a4a4a]" />
                    <h3 className="font-semibold text-foreground">Interview Assistant</h3>
                    {isPro && subscription && (
                      <UsageIndicator
                        current={subscription.usage.current}
                        limit={subscription.usage.limit}
                        compact
                      />
                    )}
                    {!isPro && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        Pro only
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {messages.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClearChat}
                        title="Clear conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm mb-4">
                        {isPro
                          ? "Tell me about interviews to schedule, or try a quick action:"
                          : 'Upgrade to Pro to use AI-powered interview scheduling.'}
                      </p>
                      {isPro && (
                        <div className="flex flex-wrap justify-center gap-2">
                          {QUICK_ACTIONS.map((action) => (
                            <Button
                              key={action.label}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(action.prompt)}
                              className="text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-[#1a4a4a]/10 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-[#1a4a4a]" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-[#1a4a4a] text-white'
                              : 'bg-muted'
                          }`}
                        >
                          {message.parts.map((part, index) => {
                            if (part.type === 'text') {
                              return (
                                <div key={index} className="text-sm whitespace-pre-wrap">
                                  {part.text}
                                </div>
                              )
                            }

                            // Handle tool parts - show status with descriptions
                            if (isToolUIPart(part)) {
                              const toolPart = part as {
                                type: string
                                toolName?: string
                                state?: string
                                input?: Record<string, unknown>
                                output?: InterviewToolResult
                              }
                              const toolName = toolPart.toolName || part.type.replace('tool-', '')
                              const toolKey = `${message.id}-${toolName}`
                              const description = toolDescriptions.get(toolKey)

                              // Find if there's an undo available for this change
                              const undoableChange = appliedChanges.find(
                                c => c.messageId === message.id && c.action === (toolPart.output?.action || toolName)
                              )

                              return (
                                <div
                                  key={index}
                                  className="text-xs mt-2 px-2 py-1.5 bg-background/50 rounded flex items-center justify-between gap-2"
                                >
                                  {toolPart.state === 'input-streaming' || toolPart.state === 'input-available' ? (
                                    <div className="flex items-center gap-2">
                                      <Loader2 className="w-3 h-3 animate-spin text-[#1a4a4a]" />
                                      <span className="text-muted-foreground">Processing...</span>
                                    </div>
                                  ) : toolPart.state === 'output-available' ? (
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center gap-2">
                                        <span className="text-green-600">✓</span>
                                        <span className="text-foreground">{description || 'Done'}</span>
                                      </div>
                                      {undoableChange && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-5 w-5 text-muted-foreground hover:text-foreground"
                                          onClick={() => handleUndo(undoableChange)}
                                          title="Undo this change"
                                        >
                                          <Undo2 className="w-3 h-3" />
                                        </Button>
                                      )}
                                    </div>
                                  ) : toolPart.state === 'output-error' ? (
                                    <span className="text-red-600">Error: {toolPart.output?.error || 'Failed'}</span>
                                  ) : null}
                                </div>
                              )
                            }

                            return null
                          })}
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-[#1a4a4a] flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/* Loading indicator during streaming */}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a4a4a]/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-[#1a4a4a]" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {status === 'streaming' ? (
                            <>
                              <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-[#1a4a4a] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-[#1a4a4a] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-[#1a4a4a] rounded-full animate-bounce" />
                              </span>
                              <span>Responding</span>
                            </>
                          ) : (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Thinking...</span>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={stop}
                            className="h-6 px-2 text-xs ml-2"
                            title="Stop generating"
                          >
                            <Square className="w-3 h-3 mr-1" />
                            Stop
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error display */}
                  {error && !showUpgradeModal && (
                    <div className="flex items-center justify-between text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                      <span>Something went wrong. Please try again.</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRetry}
                        className="h-7 text-red-600 hover:text-red-700 hover:bg-red-100"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-border shrink-0">
                  <div className="flex gap-3">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isPro
                          ? "Schedule, reschedule, or ask about interviews... (⌘+Enter)"
                          : 'Upgrade to Pro to use AI features'
                      }
                      className="flex-1"
                      disabled={isLoading || !isPro}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 bg-[#1a4a4a] hover:bg-[#1a4a4a]/90"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : !isPro ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Upgrade
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                  {!isPro && (
                    <button
                      type="button"
                      onClick={() => {
                        setUpgradeReason('not_pro')
                        setShowUpgradeModal(true)
                      }}
                      className="w-full mt-3 text-sm text-[#1a4a4a] hover:underline"
                    >
                      Upgrade to Pro for 500 AI requests/month
                    </button>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason={upgradeReason}
      />
    </>
  )
}

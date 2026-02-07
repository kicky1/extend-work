'use client'

import { useState, useRef, useEffect, useCallback, memo, type ReactNode } from 'react'
import type { ChatStatus, UIMessage } from 'ai'
import { isToolUIPart } from 'ai'
import {
  Send,
  Lock,
  Trash2,
  User,
  Bot,
  Square,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Conversation,
  ConversationContent,
  ConversationScrollAnchor,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import {
  MessageResponse,
} from '@/components/ai-elements/message'
import { Shimmer } from '@/components/ai-elements/shimmer'
import { ToolResultGroup, type ToolResultItem } from '@/components/ai-elements/tool-result-group'
import UsageIndicator from '@/components/subscription/usage-indicator'

interface QuickAction {
  label: string
  prompt: string
}

interface AIAssistantChatProps {
  // Identity
  icon: ReactNode
  title: string
  accentColor?: string
  accentBg?: string

  // Chat state (from useChat)
  messages: UIMessage[]
  status: ChatStatus
  error: Error | undefined
  sendMessage: (opts: { text: string }) => void
  stop: () => void
  regenerate: () => void
  clearChat: () => void

  // Tool results
  toolDescriptions: Map<string, string>

  // Subscription
  isPro: boolean
  subscription?: { usage: { current: number; limit: number } } | null

  // Content
  quickActions: QuickAction[]
  emptyStateText: string
  emptyStateNotProText: string
  placeholder: string

  // Panel controls
  onClose: () => void
  onUpgrade: () => void

  // User message style overrides
  userBubbleClassName?: string
  userAvatarClassName?: string
  sendButtonClassName?: string
}

// --- Isolated input form (prevents message re-renders on every keystroke) ---
interface ChatInputFormProps {
  isPro: boolean
  isLoading: boolean
  placeholder: string
  accentColor: string
  sendButtonClassName?: string
  onSend: (text: string) => void
  onStop: () => void
  onUpgrade: () => void
}

function ChatInputForm({
  isPro,
  isLoading,
  placeholder,
  accentColor,
  sendButtonClassName,
  onSend,
  onStop,
  onUpgrade,
}: ChatInputFormProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    if (!isPro) { onUpgrade(); return }
    const text = input.trim()
    setInput('')
    onSend(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!input.trim() || isLoading) return
      if (!isPro) { onUpgrade(); return }
      const text = input.trim()
      setInput('')
      onSend(text)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border shrink-0">
      <div className="flex gap-3">
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isPro ? placeholder : 'Upgrade to Pro to use AI features'}
          className="flex-1 min-h-0 max-h-32 resize-none py-2"
          rows={1}
          disabled={isLoading || !isPro}
        />
        {isLoading ? (
          <Button
            type="button"
            onClick={onStop}
            variant="outline"
            className="px-6"
            title="Stop generating"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!input.trim()}
            className={`px-6 ${sendButtonClassName || ''}`}
          >
            {!isPro ? (
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
        )}
      </div>
      {!isPro && (
        <button
          type="button"
          onClick={onUpgrade}
          className={`w-full mt-3 text-sm ${accentColor} hover:underline`}
        >
          Upgrade to Pro for 500 AI requests/month
        </button>
      )}
    </form>
  )
}

// --- Single chat bubble (memoized to avoid re-renders when siblings update) ---
interface ChatBubbleProps {
  message: UIMessage
  toolResults: ToolResultItem[]
  userBubbleClassName: string
  userAvatarClassName: string
  accentBg: string
  accentColor: string
}

const ChatBubble = memo(function ChatBubble({
  message,
  toolResults,
  userBubbleClassName,
  userAvatarClassName,
  accentBg,
  accentColor,
}: ChatBubbleProps) {
  const textParts = message.parts.filter(p => p.type === 'text') as Array<{ type: 'text'; text: string }>
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
          <Bot className={`w-4 h-4 ${accentColor}`} />
        </div>
      )}
      <div
        className={`max-w-[80%] min-w-0 rounded-2xl px-4 py-2 break-words ${
          isUser ? userBubbleClassName : 'bg-muted'
        }`}
      >
        {textParts.map((part, index) => (
          isUser ? (
            <div key={index} className="text-sm whitespace-pre-wrap break-words">
              {part.text}
            </div>
          ) : (
            <MessageResponse
              key={index}
              className="prose prose-sm max-w-none text-sm [&_pre]:text-xs [&_pre]:p-2 [&_pre]:overflow-x-auto"
            >
              {part.text}
            </MessageResponse>
          )
        ))}

        {toolResults.length > 0 && (
          <ToolResultGroup results={toolResults} />
        )}
      </div>
      {isUser && (
        <div className={`w-8 h-8 rounded-full ${userAvatarClassName} flex items-center justify-center shrink-0 mt-0.5`}>
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  )
})

export default function AIAssistantChat({
  icon,
  title,
  accentColor = 'text-primary',
  accentBg = 'bg-primary/10',
  messages,
  status,
  error,
  sendMessage,
  stop,
  regenerate,
  clearChat,
  toolDescriptions,
  isPro,
  subscription,
  quickActions,
  emptyStateText,
  emptyStateNotProText,
  placeholder,
  onClose,
  onUpgrade,
  userBubbleClassName = 'bg-primary text-primary-foreground',
  userAvatarClassName = 'bg-primary',
  sendButtonClassName,
}: AIAssistantChatProps) {
  const isLoading = status === 'submitted' || status === 'streaming'

  const handleSend = useCallback((text: string) => {
    sendMessage({ text })
  }, [sendMessage])

  const handleQuickAction = useCallback((prompt: string) => {
    if (!isPro) { onUpgrade(); return }
    sendMessage({ text: prompt })
  }, [isPro, onUpgrade, sendMessage])

  // Group tool parts from a message
  const getToolResults = useCallback((message: UIMessage): ToolResultItem[] => {
    const results: ToolResultItem[] = []
    for (const part of message.parts) {
      if (!isToolUIPart(part)) continue

      const toolPart = part as {
        type: string
        toolName?: string
        toolInvocation?: { toolCallId?: string }
        state?: string
        output?: { action: string; error?: string }
      }
      const toolName = toolPart.toolName || part.type.replace('tool-', '')
      const toolCallId = toolPart.toolInvocation?.toolCallId
      const toolKey = toolCallId ? `${message.id}-${toolCallId}` : `${message.id}-${toolName}`
      const description = toolDescriptions.get(toolKey)

      if (toolPart.state === 'input-streaming' || toolPart.state === 'input-available') {
        results.push({ key: toolKey, description: 'Applying...', state: 'pending', toolName })
      } else if (toolPart.state === 'output-available') {
        results.push({
          key: toolKey,
          description: description || 'Change applied',
          state: 'completed',
        })
      } else if (toolPart.state === 'output-error') {
        results.push({
          key: toolKey,
          description: description || 'Failed',
          state: 'error',
          errorMessage: toolPart.output?.error || 'Failed to apply change',
        })
      }
    }
    return results
  }, [toolDescriptions])

  // Scroll trigger that changes during streaming (not just on new messages)
  const lastMsg = messages[messages.length - 1]
  const lastMsgTextLen = lastMsg
    ? lastMsg.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .reduce((sum, p) => sum + p.text.length, 0)
    : 0
  const scrollTrigger = messages.length + lastMsgTextLen

  return (
    <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className={accentColor}>{icon}</span>
          <h3 className="font-semibold text-foreground">{title}</h3>
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
              onClick={clearChat}
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <Conversation className="flex-1 h-0">
        <ConversationContent className="p-4 gap-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="w-8 h-8 mx-auto mb-3 opacity-50 flex items-center justify-center">
                {icon}
              </div>
              <p className="text-sm mb-4">
                {isPro ? emptyStateText : emptyStateNotProText}
              </p>
              {isPro && (
                <div className="flex flex-wrap justify-center gap-2">
                  {quickActions.map((action) => (
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
            messages.map((message) => {
              const toolResults = message.role === 'assistant' ? getToolResults(message) : []
              return (
                <ChatBubble
                  key={message.id}
                  message={message}
                  toolResults={toolResults}
                  userBubbleClassName={userBubbleClassName}
                  userAvatarClassName={userAvatarClassName}
                  accentBg={accentBg}
                  accentColor={accentColor}
                />
              )
            })
          )}

          {/* Thinking shimmer — only before first token */}
          {status === 'submitted' && (
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center shrink-0`}>
                <Bot className={`w-4 h-4 ${accentColor}`} />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-2">
                <Shimmer className="text-sm text-muted-foreground">Thinking...</Shimmer>
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="flex items-center justify-between text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
              <span>Something went wrong. Please try again.</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={regenerate}
                className="h-7 text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollAnchor trigger={scrollTrigger} />
        <ConversationScrollButton />
      </Conversation>

      {/* Input Area — isolated to prevent message re-renders on typing */}
      <ChatInputForm
        isPro={isPro}
        isLoading={isLoading}
        placeholder={placeholder}
        accentColor={accentColor}
        sendButtonClassName={sendButtonClassName}
        onSend={handleSend}
        onStop={stop}
        onUpgrade={onUpgrade}
      />
    </div>
  )
}

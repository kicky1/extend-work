'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Loader2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useCVStore from '@/lib/stores/cv-store'
import { executeToolCalls, type ToolCall } from '@/lib/utils/execute-tool-calls'

interface ChatResponse {
  text: string
  toolCalls: ToolCall[]
  error?: string
}

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const { cvData } = useCVStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setIsLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/cv/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          cvData,
        }),
      })

      const data: ChatResponse = await res.json()

      if (!res.ok) {
        setResponse(data.error || 'Something went wrong. Please try again.')
        return
      }

      // Execute tool calls
      if (data.toolCalls && data.toolCalls.length > 0) {
        const actions = executeToolCalls(data.toolCalls)
        setResponse(data.text || `Done! ${actions.join(', ')}.`)
      } else {
        setResponse(data.text || 'No changes were made.')
      }

      setUserInput('')
    } catch (error: any) {
      console.error('Chat error:', error)
      setResponse('Failed to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button - Always visible */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Sparkles className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Expanded AI Input */}
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
              <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">AI Assistant</h3>
                    <span className="text-xs text-muted-foreground">
                      Try: "change my email to john@example.com" or "add a job at Google"
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>

                {/* Response Area */}
                {(isLoading || response) && (
                  <div className="px-6 py-3 border-b border-border bg-muted/20">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Processing your request...</span>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">{response}</p>
                    )}
                  </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="flex gap-3">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Tell me what to change... (e.g., 'update my summary', 'add Python to my skills')"
                      className="flex-1"
                      autoFocus
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !userInput.trim()}
                      className="px-6"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

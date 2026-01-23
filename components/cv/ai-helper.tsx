'use client'

import { useState } from 'react'
import { useCompletion } from '@ai-sdk/react'
import { Sparkles, X, Loader2 } from 'lucide-react'
import { TextGenerateEffect } from '@/components/aceternity/text-generate'
import type { AIMode, Section } from '@/lib/prompts/cv-prompts'
import useCVStore from '@/lib/stores/cv-store'

interface AIHelperProps {
  section: Section
  onInsert: (text: string) => void
}

export default function AIHelper({ section, onInsert }: AIHelperProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<AIMode>('generate')
  const [userInput, setUserInput] = useState('')
  const { cvData } = useCVStore()

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/cv/generate',
  })

  const handleGenerate = async () => {
    await complete('', {
      body: {
        mode,
        section,
        data: cvData,
        userInput,
      },
    })
  }

  const handleInsert = () => {
    if (completion) {
      onInsert(completion)
      setIsOpen(false)
      setUserInput('')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        <Sparkles className="w-4 h-4" />
        AI Assistant
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Assistant
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selection */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMode('generate')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                mode === 'generate'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => setMode('ats')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                mode === 'ats'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ATS Optimize
            </button>
            <button
              onClick={() => setMode('grammar')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                mode === 'grammar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Fix Grammar
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'generate' ? 'Describe what to generate' : 'Text to optimize/fix'}
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder={
              mode === 'generate'
                ? 'E.g., Senior Software Engineer at a tech startup'
                : 'Paste the text you want to optimize or fix'
            }
          />
        </div>

        {/* Output */}
        <div className="flex-1 p-4 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">Generating...</span>
            </div>
          ) : completion ? (
            <div className="prose dark:prose-invert max-w-none">
              <TextGenerateEffect words={completion} className="text-sm text-gray-900 dark:text-gray-100" />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Click "Generate" to create content with AI</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !userInput}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
          {completion && (
            <button
              onClick={handleInsert}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Insert Text
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

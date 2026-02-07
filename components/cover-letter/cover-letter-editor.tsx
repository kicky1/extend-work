'use client'

import { useEffect, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import useCoverLetterStore from '@/lib/stores/cover-letter-store'
import { Input } from '@/components/ui/input'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Check,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const toolbarBtnClass =
  'p-1.5 rounded hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none transition-[color,background-color]'

function EditorSkeleton() {
  return (
    <div className="h-full flex flex-col bg-card">
      {/* Toolbar skeleton */}
      <div className="bg-card border-b border-r border-border h-[57px] flex items-center px-4">
        <div className="flex items-center gap-1.5 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-7 w-7 bg-muted rounded" />
          ))}
          <div className="w-px h-5 bg-border mx-1" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 w-7 bg-muted rounded" />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto border-r border-border animate-pulse">
        {/* Company input skeleton */}
        <div className="px-4 pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-8 w-full bg-muted rounded" />
            </div>
          </div>
        </div>
        {/* Editor area skeleton */}
        <div className="px-4 py-3">
          <div className="border border-border rounded-lg bg-background p-4 space-y-3 min-h-[300px]">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoverLetterEditor() {
  const {
    coverLetterData,
    updateContent,
    updateJobInfo,
    saveStatus,
    isDirty,
    isGenerating,
    isInitialized,
  } = useCoverLetterStore()

  const isSyncingRef = useRef(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your cover letter, or use the AI assistant to generate one\u2026',
      }),
    ],
    content: coverLetterData.content || '',
    onUpdate: ({ editor }) => {
      if (isSyncingRef.current) return
      updateContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-lg min-h-[300px] p-4',
      },
    },
  })

  // Sync store content → editor when it changes externally (e.g. AI tool)
  useEffect(() => {
    if (!editor) return
    if (coverLetterData.content !== editor.getHTML() && coverLetterData.content !== '<p></p>') {
      isSyncingRef.current = true
      editor.commands.setContent(coverLetterData.content || '')
      isSyncingRef.current = false
    }
  }, [editor, coverLetterData.content])

  if (!isInitialized) return <EditorSkeleton />

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Formatting Toolbar */}
      <div className="bg-card border-b border-r border-border h-[57px] flex items-center justify-between px-4">
        {editor && (
          <div className="flex items-center gap-1" role="toolbar" aria-label="Formatting options">
            {/* Text style group */}
            <button
              type="button"
              aria-label="Bold"
              aria-pressed={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(toolbarBtnClass, editor.isActive('bold') && 'bg-muted')}
            >
              <Bold className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Italic"
              aria-pressed={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(toolbarBtnClass, editor.isActive('italic') && 'bg-muted')}
            >
              <Italic className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Strikethrough"
              aria-pressed={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(toolbarBtnClass, editor.isActive('strike') && 'bg-muted')}
            >
              <Strikethrough className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-border mx-1" />

            {/* Heading group */}
            <button
              type="button"
              aria-label="Heading 1"
              aria-pressed={editor.isActive('heading', { level: 1 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={cn(toolbarBtnClass, editor.isActive('heading', { level: 1 }) && 'bg-muted')}
            >
              <Heading1 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Heading 2"
              aria-pressed={editor.isActive('heading', { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={cn(toolbarBtnClass, editor.isActive('heading', { level: 2 }) && 'bg-muted')}
            >
              <Heading2 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Heading 3"
              aria-pressed={editor.isActive('heading', { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={cn(toolbarBtnClass, editor.isActive('heading', { level: 3 }) && 'bg-muted')}
            >
              <Heading3 className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-border mx-1" />

            {/* List & block group */}
            <button
              type="button"
              aria-label="Bullet list"
              aria-pressed={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(toolbarBtnClass, editor.isActive('bulletList') && 'bg-muted')}
            >
              <List className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Ordered list"
              aria-pressed={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(toolbarBtnClass, editor.isActive('orderedList') && 'bg-muted')}
            >
              <ListOrdered className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Blockquote"
              aria-pressed={editor.isActive('blockquote')}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(toolbarBtnClass, editor.isActive('blockquote') && 'bg-muted')}
            >
              <Quote className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="w-px h-5 bg-border mx-1" />

            {/* Horizontal rule */}
            <button
              type="button"
              aria-label="Horizontal rule"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={toolbarBtnClass}
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Save status indicator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 ml-3" aria-live="polite">
          {saveStatus === 'saving' && (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving…</span>
            </>
          )}
          {saveStatus === 'saved' && !isDirty && (
            <>
              <Check className="w-3 h-3" />
              <span>Saved</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <AlertCircle className="w-3 h-3 text-destructive" />
              <span className="text-destructive">Save failed</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border-r border-border">
        {/* Recipient & Job Info */}
        <div className="px-4 pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Company</label>
              <Input
                value={coverLetterData.company || ''}
                onChange={(e) => updateJobInfo({ company: e.target.value })}
                placeholder="e.g. Acme Corp…"
                autoComplete="organization"
                name="company"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Rich text editor */}
        <div className="px-4 py-3">
          <div className="relative border border-border rounded-lg bg-background">
            <EditorContent editor={editor} />
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-6 h-6 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  <span className="text-sm">Generating cover letter\u2026</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

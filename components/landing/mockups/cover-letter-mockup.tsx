import { memo } from 'react'
import { Bold, Italic, Strikethrough, List, Download } from 'lucide-react'
import { MockupTopBar } from '../mockup-top-bar'
import { AIFloatButton } from '../ai-float-button'

export const CoverLetterFeatureMockup = memo(function CoverLetterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        rightContent={
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
            <Download className="w-2 h-2" />
            Export
          </div>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Rich text editor */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df] flex flex-col">
          {/* Tiptap toolbar */}
          <div className="flex items-center gap-0.5 px-2.5 py-1.5 border-b border-[#e8e4df]">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-[#1a4a4a]/10">
              <Bold className="w-3 h-3 text-[#1a4a4a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Italic className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Strikethrough className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-[#5a6a6a]">H1</div>
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-[#5a6a6a]">H2</div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <List className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="ml-auto flex items-center gap-1 text-[6px] text-green-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Saved
            </div>
          </div>
          {/* Company field */}
          <div className="px-3 pt-2.5 pb-1.5">
            <div className="text-[6px] text-[#5a6a6a] mb-1">Company</div>
            <div className="h-5 w-full rounded border border-[#e8e4df] flex items-center px-1.5">
              <div className="h-1 w-14 bg-[#1a2a2a]/35 rounded-full" />
            </div>
          </div>
          {/* Editor area with content */}
          <div className="mx-3 mb-3 flex-1 rounded-lg border border-[#e8e4df] p-2.5">
            <div className="space-y-1.5">
              <div className="h-1.5 w-16 bg-[#1a2a2a]/50 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-5/6 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-3/4 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-2/3 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-1/2 bg-[#1a4a4a]/12 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Preview */}
        <div className="sm:w-1/2 flex flex-col">
          <div className="flex-1 p-3 sm:p-4 bg-[#f5f4f2] relative">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11] flex flex-col">
              {/* Sender info */}
              <div className="mb-3">
                <div className="h-1.5 w-20 bg-[#1a2a2a]/50 rounded-full mb-1" />
                <div className="h-0.5 w-32 bg-[#5a6a6a]/20 rounded-full" />
              </div>
              {/* Date */}
              <div className="h-0.5 w-16 bg-[#5a6a6a]/20 rounded-full mb-3" />
              {/* Company */}
              <div className="h-0.5 w-12 bg-[#5a6a6a]/20 rounded-full mb-3" />
              {/* Body content */}
              <div className="space-y-1 mb-3">
                <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-5/6 bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-4/5 bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-2/3 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="space-y-1 mb-auto">
                <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
                <div className="h-0.5 w-3/4 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              {/* Closing */}
              <div className="mt-4">
                <div className="h-0.5 w-10 bg-[#5a6a6a]/20 rounded-full mb-2" />
                <div className="h-1 w-16 bg-[#1a2a2a]/35 rounded-full" />
              </div>
            </div>
            <AIFloatButton />
          </div>
        </div>
      </div>
    </div>
  )
})

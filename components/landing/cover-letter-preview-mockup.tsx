import { memo } from 'react'

export const CoverLetterPreviewMockup = memo(function CoverLetterPreviewMockup() {
  return (
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
      {/* Greeting */}
      <div className="h-1 w-24 bg-[#1a2a2a]/35 rounded-full mb-2" />
      {/* Body paragraphs */}
      <div className="space-y-1 mb-2">
        <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
        <div className="h-0.5 w-5/6 bg-[#5a6a6a]/15 rounded-full" />
        <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
        <div className="h-0.5 w-4/5 bg-[#5a6a6a]/15 rounded-full" />
      </div>
      <div className="space-y-1 mb-2">
        <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
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
  )
})

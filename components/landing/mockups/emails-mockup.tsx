import { memo } from 'react'
import { Star, Mail, ChevronDown } from 'lucide-react'
import { MockupTopBar } from '../mockup-top-bar'

export const EmailsFeatureMockup = memo(function EmailsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Thread list */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df] flex flex-col">
          {/* Thread 1 - selected/unread */}
          <div className="p-3 bg-[#1a4a4a]/5 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-20 bg-[#1a2a2a]/70 rounded-full" />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="px-1 py-0.5 rounded bg-[#5a6a6a]/10 text-[5px] text-[#5a6a6a]">3</div>
                <div className="h-0.5 w-6 bg-[#5a6a6a]/25 rounded-full" />
              </div>
            </div>
            <div className="ml-4.5 pl-0.5">
              <div className="h-1 w-28 bg-[#1a4a4a]/35 rounded-full mb-1.5" />
              <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
            </div>
          </div>
          {/* Thread 2 - unread */}
          <div className="p-3 bg-[#1a4a4a]/3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="w-3 h-3 text-[#5a6a6a]/20 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-16 bg-[#1a2a2a]/70 rounded-full" />
              </div>
              <div className="h-0.5 w-8 bg-[#5a6a6a]/25 rounded-full shrink-0" />
            </div>
            <div className="ml-4.5 pl-0.5">
              <div className="h-1 w-24 bg-[#5a6a6a]/25 rounded-full mb-1.5" />
              <div className="h-0.5 w-3/4 bg-[#5a6a6a]/12 rounded-full" />
            </div>
          </div>
          {/* Thread 3 - read */}
          <div className="p-3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="w-3 h-3 text-[#5a6a6a]/20 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-24 bg-[#5a6a6a]/35 rounded-full" />
              </div>
              <div className="h-0.5 w-10 bg-[#5a6a6a]/25 rounded-full shrink-0" />
            </div>
            <div className="ml-4.5 pl-0.5">
              <div className="h-1 w-20 bg-[#5a6a6a]/18 rounded-full mb-1.5" />
              <div className="h-0.5 w-2/3 bg-[#5a6a6a]/10 rounded-full" />
            </div>
          </div>
          {/* Thread 4 - read */}
          <div className="p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="w-3 h-3 text-[#5a6a6a]/20 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-20 bg-[#5a6a6a]/35 rounded-full" />
              </div>
              <div className="h-0.5 w-6 bg-[#5a6a6a]/25 rounded-full shrink-0" />
            </div>
            <div className="ml-4.5 pl-0.5">
              <div className="h-1 w-28 bg-[#5a6a6a]/18 rounded-full mb-1.5" />
              <div className="h-0.5 w-1/2 bg-[#5a6a6a]/10 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Message view */}
        <div className="sm:w-1/2 flex flex-col">
          {/* Subject header with actions */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#e8e4df]">
            <div className="h-1.5 w-32 bg-[#1a2a2a]/60 rounded-full" />
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <Mail className="w-3 h-3 text-[#5a6a6a]/40" />
            </div>
          </div>
          {/* Message bubbles */}
          <div className="flex-1 p-3.5 space-y-3 bg-[#faf9f7]">
            {/* Message 1 - collapsed */}
            <div className="rounded-lg bg-white border border-[#e8e4df] p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1a4a4a] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-1 w-16 bg-[#1a2a2a]/50 rounded-full mb-1" />
                  <div className="h-0.5 w-full bg-[#5a6a6a]/12 rounded-full" />
                </div>
                <div className="h-0.5 w-12 bg-[#5a6a6a]/20 rounded-full shrink-0" />
                <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a]/30 shrink-0" />
              </div>
            </div>
            {/* Message 2 - expanded */}
            <div className="rounded-lg bg-white border border-[#e8e4df] p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#e8e4df]/50">
                <div className="w-7 h-7 rounded-full bg-[#1a4a4a] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-1 w-20 bg-[#1a2a2a]/50 rounded-full mb-1" />
                  <div className="h-0.5 w-24 bg-[#5a6a6a]/20 rounded-full" />
                </div>
                <div className="h-0.5 w-16 bg-[#5a6a6a]/20 rounded-full shrink-0" />
              </div>
              {/* Message body */}
              <div className="space-y-1.5 mb-3">
                <div className="h-0.5 w-full bg-[#1a4a4a]/12 rounded-full" />
                <div className="h-0.5 w-5/6 bg-[#1a4a4a]/12 rounded-full" />
                <div className="h-0.5 w-full bg-[#1a4a4a]/12 rounded-full" />
                <div className="h-0.5 w-3/4 bg-[#1a4a4a]/12 rounded-full" />
              </div>
              {/* Reply / Forward buttons */}
              <div className="flex gap-1.5">
                <div className="px-2 py-1 rounded border border-[#e8e4df] text-[6px] text-[#5a6a6a]">Reply</div>
                <div className="px-2 py-1 rounded border border-[#e8e4df] text-[6px] text-[#5a6a6a]">Forward</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

import { Sparkles } from 'lucide-react'

export default function AutoFixBeforeAfterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Issue card + fix */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7] space-y-3">
          {/* Issue card */}
          <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700">Critical</div>
                <div className="h-1.5 w-24 bg-[#1a4a4a]/30 rounded-full" />
              </div>
            </div>
            <div className="space-y-1 mb-2">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="h-7 w-full rounded-lg bg-[#1a4a4a] flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-white/70" />
              <div className="text-[8px] font-medium text-white">Fix with AI</div>
            </div>
          </div>
          {/* Another issue */}
          <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-amber-100 text-amber-700">Warning</div>
                <div className="h-1.5 w-20 bg-[#1a4a4a]/30 rounded-full" />
              </div>
            </div>
            <div className="space-y-1 mb-2">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-3/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="h-7 w-full rounded-lg border border-[#e8e4df] bg-white flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1a4a4a]/50" />
              <div className="text-[8px] font-medium text-[#1a4a4a]">Fix with AI</div>
            </div>
          </div>
        </div>
        {/* Before/after + score increment */}
        <div className="w-1/2 p-4 space-y-3">
          {/* Before */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="px-1.5 py-0.5 rounded text-[7px] font-semibold bg-red-100 text-red-700">Before</div>
            </div>
            <div className="p-2 rounded-lg border border-red-200 bg-red-50">
              <div className="space-y-1">
                <div className="h-1 w-full bg-red-400/20 rounded-full" />
                <div className="h-1 w-5/6 bg-red-400/20 rounded-full" />
                <div className="h-1 w-4/5 bg-red-400/15 rounded-full" />
              </div>
            </div>
          </div>
          {/* After */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="px-1.5 py-0.5 rounded text-[7px] font-semibold bg-green-100 text-green-700">After</div>
            </div>
            <div className="p-2 rounded-lg border border-green-200 bg-green-50">
              <div className="space-y-1">
                <div className="h-1 w-full bg-green-400/25 rounded-full" />
                <div className="h-1 w-full bg-green-400/25 rounded-full" />
                <div className="h-1 w-5/6 bg-green-400/20 rounded-full" />
                <div className="h-1 w-4/5 bg-green-400/15 rounded-full" />
              </div>
            </div>
          </div>
          {/* Score increment */}
          <div className="flex items-center justify-center gap-3 p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-[3px] border-amber-400 flex items-center justify-center">
                <span className="text-sm font-bold text-[#1a2a2a]">74</span>
              </div>
            </div>
            <div className="text-[10px] font-bold text-green-600">→</div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-[3px] border-green-400 flex items-center justify-center">
                <span className="text-sm font-bold text-[#1a2a2a]">89</span>
              </div>
            </div>
            <div className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[8px] font-semibold">+15</div>
          </div>
        </div>
      </div>
    </div>
  )
}

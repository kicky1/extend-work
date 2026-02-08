import { Sparkles } from 'lucide-react'

export default function RewriteSectionFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Before */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700">Before</div>
          </div>
          <div className="space-y-2.5">
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-8 rounded-full bg-red-300 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-5/6 bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-6 rounded-full bg-amber-300 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-3/4 bg-[#1a4a4a]/15 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-8 rounded-full bg-amber-300 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-2/3 bg-[#1a4a4a]/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* After */}
        <div className="w-1/2 p-4 bg-white">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-green-100 text-green-700">After</div>
            <Sparkles className="w-3 h-3 text-green-600" />
          </div>
          <div className="space-y-2.5">
            <div className="p-2 rounded-lg border border-green-200 bg-green-50">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-10 rounded-full bg-green-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-5/6 bg-green-600/20 rounded-full" />
                  <div className="h-1 w-3/4 bg-green-600/15 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg border border-green-200 bg-green-50">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-8 rounded-full bg-green-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-2/3 bg-green-600/20 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg border border-green-200 bg-green-50">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-10 rounded-full bg-green-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-full bg-green-600/25 rounded-full" />
                  <div className="h-1 w-5/6 bg-green-600/20 rounded-full" />
                  <div className="h-1 w-4/5 bg-green-600/15 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { memo } from 'react'
import { ArrowLeftRight } from 'lucide-react'

const CVToCoverLetterFeatureMockup = memo(function CVToCoverLetterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* CV side */}
        <div className="sm:w-[45%] p-3 sm:p-4 bg-[#f5f4f2]">
          <div className="text-[7px] font-semibold text-[#5a6a6a] mb-2 text-center">Your CV</div>
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-2.5 aspect-[8.5/11]">
            {/* CV Header */}
            <div className="h-7 bg-[#1a4a4a] rounded mb-2 p-1.5">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1 w-10 bg-white/50 rounded-full mb-0.5" />
                  <div className="h-0.5 w-7 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            {/* Experience - highlighted blue */}
            <div className="p-1 rounded bg-blue-50 border border-blue-200 mb-1.5">
              <div className="h-1 w-8 bg-blue-500/40 rounded-full mb-0.5" />
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-blue-400/25 rounded-full" />
                <div className="h-0.5 w-5/6 bg-blue-400/25 rounded-full" />
                <div className="h-0.5 w-full bg-blue-400/25 rounded-full" />
              </div>
            </div>
            {/* Skills - highlighted purple */}
            <div className="p-1 rounded bg-purple-50 border border-purple-200 mb-1.5">
              <div className="h-1 w-6 bg-purple-500/40 rounded-full mb-0.5" />
              <div className="flex flex-wrap gap-0.5">
                <div className="h-2 w-6 bg-purple-200 rounded-full" />
                <div className="h-2 w-8 bg-purple-200 rounded-full" />
                <div className="h-2 w-5 bg-purple-200 rounded-full" />
              </div>
            </div>
            {/* Education */}
            <div className="space-y-0.5">
              <div className="h-1 w-8 bg-[#1a4a4a]/40 rounded-full" />
              <div className="h-0.5 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-0.5 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
        {/* Connection indicator */}
        <div className="hidden sm:flex sm:w-[10%] items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-1">
            <ArrowLeftRight className="w-4 h-4 text-[#1a4a4a]/40" />
            <div className="text-[5px] text-[#5a6a6a] font-medium">Synced</div>
          </div>
        </div>
        {/* Mobile connection indicator */}
        <div className="flex sm:hidden items-center justify-center py-2 bg-white">
          <div className="flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#1a4a4a]/40" />
            <div className="text-[6px] text-[#5a6a6a] font-medium">Synced</div>
          </div>
        </div>
        {/* Cover letter side */}
        <div className="sm:w-[45%] p-3 sm:p-4 bg-[#f5f4f2]">
          <div className="text-[7px] font-semibold text-[#5a6a6a] mb-2 text-center">Cover Letter</div>
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-2.5 aspect-[8.5/11] flex flex-col">
            {/* Date */}
            <div className="space-y-0.5 mb-2">
              <div className="h-0.5 w-10 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-0.5 w-14 bg-[#1a4a4a]/20 rounded-full" />
            </div>
            {/* Greeting */}
            <div className="h-1 w-16 bg-[#1a4a4a]/40 rounded-full mb-2" />
            {/* Paragraph */}
            <div className="space-y-0.5 mb-1.5">
              <div className="h-0.5 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-0.5 w-full bg-[#1a4a4a]/10 rounded-full" />
            </div>
            {/* Experience highlight - matching blue */}
            <div className="p-1 rounded bg-blue-50 border border-blue-200 mb-1.5">
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-blue-400/30 rounded-full" />
                <div className="h-0.5 w-full bg-blue-400/30 rounded-full" />
                <div className="h-0.5 w-3/4 bg-blue-400/25 rounded-full" />
              </div>
            </div>
            {/* Skills highlight - matching purple */}
            <div className="p-1 rounded bg-purple-50 border border-purple-200 mb-1.5">
              <div className="space-y-0.5">
                <div className="h-0.5 w-full bg-purple-400/30 rounded-full" />
                <div className="h-0.5 w-5/6 bg-purple-400/25 rounded-full" />
              </div>
            </div>
            {/* Remaining paragraph */}
            <div className="space-y-0.5 mb-auto">
              <div className="h-0.5 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-0.5 w-2/3 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            {/* Signature */}
            <div className="mt-2">
              <div className="h-0.5 w-8 bg-[#1a4a4a]/20 rounded-full mb-1" />
              <div className="h-1 w-14 bg-[#1a4a4a]/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CVToCoverLetterFeatureMockup

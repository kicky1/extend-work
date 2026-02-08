import { memo } from 'react'
import { Briefcase, FileText } from 'lucide-react'
import { MockupTopBar } from '@/components/landing/mockup-top-bar'

const JobToCoverLetterFeatureMockup = memo(function JobToCoverLetterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        leftContent={
          <span className="text-[7px] font-semibold text-[#1a2a2a]">Job Listing</span>
        }
        rightContent={
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
            Generate
          </div>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Job card */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df] p-3 sm:p-4">
          <div className="p-3 rounded-lg border border-[#e8e4df] bg-white shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="h-2 w-24 bg-[#1a2a2a] rounded-full mb-1" />
                  <div className="h-1.5 w-16 bg-[#5a6a6a]/30 rounded-full" />
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">91%</div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              <div className="px-1.5 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[7px] font-medium text-[#1a4a4a]">Remote</div>
              <div className="px-1.5 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[7px] font-medium text-[#1a4a4a]">Full-time</div>
              <div className="px-1.5 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[7px] font-medium text-[#1a4a4a]">$130k</div>
            </div>
            <div className="space-y-1 mb-3">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="h-7 w-full rounded-lg bg-[#1a4a4a] flex items-center justify-center gap-1.5">
              <FileText className="w-3 h-3 text-white/70" />
              <div className="text-[8px] font-medium text-white">Generate cover letter</div>
            </div>
          </div>
        </div>
        {/* Right: Cover letter preview with green highlight */}
        <div className="sm:w-1/2 p-3 sm:p-4 bg-[#f5f4f2]">
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
            {/* Body paragraph */}
            <div className="space-y-1 mb-2">
              <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
              <div className="h-0.5 w-5/6 bg-[#5a6a6a]/15 rounded-full" />
              <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
            </div>
            {/* Green highlighted job-matched section */}
            <div className="p-1.5 rounded bg-green-50 border border-green-200 mb-2">
              <div className="space-y-1">
                <div className="h-0.5 w-full bg-green-400/40 rounded-full" />
                <div className="h-0.5 w-full bg-green-400/40 rounded-full" />
                <div className="h-0.5 w-3/4 bg-green-400/35 rounded-full" />
              </div>
            </div>
            {/* More body */}
            <div className="space-y-1 mb-auto">
              <div className="h-0.5 w-full bg-[#5a6a6a]/15 rounded-full" />
              <div className="h-0.5 w-2/3 bg-[#5a6a6a]/15 rounded-full" />
            </div>
            {/* Closing */}
            <div className="mt-4">
              <div className="h-0.5 w-10 bg-[#5a6a6a]/20 rounded-full mb-2" />
              <div className="h-1 w-16 bg-[#1a2a2a]/35 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default JobToCoverLetterFeatureMockup

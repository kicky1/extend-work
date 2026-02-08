import { memo } from 'react'
import { Search, ChevronDown, MapPin, Building2, Sparkles } from 'lucide-react'
import { MockupTopBar } from '../mockup-top-bar'

export const JobsFeatureMockup = memo(function JobsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Narrow filters sidebar */}
        <div className="sm:w-2/5 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#faf9f7]">
          {/* Search */}
          <div className="h-5 w-full rounded-lg border border-[#e8e4df] bg-white flex items-center gap-1 px-1.5 mb-3">
            <Search className="w-2 h-2 text-[#5a6a6a]" />
            <div className="h-1 w-10 bg-[#5a6a6a]/20 rounded-full" />
          </div>
          {/* Sort section */}
          <div className="rounded-lg border border-[#e8e4df] bg-white p-2.5 mb-3">
            <div className="text-[7px] font-medium text-[#1a2a2a] mb-1.5">Sort by</div>
            <div className="h-5 w-full rounded border border-[#e8e4df] flex items-center justify-between px-1.5">
              <div className="h-0.5 w-12 bg-[#5a6a6a]/20 rounded-full" />
              <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
            </div>
          </div>
          {/* Filters section */}
          <div className="rounded-lg border border-[#e8e4df] bg-white p-2.5">
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-[7px] font-medium text-[#1a2a2a]">Filters</div>
              <div className="text-[6px] text-[#1a4a4a]">Clear all</div>
            </div>
            {/* Match score slider */}
            <div className="mb-3">
              <div className="text-[6px] text-[#5a6a6a] mb-1">Match score</div>
              <div className="h-1 w-full bg-[#e8e4df] rounded-full relative">
                <div className="h-1 w-3/4 bg-[#1a4a4a] rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a4a4a] border-2 border-white shadow-sm absolute top-1/2 -translate-y-1/2 left-3/4" />
              </div>
            </div>
            {/* Toggle filters */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-3 rounded-full bg-[#1a4a4a]">
                  <div className="w-2.5 h-2.5 rounded-full bg-white ml-auto mr-px mt-px" />
                </div>
                <span className="text-[6px] text-[#5a6a6a]">Salary only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-3 rounded-full bg-[#e8e4df]">
                  <div className="w-2.5 h-2.5 rounded-full bg-white ml-px mt-px" />
                </div>
                <span className="text-[6px] text-[#5a6a6a]">Remote only</span>
              </div>
            </div>
            {/* Location */}
            <div className="mb-3">
              <div className="text-[6px] text-[#5a6a6a] mb-1">Location</div>
              <div className="h-5 w-full rounded border border-[#e8e4df] flex items-center gap-1 px-1.5">
                <MapPin className="w-2 h-2 text-[#5a6a6a]" />
                <div className="h-1 w-12 bg-[#5a6a6a]/20 rounded-full" />
              </div>
            </div>
            {/* Experience level */}
            <div>
              <div className="text-[6px] text-[#5a6a6a] mb-1">Experience</div>
              <div className="flex flex-wrap gap-1">
                <div className="px-1.5 py-0.5 rounded-full text-[6px] bg-[#1a4a4a] text-white">Senior</div>
                <div className="px-1.5 py-0.5 rounded-full text-[6px] border border-[#e8e4df] text-[#5a6a6a]">Mid</div>
                <div className="px-1.5 py-0.5 rounded-full text-[6px] border border-[#e8e4df] text-[#5a6a6a]">Lead</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Two-column job cards */}
        <div className="sm:w-3/5 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Job Card 1 */}
            <div className="p-2.5 rounded-lg border-2 border-[#1a4a4a]/20 bg-white">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-full bg-[#1a2a2a]/60 rounded-full mb-1" />
                  <div className="h-1 w-3/4 bg-[#5a6a6a]/25 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <div className="h-0.5 w-8 bg-[#5a6a6a]/20 rounded-full" />
                <div className="h-0.5 w-5 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="h-1 w-4/5 bg-green-500/25 rounded-full mb-1.5" />
              <div className="flex gap-1 flex-wrap mb-2">
                <div className="h-2.5 w-7 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-9 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-6 rounded border border-[#e8e4df]" />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-100">
                  <Sparkles className="w-2 h-2 text-green-700" />
                  <div className="h-0.5 w-4 bg-green-700/40 rounded-full" />
                </div>
              </div>
            </div>
            {/* Job Card 2 */}
            <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-purple-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-full bg-[#1a2a2a]/60 rounded-full mb-1" />
                  <div className="h-1 w-2/3 bg-[#5a6a6a]/25 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <div className="h-0.5 w-6 bg-[#5a6a6a]/20 rounded-full" />
                <div className="h-0.5 w-4 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="h-1 w-3/5 bg-green-500/25 rounded-full mb-1.5" />
              <div className="flex gap-1 flex-wrap mb-2">
                <div className="h-2.5 w-6 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-5 rounded border border-[#e8e4df]" />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-100">
                  <Sparkles className="w-2 h-2 text-green-700" />
                  <div className="h-0.5 w-4 bg-green-700/40 rounded-full" />
                </div>
              </div>
            </div>
            {/* Job Card 3 */}
            <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-full bg-[#1a2a2a]/60 rounded-full mb-1" />
                  <div className="h-1 w-4/5 bg-[#5a6a6a]/25 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <div className="h-0.5 w-5 bg-[#5a6a6a]/20 rounded-full" />
                <div className="h-0.5 w-6 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="h-1 w-2/3 bg-green-500/25 rounded-full mb-1.5" />
              <div className="flex gap-1 flex-wrap mb-2">
                <div className="h-2.5 w-5 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-7 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-5 rounded border border-[#e8e4df]" />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-yellow-100">
                  <Sparkles className="w-2 h-2 text-yellow-700" />
                  <div className="h-0.5 w-4 bg-yellow-700/40 rounded-full" />
                </div>
              </div>
            </div>
            {/* Job Card 4 */}
            <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-green-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-full bg-[#1a2a2a]/60 rounded-full mb-1" />
                  <div className="h-1 w-1/2 bg-[#5a6a6a]/25 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <div className="h-0.5 w-8 bg-[#5a6a6a]/20 rounded-full" />
                <div className="h-0.5 w-4 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="h-1 w-1/2 bg-green-500/25 rounded-full mb-1.5" />
              <div className="flex gap-1 flex-wrap mb-2">
                <div className="h-2.5 w-8 rounded border border-[#e8e4df]" />
                <div className="h-2.5 w-6 rounded border border-[#e8e4df]" />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-yellow-100">
                  <Sparkles className="w-2 h-2 text-yellow-700" />
                  <div className="h-0.5 w-4 bg-yellow-700/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

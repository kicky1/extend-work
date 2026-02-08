import { memo } from 'react'
import { ArrowUpDown, Bookmark, Briefcase, Building2, ChevronDown, ChevronLeft, ChevronRight, Clock, Home, MapPin, PenLine, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { MockupTopBar } from '@/components/landing/mockup-top-bar'

export default memo(function JobSearchFilterFeatureMockup() {
  return (
    <div className="rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] bg-white overflow-hidden">
      <MockupTopBar
        leftContent={
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#1a2a2a] whitespace-nowrap">AI Job Recommendations</span>
            <span className="text-[8px] sm:text-[9px] text-[#5a6a6a] whitespace-nowrap">79 jobs matched</span>
          </div>
        }
        rightContent={
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3 h-3 text-[#5a6a6a]" />
            <span className="text-[8px] text-[#5a6a6a]">Saved</span>
          </div>
        }
      />
      {/* Search bar */}
      <div className="px-3 pt-2 pb-1">
        <div className="h-6 w-full bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center gap-1.5">
          <Search className="w-3 h-3 text-[#5a6a6a]/40" />
          <div className="h-1.5 w-24 bg-[#1a4a4a]/10 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        {/* Left sidebar — filters */}
        <div className="sm:w-[30%] p-3 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#faf9f7] space-y-3">
          {/* Sort */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3 h-3 text-[#5a6a6a]" />
            <span className="text-[7px] font-semibold text-[#5a6a6a]">Sort</span>
            <div className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#e8e4df] bg-white">
              <span className="text-[7px] text-[#1a4a4a]">Match score</span>
              <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
            </div>
          </div>
          {/* Filters header + clear */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#5a6a6a]" />
              <span className="text-[7px] font-semibold text-[#5a6a6a]">Filters</span>
            </div>
            <span className="text-[6px] text-[#1a4a4a] underline">Clear all</span>
          </div>
          {/* Match score — active at 55% */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] text-[#5a6a6a]">Match score</span>
              <span className="text-[7px] font-medium text-[#1a4a4a]">55%+</span>
            </div>
            <div className="h-1.5 w-full bg-[#e8e4df] rounded-full relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-[55%] bg-[#1a4a4a] rounded-full" />
            </div>
          </div>
          {/* Salary */}
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] text-[#5a6a6a]">$ Salary</span>
            <div className="ml-auto w-5 h-2.5 rounded-full bg-[#e8e4df]" />
            <span className="text-[6px] text-[#5a6a6a]">Show only with salary</span>
          </div>
          {/* Work type */}
          <div className="flex items-center gap-1.5">
            <Home className="w-2.5 h-2.5 text-[#5a6a6a]" />
            <div className="w-5 h-2.5 rounded-full bg-[#e8e4df]" />
            <span className="text-[6px] text-[#5a6a6a]">Remote only</span>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-[#5a6a6a]" />
            <div className="flex-1 h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
              <div className="h-1 w-10 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <X className="w-2 h-2 text-[#5a6a6a]/50" />
          </div>
          {/* Job type */}
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-2.5 h-2.5 text-[#5a6a6a]" />
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#e8e4df] bg-white">
              <span className="text-[7px] text-[#1a4a4a]">All</span>
              <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
            </div>
          </div>
        </div>
        {/* Right: job cards */}
        <div className="flex-1 p-3">
          <div className="text-[8px] font-semibold text-[#1a2a2a] mb-2">79 jobs found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'w-20', company: 'w-14', location: 'London', tags: ['Remote', 'Full-time'], salary: '$130k–$160k', match: 91, sourceW: 'w-10', days: 2 },
              { title: 'w-24', company: 'w-12', location: 'Berlin', tags: ['Hybrid', 'Full-time'], salary: null, match: 87, sourceW: 'w-8', days: 3 },
              { title: 'w-18', company: 'w-16', location: 'Amsterdam', tags: ['Remote', 'Contract'], salary: '$95k–$115k', match: 78, sourceW: 'w-12', days: 1 },
              { title: 'w-22', company: 'w-10', location: 'NYC', tags: ['On-site', 'Full-time'], salary: null, match: 72, sourceW: 'w-9', days: 5 },
            ].map((job, i) => (
              <div key={i} className="p-2.5 rounded-lg border border-[#e8e4df] bg-white space-y-1.5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#5a6a6a]/60" />
                    <div>
                      <div className={`h-1.5 ${job.title} bg-[#1a2a2a] rounded-full mb-0.5`} />
                      <div className={`h-1 ${job.company} bg-[#5a6a6a]/30 rounded-full`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <PenLine className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                    <Bookmark className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                  </div>
                </div>
                {/* Location + tags */}
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-2 h-2 text-[#5a6a6a]/40" />
                    <span className="text-[6px] text-[#5a6a6a]">{job.location}</span>
                  </div>
                  {job.tags.map(tag => (
                    <span key={tag} className="px-1 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[6px] text-[#5a6a6a]">{tag}</span>
                  ))}
                </div>
                {/* Salary */}
                {job.salary && (
                  <div className="text-[7px] font-medium text-green-600">{job.salary}</div>
                )}
                {/* Footer */}
                <div className="flex items-center gap-2 text-[6px] text-[#5a6a6a]">
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-[#5a6a6a]/30" />
                    <div className={`h-1 ${job.sourceW} bg-[#5a6a6a]/20 rounded-full`} />
                  </div>
                  <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full ${job.match >= 80 ? 'bg-green-100 text-green-600' : job.match >= 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-orange-100 text-orange-600'}`}>
                    <Sparkles className="w-2 h-2" />
                    <span className="font-medium">{job.match}%</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Clock className="w-2 h-2 text-[#5a6a6a]/40" />
                    <span>{job.days}d ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e8e4df]">
            <div className="flex items-center gap-1 text-[7px] text-[#5a6a6a]">
              <ChevronLeft className="w-2.5 h-2.5" />
              <span>Previous</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[7px] text-[#1a2a2a] font-medium">Page 1 of 7</span>
              <div className="flex items-center gap-0.5 px-1 py-0.5 rounded border border-[#e8e4df] bg-white">
                <span className="text-[7px] text-[#1a4a4a]">12</span>
                <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-[7px] text-[#1a4a4a] font-medium">
              <span>Next</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

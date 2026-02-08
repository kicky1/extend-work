import { memo } from 'react'
import { Sparkles, Download, ChevronDown } from 'lucide-react'
import { MockupTopBar } from '../mockup-top-bar'
import { CVPreviewMockup } from '../cv-preview-mockup'
import { AIFloatButton } from '../ai-float-button'

export const CVCreatorFeatureMockup = memo(function CVCreatorFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        leftContent={
          <>
            <div className="px-2 py-1 rounded text-[7px] font-medium bg-[#1a4a4a]/10 text-[#1a4a4a] whitespace-nowrap">Personal Info</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Experience</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Education</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Skills</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Languages</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Certificates</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Footer</div>
          </>
        }
        rightContent={
          <>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#e8e4df] bg-white text-[6px] text-[#5a6a6a] whitespace-nowrap">
              <Sparkles className="w-2 h-2" />
              Evaluate
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
              <Download className="w-2 h-2" />
              Export
            </div>
          </>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Form editor */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df]">
          <div className="p-3 sm:p-4 space-y-3">
            {/* Personal Information section */}
            <div className="border border-[#e8e4df] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-2.5 py-2 bg-white">
                <span className="text-[8px] font-semibold text-[#1a2a2a]">Personal Information</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a] rotate-180" />
              </div>
              <div className="px-2.5 pb-2.5 space-y-2">
                {/* Profile photo */}
                <div className="flex items-center gap-2 py-1.5 px-2 border border-dashed border-[#e8e4df] rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-[#f5f4f2] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5a6a6a]/20" />
                  </div>
                  <div>
                    <div className="text-[6px] font-medium text-[#1a2a2a]">Add Profile Photo</div>
                    <div className="text-[5px] text-[#5a6a6a]">Optional - appears in header</div>
                  </div>
                </div>
                {/* Full Name */}
                <div>
                  <div className="text-[6px] text-[#5a6a6a] mb-0.5">Full Name *</div>
                  <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                    <div className="h-1 w-16 bg-[#1a2a2a]/40 rounded-full" />
                  </div>
                </div>
                {/* Email + Phone row */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Email *</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/30 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Phone *</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                      <div className="h-1 w-14 bg-[#1a2a2a]/30 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div>
                  <div className="text-[6px] text-[#5a6a6a] mb-0.5">Location *</div>
                  <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                    <div className="h-1 w-10 bg-[#1a2a2a]/30 rounded-full" />
                  </div>
                </div>
                {/* Website + LinkedIn + GitHub row */}
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Website</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">LinkedIn</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">GitHub</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Professional Summary section */}
            <div className="border border-[#e8e4df] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-2.5 py-2 bg-white">
                <span className="text-[8px] font-semibold text-[#1a2a2a]">Professional Summary</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a] rotate-180" />
              </div>
              <div className="px-2.5 pb-2.5">
                <div className="text-[6px] text-[#5a6a6a] mb-0.5">Summary</div>
                <div className="h-12 rounded border border-[#e8e4df] bg-white p-1.5">
                  <div className="space-y-0.5">
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-5/6 bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-3/4 bg-[#1a2a2a]/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Preview panel */}
        <div className="sm:w-1/2 flex flex-col">
          <div className="flex-1 p-3 sm:p-4 bg-[#f5f4f2] relative">
            <CVPreviewMockup />
            <AIFloatButton />
          </div>
        </div>
      </div>
    </div>
  )
})

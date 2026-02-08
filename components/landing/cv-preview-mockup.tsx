import { memo } from 'react'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export const CVPreviewMockup = memo(function CVPreviewMockup({ showAIButton = false }: { showAIButton?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11] flex flex-col">
      {/* CV Header - name + contact info */}
      <div className="mb-2">
        <div className="h-2 w-20 bg-[#1a4a4a]/70 rounded-full mb-1" />
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-1">
          <div className="flex items-center gap-0.5">
            <Mail className="w-1.5 h-1.5 text-[#5a6a6a]" />
            <div className="h-0.5 w-14 bg-[#5a6a6a]/30 rounded-full" />
          </div>
          <div className="flex items-center gap-0.5">
            <Phone className="w-1.5 h-1.5 text-[#5a6a6a]" />
            <div className="h-0.5 w-10 bg-[#5a6a6a]/30 rounded-full" />
          </div>
          <div className="flex items-center gap-0.5">
            <MapPin className="w-1.5 h-1.5 text-[#5a6a6a]" />
            <div className="h-0.5 w-6 bg-[#5a6a6a]/30 rounded-full" />
          </div>
          <div className="flex items-center gap-0.5">
            <Globe className="w-1.5 h-1.5 text-[#5a6a6a]" />
            <div className="h-0.5 w-12 bg-[#5a6a6a]/30 rounded-full" />
          </div>
        </div>
        <div className="h-px w-full bg-[#1a4a4a]" />
      </div>
      {/* Professional Summary */}
      <div className="mb-2">
        <div className="text-[6px] font-bold text-[#1a4a4a] tracking-wide mb-0.5">PROFESSIONAL SUMMARY</div>
        <div className="h-px w-6 bg-[#1a4a4a] mb-1" />
        <div className="space-y-0.5">
          <div className="h-px w-full bg-[#1a2a2a]/30 rounded-full" />
          <div className="h-px w-full bg-[#1a2a2a]/30 rounded-full" />
          <div className="h-px w-5/6 bg-[#1a2a2a]/30 rounded-full" />
        </div>
      </div>
      {/* Work Experience */}
      <div className="mb-2">
        <div className="text-[6px] font-bold text-[#1a4a4a] tracking-wide mb-0.5">WORK EXPERIENCE</div>
        <div className="h-px w-6 bg-[#1a4a4a] mb-1.5" />
        <div className="mb-1.5">
          <div className="flex justify-between items-start mb-0.5">
            <div className="space-y-0.5">
              <div className="h-1 w-20 bg-[#1a4a4a]/50 rounded-full" />
              <div className="h-0.5 w-14 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="space-y-0.5 flex flex-col items-end">
              <div className="h-0.5 w-10 bg-[#5a6a6a]/25 rounded-full" />
              <div className="h-0.5 w-12 bg-[#5a6a6a]/25 rounded-full" />
            </div>
          </div>
          <div className="space-y-0.5 pl-1.5 mt-0.5">
            <div className="flex items-start gap-0.5">
              <span className="text-[4px] text-[#5a6a6a] mt-px">&rarr;</span>
              <div className="h-px w-full bg-[#1a2a2a]/20 rounded-full mt-[3px]" />
            </div>
            <div className="flex items-start gap-0.5">
              <span className="text-[4px] text-[#5a6a6a] mt-px">&rarr;</span>
              <div className="h-px w-5/6 bg-[#1a2a2a]/20 rounded-full mt-[3px]" />
            </div>
            <div className="flex items-start gap-0.5">
              <span className="text-[4px] text-[#5a6a6a] mt-px">&rarr;</span>
              <div className="h-px w-4/5 bg-[#1a2a2a]/20 rounded-full mt-[3px]" />
            </div>
          </div>
        </div>
      </div>
      {/* Education */}
      <div className="mb-auto">
        <div className="text-[6px] font-bold text-[#1a4a4a] tracking-wide mb-0.5">EDUCATION</div>
        <div className="h-px w-6 bg-[#1a4a4a] mb-1" />
        <div className="flex justify-between">
          <div className="h-0.5 w-24 bg-[#1a2a2a]/20 rounded-full" />
          <div className="h-0.5 w-12 bg-[#5a6a6a]/20 rounded-full" />
        </div>
      </div>
      {/* RODO/GDPR footer clause */}
      <div className="pt-2 border-t border-[#e8e4df]">
        <div className="flex items-center gap-0.5 mb-0.5">
          <Globe className="w-1.5 h-1.5 text-[#5a6a6a]/40" />
          <span className="text-[4px] italic text-[#5a6a6a]/50">GDPR / RODO Consent (EU)</span>
        </div>
        <div className="space-y-px">
          <div className="h-px w-full bg-[#5a6a6a]/8 rounded-full" />
          <div className="h-px w-5/6 bg-[#5a6a6a]/8 rounded-full" />
        </div>
      </div>
    </div>
  )
})

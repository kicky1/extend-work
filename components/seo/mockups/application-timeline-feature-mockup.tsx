import { Check, Clock, Plus, X, MoreHorizontal, Phone, Video, Building2, CheckCircle2, SkipForward, Circle } from 'lucide-react'

export default function ApplicationTimelineFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Recruitment Process Panel (matches real RecruitmentProcessPanel) */}
        <div className="w-1/2 border-r border-[#e8e4df] bg-white flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-[#e8e4df]">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-3/4 bg-[#1a2a2a]/40 rounded-full mb-1" />
                <div className="h-1 w-1/2 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="flex items-center gap-1 ml-2 shrink-0">
                <div className="px-1.5 py-0.5 rounded text-[6px] font-medium bg-green-50 text-green-700 border border-green-200">Active</div>
                <MoreHorizontal className="w-3 h-3 text-[#5a6a6a]" />
                <X className="w-3 h-3 text-[#5a6a6a]" />
              </div>
            </div>
          </div>

          {/* Timeline stages (matches real stage rendering) */}
          <div className="p-3 flex-1">
            <div className="space-y-0">
              {/* Application Sent - completed */}
              <div className="flex items-center gap-2.5 py-1.5 px-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-green-50 ring-1 ring-green-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7px] font-medium text-[#1a2a2a]">Application Sent</div>
                </div>
                <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-green-50 text-green-600">Completed</div>
              </div>

              {/* Phone Screen - completed */}
              <div className="flex items-center gap-2.5 py-1.5 px-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-green-50 ring-1 ring-green-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7px] font-medium text-[#1a2a2a]">Phone Screen</div>
                </div>
                <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-green-50 text-green-600">Completed</div>
              </div>

              {/* Video Interview - scheduled */}
              <div className="flex items-center gap-2.5 py-1.5 px-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-blue-50 ring-1 ring-blue-200 flex items-center justify-center shrink-0">
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7px] font-medium text-[#1a2a2a]">Video Interview</div>
                  <div className="text-[5px] text-[#8a9a9a]">Feb 16, 10:00 AM</div>
                </div>
                <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-blue-50 text-blue-600">Scheduled</div>
              </div>

              {/* Onsite - pending */}
              <div className="flex items-center gap-2.5 py-1.5 px-1 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-white ring-1 ring-gray-200 flex items-center justify-center shrink-0">
                  <Circle className="w-3 h-3 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7px] font-medium text-[#5a6a6a]">Onsite / Final</div>
                </div>
                <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-gray-50 text-gray-500">Pending</div>
              </div>

              {/* Add Next Step */}
              <div className="flex items-center gap-2.5 py-1.5 px-1 mt-1">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#d0ccc7] flex items-center justify-center bg-white shrink-0">
                  <Plus className="w-2.5 h-2.5 text-[#999]" />
                </div>
                <span className="text-[7px] text-[#999]">Add Next Step</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stage detail + interview scheduling actions */}
        <div className="w-1/2 p-4 bg-[#faf9f7] space-y-3">
          {/* Stage detail card */}
          <div className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 ring-1 ring-blue-200 flex items-center justify-center shrink-0">
                <Clock className="w-3 h-3 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-[8px] font-semibold text-[#1a2a2a]">Video Interview</div>
                <div className="text-[6px] text-blue-600">Scheduled</div>
              </div>
            </div>
            <div className="space-y-1.5 text-[6px] text-[#5a6a6a]">
              <div className="flex items-center gap-1">
                <Video className="w-2.5 h-2.5 shrink-0" />
                <span>Video call</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1 w-24 bg-[#5a6a6a]/15 rounded-full" />
              </div>
            </div>
          </div>

          {/* Add stage type pills (matches real add-step pills) */}
          <div>
            <div className="text-[7px] font-medium text-[#5a6a6a] mb-1.5">Quick add step</div>
            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Phone Screen', Icon: Phone },
                { label: 'Video Interview', Icon: Video },
                { label: 'Onsite / Final', Icon: Building2 },
              ].map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 px-1.5 py-1 rounded-full border border-[#e8e4df] text-[6px] text-[#5a6a6a] bg-white"
                >
                  <Icon className="w-2 h-2" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Process status options (matches real dropdown) */}
          <div>
            <div className="text-[7px] font-medium text-[#5a6a6a] mb-1.5">Mark outcome</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-[#e8e4df]">
                <Check className="w-2 h-2 text-green-600" />
                <span className="text-[6px] text-[#1a2a2a]">Mark Accepted</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-[#e8e4df]">
                <X className="w-2 h-2 text-red-600" />
                <span className="text-[6px] text-[#1a2a2a]">Mark Rejected</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-[#e8e4df]">
                <SkipForward className="w-2 h-2 text-gray-500" />
                <span className="text-[6px] text-[#1a2a2a]">Mark Withdrawn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

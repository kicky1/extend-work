import { Plus } from 'lucide-react'

export default function QuickActionsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Action chips grid */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-16 bg-[#1a4a4a]/60 rounded-full mb-3" />
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Add skill', color: 'blue' },
              { label: 'Improve summary', color: 'purple' },
              { label: 'Suggest theme', color: 'teal' },
              { label: 'Add achievement', color: 'amber' },
              { label: 'Add certificate', color: 'green' },
              { label: 'Add language', color: 'pink' },
            ].map(a => (
              <div
                key={a.label}
                className="p-2 rounded-lg border border-[#e8e4df] bg-white flex items-center gap-1.5 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-md bg-${a.color}-100 flex items-center justify-center shrink-0`}>
                  <Plus className={`w-3 h-3 text-${a.color}-600`} />
                </div>
                <div className="text-[8px] font-medium text-[#1a2a2a]">{a.label}</div>
              </div>
            ))}
          </div>
          {/* Input bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-7 bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1.5 w-24 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-white/60 rotate-45 -ml-0.5" />
            </div>
          </div>
        </div>
        {/* Added entry preview */}
        <div className="w-1/2 p-4 space-y-3">
          <div className="h-2 w-20 bg-[#1a2a2a] rounded-full" />
          {/* New skill added */}
          <div className="p-2 rounded-lg border border-green-200 bg-green-50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="text-[8px] font-semibold text-green-700">Skill added</div>
            </div>
            <div className="flex flex-wrap gap-1">
              <div className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-[#1a4a4a]/10 text-[#1a4a4a]">React</div>
              <div className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-[#1a4a4a]/10 text-[#1a4a4a]">TypeScript</div>
              <div className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-green-100 text-green-700 border border-green-300">Docker</div>
            </div>
          </div>
          {/* New experience entry */}
          <div className="p-2 rounded-lg border border-green-200 bg-green-50">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="text-[8px] font-semibold text-green-700">Experience added</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-24 bg-green-600/25 rounded-full" />
              <div className="h-1 w-16 bg-green-600/15 rounded-full" />
              <div className="h-1 w-full bg-green-600/15 rounded-full" />
              <div className="h-1 w-5/6 bg-green-600/15 rounded-full" />
            </div>
          </div>
          {/* Confirmation buttons */}
          <div className="flex gap-2">
            <div className="flex-1 h-6 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="text-[8px] font-medium text-white">Apply</div>
            </div>
            <div className="flex-1 h-6 rounded-lg border border-[#e8e4df] bg-white flex items-center justify-center">
              <div className="text-[8px] font-medium text-[#5a6a6a]">Discard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

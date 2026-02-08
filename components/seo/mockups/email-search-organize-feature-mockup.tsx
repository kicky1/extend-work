import { Inbox, FileText, Star, Send, Plus, RefreshCw, Trash2, Edit2, Copy } from 'lucide-react'

export default function EmailSearchOrganizeFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-[22%] border-r border-[#e8e4df] flex flex-col py-3 shrink-0">
          {/* Compose button */}
          <div className="px-2 mb-2.5">
            <div className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-[#1a4a4a]">
              <Plus className="w-2.5 h-2.5 text-white" />
              <span className="text-[7px] font-medium text-white">Compose</span>
            </div>
          </div>

          {/* Account selector skeleton */}
          <div className="px-2 mb-2">
            <div className="flex items-center gap-1">
              <div className="flex-1 h-5 rounded border border-[#e8e4df] bg-[#faf9f7] px-1.5 flex items-center">
                <div className="h-1 w-14 bg-[#1a4a4a]/15 rounded-full" />
              </div>
              <Trash2 className="w-2.5 h-2.5 text-[#5a6a6a]/30 shrink-0" />
            </div>
          </div>

          {/* Nav items — Templates active */}
          <nav className="px-1 space-y-0.5 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md">
              <Inbox className="w-2.5 h-2.5 text-[#5a6a6a]" />
              <span className="text-[7px] text-[#5a6a6a]">Inbox</span>
              <span className="ml-auto flex items-center justify-center h-3.5 min-w-3.5 rounded-full bg-[#1a4a4a] px-1 text-[5px] font-bold text-white">34</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1a4a4a]/5">
              <FileText className="w-2.5 h-2.5 text-[#1a4a4a]" />
              <span className="text-[7px] font-medium text-[#1a4a4a]">Templates</span>
            </div>
          </nav>

          {/* Divider */}
          <div className="mx-2 border-t border-[#e8e4df] my-1" />

          {/* Filters */}
          <nav className="px-1 space-y-0.5 flex-1">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md">
              <Inbox className="w-2.5 h-2.5 text-[#5a6a6a]" />
              <span className="text-[7px] text-[#5a6a6a]">Inbox</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md">
              <Send className="w-2.5 h-2.5 text-[#5a6a6a]" />
              <span className="text-[7px] text-[#5a6a6a]">Sent</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md">
              <Star className="w-2.5 h-2.5 text-[#5a6a6a]" />
              <span className="text-[7px] text-[#5a6a6a]">Starred</span>
            </div>
          </nav>

          {/* Sync button */}
          <div className="px-2 pt-2 border-t border-[#e8e4df] mt-1">
            <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-md border border-[#e8e4df]">
              <RefreshCw className="w-2 h-2 text-[#5a6a6a]" />
              <span className="text-[6px] text-[#5a6a6a]">Sync emails</span>
            </div>
          </div>
        </div>

        {/* Main content: templates */}
        <div className="flex-1 p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold text-[#1a2a2a]">Email Templates</span>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#1a4a4a]">
              <Plus className="w-2 h-2 text-white" />
              <span className="text-[6px] font-medium text-white">New Template</span>
            </div>
          </div>

          {/* My Templates section */}
          <div>
            <span className="text-[7px] text-[#5a6a6a] block mb-1.5">My Templates</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { nameW: 'w-16', badgeW: 'w-10', subjectW: 'w-24', uses: 5 },
                { nameW: 'w-20', badgeW: 'w-12', subjectW: 'w-20', uses: 12 },
              ].map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-[#e8e4df] bg-white">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`h-1.5 ${t.nameW} bg-[#1a2a2a]/70 rounded-full`} />
                      <div className={`h-3 ${t.badgeW} rounded-full bg-[#1a4a4a]/10 flex items-center justify-center`}>
                        <div className="h-0.5 w-2/3 bg-[#1a4a4a]/30 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Edit2 className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                      <Trash2 className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                    </div>
                  </div>
                  <div className={`h-1 ${t.subjectW} bg-[#5a6a6a]/20 rounded-full mb-1`} />
                  <span className="text-[6px] text-[#5a6a6a]">Used {t.uses} times</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Application Templates section */}
          <div>
            <span className="text-[7px] text-[#5a6a6a] block mb-0.5">Job Application Templates</span>
            <span className="text-[5px] text-[#5a6a6a]/60 block mb-1.5">Click &quot;Copy&quot; to customize these templates.</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { nameW: 'w-20', badgeW: 'w-12', subjectW: 'w-28' },
                { nameW: 'w-14', badgeW: 'w-10', subjectW: 'w-24' },
                { nameW: 'w-18', badgeW: 'w-10', subjectW: 'w-20' },
                { nameW: 'w-16', badgeW: 'w-14', subjectW: 'w-24' },
              ].map((t, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-dashed border-[#e8e4df] bg-white">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`h-1.5 ${t.nameW} bg-[#1a2a2a]/50 rounded-full`} />
                      <div className={`h-3 ${t.badgeW} rounded-full border border-[#e8e4df] flex items-center justify-center`}>
                        <div className="h-0.5 w-2/3 bg-[#5a6a6a]/20 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 px-1 py-0.5 rounded border border-[#e8e4df] shrink-0">
                      <Copy className="w-2 h-2 text-[#5a6a6a]" />
                      <span className="text-[5px] text-[#5a6a6a]">Copy</span>
                    </div>
                  </div>
                  <div className={`h-1 ${t.subjectW} bg-[#5a6a6a]/15 rounded-full`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

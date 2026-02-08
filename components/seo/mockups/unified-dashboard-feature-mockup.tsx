import { FileText, Briefcase, Mail, CalendarDays, PenLine, Star, Inbox, Send, Plus, RefreshCw, Trash2, Search } from 'lucide-react'

export default function UnifiedDashboardFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      {/* Top navbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#e8e4df] bg-white">
        <span className="text-[9px] font-bold text-[#1a2a2a]">Extend Career</span>
        <nav className="flex items-center gap-3">
          {[
            { icon: FileText, label: 'CV Creator', active: false },
            { icon: PenLine, label: 'Cover Letter', active: false },
            { icon: Briefcase, label: 'Jobs', active: false },
            { icon: Mail, label: 'Emails', active: true },
            { icon: CalendarDays, label: 'Calendar', active: false },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${item.active ? 'bg-[#1a4a4a]/5' : ''}`}>
              <item.icon className={`w-2.5 h-2.5 ${item.active ? 'text-[#1a4a4a]' : 'text-[#5a6a6a]/50'}`} />
              <span className={`text-[6px] ${item.active ? 'font-medium text-[#1a4a4a]' : 'text-[#5a6a6a]/50'}`}>{item.label}</span>
            </div>
          ))}
        </nav>
        {/* Avatar */}
        <div className="w-5 h-5 rounded-full bg-[#1a4a4a]/20" />
      </div>

      {/* Email layout below */}
      <div className="flex" style={{ minHeight: 160 }}>
        {/* Sidebar */}
        <div className="w-[20%] border-r border-[#e8e4df] flex flex-col py-2 shrink-0">
          <div className="px-1.5 mb-2">
            <div className="flex items-center justify-center gap-1 px-1.5 py-1 rounded-md bg-[#1a4a4a]">
              <Plus className="w-2 h-2 text-white" />
              <span className="text-[6px] font-medium text-white">Compose</span>
            </div>
          </div>

          {/* Account selector */}
          <div className="px-1.5 mb-1.5">
            <div className="flex items-center gap-0.5">
              <div className="flex-1 h-4 rounded border border-[#e8e4df] bg-[#faf9f7] px-1 flex items-center">
                <div className="h-0.5 w-10 bg-[#1a4a4a]/15 rounded-full" />
              </div>
              <Trash2 className="w-2 h-2 text-[#5a6a6a]/30 shrink-0" />
            </div>
          </div>

          {/* Nav */}
          <nav className="px-1 space-y-0.5 mb-1.5">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1a4a4a]/5">
              <Inbox className="w-2 h-2 text-[#1a4a4a]" />
              <span className="text-[6px] font-medium text-[#1a4a4a]">Inbox</span>
              <span className="ml-auto flex items-center justify-center h-3 min-w-3 rounded-full bg-[#1a4a4a] px-0.5 text-[5px] font-bold text-white">34</span>
            </div>
          </nav>

          <div className="mx-1.5 border-t border-[#e8e4df] my-1" />

          <nav className="px-1 space-y-0.5 flex-1">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1a4a4a]/5">
              <Inbox className="w-2 h-2 text-[#1a4a4a]" />
              <span className="text-[6px] font-medium text-[#1a4a4a]">Inbox</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md">
              <Send className="w-2 h-2 text-[#5a6a6a]" />
              <span className="text-[6px] text-[#5a6a6a]">Sent</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md">
              <Star className="w-2 h-2 text-[#5a6a6a]" />
              <span className="text-[6px] text-[#5a6a6a]">Starred</span>
            </div>
          </nav>

          <div className="px-1.5 pt-1.5 border-t border-[#e8e4df]">
            <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-md border border-[#e8e4df]">
              <RefreshCw className="w-1.5 h-1.5 text-[#5a6a6a]" />
              <span className="text-[5px] text-[#5a6a6a]">Sync</span>
            </div>
          </div>
        </div>

        {/* Thread list */}
        <div className="w-[35%] border-r border-[#e8e4df] flex flex-col shrink-0">
          {/* Search */}
          <div className="p-1.5 border-b border-[#e8e4df]">
            <div className="h-5 bg-[#faf9f7] rounded border border-[#e8e4df] px-1.5 flex items-center gap-1">
              <Search className="w-2 h-2 text-[#5a6a6a]/40" />
              <span className="text-[6px] text-[#5a6a6a]/40">Search emails...</span>
            </div>
          </div>

          {/* Threads */}
          {[
            { unread: true, starred: true, nameW: 'w-12', subjectW: 'w-20', snippetW: 'w-16' },
            { unread: true, starred: false, nameW: 'w-16', subjectW: 'w-24', snippetW: 'w-20' },
            { unread: false, starred: false, nameW: 'w-10', subjectW: 'w-16', snippetW: 'w-14' },
            { unread: false, starred: true, nameW: 'w-14', subjectW: 'w-20', snippetW: 'w-16' },
            { unread: false, starred: false, nameW: 'w-12', subjectW: 'w-24', snippetW: 'w-12' },
          ].map((t, i) => (
            <div key={i} className={`px-2 py-1.5 border-b border-[#e8e4df]/50 ${t.unread ? 'bg-[#1a4a4a]/[0.02]' : ''}`}>
              <div className="flex items-center gap-1 mb-0.5">
                <Star className={`w-2 h-2 shrink-0 ${t.starred ? 'text-amber-400 fill-amber-400' : 'text-[#5a6a6a]/20'}`} />
                <div className={`h-1 ${t.nameW} rounded-full ${t.unread ? 'bg-[#1a2a2a]' : 'bg-[#1a2a2a]/40'}`} />
                <div className="ml-auto h-0.5 w-5 bg-[#5a6a6a]/20 rounded-full" />
              </div>
              <div className="pl-3">
                <div className={`h-0.5 ${t.subjectW} rounded-full mb-0.5 ${t.unread ? 'bg-[#1a4a4a]/35' : 'bg-[#5a6a6a]/15'}`} />
                <div className={`h-0.5 ${t.snippetW} bg-[#5a6a6a]/10 rounded-full`} />
              </div>
            </div>
          ))}
        </div>

        {/* Detail: empty state */}
        <div className="flex-1 flex items-center justify-center bg-[#faf9f7]">
          <span className="text-[7px] text-[#5a6a6a]/50">Select an email to view</span>
        </div>
      </div>
    </div>
  )
}

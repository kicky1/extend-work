import { Briefcase, CalendarDays } from 'lucide-react'

/* Small hero-style mockups (used in landing floating section) */

export function CVMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-sm translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-sm shadow-lg overflow-hidden border border-[#e8e4df]">
        <div className="h-12 bg-[#1a4a4a] p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20" />
            <div className="flex-1">
              <div className="h-2 w-16 bg-white/40 rounded-full mb-1" />
              <div className="h-1.5 w-12 bg-white/25 rounded-full" />
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2.5">
          <div>
            <div className="h-1.5 w-12 bg-[#1a4a4a]/70 rounded-full mb-1.5" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="h-3 w-8 bg-[#1a4a4a]/15 rounded-full" />
            <div className="h-3 w-10 bg-[#1a4a4a]/15 rounded-full" />
            <div className="h-3 w-7 bg-[#1a4a4a]/15 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function JobsMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-md bg-[#1a4a4a]/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-[#1a4a4a]" />
          </div>
          <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
            92% match
          </div>
        </div>
        <div className="h-2 w-20 bg-[#1a2a2a] rounded-full mb-1" />
        <div className="h-1.5 w-14 bg-[#5a6a6a]/30 rounded-full mb-2" />
        <div className="flex gap-1">
          <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
          <div className="h-2.5 w-12 bg-[#1a4a4a]/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function EmailsMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#1a4a4a]" />
          <div className="flex-1">
            <div className="h-1.5 w-16 bg-[#1a2a2a] rounded-full mb-1" />
            <div className="h-1 w-12 bg-[#5a6a6a]/30 rounded-full" />
          </div>
        </div>
        <div className="space-y-1.5 ml-8">
          <div className="bg-[#1a4a4a]/5 rounded-md p-1.5">
            <div className="h-1 w-full bg-[#1a4a4a]/20 rounded-full mb-0.5" />
            <div className="h-1 w-3/4 bg-[#1a4a4a]/20 rounded-full" />
          </div>
          <div className="bg-[#1a4a4a] rounded-md p-1.5 ml-4">
            <div className="h-1 w-full bg-white/40 rounded-full mb-0.5" />
            <div className="h-1 w-2/3 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-2 w-14 bg-[#1a2a2a] rounded-full" />
          <CalendarDays className="w-4 h-4 text-[#1a4a4a]" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(21)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${
                [4, 9, 15].includes(i)
                  ? 'bg-[#1a4a4a]'
                  : i === 11
                  ? 'bg-green-500'
                  : 'bg-[#1a4a4a]/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Larger feature mockups for marketing pages */

export function CVCreatorFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-16 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="space-y-2 ml-6">
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="space-y-2 ml-6">
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
              <div className="h-14 w-full bg-white rounded border border-[#e8e4df]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-12 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              <div className="h-5 w-14 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-5 w-16 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-5 w-12 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            <div className="h-10 bg-[#1a4a4a] rounded mb-3 p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-16 bg-white/50 rounded-full mb-1" />
                  <div className="h-1 w-12 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-12 bg-[#1a4a4a]/50 rounded-full" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="h-1.5 w-14 bg-[#1a4a4a]/50 rounded-full mt-3" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CVEvaluationFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        <div className="w-2/5 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            <div className="h-8 bg-[#1a4a4a] rounded mb-3 p-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-12 bg-white/50 rounded-full mb-0.5" />
                  <div className="h-1 w-8 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-10 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                  <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-red-400 ml-2 mt-1 shrink-0" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-12 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                  <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-amber-400 ml-2 mt-1 shrink-0" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-8 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-400 ml-2 mt-1 shrink-0" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center">
              <span className="text-lg font-bold text-[#1a2a2a]">87</span>
            </div>
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-16 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-green-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-10 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-amber-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-14 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-green-400 rounded-full" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700">Critical</div>
                  <div className="h-1.5 w-20 bg-[#1a4a4a]/30 rounded-full" />
                </div>
                <div className="px-2 py-0.5 rounded bg-[#1a4a4a] text-white text-[8px] font-medium">Fix</div>
              </div>
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-amber-100 text-amber-700">Warning</div>
                  <div className="h-1.5 w-24 bg-[#1a4a4a]/30 rounded-full" />
                </div>
                <div className="px-2 py-0.5 rounded bg-[#1a4a4a] text-white text-[8px] font-medium">Fix</div>
              </div>
              <div className="h-1 w-3/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function JobsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        <div className="w-1/4 p-3 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-12 bg-[#1a4a4a]/40 rounded-full mb-3" />
          <div className="space-y-2">
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
          </div>
          <div className="h-2 w-10 bg-[#1a4a4a]/40 rounded-full mb-2 mt-4" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#1a4a4a]/10" />
              <div className="h-1.5 w-12 bg-[#1a4a4a]/20 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#1a4a4a]/10" />
              <div className="h-1.5 w-14 bg-[#1a4a4a]/20 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { color: 'blue', pct: '94%' },
              { color: 'purple', pct: '89%' },
              { color: 'amber', pct: '76%' },
              { color: 'teal', pct: '92%' },
            ].map((job, i) => (
              <div key={i} className="p-3 rounded-lg border border-[#e8e4df] bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-${job.color}-100 flex items-center justify-center`}>
                    <Briefcase className={`w-4 h-4 text-${job.color}-600`} />
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    Number.parseInt(job.pct) >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {job.pct}
                  </div>
                </div>
                <div className="h-2 w-20 bg-[#1a2a2a] rounded-full mb-1" />
                <div className="h-1.5 w-14 bg-[#5a6a6a]/30 rounded-full mb-2" />
                <div className="flex gap-1">
                  <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
                  <div className="h-2.5 w-12 bg-[#1a4a4a]/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function JobDetailFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Job detail */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="h-2.5 w-28 bg-[#1a2a2a] rounded-full mb-1" />
                <div className="h-1.5 w-20 bg-[#5a6a6a]/30 rounded-full" />
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
              94% match
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <div className="px-2 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[8px] font-medium text-[#1a4a4a]">Remote</div>
            <div className="px-2 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[8px] font-medium text-[#1a4a4a]">Full-time</div>
            <div className="px-2 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[8px] font-medium text-[#1a4a4a]">$120k–$160k</div>
          </div>
          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-1.5 w-16 bg-[#1a4a4a]/50 rounded-full" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
          {/* Skills match */}
          <div className="mb-3">
            <div className="h-1.5 w-20 bg-[#1a4a4a]/50 rounded-full mb-2" />
            <div className="flex flex-wrap gap-1">
              <div className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-green-100 text-green-700">React</div>
              <div className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-green-100 text-green-700">TypeScript</div>
              <div className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-green-100 text-green-700">Node.js</div>
              <div className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-amber-100 text-amber-700">AWS</div>
              <div className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-red-100 text-red-700">Go</div>
            </div>
          </div>
        </div>
        {/* Actions sidebar */}
        <div className="w-2/5 p-4 border-l border-[#e8e4df] bg-[#faf9f7]">
          <div className="space-y-2">
            <div className="h-7 w-full rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="h-1.5 w-16 bg-white/50 rounded-full" />
            </div>
            <div className="h-7 w-full rounded-lg border border-[#e8e4df] bg-white flex items-center justify-center">
              <div className="h-1.5 w-20 bg-[#1a4a4a]/30 rounded-full" />
            </div>
            <div className="h-7 w-full rounded-lg border border-[#e8e4df] bg-white flex items-center justify-center">
              <div className="h-1.5 w-14 bg-[#1a4a4a]/30 rounded-full" />
            </div>
          </div>
          {/* Match breakdown */}
          <div className="mt-4">
            <div className="h-1.5 w-16 bg-[#1a4a4a]/50 rounded-full mb-2" />
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="h-1 w-10 bg-[#1a4a4a]/30 rounded-full" />
                  <div className="h-1 w-4 bg-[#1a4a4a]/20 rounded-full" />
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-green-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="h-1 w-12 bg-[#1a4a4a]/30 rounded-full" />
                  <div className="h-1 w-4 bg-[#1a4a4a]/20 rounded-full" />
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-green-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="h-1 w-14 bg-[#1a4a4a]/30 rounded-full" />
                  <div className="h-1 w-4 bg-[#1a4a4a]/20 rounded-full" />
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmailComposeFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Compose form */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e8e4df]">
            <div className="h-2.5 w-20 bg-[#1a2a2a] rounded-full" />
            <div className="flex gap-1.5">
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
            </div>
          </div>
          {/* To / Subject fields */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-4 bg-[#5a6a6a]/30 rounded-full" />
              <div className="flex-1 h-6 bg-[#faf9f7] rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="px-1.5 py-0.5 rounded bg-[#1a4a4a]/10 text-[7px] text-[#1a4a4a] font-medium">recruiter@company.com</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-6 bg-[#5a6a6a]/30 rounded-full" />
              <div className="flex-1 h-6 bg-[#faf9f7] rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="h-1.5 w-32 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="space-y-1.5 mb-4">
            <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-3/4 bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
            <div className="h-1 w-1/3 bg-[#1a4a4a]/10 rounded-full" />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="h-7 px-4 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="h-1.5 w-8 bg-white/50 rounded-full" />
            </div>
            <div className="w-7 h-7 rounded-lg border border-[#e8e4df] bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded bg-[#1a4a4a]/15" />
            </div>
          </div>
        </div>
        {/* Templates sidebar */}
        <div className="w-2/5 p-4 border-l border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-14 bg-[#1a4a4a]/60 rounded-full mb-3" />
          <div className="space-y-2">
            {['Follow up', 'Thank you', 'Schedule call', 'Accept offer'].map((t) => (
              <div key={t} className="p-2 rounded-lg bg-white border border-[#e8e4df] cursor-pointer">
                <div className="text-[8px] font-semibold text-[#1a2a2a] mb-0.5">{t}</div>
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full mb-0.5" />
                <div className="h-1 w-3/4 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmailsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        <div className="w-2/5 border-r border-[#e8e4df]">
          <div className="p-3 bg-[#1a4a4a]/5 border-l-2 border-[#1a4a4a]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#1a4a4a]" />
              <div className="flex-1">
                <div className="h-1.5 w-20 bg-[#1a2a2a] rounded-full" />
              </div>
              <div className="h-1 w-8 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-32 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-1 w-24 bg-[#5a6a6a]/20 rounded-full" />
            </div>
          </div>
          <div className="p-3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-purple-200" />
              <div className="flex-1">
                <div className="h-1.5 w-16 bg-[#1a2a2a]/60 rounded-full" />
              </div>
              <div className="h-1 w-6 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-28 bg-[#5a6a6a]/30 rounded-full mb-1" />
              <div className="h-1 w-20 bg-[#5a6a6a]/15 rounded-full" />
            </div>
          </div>
          <div className="p-3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-amber-200" />
              <div className="flex-1">
                <div className="h-1.5 w-24 bg-[#1a2a2a]/60 rounded-full" />
              </div>
              <div className="h-1 w-10 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-24 bg-[#5a6a6a]/30 rounded-full mb-1" />
              <div className="h-1 w-16 bg-[#5a6a6a]/15 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 bg-[#faf9f7]">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#e8e4df]">
            <div className="w-10 h-10 rounded-full bg-[#1a4a4a]" />
            <div className="flex-1">
              <div className="h-2 w-24 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-32 bg-[#5a6a6a]/30 rounded-full" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-[#e8e4df]">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-[#1a4a4a]/15 rounded-full" />
                <div className="h-1.5 w-5/6 bg-[#1a4a4a]/15 rounded-full" />
                <div className="h-1.5 w-4/5 bg-[#1a4a4a]/15 rounded-full" />
              </div>
            </div>
            <div className="bg-[#1a4a4a] rounded-lg p-3 ml-8">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/40 rounded-full" />
                <div className="h-1.5 w-3/4 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ThemeCustomizerFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Theme panel */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7] space-y-4">
          {/* Color swatches */}
          <div>
            <div className="h-2 w-12 bg-[#1a4a4a]/60 rounded-full mb-2" />
            <div className="grid grid-cols-6 gap-1.5">
              {['#1a4a4a', '#2563eb', '#7c3aed', '#dc2626', '#059669', '#d97706', '#64748b', '#be185d', '#0891b2', '#4f46e5', '#ca8a04', '#0d9488'].map((c) => (
                <div
                  key={c}
                  className="w-5 h-5 rounded-full border border-black/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          {/* Layout toggles */}
          <div>
            <div className="h-2 w-10 bg-[#1a4a4a]/60 rounded-full mb-2" />
            <div className="flex gap-2">
              <div className="w-10 h-12 rounded border-2 border-[#1a4a4a] bg-white p-1">
                <div className="h-full w-full space-y-0.5">
                  <div className="h-1 w-full bg-[#1a4a4a]/30 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                </div>
              </div>
              <div className="w-10 h-12 rounded border border-[#e8e4df] bg-white p-1">
                <div className="flex h-full gap-0.5">
                  <div className="w-1/3 bg-[#1a4a4a]/10 rounded-sm" />
                  <div className="flex-1 space-y-0.5">
                    <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                    <div className="h-1 w-full bg-[#1a4a4a]/15 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Typography */}
          <div>
            <div className="h-2 w-16 bg-[#1a4a4a]/60 rounded-full mb-2" />
            <div className="space-y-1.5">
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] flex items-center px-2">
                <div className="h-1.5 w-14 bg-[#1a4a4a]/25 rounded-full" />
              </div>
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] flex items-center px-2">
                <div className="h-1.5 w-10 bg-[#1a4a4a]/25 rounded-full" />
              </div>
            </div>
          </div>
          {/* Spacing / bullet style */}
          <div>
            <div className="h-2 w-14 bg-[#1a4a4a]/60 rounded-full mb-2" />
            <div className="flex gap-2">
              {['S', 'M', 'L'].map((s) => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded flex items-center justify-center text-[9px] font-semibold ${
                    s === 'M' ? 'bg-[#1a4a4a] text-white' : 'bg-white border border-[#e8e4df] text-[#5a6a6a]'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CV preview */}
        <div className="w-1/2 p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            <div className="h-10 rounded mb-3 p-2" style={{ backgroundColor: '#2563eb' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-16 bg-white/50 rounded-full mb-1" />
                  <div className="h-1 w-12 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-12 bg-[#2563eb]/50 rounded-full" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="h-1.5 w-14 bg-[#2563eb]/50 rounded-full mt-3" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <div className="h-3 w-8 bg-[#2563eb]/15 rounded-full" />
                <div className="h-3 w-10 bg-[#2563eb]/15 rounded-full" />
                <div className="h-3 w-7 bg-[#2563eb]/15 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AIAssistantFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* CV preview */}
        <div className="w-1/2 p-4 bg-[#f5f4f2] border-r border-[#e8e4df]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            <div className="h-10 bg-[#1a4a4a] rounded mb-3 p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-16 bg-white/50 rounded-full mb-1" />
                  <div className="h-1 w-12 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-12 bg-[#1a4a4a]/50 rounded-full" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              {/* Highlighted updated section */}
              <div className="p-1.5 rounded bg-green-50 border border-green-200">
                <div className="h-1.5 w-10 bg-[#1a4a4a]/50 rounded-full mb-1" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-green-400/40 rounded-full" />
                  <div className="h-1 w-4/5 bg-green-400/40 rounded-full" />
                  <div className="h-1 w-full bg-green-400/40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chat panel */}
        <div className="w-1/2 p-4 bg-[#faf9f7] flex flex-col">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4df]">
            <div className="w-6 h-6 rounded-full bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="h-2 w-16 bg-[#1a4a4a]/60 rounded-full" />
          </div>
          <div className="flex-1 space-y-2.5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[80%]">
                <div className="h-1 w-24 bg-white/40 rounded-full mb-0.5" />
                <div className="h-1 w-16 bg-white/30 rounded-full" />
              </div>
            </div>
            {/* AI message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="h-1 w-28 bg-[#1a4a4a]/20 rounded-full mb-0.5" />
                <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full mb-0.5" />
                <div className="h-1 w-24 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
            {/* AI message with action */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="h-1 w-20 bg-[#1a4a4a]/20 rounded-full mb-1.5" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="h-1 w-16 bg-green-600/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Quick action chips */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#e8e4df]">
            {['Add skill', 'Improve summary', 'Suggest theme', 'Add achievement'].map((a) => (
              <div
                key={a}
                className="px-2 py-1 rounded-full bg-[#1a4a4a]/5 border border-[#1a4a4a]/15 text-[8px] font-medium text-[#1a4a4a]"
              >
                {a}
              </div>
            ))}
          </div>
          {/* Input bar */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-7 bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1.5 w-20 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-white/60 rotate-45 -ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CoverLetterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Rich text editor */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          {/* Toolbar */}
          <div className="flex items-center gap-1 mb-3 pb-2 border-b border-[#e8e4df]">
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10 flex items-center justify-center text-[8px] font-bold text-[#1a4a4a]">B</div>
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10 flex items-center justify-center text-[8px] italic text-[#1a4a4a]">I</div>
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10 flex items-center justify-center text-[8px] underline text-[#1a4a4a]">U</div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
          </div>
          {/* Text content */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="h-1.5 w-20 bg-[#1a4a4a]/40 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-16 bg-[#1a4a4a]/40 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-3/4 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-2/3 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-1/3 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
        {/* Letter preview */}
        <div className="w-1/2 p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-4 aspect-[8.5/11]">
            {/* Date & address */}
            <div className="space-y-1 mb-4">
              <div className="h-1 w-14 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-1 w-20 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-1 w-16 bg-[#1a4a4a]/20 rounded-full" />
            </div>
            {/* Greeting */}
            <div className="h-1.5 w-24 bg-[#1a4a4a]/40 rounded-full mb-3" />
            {/* Body paragraphs */}
            <div className="space-y-2.5">
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-3/4 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-2/3 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
            {/* Signature */}
            <div className="mt-4 space-y-1">
              <div className="h-1 w-12 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-1.5 w-20 bg-[#1a4a4a]/40 rounded-full" />
            </div>
          </div>
          {/* Export buttons */}
          <div className="flex gap-2 mt-3">
            <div className="flex-1 h-6 rounded bg-[#1a4a4a] flex items-center justify-center">
              <div className="h-1.5 w-8 bg-white/50 rounded-full" />
            </div>
            <div className="flex-1 h-6 rounded border border-[#e8e4df] bg-white flex items-center justify-center">
              <div className="h-1.5 w-10 bg-[#1a4a4a]/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CoverLetterAIFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* AI chat panel */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7] flex flex-col">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4df]">
            <div className="w-6 h-6 rounded-full bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full" />
          </div>
          <div className="flex-1 space-y-2.5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[80%]">
                <div className="h-1 w-28 bg-white/40 rounded-full mb-0.5" />
                <div className="h-1 w-20 bg-white/30 rounded-full" />
              </div>
            </div>
            {/* AI message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="h-1 w-24 bg-[#1a4a4a]/20 rounded-full mb-0.5" />
                <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full mb-0.5" />
                <div className="h-1 w-28 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
            {/* AI action */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="h-1 w-20 bg-green-600/30 rounded-full" />
                </div>
                <div className="h-1 w-24 bg-[#1a4a4a]/15 rounded-full" />
              </div>
            </div>
          </div>
          {/* Context pills */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-[#e8e4df]">
            <div className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[8px] font-medium text-blue-700">CV loaded</div>
            <div className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[8px] font-medium text-purple-700">Job: Sr. Engineer</div>
          </div>
          {/* Input */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-7 bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1.5 w-24 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-white/60 rotate-45 -ml-0.5" />
            </div>
          </div>
        </div>
        {/* Letter preview updating */}
        <div className="w-1/2 p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-4 aspect-[8.5/11]">
            <div className="space-y-1 mb-4">
              <div className="h-1 w-14 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-1 w-20 bg-[#1a4a4a]/20 rounded-full" />
            </div>
            <div className="h-1.5 w-24 bg-[#1a4a4a]/40 rounded-full mb-3" />
            <div className="space-y-2.5">
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              {/* Highlighted AI-updated paragraph */}
              <div className="p-1.5 rounded bg-green-50 border border-green-200">
                <div className="space-y-1">
                  <div className="h-1 w-full bg-green-400/40 rounded-full" />
                  <div className="h-1 w-full bg-green-400/40 rounded-full" />
                  <div className="h-1 w-full bg-green-400/40 rounded-full" />
                  <div className="h-1 w-3/4 bg-green-400/40 rounded-full" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-2/3 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="h-1 w-12 bg-[#1a4a4a]/20 rounded-full" />
              <div className="h-1.5 w-20 bg-[#1a4a4a]/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InterviewScheduleFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Schedule form */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7] space-y-3">
          <div className="h-2.5 w-24 bg-[#1a2a2a] rounded-full" />
          {/* Type selector */}
          <div>
            <div className="h-1.5 w-10 bg-[#1a4a4a]/40 rounded-full mb-1.5" />
            <div className="flex gap-1.5">
              {['Phone', 'Video', 'On-site'].map((t) => (
                <div
                  key={t}
                  className={`px-2 py-1 rounded-lg text-[8px] font-medium ${
                    t === 'Video' ? 'bg-[#1a4a4a] text-white' : 'bg-white border border-[#e8e4df] text-[#5a6a6a]'
                  }`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          {/* Date / Time / Duration */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="h-1.5 w-6 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="h-1.5 w-12 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
            <div>
              <div className="h-1.5 w-6 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="h-1.5 w-10 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="h-1.5 w-10 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="h-1.5 w-8 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
            <div>
              <div className="h-1.5 w-12 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df] px-2 flex items-center">
                <div className="h-1.5 w-14 bg-[#1a4a4a]/20 rounded-full" />
              </div>
            </div>
          </div>
          {/* Meeting link */}
          <div>
            <div className="h-1.5 w-14 bg-[#1a4a4a]/40 rounded-full mb-1" />
            <div className="h-6 w-full bg-white rounded border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1.5 w-28 bg-blue-400/30 rounded-full" />
            </div>
          </div>
          {/* Notes */}
          <div>
            <div className="h-1.5 w-8 bg-[#1a4a4a]/40 rounded-full mb-1" />
            <div className="h-10 w-full bg-white rounded border border-[#e8e4df]" />
          </div>
        </div>
        {/* Interview detail / actions */}
        <div className="w-1/2 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-2 w-20 bg-[#1a2a2a] rounded-full" />
            <div className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[8px] font-medium">Video</div>
          </div>
          <div className="flex items-center gap-2 text-[8px] text-[#5a6a6a]">
            <CalendarDays className="w-3 h-3 text-[#5a6a6a]/50" />
            <div className="h-1.5 w-28 bg-[#5a6a6a]/20 rounded-full" />
          </div>
          {/* Interviewer */}
          <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-200" />
              <div>
                <div className="h-1.5 w-16 bg-[#1a2a2a] rounded-full mb-0.5" />
                <div className="h-1 w-20 bg-[#5a6a6a]/20 rounded-full" />
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="space-y-1.5">
            {['View process', 'Record outcome', 'Reschedule', 'Cancel'].map((a, i) => (
              <div
                key={a}
                className={`h-6 w-full rounded-lg flex items-center justify-center text-[8px] font-medium ${
                  i === 0
                    ? 'bg-[#1a4a4a] text-white'
                    : i === 3
                    ? 'border border-red-200 text-red-600 bg-red-50'
                    : 'border border-[#e8e4df] bg-white text-[#1a4a4a]'
                }`}
              >
                {a}
              </div>
            ))}
          </div>
          {/* Outcome badges */}
          <div className="flex gap-1.5 pt-1">
            <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[7px] font-medium">Accepted</div>
            <div className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[7px] font-medium">Rejected</div>
            <div className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[7px] font-medium">Withdrawn</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarAIAssistantFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Mini calendar */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#f5f4f2]">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2 w-16 bg-[#1a2a2a] rounded-full" />
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="h-3 flex items-center justify-center text-[6px] text-[#5a6a6a]/50 font-medium">{d}</div>
            ))}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
              const hasEvent = [3, 10, 17, 22].includes(day)
              const isNew = day === 14
              return (
                <div
                  key={day}
                  className={`h-5 flex flex-col items-center justify-center rounded text-[7px] relative ${
                    isNew ? 'bg-green-500 text-white font-medium' : hasEvent ? 'bg-[#1a4a4a] text-white' : 'text-[#1a2a2a]'
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>
          {/* Upcoming interviews */}
          <div className="mt-3">
            <div className="h-1.5 w-20 bg-[#1a4a4a]/50 rounded-full mb-2" />
            <div className="space-y-1.5">
              {[
                { color: 'blue', label: 'Phone screen' },
                { color: 'purple', label: 'Technical' },
                { color: 'green', label: 'New — added by AI' },
              ].map((ev) => (
                <div key={ev.label} className="flex items-center gap-1.5 p-1.5 rounded bg-white border border-[#e8e4df]">
                  <div className={`w-1 h-4 rounded-full bg-${ev.color}-500`} />
                  <div className="flex-1">
                    <div className="text-[7px] font-medium text-[#1a2a2a]">{ev.label}</div>
                    <div className="h-1 w-12 bg-[#5a6a6a]/15 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* AI chat */}
        <div className="w-1/2 p-4 bg-[#faf9f7] flex flex-col">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4df]">
            <div className="w-6 h-6 rounded-full bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full" />
          </div>
          <div className="flex-1 space-y-2">
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[82%]">
                <div className="h-1 w-28 bg-white/40 rounded-full mb-0.5" />
                <div className="h-1 w-16 bg-white/30 rounded-full" />
              </div>
            </div>
            {/* AI */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="h-1 w-24 bg-[#1a4a4a]/20 rounded-full mb-0.5" />
                <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full mb-1.5" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="h-1 w-24 bg-green-600/30 rounded-full" />
                </div>
              </div>
            </div>
            {/* User */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[82%]">
                <div className="h-1 w-20 bg-white/40 rounded-full" />
              </div>
            </div>
            {/* AI */}
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="h-1 w-20 bg-amber-600/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-7 bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1.5 w-24 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-white/60 rotate-45 -ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-2.5 w-20 bg-[#1a2a2a] rounded-full" />
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="h-4 flex items-center justify-center">
                <span className="text-[8px] text-[#5a6a6a]/60 font-medium">{day}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[28, 29, 30].map((day) => (
              <div key={`prev-${day}`} className="h-6 flex items-center justify-center rounded text-[8px] text-[#5a6a6a]/30">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
              const hasInterview = [5, 12, 18, 24].includes(day)
              const isToday = day === 15
              return (
                <div
                  key={day}
                  className={`h-6 flex flex-col items-center justify-center rounded text-[8px] relative ${
                    isToday ? 'bg-[#1a4a4a] text-white font-medium' : 'text-[#1a2a2a]'
                  }`}
                >
                  {day}
                  {hasInterview && (
                    <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                      day === 5 ? 'bg-green-500' : day === 12 ? 'bg-blue-500' : day === 18 ? 'bg-purple-500' : 'bg-amber-500'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-2/5 p-4 border-l border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full mb-3" />
          <div className="space-y-2">
            {[
              { color: 'green' },
              { color: 'blue' },
              { color: 'purple' },
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-white border border-[#e8e4df] shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-1.5 h-6 rounded-full bg-${item.color}-500`} />
                  <div className="flex-1">
                    <div className="h-1.5 w-20 bg-[#1a2a2a] rounded-full mb-1" />
                    <div className="h-1 w-14 bg-[#5a6a6a]/30 rounded-full" />
                  </div>
                </div>
                <div className="ml-3.5 flex items-center gap-1.5">
                  <CalendarDays className="w-2.5 h-2.5 text-[#5a6a6a]/50" />
                  <div className="h-1 w-16 bg-[#5a6a6a]/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

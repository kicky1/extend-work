import { memo } from 'react'

export default memo(function JobMatchScoringFeatureMockup() {
  return (
    <div className="rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Match circle + breakdown bars */}
        <div className="sm:w-1/2 p-4 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#faf9f7] space-y-4">
          {/* Match percentage */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border-[5px] border-amber-400 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#1a2a2a]">73</span>
              <span className="text-[6px] text-[#5a6a6a] -mt-0.5">Job Match</span>
            </div>
          </div>
          {/* Breakdown bars */}
          <div className="space-y-2">
            {[
              { label: 'Skills match', pct: 85, color: 'bg-green-400' },
              { label: 'Experience', pct: 70, color: 'bg-amber-400' },
              { label: 'Education', pct: 90, color: 'bg-green-400' },
              { label: 'Keywords', pct: 55, color: 'bg-red-400' },
            ].map(bar => (
              <div key={bar.label}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[7px] font-medium text-[#1a4a4a]">{bar.label}</span>
                  <span className="text-[7px] text-[#5a6a6a]">{bar.pct}%</span>
                </div>
                <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Missing skills + fixes */}
        <div className="sm:w-1/2 p-4 space-y-3">
          <div className="text-[8px] font-semibold text-[#1a2a2a]">Missing qualifications</div>
          {/* Matched skills */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="text-[7px] font-medium text-[#5a6a6a]">Matched</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['React', 'TypeScript', 'Node.js', 'Git'].map(s => (
                <div key={s} className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-green-100 text-green-700">{s}</div>
              ))}
            </div>
          </div>
          {/* Missing skills */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="text-[7px] font-medium text-[#5a6a6a]">Missing</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['AWS', 'Docker', 'Kubernetes'].map(s => (
                <div key={s} className="px-1.5 py-0.5 rounded text-[7px] font-medium bg-red-100 text-red-700">{s}</div>
              ))}
            </div>
          </div>
          {/* Suggested fix */}
          <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex items-center gap-1 mb-1">
              <div className="px-1.5 py-0.5 rounded text-[7px] font-semibold bg-blue-100 text-blue-700">Suggestion</div>
            </div>
            <div className="space-y-0.5 mb-1.5">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="h-5 w-16 rounded bg-[#1a4a4a] flex items-center justify-center">
              <div className="text-[7px] font-medium text-white">Fix</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

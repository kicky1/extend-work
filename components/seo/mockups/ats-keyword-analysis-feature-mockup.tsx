import { Search } from 'lucide-react'

export default function ATSKeywordAnalysisFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* ATS score + breakdown */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7] space-y-4">
          {/* ATS score ring */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full border-4 border-green-400 flex flex-col items-center justify-center shrink-0">
              <span className="text-base font-bold text-[#1a2a2a]">84</span>
              <span className="text-[5px] text-[#5a6a6a] -mt-0.5">ATS</span>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="text-[7px] font-medium text-[#1a4a4a]">Formatting</div>
                  <div className="text-[7px] text-[#5a6a6a]">95%</div>
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-green-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="text-[7px] font-medium text-[#1a4a4a]">Keywords</div>
                  <div className="text-[7px] text-[#5a6a6a]">72%</div>
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-amber-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <div className="text-[7px] font-medium text-[#1a4a4a]">Structure</div>
                  <div className="text-[7px] text-[#5a6a6a]">90%</div>
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-green-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Job description input */}
          <div className="p-2 rounded-lg border border-[#e8e4df] bg-white">
            <div className="flex items-center gap-1.5 mb-1">
              <Search className="w-3 h-3 text-[#5a6a6a]/50" />
              <div className="text-[7px] font-medium text-[#5a6a6a]">Paste job description for targeted scoring</div>
            </div>
            <div className="h-8 w-full bg-[#faf9f7] rounded border border-dashed border-[#e8e4df]" />
          </div>
        </div>
        {/* Keywords found + suggested */}
        <div className="w-1/2 p-4 space-y-3">
          {/* Found keywords */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="text-[8px] font-semibold text-[#1a2a2a]">Found keywords</div>
              <div className="ml-auto text-[7px] text-[#5a6a6a]">12 found</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['JavaScript', 'React', 'Node.js', 'Git', 'REST API', 'Agile', 'SQL', 'CSS'].map(k => (
                <div key={k} className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-green-100 text-green-700">{k}</div>
              ))}
            </div>
          </div>
          {/* Suggested keywords */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="text-[8px] font-semibold text-[#1a2a2a]">Suggested additions</div>
              <div className="ml-auto text-[7px] text-[#5a6a6a]">5 missing</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'GraphQL'].map(k => (
                <div key={k} className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-amber-100 text-amber-700 border border-amber-200 border-dashed">{k}</div>
              ))}
            </div>
          </div>
          {/* Density warning */}
          <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex items-center gap-1 mb-1">
              <div className="px-1.5 py-0.5 rounded text-[7px] font-semibold bg-blue-100 text-blue-700">Tip</div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

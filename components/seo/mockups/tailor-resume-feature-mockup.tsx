import { FileText } from 'lucide-react'

export default function TailorResumeFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Mini CV */}
        <div className="w-2/5 p-4 border-r border-[#e8e4df] bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            <div className="h-8 bg-[#1a4a4a] rounded mb-2 p-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-12 bg-white/50 rounded-full mb-0.5" />
                  <div className="h-1 w-8 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-10 bg-[#1a4a4a]/50 rounded-full" />
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              {/* Highlighted keyword matches */}
              <div className="p-1 rounded bg-green-50 border border-green-200">
                <div className="space-y-0.5">
                  <div className="h-1 w-full bg-green-400/30 rounded-full" />
                  <div className="h-1 w-4/5 bg-green-400/30 rounded-full" />
                </div>
              </div>
              <div className="h-1.5 w-8 bg-[#1a4a4a]/50 rounded-full" />
              <div className="flex flex-wrap gap-0.5">
                <div className="h-2.5 w-8 bg-green-100 rounded-full" />
                <div className="h-2.5 w-10 bg-green-100 rounded-full" />
                <div className="h-2.5 w-7 bg-amber-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        {/* Keywords + ATS score */}
        <div className="flex-1 p-4 space-y-4">
          {/* ATS score ring */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-green-400 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-[#1a2a2a]">92</span>
              <span className="text-[6px] text-[#5a6a6a] -mt-0.5">ATS Score</span>
            </div>
          </div>
          {/* Found keywords */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="text-[8px] font-semibold text-[#1a2a2a]">Found keywords</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['React', 'TypeScript', 'Node.js', 'REST API', 'Agile'].map(k => (
                <div key={k} className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-green-100 text-green-700">{k}</div>
              ))}
            </div>
          </div>
          {/* Suggested keywords */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="text-[8px] font-semibold text-[#1a2a2a]">Suggested additions</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {['CI/CD', 'Docker', 'AWS'].map(k => (
                <div key={k} className="px-1.5 py-0.5 rounded-full text-[7px] font-medium bg-amber-100 text-amber-700 border border-amber-200 border-dashed">{k}</div>
              ))}
            </div>
          </div>
          {/* Job description input */}
          <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex items-center gap-1.5 mb-1">
              <FileText className="w-3 h-3 text-[#5a6a6a]/50" />
              <div className="text-[7px] font-medium text-[#5a6a6a]">Job description loaded</div>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-[#1a4a4a]/8 rounded-full" />
              <div className="h-1 w-3/4 bg-[#1a4a4a]/8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

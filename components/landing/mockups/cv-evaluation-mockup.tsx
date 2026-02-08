import { memo } from 'react'
import { Wand2, Download, AlertCircle, AlertTriangle } from 'lucide-react'
import { MockupTopBar } from '../mockup-top-bar'
import { CVPreviewMockup } from '../cv-preview-mockup'

export const CVEvaluationFeatureMockup = memo(function CVEvaluationFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        rightContent={
          <>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
              <Wand2 className="w-2 h-2" />
              Fix All
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#e8e4df] bg-white text-[6px] text-[#5a6a6a] whitespace-nowrap">
              <Download className="w-2 h-2" />
              Export
            </div>
          </>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Mini CV preview */}
        <div className="sm:w-1/2 p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#f5f4f2]">
          <div className="relative">
            <CVPreviewMockup />
          </div>
        </div>
        {/* Right: Evaluation panel */}
        <div className="sm:w-1/2 p-3 sm:p-4">
          {/* Overall score + ATS score row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-emerald-500 bg-emerald-50 flex flex-col items-center justify-center shrink-0">
              <span className="text-sm font-bold text-emerald-700">87</span>
              <span className="text-[6px] text-emerald-600">Very Good</span>
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[7px] text-[#5a6a6a]">ATS Score</span>
                  <span className="text-[7px] font-medium text-emerald-700">92</span>
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-emerald-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[7px] text-[#5a6a6a]">Keyword Score</span>
                  <span className="text-[7px] font-medium text-amber-700">72</span>
                </div>
                <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Keyword badges */}
          <div className="mb-3">
            <div className="text-[6px] text-emerald-600 font-medium mb-0.5">Found</div>
            <div className="flex flex-wrap gap-1 mb-1.5">
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3"></div>
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3"></div>
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3"></div>
            </div>
            <div className="text-[6px] text-amber-600 font-medium mb-0.5">Suggested</div>
            <div className="flex flex-wrap gap-1">
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-amber-100 text-amber-700 w-8 h-3"></div>
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-amber-100 text-amber-700 w-8 h-3"></div>
            </div>
          </div>
          {/* Issues */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-semibold text-[#1a2a2a]">Issues (2)</span>
            </div>
            {/* Critical issue */}
            <div className="p-2 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-start gap-1.5">
                <AlertCircle className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="h-1.5 w-24 bg-[#1a2a2a]/40 rounded-full" />
                    <div className="px-1 py-0.5 rounded text-[6px] font-semibold bg-red-100 text-red-700">Critical</div>
                  </div>
                  <div className="h-1 w-4/5 bg-red-900/10 rounded-full mb-1.5" />
                  <div className="flex items-center gap-1 text-[6px] text-[#1a4a4a] font-medium">
                    <Wand2 className="w-2 h-2" />
                    Fix with AI
                  </div>
                </div>
              </div>
            </div>
            {/* Warning issue */}
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="h-1.5 w-28 bg-[#1a2a2a]/40 rounded-full" />
                    <div className="px-1 py-0.5 rounded text-[6px] font-semibold bg-amber-100 text-amber-700">Warning</div>
                  </div>
                  <div className="h-1 w-3/5 bg-amber-900/10 rounded-full mb-1.5" />
                  <div className="flex items-center gap-1 text-[6px] text-[#1a4a4a] font-medium">
                    <Wand2 className="w-2 h-2" />
                    Fix with AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

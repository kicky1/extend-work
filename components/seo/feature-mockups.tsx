import { memo } from 'react'
import { Briefcase, CalendarDays, Video, Phone, Building2, Check, Clock, Sparkles, ChevronLeft, ChevronRight, Download, ChevronDown, Wand2, AlertCircle, AlertTriangle, X, Search, Send, Trash2, Bold, Italic, Strikethrough, List, ListOrdered, Quote, Minus, Pencil, PenLine, Bookmark, ArrowUpDown, SlidersHorizontal, Home, MapPin, ExternalLink, DollarSign, Star, Inbox, FileText, Plus, RefreshCw, Mail, Archive, Reply, Save } from 'lucide-react'
import { MockupTopBar } from '@/components/landing/mockup-top-bar'
import { CVPreviewMockup } from '@/components/landing/cv-preview-mockup'
import { AIFloatButton } from '@/components/landing/ai-float-button'
import { CoverLetterPreviewMockup } from '@/components/landing/cover-letter-preview-mockup'

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

export const CVCreatorFeatureMockup = memo(function CVCreatorFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        leftContent={
          <>
            <div className="px-2 py-1 rounded text-[7px] font-medium bg-[#1a4a4a]/10 text-[#1a4a4a] whitespace-nowrap">Personal Info</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Experience</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Education</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Skills</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Languages</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Certificates</div>
            <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden md:block">Footer</div>
          </>
        }
        rightContent={
          <>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#e8e4df] bg-white text-[6px] text-[#5a6a6a] whitespace-nowrap">
              <Sparkles className="w-2 h-2" />
              Evaluate
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
              <Download className="w-2 h-2" />
              Export
            </div>
          </>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Form editor */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df]">
          <div className="p-3 sm:p-4 space-y-3">
            {/* Personal Information section */}
            <div className="border border-[#e8e4df] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-2.5 py-2 bg-white">
                <span className="text-[8px] font-semibold text-[#1a2a2a]">Personal Information</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a] rotate-180" />
              </div>
              <div className="px-2.5 pb-2.5 space-y-2">
                {/* Profile photo */}
                <div className="flex items-center gap-2 py-1.5 px-2 border border-dashed border-[#e8e4df] rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-[#f5f4f2] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5a6a6a]/20" />
                  </div>
                  <div>
                    <div className="text-[6px] font-medium text-[#1a2a2a]">Add Profile Photo</div>
                    <div className="text-[5px] text-[#5a6a6a]">Optional - appears in header</div>
                  </div>
                </div>
                {/* Full Name */}
                <div>
                  <div className="text-[6px] text-[#5a6a6a] mb-0.5">Full Name *</div>
                  <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                    <div className="h-1 w-16 bg-[#1a2a2a]/40 rounded-full" />
                  </div>
                </div>
                {/* Email + Phone row */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Email *</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/30 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Phone *</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                      <div className="h-1 w-14 bg-[#1a2a2a]/30 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div>
                  <div className="text-[6px] text-[#5a6a6a] mb-0.5">Location *</div>
                  <div className="h-4 rounded border border-[#e8e4df] bg-white px-1.5 flex items-center">
                    <div className="h-1 w-10 bg-[#1a2a2a]/30 rounded-full" />
                  </div>
                </div>
                {/* Website + LinkedIn + GitHub row */}
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">Website</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">LinkedIn</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#5a6a6a] mb-0.5">GitHub</div>
                    <div className="h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                      <div className="h-1 w-full bg-[#1a2a2a]/25 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Professional Summary section */}
            <div className="border border-[#e8e4df] rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-2.5 py-2 bg-white">
                <span className="text-[8px] font-semibold text-[#1a2a2a]">Professional Summary</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a] rotate-180" />
              </div>
              <div className="px-2.5 pb-2.5">
                <div className="text-[6px] text-[#5a6a6a] mb-0.5">Summary</div>
                <div className="h-12 rounded border border-[#e8e4df] bg-white p-1.5">
                  <div className="space-y-0.5">
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-5/6 bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-full bg-[#1a2a2a]/60 rounded-full" />
                    <div className="h-px w-3/4 bg-[#1a2a2a]/60 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Preview panel */}
        <div className="sm:w-1/2 flex flex-col">
          <div className="flex-1 p-3 sm:p-4 bg-[#f5f4f2] relative">
            <CVPreviewMockup />
            <AIFloatButton />
          </div>
        </div>
      </div>
    </div>
  )
})

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
          <CVPreviewMockup />
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
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3" />
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3" />
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-emerald-100 text-emerald-700 w-8 h-3" />
            </div>
            <div className="text-[6px] text-amber-600 font-medium mb-0.5">Suggested</div>
            <div className="flex flex-wrap gap-1">
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-amber-100 text-amber-700 w-8 h-3" />
              <div className="px-1.5 py-0.5 rounded text-[6px] bg-amber-100 text-amber-700 w-8 h-3" />
            </div>
          </div>
          {/* Section scores */}
          <div className="mb-3">
            <div className="text-[7px] font-semibold text-[#1a2a2a] mb-1.5">Section Scores</div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              {[
                { name: 'Personal Info', score: 95, color: 'bg-emerald-400' },
                { name: 'Summary', score: 80, color: 'bg-emerald-400' },
                { name: 'Experience', score: 88, color: 'bg-emerald-400' },
                { name: 'Skills', score: 70, color: 'bg-amber-400' },
              ].map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[6px] text-[#5a6a6a]">{s.name}</span>
                    <span className="text-[6px] font-medium text-[#1a2a2a]">{s.score}</span>
                  </div>
                  <div className="h-1 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
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

export const JobMatchEvaluationFeatureMockup = memo(function JobMatchEvaluationFeatureMockup() {
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
          <CVPreviewMockup />
        </div>
        {/* Right: Job Match evaluation panel */}
        <div className="sm:w-1/2 p-3 sm:p-4">
          {/* Job description input */}
          <div className="mb-3 p-2 rounded-lg border border-dashed border-[#e8e4df] bg-[#faf9f7]">
            <div className="flex items-center gap-1 mb-1">
              <Briefcase className="w-2.5 h-2.5 text-[#5a6a6a]/60" />
              <span className="text-[6px] text-[#5a6a6a]">Job Description</span>
            </div>
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-[#1a4a4a]/8 rounded-full" />
              <div className="h-1 w-3/4 bg-[#1a4a4a]/8 rounded-full" />
            </div>
          </div>
          {/* Overall score */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full border-[3px] border-amber-400 bg-amber-50 flex flex-col items-center justify-center shrink-0">
              <span className="text-sm font-bold text-amber-700">78</span>
              <span className="text-[6px] text-amber-600">Good</span>
            </div>
            <div className="flex-1 space-y-1.5">
              {/* ATS Score */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg border border-[#e8e4df] bg-white">
                <div className="w-7 h-7 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0">
                  <span className="text-[8px] font-bold text-amber-700">72</span>
                </div>
                <div>
                  <div className="text-[6px] font-medium text-[#5a6a6a]">ATS Score</div>
                  <div className="text-[6px] text-amber-600">Needs work</div>
                </div>
              </div>
              {/* Job Match */}
              <div className="flex items-center gap-2 p-1.5 rounded-lg border border-red-200 bg-red-50/50">
                <div className="w-7 h-7 rounded-full border-2 border-red-400 flex items-center justify-center shrink-0">
                  <span className="text-[8px] font-bold text-red-600">0</span>
                </div>
                <div>
                  <div className="text-[6px] font-medium text-[#5a6a6a]">Job Match</div>
                  <div className="text-[6px] text-red-500">Weak match</div>
                </div>
              </div>
            </div>
          </div>
          {/* Keyword Analysis */}
          <div className="mb-3">
            <div className="text-[7px] font-semibold text-[#1a2a2a] mb-1.5">Keyword Analysis</div>
            <div className="mb-2">
              <div className="flex justify-between mb-0.5">
                <span className="text-[6px] text-[#5a6a6a]">Keyword Score</span>
                <span className="text-[6px] font-medium text-amber-700">62</span>
              </div>
              <div className="h-1.5 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-amber-400 rounded-full" />
              </div>
            </div>
            <div className="text-[6px] text-emerald-600 font-medium mb-0.5">Found keywords:</div>
            <div className="flex flex-wrap gap-0.5 mb-1.5">
              {['Architected', 'Led', 'Implemented', 'React'].map(k => (
                <div key={k} className="px-1 py-0.5 rounded text-[5px] bg-emerald-100 text-emerald-700">{k}</div>
              ))}
              <div className="px-1 py-0.5 text-[5px] text-emerald-600">+21</div>
            </div>
            <div className="text-[6px] text-amber-600 font-medium mb-0.5">Suggested keywords:</div>
            <div className="flex flex-wrap gap-0.5">
              {['JavaScript', 'HTML', 'CSS', 'Git', 'REST API'].map(k => (
                <div key={k} className="px-1 py-0.5 rounded text-[5px] bg-amber-100 text-amber-700">{k}</div>
              ))}
              <div className="px-1 py-0.5 text-[5px] text-amber-600">+32</div>
            </div>
          </div>
          {/* Section scores */}
          <div>
            <div className="text-[7px] font-semibold text-[#1a2a2a] mb-1.5">Section Scores</div>
            <div className="space-y-1.5">
              {[
                { name: 'Personal Information', score: 85, color: 'bg-emerald-400' },
                { name: 'Summary', score: 82, color: 'bg-emerald-400' },
                { name: 'Work Experience', score: 70, color: 'bg-amber-400' },
              ].map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[6px] text-[#5a6a6a]">{s.name}</span>
                    <span className="text-[6px] font-medium text-[#1a2a2a]">{s.score}</span>
                  </div>
                  <div className="h-1 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const JobsFeatureMockup = memo(function JobsFeatureMockup() {
  return (
    <div className="rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] bg-white overflow-hidden">
      <MockupTopBar
        leftContent={
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#1a2a2a] whitespace-nowrap">AI Job Recommendations</span>
            <span className="text-[8px] sm:text-[9px] text-[#5a6a6a] whitespace-nowrap">116 jobs matched to your profile</span>
          </div>
        }
        rightContent={
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3 h-3 text-[#5a6a6a]" />
            <span className="text-[8px] text-[#5a6a6a]">Saved</span>
            <span className="text-[7px] bg-[#1a4a4a] text-white px-1 py-0.5 rounded-full leading-none">3</span>
          </div>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left sidebar */}
        <div className="sm:w-[30%] p-3 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#faf9f7] space-y-3">
          {/* Search bar */}
          <div className="h-6 w-full bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center gap-1.5">
            <Search className="w-3 h-3 text-[#5a6a6a]/40" />
            <span className="text-[7px] text-[#5a6a6a]/40"></span>
          </div>
          {/* Sort card */}
          <div className="rounded-md border border-[#e8e4df] bg-white p-2 space-y-1.5">
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-2.5 h-2.5 text-[#1a2a2a]" />
              <span className="text-[7px] font-bold text-[#1a2a2a]">Sort</span>
            </div>
            <div className="flex items-center gap-0.5 px-1.5 py-1 rounded border border-[#e8e4df] bg-white w-full">
              <span className="text-[7px] text-[#1a4a4a] flex-1">Match score</span>
              <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
            </div>
          </div>
          {/* Filters card */}
          <div className="rounded-md border border-[#e8e4df] bg-white p-2 space-y-2.5">
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="w-2.5 h-2.5 text-[#1a2a2a]" />
              <span className="text-[7px] font-bold text-[#1a2a2a]">Filters</span>
            </div>
            {/* Match score */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[7px] font-medium text-[#1a2a2a]">Match score: <span className="text-[#5a6a6a] font-normal">Any</span></span>
              </div>
              <div className="text-[6px] text-[#5a6a6a]">0% or higher</div>
              <div className="h-1 w-full bg-[#e8e4df] rounded-full" />
            </div>
            {/* Salary */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <DollarSign className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Salary</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-2.5 rounded-full bg-[#e8e4df]" />
                <span className="text-[6px] text-[#5a6a6a]">Show only with salary</span>
              </div>
            </div>
            {/* Work type */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Home className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Work type</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-2.5 rounded-full bg-[#e8e4df]" />
                <span className="text-[6px] text-[#5a6a6a]">Remote only</span>
              </div>
            </div>
            {/* Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Location</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                  <span className="text-[6px] text-[#5a6a6a]/40">Filter by location...</span>
                </div>
                <X className="w-2 h-2 text-[#5a6a6a]/50" />
              </div>
            </div>
            {/* Job type */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Briefcase className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Job type</span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-1 rounded border border-[#e8e4df] bg-white w-full">
                <span className="text-[7px] text-[#1a4a4a] flex-1">All</span>
                <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
              </div>
            </div>
          </div>
        </div>
        {/* Right: job cards */}
        <div className="flex-1 p-3">
          <div className="text-[8px] text-[#5a6a6a] mb-2">116 jobs found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'w-20', company: 'w-14', locationW: 'w-12', tags: ['Remote', 'Full-time'], salaryW: 'w-20', match: 94, sourceColor: '#FF6B6B', sourceW: 'w-10', days: 2 },
              { title: 'w-24', company: 'w-12', locationW: 'w-10', tags: ['Hybrid', 'Full-time'], salaryW: null, match: 89, sourceColor: '#00D1B2', sourceW: 'w-8', days: 5 },
              { title: 'w-18', company: 'w-16', locationW: 'w-14', tags: ['Remote', 'Contract'], salaryW: 'w-18', match: 76, sourceColor: '#3C8ED7', sourceW: 'w-12', days: 1 },
              { title: 'w-22', company: 'w-10', locationW: 'w-8', tags: ['On-site', 'Full-time'], salaryW: null, match: 92, sourceColor: '#0066CC', sourceW: 'w-9', days: 7 },
            ].map((job, i) => (
              <div key={i} className="p-2.5 rounded-lg border border-[#e8e4df] bg-white space-y-1.5">
                {/* Header: logo + title/company skeleton + actions */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[18px] h-[18px] rounded-md bg-[#1a4a4a]/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-2.5 h-2.5 text-[#5a6a6a]/60" />
                    </div>
                    <div>
                      <div className={`h-1.5 ${job.title} bg-[#1a2a2a] rounded-full mb-0.5`} />
                      <div className={`h-1 ${job.company} bg-[#5a6a6a]/30 rounded-full`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <PenLine className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                    <Bookmark className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                  </div>
                </div>
                {/* Location + tags */}
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-2 h-2 text-[#5a6a6a]/40" />
                    <div className={`h-1 ${job.locationW} bg-[#5a6a6a]/20 rounded-full`} />
                  </div>
                  {job.tags.map(tag => (
                    <span key={tag} className="px-1 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[6px] text-[#5a6a6a]">{tag}</span>
                  ))}
                </div>
                {/* Salary — always render for consistent height */}
                <div className="min-h-[12px]">
                  {job.salaryW && <div className={`h-1.5 ${job.salaryW} bg-green-200 rounded-full`} />}
                </div>
                {/* Footer: source, match, time */}
                <div className="flex items-center justify-between text-[6px] text-[#5a6a6a]">
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: job.sourceColor }} />
                    <div className={`h-1 ${job.sourceW} bg-[#5a6a6a]/20 rounded-full`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full ${job.match >= 80 ? 'bg-green-100 text-green-600' : job.match >= 60 ? 'bg-yellow-100 text-yellow-600' : 'bg-orange-100 text-orange-600'}`}>
                      <Sparkles className="w-2 h-2" />
                      <span className="font-medium">{job.match}%</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Clock className="w-2 h-2 text-[#5a6a6a]/40" />
                      <span>{job.days}d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-[#e8e4df]">
            <span className="text-[7px] text-[#5a6a6a]/40">Previous</span>
            <span className="text-[7px] text-[#5a6a6a]">Page 1 of 10</span>
            <span className="text-[7px] text-[#1a4a4a] font-medium">Next</span>
            <div className="flex items-center gap-0.5 px-1 py-0.5 rounded border border-[#e8e4df] bg-white ml-1">
              <span className="text-[6px] text-[#1a4a4a]">4</span>
              <ChevronDown className="w-1.5 h-1.5 text-[#5a6a6a]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const JobDetailFeatureMockup = memo(function JobDetailFeatureMockup() {
  return (
    <div className="rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] bg-white overflow-hidden">
      <MockupTopBar
        leftContent={
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-[#1a2a2a] whitespace-nowrap">Saved Jobs</span>
            <span className="text-[8px] sm:text-[9px] text-[#5a6a6a] whitespace-nowrap">3 jobs saved</span>
          </div>
        }
        rightContent={
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#1a4a4a] text-white">
            <Bookmark className="w-2.5 h-2.5 fill-current" />
            <span className="text-[7px] font-medium">Back to Recommendations</span>
          </div>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left sidebar */}
        <div className="sm:w-[30%] p-3 border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-[#faf9f7] space-y-3">
          {/* Search bar */}
          <div className="h-6 w-full bg-white rounded-lg border border-[#e8e4df] px-2 flex items-center gap-1.5">
            <Search className="w-3 h-3 text-[#5a6a6a]/40" />
            <span className="text-[7px] text-[#5a6a6a]/40"></span>
          </div>
          {/* Sort card — saved view uses "Date posted" */}
          <div className="rounded-md border border-[#e8e4df] bg-white p-2 space-y-1.5">
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-2.5 h-2.5 text-[#1a2a2a]" />
              <span className="text-[7px] font-bold text-[#1a2a2a]">Sort</span>
            </div>
            <div className="flex items-center gap-0.5 px-1.5 py-1 rounded border border-[#e8e4df] bg-white w-full">
              <span className="text-[7px] text-[#1a4a4a] flex-1">Date posted</span>
              <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
            </div>
          </div>
          {/* Filters card — no match score in saved view */}
          <div className="rounded-md border border-[#e8e4df] bg-white p-2 space-y-2.5">
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="w-2.5 h-2.5 text-[#1a2a2a]" />
              <span className="text-[7px] font-bold text-[#1a2a2a]">Filters</span>
            </div>
            {/* Salary */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <DollarSign className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Salary</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-2.5 rounded-full bg-[#e8e4df]" />
                <span className="text-[6px] text-[#5a6a6a]">Show only with salary</span>
              </div>
            </div>
            {/* Work type */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Home className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Work type</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-2.5 rounded-full bg-[#e8e4df]" />
                <span className="text-[6px] text-[#5a6a6a]">Remote only</span>
              </div>
            </div>
            {/* Location */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Location</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex-1 h-4 rounded border border-[#e8e4df] bg-white px-1 flex items-center">
                  <span className="text-[6px] text-[#5a6a6a]/40">Filter by location...</span>
                </div>
                <X className="w-2 h-2 text-[#5a6a6a]/50" />
              </div>
            </div>
            {/* Job type */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Briefcase className="w-2.5 h-2.5 text-[#5a6a6a]" />
                <span className="text-[7px] font-medium text-[#1a2a2a]">Job type</span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-1 rounded border border-[#e8e4df] bg-white w-full">
                <span className="text-[7px] text-[#1a4a4a] flex-1">All</span>
                <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
              </div>
            </div>
          </div>
        </div>
        {/* Right: saved job cards */}
        <div className="flex-1 p-3">
          <div className="text-[8px] text-[#5a6a6a] mb-2">3 jobs found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'w-24', company: 'w-16', locationW: 'w-14', tags: ['full-time'], salaryW: 'w-20', sourceColor: '#3C8ED7', sourceW: 'w-8', days: 3 },
              { title: 'w-28', company: 'w-10', locationW: null, tags: ['Remote', 'Full-time'], salaryW: null, sourceColor: '#10B981', sourceW: 'w-9', days: 11 },
              { title: 'w-24', company: 'w-20', locationW: 'w-6', tags: ['Remote', 'Contractor'], salaryW: null, sourceColor: '#10B981', sourceW: 'w-9', days: 14 },
            ].map((job, i) => (
              <div key={i} className="p-2.5 rounded-lg border border-[#e8e4df] bg-white space-y-1.5">
                {/* Header: logo + title/company skeleton + actions */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[18px] h-[18px] rounded-md bg-[#1a4a4a]/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-2.5 h-2.5 text-[#5a6a6a]/60" />
                    </div>
                    <div>
                      <div className={`h-1.5 ${job.title} bg-[#1a2a2a] rounded-full mb-0.5`} />
                      <div className={`h-1 ${job.company} bg-[#5a6a6a]/30 rounded-full`} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <PenLine className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
                    <Bookmark className="w-2.5 h-2.5 text-[#1a2a2a] fill-current" />
                  </div>
                </div>
                {/* Location + tags */}
                <div className="flex items-center gap-1 flex-wrap">
                  {job.locationW && (
                    <div className="flex items-center gap-0.5">
                      <MapPin className="w-2 h-2 text-[#5a6a6a]/40" />
                      <div className={`h-1 ${job.locationW} bg-[#5a6a6a]/20 rounded-full`} />
                    </div>
                  )}
                  {job.tags.map(tag => (
                    <span key={tag} className="px-1 py-0.5 rounded-full bg-[#1a4a4a]/5 text-[6px] text-[#5a6a6a]">{tag}</span>
                  ))}
                </div>
                {/* Salary — always render for consistent height */}
                <div className="min-h-[12px]">
                  {job.salaryW && <div className={`h-1.5 ${job.salaryW} bg-green-200 rounded-full`} />}
                </div>
                {/* Footer: source + time */}
                <div className="flex items-center justify-between text-[6px] text-[#5a6a6a]">
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: job.sourceColor }} />
                    <div className={`h-1 ${job.sourceW} bg-[#5a6a6a]/20 rounded-full`} />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Clock className="w-2 h-2 text-[#5a6a6a]/40" />
                    <span>{job.days}d ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export function EmailComposeFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8e4df]">
        <span className="text-[9px] font-semibold text-[#1a2a2a]">New Message</span>
        <X className="w-3 h-3 text-[#5a6a6a]" />
      </div>

      <div className="p-4 space-y-2.5">
        {/* To field */}
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-[#5a6a6a] w-6 shrink-0">To</span>
          <div className="flex-1 h-6 bg-[#faf9f7] rounded border border-[#e8e4df] px-2 flex items-center">
            <div className="h-1.5 w-28 bg-[#1a4a4a]/15 rounded-full" />
          </div>
          <div className="px-1.5 py-0.5 rounded text-[7px] text-[#5a6a6a] border border-[#e8e4df]">Cc/Bcc</div>
        </div>

        {/* Subject field */}
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-[#5a6a6a] w-6 shrink-0">Subject</span>
          <div className="flex-1 h-6 bg-[#faf9f7] rounded border border-[#e8e4df] px-2 flex items-center">
            <div className="h-1.5 w-36 bg-[#1a4a4a]/15 rounded-full" />
          </div>
        </div>

        {/* Templates button */}
        <div className="flex items-center gap-2">
          <div className="w-6 shrink-0" />
          <div className="flex items-center gap-1 px-2 py-1 rounded border border-[#e8e4df] text-[7px] text-[#5a6a6a]">
            <FileText className="w-2.5 h-2.5" />
            Templates
          </div>
        </div>

        {/* Body textarea skeleton */}
        <div className="h-28 bg-[#faf9f7] rounded border border-[#e8e4df] p-3">
          <div className="space-y-1.5">
            <div className="h-1 w-24 bg-[#1a4a4a]/12 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-5/6 bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-full bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-3/4 bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-2/3 bg-[#1a4a4a]/8 rounded-full" />
            <div className="h-1 w-1/3 bg-[#1a4a4a]/8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 border-t border-[#e8e4df] px-4 py-2.5">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#1a4a4a]">
          <Send className="w-2.5 h-2.5 text-white" />
          <span className="text-[7px] font-medium text-white">Send</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#e8e4df]">
          <Save className="w-2.5 h-2.5 text-[#5a6a6a]" />
          <span className="text-[7px] text-[#5a6a6a]">Save Draft</span>
        </div>
        <span className="text-[7px] text-[#5a6a6a]">Discard</span>
      </div>
    </div>
  )
}

export function EmailsFeatureMockup() {
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

          {/* Nav items */}
          <nav className="px-1 space-y-0.5 mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1a4a4a]/5">
              <Inbox className="w-2.5 h-2.5 text-[#1a4a4a]" />
              <span className="text-[7px] font-medium text-[#1a4a4a]">Inbox</span>
              <span className="ml-auto flex items-center justify-center h-3.5 min-w-3.5 rounded-full bg-[#1a4a4a] px-1 text-[5px] font-bold text-white">34</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md">
              <FileText className="w-2.5 h-2.5 text-[#5a6a6a]" />
              <span className="text-[7px] text-[#5a6a6a]">Templates</span>
            </div>
          </nav>

          {/* Divider */}
          <div className="mx-2 border-t border-[#e8e4df] my-1" />

          {/* Filters */}
          <nav className="px-1 space-y-0.5 flex-1">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1a4a4a]/5">
              <Inbox className="w-2.5 h-2.5 text-[#1a4a4a]" />
              <span className="text-[7px] font-medium text-[#1a4a4a]">Inbox</span>
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

        {/* Center: thread list */}
        <div className="w-[33%] border-r border-[#e8e4df] flex flex-col shrink-0">
          {/* Search bar */}
          <div className="p-2 border-b border-[#e8e4df]">
            <div className="h-6 bg-[#faf9f7] rounded border border-[#e8e4df] px-2 flex items-center gap-1.5">
              <Search className="w-2.5 h-2.5 text-[#5a6a6a]/40" />
              <span className="text-[7px] text-[#5a6a6a]/40">Search emails...</span>
            </div>
          </div>

          {/* Thread items */}
          {[
            { selected: true, unread: true, starred: true, nameW: 'w-16', subjectW: 'w-24', snippetW: 'w-20', timeW: 'w-6', count: 3 },
            { selected: false, unread: true, starred: false, nameW: 'w-20', subjectW: 'w-28', snippetW: 'w-24', timeW: 'w-8', count: 0 },
            { selected: false, unread: false, starred: false, nameW: 'w-14', subjectW: 'w-20', snippetW: 'w-16', timeW: 'w-6', count: 2 },
            { selected: false, unread: false, starred: true, nameW: 'w-18', subjectW: 'w-24', snippetW: 'w-20', timeW: 'w-8', count: 0 },
            { selected: false, unread: false, starred: false, nameW: 'w-12', subjectW: 'w-28', snippetW: 'w-18', timeW: 'w-6', count: 0 },
          ].map((t, i) => (
            <div key={i} className={`px-3 py-2 border-b border-[#e8e4df]/50 ${t.selected ? 'bg-[#1a4a4a]/5' : ''} ${t.unread ? 'bg-[#1a4a4a]/[0.02]' : ''}`}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Star className={`w-2.5 h-2.5 shrink-0 ${t.starred ? 'text-amber-400 fill-amber-400' : 'text-[#5a6a6a]/20'}`} />
                <div className={`h-1.5 ${t.nameW} rounded-full ${t.unread ? 'bg-[#1a2a2a]' : 'bg-[#1a2a2a]/50'}`} />
                {t.count > 0 && (
                  <span className="px-1 py-0.5 rounded bg-[#5a6a6a]/10 text-[5px] text-[#5a6a6a]">{t.count}</span>
                )}
                <div className={`ml-auto h-1 ${t.timeW} bg-[#5a6a6a]/25 rounded-full shrink-0`} />
              </div>
              <div className="pl-4">
                <div className={`h-1 ${t.subjectW} rounded-full mb-0.5 ${t.unread ? 'bg-[#1a4a4a]/40' : 'bg-[#5a6a6a]/20'}`} />
                <div className={`h-0.5 ${t.snippetW} bg-[#5a6a6a]/12 rounded-full`} />
              </div>
            </div>
          ))}
        </div>

        {/* Right: thread detail */}
        <div className="flex-1 flex flex-col">
          {/* Subject header with action buttons */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#e8e4df]">
            <div className="h-2 w-32 bg-[#1a2a2a]/70 rounded-full flex-1" />
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <Mail className="w-3 h-3 text-[#5a6a6a]/40" />
              <Archive className="w-3 h-3 text-[#5a6a6a]/40" />
              <Trash2 className="w-3 h-3 text-[#5a6a6a]/40" />
            </div>
          </div>

          {/* Message area */}
          <div className="flex-1 p-3 bg-[#faf9f7] space-y-2">
            {/* Message header */}
            <div className="flex items-center gap-2 pb-2 border-b border-[#e8e4df]/50">
              <div className="w-7 h-7 rounded-full bg-[#1a4a4a] flex items-center justify-center shrink-0">
                <span className="text-[6px] font-bold text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-20 bg-[#1a2a2a]/60 rounded-full mb-1" />
                <div className="h-1 w-12 bg-[#5a6a6a]/20 rounded-full" />
              </div>
              <div className="h-1 w-14 bg-[#5a6a6a]/20 rounded-full shrink-0" />
              <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a]/30 shrink-0" />
            </div>

            {/* From / To lines */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[6px] text-[#5a6a6a]">From:</span>
                <div className="h-1 w-24 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[6px] text-[#5a6a6a]">To:</span>
                <div className="h-1 w-20 bg-[#5a6a6a]/15 rounded-full" />
              </div>
            </div>

            {/* Email body skeleton */}
            <div className="bg-white rounded-lg p-3 border border-[#e8e4df] shadow-sm space-y-1.5">
              <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-3/4 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-1/2 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>

          {/* Reply button */}
          <div className="p-2.5 border-t border-[#e8e4df]">
            <div className="flex items-center justify-center gap-1 w-full py-1.5 rounded-md bg-[#1a4a4a]">
              <Reply className="w-2.5 h-2.5 text-white" />
              <span className="text-[7px] font-medium text-white">Reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ThemeCustomizerFeatureMockup = memo(function ThemeCustomizerFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[#e8e4df] bg-[#faf9f7] px-3 py-1.5">
        <span className="text-[8px] font-semibold text-[#1a2a2a]">Theme Customizer</span>
        <X className="w-3 h-3 text-[#5a6a6a]" />
      </div>
      <div className="flex flex-col sm:flex-row">
        {/* Left: Template browser (~55%) */}
        <div className="sm:w-[55%] border-b sm:border-b-0 sm:border-r border-[#e8e4df]">
          <div className="p-3 sm:p-4 space-y-2.5">
            {/* Category tabs */}
            <div className="flex gap-1 overflow-hidden">
              <div className="px-2 py-1 rounded text-[7px] font-medium bg-[#1a4a4a]/10 text-[#1a4a4a] whitespace-nowrap">Templates</div>
              <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap">Colors</div>
              <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap">Typography</div>
              <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Layout</div>
              <div className="px-1.5 py-1 rounded text-[7px] text-[#5a6a6a] whitespace-nowrap hidden sm:block">Sections</div>
            </div>
            {/* Template count + search */}
            <div className="flex items-center gap-2">
              <span className="text-[6px] text-[#5a6a6a] shrink-0">24 templates</span>
              <div className="flex-1 h-4 rounded border border-[#e8e4df] bg-white flex items-center px-1.5 gap-1">
                <Search className="w-2 h-2 text-[#5a6a6a]/40" />
                <div className="h-1 w-10 bg-[#1a2a2a]/15 rounded-full" />
              </div>
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1">
              <div className="px-1.5 py-0.5 rounded-full text-[6px] font-medium bg-[#1a4a4a] text-white">All</div>
              <div className="px-1.5 py-0.5 rounded-full text-[6px] text-[#5a6a6a] border border-[#e8e4df]">By Industry</div>
              <div className="px-1.5 py-0.5 rounded-full text-[6px] text-[#5a6a6a] border border-[#e8e4df]">By Style</div>
              <div className="px-1.5 py-0.5 rounded-full text-[6px] text-[#5a6a6a] border border-[#e8e4df] hidden sm:block">By Specialty</div>
            </div>
            {/* 2x2 template grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'w-14', desc: 'w-20', selected: true, aiPick: true, tags: ['Modern', 'Clean'] },
                { name: 'w-12', desc: 'w-16', selected: false, aiPick: false, tags: ['Classic', 'Formal'] },
                { name: 'w-16', desc: 'w-14', selected: false, aiPick: false, tags: ['Creative', 'Bold'] },
                { name: 'w-10', desc: 'w-18', selected: false, aiPick: false, tags: ['Minimal', 'ATS'] },
              ].map((tpl, i) => (
                <div
                  key={i}
                  className={`relative p-2 rounded-lg border bg-white ${
                    tpl.selected ? 'border-[#2563eb] ring-1 ring-[#2563eb]/30' : 'border-[#e8e4df]'
                  }`}
                >
                  {tpl.aiPick && (
                    <div className="absolute -top-1 -right-1 px-1 py-px rounded text-[5px] font-bold bg-amber-400 text-amber-900">
                      AI Pick
                    </div>
                  )}
                  {/* Color swatches + Aa */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1a2a2a]" />
                    <span className="text-[6px] font-semibold text-[#5a6a6a] ml-0.5">Aa</span>
                    {tpl.selected && (
                      <Check className="w-2.5 h-2.5 text-[#2563eb] ml-auto" />
                    )}
                  </div>
                  {/* Name + desc skeletons */}
                  <div className={`h-1 ${tpl.name} bg-[#1a2a2a]/40 rounded-full mb-1`} />
                  <div className={`h-0.5 ${tpl.desc} bg-[#5a6a6a]/20 rounded-full mb-1.5`} />
                  {/* Tag chips */}
                  <div className="flex gap-0.5">
                    {tpl.tags.map((tag) => (
                      <div key={tag} className="px-1 py-px rounded text-[5px] bg-[#f5f4f2] text-[#5a6a6a]">{tag}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: CV preview (~45%) with blue theme */}
        <div className="sm:w-[45%] p-3 sm:p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11] flex flex-col">
            {/* Blue-themed CV header */}
            <div className="mb-2">
              <div className="h-2 w-20 bg-[#2563eb]/70 rounded-full mb-1" />
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-1">
                <div className="h-0.5 w-14 bg-[#5a6a6a]/30 rounded-full" />
                <div className="h-0.5 w-10 bg-[#5a6a6a]/30 rounded-full" />
                <div className="h-0.5 w-6 bg-[#5a6a6a]/30 rounded-full" />
              </div>
              <div className="h-px w-full bg-[#2563eb]" />
            </div>
            {/* Summary */}
            <div className="mb-2">
              <div className="text-[6px] font-bold text-[#2563eb] tracking-wide mb-0.5">PROFESSIONAL SUMMARY</div>
              <div className="h-px w-6 bg-[#2563eb] mb-1" />
              <div className="space-y-0.5">
                <div className="h-px w-full bg-[#1a2a2a]/30 rounded-full" />
                <div className="h-px w-full bg-[#1a2a2a]/30 rounded-full" />
                <div className="h-px w-5/6 bg-[#1a2a2a]/30 rounded-full" />
              </div>
            </div>
            {/* Experience */}
            <div className="mb-2">
              <div className="text-[6px] font-bold text-[#2563eb] tracking-wide mb-0.5">WORK EXPERIENCE</div>
              <div className="h-px w-6 bg-[#2563eb] mb-1" />
              <div className="space-y-0.5 pl-1.5">
                <div className="h-1 w-20 bg-[#1a4a4a]/50 rounded-full" />
                <div className="h-0.5 w-14 bg-[#5a6a6a]/30 rounded-full" />
                <div className="h-px w-full bg-[#1a2a2a]/20 rounded-full mt-0.5" />
                <div className="h-px w-5/6 bg-[#1a2a2a]/20 rounded-full" />
              </div>
            </div>
            {/* Skills */}
            <div className="mb-auto">
              <div className="text-[6px] font-bold text-[#2563eb] tracking-wide mb-0.5">SKILLS</div>
              <div className="h-px w-6 bg-[#2563eb] mb-1" />
              <div className="flex flex-wrap gap-1">
                <div className="h-2.5 w-8 bg-[#2563eb]/10 rounded-full" />
                <div className="h-2.5 w-10 bg-[#2563eb]/10 rounded-full" />
                <div className="h-2.5 w-7 bg-[#2563eb]/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const AIAssistantFeatureMockup = memo(function AIAssistantFeatureMockup() {
  return (
    <div className="relative bg-[#f5f4f2] rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden" style={{ minHeight: 320 }}>
      {/* Faded CV background */}
      <div className="absolute inset-0 flex items-start justify-center pt-4 opacity-30 pointer-events-none">
        <div className="w-[45%]">
          <CVPreviewMockup />
        </div>
      </div>
      {/* Top right button */}
      <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-white border border-[#e8e4df] shadow-sm text-[7px] font-medium text-[#1a4a4a] z-10">
        Show Results
      </div>
      {/* Centered floating chat panel */}
      <div className="relative z-10 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: 320 }}>
        <div className="w-full max-w-[320px] bg-white rounded-xl shadow-lg border border-[#e8e4df] overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#e8e4df]">
            <Sparkles className="w-3.5 h-3.5 text-[#1a4a4a]" />
            <span className="text-[8px] font-semibold text-[#1a2a2a] flex-1">AI Assistant</span>
            <div className="h-3 w-10 bg-[#1a4a4a]/10 rounded-full" />
            <Trash2 className="w-2.5 h-2.5 text-[#5a6a6a]" />
            <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a]" />
          </div>
          {/* Chat body */}
          <div className="px-3 py-2.5 space-y-2.5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[80%]">
                <div className="h-1 w-24 bg-white/40 rounded-full mb-0.5" />
                <div className="h-1 w-16 bg-white/30 rounded-full" />
              </div>
            </div>
            {/* AI message */}
            <div className="flex items-start gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1a4a4a] to-[#2a6a6a] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
              <div className="bg-[#faf9f7] rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="space-y-0.5 mb-1.5">
                  <div className="h-1 w-28 bg-[#1a4a4a]/20 rounded-full" />
                  <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
                  <div className="h-1 w-24 bg-[#1a4a4a]/20 rounded-full" />
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-2 h-2 text-green-500" />
                  <span className="text-[6px] text-green-700 font-medium">Change applied</span>
                </div>
              </div>
            </div>
          </div>
          {/* Quick action chips */}
          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {['+ Add skill', 'Improve summary', 'Suggest theme', 'Add achievement'].map((a) => (
              <div
                key={a}
                className="px-2 py-0.5 rounded-full bg-[#1a4a4a]/5 border border-[#1a4a4a]/15 text-[7px] font-medium text-[#1a4a4a]"
              >
                {a}
              </div>
            ))}
          </div>
          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 pb-2.5">
            <div className="flex-1 h-6 bg-[#faf9f7] rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <Send className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export const CoverLetterFeatureMockup = memo(function CoverLetterFeatureMockup() {
  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden">
      <MockupTopBar
        rightContent={
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a4a4a] text-[6px] text-white whitespace-nowrap">
            <Download className="w-2 h-2" />
            Export
            <ChevronDown className="w-2 h-2" />
          </div>
        }
      />
      <div className="flex flex-col sm:flex-row">
        {/* Left: Rich text editor */}
        <div className="sm:w-1/2 border-b sm:border-b-0 sm:border-r border-[#e8e4df] flex flex-col">
          {/* Tiptap toolbar */}
          <div className="flex items-center gap-0.5 px-2.5 py-1.5 border-b border-[#e8e4df]">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-[#1a4a4a]/10">
              <Bold className="w-3 h-3 text-[#1a4a4a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Italic className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Strikethrough className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-[#5a6a6a]">H1</div>
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-[#5a6a6a]">H2</div>
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold text-[#5a6a6a]">H3</div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <List className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <ListOrdered className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Quote className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="w-px h-4 bg-[#e8e4df] mx-0.5" />
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <Minus className="w-3 h-3 text-[#5a6a6a]" />
            </div>
            <div className="ml-auto flex items-center gap-1 text-[6px] text-green-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Saved
            </div>
          </div>
          {/* Company field */}
          <div className="px-3 pt-2.5 pb-1.5">
            <div className="text-[6px] text-[#5a6a6a] mb-1">Company</div>
            <div className="h-5 w-full rounded border border-[#e8e4df] flex items-center px-1.5">
              <div className="h-1 w-14 bg-[#1a2a2a]/35 rounded-full" />
            </div>
          </div>
          {/* Editor area with content */}
          <div className="mx-3 mb-3 flex-1 rounded-lg border border-[#e8e4df] p-2.5">
            <div className="space-y-1.5">
              <div className="h-1.5 w-16 bg-[#1a2a2a]/50 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-5/6 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-3/4 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-2/3 bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
              <div className="h-1.5 w-1/2 bg-[#1a4a4a]/12 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Preview */}
        <div className="sm:w-1/2 flex flex-col">
          <div className="flex-1 p-3 sm:p-4 bg-[#f5f4f2] relative">
            <CoverLetterPreviewMockup />
            <AIFloatButton />
          </div>
        </div>
      </div>
    </div>
  )
})

export const CoverLetterAIFeatureMockup = memo(function CoverLetterAIFeatureMockup() {
  return (
    <div className="relative bg-[#f5f4f2] rounded-xl sm:rounded-2xl shadow-md border border-[#e8e4df] overflow-hidden" style={{ minHeight: 320 }}>
      {/* Faded cover letter editor background */}
      <div className="absolute inset-0 flex opacity-30 pointer-events-none">
        <div className="w-1/2 border-r border-[#e8e4df] p-3">
          <div className="space-y-1.5 mt-6">
            <div className="h-1.5 w-16 bg-[#1a2a2a]/50 rounded-full" />
            <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
            <div className="h-1.5 w-5/6 bg-[#1a4a4a]/12 rounded-full" />
            <div className="h-1.5 w-full bg-[#1a4a4a]/12 rounded-full" />
            <div className="h-1.5 w-3/4 bg-[#1a4a4a]/12 rounded-full" />
          </div>
        </div>
        <div className="w-1/2 p-3">
          <CoverLetterPreviewMockup />
        </div>
      </div>
      {/* Centered floating chat panel */}
      <div className="relative z-10 flex items-center justify-center p-4 sm:p-6" style={{ minHeight: 320 }}>
        <div className="w-full max-w-[320px] bg-white rounded-xl shadow-lg border border-[#e8e4df] overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#e8e4df]">
            <Pencil className="w-3.5 h-3.5 text-[#1a4a4a]" />
            <span className="text-[8px] font-semibold text-[#1a2a2a] flex-1">Cover Letter AI</span>
            <div className="h-3 w-10 bg-[#1a4a4a]/10 rounded-full" />
            <Trash2 className="w-2.5 h-2.5 text-[#5a6a6a]" />
            <ChevronDown className="w-2.5 h-2.5 text-[#5a6a6a]" />
          </div>
          {/* Chat body */}
          <div className="px-3 py-2.5 space-y-2.5">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#1a4a4a] rounded-lg rounded-br-sm px-2.5 py-1.5 max-w-[80%]">
                <div className="h-1 w-24 bg-white/40 rounded-full mb-0.5" />
                <div className="h-1 w-16 bg-white/30 rounded-full" />
              </div>
            </div>
            {/* AI message */}
            <div className="flex items-start gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1a4a4a] to-[#2a6a6a] flex items-center justify-center shrink-0 mt-0.5">
                <Pencil className="w-2 h-2 text-white" />
              </div>
              <div className="bg-[#faf9f7] rounded-lg rounded-bl-sm px-2.5 py-1.5 border border-[#e8e4df] max-w-[85%]">
                <div className="space-y-0.5 mb-1.5">
                  <div className="h-1 w-28 bg-[#1a4a4a]/20 rounded-full" />
                  <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[5px] text-[#1a4a4a]/50 font-medium">1.</span>
                    <div className="h-1 w-24 bg-[#1a4a4a]/15 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[5px] text-[#1a4a4a]/50 font-medium">2.</span>
                    <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[5px] text-[#1a4a4a]/50 font-medium">3.</span>
                    <div className="h-1 w-22 bg-[#1a4a4a]/15 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Quick action chips */}
          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {['Generate cover letter', 'Make concise', 'Formal tone', 'Stronger opening', 'Add enthusiasm'].map((a) => (
              <div
                key={a}
                className="px-2 py-0.5 rounded-full bg-[#1a4a4a]/5 border border-[#1a4a4a]/15 text-[7px] font-medium text-[#1a4a4a]"
              >
                {a}
              </div>
            ))}
          </div>
          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 pb-2.5">
            <div className="flex-1 h-6 bg-[#faf9f7] rounded-lg border border-[#e8e4df] px-2 flex items-center">
              <div className="h-1 w-20 bg-[#1a4a4a]/15 rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
              <Send className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export function InterviewScheduleFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Interview Detail Modal (matches real InterviewDetailModal) */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] space-y-3">
          {/* Header with type icon + title + badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center shrink-0">
                <Video className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <div className="h-1.5 w-24 bg-[#1a2a2a]/40 rounded-full mb-0.5" />
                <div className="h-1 w-14 bg-[#5a6a6a]/15 rounded-full" />
              </div>
            </div>
            <div className="px-1.5 py-0.5 rounded text-[6px] font-medium bg-blue-50 text-blue-700 border border-blue-200">Scheduled</div>
          </div>

          {/* Schedule info */}
          <div className="grid grid-cols-2 gap-2 text-[6px] text-[#5a6a6a]">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-2.5 h-2.5 shrink-0" />
              <div className="h-1 w-20 bg-[#5a6a6a]/15 rounded-full" />
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 shrink-0" />
              <span>10:00 AM (60 min)</span>
            </div>
          </div>

          {/* Position */}
          <div>
            <div className="text-[5px] font-medium text-[#5a6a6a] uppercase tracking-wide mb-0.5">Position</div>
            <div className="h-1.5 w-16 bg-[#1a2a2a]/25 rounded-full" />
          </div>

          {/* Separator */}
          <div className="border-t border-[#e8e4df]" />

          {/* Action buttons (matches real modal) */}
          <div className="flex flex-wrap gap-1">
            {[
              { label: 'View Process', Icon: Briefcase },
              { label: 'Edit', Icon: Pencil },
              { label: 'Record Outcome', Icon: Check },
              { label: 'Cancel', Icon: X },
              { label: 'Reschedule', Icon: RefreshCw },
            ].map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg border border-[#e8e4df] bg-white text-[6px] text-[#1a2a2a] font-medium">
                <Icon className="w-2 h-2 text-[#5a6a6a]" />
                {label}
              </div>
            ))}
            <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[6px] text-red-600 font-medium ml-auto">
              <Trash2 className="w-2 h-2" />
              Delete
            </div>
          </div>
        </div>

        {/* Right: Interview Wizard Step 1 (matches real wizard) */}
        <div className="w-1/2 p-4 bg-[#faf9f7] space-y-3">
          {/* Title */}
          <div className="text-[9px] font-semibold text-[#1a2a2a]">Schedule New Interview</div>

          {/* Step progress indicator */}
          <div className="flex items-center justify-center gap-0">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1a4a4a] text-white">
              <span className="w-3 h-3 rounded-full bg-white text-[#1a4a4a] text-[6px] font-medium flex items-center justify-center">1</span>
              <span className="text-[6px] font-medium">Type</span>
            </div>
            <div className="w-4 h-px bg-[#e8e4df]" />
            <span className="text-[6px] text-[#5a6a6a] px-1">2 Schedule</span>
            <div className="w-4 h-px bg-[#e8e4df]" />
            <span className="text-[6px] text-[#5a6a6a] px-1">3 Details</span>
          </div>

          {/* Interview Type label */}
          <div className="text-[7px] font-medium text-[#1a2a2a]">Interview Type</div>

          {/* Type cards */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Phone', Icon: Phone, selected: false },
              { label: 'Video', Icon: Video, selected: true },
              { label: 'Onsite', Icon: Building2, selected: false },
            ].map(({ label, Icon, selected }) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg border-2 transition-all ${
                  selected
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-[#e8e4df] bg-white'
                }`}
              >
                <Icon className={`w-3 h-3 ${selected ? 'text-purple-600' : 'text-[#5a6a6a]'}`} />
                <span className={`text-[6px] font-medium ${selected ? 'text-purple-700' : 'text-[#5a6a6a]'}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* Company & Position inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[6px] font-medium text-[#1a2a2a] mb-0.5">Company *</div>
              <div className="h-5 w-full bg-white rounded border border-[#e8e4df] px-1.5 flex items-center">
                <span className="text-[5px] text-[#5a6a6a]/50">e.g., Acme Inc</span>
              </div>
            </div>
            <div>
              <div className="text-[6px] font-medium text-[#1a2a2a] mb-0.5">Position *</div>
              <div className="h-5 w-full bg-white rounded border border-[#e8e4df] px-1.5 flex items-center">
                <span className="text-[5px] text-[#5a6a6a]/50">e.g., Senior Developer</span>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-[#e8e4df]">
            <div className="px-2 py-1 text-[6px] text-[#5a6a6a]">Cancel</div>
            <div className="px-2.5 py-1 rounded-md bg-[#1a4a4a] text-white text-[6px] font-medium">Next</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarAIAssistantFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden flex flex-col">
      {/* Header bar (matches real AIAssistantChat header) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8e4df] bg-[#faf9f7] shrink-0">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5 text-[#1a4a4a]" />
          <span className="text-[9px] font-semibold text-[#1a2a2a]">Interview Assistant</span>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#f0eeec] text-[6px] text-[#5a6a6a]">
            <Sparkles className="w-2 h-2" />
            <span>467/500</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trash2 className="w-3 h-3 text-[#5a6a6a]" />
          <ChevronDown className="w-3.5 h-3.5 text-[#5a6a6a]" />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 px-4 py-3 space-y-3">
        {/* User message (right-aligned, teal bubble + avatar) */}
        <div className="flex gap-2 justify-end">
          <div className="bg-[#1a4a4a] text-white rounded-2xl px-3 py-2 max-w-[80%]">
            <div className="h-1 w-40 bg-white/40 rounded-full mb-1" />
            <div className="h-1 w-28 bg-white/30 rounded-full" />
          </div>
          <div className="w-5 h-5 rounded-full bg-[#1a4a4a] flex items-center justify-center shrink-0 mt-0.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-white/50" />
          </div>
        </div>

        {/* AI response (left-aligned, muted bg + bot avatar) */}
        <div className="flex gap-2 justify-start">
          <div className="w-5 h-5 rounded-full bg-[#1a4a4a]/10 flex items-center justify-center shrink-0 mt-0.5">
            <CalendarDays className="w-2.5 h-2.5 text-[#1a4a4a]" />
          </div>
          <div className="bg-[#f5f4f2] rounded-2xl px-3 py-2 max-w-[85%] space-y-2">
            {/* AI text */}
            <div>
              <div className="h-1 w-full bg-[#1a2a2a]/12 rounded-full mb-1" />
              <div className="h-1 w-5/6 bg-[#1a2a2a]/10 rounded-full mb-1" />
              <div className="h-1 w-2/3 bg-[#1a2a2a]/8 rounded-full" />
            </div>

            {/* Interview Details (structured list matching real markdown output) */}
            <div>
              <div className="text-[7px] font-semibold text-[#1a2a2a] mb-1.5">Interview Details:</div>
              <div className="space-y-1 pl-1">
                {[
                  { label: 'Company', skeleton: 'w-10' },
                  { label: 'Position', skeleton: 'w-14' },
                  { label: 'Date & Time', skeleton: 'w-24' },
                  { label: 'Duration', skeleton: 'w-16' },
                  { label: 'Type', skeleton: 'w-8' },
                ].map(({ label, skeleton }) => (
                  <div key={label} className="flex items-center gap-1 text-[6px]">
                    <span className="text-[#5a6a6a]">•</span>
                    <span className="font-semibold text-[#1a2a2a]">{label}:</span>
                    <div className={`h-1 ${skeleton} bg-[#5a6a6a]/15 rounded-full`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Closing text */}
            <div>
              <div className="h-1 w-full bg-[#1a2a2a]/8 rounded-full mb-1" />
              <div className="h-1 w-3/5 bg-[#1a2a2a]/6 rounded-full" />
            </div>

            {/* Tool result: Change applied */}
            <div className="flex items-center gap-1 pt-1.5 border-t border-[#e8e4df]/60">
              <Check className="w-2.5 h-2.5 text-green-600" />
              <span className="text-[6px] text-green-700 font-medium">Change applied</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input area (matches real chat input) */}
      <div className="px-4 pb-3 pt-2 border-t border-[#e8e4df] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white rounded-lg border border-[#e8e4df] px-3 py-2 flex items-center">
            <span className="text-[6px] text-[#5a6a6a]/50 truncate">Schedule, reschedule, or ask about interviews... (⌘+Enter)</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#1a4a4a] text-white shrink-0">
            <Send className="w-3 h-3" />
            <span className="text-[7px] font-medium">Send</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarFeatureMockup() {
  // Feb 2026 starts on Sunday (weekStartsOn Monday), so first row: 26 27 28 29 30 31 1
  const weeks = [
    [26, 27, 28, 29, 30, 31, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 1],
  ]
  const prevMonthDays = [26, 27, 28, 29, 30, 31]
  const nextMonthDays = [1]
  const todayDay = 8
  const eventsOnDay: Record<number, { color: string }[]> = {
    4: [{ color: 'bg-purple-100 text-purple-700' }],
    16: [{ color: 'bg-purple-100 text-purple-700' }],
  }

  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      {/* Top bar - matches real calendar page header */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 border-b border-[#e8e4df] bg-white">
        <div className="flex items-center gap-1.5">
          <div className="px-1.5 py-0.5 rounded bg-[#f8f6f4] text-[6px] font-medium text-[#5a6a6a]">2 scheduled</div>
          <div className="hidden sm:flex items-center gap-1 text-[6px] text-[#5a6a6a]">
            <CalendarDays className="w-2.5 h-2.5" />
            <span>Connect Google Calendar</span>
          </div>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#e8e4df]">
          <SlidersHorizontal className="w-2 h-2 text-[#5a6a6a]" />
          <span className="text-[6px] text-[#5a6a6a]">All Interviews</span>
          <ChevronDown className="w-2 h-2 text-[#5a6a6a]" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Left sidebar: Upcoming Interviews */}
        <div className="sm:w-[24%] border-b sm:border-b-0 sm:border-r border-[#e8e4df] bg-white p-2 sm:p-2.5">
          <div className="flex items-center gap-1 mb-2">
            <CalendarDays className="w-2.5 h-2.5 text-[#1a2a2a]" />
            <span className="text-[7px] font-medium text-[#1a2a2a]">Upcoming Interviews</span>
          </div>
          {/* Interview card skeleton */}
          <div className="p-2 rounded-lg hover:bg-[#f8f6f4] transition-colors">
            <div className="h-1.5 w-3/4 bg-[#1a2a2a]/30 rounded-full mb-1" />
            <div className="h-1 w-1/2 bg-[#5a6a6a]/15 rounded-full mb-1.5" />
            <div className="flex items-center gap-1">
              <div className="px-1 py-0.5 rounded bg-gray-100 text-[5px] text-gray-600">Mon, Feb 16</div>
              <span className="text-[5px] text-[#5a6a6a]">10:00 AM</span>
            </div>
          </div>

          {/* Today section */}
          <div className="mt-3 pt-2 border-t border-[#e8e4df]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[7px] font-medium text-[#1a2a2a]">Today</span>
              <Plus className="w-2.5 h-2.5 text-[#5a6a6a]" />
            </div>
            <p className="text-[6px] text-[#5a6a6a] text-center py-2">No interviews on this date</p>
          </div>
        </div>

        {/* Center: Calendar grid */}
        <div className="flex-1 flex flex-col min-h-[200px]">
          {/* Calendar header with month nav */}
          <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-[#e8e4df]">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded border border-[#e8e4df] flex items-center justify-center">
                <ChevronLeft className="w-2.5 h-2.5 text-[#5a6a6a]" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-semibold text-[#1a2a2a] min-w-[60px] text-center">February 2026</span>
              <div className="w-5 h-5 rounded border border-[#e8e4df] flex items-center justify-center">
                <ChevronRight className="w-2.5 h-2.5 text-[#5a6a6a]" />
              </div>
            </div>
            <div className="px-1.5 py-0.5 rounded border border-[#e8e4df] text-[6px] text-[#5a6a6a]">Today</div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#e8e4df]">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
              <div key={d} className="text-center text-[4px] sm:text-[5px] text-[#5a6a6a]/60 font-medium uppercase tracking-wide py-1">{d}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="flex-1 divide-y divide-[#e8e4df]">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 divide-x divide-[#e8e4df]">
                {week.map((day, di) => {
                  const isPrevMonth = wi === 0 && prevMonthDays.includes(day)
                  const isNextMonth = wi === weeks.length - 1 && nextMonthDays.includes(day)
                  const isOutside = isPrevMonth || isNextMonth
                  const isToday = !isOutside && day === todayDay
                  const dayEvents = !isOutside ? eventsOnDay[day] : undefined

                  return (
                    <div key={`${wi}-${di}`} className={`p-0.5 min-h-[24px] sm:min-h-[32px] ${isOutside ? 'bg-[#f8f6f4]' : ''}`}>
                      <div className={`text-[5px] sm:text-[6px] w-3.5 h-3.5 flex items-center justify-center rounded-full mb-0.5
                        ${isOutside ? 'text-[#5a6a6a]/40' : 'text-[#1a2a2a]'}
                        ${isToday ? 'bg-[#1a4a4a] text-white font-medium' : ''}`}>
                        {day}
                      </div>
                      {dayEvents?.map((ev, ei) => (
                        <div key={ei} className={`flex items-center gap-0.5 px-0.5 py-px rounded text-[4px] ${ev.color} mt-px`}>
                          <Video className="w-1.5 h-1.5 shrink-0" />
                          <span className="truncate">10:00 AM</span>
                          <span className="truncate opacity-60 hidden sm:inline">e...</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recruitment process panel */}
        <div className="sm:w-[24%] flex flex-col bg-white border-t sm:border-t-0 sm:border-l border-[#e8e4df] relative">
          {/* Header */}
          <div className="px-2.5 py-2 border-b border-[#e8e4df]">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="h-1.5 w-3/4 bg-[#1a2a2a]/40 rounded-full mb-1" />
                <div className="h-1 w-1/2 bg-[#5a6a6a]/15 rounded-full" />
              </div>
              <div className="flex items-center gap-0.5 ml-1 shrink-0">
                <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-green-50 text-green-700 border border-green-200">Active</div>
                <div className="w-3 h-3 flex items-center justify-center text-[#5a6a6a]">
                  <div className="flex gap-px"><div className="w-0.5 h-0.5 bg-[#5a6a6a] rounded-full" /><div className="w-0.5 h-0.5 bg-[#5a6a6a] rounded-full" /><div className="w-0.5 h-0.5 bg-[#5a6a6a] rounded-full" /></div>
                </div>
                <X className="w-2.5 h-2.5 text-[#5a6a6a]" />
              </div>
            </div>
          </div>

          {/* Timeline stages */}
          <div className="p-2.5 flex-1 space-y-0">
            {/* Application Sent - completed */}
            <div className="flex items-center gap-2 py-1">
              <div className="w-3.5 h-3.5 rounded-full bg-green-50 ring-1 ring-green-200 flex items-center justify-center shrink-0">
                <Check className="w-2 h-2 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[6px] font-medium text-[#1a2a2a]">Application Sent</div>
              </div>
              <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-green-50 text-green-600">Completed</div>
            </div>

            {/* Video Interview - scheduled */}
            <div className="flex items-center gap-2 py-1">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-50 ring-1 ring-blue-200 flex items-center justify-center shrink-0">
                <Clock className="w-2 h-2 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[6px] font-medium text-[#1a2a2a]">Video Interview</div>
                <div className="text-[5px] text-[#8a9a9a]">Feb 16, 10:00 AM</div>
              </div>
              <div className="px-1 py-0.5 rounded text-[5px] font-medium bg-blue-50 text-blue-600">Scheduled</div>
            </div>

            {/* Add Next Step */}
            <div className="flex items-center gap-2 py-1 mt-1">
              <div className="w-3.5 h-3.5 rounded-full border border-dashed border-[#d0ccc7] flex items-center justify-center bg-white shrink-0">
                <Plus className="w-2 h-2 text-[#999]" />
              </div>
              <span className="text-[6px] text-[#999]">Add Next Step</span>
            </div>
          </div>

          {/* AI Assistant floating button */}
          <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#1a4a4a] to-[#1a4a4a]/80 shadow-lg flex items-center justify-center">
            <CalendarDays className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

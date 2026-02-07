import { Check, X, Minus } from 'lucide-react'
import type { FeatureSupport, FeatureKey } from '@/lib/seo/data/types'
import { featureLabels } from '@/lib/seo/data/types'

interface FeatureComparisonTableProps {
  extendFeatures: FeatureSupport
  competitorFeatures: FeatureSupport
  competitorName: string
}

const featureKeys: FeatureKey[] = [
  'aiResumeBuilder',
  'atsOptimization',
  'aiJobMatching',
  'emailIntegration',
  'calendarIntegration',
  'coverLetterBuilder',
  'interviewPrep',
  'multipleTemplates',
  'pdfExport',
  'docxExport',
  'aiWritingAssistant',
  'customDomain',
  'analytics',
  'teamFeatures',
]

function StatusIcon({ value }: { value: boolean | 'partial' }) {
  if (value === true) return <Check className="w-5 h-5 text-green-600" />
  if (value === 'partial') return <Minus className="w-5 h-5 text-amber-500" />
  return <X className="w-5 h-5 text-[#c8c4bf]" />
}

export function FeatureComparisonTable({
  extendFeatures,
  competitorFeatures,
  competitorName,
}: FeatureComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[#e8e4df]">
            <th className="text-left py-3 pr-4 text-sm font-semibold text-[#1a2a2a]">
              Feature
            </th>
            <th className="text-center py-3 px-4 text-sm font-semibold text-[#1a4a4a]">
              Extend Career
            </th>
            <th className="text-center py-3 pl-4 text-sm font-semibold text-[#1a2a2a]">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {featureKeys.map((key) => (
            <tr key={key} className="border-b border-[#e8e4df]/60">
              <td className="py-3 pr-4 text-sm text-[#3a4a4a]">
                {featureLabels[key]}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <StatusIcon value={extendFeatures[key]} />
                </div>
              </td>
              <td className="py-3 pl-4">
                <div className="flex justify-center">
                  <StatusIcon value={competitorFeatures[key]} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

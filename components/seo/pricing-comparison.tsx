import type { PricingTier } from '@/lib/seo/data/types'
import { Check } from 'lucide-react'

interface PricingComparisonProps {
  extendPricing: PricingTier[]
  competitorPricing: PricingTier[]
  extendName?: string
  competitorName: string
}

function PricingCard({
  tiers,
  name,
  featured,
}: {
  tiers: PricingTier[]
  name: string
  featured?: boolean
}) {
  const paidTier = tiers.find((t) => t.price !== 'Free')
  const freeTier = tiers.find((t) => t.price === 'Free')

  return (
    <div
      className={`p-6 rounded-2xl ${
        featured
          ? 'bg-white border-2 border-[#1a4a4a] shadow-xl'
          : 'bg-[#faf9f7] border border-[#e8e4df]'
      }`}
    >
      <h3 className="text-lg font-semibold text-[#1a2a2a] mb-1">{name}</h3>

      {freeTier && (
        <div className="mb-3">
          <span className="text-sm text-[#5a6a6a]">Free tier available</span>
        </div>
      )}

      {paidTier && (
        <div className="mb-4">
          <span className="text-3xl font-bold text-[#1a2a2a]">
            ${typeof paidTier.price === 'number' ? paidTier.price.toFixed(2) : paidTier.price}
          </span>
          {paidTier.period && (
            <span className="text-[#5a6a6a] ml-1">/{paidTier.period}</span>
          )}
        </div>
      )}

      {paidTier && (
        <ul className="space-y-2">
          {paidTier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#3a4a4a]">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function PricingComparison({
  extendPricing,
  competitorPricing,
  extendName = 'Extend Career',
  competitorName,
}: PricingComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PricingCard tiers={extendPricing} name={extendName} featured />
      <PricingCard tiers={competitorPricing} name={competitorName} />
    </div>
  )
}

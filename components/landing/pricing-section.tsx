'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { DotPattern } from './dot-pattern'
import { easeOut, fadeUp } from './constants'

interface PricingData {
  monthly: { priceId: string; amount: number; currency: string }
  yearly: { priceId: string; amount: number; currency: string }
}

const freeFeatures = [
  { name: 'Unlimited resumes', included: true },
  { name: 'All templates', included: true },
  { name: 'PDF & DOCX export', included: true },
  { name: 'Job tracking', included: true },
  { name: 'Gmail & Outlook sync', included: true },
  { name: 'AI assistant', included: false },
  { name: 'AI cover letters', included: false },
  { name: 'ATS optimization', included: false },
  { name: 'Smart job matching', included: false },
]

const proFeatures = [
  { name: '500 AI requests/month', included: true },
  { name: 'AI CV & cover letter assistant', included: true },
  { name: 'AI cover letter generation', included: true },
  { name: 'ATS optimization & scoring', included: true },
  { name: 'Smart job matching', included: true },
  { name: 'AI interview scheduler', included: true },
  { name: 'Priority support', included: true },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)
  const [pricing, setPricing] = useState<PricingData | null>(null)
  const [loading, setLoading] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => {
        setPricing(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const currentPrice = pricing
    ? isYearly
      ? pricing.yearly.amount
      : pricing.monthly.amount
    : isYearly
    ? 199.9
    : 19.99

  const monthlyEquivalent = isYearly ? (currentPrice / 12).toFixed(2) : currentPrice.toFixed(2)
  const savings = pricing
    ? Math.round((1 - pricing.yearly.amount / (pricing.monthly.amount * 12)) * 100)
    : 17

  return (
    <section className="relative px-6 py-12 sm:py-16 bg-white">
      <DotPattern id="pricing-grid" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="text-center mb-8"
        >

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#1a4a4a]/5 border border-[#e8e4df]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? 'bg-white text-[#1a2a2a] shadow-sm'
                  : 'text-[#5a6a6a] hover:text-[#1a2a2a]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-[#1a2a2a] shadow-sm'
                  : 'text-[#5a6a6a] hover:text-[#1a2a2a]'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                Save {savings}%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Free Plan - timing-300ms-max */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.05, ease: easeOut }}
            className="relative p-5 sm:p-6 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#1a4a4a]/20 transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#1a2a2a] mb-1">Free</h3>
              <p className="text-[#5a6a6a] text-sm">Everything you need, without AI</p>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-[#1a2a2a]">$0</span>
              <span className="text-[#5a6a6a] ml-1 text-sm">/month</span>
            </div>

            <Link href="/signup">
              <Button
                variant="outline"
                className="w-full h-10 border-[#d8d4cf] text-[#3a4a4a] hover:bg-[#1a4a4a]/5 text-sm"
              >
                Get started free
              </Button>
            </Link>

            <div className="mt-6 pt-5 border-t border-[#e8e4df]">
              <p className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wider mb-3">
                What&apos;s included
              </p>
              <ul className="space-y-2.5">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-[#c8c4bf] flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-[#3a4a4a]' : 'text-[#a8a4a0]'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pro Plan - timing-300ms-max */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: 0.1, ease: easeOut }}
            className="relative p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#1a4a4a] shadow-xl"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-[#1a4a4a] text-white text-xs font-semibold">
                Most Popular
              </span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#1a2a2a] mb-1">Pro</h3>
              <p className="text-[#5a6a6a] text-sm">Supercharge your job search with AI</p>
            </div>

            <div className="mb-4">
              {loading ? (
                <div className="h-9 w-28 bg-[#1a4a4a]/10 rounded animate-pulse" />
              ) : (
                <>
                  <span className="text-3xl font-bold text-[#1a2a2a]">
                    ${monthlyEquivalent}
                  </span>
                  <span className="text-[#5a6a6a] ml-1 text-sm">/month</span>
                  {isYearly && (
                    <p className="text-xs text-[#5a6a6a] mt-1">
                      Billed ${currentPrice.toFixed(2)} yearly
                    </p>
                  )}
                </>
              )}
            </div>

            <Link href="/signup?plan=pro">
              <Button className="w-full h-10 bg-[#1a4a4a] hover:bg-[#0d3535] text-white text-sm">
                Upgrade to Pro
              </Button>
            </Link>

            <div className="mt-6 pt-5 border-t border-[#e8e4df]">
              <p className="text-xs font-medium text-[#5a6a6a] uppercase tracking-wider mb-3">
                Everything in Free, plus
              </p>
              <ul className="space-y-2.5">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-[#3a4a4a]">{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className="text-center text-sm text-[#8a9a9a] mt-6"
        >
          Cancel anytime. No questions asked.
        </motion.p>
      </div>
    </section>
  )
}

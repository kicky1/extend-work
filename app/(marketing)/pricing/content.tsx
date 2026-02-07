'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MarketingHero, MarketingCTA } from '@/components/seo/marketing-page-sections'
import { PricingSection } from '@/components/landing/pricing-section'

const easeOut = [0.22, 1, 0.36, 1] as const

const faqs = [
  {
    q: 'Can I use Extend Career for free?',
    a: 'Yes! The free plan includes 3 resumes, basic templates, and PDF export. No credit card required.',
  },
  {
    q: 'What happens when I upgrade to Pro?',
    a: 'You instantly unlock unlimited resumes, all premium templates, 500 AI requests per month, ATS optimization, smart job matching, email sync, and priority support.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. You can cancel anytime from your account settings. No questions asked, no hidden fees.',
  },
  {
    q: 'Is there a yearly discount?',
    a: 'Yes. The yearly plan saves you roughly 17% compared to paying monthly.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards through Stripe. All payments are securely processed.',
  },
  {
    q: 'Do I keep my resumes if I downgrade?',
    a: 'Yes. Your resumes are never deleted. If you downgrade, you keep access to your first 3 resumes and can upgrade again anytime.',
  },
]

export function PricingContent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <MarketingHero
        badge="Pricing"
        title="Simple, transparent pricing"
        subtitle="Start free and upgrade when you need more power. No hidden fees, cancel anytime."
      />

      <PricingSection />



      <MarketingCTA
        title="Ready to supercharge your job search?"
        subtitle="Start for free and upgrade to Pro when you need more power."
      />
    </>
  )
}

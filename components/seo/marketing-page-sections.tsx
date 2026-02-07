'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  initial: { opacity: 0, y: '20%' },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

/* ---------- MarketingHero ---------- */
export function MarketingHero({
  badge,
  title,
  subtitle,
  ctaText = 'Get started free',
  ctaHref = '/signup',
}: {
  badge: string
  title: string
  subtitle: string
  ctaText?: string
  ctaHref?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 pt-16 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a4a4a]/5 text-[#1a4a4a] text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a]" />
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a2a2a] leading-[1.1] tracking-tight mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-[#5a6a6a] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-[#1a4a4a] hover:bg-[#0d3535] text-white px-8 py-3 rounded-lg text-base font-medium transition-colors"
            >
              {ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- FeatureSection ---------- */
export function FeatureSection({
  title,
  description,
  bullets,
  mockup,
  reverse = false,
}: {
  title: string
  description: string
  bullets: string[]
  mockup?: React.ReactNode
  reverse?: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: easeOut }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div className={reverse ? 'lg:pl-8' : 'lg:pr-8'}>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a2a2a] mb-4">{title}</h3>
        <p className="text-[#5a6a6a] text-base leading-relaxed mb-4">{description}</p>
        <ul className="space-y-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-[#5a6a6a]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a] shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {mockup || (
          <div className="aspect-video bg-[#1a4a4a]/5 rounded-2xl border border-dashed border-[#1a4a4a]/20 flex items-center justify-center">
            <span className="text-sm text-[#5a6a6a]">Feature preview</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ---------- HowItWorksSection ---------- */
export function HowItWorksSection({
  steps,
}: {
  steps: { title: string; description: string }[]
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">How it works</h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, ease: easeOut, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-full bg-[#1a4a4a] flex items-center justify-center text-white font-semibold mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-[#1a2a2a] mb-2">{step.title}</h3>
              <p className="text-sm text-[#5a6a6a] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- MarketingCTA ---------- */
export function MarketingCTA({
  title = 'Ready to transform your job search?',
  subtitle = "Join thousands who've streamlined their career journey.",
  ctaText = 'Start for free',
  ctaHref = '/signup',
}: {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-24">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative p-12 sm:p-16 rounded-3xl bg-[#1a4a4a] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">{subtitle}</p>
            <Link
              href={ctaHref}
              className="inline-flex items-center bg-white text-[#1a4a4a] hover:bg-white/90 px-8 py-3 rounded-lg text-base font-semibold transition-colors"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

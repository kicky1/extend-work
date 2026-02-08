'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CVMockup, JobsMockup, EmailsMockup, CalendarMockup } from '@/components/seo/feature-mockups'
import {
  easeOut,
  fadeUp,
  staggerContainer,
  floatAnimation,
  floatAnimationDelayed,
  floatAnimationSlow,
  floatAnimationFast,
} from './constants'

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToModules = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex-1 min-h-0 flex flex-col px-6 pt-8 sm:pt-16 pb-16 sm:pb-24 lg:pb-32 min-h-[calc(100dvh-5rem)] overflow-hidden">
      <div className="max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="relative z-10 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a4a4a]/5 text-[#1a4a4a] text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a] animate-pulse" />
                AI-Powered Career Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1a2a2a] leading-[1.05] tracking-tight mb-6"
            >
              Your career,
              <br />
              <span className="text-[#1a4a4a]">intelligently managed</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-[#5a6a6a] leading-relaxed max-w-md mb-8 sm:mb-10"
            >
              From crafting the perfect resume to landing interviews—one platform handles your entire job search with AI-powered precision.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/signup">
                <Button size="lg" className="bg-[#1a4a4a] hover:bg-[#0d3535] text-white px-8 h-12 text-base">
                  Get started free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-6 h-12 text-base border-[#d8d4cf] text-[#3a4a4a]"
                onClick={scrollToModules}
              >
                See how it works
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Floating Mockups - Corner layout with center dots */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: '10%', scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
            className="hidden lg:block relative w-[440px] h-[400px] mx-auto"
          >
            {/* Center: 4x4 dot grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 gap-2 lg:gap-2.5">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="size-1.5 lg:size-2 rounded-full bg-[#1a4a4a]/20" />
              ))}
            </div>

            {/* CV - top left corner */}
            <motion.div
              variants={shouldReduceMotion ? undefined : floatAnimation}
              animate={shouldReduceMotion ? undefined : 'animate'}
              className="absolute top-0 left-0 w-[140px] lg:w-[185px]"
            >
              <CVMockup />
            </motion.div>

            {/* Jobs - top right corner */}
            <motion.div
              variants={shouldReduceMotion ? undefined : floatAnimationDelayed}
              animate={shouldReduceMotion ? undefined : 'animate'}
              className="absolute top-0 right-0 w-[140px] lg:w-[185px]"
            >
              <JobsMockup />
            </motion.div>

            {/* Emails - bottom left corner */}
            <motion.div
              variants={shouldReduceMotion ? undefined : floatAnimationSlow}
              animate={shouldReduceMotion ? undefined : 'animate'}
              className="absolute bottom-0 left-0 w-[140px] lg:w-[185px]"
            >
              <EmailsMockup />
            </motion.div>

            {/* Calendar - bottom right corner */}
            <motion.div
              variants={shouldReduceMotion ? undefined : floatAnimationFast}
              animate={shouldReduceMotion ? undefined : 'animate'}
              className="absolute bottom-0 right-0 w-[135px] lg:w-[175px]"
            >
              <CalendarMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

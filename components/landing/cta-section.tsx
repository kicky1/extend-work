'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DotPattern } from './dot-pattern'
import { easeOut } from './constants'

export function CTASection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-16 sm:py-24">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#1a4a4a] overflow-hidden">
          <DotPattern id="grid" size={32} fill="white" opacity={0.1} />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your job search?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Join thousands who&apos;ve streamlined their career journey.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-[#1a4a4a] hover:bg-white/90 px-8 h-12 text-base font-semibold">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

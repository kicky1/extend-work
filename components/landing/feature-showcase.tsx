import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from './constants'
import type { FeatureShowcaseProps } from './types'

export function FeatureShowcase({
  title,
  description,
  bullets,
  mockup,
  reverse = false,
}: FeatureShowcaseProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: easeOut }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      {/* Text side */}
      <div className={reverse ? 'lg:pl-8' : 'lg:pr-8'}>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1a2a2a] mb-4">{title}</h3>
        <p className="text-[#5a6a6a] text-base leading-relaxed mb-4">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#5a6a6a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a]" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Mockup side */}
      <div className="origin-top scale-[0.85] sm:scale-100">{mockup}</div>
    </motion.div>
  )
}

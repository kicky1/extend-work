'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { exampleCVs } from '@/lib/example-cvs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'
import { easeOut } from './constants'
import { CVStyleCard } from './cv-style-card'

export function CVCarouselSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative px-6 py-16 sm:py-24 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            Choose your style
          </h2>
          <p className="text-[#5a6a6a] text-lg max-w-xl mx-auto">
            100+ professional templates designed for every industry and career stage—or create your own
          </p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut, delay: 0.1 }}
        >
          <Carousel autoplay autoplayDelay={5000} className="px-6 sm:px-12">
            <CarouselContent className="-ml-4">
              {exampleCVs.map((cvData, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <CVStyleCard cvData={cvData} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
            <CarouselDots />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}

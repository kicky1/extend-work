'use client'

import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string
  className?: string
}) {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(' ')

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 0.3,
        delay: stagger(0.05),
      }
    )
  }, [animate, words])

  return (
    <div ref={scope} className={cn('font-normal', className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="opacity-0"
        >
          {word}{' '}
        </motion.span>
      ))}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, ScrollText, Briefcase, Mail, CalendarDays, Play } from 'lucide-react'
import { MarketingNav } from '@/components/seo/marketing-nav'
import { MarketingFooter } from '@/components/seo/marketing-footer'
import { PricingSection } from '@/components/landing/pricing-section'
import { ScaledCVPreview } from '@/components/cv/preview/scaled-cv-preview'
import { exampleCVs } from '@/lib/example-cvs'
import type { CVData } from '@/lib/types/cv'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel'

// Custom easing curves (ease-custom-curves, ease-out-default)
const easeOut = [0.22, 1, 0.36, 1] as const
const easeInOut = [0.65, 0, 0.35, 1] as const

// Fade up with percentage-based transform (transform-percentage-translate)
const fadeUp = {
  initial: { opacity: 0, y: '20%' },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08, // Slightly faster stagger
      delayChildren: 0.15,
    },
  },
}

// Floating animations with custom cubic-bezier (ease-in-out-onscreen)
const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 1, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
}

const floatAnimationDelayed = {
  animate: {
    y: [0, -16, 0],
    rotate: [0, -1.5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
      delay: 1,
    },
  },
}

const floatAnimationSlow = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: easeInOut,
      delay: 0.5,
    },
  },
}

const floatAnimationFast = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
      delay: 1.5,
    },
  },
}

// CV Mockup - paper document style
function CVMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-sm translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-sm shadow-lg overflow-hidden border border-[#e8e4df]">
        <div className="h-12 bg-[#1a4a4a] p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20" />
            <div className="flex-1">
              <div className="h-2 w-16 bg-white/40 rounded-full mb-1" />
              <div className="h-1.5 w-12 bg-white/25 rounded-full" />
            </div>
          </div>
        </div>
        <div className="p-3 space-y-2.5">
          <div>
            <div className="h-1.5 w-12 bg-[#1a4a4a]/70 rounded-full mb-1.5" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="h-3 w-8 bg-[#1a4a4a]/15 rounded-full" />
            <div className="h-3 w-10 bg-[#1a4a4a]/15 rounded-full" />
            <div className="h-3 w-7 bg-[#1a4a4a]/15 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Jobs Mockup - card with match score
function JobsMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-md bg-[#1a4a4a]/10 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-[#1a4a4a]" />
          </div>
          <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
            92% match
          </div>
        </div>
        <div className="h-2 w-20 bg-[#1a2a2a] rounded-full mb-1" />
        <div className="h-1.5 w-14 bg-[#5a6a6a]/30 rounded-full mb-2" />
        <div className="flex gap-1">
          <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
          <div className="h-2.5 w-12 bg-[#1a4a4a]/10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Emails Mockup - message thread style
function EmailsMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#1a4a4a]" />
          <div className="flex-1">
            <div className="h-1.5 w-16 bg-[#1a2a2a] rounded-full mb-1" />
            <div className="h-1 w-12 bg-[#5a6a6a]/30 rounded-full" />
          </div>
        </div>
        <div className="space-y-1.5 ml-8">
          <div className="bg-[#1a4a4a]/5 rounded-md p-1.5">
            <div className="h-1 w-full bg-[#1a4a4a]/20 rounded-full mb-0.5" />
            <div className="h-1 w-3/4 bg-[#1a4a4a]/20 rounded-full" />
          </div>
          <div className="bg-[#1a4a4a] rounded-md p-1.5 ml-4">
            <div className="h-1 w-full bg-white/40 rounded-full mb-0.5" />
            <div className="h-1 w-2/3 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Calendar Mockup - mini grid with interview dots
function CalendarMockup({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[#1a3a3a]/10 rounded-lg translate-x-2 translate-y-2 blur-sm" />
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-[#e8e4df] p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="h-2 w-14 bg-[#1a2a2a] rounded-full" />
          <CalendarDays className="w-4 h-4 text-[#1a4a4a]" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(21)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${
                [4, 9, 15].includes(i)
                  ? 'bg-[#1a4a4a]'
                  : i === 11
                  ? 'bg-green-500'
                  : 'bg-[#1a4a4a]/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Feature Mockup Components for alternating layout section

// CV Creator Feature Mockup - split layout with form editor + live preview
function CVCreatorFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Form Editor */}
        <div className="w-1/2 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          {/* Section: Personal */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-16 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="space-y-2 ml-6">
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
            </div>
          </div>
          {/* Section: Experience */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="space-y-2 ml-6">
              <div className="h-6 w-full bg-white rounded border border-[#e8e4df]" />
              <div className="h-14 w-full bg-white rounded border border-[#e8e4df]" />
            </div>
          </div>
          {/* Section: Skills */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded bg-[#1a4a4a]/10" />
              <div className="h-2 w-12 bg-[#1a4a4a]/60 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              <div className="h-5 w-14 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-5 w-16 bg-[#1a4a4a]/10 rounded-full" />
              <div className="h-5 w-12 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Live CV Preview */}
        <div className="w-1/2 p-4 bg-[#f5f4f2]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            {/* Header */}
            <div className="h-10 bg-[#1a4a4a] rounded mb-3 p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-16 bg-white/50 rounded-full mb-1" />
                  <div className="h-1 w-12 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            {/* Content lines */}
            <div className="space-y-2">
              <div className="h-1.5 w-12 bg-[#1a4a4a]/50 rounded-full" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
              </div>
              <div className="h-1.5 w-14 bg-[#1a4a4a]/50 rounded-full mt-3" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// CV Evaluation Feature Mockup - score circle, section bars, issue cards
function CVEvaluationFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Mini CV preview with severity dots */}
        <div className="w-2/5 p-4 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="bg-white rounded-lg shadow-sm border border-[#e8e4df] p-3 aspect-[8.5/11]">
            {/* Header */}
            <div className="h-8 bg-[#1a4a4a] rounded mb-3 p-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/20" />
                <div className="flex-1">
                  <div className="h-1.5 w-12 bg-white/50 rounded-full mb-0.5" />
                  <div className="h-1 w-8 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
            {/* Content lines with severity dots */}
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-10 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                  <div className="h-1 w-5/6 bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-red-400 ml-2 mt-1 shrink-0" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-12 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                  <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-amber-400 ml-2 mt-1 shrink-0" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-8 bg-[#1a4a4a]/50 rounded-full" />
                  <div className="h-1 w-full bg-[#1a4a4a]/10 rounded-full" />
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-400 ml-2 mt-1 shrink-0" />
              </div>
            </div>
          </div>
        </div>
        {/* Right: Evaluation panel */}
        <div className="flex-1 p-4 space-y-4">
          {/* Score circle */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center">
              <span className="text-lg font-bold text-[#1a2a2a]">87</span>
            </div>
          </div>
          {/* Section score bars */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-16 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-green-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-10 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[75%] bg-amber-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="h-1.5 w-14 bg-[#1a4a4a]/40 rounded-full" />
                <div className="h-1.5 w-5 bg-[#1a4a4a]/30 rounded-full" />
              </div>
              <div className="h-2 w-full bg-[#e8e4df] rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-green-400 rounded-full" />
              </div>
            </div>
          </div>
          {/* Issue cards */}
          <div className="space-y-2">
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700">Critical</div>
                  <div className="h-1.5 w-20 bg-[#1a4a4a]/30 rounded-full" />
                </div>
                <div className="px-2 py-0.5 rounded bg-[#1a4a4a] text-white text-[8px] font-medium">Fix</div>
              </div>
              <div className="h-1 w-4/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
            <div className="p-2 rounded-lg border border-[#e8e4df] bg-[#faf9f7]">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-amber-100 text-amber-700">Warning</div>
                  <div className="h-1.5 w-24 bg-[#1a4a4a]/30 rounded-full" />
                </div>
                <div className="px-2 py-0.5 rounded bg-[#1a4a4a] text-white text-[8px] font-medium">Fix</div>
              </div>
              <div className="h-1 w-3/5 bg-[#1a4a4a]/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Jobs Feature Mockup - job cards with match scores and filters sidebar
function JobsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Filters sidebar */}
        <div className="w-1/4 p-3 border-r border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-12 bg-[#1a4a4a]/40 rounded-full mb-3" />
          <div className="space-y-2">
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
            <div className="h-5 w-full bg-white rounded border border-[#e8e4df]" />
          </div>
          <div className="h-2 w-10 bg-[#1a4a4a]/40 rounded-full mb-2 mt-4" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#1a4a4a]/10" />
              <div className="h-1.5 w-12 bg-[#1a4a4a]/20 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#1a4a4a]/10" />
              <div className="h-1.5 w-14 bg-[#1a4a4a]/20 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Job cards grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Job Card 1 */}
            <div className="p-3 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  94%
                </div>
              </div>
              <div className="h-2 w-20 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-14 bg-[#5a6a6a]/30 rounded-full mb-2" />
              <div className="flex gap-1">
                <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-2.5 w-12 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
            {/* Job Card 2 */}
            <div className="p-3 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  89%
                </div>
              </div>
              <div className="h-2 w-24 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-16 bg-[#5a6a6a]/30 rounded-full mb-2" />
              <div className="flex gap-1">
                <div className="h-2.5 w-8 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-2.5 w-14 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
            {/* Job Card 3 */}
            <div className="p-3 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-medium">
                  76%
                </div>
              </div>
              <div className="h-2 w-18 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-12 bg-[#5a6a6a]/30 rounded-full mb-2" />
              <div className="flex gap-1">
                <div className="h-2.5 w-12 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-2.5 w-8 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
            {/* Job Card 4 */}
            <div className="p-3 rounded-lg border border-[#e8e4df] bg-white">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-teal-600" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-medium">
                  92%
                </div>
              </div>
              <div className="h-2 w-22 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-14 bg-[#5a6a6a]/30 rounded-full mb-2" />
              <div className="flex gap-1">
                <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
                <div className="h-2.5 w-10 bg-[#1a4a4a]/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Emails Feature Mockup - thread list + message view (Gmail-style)
function EmailsFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Thread list */}
        <div className="w-2/5 border-r border-[#e8e4df]">
          {/* Email thread 1 - selected */}
          <div className="p-3 bg-[#1a4a4a]/5 border-l-2 border-[#1a4a4a]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#1a4a4a]" />
              <div className="flex-1">
                <div className="h-1.5 w-20 bg-[#1a2a2a] rounded-full" />
              </div>
              <div className="h-1 w-8 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-32 bg-[#1a4a4a]/40 rounded-full mb-1" />
              <div className="h-1 w-24 bg-[#5a6a6a]/20 rounded-full" />
            </div>
          </div>
          {/* Email thread 2 */}
          <div className="p-3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-purple-200" />
              <div className="flex-1">
                <div className="h-1.5 w-16 bg-[#1a2a2a]/60 rounded-full" />
              </div>
              <div className="h-1 w-6 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-28 bg-[#5a6a6a]/30 rounded-full mb-1" />
              <div className="h-1 w-20 bg-[#5a6a6a]/15 rounded-full" />
            </div>
          </div>
          {/* Email thread 3 */}
          <div className="p-3 border-b border-[#e8e4df]/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-amber-200" />
              <div className="flex-1">
                <div className="h-1.5 w-24 bg-[#1a2a2a]/60 rounded-full" />
              </div>
              <div className="h-1 w-10 bg-[#5a6a6a]/30 rounded-full" />
            </div>
            <div className="ml-8">
              <div className="h-1.5 w-24 bg-[#5a6a6a]/30 rounded-full mb-1" />
              <div className="h-1 w-16 bg-[#5a6a6a]/15 rounded-full" />
            </div>
          </div>
        </div>
        {/* Right: Message view */}
        <div className="flex-1 p-4 bg-[#faf9f7]">
          {/* Message header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#e8e4df]">
            <div className="w-10 h-10 rounded-full bg-[#1a4a4a]" />
            <div className="flex-1">
              <div className="h-2 w-24 bg-[#1a2a2a] rounded-full mb-1" />
              <div className="h-1.5 w-32 bg-[#5a6a6a]/30 rounded-full" />
            </div>
          </div>
          {/* Message content */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-[#e8e4df]">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-[#1a4a4a]/15 rounded-full" />
                <div className="h-1.5 w-5/6 bg-[#1a4a4a]/15 rounded-full" />
                <div className="h-1.5 w-4/5 bg-[#1a4a4a]/15 rounded-full" />
              </div>
            </div>
            {/* Reply bubble */}
            <div className="bg-[#1a4a4a] rounded-lg p-3 ml-8">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/40 rounded-full" />
                <div className="h-1.5 w-3/4 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Calendar Feature Mockup - calendar grid with interview dots + upcoming list
function CalendarFeatureMockup() {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-[#e8e4df] overflow-hidden">
      <div className="flex">
        {/* Left: Calendar grid */}
        <div className="flex-1 p-4">
          {/* Month header */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-2.5 w-20 bg-[#1a2a2a] rounded-full" />
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
              <div className="w-5 h-5 rounded bg-[#1a4a4a]/10" />
            </div>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="h-4 flex items-center justify-center">
                <span className="text-[8px] text-[#5a6a6a]/60 font-medium">{day}</span>
              </div>
            ))}
          </div>
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Previous month faded days */}
            {[28, 29, 30].map((day) => (
              <div key={`prev-${day}`} className="h-6 flex items-center justify-center rounded text-[8px] text-[#5a6a6a]/30">
                {day}
              </div>
            ))}
            {/* Current month days */}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
              const hasInterview = [5, 12, 18, 24].includes(day)
              const isToday = day === 15
              return (
                <div
                  key={day}
                  className={`h-6 flex flex-col items-center justify-center rounded text-[8px] relative ${
                    isToday ? 'bg-[#1a4a4a] text-white font-medium' : 'text-[#1a2a2a]'
                  }`}
                >
                  {day}
                  {hasInterview && (
                    <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                      day === 5 ? 'bg-green-500' : day === 12 ? 'bg-blue-500' : day === 18 ? 'bg-purple-500' : 'bg-amber-500'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
        {/* Right: Upcoming interviews */}
        <div className="w-2/5 p-4 border-l border-[#e8e4df] bg-[#faf9f7]">
          <div className="h-2 w-20 bg-[#1a4a4a]/60 rounded-full mb-3" />
          <div className="space-y-2">
            {/* Interview card 1 */}
            <div className="p-2.5 rounded-lg bg-white border border-[#e8e4df] shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-6 rounded-full bg-green-500" />
                <div className="flex-1">
                  <div className="h-1.5 w-20 bg-[#1a2a2a] rounded-full mb-1" />
                  <div className="h-1 w-14 bg-[#5a6a6a]/30 rounded-full" />
                </div>
              </div>
              <div className="ml-3.5 flex items-center gap-1.5">
                <CalendarDays className="w-2.5 h-2.5 text-[#5a6a6a]/50" />
                <div className="h-1 w-16 bg-[#5a6a6a]/20 rounded-full" />
              </div>
            </div>
            {/* Interview card 2 */}
            <div className="p-2.5 rounded-lg bg-white border border-[#e8e4df] shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-6 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <div className="h-1.5 w-24 bg-[#1a2a2a] rounded-full mb-1" />
                  <div className="h-1 w-16 bg-[#5a6a6a]/30 rounded-full" />
                </div>
              </div>
              <div className="ml-3.5 flex items-center gap-1.5">
                <CalendarDays className="w-2.5 h-2.5 text-[#5a6a6a]/50" />
                <div className="h-1 w-12 bg-[#5a6a6a]/20 rounded-full" />
              </div>
            </div>
            {/* Interview card 3 */}
            <div className="p-2.5 rounded-lg bg-white border border-[#e8e4df] shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-6 rounded-full bg-purple-500" />
                <div className="flex-1">
                  <div className="h-1.5 w-18 bg-[#1a2a2a] rounded-full mb-1" />
                  <div className="h-1 w-12 bg-[#5a6a6a]/30 rounded-full" />
                </div>
              </div>
              <div className="ml-3.5 flex items-center gap-1.5">
                <CalendarDays className="w-2.5 h-2.5 text-[#5a6a6a]/50" />
                <div className="h-1 w-14 bg-[#5a6a6a]/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// FeatureShowcase Component - alternating image/text layout
function FeatureShowcase({
  title,
  description,
  bullets,
  mockup,
  reverse = false,
}: {
  title: string
  description: string
  bullets?: string[]
  mockup: React.ReactNode
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
      <div>{mockup}</div>
    </motion.div>
  )
}

// Module accent colors
const moduleAccents = {
  teal: {
    bg: 'bg-[#1a4a4a]/5',
    border: 'border-[#1a4a4a]/20',
    iconBg: 'bg-[#1a4a4a]/10',
    icon: 'text-[#1a4a4a]',
    gradient: 'from-[#1a4a4a]/5 to-transparent',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/50',
    iconBg: 'bg-emerald-100',
    icon: 'text-emerald-600',
    gradient: 'from-emerald-50 to-transparent',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200/50',
    iconBg: 'bg-violet-100',
    icon: 'text-violet-600',
    gradient: 'from-violet-50 to-transparent',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200/50',
    iconBg: 'bg-amber-100',
    icon: 'text-amber-600',
    gradient: 'from-amber-50 to-transparent',
  },
}

type AccentKey = keyof typeof moduleAccents

// Video Placeholder component for module cards
function VideoPlaceholder({ icon: Icon, accent = 'teal' }: { icon: React.ElementType; accent?: AccentKey }) {
  const colors = moduleAccents[accent]
  return (
    <div className={`aspect-video ${colors.bg} rounded-lg flex flex-col items-center justify-center gap-2 border border-dashed ${colors.border}`}>
      <div className={`w-12 h-12 rounded-full ${colors.iconBg} flex items-center justify-center`}>
        <Play className={`w-5 h-5 ${colors.icon} ml-0.5`} />
      </div>
      <div className="flex items-center gap-1.5 text-[#5a6a6a] text-xs">
        <Icon className="w-3.5 h-3.5" />
        <span>Demo coming soon</span>
      </div>
    </div>
  )
}

const modules = [
  {
    id: 'cv',
    icon: FileText,
    label: 'CV',
    title: 'AI-crafted resumes',
    description: 'Create professional, ATS-friendly resumes that get you noticed.',
    features: ['12+ designed layouts', 'ATS optimization', 'One-click PDF export'],
  },
  {
    id: 'cover-letter',
    icon: ScrollText,
    label: 'Cover Letter',
    title: 'AI cover letters',
    description: 'Generate tailored cover letters matched to each job application.',
    features: ['AI-powered generation', 'Tone customization', 'PDF & DOCX export'],
  },
  {
    id: 'jobs',
    icon: Briefcase,
    label: 'Jobs',
    title: 'Smart job matching',
    description: 'Discover opportunities that align with your experience and goals.',
    features: ['AI match scoring', 'Multi-source aggregation', 'Application tracking'],
  },
  {
    id: 'emails',
    icon: Mail,
    label: 'Emails',
    title: 'Email management',
    description: 'Manage all your job search communications in one place.',
    features: ['Gmail & Outlook sync', 'Email templates', 'Meeting scheduling'],
  },
  {
    id: 'calendar',
    icon: CalendarDays,
    label: 'Calendar',
    title: 'Interview tracker',
    description: 'Stay on top of every interview and follow-up with ease.',
    features: ['Tracking & reminders', 'AI interview prep', 'Calendar sync'],
  },
]

function ModulesSection({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const [activeTab, setActiveTab] = useState(0)
  const activeModule = modules[activeTab]

  return (
    <section id="modules" className="relative px-6 py-24 bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="modules-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#1a4a4a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#modules-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
            Five powerful modules, one platform
          </h2>
          <p className="text-[#5a6a6a] text-lg max-w-xl mx-auto">
            Everything you need to manage your job search from start to finish
          </p>
        </motion.div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            const isActive = i === activeTab
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1a4a4a] text-white'
                    : 'bg-[#1a4a4a]/5 text-[#3a4a4a] hover:bg-[#1a4a4a]/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {mod.label}
              </button>
            )
          })}
        </div>

        {/* Video + details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            <VideoPlaceholder icon={activeModule.icon} />

            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-[#1a2a2a] mb-2">
                {activeModule.title}
              </h3>
              <p className="text-[#5a6a6a] mb-4 max-w-lg mx-auto">
                {activeModule.description}
              </p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {activeModule.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#5a6a6a]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a]/20" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// CV Style Card - Real CV preview using ScaledCVPreview component
function CVStyleCard({ cvData }: { cvData: Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'> }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2, ease: easeOut } }}
      className="flex justify-center"
    >
      <ScaledCVPreview cvData={cvData} scale={0.42} />
    </motion.div>
  )
}

export function LandingContent() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToModules = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <MarketingNav variant="landing" />

      {/* Hero Section - full screen height below navbar */}
      <section className="relative flex-1 min-h-0 flex flex-col px-6 pt-16 pb-32 min-h-[calc(100dvh-5rem)] overflow-hidden">
        <div className="max-w-6xl mx-auto flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="relative z-10"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a4a4a]/5 text-[#1a4a4a] text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a4a4a] animate-pulse" />
                  AI-Powered Career Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a2a2a] leading-[1.05] tracking-tight mb-6"
              >
                Your career,
                <br />
                <span className="text-[#1a4a4a]">intelligently managed</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[#5a6a6a] leading-relaxed max-w-md mb-10"
              >
                From crafting the perfect resume to landing interviews—one platform handles your entire job search with AI-powered precision.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
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
              className="relative size-[320px] sm:size-[360px] lg:w-[440px] h-[400px]"
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

      {/* Modules Section */}
      <ModulesSection shouldReduceMotion={shouldReduceMotion} />

      {/* Choose Your Style Section */}
      <section className="relative px-6 py-24 bg-[#faf9f7]">
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
              30+ professional templates designed for every industry and career stage—or create your own
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

      {/* Features Section - Alternating Layout */}
      <section className="relative px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
              Built for your entire job search
            </h2>
            <p className="text-[#5a6a6a] text-lg max-w-xl mx-auto">
              See how each module helps you move forward
            </p>
          </motion.div>

          <div className="space-y-20 lg:space-y-28">
            <FeatureShowcase
              title="Craft the perfect resume"
              description="Edit your CV in a split-screen layout with live preview. See every change instantly as you type, ensuring your resume looks exactly how you want it."
              bullets={[
                'Section-based editing',
                'Real-time preview updates',
                'Multiple export formats (PDF, DOCX)',
              ]}
              mockup={<CVCreatorFeatureMockup />}
            />

            <FeatureShowcase
              title="Evaluate your CV instantly"
              description="Get a detailed AI-powered evaluation of your resume with scores, issue detection, and one-click fixes. See exactly what to improve to stand out."
              bullets={[
                'Overall, ATS, and keyword scores',
                'Issue detection with severity levels',
                'AI-powered one-click fixes',
              ]}
              mockup={<CVEvaluationFeatureMockup />}
              reverse
            />

            <FeatureShowcase
              title="Find jobs that match your skills"
              description="Our AI analyzes your CV and searches for the most relevant job opportunities with match scores. Browse detailed job listings and easily check if a role is the right fit."
              bullets={[
                'AI-powered match scoring',
                'Advanced filters and saved searches',
                'Easy job details review',
              ]}
              mockup={<JobsFeatureMockup />}
            />

            <FeatureShowcase
              title="Manage all your conversations"
              description="Keep every job search email in one place. View threads, compose replies, and never lose track of an important message from a recruiter."
              bullets={[
                'Gmail and Outlook integration',
                'Thread-based conversation view',
                'Quick reply templates',
              ]}
              mockup={<EmailsFeatureMockup />}
              reverse
            />

            <FeatureShowcase
              title="Stay on top of interviews"
              description="See all your scheduled interviews at a glance. Get reminders, prepare with AI-generated questions, and track your progress through each hiring pipeline."
              bullets={[
                'Calendar sync with Google & Outlook',
                'Interview prep materials',
                'Automatic reminders',
              ]}
              mockup={<CalendarFeatureMockup />}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section - transform-never-scale-zero: never animate from scale(0), keep >=0.95 */}
      <section className="relative px-6 py-24">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 sm:p-16 rounded-3xl bg-[#1a4a4a] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

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

      {/* Footer */}
      <MarketingFooter />
    </div>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Briefcase, Mail, CalendarDays, Play } from 'lucide-react'
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

// Module Card component
function ModuleCard({
  icon: Icon,
  title,
  description,
  features,
  accent = 'teal',
}: {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  accent?: AccentKey
}) {
  const colors = moduleAccents[accent]
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={fadeUp}
      // Removed scale on hover - only lift (transform-scale-097 is for press, not hover)
      whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.2, ease: easeOut } }}
      className="group relative p-5 rounded-2xl bg-white border border-[#e8e4df] hover:border-[#1a4a4a]/30 hover:shadow-xl transition-all overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${colors.gradient} pointer-events-none`} />

      <div className="relative">
        <VideoPlaceholder icon={Icon} accent={'teal'} />
        <div className="mt-4 flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <h3 className="text-lg font-semibold text-[#1a2a2a]">{title}</h3>
        </div>
        <p className="text-[#5a6a6a] text-sm mb-3">{description}</p>
        <ul className="space-y-1.5">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-[#5a6a6a]">
              <div className={`w-1.5 h-1.5 rounded-full ${colors.iconBg}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Desktop Stepper Track - horizontal line with step circles
function StepperTrack({ steps }: { steps: number }) {
  return (
    <div className="hidden lg:grid grid-cols-4 gap-6 mb-8">
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className="flex items-center justify-center relative">
          {/* Connector line to next step */}
          {i < steps - 1 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#1a4a4a]/40"
              style={{ left: 'calc(50% + 1.25rem)', width: 'calc(100% + 1.5rem - 2.5rem)' }}
            />
          )}
          {/* Step circle */}
          <div
            className="w-10 h-10 rounded-full bg-[#1a4a4a] flex items-center justify-center text-white font-semibold shadow-md z-10"
            aria-hidden="true"
          >
            {i + 1}
          </div>
        </div>
      ))}
    </div>
  )
}

// Step Module Card for journey stepper
function StepModuleCard({
  step,
  icon: Icon,
  title,
  description,
  features,
  accent = 'teal',
  isLast = false,
}: {
  step: number
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  accent?: AccentKey
  isLast?: boolean
}) {
  const colors = moduleAccents[accent]

  return (
    <div className="relative">
      {/* Mobile step indicator with vertical timeline */}
      <div className="flex lg:hidden gap-4">
        <div className="flex flex-col items-center">
          <div
            className="w-10 h-10 rounded-full bg-[#1a4a4a] flex items-center justify-center text-white font-semibold shadow-md shrink-0"
            aria-hidden="true"
          >
            {step}
          </div>
          {!isLast && (
            <div className="w-0.5 flex-1 bg-[#1a4a4a]/20 mt-2 min-h-[calc(100%-3rem)]" />
          )}
        </div>

        {/* Mobile card content */}
        <motion.div
          variants={fadeUp}
          className="group relative p-5 rounded-2xl bg-white border border-[#e8e4df] hover:border-[#1a4a4a]/30 hover:shadow-xl transition-all overflow-hidden flex-1 mb-4"
        >
          {/* Subtle gradient accent */}
          <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${colors.gradient} pointer-events-none`} />

          <div className="relative">
            <VideoPlaceholder icon={Icon} accent={'teal'} />
            <div className="mt-4 flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <h3 className="text-lg font-semibold text-[#1a2a2a]">{title}</h3>
            </div>
            <p className="text-[#5a6a6a] text-sm mb-3">{description}</p>
            <ul className="space-y-1.5">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[#5a6a6a]">
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.iconBg}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Desktop card content (no badge, stepper track handles that) */}
      <motion.div
        variants={fadeUp}
        className="hidden lg:block group relative p-5 rounded-2xl bg-white border border-[#e8e4df] hover:border-[#1a4a4a]/30 hover:shadow-xl transition-all overflow-hidden h-full"
      >
        {/* Subtle gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${colors.gradient} pointer-events-none`} />

        <div className="relative">
          <VideoPlaceholder icon={Icon} accent={'teal'} />
          <div className="mt-4 flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className={`w-4 h-4 ${colors.icon}`} />
            </div>
            <h3 className="text-lg font-semibold text-[#1a2a2a]">{title}</h3>
          </div>
          <p className="text-[#5a6a6a] text-sm mb-3">{description}</p>
          <ul className="space-y-1.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[#5a6a6a]">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.iconBg}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
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

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToModules = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation - timing-300ms-max: keep under 300ms */}
      <motion.nav
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="relative z-10 px-6 py-5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1a2a2a] text-lg tracking-tight">Extend Career</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-[#3a4a4a] hover:text-[#1a2a2a]">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#1a4a4a] hover:bg-[#0d3535] text-white px-5">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-32">
        <div className="max-w-6xl mx-auto">
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
            <div className="relative size-[320px] sm:size-[360px] lg:w-[440px] h-[400px]">
              {/* Center: 4x4 dot grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 gap-2 lg:gap-2.5">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="size-1.5 lg:size-2 rounded-full bg-[#1a4a4a]/20" />
                ))}
              </div>

              {/* CV - top left corner (polish-reduced-motion: use opacity fallback) */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
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

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2a2a] mb-4">
              Four powerful modules, one platform
            </h2>
            <p className="text-[#5a6a6a] text-lg max-w-xl mx-auto">
              Everything you need to manage your job search from start to finish
            </p>
          </motion.div>

          {/* Desktop Stepper Track */}
          <StepperTrack steps={4} />

          {/* Module Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            <StepModuleCard
              step={1}
              icon={FileText}
              title="AI-crafted resumes"
              description="Create professional, ATS-friendly resumes that get you noticed."
              features={[
                '12+ designed layouts',
                'ATS optimization',
                'One-click PDF export',
              ]}
              accent="teal"
            />
            <StepModuleCard
              step={2}
              icon={Briefcase}
              title="Smart job matching"
              description="Discover opportunities that align with your experience and goals."
              features={[
                'AI match scoring',
                'Multi-source aggregation',
                'Application tracking',
              ]}
              accent="teal"
            />
            <StepModuleCard
              step={3}
              icon={Mail}
              title="Email management"
              description="Manage all your job search communications in one place."
              features={[
                'Gmail & Outlook sync',
                'Email templates',
                'Meeting scheduling',
              ]}
              accent="teal"
            />
            <StepModuleCard
              step={4}
              icon={CalendarDays}
              title="Interview tracker"
              description="Stay on top of every interview and follow-up with ease."
              features={[
                'Tracking & reminders',
                'AI interview prep',
                'Calendar sync',
              ]}
              accent="teal"
              isLast
            />
          </motion.div>
        </div>
      </section>

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
                'Section-based editing with drag & drop',
                'Real-time preview updates',
                'Multiple export formats (PDF, DOCX)',
              ]}
              mockup={<CVCreatorFeatureMockup />}
            />

            <FeatureShowcase
              title="Find jobs that match your skills"
              description="Our AI analyzes your experience and shows you the most relevant opportunities with match scores. Filter by location, salary, and more to find your ideal role."
              bullets={[
                'AI-powered match scoring',
                'Advanced filters and saved searches',
                'One-click application tracking',
              ]}
              mockup={<JobsFeatureMockup />}
              reverse
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
              reverse
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
      <footer className="px-6 py-8 border-t border-[#e8e4df]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1a4a4a] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <span className="text-sm text-[#5a6a6a]">Extend Career</span>
          </div>
          <p className="text-sm text-[#8a9a9a]">
            Built with care for your career
          </p>
        </div>
      </footer>
    </div>
  )
}

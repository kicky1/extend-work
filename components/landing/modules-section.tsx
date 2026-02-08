'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { VideoPlayer } from './video-player'
import { DotPattern } from './dot-pattern'
import { easeOut, modules, moduleAccents, moduleVideoKeys, allVideoUrls } from './constants'
import type { AccentKey } from './types'

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

export function ModulesSection() {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState(0)
  const activeModule = modules[activeTab]

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % modules.length)
  }, [])

  const hasVideo = activeModule.id in moduleVideoKeys
  useEffect(() => {
    if (hasVideo) return
    const timer = setTimeout(advanceTab, 5000)
    return () => clearTimeout(timer)
  }, [hasVideo, advanceTab, activeTab])

  return (
    <section id="modules" className="relative px-6 py-16 sm:py-24 bg-white overflow-hidden">
      <DotPattern id="modules-grid" size={60} dotRadius={1.5} dotX={30} dotY={30} opacity={0.015} />

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

        {/* Video — swaps instantly, no animation */}
        {(() => {
          const key = moduleVideoKeys[activeModule.id]
          return key ? (
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#e8e4df] bg-[#1a2a2a]">
              <VideoPlayer
                src={`https://utfs.io/f/${key}`}
                prefetchSrcs={allVideoUrls}
                className="w-full block"
                autoPlay
                muted
                onEnded={advanceTab}
              />
            </div>
          ) : (
            <VideoPlaceholder icon={activeModule.icon} />
          )
        })()}

        {/* Text details — animate on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="mt-6 text-center"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

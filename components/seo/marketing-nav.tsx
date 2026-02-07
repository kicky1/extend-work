'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { toolItems, resourceItems } from '@/lib/marketing-nav-data'

const easeOut = [0.22, 1, 0.36, 1] as const

export function MarketingNav({ variant }: { variant?: 'landing' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'tools' | 'resources' | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<'tools' | 'resources' | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change (link click)
  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileAccordion(null)
  }, [])

  const openDropdown = (key: 'tools' | 'resources') => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(key)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  const navMotion = variant === 'landing'
    ? {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25, ease: easeOut },
      }
    : {}

  return (
    <>
      <motion.nav
        {...navMotion}
        ref={navRef}
        className={`sticky top-0 z-50 px-6 py-3 transition-all duration-200 ${
          scrolled
            ? 'bg-[#faf9f7]/95 backdrop-blur-sm border-b border-[#e8e4df]'
            : 'bg-[#faf9f7]/95 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-[#1a2a2a] text-lg tracking-tight">
              Extend Career
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/resume-builder"
              className="text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a] transition-colors px-3 py-2 rounded-md hover:bg-[#1a4a4a]/5"
            >
              Resume Builder
            </Link>

            {/* AI Tools dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown('tools')}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  activeDropdown === 'tools'
                    ? 'text-[#1a2a2a] bg-[#1a4a4a]/5'
                    : 'text-[#3a4a4a] hover:text-[#1a2a2a] hover:bg-[#1a4a4a]/5'
                }`}
                onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
              >
                AI Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown('resources')}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  activeDropdown === 'resources'
                    ? 'text-[#1a2a2a] bg-[#1a4a4a]/5'
                    : 'text-[#3a4a4a] hover:text-[#1a2a2a] hover:bg-[#1a4a4a]/5'
                }`}
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link
              href="/pricing"
              className="text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a] transition-colors px-3 py-2 rounded-md hover:bg-[#1a4a4a]/5"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a] transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#1a4a4a] hover:bg-[#0d3535] text-white px-5 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-2 text-[#3a4a4a] hover:text-[#1a2a2a]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop mega-menu panels */}
        <AnimatePresence>
          {activeDropdown === 'tools' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: easeOut }}
              className="absolute left-0 right-0 top-full hidden lg:block"
              onMouseEnter={() => openDropdown('tools')}
              onMouseLeave={scheduleClose}
            >
              <div className="bg-[#faf9f7] border-b border-[#e8e4df] shadow-lg">
                <div className="max-w-6xl mx-auto p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {toolItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1a4a4a]/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#1a4a4a]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1a4a4a]/15 transition-colors">
                          <item.icon className="w-4.5 h-4.5 text-[#1a4a4a]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#1a2a2a] mb-0.5">{item.title}</div>
                          <div className="text-xs text-[#5a6a6a] leading-relaxed">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeDropdown === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: easeOut }}
              className="absolute left-0 right-0 top-full hidden lg:block"
              onMouseEnter={() => openDropdown('resources')}
              onMouseLeave={scheduleClose}
            >
              <div className="bg-[#faf9f7] border-b border-[#e8e4df] shadow-lg">
                <div className="max-w-6xl mx-auto p-6">
                  <div className="grid grid-cols-4 gap-3">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1a4a4a]/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#1a4a4a]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1a4a4a]/15 transition-colors">
                          <item.icon className="w-4.5 h-4.5 text-[#1a4a4a]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#1a2a2a] mb-0.5">{item.title}</div>
                          <div className="text-xs text-[#5a6a6a] leading-relaxed">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#faf9f7] z-50 flex flex-col shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#e8e4df]">
                <span className="font-semibold text-[#1a2a2a]">Menu</span>
                <button
                  onClick={closeMobile}
                  className="p-1 text-[#3a4a4a] hover:text-[#1a2a2a]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <Link
                  href="/resume-builder"
                  onClick={closeMobile}
                  className="block px-6 py-2.5 text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a]"
                >
                  Resume Builder
                </Link>

                {/* AI Tools accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'tools' ? null : 'tools')}
                    className="flex items-center justify-between w-full px-6 py-2.5 text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a]"
                  >
                    AI Tools
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'tools' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'tools' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2">
                          {toolItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMobile}
                              className="flex items-center gap-3 px-8 py-2 text-sm text-[#5a6a6a] hover:text-[#1a2a2a]"
                            >
                              <item.icon className="w-4 h-4 text-[#1a4a4a]/60" />
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Resources accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'resources' ? null : 'resources')}
                    className="flex items-center justify-between w-full px-6 py-2.5 text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a]"
                  >
                    Resources
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'resources' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'resources' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2">
                          {resourceItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMobile}
                              className="flex items-center gap-3 px-8 py-2 text-sm text-[#5a6a6a] hover:text-[#1a2a2a]"
                            >
                              <item.icon className="w-4 h-4 text-[#1a4a4a]/60" />
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/pricing"
                  onClick={closeMobile}
                  className="block px-6 py-2.5 text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a]"
                >
                  Pricing
                </Link>
              </div>

              {/* Bottom auth buttons */}
              <div className="p-4 border-t border-[#e8e4df] space-y-2">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="block text-center text-sm font-medium text-[#3a4a4a] hover:text-[#1a2a2a] py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobile}
                  className="block text-center text-sm font-medium bg-[#1a4a4a] hover:bg-[#0d3535] text-white px-5 py-2.5 rounded-lg transition-colors"
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

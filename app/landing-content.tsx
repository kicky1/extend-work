'use client'

import dynamic from 'next/dynamic'
import { MarketingNav } from '@/components/seo/marketing-nav'
import { MarketingFooter } from '@/components/seo/marketing-footer'
import { HeroSection } from '@/components/landing/hero-section'

const ModulesSection = dynamic(() => import('@/components/landing/modules-section').then((m) => m.ModulesSection))
const CVCarouselSection = dynamic(() => import('@/components/landing/cv-carousel-section').then((m) => m.CVCarouselSection))
const FeaturesSection = dynamic(() => import('@/components/landing/features-section').then((m) => m.FeaturesSection))
const PricingSection = dynamic(() => import('@/components/landing/pricing-section').then((m) => m.PricingSection))
const CTASection = dynamic(() => import('@/components/landing/cta-section').then((m) => m.CTASection))

export function LandingContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <MarketingNav variant="landing" />
      <HeroSection />
      <ModulesSection />
      <CVCarouselSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <MarketingFooter />
    </div>
  )
}

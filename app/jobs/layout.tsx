import type { Metadata } from 'next'
import { ReactNode } from 'react'
import AppNavbar from '@/components/layout/app-navbar'

export const metadata: Metadata = {
  title: 'Jobs',
  robots: { index: false, follow: false },
}

interface JobsLayoutProps {
  children: ReactNode
}

export default function JobsLayout({ children }: JobsLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <AppNavbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}

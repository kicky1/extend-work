import type { Metadata } from 'next'
import { ReactNode } from 'react'
import AppNavbar from '@/components/layout/app-navbar'

export const metadata: Metadata = {
  title: 'Calendar',
  robots: { index: false, follow: false },
}

interface CalendarLayoutProps {
  children: ReactNode
}

export default function CalendarLayout({ children }: CalendarLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <AppNavbar />
      {children}
    </div>
  )
}

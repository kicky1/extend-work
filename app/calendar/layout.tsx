import { ReactNode } from 'react'
import AppNavbar from '@/components/layout/app-navbar'

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

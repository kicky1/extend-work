import { ReactNode } from 'react'
import AppNavbar from '@/components/layout/app-navbar'

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

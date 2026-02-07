import type { Metadata } from 'next'
import AppNavbar from '@/components/layout/app-navbar'
import { ComposeDialog } from '@/components/emails'

export const metadata: Metadata = {
  title: 'Emails',
  robots: { index: false, follow: false },
}

export default function EmailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <AppNavbar />
      {children}
      <ComposeDialog />
    </div>
  )
}

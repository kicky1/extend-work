import AppNavbar from '@/components/layout/app-navbar'
import { ComposeDialog } from '@/components/emails'

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

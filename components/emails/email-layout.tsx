'use client'

// This component is kept for backwards compatibility but is no longer used.
// The layout logic has been moved to the page components directly.

interface EmailLayoutProps {
  children: React.ReactNode
}

export function EmailLayout({ children }: EmailLayoutProps) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV Creator',
  robots: { index: false, follow: false },
}

export default function CVCreatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

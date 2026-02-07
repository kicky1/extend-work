import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cover Letter',
  robots: { index: false, follow: false },
}

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

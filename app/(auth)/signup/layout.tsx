import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up — Start Your AI-Powered Career Journey',
  description:
    'Create a free Extend Career account. Build ATS-optimized resumes, get AI-matched job recommendations, and manage your entire job search.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/signup' },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'
import { BookingCalendar } from '@/components/emails'
import { createClient } from '@/lib/supabase/server'

interface BookingPageProps {
  params: Promise<{ userId: string }>
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { userId } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('display_name, email')
    .eq('id', userId)
    .single()

  const hostName = profile?.display_name || profile?.email?.split('@')[0] || 'User'

  return {
    title: `Book a Meeting with ${hostName}`,
    description: `Schedule a meeting with ${hostName} on Extend Career.`,
    robots: { index: true, follow: true },
    alternates: { canonical: `/schedule/${userId}` },
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { userId } = await params
  const supabase = await createClient()

  // Get user profile for display name
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('display_name, email')
    .eq('id', userId)
    .single()

  const hostName = profile?.display_name || profile?.email?.split('@')[0] || undefined

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <BookingCalendar userId={userId} hostName={hostName} />
    </div>
  )
}

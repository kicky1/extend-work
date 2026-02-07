import { getCompetitor } from '@/lib/seo/data/competitors'
import { generateOGImage } from '@/components/seo/og-image'

export const runtime = 'edge'
export const alt = 'Resume Builder Alternatives'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const competitor = getCompetitor(slug)
  const name = competitor?.name ?? 'Competitor'

  return generateOGImage({
    title: `Best ${name} Alternatives`,
    subtitle: 'Compare features, pricing, and find the right tool',
    badge: 'Alternatives',
  })
}

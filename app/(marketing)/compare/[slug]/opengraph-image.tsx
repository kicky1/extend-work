import { getCompetitor } from '@/lib/seo/data/competitors'
import { parseCompareSlug } from '@/lib/seo/utils'
import { generateOGImage } from '@/components/seo/og-image'

export const runtime = 'edge'
export const alt = 'Extend Career Comparison'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const parsed = parseCompareSlug(slug)
  const competitor = parsed ? getCompetitor(parsed.competitor) : null
  const name = competitor?.name ?? 'Competitor'

  return generateOGImage({
    title: `Extend Career vs ${name}`,
    subtitle: 'Side-by-side feature, pricing & rating comparison',
    badge: 'Comparison',
  })
}

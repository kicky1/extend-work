import { getBestOfCategory } from '@/lib/seo/data/categories'
import { generateOGImage } from '@/components/seo/og-image'

export const runtime = 'edge'
export const alt = 'Best Career Tools'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getBestOfCategory(slug)
  const title = category?.title ?? 'Best Career Tools'

  return generateOGImage({
    title,
    subtitle: 'Expert-reviewed and ranked',
    badge: 'Best Of',
  })
}

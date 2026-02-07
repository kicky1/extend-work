import { getUseCase } from '@/lib/seo/data/use-cases'
import { generateOGImage } from '@/components/seo/og-image'

export const runtime = 'edge'
export const alt = 'Career Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const uc = getUseCase(slug)
  const title = uc?.title ?? 'Career Guide'

  return generateOGImage({
    title,
    subtitle: uc?.subtitle,
    badge: `${uc?.readTimeMinutes ?? 10} min read`,
  })
}

import type { MetadataRoute } from 'next'
import { competitors } from '@/lib/seo/data/competitors'
import { useCases } from '@/lib/seo/data/use-cases'
import { bestOfCategories } from '@/lib/seo/data/categories'
import { competitorSlugToCompareSlug } from '@/lib/seo/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Hub pages
  const hubPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/compare`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: new Date() },
    { url: `${siteUrl}/best`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: new Date() },
    { url: `${siteUrl}/alternatives`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: new Date() },
    { url: `${siteUrl}/guides`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: new Date() },
  ]

  // Comparison pages
  const comparePages: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${siteUrl}/compare/${competitorSlugToCompareSlug(c.slug)}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Alternatives pages
  const alternativesPages: MetadataRoute.Sitemap = competitors.map((c) => ({
    url: `${siteUrl}/alternatives/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Best-of pages
  const bestPages: MetadataRoute.Sitemap = bestOfCategories.map((c) => ({
    url: `${siteUrl}/best/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = useCases.map((uc) => ({
    url: `${siteUrl}/guides/${uc.slug}`,
    lastModified: new Date(uc.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...hubPages,
    ...comparePages,
    ...alternativesPages,
    ...bestPages,
    ...guidePages,
  ]
}

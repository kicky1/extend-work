import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export function generateCompareMetadata(competitorName: string, slug: string): Metadata {
  const title = `Extend Career vs ${competitorName}: Detailed Comparison (2025)`
  const description = `Compare Extend Career and ${competitorName} side-by-side. See features, pricing, ratings, and which AI resume builder is better for your career goals.`
  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/compare/${slug}`,
      type: 'website',
    },
  }
}

export function generateBestOfMetadata(title: string, description: string, slug: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `/best/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/best/${slug}`,
      type: 'website',
    },
  }
}

export function generateAlternativesMetadata(competitorName: string, slug: string): Metadata {
  const title = `Best ${competitorName} Alternatives in 2025`
  const description = `Looking for a ${competitorName} alternative? Compare the top AI resume builders and career platforms. Find the best option for your job search.`
  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/alternatives/${slug}`,
      type: 'website',
    },
  }
}

export function generateGuideMetadata(metaTitle: string, metaDescription: string, slug: string): Metadata {
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${siteUrl}/guides/${slug}`,
      type: 'article',
    },
  }
}

export function generateMarketingPageMetadata(slug: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}`,
      type: 'website',
    },
  }
}

export function generateHubMetadata(
  type: 'compare' | 'best' | 'alternatives' | 'guides',
): Metadata {
  const meta: Record<string, { title: string; description: string }> = {
    compare: {
      title: 'Resume Builder Comparisons — Extend Career vs Competitors',
      description:
        'Compare Extend Career with other resume builders. Side-by-side feature, pricing, and rating comparisons to find the best career platform.',
    },
    best: {
      title: 'Best AI Resume Builders & Career Tools (2025)',
      description:
        'Curated lists of the best AI resume builders, career platforms, and job search tools. Expert-reviewed and ranked.',
    },
    alternatives: {
      title: 'Resume Builder Alternatives — Find the Right Tool',
      description:
        'Explore the best alternatives to popular resume builders. Compare features, pricing, and find the right career platform for you.',
    },
    guides: {
      title: 'Career Guides — Resume Tips, Job Search & Interview Prep',
      description:
        'Expert career guides on resume writing, job search strategy, interview preparation, and career transitions. Actionable advice for every stage.',
    },
  }

  const { title, description } = meta[type]
  return {
    title,
    description,
    alternates: { canonical: `/${type}` },
    openGraph: { title, description, url: `${siteUrl}/${type}`, type: 'website' },
  }
}

import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-new-christian-right-church-dire.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/submit`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/hymnal`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/hymnal/bible`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/hymnal/creeds`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/hymnal/plans`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/hymnal/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/hymnal/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/install`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const hymnalPages: MetadataRoute.Sitemap = HYMNALS.map((h) => ({
    url: `${BASE_URL}/hymnal/library/${h.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const biblePages: MetadataRoute.Sitemap = BIBLES.map((b) => ({
    url: `${BASE_URL}/hymnal/bible/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  let churchPages: MetadataRoute.Sitemap = []
  try {
    const churches = await prisma.church.findMany({
      where: { approved: true },
      select: { id: true, updatedAt: true },
    })
    churchPages = churches.map((church) => ({
      url: `${BASE_URL}/church/${church.id}`,
      lastModified: church.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // If DB fetch fails, skip dynamic pages
  }

  return [...staticPages, ...hymnalPages, ...biblePages, ...churchPages]
}

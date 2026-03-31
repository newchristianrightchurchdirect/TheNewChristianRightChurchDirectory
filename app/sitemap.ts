import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://churchdirectory.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

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

  return [...staticPages, ...churchPages]
}

import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://churchdirectory.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/manage-7x9k'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

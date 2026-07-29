import type { NextConfig } from 'next'

// Hymnal media (~8.8 GB) lives in Cloudflare R2, not in this repo. Every stored URL
// is still the original root-relative /hymnal-media/... path, so a single redirect
// keeps all ~9,300 references in public/hymnal-data working untouched.
const R2_MEDIA_BASE =
  process.env.R2_PUBLIC_BASE || 'https://pub-b8dc00d812664ce881f8caec216f07d3.r2.dev'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/hymnal-media/:path*',
        destination: `${R2_MEDIA_BASE}/:path*`,
        permanent: false,
      },
    ]
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data: blob:",
      "font-src 'self' data:",
      "media-src 'self' https: blob:",
      // R2 origin is required: SheetMusic does a HEAD fetch against /hymnal-media/...,
      // which now 307s cross-origin to the media bucket.
      `connect-src 'self' https://nominatim.openstreetmap.org ${R2_MEDIA_BASE}`,
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig

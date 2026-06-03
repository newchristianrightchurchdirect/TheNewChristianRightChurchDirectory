import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NXR Hymnal',
    short_name: 'NXR Hymnal',
    description: 'Psalters, hymnals, Bible translations, and confessions for daily worship. Offline-ready.',
    start_url: '/hymnal',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0d0b07',
    theme_color: '#0d0b07',
    categories: ['books', 'education', 'religion'],
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Bible', url: '/hymnal/bible' },
      { name: 'Hymnals', url: '/hymnal' },
      { name: 'Creeds', url: '/hymnal/creeds' },
      { name: 'Search', url: '/hymnal/search' },
    ],
  }
}

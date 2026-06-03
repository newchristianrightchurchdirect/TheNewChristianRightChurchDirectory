import type { Metadata, Viewport } from 'next'
import HymnalChrome from '@/components/hymnal/HymnalChrome'

export const metadata: Metadata = {
  title: {
    default: 'NXR Hymnal',
    template: '%s — NXR Hymnal',
  },
  description: 'Psalters, hymnals, Bible translations, and confessions for daily worship. Installable, offline-ready.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NXR Hymnal',
  },
}

export const viewport: Viewport = {
  themeColor: '#faf6ec',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function HymnalLayout({ children }: { children: React.ReactNode }) {
  return <HymnalChrome>{children}</HymnalChrome>
}

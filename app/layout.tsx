import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: {
    default: 'The New Christian Right Church Directory — Churches Contending for the Crown Rights of Christ',
    template: '%s — The New Christian Right',
  },
  description: 'Identifying Bible-believing churches across America that confess Christ&apos;s lordship over the public square and act on it as churches. A reader-supported, editorially independent directory of confessional congregations.'.replace('&apos;', "'"),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The New Christian Right Church Directory',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'The New Christian Right Church Directory' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2"
          style={{ background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' }}
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}

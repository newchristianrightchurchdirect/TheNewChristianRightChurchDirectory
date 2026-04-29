import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: {
    default: 'The New Christian Right Church Directory — A Directory of Faithful Churches',
    template: '%s — The New Christian Right',
  },
  description: 'Identifying anti-Zionist, Bible-believing churches across America. A reader-supported, editorially independent directory of confessional congregations.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The New Christian Right Church Directory',
  },
  twitter: {
    card: 'summary_large_image',
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

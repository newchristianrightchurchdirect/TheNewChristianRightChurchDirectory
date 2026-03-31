import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: {
    default: 'The New Christian Right Church Directory — Find Non-Zionist Churches Across America',
    template: '%s — Church Directory',
  },
  description: 'Identify non-Zionist, Bible-believing churches across the United States. Search by location, denomination, and theological stance. Community-driven directory with upvotes and reporting.',
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-navy focus:text-gold focus:rounded-lg focus:font-body focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <footer className="bg-navy border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gold text-lg">&#10013;</span>
                <span className="font-display text-sm text-gold/80">The New Christian Right Church Directory</span>
              </div>
              <p className="font-body text-xs text-white/40">
                &copy; {new Date().getFullYear()} The New Christian Right Church Directory. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

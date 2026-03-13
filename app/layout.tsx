import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'The New Christian Right Church Directory — Find Non-Zionist Churches Across America',
  description: 'Identify non-Zionist, Bible-believing churches across the United States. Search by location, denomination, and theological stance. Community-driven directory with upvotes and reporting.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
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

import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — Church Directory',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-ivory flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <p className="font-display text-7xl font-bold text-gold/30 mb-2">404</p>
        <h1 className="font-display text-2xl font-bold text-navy mb-3">Page Not Found</h1>
        <p className="font-body text-sm text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/"
            className="block bg-white rounded-xl border border-cream p-4 hover:shadow-md hover:border-gold/20 transition-all"
          >
            <p className="font-display text-sm font-semibold text-navy">Directory</p>
            <p className="font-body text-xs text-gray-400 mt-0.5">Browse churches</p>
          </Link>
          <Link
            href="/submit"
            className="block bg-white rounded-xl border border-cream p-4 hover:shadow-md hover:border-gold/20 transition-all"
          >
            <p className="font-display text-sm font-semibold text-navy">Submit</p>
            <p className="font-body text-xs text-gray-400 mt-0.5">Add a church</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

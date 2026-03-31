'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] bg-navy flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h1 className="font-display text-5xl font-bold text-gold mb-4">Error</h1>
        <div className="w-12 h-[2px] bg-gold/40 mx-auto mb-6"></div>
        <p className="font-body text-white/60 mb-8">
          Something went wrong. Please try again or return to the directory.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gold text-white font-body text-sm font-semibold rounded-xl hover:bg-gold-light transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-white/20 text-white font-body text-sm font-semibold rounded-xl hover:border-white/40 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

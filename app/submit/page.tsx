import SubmitForm from '@/components/SubmitForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a Church',
  description: 'Submit a church to be reviewed and added to the directory. Help us identify non-Zionist congregations.',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero banner */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-gold text-sm">&#10013;</span>
            <span className="font-body text-xs font-medium text-gold uppercase tracking-wider">Community Submission</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Submit a <span className="text-gold">Church</span>
          </h1>
          <p className="font-body text-white/50 mt-4 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
            Help us build the directory. Submit a church and let us know its theological stance.
            All submissions are reviewed before being published.
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      {/* Form section */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <SubmitForm />

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-gray-500 hover:text-navy transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>
      </div>
    </div>
  )
}

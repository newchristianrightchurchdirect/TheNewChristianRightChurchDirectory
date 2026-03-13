import SubmitForm from '@/components/SubmitForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a Church — The New Christian Right Church Directory',
  description: 'Submit a conservative church to be added to our directory.',
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold-pale/60 border border-gold/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-gold text-sm">&#10013;</span>
            <span className="font-body text-xs font-medium text-gold uppercase tracking-wider">Community Submission</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-navy">Submit a Church</h1>
          <p className="font-body text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Know a solid, Bible-believing church? Add it to our directory. All submissions are reviewed before being published.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-cream p-6 sm:p-8">
          <SubmitForm />
        </div>
      </div>
    </div>
  )
}

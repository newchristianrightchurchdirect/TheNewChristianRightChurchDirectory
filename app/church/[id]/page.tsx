'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

interface Church {
  id: number
  name: string
  denomination: string | null
  address: string
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  website: string | null
  phone: string | null
  zionistStance: string
  theologicalNotes: string | null
  description: string | null
  upvotes: number
}

const REPORT_REASONS = [
  { value: 'wrong_stance', label: 'Zionist stance is incorrect' },
  { value: 'wrong_info', label: 'Other information is wrong' },
  { value: 'closed', label: 'Church is permanently closed' },
  { value: 'duplicate', label: 'Duplicate listing' },
  { value: 'other', label: 'Other' },
]

function StanceBadge({ stance }: { stance: string }) {
  if (stance === 'no') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-body font-bold text-gold bg-gold-pale/80 px-4 py-2 rounded-full border border-gold/25 uppercase tracking-wider">
        &#10013; Non-Zionist
      </span>
    )
  }
  if (stance === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-burgundy/70 bg-burgundy/10 px-4 py-2 rounded-full border border-burgundy/15 uppercase tracking-wider">
        Zionist
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-body font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 uppercase tracking-wider">
      Unknown Stance
    </span>
  )
}

export default function ChurchDetailPage() {
  const { id } = useParams()
  const [church, setChurch] = useState<Church | null>(null)
  const [loading, setLoading] = useState(true)
  const [upvotes, setUpvotes] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportDetails, setReportDetails] = useState('')
  const [reportStatus, setReportStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    fetch(`/api/churches/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setChurch(data)
        if (data) setUpvotes(data.upvotes)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleUpvote = async () => {
    if (hasVoted) return
    setHasVoted(true)
    setUpvotes(prev => prev + 1)
    await fetch(`/api/churches/${id}/upvote`, { method: 'POST' })
  }

  const handleReport = async () => {
    if (!reportReason) return
    setReportStatus('sending')
    await fetch(`/api/churches/${id}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: reportReason, details: reportDetails }),
    })
    setReportStatus('sent')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!church) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Church Not Found</h1>
          <Link href="/" className="font-body text-sm text-gold hover:text-gold-light mt-4 inline-block">
            &larr; Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Mini map */}
      {church.latitude && church.longitude && (
        <div className="h-[30vh] sm:h-[35vh] relative">
          <MapView churches={[church]} />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 font-body text-sm text-gold hover:text-gold-light transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Directory
        </Link>

        <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-cream p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy">{church.name}</h1>
              {church.denomination && (
                <p className="font-body text-sm font-medium text-burgundy mt-2 uppercase tracking-wide">{church.denomination}</p>
              )}
            </div>
            <StanceBadge stance={church.zionistStance} />
          </div>

          {/* Description */}
          {church.description && (
            <p className="font-body text-gray-600 leading-relaxed mb-6">{church.description}</p>
          )}

          {/* Theological Notes */}
          {church.theologicalNotes && (
            <div className="bg-ivory rounded-xl p-4 mb-6 border border-cream">
              <h3 className="font-display text-sm font-semibold text-navy uppercase tracking-wide mb-2">Theological Notes</h3>
              <p className="font-body text-sm text-gray-600 leading-relaxed">{church.theologicalNotes}</p>
            </div>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-body text-sm font-medium text-navy">Address</p>
                <p className="font-body text-sm text-gray-500">{church.address}</p>
                <p className="font-body text-sm text-gray-500">{church.city}, {church.state} {church.zip}</p>
              </div>
            </div>
            {church.website && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div>
                  <p className="font-body text-sm font-medium text-navy">Website</p>
                  <a href={church.website} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-gold hover:text-gold-light transition-colors">
                    {church.website}
                  </a>
                </div>
              </div>
            )}
            {church.phone && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-body text-sm font-medium text-navy">Phone</p>
                  <a href={`tel:${church.phone}`} className="font-body text-sm text-gray-500 hover:text-navy transition-colors">
                    {church.phone}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-gray-100">
            <button
              onClick={handleUpvote}
              disabled={hasVoted}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all ${
                hasVoted
                  ? 'bg-gold/10 text-gold border border-gold/20 cursor-default'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gold/30 hover:text-gold active:scale-95'
              }`}
            >
              <svg className="w-4 h-4" fill={hasVoted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              {upvotes} {upvotes === 1 ? 'Upvote' : 'Upvotes'}
            </button>

            <button
              onClick={() => setShowReport(!showReport)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm text-gray-400 hover:text-burgundy hover:bg-burgundy/5 border border-transparent hover:border-burgundy/15 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Report Incorrect Info
            </button>
          </div>

          {/* Report Form */}
          {showReport && (
            <div className="mt-4 bg-ivory rounded-xl p-4 border border-cream animate-fade-in-up" style={{ opacity: 1 }}>
              {reportStatus === 'sent' ? (
                <p className="font-body text-sm text-green-700">Thank you. Your report has been submitted for review.</p>
              ) : (
                <div className="space-y-3">
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  >
                    <option value="">Select a reason...</option>
                    {REPORT_REASONS.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                  <textarea
                    value={reportDetails}
                    onChange={e => setReportDetails(e.target.value)}
                    placeholder="Additional details (optional)..."
                    rows={2}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
                  />
                  <button
                    onClick={handleReport}
                    disabled={!reportReason || reportStatus === 'sending'}
                    className="px-4 py-2 bg-burgundy text-white font-body text-sm font-medium rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
                  >
                    {reportStatus === 'sending' ? 'Sending...' : 'Submit Report'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

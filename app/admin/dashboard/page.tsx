'use client'

import { useState, useEffect, useCallback } from 'react'

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
  createdAt: string
}

const stanceLabels: Record<string, string> = {
  anti: 'Anti-Zionist',
  no: 'Non-Zionist',
  yes: 'Zionist',
  unknown: 'Unknown',
}

const stanceStyles: Record<string, string> = {
  anti: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  no: 'bg-gold-pale text-gold border-gold/30',
  yes: 'bg-burgundy/10 text-burgundy border-burgundy/20',
  unknown: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/submissions')
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const handleApprove = async (id: number) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/submissions/${id}/approve`, { method: 'POST' })
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id))
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: number) => {
    if (!confirm('Delete this submission permanently?')) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/submissions/${id}/reject`, { method: 'DELETE' })
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id))
      }
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy">Pending Submissions</h1>
          <p className="font-body text-sm text-gray-500 mt-1">
            {loading ? 'Loading...' : `${submissions.length} ${submissions.length === 1 ? 'church' : 'churches'} awaiting review`}
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          className="px-4 py-2 rounded-lg border border-gray-200 font-body text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-cream p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-display text-xl text-gray-400">All caught up!</p>
          <p className="font-body text-sm text-gray-400 mt-2">No pending submissions to review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map(church => (
            <div key={church.id} className="bg-white rounded-xl border border-cream shadow-sm hover:shadow-md transition-shadow">
              <div className="p-5 sm:p-6">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-lg font-semibold text-navy">{church.name}</h3>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${stanceStyles[church.zionistStance] || stanceStyles.unknown}`}>
                        {stanceLabels[church.zionistStance] || 'Unknown'}
                      </span>
                    </div>

                    {church.denomination && (
                      <p className="font-body text-xs text-burgundy uppercase tracking-wider font-semibold mt-1">{church.denomination}</p>
                    )}

                    <p className="font-body text-sm text-gray-600 mt-2">
                      {church.address} &middot; {church.city}, {church.state} {church.zip || ''}
                    </p>

                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="font-body text-xs text-gray-400">
                        Submitted {new Date(church.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {church.latitude && church.longitude ? (
                        <span className="font-body text-xs text-emerald-600">Geocoded</span>
                      ) : (
                        <span className="font-body text-xs text-amber-600">No coordinates</span>
                      )}
                      {(church.website || church.phone || church.description || church.theologicalNotes) && (
                        <button
                          onClick={() => setExpandedId(expandedId === church.id ? null : church.id)}
                          className="font-body text-xs text-gold hover:text-gold-light transition-colors"
                        >
                          {expandedId === church.id ? 'Less details' : 'More details'}
                        </button>
                      )}
                    </div>

                    {/* Expanded details */}
                    {expandedId === church.id && (
                      <div className="mt-4 space-y-3 border-t border-cream pt-4">
                        <div className="flex flex-wrap gap-x-5 gap-y-1">
                          {church.website && (
                            <a href={church.website} target="_blank" rel="noopener noreferrer" className="font-body text-xs text-gold hover:text-gold-light transition-colors">
                              {church.website}
                            </a>
                          )}
                          {church.phone && (
                            <span className="font-body text-xs text-gray-500">{church.phone}</span>
                          )}
                        </div>

                        {church.description && (
                          <div>
                            <p className="font-body text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1">Description</p>
                            <p className="font-body text-sm text-gray-600 leading-relaxed">{church.description}</p>
                          </div>
                        )}

                        {church.theologicalNotes && (
                          <div className="bg-ivory rounded-lg p-3 border border-cream">
                            <p className="font-body text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1">Theological Notes</p>
                            <p className="font-body text-sm text-gray-600">{church.theologicalNotes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 sm:ml-4 shrink-0">
                    <button
                      onClick={() => handleApprove(church.id)}
                      disabled={actionLoading === church.id}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 text-white font-body text-sm font-semibold rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {actionLoading === church.id ? '...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(church.id)}
                      disabled={actionLoading === church.id}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-white text-red-600 font-body text-sm font-semibold rounded-lg border border-red-200 hover:bg-red-50 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

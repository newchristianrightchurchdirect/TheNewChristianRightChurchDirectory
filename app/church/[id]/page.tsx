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
  email: string | null
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

const POSITION: Record<string, { cls: string; label: string }> = {
  anti: { cls: 'anti-zionist', label: '\u2020 Anti-Zionist' },
  no: { cls: 'non-zionist', label: 'Non-Zionist' },
  yes: { cls: 'zionist', label: 'Zionist' },
  unknown: { cls: 'unknown', label: 'Unverified' },
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
      <div className="page-wrap" style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-mute)' }}>
        Loading congregation&hellip;
      </div>
    )
  }

  if (!church) {
    return (
      <div className="page-wrap" style={{ textAlign: 'center' }}>
        <h1 className="page-h1">Church <em>Not Found</em></h1>
        <Link href="/" className="back-link">&larr; Back to Directory</Link>
      </div>
    )
  }

  const position = POSITION[church.zionistStance] || POSITION.unknown
  const pastorMatch = church.theologicalNotes?.match(/Pastor\s+([A-Z][A-Za-z'.\-]+(?:\s+[A-Z][A-Za-z'.\-]+){1,3})/)
  const pastor = pastorMatch ? pastorMatch[1] : null

  return (
    <div>
      {church.latitude != null && church.longitude != null && (
        <div style={{ height: '32vh', minHeight: 240, position: 'relative', borderBottom: '1px solid var(--ink)' }}>
          <MapView churches={[church]} />
        </div>
      )}

      <article className="page-wrap" style={{ maxWidth: 820 }}>
        <Link href="/" className="back-link" style={{ marginBottom: 24, marginTop: 0 }}>&larr; Back to Directory</Link>

        <header style={{ paddingBottom: 24, borderBottom: '1px solid var(--ink)', marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 10 }}>
                &sect; Congregation Profile
              </div>
              <h1 className="page-h1" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', marginBottom: 10 }}>{church.name}</h1>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--ink-soft)' }}>
                {church.city}, {church.state}{church.denomination ? ` · ${church.denomination}` : ''}
              </p>
            </div>
            <div className={`church-tag ${position.cls}`} style={{ fontSize: 11, padding: '6px 12px' }}>
              {position.label}
            </div>
          </div>
        </header>

        {(church.description || church.theologicalNotes) && (
          <section style={{ padding: '32px 0', borderBottom: '1px solid var(--rule)' }}>
            <h2 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12, fontWeight: 500 }}>
              Confession &amp; Conviction
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              {church.description || church.theologicalNotes}
            </p>
          </section>
        )}

        <section style={{ padding: '32px 0', borderBottom: '1px solid var(--rule)' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 18, fontWeight: 500 }}>
            At a Glance
          </h2>
          <div className="detail-stat-grid">
            <div className="detail-stat">
              <div className="detail-stat-label">Position</div>
              <div className="detail-stat-value" style={{ fontSize: 16, textTransform: 'uppercase', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
                {position.label.replace('† ', '')}
              </div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-label">Denomination</div>
              <div className="detail-stat-value" style={{ fontSize: 16 }}>{church.denomination || '—'}</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-label">Pastor</div>
              <div className="detail-stat-value" style={{ fontSize: 16 }}>{pastor || '—'}</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-label">Upvotes</div>
              <div className="detail-stat-value">{upvotes}</div>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 0', borderBottom: '1px solid var(--rule)' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12, fontWeight: 500 }}>
            Contact
          </h2>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 2, color: 'var(--ink-soft)' }}>
            ADDRESS &Vert; {church.address}, {church.city}, {church.state}{church.zip ? ` ${church.zip}` : ''}<br />
            TELEPHONE &Vert; {church.phone ? <a href={`tel:${church.phone}`} style={{ borderBottom: '1px solid var(--rule)' }}>{church.phone}</a> : 'not listed'}<br />
            EMAIL &Vert; {church.email ? <a href={`mailto:${church.email}`} style={{ borderBottom: '1px solid var(--rule)' }}>{church.email}</a> : 'not listed'}<br />
            WEBSITE &Vert; {church.website ? <a href={church.website} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid var(--brass)', color: 'var(--brass-deep)' }}>{church.website}</a> : 'not listed'}
          </p>
        </section>

        {church.theologicalNotes && church.theologicalNotes !== church.description && (
          <section style={{ padding: '32px 0', borderBottom: '1px solid var(--rule)' }}>
            <h2 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12, fontWeight: 500 }}>
              Editor&apos;s Note
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              {church.theologicalNotes}
            </p>
          </section>
        )}

        <div style={{ display: 'flex', gap: 10, padding: '24px 0', flexWrap: 'wrap' }}>
          <button
            onClick={handleUpvote}
            disabled={hasVoted}
            className="btn"
            style={{ flex: '0 1 auto', minWidth: 160, opacity: hasVoted ? 0.6 : 1 }}
          >
            {hasVoted ? `\u2713 ${upvotes} Upvotes` : `\u25B2 Upvote (${upvotes})`}
          </button>
          <button
            onClick={() => setShowReport(s => !s)}
            className="btn"
            style={{ flex: '0 1 auto', minWidth: 160, color: 'var(--oxblood)', borderColor: 'var(--oxblood)' }}
          >
            Report Listing
          </button>
          {church.website && (
            <a href={church.website} target="_blank" rel="noopener noreferrer" className="btn primary" style={{ flex: '1 1 auto', minWidth: 200 }}>
              Visit Website &rarr;
            </a>
          )}
        </div>

        {showReport && (
          <section style={{ padding: '24px', border: '1px solid var(--ink)', background: 'var(--paper)', marginTop: 12 }}>
            {reportStatus === 'sent' ? (
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)' }}>
                Thank you. Your report has been submitted for review.
              </p>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12 }}>
                  Report this listing
                </h3>
                <div className="form-fields">
                  <div className="field">
                    <div className="field-label"><span>Reason</span></div>
                    <select value={reportReason} onChange={e => setReportReason(e.target.value)}>
                      <option value="">Select a reason&hellip;</option>
                      {REPORT_REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <div className="field-label"><span>Details</span><span className="opt">optional</span></div>
                    <textarea
                      value={reportDetails}
                      onChange={e => setReportDetails(e.target.value)}
                      placeholder="Additional context&hellip;"
                      maxLength={500}
                    />
                  </div>
                  <button
                    onClick={handleReport}
                    disabled={!reportReason || reportStatus === 'sending'}
                    className="btn-submit"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {reportStatus === 'sending' ? 'Sending\u2026' : 'Submit Report'}
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </article>
    </div>
  )
}

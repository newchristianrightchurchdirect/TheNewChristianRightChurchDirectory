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
  culturalEngagement?: string
  theologicalNotes: string | null
  description: string | null
  createdAt: string
  recordFlag: string | null
  submissionSource: string | null
}

// Plain-English reason a row is being held, so the queue never presents a quarantined
// duplicate as though it were a submission awaiting review.
function heldReason(c: Church): string {
  const f = c.recordFlag || ''
  const dup = f.match(/duplicate_of:(\d+)/)
  if (dup) return `Duplicate of church #${dup[1]}`
  if (/closed/.test(f)) return 'Congregation is closed'
  if (/review_nonfit/.test(f)) return 'Reviewed and judged out of scope'
  if (f) return `Flagged: ${f}`
  return 'Imported or scripted row — not a public submission'
}

const POSITION_LABEL: Record<string, string> = {
  transformationalist: 'Transformational',
  single_issue: 'Single Issue',
  limited_mission: 'Limited Mission',
  quietist: 'Quietist',
  unknown: 'Unverified',
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Church[]>([])
  const [held, setHeld] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/submissions')
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data.submissions || [])
        setHeld(data.held || [])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSubmissions() }, [fetchSubmissions])

  const drop = (id: number) => {
    setSubmissions(prev => prev.filter(s => s.id !== id))
    setHeld(prev => prev.filter(s => s.id !== id))
  }

  const handleApprove = async (church: Church, isHeld = false) => {
    if (isHeld && !confirm(
      [
        'This row is being HELD, not queued for review.',
        '',
        `Reason: ${heldReason(church)}`,
        '',
        `Publishing it will put "${church.name}" on the public directory. Continue?`,
      ].join('\n')
    )) return
    setActionLoading(church.id)
    try {
      const res = await fetch(`/api/admin/submissions/${church.id}/approve`, { method: 'POST' })
      if (res.ok) drop(church.id)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (church: Church) => {
    if (!confirm(`Delete "${church.name}" permanently? This cannot be undone.`)) return
    setActionLoading(church.id)
    try {
      const res = await fetch(`/api/admin/submissions/${church.id}/reject`, { method: 'DELETE' })
      if (res.ok) drop(church.id)
    } finally {
      setActionLoading(null)
    }
  }

  const Card = ({ church, isHeld }: { church: Church; isHeld: boolean }) => (
    <div className={`admin-card${isHeld ? ' held' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="admin-card-name">{church.name}</div>
          {church.denomination && <div className="admin-card-denom">{church.denomination}</div>}
          {isHeld && <div className="admin-held-reason">✕ Held — {heldReason(church)}</div>}
          <div className="admin-card-meta">
            {church.address ? `${church.address} · ` : ''}{church.city}, {church.state} {church.zip || ''}<br />
            {church.website ? <a href={church.website} target="_blank" rel="noopener noreferrer" style={{ borderBottom: '1px solid var(--brass)', color: 'var(--brass-deep)' }}>{church.website}</a> : 'no website'}
            {church.phone ? ` · ${church.phone}` : ''}<br />
            Position ‖ {POSITION_LABEL[church.culturalEngagement || 'unknown'] || 'Unverified'}
            {' · '}Received {new Date(church.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {church.latitude == null && ' · NO COORDINATES'}
          </div>
          {(church.description || church.theologicalNotes) && (
            <div className="admin-note">{church.description || church.theologicalNotes}</div>
          )}
        </div>
      </div>
      <div className="admin-card-actions">
        <button
          className="btn primary"
          disabled={actionLoading === church.id}
          onClick={() => handleApprove(church, isHeld)}
        >
          {actionLoading === church.id ? 'Working…' : isHeld ? 'Publish anyway' : 'Approve'}
        </button>
        <button
          className="btn"
          style={{ color: 'var(--oxblood)', borderColor: 'var(--oxblood)' }}
          disabled={actionLoading === church.id}
          onClick={() => handleReject(church)}
        >
          Delete
        </button>
      </div>
    </div>
  )

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Review Queue</h1>
          <div className="admin-sub">
            {loading
              ? 'Loading…'
              : `${submissions.length} awaiting review · ${held.length} held`}
          </div>
        </div>
        <button className="btn" onClick={fetchSubmissions}>Refresh</button>
      </div>

      {loading ? (
        <div className="admin-empty">Loading&hellip;</div>
      ) : (
        <>
          <div className="admin-section-label">Public submissions</div>
          {submissions.length === 0 ? (
            <div className="admin-empty">Nothing awaiting review.</div>
          ) : (
            submissions.map(c => <Card key={c.id} church={c} isHeld={false} />)
          )}

          {held.length > 0 && (
            <>
              <div className="admin-section-label" style={{ color: 'var(--oxblood)', borderBottomColor: 'var(--oxblood)' }}>
                Held — not submissions ({held.length})
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', margin: '12px 0 16px' }}>
                These were kept off the directory on purpose — duplicates, closed congregations,
                records that failed review. They are not waiting on you. Publish one only if you
                know the flag is wrong.
              </p>
              {held.map(c => <Card key={c.id} church={c} isHeld />)}
            </>
          )}
        </>
      )}
    </div>
  )
}

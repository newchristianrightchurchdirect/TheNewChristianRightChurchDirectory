'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseFlags } from '@/lib/record-flags'

type Row = {
  id: number; name: string; city: string; state: string; denomination: string | null
  address: string; website: string | null; approved: boolean; recordFlag: string | null
  researchStatus: string; sourceUrls: string | null
}

export default function DuplicatesPage() {
  const [groups, setGroups] = useState<Array<{ kind: string; rows: Row[] }>>([])
  const [count, setCount] = useState(0)
  const [nameMatches, setNameMatches] = useState(0)
  const [addressMatches, setAddressMatches] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/duplicates')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d) {
          setGroups(d.groups); setCount(d.count)
          setNameMatches(d.nameMatches); setAddressMatches(d.addressMatches)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="admin-empty">Scanning&hellip;</div>

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Possible Duplicates</h1>
          <div className="admin-sub">
            {nameMatches} same-name · {addressMatches} same-address
          </div>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 20 }}>
        <strong>Same name</strong> in the same city is almost certainly one congregation entered
        twice. <strong>Same address</strong> often is not — congregations share buildings, and a
        Korean or Hispanic church meeting at an established one will match here. Read before you
        merge. And when you do merge, copy across anything the other row has first: a duplicate
        often carries the only email, pastor name or note on file.
      </p>

      {groups.length === 0 ? (
        <div className="admin-empty">No likely duplicates found.</div>
      ) : (
        groups.map(g => (
          <div key={g.rows.map(r => r.id).join('-')} className="admin-card" style={{ marginBottom: 0 }}>
            <div className="admin-card-name">{g.rows[0].name}</div>
            <div className="admin-card-denom">
              {g.rows.length} records · {g.rows[0].city}, {g.rows[0].state}
              {' · '}
              <span style={{ color: g.kind === 'name' ? 'var(--oxblood)' : 'var(--ink-mute)' }}>
                {g.kind === 'name' ? 'same name — likely duplicate' : 'same address — may share a building'}
              </span>
            </div>
            <div className="admin-scroll-x" style={{ marginTop: 12, border: '1px solid var(--rule)' }}>
              <table className="admin-table">
                <thead><tr><th>ID</th><th>City</th><th>Denomination</th><th>Research</th><th>Flags</th><th /></tr></thead>
                <tbody>
                  {g.rows.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
                        #{r.id}{!r.approved && <><br /><span style={{ color: 'var(--oxblood)' }}>hidden</span></>}
                      </td>
                      <td>{r.city}<div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{r.address}</div></td>
                      <td>{r.denomination || '—'}</td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>
                        {r.researchStatus}<br />
                        <span style={{ color: r.sourceUrls ? 'var(--ink-mute)' : 'var(--oxblood)' }}>
                          {r.sourceUrls ? 'sourced' : 'no sources'}
                        </span>
                      </td>
                      <td>
                        {parseFlags(r.recordFlag).map(f => (
                          <span key={f.raw} className={`admin-chip${f.held ? ' held' : ''}`}>{f.label}</span>
                        ))}
                      </td>
                      <td>
                        <Link className="btn" href={`/admin/dashboard/churches?q=${encodeURIComponent(r.name)}`}>Edit</Link>
                        {' '}
                        <a className="btn" href={`/church/${r.id}`} target="_blank" rel="noopener noreferrer">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

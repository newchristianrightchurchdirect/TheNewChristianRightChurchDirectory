'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useHymnalStore } from '@/store/hymnal'
import { toRoman } from '@/lib/hymnal/loader'

function formatDate(yyyymmdd?: string): string {
  if (!yyyymmdd) return ''
  const d = new Date(yyyymmdd + 'T00:00:00')
  if (isNaN(d.getTime())) return yyyymmdd
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function ServicesIndex() {
  const services = useHymnalStore((s) => s.services)
  const createService = useHymnalStore((s) => s.createService)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const id = createService(title.trim(), date || undefined)
    setTitle(''); setDate(''); setOpen(false)
    router.push(`/hymnal/services/${id}`)
  }

  return (
    <div>
      <div className="hymnal-section-head">
        <span>Orders of Worship</span>
        <span className="right">{services.length} order{services.length === 1 ? '' : 's'}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '18px 0 8px' }}>
        <button type="button" className="cta-outline" onClick={() => setOpen((v) => !v)}>
          <span className="plus">+</span> New Order
        </button>
      </div>

      {open && (
        <form
          onSubmit={submit}
          style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 10, marginBottom: 18 }}
        >
          <input
            className="hymn-search"
            type="text"
            placeholder="Order title (e.g. Sunday May 3rd)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 0 }}
            autoFocus
          />
          <input
            className="hymn-search"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginBottom: 0 }}
          />
          <button type="submit" className="cta-outline" style={{ gridColumn: '1 / -1', justifySelf: 'flex-end' }}>
            Create order
          </button>
        </form>
      )}

      {services.length === 0 ? (
        <div className="hymnal-empty">No orders yet. Tap <em>New Order</em> to begin.</div>
      ) : (
        <div className="svc-list">
          {services
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((s, i) => (
              <Link key={s.id} className="row" href={`/hymnal/services/${s.id}`}>
                <span className="ttl">{s.title}</span>
                <span className="meta">
                  {formatDate(s.date) || `Order ${toRoman(i + 1)}`}
                  {' \u00B7 '}{s.items.length} {s.items.length === 1 ? 'item' : 'items'}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

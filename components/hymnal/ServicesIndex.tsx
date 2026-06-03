'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useHymnalStore } from '@/store/hymnal'

export default function ServicesIndex() {
  const services = useHymnalStore((s) => s.services)
  const createService = useHymnalStore((s) => s.createService)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!title.trim()) return
          createService(title.trim(), date || undefined)
          setTitle('')
          setDate('')
        }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 160px auto', gap: 8, marginBottom: 20 }}
      >
        <input
          className="hymn-search"
          type="text"
          placeholder="New service title (e.g. Lord&rsquo;s Day Morning)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 0 }}
        />
        <input
          className="hymn-search"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="install-cta" style={{ marginTop: 0 }}>Create</button>
      </form>

      {services.length === 0 ? (
        <div className="hymnal-empty">No services yet. Create one above.</div>
      ) : (
        <div className="svc-list">
          {services
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((s) => (
              <Link key={s.id} className="row" href={`/hymnal/services/${s.id}`}>
                <div className="ttl">{s.title}</div>
                <div className="meta">{s.date || '\u2014'}</div>
                <div className="meta">{s.items.length} item{s.items.length === 1 ? '' : 's'}</div>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HYMNALS } from '@/lib/hymnal/sources'
import { useHymnalStore } from '@/store/hymnal'
import type { HymnalDocument } from '@/types/hymnal'

const BUNDLED_LABEL: Record<string, string> = {
  'sacred-harp-1991': 'The Sacred Harp (1991)',
  'trinity-hymnal-1961': 'Trinity Hymnal (1961)',
  'cantus-christi': 'Cantus Christi',
  'book-of-psalms-for-worship': 'The Book of Psalms for Worship (2009)',
  'trinity-psalter-hymnal': 'Trinity Psalter Hymnal (2018)',
  'hymns-of-grace': 'Hymns of Grace (2015)',
}

const SAMPLE = `{
  "hymnal": {
    "id": "my-parish",
    "name": "My Parish Psalter",
    "abbreviation": "MPP",
    "year": 2024
  },
  "hymns": [
    {
      "number": 1,
      "title": "All Glory Be to Christ",
      "tune": "AULD LANG SYNE",
      "author": "Dustin Kensrue",
      "verses": [
        { "number": 1, "isChorus": false, "text": "Should nothing of our efforts stand..." }
      ]
    }
  ]
}`

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60) || 'imported-hymnal'
}

function validateDoc(x: unknown): x is HymnalDocument {
  if (!x || typeof x !== 'object') return false
  const d = x as Record<string, unknown>
  if (!d.hymnal || typeof d.hymnal !== 'object') return false
  const meta = d.hymnal as Record<string, unknown>
  if (typeof meta.name !== 'string') return false
  if (!Array.isArray(d.hymns)) return false
  return true
}

export default function ImportHymnal() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null)

  const custom = useHymnalStore((s) => s.customHymnals)
  const addCustom = useHymnalStore((s) => s.addCustomHymnal)
  const removeCustom = useHymnalStore((s) => s.removeCustomHymnal)

  async function onPick(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0]
    if (!f) return
    setBusy(true)
    setStatus(null)
    try {
      const text = await f.text()
      const json: unknown = JSON.parse(text)
      if (!validateDoc(json)) {
        setStatus({ kind: 'err', msg: 'Invalid format: needs a top-level "hymnal" object with a "name", plus a "hymns" array.' })
      } else {
        const meta = json.hymnal
        const slug = slugify(typeof meta.id === 'string' ? meta.id : meta.name)
        addCustom({
          slug,
          title: meta.name,
          short: typeof meta.abbreviation === 'string' ? meta.abbreviation : meta.name,
          year: typeof meta.year === 'number' ? meta.year : undefined,
          data: json,
        })
        setStatus({ kind: 'ok', msg: `Imported "${meta.name}" (${json.hymns.length} hymns).` })
      }
    } catch (e) {
      setStatus({ kind: 'err', msg: `Could not parse file: ${(e as Error).message}` })
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push('/hymnal/more')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">Import Hymnal</div>
        <div className="actions" />
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 22px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--nxr-brass-deep)', marginBottom: 10 }}>
          Add a Volume
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 8px', color: 'var(--nxr-ink)' }}>Import Hymnal</h1>
      </header>

      <p className="import-intro">
        Bring your own hymnal or psalter into the Reader. Files must be JSON, formatted as shown below. Imported volumes are stored on this device only and survive between sessions.
      </p>
      <p className="import-warn">
        Only import files from trusted sources. Hymnal JSON is parsed locally; no data leaves your device.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        onChange={onPick}
        style={{ display: 'none' }}
      />
      <button className="cta-filled" onClick={() => fileRef.current?.click()} disabled={busy}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        {busy ? 'Reading\u2026' : 'Choose JSON File'}
      </button>

      {status && (
        <div style={{
          marginTop: 14, padding: '12px 14px',
          border: `1px solid ${status.kind === 'ok' ? 'var(--nxr-brass-deep)' : '#c25b66'}`,
          color: status.kind === 'ok' ? 'var(--nxr-brass)' : '#c25b66',
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14,
        }}>
          {status.msg}
        </div>
      )}

      {custom.length > 0 && (
        <>
          <h2 className="import-section-head">Imported Volumes</h2>
          <p className="import-section-dek">Stored locally in this browser.</p>
          {custom.map((h) => (
            <div key={h.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--nxr-rule)' }}>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--nxr-ink)' }}>{h.title}</div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12, color: 'var(--nxr-ink-mute)', marginTop: 2 }}>
                  {h.short}{h.year ? `  \u00B7  ${h.year}` : ''}
                </div>
              </div>
              <button
                onClick={() => removeCustom(h.slug)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#c25b66', fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}

      <h2 className="import-section-head">Bundled Hymnals</h2>
      <p className="import-section-dek">Already included in the Reader. Open any to browse.</p>

      {HYMNALS.map((h) => (
        <button
          key={h.slug}
          className="cta-outline-pill"
          onClick={() => router.push(`/hymnal/library/${h.slug}`)}
        >
          {BUNDLED_LABEL[h.slug] ?? h.title}
        </button>
      ))}

      <h2 className="import-section-head">JSON Format</h2>
      <p className="import-section-dek">A minimal valid file looks like this:</p>
      <pre className="code-block">{SAMPLE}</pre>
      <p className="import-section-dek" style={{ marginTop: 10 }}>
        Required fields: <em>hymnal.name</em>, <em>hymns[]</em>. Each verse needs <em>number</em>, <em>isChorus</em>, and <em>text</em>.
      </p>
    </article>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadHymnal } from '@/lib/hymnal/loader'
import { findHymnal } from '@/lib/hymnal/sources'
import { useHymnalStore } from '@/store/hymnal'
import type { Hymn } from '@/types/hymnal'

export default function HymnList({ slug }: { slug: string }) {
  const [hymns, setHymns] = useState<Hymn[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const favs = useHymnalStore((s) => s.favoriteHymns)
  const toggleFav = useHymnalStore((s) => s.toggleHymnFavorite)
  const lastOpened = useHymnalStore((s) => s.lastOpenedHymn[slug])

  useEffect(() => {
    let alive = true
    loadHymnal(slug)
      .then((doc) => { if (alive) setHymns(doc.hymns) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [slug])

  const filtered = useMemo(() => {
    if (!hymns) return []
    const q = query.trim().toLowerCase()
    if (!q) return hymns
    return hymns.filter((h) => {
      if (String(h.number).includes(q)) return true
      if (h.title && h.title.toLowerCase().includes(q)) return true
      if (h.firstLine && h.firstLine.toLowerCase().includes(q)) return true
      if (h.tune && h.tune.toLowerCase().includes(q)) return true
      if (h.author && h.author.toLowerCase().includes(q)) return true
      return false
    })
  }, [hymns, query])

  if (err) return <div className="hymnal-empty">Could not load this hymnal: {err}</div>
  if (!hymns) return <div className="hymnal-empty">Loading&hellip;</div>

  const lastHymn = lastOpened ? hymns.find((h) => h.number === lastOpened) : null

  return (
    <div>
      {lastHymn && (
        <Link href={`/hymnal/library/${slug}/${encodeURIComponent(lastHymn.number)}`} className="continue-pill">
          <span className="lbl">Continue</span>
          <span className="ttl">#{lastHymn.number} &middot; {lastHymn.title}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
      <div className="hymn-list-actions">
        <input
          className="hymn-search"
          type="search"
          placeholder={'Search number, title, tune, or author\u2026'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search hymns"
        />
        <button
          type="button"
          className="hymn-list-pdf"
          onClick={() => {
            const src = findHymnal(slug)
            const html = buildHymnalIndexPdfHtml(hymns, src?.title || slug, src?.short || '', src?.year ?? null)
            const win = window.open('', '_blank')
            if (!win) return
            win.document.open(); win.document.write(html); win.document.close()
          }}
          title="Print hymnal index"
          aria-label="Print hymnal index"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span>Index PDF</span>
        </button>
        <button
          type="button"
          className="hymn-list-pdf"
          onClick={() => {
            const src = findHymnal(slug)
            if (hymns.length > 200 && !window.confirm(`This will build a ${hymns.length}-hymn PDF. Continue?`)) return
            const html = buildHymnalMasterPdfHtml(hymns, src?.title || slug, src?.short || '', src?.year ?? null)
            const win = window.open('', '_blank')
            if (!win) return
            win.document.open(); win.document.write(html); win.document.close()
          }}
          title="Print full hymnal (lyrics)"
          aria-label="Print full hymnal lyrics"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Full PDF</span>
        </button>
      </div>
      <div className="hymn-list" role="list">
        {filtered.map((h) => {
          const isFav = favs.some((f) => f.hymnal === slug && f.number === h.number)
          return (
            <Link key={h.number} role="listitem" href={`/hymnal/library/${slug}/${encodeURIComponent(h.number)}`} className="hymn-row">
              <span className="num">{h.number}</span>
              <span className="ttl">
                {h.title}
                {h.firstLine && h.firstLine !== h.title && (
                  <span className="firstline">{h.firstLine}</span>
                )}
              </span>
              <button
                className={`fav${isFav ? ' on' : ''}`}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav({ hymnal: slug, number: h.number }) }}
              >
                {isFav ? '\u2605' : '\u2606'}
              </button>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <div className="hymnal-empty">No hymns match &ldquo;{query}&rdquo;.</div>
        )}
      </div>
    </div>
  )
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function buildHymnalIndexPdfHtml(hymns: Hymn[], title: string, short: string, year: number | null): string {
  const byNum = [...hymns].sort((a, b) => {
    const na = parseInt(String(a.number).replace(/\D+/g, ''), 10) || 0
    const nb = parseInt(String(b.number).replace(/\D+/g, ''), 10) || 0
    if (na !== nb) return na - nb
    return String(a.number).localeCompare(String(b.number))
  })
  const numRows = byNum.map((h) => (
    `<tr><td class="n">${escHtml(String(h.number))}</td><td class="t">${escHtml(h.title || '')}</td><td class="tu">${escHtml(h.tune || '')}</td></tr>`
  )).join('')

  const byTitle = [...hymns].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  const titleRows = byTitle.filter((h) => h.title).map((h) => (
    `<tr><td class="t">${escHtml(h.title || '')}</td><td class="n">${escHtml(String(h.number))}</td></tr>`
  )).join('')

  const css = `
    @page { size: letter; margin: 0.7in 0.6in; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: "Adobe Garamond Pro", "EB Garamond", Garamond, Georgia, "Times New Roman", serif; color: #1a140a; font-size: 10pt; line-height: 1.35; }
    .cover { text-align: center; padding: 60px 0 40px; page-break-after: always; }
    .cover .eyebrow { font-size: 10pt; letter-spacing: 0.30em; text-transform: uppercase; color: #8a6c2a; margin-bottom: 14px; }
    .cover h1 { font-weight: 400; font-style: italic; font-size: 30pt; line-height: 1.05; margin: 0 0 8px; }
    .cover .sub { font-style: italic; color: #5a4d2c; font-size: 13pt; }
    .rule { width: 80px; height: 1px; background: #b5a273; margin: 16px auto; }
    h2 { text-align: center; font-weight: 400; font-style: italic; font-size: 18pt; margin: 0 0 18px; }
    .sec { page-break-before: always; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 3px 6px; border-bottom: 0.5px solid #e8dfc6; vertical-align: top; }
    td.n { width: 50px; text-align: right; font-style: italic; color: #8a6c2a; font-variant-numeric: tabular-nums; padding-right: 14px; }
    td.t { font-size: 10pt; }
    td.tu { color: #6b5a35; font-style: italic; font-size: 9pt; text-align: right; width: 35%; }
    .grid-2 { column-count: 2; column-gap: 30px; }
    .grid-2 table { break-inside: avoid-column; }
  `
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escHtml(title)} Index</title><style>${css}</style></head><body>
    <section class="cover">
      <div class="eyebrow">Hymnal Index</div>
      <h1>${escHtml(title)}</h1>
      <div class="rule"></div>
      <div class="sub">${escHtml(short || '')}${year ? ` &middot; ${year}` : ''}</div>
      <div class="sub" style="margin-top: 24px; font-size: 11pt;">${byNum.length} hymns</div>
    </section>
    <section class="sec">
      <h2>By Number</h2>
      <table>${numRows}</table>
    </section>
    <section class="sec">
      <h2>By Title</h2>
      <div class="grid-2"><table>${titleRows}</table></div>
    </section>
    <script>window.onload = function(){ setTimeout(function(){ window.focus(); window.print(); }, 350); };<\/script>
  </body></html>`
}

function buildHymnalMasterPdfHtml(hymns: Hymn[], title: string, short: string, year: number | null): string {
  const sorted = [...hymns].sort((a, b) => {
    const na = parseInt(String(a.number).replace(/\D+/g, ''), 10) || 0
    const nb = parseInt(String(b.number).replace(/\D+/g, ''), 10) || 0
    if (na !== nb) return na - nb
    return String(a.number).localeCompare(String(b.number))
  })
  const hymnHtml = sorted.map((h) => {
    const verses = (h.verses || []).map((v, vi) => {
      const isChorus = !!v.isChorus
      const label = isChorus ? 'Refrain' : String(v.number)
      const lines = (v.text || '').split(/\n/).map((ln) => escHtml(ln)).join('<br/>')
      const cls = `verse${isChorus ? ' refrain' : ''}${!isChorus && vi === 0 ? ' first' : ''}`
      return `<div class="${cls}"><div class="vm">${escHtml(label)}</div><div class="vt">${lines}</div></div>`
    }).join('')
    const metaParts: string[] = [`No. ${escHtml(String(h.number))}`]
    if (h.tune) metaParts.push(escHtml(h.tune))
    if (h.meter) metaParts.push(escHtml(h.meter))
    if (h.author) metaParts.push(escHtml(h.author))
    return `<section class="hymn"><h3>${escHtml(h.title || `Hymn ${h.number}`)}</h3><div class="hm">${metaParts.join(' &middot; ')}</div>${verses ? `<div class="verses">${verses}</div>` : '<div class="missing">No lyrics available.</div>'}</section>`
  }).join('')

  const css = `
    @page { size: letter; margin: 0.7in 0.6in; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: "Adobe Garamond Pro", "EB Garamond", Garamond, Georgia, "Times New Roman", serif; color: #1a140a; font-size: 11pt; line-height: 1.45; }
    .cover { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1in 0.8in; text-align: center; page-break-after: always; }
    .cover .eyebrow { font-size: 11pt; letter-spacing: 0.34em; text-transform: uppercase; color: #8a6c2a; margin-bottom: 18px; }
    .cover h1 { font-weight: 400; font-style: italic; font-size: 38pt; line-height: 1.05; margin: 0 0 14px; }
    .cover .sub { font-style: italic; color: #5a4d2c; font-size: 15pt; }
    .rule { width: 90px; height: 1px; background: linear-gradient(to right, transparent, #b5a273, transparent); margin: 18px auto 24px; }
    .hymn { page-break-inside: auto; padding: 14px 0 10px; }
    .hymn + .hymn { border-top: 0.5px solid #e8dfc6; margin-top: 12px; padding-top: 18px; }
    .hymn h3 { text-align: center; font-weight: 400; font-style: italic; font-size: 16pt; margin: 0 0 4px; color: #1a140a; }
    .hm { text-align: center; font-style: italic; color: #6b5a35; font-size: 10pt; margin-bottom: 10px; }
    .verses { max-width: 440px; margin: 0 auto; text-align: center; }
    .verse { margin-bottom: 10px; page-break-inside: avoid; }
    .verse .vm { font-style: italic; color: #8a6c2a; font-size: 9pt; letter-spacing: 0.12em; text-transform: lowercase; margin-bottom: 2px; }
    .verse .vt { font-size: 11pt; line-height: 1.5; }
    .verse.refrain { margin: 10px auto; padding: 6px 14px; border-left: 1.5px solid #b5a273; border-right: 1.5px solid #b5a273; max-width: 360px; }
    .missing { color: #a04545; font-style: italic; font-size: 10pt; text-align: center; }
  `
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escHtml(title)} - Full</title><style>${css}</style></head><body>
    <section class="cover">
      <div class="eyebrow">Full Hymnal &middot; Lyrics</div>
      <h1>${escHtml(title)}</h1>
      <div class="rule"></div>
      <div class="sub">${escHtml(short || '')}${year ? ` &middot; ${year}` : ''}</div>
      <div class="sub" style="margin-top: 22px; font-size: 12pt;">${sorted.length} hymns</div>
    </section>
    ${hymnHtml}
    <script>window.onload = function(){ setTimeout(function(){ window.focus(); window.print(); }, 600); };<\/script>
  </body></html>`
}

'use client'

import Link from 'next/link'
import { useHymnalStore } from '@/store/hymnal'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'

const SIZE_LABELS: { value: number; label: string }[] = [
  { value: 0.9, label: 'S' },
  { value: 1.0, label: 'M' },
  { value: 1.15, label: 'L' },
  { value: 1.35, label: 'XL' },
]

function closestSize(textScale: number): number {
  let best = SIZE_LABELS[0].value
  let bestD = Math.abs(textScale - best)
  for (const s of SIZE_LABELS) {
    const d = Math.abs(textScale - s.value)
    if (d < bestD) { best = s.value; bestD = d }
  }
  return best
}

export default function MoreSettings() {
  const textScale = useHymnalStore((s) => s.textScale)
  const setTextScale = useHymnalStore((s) => s.setTextScale)
  const roman = useHymnalStore((s) => s.showRomanNumerals)
  const setRoman = useHymnalStore((s) => s.setShowRomanNumerals)
  const drop = useHymnalStore((s) => s.showDropCaps)
  const setDrop = useHymnalStore((s) => s.setShowDropCaps)
  const single = useHymnalStore((s) => s.bibleSingleColumn)
  const setSingle = useHymnalStore((s) => s.setBibleSingleColumn)
  const defH = useHymnalStore((s) => s.defaultHymnal)
  const setDefH = useHymnalStore((s) => s.setDefaultHymnal)
  const defB = useHymnalStore((s) => s.defaultBible)
  const setDefB = useHymnalStore((s) => s.setDefaultBible)
  const theme = useHymnalStore((s) => s.themePref)
  const setTheme = useHymnalStore((s) => s.setThemePref)

  const activeSize = closestSize(textScale)
  const sampleSize = Math.round(20 * textScale)

  return (
    <>
      {/* === Appearance === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>Appearance</span>
        <span className="right">Paper &amp; ink</span>
      </div>
      <div className="settings-row">
        <div className="lbl">Theme</div>
        <div className="seg" role="radiogroup" aria-label="Theme">
          <button
            type="button"
            className={theme === 'light' ? 'on' : ''}
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            Light
          </button>
          <button
            type="button"
            className={theme === 'dark' ? 'on' : ''}
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            Dark
          </button>
          <button
            type="button"
            className={theme === 'system' ? 'on' : ''}
            onClick={() => setTheme('system')}
            aria-pressed={theme === 'system'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="4" width="18" height="13" rx="1.5" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Auto
          </button>
        </div>
      </div>

      {/* === Reading === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>Reading</span>
        <span className="right">Lyrics &amp; text</span>
      </div>
      <div className="settings-row">
        <div className="lbl">Lyrics size</div>
        <div className="seg" role="radiogroup" aria-label="Lyrics size">
          {SIZE_LABELS.map((s) => (
            <button
              key={s.label}
              type="button"
              className={s.value === activeSize ? 'on' : ''}
              onClick={() => setTextScale(s.value)}
              aria-pressed={s.value === activeSize}
            >{s.label}</button>
          ))}
        </div>
      </div>

      <div className="sample-preview">
        <div className="stamp">Sample &middot; Hymn CCXC</div>
        <div className="body" style={{ fontSize: sampleSize }}>
          Amazing grace, how sweet the sound,<br />
          That saved a wretch like me!
        </div>
      </div>

      <div className="settings-row">
        <div>
          <div className="lbl">Roman-numeral verse markers</div>
          <span className="desc">Use I, II, III instead of 1, 2, 3 alongside each verse.</span>
        </div>
        <div className="seg" role="radiogroup" aria-label="Roman numerals">
          <button type="button" className={roman ? 'on' : ''} onClick={() => setRoman(true)}>On</button>
          <button type="button" className={!roman ? 'on' : ''} onClick={() => setRoman(false)}>Off</button>
        </div>
      </div>

      <div className="settings-row">
        <div>
          <div className="lbl">Drop caps</div>
          <span className="desc">Large illuminated first letter on the opening verse.</span>
        </div>
        <div className="seg">
          <button type="button" className={drop ? 'on' : ''} onClick={() => setDrop(true)}>On</button>
          <button type="button" className={!drop ? 'on' : ''} onClick={() => setDrop(false)}>Off</button>
        </div>
      </div>

      <div className="settings-row">
        <div>
          <div className="lbl">Single-column Bible</div>
          <span className="desc">Switch off two-column prose layout on wide screens.</span>
        </div>
        <div className="seg">
          <button type="button" className={single ? 'on' : ''} onClick={() => setSingle(true)}>On</button>
          <button type="button" className={!single ? 'on' : ''} onClick={() => setSingle(false)}>Off</button>
        </div>
      </div>

      {/* === Defaults === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>Defaults</span>
        <span className="right">First-opened volumes</span>
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Default hymnal</div>
          <span className="desc">Opens first when you add a hymn to a service.</span>
        </div>
        <select value={defH} onChange={(e) => setDefH(e.target.value)}>
          {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.title}</option>)}
        </select>
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Default Bible</div>
          <span className="desc">Used for search and quick links.</span>
        </div>
        <select value={defB} onChange={(e) => setDefB(e.target.value)}>
          {BIBLES.map((b) => <option key={b.slug} value={b.slug}>{b.title}</option>)}
        </select>
      </div>

      {/* === Library === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>Library</span>
        <span className="right">Volumes &amp; plans</span>
      </div>
      <div style={{ display: 'grid', gap: 0 }}>
        <Link href="/hymnal/plans" className="settings-row" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <div className="lbl">Reading plans</div>
            <span className="desc">Activate calendars of daily reading.</span>
          </div>
          <span style={{ color: 'var(--nxr-ink-mute)' }}>&rarr;</span>
        </Link>
        <Link href="/hymnal/import" className="settings-row" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <div className="lbl">Import hymnal</div>
            <span className="desc">Add a custom hymnal or psalter JSON file.</span>
          </div>
          <span style={{ color: 'var(--nxr-ink-mute)' }}>&rarr;</span>
        </Link>
        <Link href="/hymnal/compare" className="settings-row" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <div className="lbl">Compare hymnals</div>
            <span className="desc">Overlap and differences across two or all volumes.</span>
          </div>
          <span style={{ color: 'var(--nxr-ink-mute)' }}>&rarr;</span>
        </Link>
        <a
          href="/hymnal-media/nxr-hymnal.pdf"
          className="settings-row"
          style={{ textDecoration: 'none', color: 'inherit' }}
          target="_blank"
          rel="noopener"
        >
          <div>
            <div className="lbl">Download NXR Hymnal (PDF)</div>
            <span className="desc">All eight volumes &mdash; lyrics and sheet music in one file.</span>
          </div>
          <span style={{ color: 'var(--nxr-ink-mute)' }}>&darr;</span>
        </a>
      </div>

      {/* === Original PDFs === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>Original Hymnal PDFs</span>
        <span className="right">Source editions</span>
      </div>
      <div style={{ display: 'grid', gap: 0 }}>
        {[
          { href: '/hymnal-media/originals/trinity-psalter-hymnal.pdf',  ttl: 'Trinity Psalter Hymnal',         desc: 'Orthodox Presbyterian & URCNA, MMXVIII' },
          { href: '/hymnal-media/originals/trinity-hymnal-1961.pdf',     ttl: 'Trinity Hymnal',                 desc: 'OPC original, MCMLXI' },
          { href: '/hymnal-media/originals/trinity-hymnal-revised.pdf',  ttl: 'Trinity Hymnal (Revised)',       desc: 'OPC/PCA, MCMXC' },
          { href: '/hymnal-media/originals/trinity-hymnal-baptist.pdf',  ttl: 'Trinity Hymnal (Baptist Ed.)',   desc: 'Baptist Reformation Press, MCMXCV' },
          { href: '/hymnal-media/originals/book-of-psalms-for-worship.pdf', ttl: 'The Book of Psalms for Worship', desc: 'Crown & Covenant, MMIX' },
          { href: '/hymnal-media/originals/sacred-harp.pdf',             ttl: 'The Sacred Harp',                desc: 'Denson revision, MCMXCI' },
        ].map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="settings-row"
            style={{ textDecoration: 'none', color: 'inherit' }}
            target="_blank"
            rel="noopener"
          >
            <div>
              <div className="lbl">{p.ttl}</div>
              <span className="desc">{p.desc}</span>
            </div>
            <span style={{ color: 'var(--nxr-ink-mute)' }}>&darr;</span>
          </a>
        ))}
      </div>

      {/* === About === */}
      <div className="hymnal-section-head" style={{ marginTop: 16 }}>
        <span>About</span>
        <span className="right">Credits</span>
      </div>
      <div style={{ padding: '16px 0', borderBottom: '1px solid var(--nxr-rule)' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.55, color: 'var(--nxr-ink-soft)', margin: 0 }}>
          The <em>NXR Hymnal</em> is a companion to <em>The New Christian Right</em>&mdash;a directory of faithful churches. Compiled for the Sabbath assembly, MMXXVI.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/install" className="install-cta">Install to home screen</Link>
        </div>
      </div>
    </>
  )
}

'use client'

import { useHymnalStore } from '@/store/hymnal'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'

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

  return (
    <div className="settings-list">
      <div className="settings-row">
        <div>
          <div className="lbl">Text size</div>
          <span className="desc">Affects hymn verses, scripture, and creeds.</span>
        </div>
        <input
          type="range" min="0.85" max="1.5" step="0.05"
          value={textScale}
          onChange={(e) => setTextScale(Number(e.target.value))}
          aria-label="Text size"
        />
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Roman-numeral verse markers</div>
          <span className="desc">Use I, II, III instead of 1, 2, 3 alongside each verse.</span>
        </div>
        <input type="checkbox" checked={roman} onChange={(e) => setRoman(e.target.checked)} aria-label="Roman numerals" />
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Drop caps</div>
          <span className="desc">Large illuminated first letter on the opening verse.</span>
        </div>
        <input type="checkbox" checked={drop} onChange={(e) => setDrop(e.target.checked)} aria-label="Drop caps" />
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Single-column Bible</div>
          <span className="desc">Switch off two-column prose layout on wide screens.</span>
        </div>
        <input type="checkbox" checked={single} onChange={(e) => setSingle(e.target.checked)} aria-label="Single column" />
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Default hymnal</div>
          <span className="desc">Opens first when you add a hymn to a service.</span>
        </div>
        <select className="hymn-search" style={{ marginBottom: 0, maxWidth: 260 }} value={defH} onChange={(e) => setDefH(e.target.value)}>
          {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.title}</option>)}
        </select>
      </div>
      <div className="settings-row">
        <div>
          <div className="lbl">Default Bible</div>
          <span className="desc">Used for search and quick links.</span>
        </div>
        <select className="hymn-search" style={{ marginBottom: 0, maxWidth: 260 }} value={defB} onChange={(e) => setDefB(e.target.value)}>
          {BIBLES.map((b) => <option key={b.slug} value={b.slug}>{b.title}</option>)}
        </select>
      </div>
    </div>
  )
}

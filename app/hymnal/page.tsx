import Link from 'next/link'
import { HYMNALS } from '@/lib/hymnal/sources'
import { toRoman } from '@/lib/hymnal/loader'
import { Footer } from '@/components/hymnal/Ornament'
import HymnOfTheDay from '@/components/hymnal/HymnOfTheDay'
import TodayDate from '@/components/hymnal/TodayDate'

export const metadata = { title: 'Home' }

const TRADITION: Record<string, string> = {
  'trinity-psalter-hymnal':    'Reformed',
  'trinity-hymnal-1961':       'Reformed',
  'book-of-psalms-for-worship':'Presbyterian',
  'cantus-christi':            'Reformed',
  'hymns-of-grace':            'Reformed',
  'sacred-harp-1991':          'Shape-note',
}

const PUBLISHER: Record<string, string> = {
  'trinity-psalter-hymnal':    'Great Commission Publications',
  'trinity-hymnal-1961':       'Great Commission Publications',
  'book-of-psalms-for-worship':'Crown & Covenant Publications',
  'cantus-christi':            'Canon Press',
  'hymns-of-grace':            'The Master\u2019s Seminary Press',
  'sacred-harp-1991':          'Sacred Harp Publishing Company',
}

export default function HymnalHome() {
  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">Sacred Songbook</div>
        <h1 className="hymnal-h1">The <em>NXR</em> Hymnal</h1>
        <p className="hymnal-dek">A Companion of Faithful Song</p>
        <div className="hymnal-hero-meta">
          <span><TodayDate /></span>
          <span>{toRoman(HYMNALS.length)} Volumes</span>
        </div>
        <div className="hymnal-hero-tagline">
          Soli Deo Gloria &middot; Sola Scriptura &middot; Cantate Domino
        </div>
      </section>

      <div className="hymnal-section-head">
        <span>Table of Volumes</span>
        <span className="right">By tradition</span>
      </div>

      <HymnOfTheDay />

      <Link href="/hymnal/plans" className="hymnal-band" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="lhd">
          <span>Reading Plans</span>
          <span className="right italic">Browse &rarr;</span>
        </div>
        <div className="big">Begin a daily course</div>
        <div className="small">Bible in a Year, Psalter in a Month, and more.</div>
      </Link>

      <section className="hymnal-picker" aria-label="Volumes">
        {HYMNALS.map((h, i) => (
          <Link key={h.slug} href={`/hymnal/library/${h.slug}`} className="hymnal-card">
            <span className="vol">{toRoman(i + 1)}.</span>
            <div className="body">
              <div className="ttl">{h.title}</div>
              <div className="ed">{h.year ? `${h.year} Edition` : ''}</div>
              <div className="blurb">{h.blurb}</div>
              <div className="stamp">
                {h.year ?? ''}
                {h.year ? ' \u00B7 ' : ''}
                {(PUBLISHER[h.slug] || '').toUpperCase()}
                <span className="tag">&middot; {(TRADITION[h.slug] || '').toUpperCase()}</span>
              </div>
            </div>
            <span className="page-no">{(i + 1) * 113}</span>
          </Link>
        ))}
      </section>

      <Footer quote={<>&ldquo;Sing unto the Lord a new song.&rdquo; &mdash; Ps.&nbsp;xcvi.</>} />
    </div>
  )
}

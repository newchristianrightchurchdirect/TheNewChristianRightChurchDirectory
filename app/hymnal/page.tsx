import Link from 'next/link'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'

export const metadata = { title: 'Home' }

export default function HymnalHome() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">A Library for Reformed Worship</div>
        <h1 className="hymnal-h1">Psalters &amp; <em>Hymnals</em></h1>
        <p className="hymnal-dek">
          Six bundled songbooks, five Bible translations, and forty-two confessions and creeds.
          Installable to your home screen and fully available offline.
        </p>
      </header>

      <section className="hymnal-picker" aria-label="Hymnals">
        {HYMNALS.map((h) => (
          <Link key={h.slug} href={`/hymnal/library/${h.slug}`} className="hymnal-card">
            <div className="short">{h.short}{h.year ? ` \u00B7 ${h.year}` : ''}</div>
            <div className="ttl">{h.title}</div>
            <div className="yr">{h.year ?? ''}</div>
            <div className="bl">{h.blurb}</div>
          </Link>
        ))}
      </section>

      <h2 className="hymnal-eyebrow" style={{ marginTop: 36 }}>Quick Access</h2>
      <div className="hymnal-quick">
        <Link href="/hymnal/bible">Bible</Link>
        <Link href="/hymnal/creeds">Creeds &amp; Confessions</Link>
        <Link href="/hymnal/services">Order of Service</Link>
        <Link href="/hymnal/saved">Favorites</Link>
        <Link href="/install">Install App</Link>
      </div>

      <h2 className="hymnal-eyebrow" style={{ marginTop: 36 }}>Bible Translations</h2>
      <div className="hymnal-quick">
        {BIBLES.map((b) => (
          <Link key={b.slug} href={`/hymnal/bible/${b.slug}`}>{b.short}</Link>
        ))}
      </div>
    </div>
  )
}

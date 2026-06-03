import Link from 'next/link'
import { BIBLES } from '@/lib/hymnal/sources'

export const metadata = { title: 'Bible' }

export default function BibleHome() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Five Translations</div>
        <h1 className="hymnal-h1">The <em>Bible</em></h1>
        <p className="hymnal-dek">Choose a translation to read by book and chapter.</p>
      </header>
      <div className="hymnal-picker">
        {BIBLES.map((b) => (
          <Link key={b.slug} href={`/hymnal/bible/${b.slug}`} className="hymnal-card">
            <div className="short">{b.short}</div>
            <div className="ttl">{b.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

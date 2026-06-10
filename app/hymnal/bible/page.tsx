import Link from 'next/link'
import { BIBLES } from '@/lib/hymnal/sources'
import { toRoman } from '@/lib/hymnal/loader'
import { Footer } from '@/components/hymnal/Ornament'

export const metadata = { title: 'Bible' }

const LATIN: Record<string, string> = {
  esv:  'English Standard, MMI',
  kjv:  'Authorized Version, MDCXI',
  nkjv: 'New King James, MCMLXXXII',
  lsb:  'Legacy Standard, MMXXI',
  gnv:  'Geneva, MDLX',
}

export default function BibleHome() {
  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">Sacred Scripture</div>
        <h1 className="hymnal-h1">The Holy <em>Bible</em></h1>
        <p className="hymnal-dek">Five faithful translations, bound for the saints</p>
        <div className="hymnal-hero-meta">
          <span>66 Books &middot; 1,189 Chapters</span>
          <span>Anno Domini MMXXVI</span>
        </div>
      </section>

      <div className="hymnal-section-head">
        <span>Select an Edition</span>
        <span className="right">{toRoman(BIBLES.length)} translations</span>
      </div>

      <section className="hymnal-picker" aria-label="Bible translations">
        {BIBLES.map((b, i) => (
          <Link key={b.slug} href={`/hymnal/bible/${b.slug}`} className="hymnal-card">
            <span className="vol">{toRoman(i + 1)}.</span>
            <div className="body">
              <div className="ttl">{b.title}</div>
              <div className="ed">{LATIN[b.slug] || ''}</div>
              <div className="stamp">{b.short}</div>
            </div>
            <span className="page-no">&nbsp;</span>
          </Link>
        ))}
      </section>

      <Footer quote={<>&ldquo;The grass withereth, the flower fadeth: but the word of our God shall stand for ever.&rdquo; &mdash; Isa.&nbsp;40:8</>} />
    </div>
  )
}

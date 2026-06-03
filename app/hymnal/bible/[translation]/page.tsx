import { notFound } from 'next/navigation'
import { findBible, BIBLES } from '@/lib/hymnal/sources'
import BibleToc from '@/components/hymnal/BibleToc'
import { Footer } from '@/components/hymnal/Ornament'

type Params = Promise<{ translation: string }>

const LATIN: Record<string, string> = {
  esv:  'English Standard, MMI',
  kjv:  'Authorized Version, MDCXI',
  nkjv: 'New King James, MCMLXXXII',
  lsb:  'Legacy Standard, MMXXI',
  gnv:  'Geneva, MDLX',
}

export async function generateMetadata({ params }: { params: Params }) {
  const { translation } = await params
  const src = findBible(translation)
  return { title: src ? src.short : 'Bible' }
}

export default async function BibleTranslationPage({ params }: { params: Params }) {
  const { translation } = await params
  const src = findBible(translation)
  if (!src) return notFound()

  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">Sacred Scripture</div>
        <h1 className="hymnal-h1">The Holy <em>Bible</em></h1>
        <p className="hymnal-dek">{LATIN[translation] || src.title}</p>
        <div style={{ marginTop: 14 }}>
          <span className="pill">
            {src.short} Edition
            <span style={{ fontSize: 9 }}>&#9662;</span>
          </span>
        </div>
      </section>

      {BIBLES.length > 1 && (
        <div className="chip-row" role="tablist" aria-label="Other translations">
          {BIBLES.map((b) => (
            <a key={b.slug} href={`/hymnal/bible/${b.slug}`} className={`chip${b.slug === translation ? ' on' : ''}`}>
              {b.short}
            </a>
          ))}
        </div>
      )}

      <BibleToc translation={translation} />

      <Footer quote={<>&ldquo;Thy word is a lamp unto my feet.&rdquo; &mdash; Ps.&nbsp;cxix.</>} />
    </div>
  )
}

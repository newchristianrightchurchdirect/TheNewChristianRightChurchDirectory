import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findHymnal } from '@/lib/hymnal/sources'
import HymnList from '@/components/hymnal/HymnList'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const src = findHymnal(slug)
  if (!src) return { title: 'Hymnal' }
  return { title: src.title }
}

export default async function HymnalLibraryPage({ params }: { params: Params }) {
  const { slug } = await params
  const src = findHymnal(slug)
  if (!src) return notFound()

  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">{src.short}{src.year ? ` \u00B7 ${src.year}` : ''}</div>
        <h1 className="hymnal-h1">{src.title}</h1>
        {src.blurb && <p className="hymnal-dek">{src.blurb}</p>}
      </header>
      <HymnList slug={slug} />
    </div>
  )
}

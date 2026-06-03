import { notFound } from 'next/navigation'
import Link from 'next/link'
import { findHymnal } from '@/lib/hymnal/sources'
import HymnDetail from '@/components/hymnal/HymnDetail'

type Params = Promise<{ slug: string; number: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, number } = await params
  const src = findHymnal(slug)
  if (!src) return { title: 'Hymn' }
  return { title: `#${number} \u00B7 ${src.short}` }
}

export default async function HymnDetailPage({ params }: { params: Params }) {
  const { slug, number } = await params
  const src = findHymnal(slug)
  const n = Number(number)
  if (!src || !Number.isFinite(n)) return notFound()

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link href={`/hymnal/library/${slug}`} style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)' }}>
          &larr; {src.short}
        </Link>
      </div>
      <HymnDetail slug={slug} number={n} />
    </div>
  )
}

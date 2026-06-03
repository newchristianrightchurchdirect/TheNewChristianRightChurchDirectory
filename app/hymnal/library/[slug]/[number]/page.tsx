import { notFound } from 'next/navigation'
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

  return <HymnDetail slug={slug} number={n} />
}

// Server component. This route used to be 'use client' and fetched its church in the browser,
// which meant all ~4,100 church pages shipped identical HTML — same <title>, same description,
// and no church content in the source at all. For a directory whose value is those pages being
// findable, that made them look like duplicates of the homepage to a crawler.
//
// The interactive parts (map, upvote, report form) live in ChurchDetail, a client component that
// receives the church as a prop, so the content is server-rendered into the HTML.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ChurchDetail from './ChurchDetail'

// Rendered on demand and then cached, rather than dynamically per request. This matters for
// more than speed: on a purely dynamic route Next STREAMS metadata into the body and lets React
// hoist it at hydration, so <title> and <meta name="description"> land outside <head> in the
// initial HTML (measured at byte 22,711 with </head> at 1,787). A cached render puts them back
// in <head> for every client, JS or not.
//
// Nothing is prerendered at build time — 4,067 pages would bloat the build — so the first
// request for a church generates it and every later one is served from cache.
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

const POSITION_LABEL: Record<string, string> = {
  transformationalist: 'a transformationalist congregation that acts corporately on public issues',
  limited_mission: 'a congregation holding the church’s institutional mission to be a limited one',
  quietist: 'a quietist congregation',
}

async function getChurch(idParam: string) {
  const id = parseInt(idParam, 10)
  if (isNaN(id)) return null
  return prisma.church.findUnique({ where: { id, approved: true } })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const church = await getChurch(id)
  if (!church) return { title: 'Church Not Found', robots: { index: false, follow: false } }

  const where = `${church.city}, ${church.state}`
  const denom = church.denomination ? `${church.denomination} church` : 'Church'
  const title = `${church.name} — ${where}`

  // Prefer the editorial blurb; otherwise compose something specific to this congregation
  // rather than repeating the site-wide description on every page.
  const stance = POSITION_LABEL[church.culturalEngagement]
  const description = (
    church.description ||
    `${denom} in ${where}${stance ? `, recorded here as ${stance}` : ''}. Researched doctrinal and political stances, with sources.`
  ).slice(0, 300)

  return {
    title,
    description,
    alternates: { canonical: `/church/${church.id}` },
    openGraph: { title, description, type: 'profile', url: `/church/${church.id}` },
    twitter: { title, description },
  }
}

export default async function ChurchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const church = await getChurch(id)
  if (!church) notFound()

  return <ChurchDetail church={church} />
}

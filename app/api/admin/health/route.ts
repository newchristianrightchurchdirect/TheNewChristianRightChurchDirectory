import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'

// Counts for the data-health screen. These gaps were previously only visible in
// church_research_log.md, which meant the research backlog could not be worked as a queue.
export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied

  const c = prisma.church
  const [
    total, approved, unapproved, notResearched, denomDefault, noSources,
    noDescription, noCoords, flagged, urcBulk, ceUnknown, openReports, recentChanges,
  ] = await Promise.all([
    c.count(),
    c.count({ where: { approved: true } }),
    c.count({ where: { approved: false } }),
    c.count({ where: { NOT: { researchStatus: 'researched' } } }),
    c.count({ where: { stanceBasis: 'denominational_default' } }),
    c.count({ where: { OR: [{ sourceUrls: null }, { sourceUrls: '' }] } }),
    c.count({ where: { OR: [{ description: null }, { description: '' }] } }),
    c.count({ where: { OR: [{ latitude: null }, { longitude: null }] } }),
    c.count({ where: { NOT: { recordFlag: null } } }),
    c.count({ where: { denomination: 'URC' } }),
    c.count({ where: { culturalEngagement: 'unknown' } }),
    prisma.report.count({ where: { status: 'open' } }),
    prisma.stanceChange.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 864e5) } } }),
  ])

  const byState = await prisma.$queryRawUnsafe<Array<{ state: string; total: bigint; done: bigint }>>(`
    SELECT state,
           COUNT(*) AS total,
           SUM(CASE WHEN "researchStatus" = 'researched' THEN 1 ELSE 0 END) AS done
    FROM "Church" GROUP BY state ORDER BY COUNT(*) DESC`)

  const flagCounts = await prisma.$queryRawUnsafe<Array<{ flag: string; n: bigint }>>(`
    SELECT "recordFlag" AS flag, COUNT(*) AS n FROM "Church"
    WHERE "recordFlag" IS NOT NULL GROUP BY "recordFlag" ORDER BY COUNT(*) DESC`)

  return NextResponse.json({
    totals: {
      total, approved, unapproved, notResearched, denomDefault, noSources,
      noDescription, noCoords, flagged, urcBulk, ceUnknown, openReports, recentChanges,
    },
    byState: byState.map(r => ({ state: r.state, total: Number(r.total), done: Number(r.done) })),
    flagCounts: flagCounts.map(r => ({ flag: r.flag, n: Number(r.n) })),
  })
}

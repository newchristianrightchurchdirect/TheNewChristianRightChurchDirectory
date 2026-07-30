import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'

const PER_PAGE = 25

// Search / filter the directory for editing. Supports the gap filters the health screen
// links to, so "3,812 rows without sources" becomes a worklist rather than a statistic.
export async function GET(request: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const sp = request.nextUrl.searchParams
  const q = (sp.get('q') || '').trim()
  const state = sp.get('state') || ''
  const gap = sp.get('gap') || ''
  const flag = sp.get('flag') || ''
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10))

  const where: Record<string, unknown> = {}
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { denomination: { contains: q, mode: 'insensitive' } },
    ]
  }
  if (state) where.state = state
  if (flag) where.recordFlag = { contains: flag }

  if (gap === 'no_sources') where.OR = [{ sourceUrls: null }, { sourceUrls: '' }]
  else if (gap === 'not_researched') where.NOT = { researchStatus: 'researched' }
  else if (gap === 'denom_default') where.stanceBasis = 'denominational_default'
  else if (gap === 'no_description') where.OR = [{ description: null }, { description: '' }]
  else if (gap === 'no_coords') where.OR = [{ latitude: null }, { longitude: null }]
  else if (gap === 'ce_unknown') where.culturalEngagement = 'unknown'
  else if (gap === 'flagged') where.NOT = { recordFlag: null }
  else if (gap === 'urc') where.denomination = 'URC'

  const [rows, total] = await Promise.all([
    prisma.church.findMany({ where, orderBy: { name: 'asc' }, skip: (page - 1) * PER_PAGE, take: PER_PAGE }),
    prisma.church.count({ where }),
  ])

  return NextResponse.json({ rows, total, page, perPage: PER_PAGE })
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadHymnal } from '@/lib/hymnal/loader'
import { HYMNALS } from '@/lib/hymnal/sources'

// Picks a stable hymn-of-the-day by day-of-year from a chosen volume.
export default function HymnOfTheDay() {
  const [pick, setPick] = useState<{ hymnal: typeof HYMNALS[number]; number: string; title: string } | null>(null)

  useEffect(() => {
    const start = new Date(new Date().getFullYear(), 0, 0)
    const day = Math.floor((Date.now() - start.getTime()) / 86400000)
    const hymnal = HYMNALS[1] // Trinity Hymnal 1961
    loadHymnal(hymnal.slug)
      .then((doc) => {
        if (!doc.hymns.length) return
        const h = doc.hymns[day % doc.hymns.length]
        setPick({ hymnal, number: h.number, title: h.firstLine || h.title })
      })
      .catch(() => {})
  }, [])

  if (!pick) {
    return (
      <div className="hymnal-band">
        <div className="lhd"><span>Hymn of the Day</span><span className="right">&nbsp;</span></div>
        <div className="big">&nbsp;</div>
      </div>
    )
  }

  return (
    <Link href={`/hymnal/library/${pick.hymnal.slug}/${encodeURIComponent(pick.number)}`} className="hymnal-band" style={{ display: 'block' }}>
      <div className="lhd">
        <span>Hymn of the Day</span>
        <span className="right">{pick.hymnal.short}&nbsp;No.&nbsp;{pick.number}</span>
      </div>
      <div className="big">{pick.title}</div>
      <div className="small">{pick.hymnal.title}{pick.hymnal.year ? ` (${pick.hymnal.year})` : ''}</div>
    </Link>
  )
}

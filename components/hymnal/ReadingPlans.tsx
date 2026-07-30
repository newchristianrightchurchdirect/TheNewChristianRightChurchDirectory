'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { READING_PLANS, readingForDay, type ReadingPlan } from '@/lib/hymnal/plans'
import { useHymnalStore } from '@/store/hymnal'

function todayDayIndex(startDate: string): number {
  const start = new Date(startDate + 'T00:00:00').getTime()
  const now = new Date()
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.floor((todayMidnight - start) / 86400000) + 1
}

export default function ReadingPlans() {
  const router = useRouter()
  const activeIds = useHymnalStore((s) => s.activePlanIds)
  const toggle = useHymnalStore((s) => s.toggleActivePlan)
  const progress = useHymnalStore((s) => s.planProgress)
  const markDay = useHymnalStore((s) => s.markPlanDay)
  const resetStart = useHymnalStore((s) => s.resetPlanStart)

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push('/hymnal/more')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">Reading Plans</div>
        <div className="actions" />
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 24px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--nxr-brass-deep)', marginBottom: 10 }}>
          A Calendar of Devotion
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 8px', color: 'var(--nxr-ink)' }}>Reading Plans</h1>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 14 }}>
          Activate a plan to keep it on your dashboard.
        </div>
      </header>

      <div>
        {READING_PLANS.map((p) => {
          const active = activeIds.includes(p.id)
          const prog = progress[p.id]
          return (
            <div key={p.id} className="plan-card">
              <div className="head">
                <h2 className="plan-title">{p.title}</h2>
                {active && (
                  <span className="active-pill">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Active
                  </span>
                )}
              </div>
              <p className="dek">{p.dek}</p>
              <div className="stamp">{p.stamp} &middot; {p.duration}</div>
              {active && prog && <PlanProgress plan={p} prog={prog} mark={markDay} resetStart={resetStart} />}
              {active ? (
                <button className="deactivate" onClick={() => toggle(p.id)}>Deactivate</button>
              ) : (
                <button
                  onClick={() => toggle(p.id)}
                  style={{
                    background: 'transparent', border: '1px solid var(--nxr-rule)',
                    padding: '10px 22px', cursor: 'pointer',
                    fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: 'var(--nxr-brass)',
                  }}
                >
                  Activate Plan
                </button>
              )}
            </div>
          )
        })}
      </div>
    </article>
  )
}

function PlanProgress({ plan, prog, mark, resetStart }: {
  plan: ReadingPlan
  prog: { startDate: string; completedDays: number[] }
  mark: (planId: string, day: number, done: boolean) => void
  resetStart: (planId: string) => void
}) {
  const today = todayDayIndex(prog.startDate)
  const clampedToday = Math.max(1, Math.min(plan.days, today))
  const completed = prog.completedDays.length
  const pct = Math.round((completed / plan.days) * 100)
  const todayDone = prog.completedDays.includes(clampedToday)
  const behind = today > 0 ? Math.max(0, clampedToday - completed) : 0
  const defBible = useHymnalStore((s) => s.defaultBible)
  const reading = today >= 1 && today <= plan.days ? readingForDay(plan.id, clampedToday) : null

  return (
    <div className="plan-progress">
      <div className="row">
        <span className="lbl">
          {today < 1 ? 'Not yet begun' : today > plan.days ? `Completed (Day ${plan.days})` : `Day ${clampedToday} of ${plan.days}`}
        </span>
        <span className="pct">{pct}% &middot; {completed}/{plan.days}</span>
      </div>
      <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
      {reading && reading.length > 0 && (
        <div style={{ marginTop: 10, fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--nxr-ink-soft)' }}>
          <span style={{ fontStyle: 'italic', color: 'var(--nxr-ink-mute)' }}>Today&rsquo;s reading: </span>
          {reading.map((s, i) => (
            <span key={`${s.bookId}-${s.from}`}>
              {i > 0 && ' · '}
              <Link
                href={`/hymnal/bible/${defBible}/${s.bookId}/${s.from}`}
                style={{ color: 'var(--nxr-brass)', textDecoration: 'none', borderBottom: '1px solid var(--nxr-rule)' }}
              >
                {s.from === s.to ? `${s.bookName} ${s.from}` : `${s.bookName} ${s.from}–${s.to}`}
              </Link>
            </span>
          ))}
        </div>
      )}
      {today >= 1 && today <= plan.days && (
        <div className="row" style={{ marginTop: 10 }}>
          <button
            className="mark-today"
            onClick={() => mark(plan.id, clampedToday, !todayDone)}
            aria-pressed={todayDone}
          >
            {todayDone ? '\u2713 Day done' : 'Mark today read'}
          </button>
          {behind > 1 && <span className="behind">{behind - 1} day{behind - 1 === 1 ? '' : 's'} behind</span>}
        </div>
      )}
      <button
        className="reset"
        onClick={() => { if (confirm('Reset progress and start over from today?')) resetStart(plan.id) }}
      >
        Reset start to today
      </button>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { READING_PLANS } from '@/lib/hymnal/plans'
import { useHymnalStore } from '@/store/hymnal'

export default function ReadingPlans() {
  const router = useRouter()
  const activeIds = useHymnalStore((s) => s.activePlanIds)
  const toggle = useHymnalStore((s) => s.toggleActivePlan)

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
          return (
            <div key={p.id} className="plan-card">
              <div className="head">
                <h3>{p.title}</h3>
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

'use client'

import { useState, FormEvent, ReactNode } from 'react'
import Link from 'next/link'

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC']

const STANCE_OPTIONS = [
  { key: 'anti', mark: '\u2020', name: 'Anti-Zionist', desc: 'Opposes Christian Zionism' },
  { key: 'no', mark: '\u2726', name: 'Non-Zionist', desc: 'No Zionist theology' },
  { key: 'yes', mark: '\u2691', name: 'Zionist', desc: 'Pro-Zionist views' },
  { key: 'unknown', mark: '?', name: 'Unknown', desc: 'Stance not yet clear' },
]

const INITIAL = {
  name: '', denomination: '', description: '',
  address: '', city: '', state: '', zip: '',
  website: '', phone: '', pastor: '',
  zionistStance: '', theologicalNotes: '', source: '',
  honeypot: '',
}

function Field({ label, required, optional, children }: { label: string; required?: boolean; optional?: boolean; children: ReactNode }) {
  return (
    <div className="field">
      <div className="field-label">
        <span>{label}{required && <span className="req"> *</span>}</span>
        {optional && <span className="opt">optional</span>}
      </div>
      {children}
    </div>
  )
}

function FormSection({ num, title, titleEm, help, children }: { num: string; title: string; titleEm: string; help: string; children: ReactNode }) {
  return (
    <section className="form-section">
      <div className="form-section-head">
        <div className="form-section-num">&sect; {num}</div>
        <div className="form-section-title">{title} <em>{titleEm}</em></div>
        <div className="form-section-help">{help}</div>
      </div>
      <div className="form-fields">{children}</div>
    </section>
  )
}

export default function SubmitForm() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const set = (k: keyof typeof INITIAL, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const theologicalNotes = [
      form.theologicalNotes.trim(),
      form.pastor.trim() ? `Pastor ${form.pastor.trim()}.` : '',
      form.source.trim() ? `Source: ${form.source.trim()}` : '',
    ].filter(Boolean).join(' ')

    try {
      const res = await fetch('/api/churches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          denomination: form.denomination,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          website: form.website,
          phone: form.phone,
          zionistStance: form.zionistStance,
          theologicalNotes,
          description: form.description,
          honeypot: form.honeypot,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit church')
      }
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="page-wrap">
        <div className="success-card">
          <div className="success-mark">&#10086;</div>
          <div className="success-title">Submission <em>Received</em></div>
          <div className="success-msg">
            Thank you for contributing to the directory. Our editorial team will review{' '}
            {form.name ? <strong style={{ color: 'var(--ink)', fontStyle: 'normal' }}>{form.name}</strong> : 'your submission'}{' '}
            and verify the church&apos;s confession before publication. Expect a response within seven days.
          </div>
          <Link href="/" className="btn-submit" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Return to Directory
          </Link>
        </div>
      </div>
    )
  }

  const submitDisabled = !form.name.trim() || !form.zionistStance || !form.address.trim() || !form.city.trim() || !form.state || status === 'submitting'

  return (
    <form className="page-wrap" onSubmit={onSubmit}>
      <div className="page-intro">
        <span className="page-eyebrow">Community Submission</span>
        <h1 className="page-h1">Submit a <em>Church</em></h1>
        <p className="page-lede">
          Help us build the directory. Submit a congregation and tell us its theological stance.
          All entries are reviewed by our editors before being published.
        </p>
      </div>

      {status === 'error' && (
        <div style={{
          padding: '14px 18px',
          border: '1px solid var(--oxblood)',
          background: 'var(--paper)',
          color: 'var(--oxblood)',
          fontFamily: 'var(--mono)',
          fontSize: 12,
          letterSpacing: '0.08em',
          marginBottom: 24,
        }}>
          {errorMessage}
        </div>
      )}

      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, overflow: 'hidden' }}>
        <label htmlFor="honeypot">Leave blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={form.honeypot}
          onChange={e => set('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FormSection num="I" title="Church" titleEm="Information" help="The basic identifying details — name, denominational affiliation, and a short description for fellow seekers.">
        <Field label="Church Name" required>
          <input type="text" required maxLength={200} placeholder="e.g. Grace Community Church" value={form.name} onChange={e => set('name', e.target.value)} />
        </Field>
        <Field label="Denomination" optional>
          <input type="text" maxLength={100} placeholder="e.g. Reformed Baptist · PCA · OPC · Independent" value={form.denomination} onChange={e => set('denomination', e.target.value)} />
        </Field>
        <Field label="Description" optional>
          <textarea maxLength={1000} placeholder="A brief portrait of the congregation — its history, distinctives, and community character&hellip;" value={form.description} onChange={e => set('description', e.target.value)} />
        </Field>
      </FormSection>

      <FormSection num="II" title="Where it" titleEm="Gathers" help="Physical address. We use this to place the congregation on the map and verify its presence.">
        <Field label="Street Address" required>
          <input type="text" required maxLength={200} placeholder="123 Main Street" value={form.address} onChange={e => set('address', e.target.value)} />
        </Field>
        <div className="field-row cols-3">
          <Field label="City" required>
            <input type="text" required maxLength={100} placeholder="Nashville" value={form.city} onChange={e => set('city', e.target.value)} />
          </Field>
          <Field label="State" required>
            <select required value={form.state} onChange={e => set('state', e.target.value)}>
              <option value="" disabled>Select&hellip;</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="ZIP" optional>
            <input type="text" maxLength={10} placeholder="37201" value={form.zip} onChange={e => set('zip', e.target.value)} />
          </Field>
        </div>
      </FormSection>

      <FormSection num="III" title="Means of" titleEm="Contact" help="Public contact information — only what is already published by the church.">
        <div className="field-row cols-2">
          <Field label="Website" optional>
            <input type="url" placeholder="https://" value={form.website} onChange={e => set('website', e.target.value)} />
          </Field>
          <Field label="Telephone" optional>
            <input type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
        </div>
        <Field label="Pastor or Elder" optional>
          <input type="text" placeholder="Rev. John Smith" value={form.pastor} onChange={e => set('pastor', e.target.value)} />
        </Field>
      </FormSection>

      <FormSection num="IV" title="Theological" titleEm="Stance" help="The defining question — does this congregation hold to a Christian Zionist or pro-Israel theological position?">
        <Field label="Zionist Position" required>
          <div className="stance-grid">
            {STANCE_OPTIONS.map(s => (
              <div
                key={s.key}
                data-stance={s.key}
                className={`stance-card${form.zionistStance === s.key ? ' selected' : ''}`}
                onClick={() => set('zionistStance', s.key)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('zionistStance', s.key) } }}
              >
                <div className="stance-mark">{s.mark}</div>
                <div className="stance-name">{s.name}</div>
                <div className="stance-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </Field>
        <Field label="Confessional Notes" optional>
          <textarea maxLength={1000} placeholder="e.g. Covenantal amillennial · Holds to the Westminster Standards · Rejects dispensationalism · 1689 LBCF&hellip;" value={form.theologicalNotes} onChange={e => set('theologicalNotes', e.target.value)} />
        </Field>
        <Field label="Source or Reference" optional>
          <input type="text" placeholder="Statement of faith URL · sermon citation · published article" value={form.source} onChange={e => set('source', e.target.value)} />
        </Field>
      </FormSection>

      <div className="submit-bar">
        <div className="submit-note">
          Submissions are reviewed manually. We verify the church&apos;s confession before publication and may correspond with leadership.
        </div>
        <button type="submit" className="btn-submit" disabled={submitDisabled}>
          {status === 'submitting' ? 'Submitting\u2026' : 'Submit Church for Review \u2192'}
        </button>
      </div>

      <Link href="/" className="back-link">&larr; Back to Directory</Link>
    </form>
  )
}

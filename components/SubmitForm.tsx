'use client'

import { useState, FormEvent } from 'react'

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }, { value: 'DC', label: 'Washington D.C.' },
]

const INITIAL_FORM = {
  name: '',
  denomination: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  website: '',
  phone: '',
  zionistStance: 'unknown',
  theologicalNotes: '',
  description: '',
  honeypot: '',
}

export default function SubmitForm() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/churches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          denomination: formData.denomination,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          website: formData.website,
          phone: formData.phone,
          zionistStance: formData.zionistStance,
          theologicalNotes: formData.theologicalNotes,
          description: formData.description,
          honeypot: formData.honeypot,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit church')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl border border-cream p-8 sm:p-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Church Submitted!</h2>
        <p className="font-body text-gray-500 mt-3 max-w-sm mx-auto leading-relaxed">
          Thank you for your contribution. Your submission will be reviewed before appearing in the directory.
        </p>
        <button
          onClick={() => { setStatus('idle'); setFormData(INITIAL_FORM) }}
          className="mt-6 px-8 py-3 bg-gold text-white font-body text-sm font-bold rounded-xl hover:bg-gold-light transition-colors shadow-md shadow-gold/15 uppercase tracking-wide"
        >
          Submit Another Church
        </button>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border border-cream bg-ivory/50 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-all'
  const labelClasses = 'block font-body text-sm font-semibold text-navy/80 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 font-body text-sm text-red-700 mb-6">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field - hidden from real users */}
      <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
        <label htmlFor="honeypot">Leave blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={e => updateField('honeypot', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Church Info Section */}
      <fieldset className="bg-white rounded-xl border border-cream p-5 sm:p-6">
        <legend className="sr-only">Church Information</legend>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-navy/8 flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-navy/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">Church Information</h3>
            <p className="font-body text-xs text-gray-400 mt-0.5">Basic details about the church</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Church Name <span className="text-burgundy">*</span></label>
            <input type="text" required maxLength={200} value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="e.g. Grace Community Church" className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Denomination</label>
            <input type="text" maxLength={100} value={formData.denomination} onChange={e => updateField('denomination', e.target.value)} placeholder="e.g. Southern Baptist, Non-Denominational, PCA" className={inputClasses} />
          </div>

          <div>
            <label className={labelClasses}>Description</label>
            <textarea maxLength={1000} rows={3} value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="Brief description of the church, its beliefs, and community..." className={inputClasses + ' resize-none'} />
          </div>
        </div>
      </fieldset>

      <div className="py-3 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-cream to-transparent"></div>
      </div>

      {/* Location Section */}
      <fieldset className="bg-white rounded-xl border border-cream p-5 sm:p-6">
        <legend className="sr-only">Location</legend>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-navy/8 flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-navy/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">Location</h3>
            <p className="font-body text-xs text-gray-400 mt-0.5">Where the church is located</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Street Address <span className="text-burgundy">*</span></label>
            <input type="text" required maxLength={200} value={formData.address} onChange={e => updateField('address', e.target.value)} placeholder="e.g. 123 Main Street" className={inputClasses} />
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-7 gap-3">
            <div className="col-span-3 sm:col-span-3">
              <label className={labelClasses}>City <span className="text-burgundy">*</span></label>
              <input type="text" required maxLength={100} value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="Nashville" className={inputClasses} />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <label className={labelClasses}>State <span className="text-burgundy">*</span></label>
              <select required value={formData.state} onChange={e => updateField('state', e.target.value)} className={inputClasses}>
                <option value="">Select</option>
                {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-span-3 sm:col-span-2">
              <label className={labelClasses}>ZIP Code</label>
              <input type="text" maxLength={10} value={formData.zip} onChange={e => updateField('zip', e.target.value)} placeholder="37201" className={inputClasses} />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="py-3 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-cream to-transparent"></div>
      </div>

      {/* Contact Section */}
      <fieldset className="bg-white rounded-xl border border-cream p-5 sm:p-6">
        <legend className="sr-only">Contact</legend>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-navy/8 flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-navy/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">Contact</h3>
            <p className="font-body text-xs text-gray-400 mt-0.5">Optional contact information</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Website</label>
            <input type="url" value={formData.website} onChange={e => updateField('website', e.target.value)} placeholder="https://..." className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Phone</label>
            <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="(555) 123-4567" className={inputClasses} />
          </div>
        </div>
      </fieldset>

      <div className="py-3 flex justify-center">
        <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-cream to-transparent"></div>
      </div>

      {/* Theological Section */}
      <fieldset className="bg-white rounded-xl border border-cream p-5 sm:p-6">
        <legend className="sr-only">Theological Stance</legend>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-navy/8 flex items-center justify-center">
            <span className="text-navy/60 text-base leading-none">&#10013;</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-navy">Theological Stance</h3>
            <p className="font-body text-xs text-gray-400 mt-0.5">Doctrinal position on Zionism</p>
          </div>
        </div>

        <div className="bg-ivory rounded-xl p-4 sm:p-5 border border-cream mb-5">
          <label className={labelClasses}>Zionist Stance <span className="text-burgundy">*</span></label>
          <p className="font-body text-xs text-gray-500 mb-3">Does this church hold a Christian Zionist / pro-Israel theological position?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { value: 'anti', label: 'Anti-Zionist', desc: 'Opposes Christian Zionism', accent: 'border-emerald-600/50 bg-emerald-50 text-emerald-700 shadow-emerald-100/50 shadow-md' },
              { value: 'no', label: 'Non-Zionist', desc: 'No Zionist theology', accent: 'border-gold/50 bg-gold-pale text-gold shadow-gold-pale/50 shadow-md' },
              { value: 'yes', label: 'Zionist', desc: 'Pro-Israel views', accent: 'border-burgundy/40 bg-burgundy/5 text-burgundy shadow-burgundy/5 shadow-md' },
              { value: 'unknown', label: 'Unknown', desc: "Stance isn't clear", accent: 'border-gray-300 bg-gray-50 text-gray-600 shadow-gray-100/50 shadow-md' },
            ].map(opt => (
              <label
                key={opt.value}
                className={`cursor-pointer rounded-xl border-2 p-3 sm:p-3.5 transition-all text-center ${
                  formData.zionistStance === opt.value
                    ? opt.accent
                    : 'border-cream bg-white text-gray-600 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <input
                  type="radio"
                  name="zionistStance"
                  value={opt.value}
                  checked={formData.zionistStance === opt.value}
                  onChange={e => updateField('zionistStance', e.target.value)}
                  className="sr-only"
                />
                <span className="font-body text-sm font-bold block">{opt.label}</span>
                <span className="font-body text-[11px] opacity-60 block mt-0.5">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Theological Notes</label>
          <p className="font-body text-xs text-gray-500 mb-1.5">Eschatology, confessional stance, relevant doctrinal details</p>
          <textarea maxLength={1000} rows={3} value={formData.theologicalNotes} onChange={e => updateField('theologicalNotes', e.target.value)} placeholder="e.g. Covenantal amillennial, Westminster Confession, rejects dispensationalism..." className={inputClasses + ' resize-none'} />
        </div>
      </fieldset>

      <div className="pt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-4 bg-navy text-white font-body text-sm font-bold rounded-xl hover:bg-navy-light active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-navy/15 tracking-wide uppercase"
        >
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Submitting...
            </span>
          ) : (
            'Submit Church for Review'
          )}
        </button>

        <p className="font-body text-xs text-gray-400 text-center mt-4">
          Submissions are reviewed manually. Please ensure all information is accurate.
        </p>
      </div>
    </form>
  )
}

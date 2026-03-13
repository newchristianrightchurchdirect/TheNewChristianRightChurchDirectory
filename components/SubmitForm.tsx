'use client'

import { useState, FormEvent } from 'react'

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'Washington D.C.' },
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
        body: JSON.stringify(formData),
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
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold text-navy">Church Submitted!</h2>
        <p className="font-body text-gray-500 mt-3 max-w-sm mx-auto leading-relaxed">
          Thank you for your contribution. Your submission will be reviewed before appearing in the directory.
        </p>
        <button
          onClick={() => { setStatus('idle'); setFormData(INITIAL_FORM) }}
          className="mt-6 px-6 py-2.5 bg-gold text-white font-body text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
        >
          Submit Another Church
        </button>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-2.5 rounded-lg border border-gray-200 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all bg-white'
  const labelClasses = 'block font-body text-sm font-medium text-navy mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 font-body text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label className={labelClasses}>Church Name <span className="text-burgundy">*</span></label>
        <input type="text" required maxLength={200} value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="e.g. Grace Community Church" className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Denomination</label>
        <input type="text" maxLength={100} value={formData.denomination} onChange={e => updateField('denomination', e.target.value)} placeholder="e.g. Southern Baptist, Non-Denominational, PCA" className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>Street Address <span className="text-burgundy">*</span></label>
        <input type="text" required maxLength={200} value={formData.address} onChange={e => updateField('address', e.target.value)} placeholder="e.g. 123 Main Street" className={inputClasses} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>City <span className="text-burgundy">*</span></label>
          <input type="text" required maxLength={100} value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="e.g. Nashville" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>State <span className="text-burgundy">*</span></label>
          <select required value={formData.state} onChange={e => updateField('state', e.target.value)} className={inputClasses}>
            <option value="">Select State</option>
            {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>ZIP Code</label>
        <input type="text" maxLength={10} value={formData.zip} onChange={e => updateField('zip', e.target.value)} placeholder="e.g. 37201" className={inputClasses} />
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

      <div>
        <label className={labelClasses}>Description</label>
        <textarea maxLength={1000} rows={3} value={formData.description} onChange={e => updateField('description', e.target.value)} placeholder="Brief description of the church, its beliefs, and community..." className={inputClasses + ' resize-none'} />
      </div>

      {/* Zionist Stance */}
      <div className="bg-ivory rounded-xl p-4 border border-cream">
        <label className={labelClasses}>Zionist Stance <span className="text-burgundy">*</span></label>
        <p className="font-body text-xs text-gray-500 mb-3">Does this church hold a Christian Zionist / pro-Israel theological position?</p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'no', label: 'Non-Zionist', desc: 'Does not hold Christian Zionist theology', accent: 'border-gold/40 bg-gold/5 text-gold' },
            { value: 'yes', label: 'Zionist', desc: 'Holds pro-Israel / dispensational views', accent: 'border-burgundy/30 bg-burgundy/5 text-burgundy' },
            { value: 'unknown', label: 'Unknown', desc: "Not sure or stance isn't clear", accent: 'border-gray-300 bg-gray-50 text-gray-600' },
          ].map(opt => (
            <label
              key={opt.value}
              className={`flex-1 min-w-[140px] cursor-pointer rounded-lg border-2 p-3 transition-all ${
                formData.zionistStance === opt.value
                  ? opt.accent
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
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
              <span className="font-body text-sm font-semibold block">{opt.label}</span>
              <span className="font-body text-xs opacity-70 block mt-0.5">{opt.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Theological Notes */}
      <div>
        <label className={labelClasses}>Theological Notes</label>
        <p className="font-body text-xs text-gray-500 mb-1.5">Eschatology, confessional stance, relevant doctrinal details</p>
        <textarea maxLength={1000} rows={3} value={formData.theologicalNotes} onChange={e => updateField('theologicalNotes', e.target.value)} placeholder="e.g. Covenantal amillennial, Westminster Confession, rejects dispensationalism..." className={inputClasses + ' resize-none'} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 bg-navy text-white font-body text-sm font-semibold rounded-xl hover:bg-navy-light active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
    </form>
  )
}

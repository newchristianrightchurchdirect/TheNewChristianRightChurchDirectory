'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import ChurchCard from './ChurchCard'

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-navy-light flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3"></div>
        <p className="font-body text-sm text-white/40">Loading map...</p>
      </div>
    </div>
  ),
})

interface Church {
  id: number
  name: string
  denomination: string | null
  address: string
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  website: string | null
  phone: string | null
  proZionist: boolean
  description: string | null
}

export default function ChurchDirectory() {
  const [churches, setChurches] = useState<Church[]>([])
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [zionistFilter, setZionistFilter] = useState<'all' | 'yes' | 'no'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/churches')
      .then(res => res.json())
      .then(data => {
        setChurches(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return churches.filter(c => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.denomination?.toLowerCase().includes(q)

      const matchesState = !stateFilter || c.state === stateFilter

      const matchesZionist =
        zionistFilter === 'all' ||
        (zionistFilter === 'yes' && c.proZionist) ||
        (zionistFilter === 'no' && !c.proZionist)

      return matchesSearch && matchesState && matchesZionist
    })
  }, [churches, search, stateFilter, zionistFilter])

  const states = useMemo(() => {
    return [...new Set(churches.map(c => c.state))].sort()
  }, [churches])

  const totalCount = churches.length
  const proZionistCount = churches.filter(c => c.proZionist).length

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero + Map */}
      <section className="relative">
        {/* Decorative bar */}
        <div className="bg-navy px-4 py-5 sm:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
                The New <span className="text-gold">Christian Right</span> Church Directory
              </h1>
              <p className="font-body text-sm text-white/50 mt-1">
                A directory of conservative, Bible-believing churches across America
              </p>
            </div>
            {!loading && (
              <div className="flex items-center gap-4 font-body text-xs text-white/50">
                <span>{totalCount} churches</span>
                <span className="w-px h-3 bg-white/20"></span>
                <span className="text-gold/70">{proZionistCount} pro-Zionist</span>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="h-[55vh] sm:h-[60vh] relative">
          <MapView churches={filtered} />

          {/* Search overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-[1000] p-3 sm:p-5">
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-2xl shadow-navy/15 border border-cream p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* Search input */}
                <div className="flex-1 relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, city, or denomination..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>

                {/* State filter */}
                <select
                  value={stateFilter}
                  onChange={e => setStateFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white transition-all min-w-[130px]"
                >
                  <option value="">All States</option>
                  {states.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                {/* Zionist filter */}
                <select
                  value={zionistFilter}
                  onChange={e => setZionistFilter(e.target.value as 'all' | 'yes' | 'no')}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white transition-all min-w-[150px]"
                >
                  <option value="all">All Churches</option>
                  <option value="yes">Pro-Zionist Only</option>
                  <option value="no">Non-Zionist Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold accent divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h2 className="font-display text-2xl font-semibold text-navy">
            {loading
              ? 'Loading directory...'
              : `${filtered.length} ${filtered.length === 1 ? 'Church' : 'Churches'} Found`}
          </h2>
          <div className="flex items-center gap-4 text-xs font-body text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gold inline-block shadow-sm"></span>
              Pro-Zionist
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-burgundy inline-block shadow-sm"></span>
              Non-Zionist
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-cream p-5 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-12 bg-gray-50 rounded w-full mt-3"></div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="font-display text-xl text-gray-400">No churches found</p>
            <p className="font-body text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((church, i) => (
              <ChurchCard key={church.id} church={church} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

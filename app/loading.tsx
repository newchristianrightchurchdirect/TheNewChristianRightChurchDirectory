export default function Loading() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero skeleton */}
      <div className="bg-navy px-4 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-white/10 rounded w-80 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/5 rounded w-64 animate-pulse"></div>
        </div>
      </div>

      {/* Map skeleton */}
      <div className="h-[55vh] sm:h-[60vh] bg-navy-light animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3"></div>
          <p className="font-body text-sm text-white/40">Loading map...</p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

      {/* Cards skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="h-7 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
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
      </div>
    </div>
  )
}

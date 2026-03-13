import Link from 'next/link'

interface Church {
  id: number
  name: string
  denomination: string | null
  city: string
  state: string
  zionistStance: string
  website: string | null
  phone: string | null
  description: string | null
  upvotes: number
}

function StanceBadge({ stance }: { stance: string }) {
  if (stance === 'no') {
    return (
      <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-body font-bold text-gold bg-gold-pale/80 px-2.5 py-1 rounded-full border border-gold/25 uppercase tracking-wider">
        &#10013; Non-Zionist
      </span>
    )
  }
  if (stance === 'yes') {
    return (
      <span className="shrink-0 inline-flex items-center text-[11px] font-body font-medium text-burgundy/60 bg-burgundy/8 px-2.5 py-1 rounded-full border border-burgundy/10 uppercase tracking-wider">
        Zionist
      </span>
    )
  }
  return (
    <span className="shrink-0 inline-flex items-center text-[11px] font-body font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 uppercase tracking-wider">
      Unknown
    </span>
  )
}

export default function ChurchCard({ church, index }: { church: Church; index: number }) {
  return (
    <Link
      href={`/church/${church.id}`}
      className="animate-fade-in-up bg-white rounded-xl border border-cream shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 p-5 group block"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-navy leading-snug group-hover:text-gold transition-colors">
          {church.name}
        </h3>
        <StanceBadge stance={church.zionistStance} />
      </div>

      {church.denomination && (
        <p className="font-body text-xs font-medium text-burgundy mt-1.5 uppercase tracking-wide">
          {church.denomination}
        </p>
      )}

      <p className="font-body text-sm text-gray-500 mt-2 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {church.city}, {church.state}
      </p>

      {church.description && (
        <p className="font-body text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2">
          {church.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {church.website && (
            <span className="text-xs font-body font-medium text-gold">
              Has Website
            </span>
          )}
          {church.phone && (
            <span className="text-xs font-body text-gray-400">
              {church.phone}
            </span>
          )}
        </div>
        {church.upvotes > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-body text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            {church.upvotes}
          </span>
        )}
      </div>
    </Link>
  )
}

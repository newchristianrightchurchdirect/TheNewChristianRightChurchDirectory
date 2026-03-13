interface Church {
  id: number
  name: string
  denomination: string | null
  city: string
  state: string
  proZionist: boolean
  website: string | null
  phone: string | null
  description: string | null
}

export default function ChurchCard({ church, index }: { church: Church; index: number }) {
  return (
    <div
      className="animate-fade-in-up bg-white rounded-xl border border-cream shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 p-5 group"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-navy leading-snug group-hover:text-gold transition-colors">
          {church.name}
        </h3>
        {church.proZionist && (
          <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-body font-semibold text-gold bg-gold-pale/80 px-2.5 py-1 rounded-full border border-gold/20 uppercase tracking-wider">
            &#10017; Zionist
          </span>
        )}
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

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
        {church.website && (
          <a
            href={church.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-body font-medium text-gold hover:text-gold-light transition-colors"
          >
            Visit Website
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        {church.phone && (
          <a
            href={`tel:${church.phone}`}
            className="text-xs font-body text-gray-400 hover:text-navy transition-colors"
          >
            {church.phone}
          </a>
        )}
        {!church.proZionist && (
          <span className="ml-auto text-[11px] font-body text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            Non-Zionist
          </span>
        )}
      </div>
    </div>
  )
}

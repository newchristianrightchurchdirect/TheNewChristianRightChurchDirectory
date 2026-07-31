import Link from 'next/link'

interface Church {
  id: number
  name: string
  denomination: string | null
  city: string
  state: string
  zionistStance: string
  culturalEngagement: string
  abolitionStance: string
  website: string | null
  phone: string | null
  description: string | null
  theologicalNotes: string | null
}

// PRIMARY axis - does the church act corporately on public questions?
const POSITION: Record<string, { cls: string; label: string }> = {
  transformationalist: { cls: 'transformationalist', label: '† Transformational' },
  single_issue: { cls: 'single-issue', label: 'Single Issue' },
  limited_mission: { cls: 'limited-mission', label: 'Limited Mission' },
  quietist: { cls: 'quietist', label: 'Quietist' },
  unknown: { cls: 'unknown', label: 'Unverified' },
}

// SECONDARY indicators - shown only when they say something, so the card stays quiet.
function indicators(c: Church): Array<{ cls: string; label: string }> {
  const out: Array<{ cls: string; label: string }> = []
  if (c.abolitionStance === 'pro_abolition') out.push({ cls: 'abolition', label: 'Abolitionist' })
  if (c.zionistStance === 'anti') out.push({ cls: 'anti-zionist', label: 'Anti-Zionist' })
  else if (c.zionistStance === 'yes') out.push({ cls: 'zionist', label: 'Zionist' })
  return out
}

interface Props {
  church: Church
  index: number
  active: boolean
  onClick: () => void
}

export default function ChurchCard({ church, index, active, onClick }: Props) {
  const position = POSITION[church.culturalEngagement] || POSITION.unknown
  const tags = indicators(church)
  const blurb = church.description || church.theologicalNotes || ''

  return (
    <div
      className={`church-card${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="church-num">N&deg;{String(index).padStart(2, '0')}</div>
      <div className="church-body">
        <div className="church-name">
          <Link
            href={`/church/${church.id}`}
            className="church-name-link"
            onClick={e => e.stopPropagation()}
          >
            {church.name}
          </Link>
        </div>
        {church.denomination && <div className="church-denom">{church.denomination}</div>}
        <div className="church-loc">{church.city}, {church.state}</div>
        {blurb && <div className="church-blurb">{blurb}</div>}
        <div className="church-meta-row">
          {church.website && <span className="has-site">&uarr; Website</span>}
          {church.phone && <span>{church.phone}</span>}
        </div>
      </div>
      <div className="church-tags">
        <div className={`church-tag ${position.cls}`}>{position.label}</div>
        {tags.map(t => (
          <div key={t.cls} className={`church-tag indicator ${t.cls}`}>{t.label}</div>
        ))}
      </div>
    </div>
  )
}

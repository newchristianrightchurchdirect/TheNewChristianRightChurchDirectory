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
  theologicalNotes: string | null
}

const POSITION: Record<string, { cls: string; label: string }> = {
  anti: { cls: 'anti-zionist', label: '† Anti-Zion' },
  no: { cls: 'non-zionist', label: 'Non-Zion' },
  yes: { cls: 'zionist', label: 'Zionist' },
  unknown: { cls: 'unknown', label: 'Unverified' },
}

interface Props {
  church: Church
  index: number
  active: boolean
  onClick: () => void
}

export default function ChurchCard({ church, index, active, onClick }: Props) {
  const position = POSITION[church.zionistStance] || POSITION.unknown
  const blurb = church.description || church.theologicalNotes || ''

  return (
    <button
      type="button"
      className={`church-card${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="church-num">N&deg;{String(index).padStart(2, '0')}</div>
      <div className="church-body">
        <div className="church-name">{church.name}</div>
        {church.denomination && <div className="church-denom">{church.denomination}</div>}
        <div className="church-loc">{church.city}, {church.state}</div>
        {blurb && <div className="church-blurb">{blurb}</div>}
        <div className="church-meta-row">
          {church.website && <span className="has-site">&uarr; Website</span>}
          {church.phone && <span>{church.phone}</span>}
        </div>
      </div>
      <div className={`church-tag ${position.cls}`}>{position.label}</div>
    </button>
  )
}

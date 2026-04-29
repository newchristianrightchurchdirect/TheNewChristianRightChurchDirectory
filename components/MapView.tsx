'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Church {
  id: number
  name: string
  denomination: string | null
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  zionistStance: string
}

const POSITION_CLASS: Record<string, string> = {
  anti: 'anti-zionist',
  no: 'non-zionist',
  yes: 'zionist',
  unknown: 'unknown',
}

interface MapViewProps {
  churches: Church[]
  activeId?: number | null
  onSelect?: (id: number) => void
}

export default function MapView({ churches, activeId = null, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Record<number, L.Marker>>({})
  const onSelectRef = useRef(onSelect)

  useEffect(() => { onSelectRef.current = onSelect }, [onSelect])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [39.5, -98.5],
      zoom: 4,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      minZoom: 3,
      maxZoom: 18,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &middot; Carto',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      pane: 'shadowPane',
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = {}
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    const withCoords = churches.filter(c => c.latitude != null && c.longitude != null)
    withCoords.forEach(church => {
      const positionClass = POSITION_CLASS[church.zionistStance] || 'unknown'
      const icon = L.divIcon({
        className: '',
        html: `<div class="church-marker ${positionClass}" data-id="${church.id}"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      })
      const marker = L.marker([church.latitude!, church.longitude!], { icon }).addTo(map)
      const denom = church.denomination ? `${church.denomination} &middot; ` : ''
      marker.bindPopup(
        `<div class="popup-name">${church.name}</div>
         <div class="popup-meta">${denom}${church.city}, ${church.state}</div>
         <div class="popup-link">View Details &rarr;</div>`,
        { closeButton: false, offset: [0, -4] }
      )
      marker.on('click', () => onSelectRef.current?.(church.id))
      markersRef.current[church.id] = marker
    })
  }, [churches])

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement()?.querySelector('.church-marker')
      if (!el) return
      if (Number(id) === activeId) el.classList.add('active')
      else el.classList.remove('active')
    })
  }, [activeId])

  const zoom = (delta: number) => {
    const m = mapRef.current
    if (m) m.setZoom(m.getZoom() + delta)
  }

  return (
    <section className="map-region">
      <div className="map-frame">
        <div ref={containerRef} className="map-canvas" />
        <div className="map-corner tl">Fig. 01 &middot; United States</div>
        <div className="map-corner tr">Mercator Projection</div>
        <div className="map-corner bl">Updated &middot; MMXXVI</div>
        <div className="map-corner br">Scale &Vert; Variable</div>

        <div className="map-zoom">
          <button onClick={() => zoom(1)} aria-label="Zoom in">+</button>
          <button onClick={() => zoom(-1)} aria-label="Zoom out">&minus;</button>
        </div>

        <div className="map-legend">
          <div className="map-legend-title">Legend</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--oxblood)' }} />Anti-Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--brass)' }} />Non-Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--ink)' }} />Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--ink-mute)' }} />Unverified</div>
        </div>
      </div>
    </section>
  )
}

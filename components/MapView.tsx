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
  proZionist: boolean
  website: string | null
}

function createMarkerIcon(proZionist: boolean) {
  const color = proZionist ? '#C49A3C' : '#8B2E3B'
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        position: relative;
      ">
        <div style="
          width: 26px;
          height: 26px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          position: absolute;
          top: 0;
          left: 2px;
        ">
          <span style="
            display: block;
            transform: rotate(45deg);
            text-align: center;
            line-height: 20px;
            color: white;
            font-size: 11px;
          ">&#10013;</span>
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })
}

function buildPopupHtml(church: Church): string {
  let html = `<div style="min-width:180px;font-family:'Plus Jakarta Sans',system-ui,sans-serif">`
  html += `<h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;font-weight:600;color:#0A1628;margin:0 0 4px 0">${church.name}</h3>`
  if (church.denomination) {
    html += `<p style="font-size:11px;color:#8B2E3B;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin:0 0 6px 0">${church.denomination}</p>`
  }
  html += `<p style="font-size:12px;color:#6b7280;margin:0 0 8px 0">${church.city}, ${church.state}</p>`
  html += `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">`
  if (church.proZionist) {
    html += `<span style="font-size:10px;font-weight:700;color:#C49A3C;background:#F5ECD7;padding:2px 8px;border-radius:9999px;border:1px solid rgba(196,154,60,0.2);text-transform:uppercase;letter-spacing:0.5px">&#10017; Pro-Zionist</span>`
  }
  if (church.website) {
    html += `<a href="${church.website}" target="_blank" rel="noopener noreferrer" style="font-size:11px;color:#C49A3C;text-decoration:none;font-weight:500">Website &rarr;</a>`
  }
  html += `</div></div>`
  return html
}

export default function MapView({ churches }: { churches: Church[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [39.8283, -98.5795],
      zoom: 4,
      zoomControl: false,
      scrollWheelZoom: true,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map)

    markersRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = null
    }
  }, [])

  // Update markers when churches change
  useEffect(() => {
    const map = mapRef.current
    const markerGroup = markersRef.current
    if (!map || !markerGroup) return

    markerGroup.clearLayers()

    const withCoords = churches.filter(c => c.latitude != null && c.longitude != null)

    withCoords.forEach(church => {
      const marker = L.marker([church.latitude!, church.longitude!], {
        icon: createMarkerIcon(church.proZionist),
      })
      marker.bindPopup(buildPopupHtml(church))
      markerGroup.addLayer(marker)
    })

    if (withCoords.length > 1) {
      const bounds = L.latLngBounds(
        withCoords.map(c => [c.latitude!, c.longitude!] as [number, number])
      )
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 })
    } else if (withCoords.length === 1) {
      map.setView([withCoords[0].latitude!, withCoords[0].longitude!], 10)
    }
  }, [churches])

  return <div ref={containerRef} className="w-full h-full" />
}

import type { Map as LeafletMap } from 'leaflet'
import { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { MapPinComponent, MapValue } from '../types'

interface Props {
  component: MapPinComponent
  value?: MapValue
  disabled?: boolean
  error?: string
  onChange: (value: MapValue) => void
}

const round = (value: number) => Math.round(value * 1_000_000) / 1_000_000
const defaultCenter: MapValue = { lat: 0, lng: 0 }
const defaultZoom = 2
const selectedZoom = 13

function MapClickSelector({ onSelect }: { onSelect: (next: MapValue) => void }) {
  useMapEvents({
    click(event) {
      onSelect({
        lat: round(event.latlng.lat),
        lng: round(event.latlng.lng)
      })
    }
  })

  return null
}

function MapViewportTracker({ onViewportChange }: { onViewportChange: (next: MapValue, zoom: number) => void }) {
  const map = useMapEvents({
    moveend() {
      const center = map.getCenter()
      onViewportChange(
        {
          lat: round(center.lat),
          lng: round(center.lng)
        },
        map.getZoom()
      )
    }
  })

  return null
}

function MapController({ center, zoom, onMapReady }: { center: MapValue; zoom: number; onMapReady: (map: LeafletMap) => void }) {
  const map = useMap()

  useEffect(() => {
    map.setView([center.lat, center.lng], zoom, { animate: false })
  }, [map, center.lat, center.lng, zoom])

  useEffect(() => {
    onMapReady(map)
  }, [map, onMapReady])

  return null
}

export function MapPinInput({ component, value, disabled, error, onChange }: Props) {
  const [center, setCenter] = useState<MapValue>(() => value ?? defaultCenter)
  const [zoom, setZoom] = useState<number>(() => (value ? selectedZoom : defaultZoom))
  const [map, setMap] = useState<LeafletMap | null>(null)

  useEffect(() => {
    if (value) {
      setCenter(value)
      setZoom(selectedZoom)
      return
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: round(position.coords.latitude),
          lng: round(position.coords.longitude)
        })
        setZoom(selectedZoom)
      },
      () => undefined,
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    )
  }, [value])

  const handleSelectPoint = (next: MapValue) => {
    onChange({ lat: round(next.lat), lng: round(next.lng) })
    setCenter(next)
    setZoom((currentZoom) => Math.max(currentZoom, selectedZoom))
  }

  const handleSelectCenter = () => {
    if (map) {
      const currentCenter = map.getCenter()
      handleSelectPoint({ lat: currentCenter.lat, lng: currentCenter.lng })
      return
    }

    handleSelectPoint(center)
  }

  const marker = value ?? null

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <span>{component.label}</span>
      <div
        style={{
          height: 280,
          marginTop: 4,
          border: '1px solid #d1d5db',
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#f8fafc'
        }}
      >
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={zoom}
          style={{ height: '100%', width: '100%', display: 'block' }}
          scrollWheelZoom={!disabled}
          keyboard={!disabled}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={center} zoom={zoom} onMapReady={setMap} />
          <MapClickSelector onSelect={handleSelectPoint} />
          <MapViewportTracker
            onViewportChange={(nextCenter, nextZoom) => {
              setCenter(nextCenter)
              setZoom(nextZoom)
            }}
          />
          {marker ? <CircleMarker center={[marker.lat, marker.lng]} radius={8} pathOptions={{ color: '#2563eb' }} /> : null}
        </MapContainer>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleSelectCenter}
        aria-label={`${component.label} use center`}
        style={{
          justifySelf: 'start',
          border: '1px solid #2563eb',
          backgroundColor: disabled ? '#e5e7eb' : '#2563eb',
          color: disabled ? '#6b7280' : '#ffffff',
          borderRadius: 8,
          padding: '8px 12px',
          fontWeight: 600,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        Use map center
      </button>
      <div style={{ color: '#374151' }}>
        {marker ? `Selected: ${marker.lat.toFixed(6)}, ${marker.lng.toFixed(6)}` : `Center: ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}`}
      </div>
      {error ? <small role="alert">{error}</small> : null}
    </div>
  )
}

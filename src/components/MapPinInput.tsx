import type { MapPinComponent } from '../types'

export interface MapValue {
  lat: number
  lng: number
}

interface Props {
  component: MapPinComponent
  value?: MapValue
  disabled?: boolean
  error?: string
  onChange: (value: MapValue) => void
}

const round = (value: number) => Math.round(value * 1_000_000) / 1_000_000

export function MapPinInput({ component, value, disabled, error, onChange }: Props) {
  const current = value ?? { lat: 0, lng: 0 }

  const handleSelectCenter = () => {
    onChange({ lat: round(current.lat), lng: round(current.lng) })
  }

  return (
    <div>
      <span>{component.label}</span>
      <button type="button" disabled={disabled} onClick={handleSelectCenter} aria-label={`${component.label} select center`}>
        Select center point
      </button>
      <div tabIndex={0} role="button" onKeyDown={(event) => (event.key === 'Enter' ? handleSelectCenter() : null)}>
        Map surface ({current.lat.toFixed(6)}, {current.lng.toFixed(6)})
      </div>
      {error ? <small role="alert">{error}</small> : null}
    </div>
  )
}

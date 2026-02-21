import type { SliderComponent } from '../types'

interface Props {
  component: SliderComponent
  value: number
  disabled?: boolean
  error?: string
  onChange: (value: number) => void
}

export function SliderInput({ component, value, disabled, error, onChange }: Props) {
  return (
    <label>
      <span>{component.label}</span>
      <input
        type="range"
        min={component.min}
        max={component.max}
        step={component.step ?? 1}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output>{value}</output>
      {error ? <small role="alert">{error}</small> : null}
    </label>
  )
}

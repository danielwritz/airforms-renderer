import type { NumberComponent } from '../types'

interface Props {
  component: NumberComponent
  value: string
  disabled?: boolean
  error?: string
  onChange: (value: string) => void
}

export function NumberInput({ component, value, disabled, error, onChange }: Props) {
  return (
    <label>
      <span>{component.label}</span>
      <input
        type="number"
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <small role="alert">{error}</small> : null}
    </label>
  )
}

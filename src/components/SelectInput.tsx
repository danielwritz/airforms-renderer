import type { SelectComponent } from '../types'

interface Props {
  component: SelectComponent
  value: string
  disabled?: boolean
  error?: string
  onChange: (value: string) => void
}

export function SelectInput({ component, value, disabled, error, onChange }: Props) {
  return (
    <label>
      <span>{component.label}</span>
      <select value={value} disabled={disabled} aria-invalid={Boolean(error)} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select…</option>
        {component.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <small role="alert">{error}</small> : null}
    </label>
  )
}

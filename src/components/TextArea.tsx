import type { TextareaComponent } from '../types'

interface Props {
  component: TextareaComponent
  value: string
  disabled?: boolean
  error?: string
  onChange: (value: string) => void
}

export function TextArea({ component, value, disabled, error, onChange }: Props) {
  return (
    <label>
      <span>{component.label}</span>
      <textarea
        value={value}
        placeholder={component.placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <small role="alert">{error}</small> : null}
    </label>
  )
}

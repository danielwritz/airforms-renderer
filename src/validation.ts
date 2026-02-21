import type { UiComponent } from './types'

const hasValue = (value: unknown) => {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

export function validateComponent(component: UiComponent, value: unknown): string | null {
  if (component.required && !hasValue(value)) {
    return 'This field is required.'
  }

  if (component.type === 'number' && hasValue(value)) {
    const num = Number(value)
    if (Number.isNaN(num)) return 'Must be a number.'
    if (component.min != null && num < component.min) return `Must be greater than or equal to ${component.min}.`
    if (component.max != null && num > component.max) return `Must be less than or equal to ${component.max}.`
  }

  if (component.type === 'select' && hasValue(value)) {
    const options = new Set(component.options.map((option) => option.value))
    if (!options.has(String(value))) return 'Invalid selection.'
  }

  if (component.type === 'slider' && hasValue(value)) {
    const num = Number(value)
    if (Number.isNaN(num)) return 'Must be a number.'
    if (num < component.min || num > component.max) return `Must be between ${component.min} and ${component.max}.`
    const step = component.step ?? 1
    const ratio = (num - component.min) / step
    if (Math.abs(ratio - Math.round(ratio)) > 1e-8) return 'Invalid slider step.'
  }

  return null
}

import type { UiComponent } from './types'

const hasValue = (value: unknown) => {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

const hasMapCoordinates = (value: unknown): value is { lat: number; lng: number } => {
  if (typeof value !== 'object' || value == null) {
    return false
  }

  const candidate = value as { lat?: unknown; lng?: unknown }
  return typeof candidate.lat === 'number' && Number.isFinite(candidate.lat) && typeof candidate.lng === 'number' && Number.isFinite(candidate.lng)
}

export function validateComponent(component: UiComponent, value: unknown): string | null {
  if (component.type === 'map_pin') {
    if (component.required && !hasValue(value)) {
      return 'This field is required.'
    }

    if (hasValue(value) && !hasMapCoordinates(value)) {
      return 'Select a valid map location.'
    }

    return null
  }

  if (component.required && !hasValue(value)) {
    return 'This field is required.'
  }

  if (component.type === 'number' && hasValue(value)) {
    const num = Number(value)
    if (Number.isNaN(num)) return 'Must be a number.'
  }

  if (component.type === 'select' && hasValue(value)) {
    const options = new Set(component.options.map((option) => option.value))
    if (!options.has(String(value))) return 'Invalid selection.'
  }

  if (component.type === 'slider' && hasValue(value)) {
    const num = Number(value)
    if (Number.isNaN(num)) return 'Must be a number.'
    if (num < component.min || num > component.max) return `Must be between ${component.min} and ${component.max}.`
    const ratio = (num - component.min) / component.step
    if (Math.abs(ratio - Math.round(ratio)) > 1e-8) return 'Invalid slider step.'
  }

  return null
}

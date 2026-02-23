import { describe, expect, it } from 'vitest'
import type { UiComponent } from '../src/types'
import { validateComponent } from '../src/validation'

describe('map_pin validation', () => {
  const mapPin: UiComponent = {
    id: 'pickup',
    type: 'map_pin',
    label: 'Pickup location',
    required: true
  }

  it('requires a value when required', () => {
    expect(validateComponent(mapPin, undefined)).toBe('This field is required.')
  })

  it('rejects malformed coordinate objects', () => {
    expect(validateComponent(mapPin, {})).toBe('Select a valid map location.')
    expect(validateComponent(mapPin, { lat: 47.6 })).toBe('Select a valid map location.')
    expect(validateComponent(mapPin, { lat: '47.6', lng: -122.3 })).toBe('Select a valid map location.')
  })

  it('accepts valid coordinates', () => {
    expect(validateComponent(mapPin, { lat: 47.6205, lng: -122.3493 })).toBeNull()
  })
})

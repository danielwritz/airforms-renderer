import type { UiComponent, UiFrame, UiSubmit } from '@airforms/protocol'

export type { UiComponent, UiFrame, UiSubmit }

export type FieldValue = UiSubmit['values'][string]

export type TextComponent = Extract<UiComponent, { type: 'text' | 'textarea' | 'date' }>
export type NumberComponent = Extract<UiComponent, { type: 'number' }>
export type SelectComponent = Extract<UiComponent, { type: 'select' }>
export type SliderComponent = Extract<UiComponent, { type: 'slider' }>
export type MapPinComponent = Extract<UiComponent, { type: 'map_pin' }>
export type ReviewComponent = Extract<UiComponent, { type: 'review' }>

export type PrimitiveValue = string | number | boolean | null
export type FieldValue = PrimitiveValue | Record<string, unknown>

export interface BaseComponent {
  id: string
  label: string
  required?: boolean
}

export interface TextComponent extends BaseComponent {
  type: 'text'
}

export interface TextAreaComponent extends BaseComponent {
  type: 'textarea'
}

export interface DateComponent extends BaseComponent {
  type: 'date'
}

export interface NumberComponent extends BaseComponent {
  type: 'number'
}

export interface SelectComponent extends BaseComponent {
  type: 'select'
  options: Array<{ label: string; value: string }>
}

export interface SliderComponent extends BaseComponent {
  type: 'slider'
  min: number
  max: number
  step: number
}

export interface MapPinComponent extends BaseComponent {
  type: 'map_pin'
}

export interface ReviewComponent extends BaseComponent {
  type: 'review'
  source?: string
}

export type UiComponent =
  | TextComponent
  | TextAreaComponent
  | DateComponent
  | NumberComponent
  | SelectComponent
  | SliderComponent
  | MapPinComponent
  | ReviewComponent

export type UiAction = { type: 'ui_submit' } | { type: 'ui_back' } | { type: 'ui_replace' }

export interface UiFrame {
  type: 'ui_frame'
  version: '1.0'
  frameId: string
  title: string
  state: {
    values: Record<string, FieldValue>
  }
  components: UiComponent[]
  primaryAction: {
    label: string
    action: UiAction
  }
}

export interface UiSubmit {
  type: 'ui_submit'
  frameId: string
  values: Record<string, FieldValue>
}

import { useMemo, useState } from 'react'
import { DateInput } from './components/DateInput'
import { MapPinInput } from './components/MapPinInput'
import { NumberInput } from './components/NumberInput'
import { Review } from './components/Review'
import { SelectInput } from './components/SelectInput'
import { SliderInput } from './components/SliderInput'
import { TextArea } from './components/TextArea'
import { TextInput } from './components/TextInput'
import type { FieldValue, UiFrame, UiSubmit } from './types'
import { validateComponent } from './validation'

export interface ChatUIRendererProps {
  frame: UiFrame
  onSubmit: (submit: UiSubmit) => void
  onBack?: (frameId: string) => void
  onReplace?: (frameId: string) => void
  disabled?: boolean
}

export function ChatUIRenderer({ frame, onSubmit, onBack, onReplace, disabled }: ChatUIRendererProps) {
  const [values, setValues] = useState<Record<string, FieldValue>>(() => ({ ...frame.state.values }))
  const [errors, setErrors] = useState<Record<string, string>>({})

  const renderedComponents = useMemo(
    () =>
      frame.components.map((component) => {
        const value = values[component.id]
        const error = errors[component.id]
        const update = (nextValue: FieldValue) => {
          setValues((prev) => ({ ...prev, [component.id]: nextValue }))
          setErrors((prev) => ({ ...prev, [component.id]: '' }))
        }

        switch (component.type) {
          case 'text':
            return <TextInput key={component.id} component={component} value={String(value ?? '')} disabled={disabled} error={error} onChange={update} />
          case 'textarea':
            return <TextArea key={component.id} component={component} value={String(value ?? '')} disabled={disabled} error={error} onChange={update} />
          case 'date':
            return <DateInput key={component.id} component={component} value={String(value ?? '')} disabled={disabled} error={error} onChange={update} />
          case 'number':
            return <NumberInput key={component.id} component={component} value={String(value ?? '')} disabled={disabled} error={error} onChange={update} />
          case 'select':
            return <SelectInput key={component.id} component={component} value={String(value ?? '')} disabled={disabled} error={error} onChange={update} />
          case 'slider': {
            return <SliderInput key={component.id} component={component} value={Number(value ?? component.min)} disabled={disabled} error={error} onChange={update} />
          }
          case 'map_pin':
            return <MapPinInput key={component.id} component={component} value={(value as { lat: number; lng: number } | undefined) ?? undefined} disabled={disabled} error={error} onChange={update} />
          case 'review':
            return <Review key={component.id} component={component} values={values} />
          default:
            return null
        }
      }),
    [disabled, errors, frame.components, values]
  )

  const handlePrimaryAction = () => {
    const nextErrors = Object.fromEntries(
      frame.components
        .map((component) => [component.id, validateComponent(component, values[component.id])] as const)
        .filter(([, error]) => Boolean(error))
    )

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (frame.primaryAction.action.type === 'ui_back') {
      onBack?.(frame.frameId)
      return
    }

    if (frame.primaryAction.action.type === 'ui_replace') {
      onReplace?.(frame.frameId)
      return
    }

    onSubmit({
      type: 'ui_submit',
      frameId: frame.frameId,
      values
    })
  }

  return (
    <form
      aria-label={frame.title}
      onSubmit={(event) => {
        event.preventDefault()
        handlePrimaryAction()
      }}
    >
      <h2>{frame.title}</h2>
      {renderedComponents}
      <button type="submit" disabled={disabled}>
        {frame.primaryAction.label}
      </button>
    </form>
  )
}

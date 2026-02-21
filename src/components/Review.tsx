import type { ReviewComponent } from '../types'

interface Props {
  component: ReviewComponent
  values: Record<string, unknown>
}

export function Review({ component, values }: Props) {
  return (
    <section aria-label={component.label}>
      <h3>{component.label}</h3>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </section>
  )
}

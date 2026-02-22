import { describe, expect, it } from 'vitest'
import { validateUiFrame, validateUiSubmit } from '@airforms/ui-schema'
import type { UiFrame, UiSubmit } from '../src/types'

describe('renderer contract alignment', () => {
  it('produces a frame shape accepted by shared schema validators', () => {
    const frame: UiFrame = {
      type: 'ui_frame',
      version: '1.0',
      frameId: 'insurance:lookup',
      title: 'Find your policy',
      state: { values: { policyNumber: '' } },
      components: [
        {
          id: 'policyNumber',
          type: 'text',
          label: 'Policy number',
          placeholder: 'ABC123',
          required: true
        }
      ],
      primaryAction: {
        label: 'Look up',
        action: { type: 'ui_submit' }
      }
    }

    expect(validateUiFrame(frame).ok).toBe(true)
  })

  it('produces a submit shape accepted by shared schema validators', () => {
    const submit: UiSubmit = {
      type: 'ui_submit',
      frameId: 'insurance:lookup',
      values: {
        policyNumber: 'ABC123'
      }
    }

    expect(validateUiSubmit(submit).ok).toBe(true)
  })
})

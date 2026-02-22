import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ChatUIRenderer } from '../src/ChatUIRenderer'
import type { UiFrame } from '../src/types'

const baseFrame: UiFrame = {
  type: 'ui_frame',
  version: '1.0',
  frameId: 'insurance:lookup',
  title: 'Find your policy',
  state: { values: {} },
  components: [
    { id: 'policyNumber', type: 'text', label: 'Policy number', required: true },
    { id: 'notes', type: 'textarea', label: 'Notes' },
    { id: 'claimCount', type: 'number', label: 'Claims', min: 0, max: 10 },
    { id: 'dob', type: 'date', label: 'Date of birth', required: true },
    {
      id: 'channel',
      type: 'select',
      label: 'Channel',
      required: true,
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' }
      ]
    },
    { id: 'score', type: 'slider', label: 'Score', min: 0, max: 10, step: 2 },
    { id: 'location', type: 'map_pin', label: 'Location' },
    { id: 'review', type: 'review', label: 'Review' }
  ],
  primaryAction: { label: 'Look up', action: { type: 'ui_submit' } }
}

describe('ChatUIRenderer', () => {
  it('renders v0 component types', () => {
    render(<ChatUIRenderer frame={baseFrame} onSubmit={vi.fn()} />)

    expect(screen.getByLabelText('Policy number')).toBeInTheDocument()
    expect(screen.getByLabelText('Notes')).toBeInTheDocument()
    expect(screen.getByLabelText('Claims')).toBeInTheDocument()
    expect(screen.getByLabelText('Date of birth')).toBeInTheDocument()
    expect(screen.getByLabelText('Channel')).toBeInTheDocument()
    expect(screen.getByLabelText('Score')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Location select center' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Review' })).toBeInTheDocument()
  })

  it('submits valid values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ChatUIRenderer frame={baseFrame} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Policy number'), 'ABC123')
    await user.type(screen.getByLabelText('Date of birth'), '2000-01-01')
    await user.selectOptions(screen.getByLabelText('Channel'), 'email')
    await user.clear(screen.getByLabelText('Score'))
    await user.type(screen.getByLabelText('Score'), '8')
    await user.click(screen.getByRole('button', { name: 'Look up' }))

    expect(onSubmit).toHaveBeenCalledWith({
      type: 'ui_submit',
      frameId: 'insurance:lookup',
      values: expect.objectContaining({
        policyNumber: 'ABC123',
        dob: '2000-01-01',
        channel: 'email',
        score: 8
      })
    })
  })

  it('blocks missing required fields', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ChatUIRenderer frame={baseFrame} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Look up' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getAllByText('This field is required.').length).toBeGreaterThanOrEqual(3)
  })

  it('blocks invalid slider bounds', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const frame: UiFrame = { ...baseFrame, state: { values: { score: 99 } } }
    render(<ChatUIRenderer frame={frame} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Policy number'), 'ABC123')
    await user.type(screen.getByLabelText('Date of birth'), '2000-01-01')
    await user.selectOptions(screen.getByLabelText('Channel'), 'email')
    await user.click(screen.getByRole('button', { name: 'Look up' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Must be between 0 and 10.')).toBeInTheDocument()
  })

  it('blocks invalid select value', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const frame: UiFrame = {
      ...baseFrame,
      state: { values: { channel: 'carrier_pigeon' } }
    }
    render(<ChatUIRenderer frame={frame} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Policy number'), 'ABC123')
    await user.type(screen.getByLabelText('Date of birth'), '2000-01-01')
    await user.click(screen.getByRole('button', { name: 'Look up' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Invalid selection.')).toBeInTheDocument()
  })
})

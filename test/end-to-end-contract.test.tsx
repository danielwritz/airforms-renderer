import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { validateTurnResponse } from '@airforms/ui-schema'
import { ChatUIRenderer } from '../src/ChatUIRenderer'
import type { UiSubmit } from '../src/types'
import { OrchestratorService } from '../../airforms-orchestrator/src/service'
import { InMemoryConversationStore } from '../../airforms-orchestrator/src/state'

describe('end-to-end contract flow', () => {
  it('handles user_text -> ui_frame -> ui_submit -> assistant response', async () => {
    const user = userEvent.setup()
    const service = new OrchestratorService(new InMemoryConversationStore())

    const firstTurn = service.handleTurn({
      conversationId: 'c_e2e',
      message: { type: 'user_text', text: 'I want to check my insurance.' }
    })

    expect(firstTurn.ui?.type).toBe('ui_frame')

    const onSubmit = vi.fn<(submit: UiSubmit) => void>()
    render(<ChatUIRenderer frame={firstTurn.ui as any} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Policy number'), 'ABC123')
    await user.type(screen.getByLabelText('Date of birth'), '1988-07-01')
    await user.click(screen.getByRole('button', { name: 'Look up' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)

    const submit = onSubmit.mock.calls[0]?.[0]
    expect(submit?.type).toBe('ui_submit')

    const secondTurn = service.handleTurn({
      conversationId: 'c_e2e',
      message: submit
    })

    expect(secondTurn.ui).toBeUndefined()
    expect(secondTurn.messages[0]?.text).toContain('Looking up your policy')
    expect(validateTurnResponse(secondTurn).ok).toBe(true)
  })
})

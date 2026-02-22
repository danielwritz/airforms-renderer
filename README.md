# airforms-renderer (React) — v0

A deterministic UI renderer for `ui_frame` messages defined by `@airforms/protocol`.

This package renders structured UI inside a chat interface. It does **not** call LLMs, manage conversations, or execute tools. It strictly:

* Accepts a validated `ui_frame`
* Renders components deterministically
* Collects structured values
* Emits `ui_submit` events

This is Layer 2 of the system:

1. Protocol (`@airforms/protocol`)
2. **Renderer (this package)**
3. Orchestrator

---

# Purpose

The renderer transforms this:

```json
{
  "type": "ui_frame",
  "version": "1.0",
  "frameId": "insurance:lookup",
  "title": "Find your policy",
  "state": { "values": {} },
  "components": [
    { "id": "policyNumber", "type": "text", "label": "Policy number", "required": true },
    { "id": "dob", "type": "date", "label": "Date of birth", "required": true }
  ],
  "primaryAction": {
    "label": "Look up",
    "action": { "type": "ui_submit" }
  }
}
```

Into a live interactive UI component inside a chat message bubble.

No HTML generation.
No dynamic scripts.
No arbitrary layouts.

Deterministic rendering only.

---

# Installation

```bash
npm install @airforms/renderer-react
```

Peer dependency:

```bash
npm install @airforms/protocol
```

---

# Basic Usage

```tsx
import { ChatUIRenderer } from "@airforms/renderer-react"
import type { UiFrame } from "@airforms/protocol"

function ChatMessage({ frame }: { frame: UiFrame }) {
  return (
    <ChatUIRenderer
      frame={frame}
      onSubmit={(submit) => {
        console.log("ui_submit", submit)
      }}
    />
  )
}
```

---

# Public API

## `<ChatUIRenderer />`

### Props

| Prop        | Type                         | Required | Description                            |
| ----------- | ---------------------------- | -------- | -------------------------------------- |
| `frame`     | `UiFrame`                    | yes      | Validated frame from orchestrator      |
| `onSubmit`  | `(submit: UiSubmit) => void` | yes      | Fired when primary action is triggered |
| `onBack`    | `(frameId: string) => void`  | optional | For `ui_back`                          |
| `onReplace` | `(frameId: string) => void`  | optional | For `ui_replace`                       |
| `disabled`  | `boolean`                    | optional | Disable all inputs                     |

---

# Supported Components (v0)

The renderer supports only protocol-approved primitives:

* `text`
* `textarea`
* `number`
* `date`
* `select`
* `slider`
* `map_pin`
* `review`

Each component is rendered deterministically based on `type`.

No dynamic injection.
No runtime component registration (v0).

---

# Behavior Rules

## Validation

* Required fields block submission.
* `slider` enforces `min/max/step`.
* `select` only allows listed values.
* `number` respects numeric bounds if defined.
* Validation errors display inline.

## State

* Internal component state mirrors `frame.state.values`.
* Submission emits:

```json
{
  "type": "ui_submit",
  "frameId": "<frameId>",
  "values": { ... }
}
```

The renderer does not persist beyond the current render unless host chooses to.

## Determinism

Given the same `ui_frame`, the output UI must always render the same structure.

No layout heuristics.
No interpretation beyond schema rules.

---

# Map Pin Component (v0)

The `map_pin` component:

* Displays a simple clickable map surface
* Emits `{ lat: number, lng: number }`
* Rounds to 6 decimal places

Advanced mapping libraries are not required in v0.

---

# Accessibility

* All inputs labeled via `label`
* Buttons keyboard-accessible
* Map supports keyboard fallback (center selection)

---

# Styling

Renderer provides minimal neutral styles.

The host application may:

* Wrap renderer in chat bubble UI
* Override styles via className or theme prop (v1+)

Renderer must not enforce design system decisions.

---

# Testing Strategy

Renderer must include:

* Component rendering tests
* Submission tests
* Validation blocking tests
* Snapshot tests for stable rendering

Tests must verify:

* Required fields prevent submission
* Invalid values are rejected
* Valid values emit correct `ui_submit`

---

# Example Flow

1. Host receives `ui_frame`
2. Host renders `<ChatUIRenderer />`
3. User fills form
4. User clicks primary button
5. Renderer emits `ui_submit`
6. Host forwards to orchestrator

---

# Out of Scope (v0)

* Tool execution
* Conversation management
* Streaming tokens
* Dynamic component injection
* Custom layout engines
* Drag/drop
* File uploads
* Multi-step wizard engine

Those belong to future versions or higher layers.

---

# Agent Notes (Implementation Instructions)

## Goal

Implement a deterministic React renderer for `ui_frame` as defined by `@airforms/protocol`.

## Definition of Done

1. All v0 component types render.
2. Validation blocks submission when required fields are missing.
3. `onSubmit` emits valid `ui_submit`.
4. Tests cover:

   * happy path
   * missing required fields
   * invalid slider bounds
   * invalid select value
5. No runtime schema logic lives here — assume frames are validated upstream.

## Architecture Constraints

* Do not mutate the incoming `frame`.
* Internal state should initialize from `frame.state.values`.
* Renderer must be pure UI — no network calls.
* No HTML string rendering.
* No `dangerouslySetInnerHTML`.

## File Structure Suggestion

```
src/
  components/
    TextInput.tsx
    TextArea.tsx
    NumberInput.tsx
    DateInput.tsx
    SelectInput.tsx
    SliderInput.tsx
    MapPinInput.tsx
    Review.tsx
  ChatUIRenderer.tsx
  validation.ts
  index.ts

test/
  renderer.test.tsx
```

## Validation Rules

Minimum implementation:

* `required`
* `slider.min/max`
* `select` value must match options
* `number` numeric enforcement

Do not overbuild validation in v0.

## Performance

* No unnecessary re-renders.
* Use controlled inputs.
* Avoid deep clones of `frame`.

## Security

* Never execute arbitrary code.
* Never interpret values as markup.
* Treat all strings as plain text.

---

# Vision

This renderer is not a form builder.

It is a deterministic execution surface for conversational UI frames.

It must remain small, predictable, and boring.

Its power comes from strict adherence to the protocol contract.

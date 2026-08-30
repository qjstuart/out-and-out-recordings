import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { crush20260909 } from '#/data/events'

import Events from './Events'

afterEach(cleanup)

describe('Events', () => {
  it('renders all events when no range is provided', () => {
    render(<Events />)

    expect(screen.getByRole('heading', { name: 'Events' })).toBeTruthy()
    expect(screen.getByText(crush20260909.name)).toBeTruthy()
  })

  it('includes events on the date boundaries', () => {
    render(<Events startDate="2026-09-09" endDate="2026-09-09" />)

    expect(screen.getByText(crush20260909.name)).toBeTruthy()
  })

  it('renders nothing when no events fall within the range', () => {
    const { container } = render(<Events endDate="2026-09-08" />)

    expect(container.innerHTML).toBe('')
  })
})

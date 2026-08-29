import { describe, expect, it } from 'vitest'

import { formatSecondsAsMinutesAndSeconds } from './datetime.utils'

describe('formatSecondsAsMinutesAndSeconds', () => {
  it.each([
    [0, '0:00'],
    [65, '1:05'],
    [397, '6:37'],
    [3600, '60:00'],
  ])('formats %i seconds as %s', (durationInSeconds, expected) => {
    expect(formatSecondsAsMinutesAndSeconds(durationInSeconds)).toBe(expected)
  })

  it.each([-1, 1.5, Number.POSITIVE_INFINITY])(
    'rejects invalid duration %s',
    (durationInSeconds) => {
      expect(() => formatSecondsAsMinutesAndSeconds(durationInSeconds)).toThrow(
        RangeError,
      )
    },
  )
})

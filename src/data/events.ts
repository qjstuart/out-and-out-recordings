import type { Event } from '#/types'

export const crush20260909 = {
  date: '2026-09-09',
  location: 'Surfside, Sliema',
  name: 'TLC @ A Little Crush',
  // time: '18:00',
  type: 'dj',
} as const satisfies Event

export const events: readonly Event[] = [crush20260909]

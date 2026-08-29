import type { Track } from '#/types'
import { theLoungeConjecture } from './artists'

export const lastTrainOut = {
  title: 'Last Train Out',
  id: 'MTA3H2600001',
  artists: [theLoungeConjecture],
  durationInSeconds: 397,
} as const satisfies Track

export const breakAndShake = {
  title: 'Break And Shake',
  id: 'MTA3H2600002',
  artists: [theLoungeConjecture],
  durationInSeconds: 252,
} as const satisfies Track

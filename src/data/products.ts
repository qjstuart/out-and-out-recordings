import type { Product } from '#/types'
import { lastTrainOutBreakAndShake } from './releases'
import { breakAndShake, lastTrainOut } from './tracks'

export const lastTrainOutBreakAndShakeProduct = {
  id: 'last-train-out-break-and-shake-digital',
  kind: 'release',
  release: lastTrainOutBreakAndShake,
} as const satisfies Product

export const lastTrainOutProduct = {
  id: 'last-train-out-digital',
  kind: 'track',
  track: lastTrainOut,
} as const satisfies Product

export const breakAndShakeProduct = {
  id: 'break-and-shake-digital',
  kind: 'track',
  track: breakAndShake,
} as const satisfies Product

export const products = [
  lastTrainOutBreakAndShakeProduct,
  lastTrainOutProduct,
  breakAndShakeProduct,
] as const satisfies readonly Product[]

export type ProductId = (typeof products)[number]['id']

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

import Stripe from 'stripe'

import type { Product } from '#/data/shop'

export type StripeMode = keyof Product['stripeProductIds']

let stripeClient: Stripe | undefined
let stripeClientKey: string | undefined

export function getStripeMode(): StripeMode {
  const mode = process.env.STRIPE_MODE ?? 'test'

  if (mode !== 'test' && mode !== 'live') {
    throw new Error('STRIPE_MODE must be either "test" or "live".')
  }

  return mode
}

export function getStripeClient() {
  const apiKey = process.env.STRIPE_API_KEY

  if (!apiKey) {
    throw new Error('STRIPE_API_KEY is not configured.')
  }

  const mode = getStripeMode()
  const expectedPrefix = mode === 'test' ? /^(rk|sk)_test_/ : /^(rk|sk)_live_/

  if (!expectedPrefix.test(apiKey)) {
    throw new Error(`STRIPE_API_KEY does not match STRIPE_MODE=${mode}.`)
  }

  if (!stripeClient || stripeClientKey !== apiKey) {
    stripeClient = new Stripe(apiKey, {
      apiVersion: '2026-05-27.dahlia',
    })
    stripeClientKey = apiKey
  }

  return stripeClient
}

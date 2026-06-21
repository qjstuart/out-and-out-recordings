import { describe, expect, it } from 'vitest'

import { toShopPrice } from '#/features/shop/price-mapper'

const validPrice = {
  id: 'price_test',
  active: true,
  billing_scheme: 'per_unit',
  currency: 'eur',
  type: 'one_time',
  unit_amount: 400,
}

describe('toShopPrice', () => {
  it('maps an active fixed one-time Stripe price', () => {
    expect(toShopPrice(validPrice)).toEqual({
      priceId: 'price_test',
      unitAmount: 400,
      currency: 'eur',
    })
  })

  it.each([
    { active: false },
    { billing_scheme: 'tiered' },
    { type: 'recurring' },
    { unit_amount: null },
    { unit_amount: -1 },
  ])('rejects an unsupported price: %o', (override) => {
    expect(toShopPrice({ ...validPrice, ...override })).toBeUndefined()
  })
})

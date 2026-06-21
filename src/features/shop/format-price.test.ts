import { describe, expect, it } from 'vitest'

import { formatPrice } from '#/features/shop/format-price'

describe('formatPrice', () => {
  it('formats a two-decimal currency from its minor unit', () => {
    expect(
      formatPrice({ priceId: 'price_eur', unitAmount: 400, currency: 'eur' }),
    ).toBe('€4.00')
  })

  it('formats a zero-decimal currency without dividing its amount', () => {
    expect(
      formatPrice({ priceId: 'price_jpy', unitAmount: 400, currency: 'jpy' }),
    ).toBe('¥400')
  })
})

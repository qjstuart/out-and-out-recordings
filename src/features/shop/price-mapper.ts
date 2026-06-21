import type { ShopPrice } from '#/features/shop/format-price'

export interface StripePriceNarrowed {
  id: string
  active: boolean
  billing_scheme: string
  currency: string
  type: string
  unit_amount: number | null
}

/**
 * Only active, fixed, one-time prices can be sold by this version of the shop.
 */
export function toShopPrice(price: StripePriceNarrowed): ShopPrice | undefined {
  if (
    !price.active ||
    price.type !== 'one_time' ||
    price.billing_scheme !== 'per_unit' ||
    price.unit_amount === null ||
    !Number.isInteger(price.unit_amount) ||
    price.unit_amount < 0
  ) {
    return undefined
  }

  return {
    priceId: price.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
  }
}

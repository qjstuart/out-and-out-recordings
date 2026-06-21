import { Products } from '#/data/shop'
import { toShopPrice } from '#/features/shop/price-mapper'
import { getStripeClient, getStripeMode } from '#/lib/stripe.server'
import { createServerFn } from '@tanstack/react-start'

import type { ShopPrice } from '#/features/shop/format-price'

export interface ShopPriceResult {
  itemId: string
  price: ShopPrice | null
}

function unavailablePrices(): Array<ShopPriceResult> {
  return Products.map(({ id }) => ({ itemId: id, price: null }))
}

export const getShopPrices = createServerFn({ method: 'GET' }).handler(
  async (): Promise<ShopPriceResult[]> => {
    try {
      const stripe = getStripeClient()
      const mode = getStripeMode()

      return await Promise.all(
        Products.map(async (item): Promise<ShopPriceResult> => {
          const productId = item.stripeProductIds[mode]

          if (!productId.startsWith('prod_')) {
            return { itemId: item.id, price: null }
          }

          try {
            const product = await stripe.products.retrieve(productId, {
              expand: ['default_price'],
            })
            const defaultPrice = product.default_price

            if (
              !product.active ||
              !defaultPrice ||
              typeof defaultPrice === 'string'
            ) {
              return { itemId: item.id, price: null }
            }

            return {
              itemId: item.id,
              price: toShopPrice(defaultPrice) ?? null,
            }
          } catch (error) {
            console.error(
              `Could not load Stripe pricing for shop item "${item.id}":`,
              error instanceof Error ? error.message : 'Unknown Stripe error',
            )
            return { itemId: item.id, price: null }
          }
        }),
      )
    } catch (error) {
      console.error(
        'Stripe shop pricing is unavailable:',
        error instanceof Error ? error.message : 'Unknown configuration error',
      )
      return unavailablePrices()
    }
  },
)

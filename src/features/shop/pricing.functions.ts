import { Products } from '#/data/shop'
import { toShopPrice } from '#/features/shop/price-mapper'
import { getStripeClient, getStripeMode } from '#/lib/stripe.server'
import { createServerFn } from '@tanstack/react-start'

import type { Product } from '#/data/shop'
import type { ShopPrice } from '#/features/shop/types'
import type Stripe from 'stripe'

export interface ShopPriceResult {
  productId: string
  price: ShopPrice | null
}

type StripeClient = Stripe
type StripeMode = keyof Product['stripeProductIds']

function unavailablePrice(product: Product): ShopPriceResult {
  return { productId: product.id, price: null }
}

function unavailablePrices(): ShopPriceResult[] {
  return Products.map((product) => unavailablePrice(product))
}

// In Stripe, a product's default_price is the sale price currently in use.
async function retrieveProductWithDefaultPrice(
  stripe: StripeClient,
  productId: string,
) {
  return stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })
}

function getDefaultShopPrice(product: Stripe.Product) {
  const defaultPrice = product.default_price

  if (!product.active || !defaultPrice || typeof defaultPrice === 'string') {
    return null
  }

  return toShopPrice(defaultPrice) ?? null
}

async function getProductPrice(
  stripe: StripeClient,
  mode: StripeMode,
  product: Product,
): Promise<ShopPriceResult> {
  const productId = product.stripeProductIds[mode]

  // In Stripe, all products should start with "prod_".
  if (!productId.startsWith('prod_')) {
    return unavailablePrice(product)
  }

  try {
    const stripeProduct = await retrieveProductWithDefaultPrice(
      stripe,
      productId,
    )

    return {
      productId: product.id,
      price: getDefaultShopPrice(stripeProduct),
    }
  } catch (error) {
    console.error(
      `Could not load Stripe pricing for shop item "${product.id}":`,
      error instanceof Error ? error.message : 'Unknown Stripe error',
    )
    return unavailablePrice(product)
  }
}

async function handleGetShopPrices(): Promise<ShopPriceResult[]> {
  try {
    const stripe = getStripeClient()
    const mode = getStripeMode()

    return await Promise.all(
      Products.map((product) => getProductPrice(stripe, mode, product)),
    )
  } catch (error) {
    console.error(
      'Stripe shop pricing is unavailable:',
      error instanceof Error ? error.message : 'Unknown configuration error',
    )
    return unavailablePrices()
  }
}

export const getShopPrices = createServerFn({ method: 'GET' }).handler(
  handleGetShopPrices,
)

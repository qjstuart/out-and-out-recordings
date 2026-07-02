import { env } from 'cloudflare:workers'

import type { Order, OrderStatus } from '#/features/shop/types'

/* Mirrors the raw D1 `orders` table shape.
 * Not to be renamed/confused with Order. */
interface OrderRow {
  id: string
  product_id: string
  status: OrderStatus
  stripe_product_id: string
  stripe_price_id: string
  stripe_checkout_session_id: string | null
  stripe_payment_intent_id: string | null
  amount_total: number
  currency: string
  customer_email: string | null
  download_url: string | null
  download_url_expires_at: number | null
  delivery_email_sent_at: number | null
  created_at: number
  updated_at: number
  paid_at: number | null
}

export interface CreatePendingOrderInput {
  id: string
  productId: string
  stripeProductId: string
  stripePriceId: string
  amountTotal: number
  currency: string
}

function toOrder(row: OrderRow): Order {
  return {
    id: row.id,
    productId: row.product_id,
    status: row.status,
    stripeProductId: row.stripe_product_id,
    stripePriceId: row.stripe_price_id,
    stripeCheckoutSessionId: row.stripe_checkout_session_id,
    stripePaymentIntentId: row.stripe_payment_intent_id,
    amountTotal: row.amount_total,
    currency: row.currency,
    customerEmail: row.customer_email,
    downloadUrl: row.download_url,
    downloadUrlExpiresAt: row.download_url_expires_at,
    deliveryEmailSentAt: row.delivery_email_sent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
  }
}

export async function createPendingOrder(
  input: CreatePendingOrderInput,
  database: D1Database = env.DB,
) {
  const now = Date.now()

  await database
    .prepare(
      `INSERT INTO orders (
        id,
        product_id,
        status,
        stripe_product_id,
        stripe_price_id,
        amount_total,
        currency,
        created_at,
        updated_at
      ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.id,
      input.productId,
      input.stripeProductId,
      input.stripePriceId,
      input.amountTotal,
      input.currency,
      now,
      now,
    )
    .run()

  const order = await getOrderById(input.id, database)

  if (!order) {
    throw new Error('The pending order could not be read after creation.')
  }

  return order
}

export async function getOrderById(
  orderId: string,
  database: D1Database = env.DB,
) {
  const row = await database
    .prepare('SELECT * FROM orders WHERE id = ?')
    .bind(orderId)
    .first<OrderRow>()

  return row ? toOrder(row) : undefined
}

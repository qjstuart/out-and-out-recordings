export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'payment_failed'
  | 'expired'
  | 'refunded'

export interface Order {
  id: string
  productId: string
  status: OrderStatus
  stripeProductId: string
  stripePriceId: string
  stripeCheckoutSessionId: string | null
  stripePaymentIntentId: string | null
  amountTotal: number
  currency: string
  customerEmail: string | null
  downloadUrl: string | null
  downloadUrlExpiresAt: number | null
  deliveryEmailSentAt: number | null
  createdAt: number
  updatedAt: number
  paidAt: number | null
}

export interface ShopPrice {
  /** Stripe Price ID used server-side when checkout is created. */
  priceId: string
  /** Amount in the currency's smallest unit, as returned by Stripe. */
  unitAmount: number
  /** Lowercase ISO currency code, for example "eur". */
  currency: string
}

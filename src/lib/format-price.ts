export interface ShopPrice {
  /** Amount in the currency's smallest unit, as returned by Stripe. */
  unitAmount: number
  /** Lowercase ISO currency code, for example "eur". */
  currency: string
}

export function formatPrice({ unitAmount, currency }: ShopPrice) {
  const fractionDigits = new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).resolvedOptions().maximumFractionDigits

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(unitAmount / 10 ** fractionDigits)
}

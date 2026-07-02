import type { ShopPrice } from './types'

export function formatPrice({ unitAmount, currency }: ShopPrice) {
  const fractionDigits = new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).resolvedOptions().maximumFractionDigits
  const minorUnitDigits = fractionDigits ?? 2

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(unitAmount / 10 ** minorUnitDigits)
}

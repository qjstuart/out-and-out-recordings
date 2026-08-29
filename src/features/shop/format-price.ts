import type { ShopPrice } from './types'

export function formatPrice(
  { unitAmount, currency }: ShopPrice,
  locale?: Intl.LocalesArgument,
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits
  const minorUnitDigits = fractionDigits ?? 2

  return formatter.format(unitAmount / 10 ** minorUnitDigits)
}

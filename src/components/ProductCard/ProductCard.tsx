import { cn } from '#/lib/utils'
import { formatPrice } from '#/features/shop/format-price'
import { Button } from '#/components/ui/button'

import type { Product as ProductData } from '#/data/shop'
import type { ShopPrice } from '#/features/shop/format-price'
import ImageCard from '../ImageCard/ImageCard'

export interface ProductCardProps {
  item: ProductData
  price?: ShopPrice
  isBuying?: boolean
  onBuy?: (itemId: string) => void
  className?: string
}

export default function ProductCard({
  item,
  price,
  isBuying = false,
  onBuy,
  className,
}: ProductCardProps) {
  const canBuy = price !== undefined && onBuy !== undefined && !isBuying
  const buttonLabel = price ? (isBuying ? 'Opening…' : 'Buy') : 'Unavailable'

  return (
    <article
      id={item.id}
      className={cn(
        'flex flex-col gap-3 items-start scroll-mt-4 overflow-hidden',
        className,
      )}
    >
      <ImageCard src={item.imageSrc} alt={item.imageAlt} className="shrink-0" />

      <div className="size-full">
        <p className="font-bold">{item.artist}</p>
        <p>{item.title}</p>

        <div className="flex items-center gap-2 text-sm">
          <span>{item.format}</span>
          &bull;
          <span aria-live="polite">
            {price ? formatPrice(price) : 'Unavailable'}
          </span>
        </div>
      </div>

      <Button
        type="button"
        disabled={!canBuy}
        onClick={() => onBuy?.(item.id)}
        className={cn('w-full uppercase cursor-pointer')}
      >
        {buttonLabel}
      </Button>
    </article>
  )
}

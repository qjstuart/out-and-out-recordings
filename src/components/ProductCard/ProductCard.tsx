import { cn } from '#/lib/utils'
import { formatPrice } from '#/lib/format-price'
import { Button } from '#/components/ui/button'

import type { Product as ProductData } from '#/data/shop'
import type { ShopPrice } from '#/lib/format-price'
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
          <span aria-live="polite">{price ? formatPrice(price) : '€4.00'}</span>
        </div>
      </div>

      <Button
        type="button"
        // disabled={!canBuy}
        onClick={() => onBuy?.(item.id)}
        className="w-full uppercase cursor-pointer"
      >
        {isBuying ? 'Opening…' : 'Buy'}
      </Button>
    </article>
  )
}

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
        'flex flex-row gap-3 items-start scroll-mt-4 overflow-hidden',
        className,
      )}
    >
      <div className="flex flex-col">
        <ImageCard
          src={item.imageSrc}
          alt={item.imageAlt}
          className="size-30 shrink-0 md:size-40"
        />

        <Button
          type="button"
          variant="outline"
          // disabled={!canBuy}
          onClick={() => onBuy?.(item.id)}
          className="border-foreground border-t-0 uppercase"
        >
          {isBuying ? 'Opening…' : 'Buy'}
        </Button>
      </div>

      <div className="h-full flex flex-col items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="-mt-0.5 text-lg md:text-xl">
            <span className="block md:inline">{item.artist}</span>
            <span className="sr-only"> - </span>
            <span aria-hidden="true" className="hidden md:inline">
              {' - '}
            </span>
            <span className="block md:inline">{item.title}</span>
          </h2>

          <div className="flex items-center gap-2">
            <span>{item.format}</span>
          </div>

          <span aria-live="polite">{price ? formatPrice(price) : '€4.00'}</span>
        </div>
      </div>
    </article>
  )
}

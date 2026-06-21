import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import ProductCard from '#/components/ProductCard/ProductCard'
import { routeThemes } from '#/constants/theme'
import { Products } from '#/data/shop'
import { fluidFont } from '#/lib/fluid-font'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop')({
  component: Shop,
})

function Shop() {
  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/shop']} />

      <h3
        className="flex gap-2 items-baseline font-arabic mb-4"
        style={{ fontSize: fluidFont(20, 36) }}
      >
        Shop
      </h3>

      {Products.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {Products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-6 text-center">Shop items coming soon.</p>
      )}
    </main>
  )
}

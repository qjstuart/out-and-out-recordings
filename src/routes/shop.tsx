import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop')({
  component: Shop,
})

function Shop() {
  return (
    <main>
      {' '}
      <CircleMosaic baseColor={routeThemes['/shop']} />
    </main>
  )
}

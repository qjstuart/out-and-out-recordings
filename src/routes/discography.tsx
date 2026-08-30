import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'
import { fluidFont } from '#/lib/fluid-font'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discography')({
  component: Discography,
})

function Discography() {
  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/discography']} />
      <h3
        className="flex gap-2 items-baseline font-arabic mb-4"
        style={{ fontSize: fluidFont(20, 36) }}
      >
        Discography
      </h3>
    </main>
  )
}

import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import ReleaseCard from '#/components/ReleaseCard/ReleaseCard'
import { routeThemes } from '#/constants/theme'
import { releases } from '#/data/releases'
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </main>
  )
}

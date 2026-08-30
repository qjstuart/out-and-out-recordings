import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import Events from '#/components/Events/Events'
import ReleaseCard from '#/components/ReleaseCard/ReleaseCard'
import { routeThemes } from '#/constants/theme'
import { lastTrainOutBreakAndShake } from '#/data/releases'
import { fluidFont } from '#/lib/fluid-font'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="space-y-6">
      <CircleMosaic baseColor={routeThemes['/']} />

      {/* NEWS SECTION */}
      <section aria-labelledby="news">
        <h3
          id="news"
          className="flex gap-2 items-baseline font-arabic mb-4"
          style={{ fontSize: fluidFont(20, 36) }}
        >
          News
        </h3>

        {/* FEATURED RELEASE */}
        <div className="flex flex-col gap-4">
          <p>Debut release by The Lounge Conjecture is out now!</p>

          <ReleaseCard
            release={lastTrainOutBreakAndShake}
            className="max-w-50"
          />
        </div>
      </section>

      <Events startDate="2026-01-01" />
    </main>
  )
}

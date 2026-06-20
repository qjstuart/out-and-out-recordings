import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/']} />
    </main>
  )
}

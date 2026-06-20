import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/contact']} />
    </main>
  )
}

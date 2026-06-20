import CircleRows from '#/components/CircleMosaic/CircleMosaic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <main>
      <CircleRows baseColor="neutral" />
    </main>
  )
}

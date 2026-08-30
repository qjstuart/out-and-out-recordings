import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'
import { fluidFont } from '#/lib/fluid-font'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [{ title: 'Contact | Out And Out Recordings' }],
  }),
  component: Contact,
})

function Contact() {
  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/contact']} />

      <h3
        className="flex gap-2 items-baseline font-arabic mb-4"
        style={{ fontSize: fluidFont(20, 36) }}
      >
        Contact
      </h3>
      <span>For bookings, music licensing and general inquiries: </span>
      <a
        className="break-all underline decoration-neutral-500 underline-offset-4 hover:text-neutral-300"
        href="mailto:contact@theloungeconjecture.com"
      >
        contact@theloungeconjecture.com
      </a>
    </main>
  )
}

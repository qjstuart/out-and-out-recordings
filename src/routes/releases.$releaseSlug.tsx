import { createFileRoute, notFound } from '@tanstack/react-router'

import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import ImageCard from '#/components/ImageCard/ImageCard'
import Tracklisting from '#/components/Tracklisting/Tracklisting'
import { routeThemes } from '#/constants/theme'
import { getReleaseBySlug } from '#/data/releases'
import { fluidFont } from '#/lib/fluid-font'

export const Route = createFileRoute('/releases/$releaseSlug')({
  loader: function loadRelease({ params }) {
    const release = getReleaseBySlug(params.releaseSlug)

    if (!release) {
      throw notFound()
    }

    return release
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }

    return {
      meta: [
        {
          title: `${loaderData.title} | Out And Out Recordings`,
        },
        {
          name: 'description',
          content: `${loaderData.title} by ${loaderData.artists
            .map((artist) => artist.name)
            .join(', ')}.`,
        },
      ],
    }
  },
  component: ReleasePage,
})

function ReleasePage() {
  const release = Route.useLoaderData()
  const artistNames = release.artists.map((artist) => artist.name).join(', ')

  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/releases']} />
      <h3
        className="font-arabic font-bold mb-6"
        style={{ fontSize: fluidFont(16, 24) }}
      >
        {artistNames} — {release.title}
      </h3>

      <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
        <ImageCard
          image={release.artwork}
          className="max-w-70 border-none mx-auto"
        />
        <Tracklisting tracks={release.tracks} />
      </div>
    </main>
  )
}

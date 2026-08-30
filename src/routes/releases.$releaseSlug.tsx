import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import BeatportEmbed from '#/components/BeatportEmbed/BeatportEmbed'
import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import ImageCard from '#/components/ImageCard/ImageCard'
import Markdown from '#/components/Markdown/Markdown'
import ReleaseInfo from '#/components/ReleaseInfo/ReleaseInfo'
import Tracklisting from '#/components/Tracklisting/Tracklisting'
import { routeThemes } from '#/constants/theme'
import { getReleaseBySlug } from '#/data/releases'
import { fluidFont } from '#/lib/fluid-font'

import type { Artist } from '#/types'

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

function getArtistLink(artist: Artist) {
  if (!artist.slug) {
    return undefined
  }

  return (
    <Link
      to="/artists/$artistSlug"
      params={{ artistSlug: artist.slug }}
      className="underline decoration-neutral-500 underline-offset-3 hover:text-neutral-300"
    >
      {artist.name}
    </Link>
  )
}

function ReleasePage() {
  const release = Route.useLoaderData()

  return (
    <main>
      <CircleMosaic baseColor={routeThemes['/releases']} />
      <h3
        className="font-arabic font-bold mb-6"
        style={{ fontSize: fluidFont(16, 24) }}
      >
        {release.artists.map((artist, index) => (
          <span key={artist.slug || artist.name}>
            {index > 0 && ', '}
            {getArtistLink(artist) ?? artist.name}
          </span>
        ))}{' '}
        — {release.title}
      </h3>

      <div className="space-y-6 ">
        <section className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <ImageCard
            image={release.artwork}
            className="max-w-70 border-none mx-auto"
          />
          <div className="space-y-6">
            <ReleaseInfo release={release} />
            <Tracklisting tracks={release.tracks} />
          </div>
        </section>

        {release.embeds?.beatportReleaseId && (
          <BeatportEmbed
            releaseId={release.embeds.beatportReleaseId}
            releaseTitle={release.title}
          />
        )}

        <section>
          <Markdown>{release.descriptionMarkdown}</Markdown>
        </section>
      </div>
    </main>
  )
}

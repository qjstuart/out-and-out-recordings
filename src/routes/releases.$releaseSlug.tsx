import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import ImageCard from '#/components/ImageCard/ImageCard'
import Markdown from '#/components/Markdown/Markdown'
import { getReleaseBySlug } from '#/data/releases'
import { fluidFont } from '#/lib/fluid-font'

import type { Artist } from '#/types'
import CircleMosaic from '#/components/CircleMosaic/CircleMosaic'
import { routeThemes } from '#/constants/theme'

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

  return (
    <main className="pb-12">
      <CircleMosaic baseColor={routeThemes['/releases']} />
      <h3 className="font-arabic mb-4" style={{ fontSize: fluidFont(20, 30) }}>
        {release.title}
      </h3>
      <header className="mb-6">
        <span
          className="font-arabic mb-2 text-md"
          // style={{ fontSize: fluidFont(20, 30) }}
        >
          {release.title}
        </span>
        <p className="text-sm text-muted-foreground">
          <ArtistLinks artists={release.artists} />
        </p>
      </header>

      <div className="grid gap-7 md:grid-cols-2 md:items-start">
        <ImageCard image={release.artwork} className="border-none" />

        <div>
          <dl className="mb-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-y border-white/20 py-4 text-sm">
            <dt className="text-muted-foreground">Released</dt>
            <dd>{formatReleaseDate(release.releaseDate)}</dd>

            <dt className="text-muted-foreground">Format</dt>
            <dd>{release.formats.map(formatReleaseFormat).join(', ')}</dd>

            <dt className="text-muted-foreground">Catalogue</dt>
            <dd>{release.catalogNumber}</dd>
          </dl>

          <section aria-labelledby="tracklist-heading">
            <h2 id="tracklist-heading" className="font-arabic mb-3 text-xl">
              Tracklist
            </h2>

            <ol className="divide-y divide-white/20 border-y border-white/20">
              {release.tracks.map((track, index) => (
                <li
                  key={track.id}
                  className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-3 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm tabular-nums text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm text-muted-foreground">
                      <ArtistLinks artists={track.artists} />
                    </p>
                  </div>

                  <time
                    dateTime={`PT${track.durationInSeconds}S`}
                    className="text-sm tabular-nums text-muted-foreground"
                  >
                    {formatDuration(track.durationInSeconds)}
                  </time>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <section aria-labelledby="release-notes-heading" className="mt-8">
        <h2 id="release-notes-heading" className="font-arabic mb-3 text-xl">
          About this release
        </h2>
        <Markdown className="max-w-2xl text-sm leading-relaxed text-neutral-200">
          {release.descriptionMarkdown}
        </Markdown>
      </section>
    </main>
  )
}

function ArtistLinks({ artists }: { artists: readonly Artist[] }) {
  return artists.map((artist, index) => (
    <span key={artist.slug}>
      {index > 0 && ', '}
      <Link
        to="/artists/$artistSlug"
        params={{ artistSlug: artist.slug }}
        className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
      >
        {artist.name}
      </Link>
    </span>
  ))
}

function formatDuration(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function formatReleaseDate(releaseDate: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${releaseDate}T00:00:00Z`))
}

function formatReleaseFormat(format: string) {
  return `${format.charAt(0).toUpperCase()}${format.slice(1)}`
}

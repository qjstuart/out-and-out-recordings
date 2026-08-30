import { Link } from '@tanstack/react-router'

import { cn } from '#/lib/utils'

import type { Release } from '#/types'

export interface ReleaseCardProps {
  release: Release
  className?: string
}

export default function ReleaseCard({ release, className }: ReleaseCardProps) {
  const artistNames = release.artists.map((artist) => artist.name).join(', ')
  const { src, alt } = release.artwork

  return (
    <article className={cn('min-w-0', className)}>
      <Link
        to="/releases/$releaseSlug"
        params={{ releaseSlug: release.slug }}
        className="group block"
      >
        <div className="aspect-square overflow-hidden border border-white">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="size-full object-cover transition-opacity group-hover:opacity-80"
          />
        </div>

        <div className="pt-3">
          <h3 className="text-base font-bold leading-snug group-hover:text-neutral-300">
            {release.title}
          </h3>
          <p className="text-sm text-muted-foreground">{artistNames}</p>
        </div>
      </Link>
    </article>
  )
}

import type { Artist } from '../../data/artists'

import { cn } from '../../lib/utils'

export interface ArtistHeroImageProps {
  artist: Artist
  className?: string
}

export default function ArtistHeroImage({
  artist,
  className,
}: ArtistHeroImageProps) {
  return (
    <div
      className={cn(
        'h-40 w-full overflow-hidden border border-neutral-300 mb-3',
        className,
      )}
    >
      <img
        src={artist.heroImageSrc}
        alt={artist.name}
        fetchPriority="high"
        style={{
          objectPosition: artist.heroPosition,
          transform: `scale(${artist.heroZoom})`,
          transformOrigin: artist.heroPosition,
        }}
        className="block h-full w-full object-cover"
      />
    </div>
  )
}

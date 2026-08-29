import type { Image } from '#/types'

import { cn } from '../../lib/utils'

export type ArtistHeroImageProps = {
  image: Image
  className?: string
}

export default function ArtistHeroImage({
  image,
  className,
}: ArtistHeroImageProps) {
  const objectPosition = image.objectPosition ?? '50% 50%'
  const zoom = image.zoom ?? 1

  return (
    <div
      className={cn(
        'h-40 w-full overflow-hidden border border-neutral-300 mb-3',
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        fetchPriority="high"
        style={{
          objectPosition,
          transform: `scale(${zoom})`,
          transformOrigin: objectPosition,
        }}
        className="block h-full w-full object-cover"
      />
    </div>
  )
}

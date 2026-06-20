import { createFileRoute, notFound } from '@tanstack/react-router'
import ArtistHeroImage from '#/components/ArtistHeroImage/ArtistHeroImage'
import ImageCard from '#/components/ImageCard/ImageCard'
import { artists, isArtistSlug } from '#/data/artists'
import { fluidFont } from '#/lib/fluid-font'

export const Route = createFileRoute('/artists/$artistSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { artistSlug } = Route.useParams()

  if (!isArtistSlug(artistSlug)) {
    throw notFound()
  }

  const artist = artists[artistSlug]
  const galleryImages = artist.galleryImageSrcs

  return (
    <main>
      <ArtistHeroImage artist={artist} />
      <h3 className="font-arabic mb-4" style={{ fontSize: fluidFont(20, 36) }}>
        {artist.name}
      </h3>
      <div className="leading-snug text-sm">{artist.bio}</div>

      {galleryImages.map((image) => (
        <ImageCard
          key={image}
          className="w-37.5"
          src={image}
          alt={`${artist.name} promotional image`}
        />
      ))}
    </main>
  )
}

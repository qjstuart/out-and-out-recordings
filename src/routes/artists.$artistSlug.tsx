import { createFileRoute, notFound } from '@tanstack/react-router'
import ArtistHeroImage from '#/components/ArtistHeroImage/ArtistHeroImage'
import ImageCard from '#/components/ImageCard/ImageCard'
import Markdown from '#/components/Markdown/Markdown'
import { getArtistBySlug } from '#/data/artists'
import { fluidFont } from '#/lib/fluid-font'

export const Route = createFileRoute('/artists/$artistSlug')({
  component: ArtistPage,
})

function ArtistPage() {
  const { artistSlug } = Route.useParams()
  const artist = getArtistBySlug(artistSlug)

  if (!artist) {
    throw notFound()
  }

  const heroImage = artist.images.hero
  const supportingImages = artist.images.supporting

  return (
    <main>
      <ArtistHeroImage image={heroImage} />
      <h3 className="font-arabic mb-4" style={{ fontSize: fluidFont(20, 36) }}>
        {artist.name}
      </h3>

      <div className="flex flex-col gap-5 md:flex-row">
        <Markdown className="leading-snug text-sm mb-4">
          {artist.bioMarkdown}
        </Markdown>

        <div className="flex flex-col gap-6">
          {supportingImages.map((image) => (
            <ImageCard
              key={image.src}
              image={image}
              className=" mx-auto md:w-45 md:mx-0"
            />
          ))}
        </div>
      </div>
    </main>
  )
}

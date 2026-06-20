export const artists = {
  'the-lounge-conjecture': {
    name: 'The Lounge Conjecture',
    heroImageSrc: '/images/artists/the-lounge-conjecture/hero-image.jpg',
    /**
     * Controls which part of the image remains visible when it is cropped.
     * The first value is horizontal and the second is vertical.
     * Examples: 'center top', 'center 30%', '75% 60%'.
     */
    heroPosition: '50% 35%',
    /**
     * Controls the hero image zoom. Use 1 for no zoom, 1.2 for 20%, etc.
     * The zoom is anchored around heroPosition.
     */
    heroZoom: 1,
    galleryImageSrcs: [
      '/images/artists/the-lounge-conjecture/gallery1.webp',
      '/images/artists/the-lounge-conjecture/gallery2.jpg',
    ],
    bio: (
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsam
          aspernatur commodi nesciunt culpa iste numquam libero veritatis autem
          esse facere magni quidem itaque aperiam sint quae assumenda soluta
          doloribus earum, sit voluptates voluptatibus vero consectetur at?
          Impedit rem, distinctio ab, officia perferendis facilis voluptas
          voluptates qui odit reiciendis accusantium omnis temporibus
          repudiandae delectus maiores voluptatem sint repellendus placeat nulla
          iure nobis ipsa? Totam corrupti quos itaque commodi exercitationem
          soluta maxime omnis mollitia ab explicabo voluptas rerum, nostrum
          necessitatibus ipsa neque impedit dolorum labore aperiam veniam
          debitis nihil, temporibus quo. Aspernatur provident delectus eveniet
          harum, magnam totam recusandae laboriosam quo!
        </p>
      </div>
    ),
  },
} as const

export type ArtistSlug = keyof typeof artists
export type Artist = (typeof artists)[ArtistSlug]

export function isArtistSlug(value: string): value is ArtistSlug {
  return Object.hasOwn(artists, value)
}

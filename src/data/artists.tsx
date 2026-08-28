import type { Artist } from '#/types'

const theLoungeConjecture = {
  name: 'The Lounge Conjecture',
  slug: 'the-lounge-conjecture',
  bioMarkdown: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsam aspernatur commodi nesciunt culpa iste numquam libero veritatis autem esse facere magni quidem itaque aperiam sint quae assumenda soluta doloribus earum, sit voluptates voluptatibus vero consectetur at? Impedit rem, distinctio ab, officia perferendis facilis voluptas voluptates qui odit reiciendis accusantium omnis temporibus repudiandae delectus maiores voluptatem sint repellendus placeat nulla iure nobis ipsa?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptas quam quos ipsum quod hic, pariatur iure ea, animi eaque necessitatibus repellendus cum impedit! Aliquam assumenda accusamus consectetur voluptas tempore sapiente, dolores harum quia nulla, corrupti repellendus reprehenderit autem perferendis.
  `.trim(),
  images: {
    hero: {
      src: '/images/artists/the-lounge-conjecture/hero-image.jpg',
      alt: 'The Lounge Conjecture',
      objectPosition: '50% 35%',
      zoom: 1,
    },
    supporting: [
      {
        src: '/images/artists/the-lounge-conjecture/gallery1.webp',
        alt: 'The Lounge Conjecture promotional image',
      },
      {
        src: '/images/artists/the-lounge-conjecture/gallery2.jpg',
        alt: 'The Lounge Conjecture promotional image',
      },
    ],
  },
} as const satisfies Artist

export const artists = [
  theLoungeConjecture,
] as const satisfies readonly Artist[]

// This 'derived union' makes the type-checker aware of all artist slugs.
export type ArtistSlug = (typeof artists)[number]['slug']

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug)
}

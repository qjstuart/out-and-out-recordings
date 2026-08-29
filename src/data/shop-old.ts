export interface Product {
  /** Stable identifier used in links such as /shop#release-name (for scrolling to a particular product). */
  id: string
  /** Stripe Product IDs are public identifiers; API keys remain server-only. */
  stripeProductIds: {
    test: string
    live: string
  }
  artist: string
  title: string
  imageSrc: string
  imageAlt: string
  catalogNumber?: string
  format: 'Digital WAV' | 'Vinyl'
  description: string
}

/**
 * Add the records and artwork shown in the shop here. Each Stripe Product must
 * have an active default one-time Price. The server retrieves that Price so
 * price changes can be made in Stripe without changing this file.
 */
export const Products = [
  {
    id: 'last-train-out',
    stripeProductIds: {
      test: 'prod_U1Gzdo9plnUFKR',
      live: '',
    },
    artist: 'The Lounge Conjecture',
    title: 'Last Train Out',
    imageSrc: '/images/shop/the-richest-man-in-babylon.jpg',
    imageAlt: 'Last Train Out cover artwork',
    format: 'Digital WAV',
    description: 'Track 1 from OUT1',
  },
  {
    id: 'break-and-shake',
    stripeProductIds: {
      test: '',
      live: '',
    },
    artist: 'The Lounge Conjecture',
    title: 'Break And Shake',
    imageSrc: '/images/shop/the-richest-man-in-babylon.jpg',
    imageAlt: 'Break And Shake cover artwork',
    format: 'Digital WAV',
    description: 'Track 2 from OUT2',
  },
] satisfies ReadonlyArray<Product>

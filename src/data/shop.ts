export interface Product {
  /** Stable identifier used in links such as /shop#release-name. */
  id: string
  artist: string
  title: string
  imageSrc: string
  imageAlt: string
  catalogNumber?: string
  format: 'Digital WAV' | 'Vinyl'
  description: string
}

/**
 * Add the records and artwork shown in the shop here. Stripe price IDs belong
 * in the server-side Stripe configuration, keyed by this item's `id`.
 */
export const Products = [
  {
    id: 'last-train-out',
    artist: 'The Lounge Conjecture',
    title: 'Last Train Out',
    imageSrc: '/images/shop/the-richest-man-in-babylon.jpg',
    imageAlt: 'Last Train Out cover artwork',
    format: 'Digital WAV',
    description: 'Track 1 from OUT1',
  },
  {
    id: 'break-and-shake',
    artist: 'The Lounge Conjecture',
    title: 'Break And Shake',
    imageSrc: '/images/shop/the-richest-man-in-babylon.jpg',
    imageAlt: 'Break And Shake cover artwork',
    format: 'Digital WAV',
    description: 'Track 2 from OUT2',
  },
] satisfies ReadonlyArray<Product>

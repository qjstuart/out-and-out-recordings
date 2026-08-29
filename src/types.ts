export type Image = {
  readonly src: string
  readonly alt: string
  /**
   * Controls which part of the image remains visible when it is cropped.
   * The first value is horizontal and the second is vertical.
   * Examples: 'center top', 'center 30%', '75% 60%'.
   */
  readonly objectPosition?: string
  /** The image scale, where 1 is the original size and 1.2 is 20% larger. */
  readonly zoom?: number
}

export type Artist = {
  readonly name: string
  readonly slug: string
  readonly bioMarkdown: string
  readonly images: {
    readonly hero: Image
    readonly supporting: readonly Image[]
  }
}

export type Release = {
  readonly id: string
  readonly title: string
  readonly slug: string
  readonly catalogNumber: string
  readonly artists: readonly Artist[]
  readonly releaseDate: string
  readonly descriptionMarkdown: string
  readonly tracks: readonly Track[]
  readonly artwork: Image
  readonly format: 'digital' | 'vinyl'
}

export type Track = {
  readonly id: string
  readonly title: string
  readonly artists: readonly Artist[]
  readonly durationInSeconds: number
}

type BaseProduct = {
  readonly id: string // Non-Stripe, this is our own
}

export type ReleaseProduct = BaseProduct & {
  readonly kind: 'release'
  readonly release: Release
}

export type TrackProduct = BaseProduct & {
  readonly kind: 'track'
  readonly track: Track
}

export type MerchandiseProduct = BaseProduct & {
  readonly kind: 'merchandise'
  readonly name: string
  readonly descriptionMarkdown: string
  readonly image: Image
}

export type Product = ReleaseProduct | TrackProduct | MerchandiseProduct

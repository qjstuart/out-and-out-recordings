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

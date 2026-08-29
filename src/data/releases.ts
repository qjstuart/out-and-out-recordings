import type { Release } from '#/types'
import { theLoungeConjecture } from './artists'
import { breakAndShake, lastTrainOut } from './tracks'

export const lastTrainOutBreakAndShake = {
  title: 'Last Train Out / Break And Shake',
  id: 'last-train-out-break-and-shake',
  releaseDate: '2026-07-31',
  artists: [theLoungeConjecture],
  catalogNumber: 'OUT1',
  formats: ['digital'],
  slug: 'last-train-out-break-and-shake',
  tracks: [lastTrainOut, breakAndShake],
  descriptionMarkdown: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsam aspernatur commodi nesciunt culpa iste numquam libero veritatis autem esse facere magni quidem itaque aperiam sint quae assumenda soluta doloribus earum, sit voluptates voluptatibus vero consectetur at? Impedit rem, distinctio ab, officia perferendis facilis voluptas voluptates qui odit reiciendis accusantium omnis temporibus repudiandae delectus maiores voluptatem sint repellendus placeat nulla iure nobis ipsa?

Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptas quam quos ipsum quod hic, pariatur iure ea, animi eaque necessitatibus repellendus cum impedit! Aliquam assumenda accusamus consectetur voluptas tempore sapiente, dolores harum quia nulla, corrupti repellendus reprehenderit autem perferendis.
  `.trim(),
  artwork: {
    src: '/images/releases/last-train-out-break-and-shake/last-train-out-break-and-shake.webp',
    alt: 'Release artwork',
  },
} as const satisfies Release

export const releases = [
  lastTrainOutBreakAndShake,
] as const satisfies readonly Release[]

export type ReleaseSlug = (typeof releases)[number]['slug']

export function getReleaseBySlug(slug: string): Release | undefined {
  return releases.find((release) => release.slug === slug)
}

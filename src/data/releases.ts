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
  embeds: {
    beatportReleaseId: '7166528',
  },
  links: {
    spotify:
      'https://open.spotify.com/album/7oq4LmCjT4y1EUyWsQlOMj?si=CHVpEK1cQ8qApwMiMSwgSg',
  },
  slug: 'last-train-out-break-and-shake',
  tracks: [lastTrainOut, breakAndShake],
  descriptionMarkdown: `
Two tracks serving a generous helping of breakbeats and rolling percussion. “Last Train Out” complements this with atmospheric synths and dubbed-out wah guitars, “Break And Shake” features a playful exchange of Spanish vocals laid on top of a groove fit for lighting up dancefloors. This marks the first chapter in a larger set of forthcoming works from The Lounge Conjecture.

_"These tracks are special to me because they are the first pieces created using old samplers and hardware boxes, rather than solely inside a DAW. The limitations of those older machines forces you to be resourceful and changes your approach to production. It doesn't make things easier, but it encourages being decisive and moving forward. That’s sometimes tricky to do in the DAW, where it’s easy to keep auditioning and tweaking things. Having said that, the DAW is still a crucial part of my workflow. At the end of the day, the mindset matters more than the tools._

_As I worked on this release, the title “Last Train Out” began to take on a meaning beyond the music itself. Each session felt like I was at a station, boarding the metaphorical last train out… a now-or-never moment. In many ways, these songs became a self-imposed ultimatum to get this project off the ground and start releasing.”_ — Quentin

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

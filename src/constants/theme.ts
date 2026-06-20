export const themeClasses = {
  neutral: {
    mosaic: ['bg-neutral-300', 'bg-neutral-500', 'bg-neutral-700'],
    activeDot: 'group-[.is-active]:bg-neutral-500',
  },
  stone: {
    mosaic: ['bg-stone-300', 'bg-stone-500', 'bg-stone-700'],
    activeDot: 'group-[.is-active]:bg-stone-500',
  },
  orange: {
    mosaic: ['bg-orange-300', 'bg-orange-500', 'bg-orange-700'],
    activeDot: 'group-[.is-active]:bg-orange-500',
  },
  amber: {
    mosaic: ['bg-amber-300', 'bg-amber-500', 'bg-amber-700'],
    activeDot: 'group-[.is-active]:bg-amber-500',
  },
  emerald: {
    mosaic: ['bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700'],
    activeDot: 'group-[.is-active]:bg-emerald-500',
  },
  teal: {
    mosaic: ['bg-teal-300', 'bg-teal-500', 'bg-teal-700'],
    activeDot: 'group-[.is-active]:bg-teal-500',
  },
  cyan: {
    mosaic: ['bg-cyan-300', 'bg-cyan-500', 'bg-cyan-700'],
    activeDot: 'group-[.is-active]:bg-cyan-500',
  },
  sky: {
    mosaic: ['bg-sky-300', 'bg-sky-500', 'bg-sky-700'],
    activeDot: 'group-[.is-active]:bg-sky-500',
  },
  blue: {
    mosaic: ['bg-blue-300', 'bg-blue-500', 'bg-blue-700'],
    activeDot: 'group-[.is-active]:bg-blue-500',
  },
  indigo: {
    mosaic: ['bg-indigo-300', 'bg-indigo-500', 'bg-indigo-700'],
    activeDot: 'group-[.is-active]:bg-indigo-500',
  },
  violet: {
    mosaic: ['bg-violet-300', 'bg-violet-500', 'bg-violet-700'],
    activeDot: 'group-[.is-active]:bg-violet-500',
  },
} as const

export type ThemeColor = keyof typeof themeClasses

export const routeThemes = {
  '/': 'orange',
  '/shop': 'emerald',
  '/contact': 'neutral',
} as const satisfies Record<string, ThemeColor>

export type ThemedRoute = keyof typeof routeThemes

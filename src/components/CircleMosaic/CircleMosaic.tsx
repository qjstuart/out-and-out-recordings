import { cn } from '../../lib/utils'

const colorClasses = {
  neutral: ['bg-neutral-300', 'bg-neutral-500', 'bg-neutral-700'],
  stone: ['bg-stone-300', 'bg-stone-500', 'bg-stone-700'],
  orange: ['bg-orange-300', 'bg-orange-500', 'bg-orange-700'],
  amber: ['bg-amber-300', 'bg-amber-500', 'bg-amber-700'],
  emerald: ['bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700'],
  teal: ['bg-teal-300', 'bg-teal-500', 'bg-teal-700'],
  cyan: ['bg-cyan-300', 'bg-cyan-500', 'bg-cyan-700'],
  sky: ['bg-sky-300', 'bg-sky-500', 'bg-sky-700'],
  blue: ['bg-blue-300', 'bg-blue-500', 'bg-blue-700'],
  indigo: ['bg-indigo-300', 'bg-indigo-500', 'bg-indigo-700'],
  violet: ['bg-violet-300', 'bg-violet-500', 'bg-violet-700'],
} as const

export type CircleMosaicColor = keyof typeof colorClasses

export interface CircleMosaicProps {
  baseColor: CircleMosaicColor
  circlesPerRow?: number
  className?: string
}

export function CircleMosaic({
  baseColor,
  circlesPerRow = 18,
  className,
}: CircleMosaicProps) {
  const count = Math.max(1, Math.floor(circlesPerRow))

  return (
    <div
      className={cn('flex w-full flex-col gap-2', className)}
      aria-hidden="true"
    >
      {colorClasses[baseColor].map((color) => (
        <div
          key={color}
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: count }, (_, index) => (
            <span
              key={`${color}-${index}`}
              className={cn(
                color,
                'aspect-square min-w-0 rounded-full opacity-90',
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default CircleMosaic

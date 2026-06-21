import { themeClasses } from '#/constants/theme'
import { cn } from '#/lib/utils'

import type { ThemeColor } from '../../constants/theme'

export interface CircleMosaicProps {
  baseColor: ThemeColor
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
      className={cn('flex w-full flex-col gap-2 mb-3', className)}
      aria-hidden="true"
    >
      {themeClasses[baseColor].mosaic.map((color) => (
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

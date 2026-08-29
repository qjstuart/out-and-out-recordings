import { themeClasses } from '#/constants/theme'
import { cn } from '#/lib/utils'

import type { CSSProperties } from 'react'
import type { ThemeColor } from '../../constants/theme'

const DESKTOP_CIRCLES_PER_ROW = 18
const MOBILE_CIRCLES_PER_ROW = 12

export interface CircleMosaicProps {
  baseColor: ThemeColor
  className?: string
}

export function CircleMosaic({ baseColor, className }: CircleMosaicProps) {
  return (
    <div
      className={cn('mb-3 flex w-full flex-col gap-1.5 md:gap-2', className)}
      aria-hidden="true"
    >
      {themeClasses[baseColor].mosaic.map((color) => (
        <div
          key={color}
          className="grid grid-cols-[repeat(var(--circle-count-mobile),minmax(0,1fr))] gap-1.5 md:grid-cols-[repeat(var(--circle-count-desktop),minmax(0,1fr))]"
          style={
            {
              '--circle-count-mobile': MOBILE_CIRCLES_PER_ROW,
              '--circle-count-desktop': DESKTOP_CIRCLES_PER_ROW,
            } as CSSProperties
          }
        >
          {Array.from({ length: DESKTOP_CIRCLES_PER_ROW }, (_, index) => (
            <span
              key={`${color}-${index}`}
              className={cn(
                color,
                'aspect-square min-w-0 rounded-full opacity-90',
                index >= MOBILE_CIRCLES_PER_ROW && 'hidden md:block',
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default CircleMosaic

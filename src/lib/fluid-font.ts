import { MIN_VIEWPORT, MAX_VIEWPORT } from '#/constants/breakpoints'

/**
 * Creates a CSS `clamp()` value that scales a font smoothly between two sizes.
 *
 * Both arguments are font sizes in pixels. The font stays at `minSize` below
 * `MIN_VIEWPORT`, scales fluidly between the shared viewport breakpoints, and
 * stays at `maxSize` above `MAX_VIEWPORT`.
 *
 * @param minSize Font size in pixels at or below `MIN_VIEWPORT`.
 * @param maxSize Font size in pixels at or above `MAX_VIEWPORT`.
 * @returns A CSS font-size value for a React style or CSS declaration.
 *
 * @example
 * <h1 style={{ fontSize: fluidFont(14, 40) }}>Fluid heading</h1>
 */
export function fluidFont(minSize: number, maxSize: number) {
  const slope = (maxSize - minSize) / (MAX_VIEWPORT - MIN_VIEWPORT)
  const intercept = minSize - slope * MIN_VIEWPORT

  return `clamp(${minSize}px, calc(${intercept}px + ${slope * 100}vw), ${maxSize}px)`
}

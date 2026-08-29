/**
 * Formats seconds as minutes and seconds (MM:SS).
 */
export function formatSecondsAsMinutesAndSeconds(durationInSeconds: number) {
  if (!Number.isInteger(durationInSeconds) || durationInSeconds < 0) {
    throw new RangeError('Duration must be a non-negative whole number.')
  }

  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return `${String(minutes)}:${String(seconds).padStart(2, '0')}`
}

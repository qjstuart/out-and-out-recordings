import { formatSecondsAsMinutesAndSeconds } from '#/lib/datetime.utils'

import type { Track } from '#/types'

export type TracklistingProps = {
  tracks: readonly Track[]
}

export default function Tracklisting({ tracks }: TracklistingProps) {
  return (
    <ol>
      {tracks.map((track, index) => (
        <li
          key={track.id}
          className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-baseline gap-3 py-1"
        >
          <span
            aria-hidden="true"
            // `tabular-nums` (tabular-numerals) enables fixed-width numbers
            className="text-sm tabular-nums text-muted-foreground"
          >
            {index + 1}
          </span>

          <span className="min-w-0">{track.title}</span>

          <time
            dateTime={`PT${track.durationInSeconds}S`}
            className="text-sm tabular-nums text-muted-foreground"
          >
            {formatSecondsAsMinutesAndSeconds(track.durationInSeconds)}
          </time>
        </li>
      ))}
    </ol>
  )
}

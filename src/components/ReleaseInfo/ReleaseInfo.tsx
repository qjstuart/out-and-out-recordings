import type { Release } from '#/types'

export type ReleaseInfoProps = {
  release: Release
}

export default function ReleaseInfo({ release }: ReleaseInfoProps) {
  const { releaseDate, catalogNumber, formats } = release

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt className="text-muted-foreground">Release date:</dt>
      <dd>
        <time dateTime={releaseDate}>{releaseDate}</time>
      </dd>

      <dt className="text-muted-foreground">Catalogue #:</dt>
      <dd>{catalogNumber}</dd>

      <dt className="text-muted-foreground">Format:</dt>
      <dd className="capitalize">{formats.join(', ')}</dd>
    </dl>
  )
}

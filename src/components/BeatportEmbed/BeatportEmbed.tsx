export interface BeatportEmbedProps {
  releaseId: string
  releaseTitle: string
}

export default function BeatportEmbed({
  releaseId,
  releaseTitle,
}: BeatportEmbedProps) {
  const src = `https://embed.beatport.com/?id=${encodeURIComponent(releaseId)}&type=release`

  return (
    <iframe
      src={src}
      title={`${releaseTitle} — Beatport player`}
      width="100%"
      height="322"
      loading="lazy"
    />
  )
}

import { useRef } from 'react'
import { X } from 'lucide-react'

import type { Image } from '#/types'
import { cn } from '#/lib/utils'

export type ImageCardProps = {
  image: Image
  className?: string
  imageClassName?: string
}

/**
 * Our go-to component for displaying an image.
 * Opens the image as a modal when clicked.
 */
export default function ImageCard({
  image,
  className,
  imageClassName,
}: ImageCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { src, alt, objectPosition = '50% 50%', zoom = 1 } = image

  function openImage() {
    const dialog = dialogRef.current

    // We do this because on mobile, the 'X' icon was getting focused immediately.
    // Instead this focuses the dialog and prevents a focus outline on the 'X' icon.
    if (dialog) {
      dialog.showModal()
      dialog.focus()
    }
  }

  function closeImage() {
    dialogRef.current?.close()
  }

  return (
    <>
      <button
        type="button"
        onClick={openImage}
        aria-label={`Expand ${alt}`}
        className={cn(
          'block w-full cursor-pointer overflow-hidden border border-white',
          className,
        )}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            objectPosition,
            transform: `scale(${zoom})`,
            transformOrigin: objectPosition,
          }}
          className={cn('block h-auto w-full', imageClassName)}
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Expanded view of ${alt}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImage()
        }}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-4 focus:outline-none backdrop:bg-black/85"
      >
        <div className="relative flex max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="border border-white object-contain max-h-[inherit]" // Codex suggested `max-h-[inherit]` to prevent overflow of tall images. No need to worry about width (apparently) due to Tailwind's global styles.
          />
          <button
            type="button"
            onClick={closeImage}
            aria-label="Close expanded image"
            className="absolute right-2 top-2 grid size-7 cursor-pointer place-items-center rounded-full bg-black/75 text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-white"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  )
}

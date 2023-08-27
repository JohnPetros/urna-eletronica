import Image from 'next/image'
import type { Image as ImageData } from '@/types/Image'

interface CandidateProps {
  image: ImageData
  size: number
}

export function CandidateImage({ image, size }: CandidateProps) {
  return (
    <div
      key={image.url}
      style={{ width: size }}
      className={`border border-zinc-800 flex flex-col items-center justify-center`}
    >
      <Image
        src={image.url}
        width={size}
        height={size}
        className="block"
        alt={image.caption}
        priority={true}
      />
      <small className="p-[1px] text-center text-[10px] font-medium">
        {image.caption}
      </small>
    </div>
  )
}

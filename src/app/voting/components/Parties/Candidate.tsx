import type { Image as CandidateImage } from '@/types/Image'
import Image from 'next/image'

interface CandidateProps {
  name: string
  images: CandidateImage[]
  number: number
}

export function Candidate({ name, images, number }: CandidateProps) {
  return (
    <div className='w-32 flex flex-col items-center justify-center'>
      {images.map(({ url, caption }) => (
        <Image key={url} src={url} width={72} height={48} alt={caption} />
      ))}
      <div className='flex flex-col text-center'>
        <small className='text-base'>{name}</small>
        <strong className="text-zinc-100">{number}</strong>
      </div>
    </div>
  )
}

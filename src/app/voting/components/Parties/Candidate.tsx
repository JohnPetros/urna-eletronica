import type { Image as CandidateImage } from '@/types/Image'
import Image from 'next/image'

import { Variants, motion } from 'framer-motion'

interface CandidateProps {
  name: string
  images: CandidateImage[]
  number: number
}

export function Candidate({ name, images, number }: CandidateProps) {
  const candidateVariants: Variants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    entry: {
      opacity: 1,
      y: 0,
    },
  }

  const imageVarians: Variants = {
    hover: {
      rotate: ['0deg', '15deg', '0deg', '-15deg', '0deg'],
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={candidateVariants}
      className="w-32 flex flex-col items-center justify-center"
    >
      {images.map(({ url, caption }) => (
        <motion.div
          key={url}
          variants={imageVarians}
          initial="initial"
          whileHover="hover"
        >
          <Image key={url} src={url} width={72} height={48} alt={caption} />
        </motion.div>
      ))}
      <div className="flex flex-col text-center">
        <small className="text-base">{name}</small>
        <strong className="text-zinc-100">{number}</strong>
      </div>
    </motion.div>
  )
}

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
      className="flex flex-col items-center justify-center relative"
    >
      <div className="flex gap-3">
        {images.map(({ url, caption }, index) => {
          const isFirst = index === 0

          return (
            <motion.div
              key={url}
              variants={imageVarians}
              initial="initial"
              whileHover="hover"
            >
              {isFirst && (
                <div className="flex flex-col items-center">
                  <Image src={url} width={72} height={64} alt={caption} />
                  <div className="flex flex-col text-center">
                    <small className="text-sm">{name}</small>
                    <strong className="text-zinc-100">{number}</strong>
                  </div>
                </div>
              )}
              {!isFirst && (
                <div className=" flex flex-col items-center pointer-events-none">
                  <Image src={url} width={40} height={40} alt={caption} />
                  <small>{caption}</small>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

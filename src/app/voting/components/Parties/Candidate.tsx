'use client'
import { useState } from 'react'

import Image from 'next/image'

import { Variants, motion } from 'framer-motion'

import type { Image as CandidateImage } from '@/types/Image'
import { Loading } from '../Loading'

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

interface CandidateProps {
  name: string
  images: CandidateImage[]
  number: string
  alternates?: string[]
}

export function Candidate({
  name,
  images,
  number,
  alternates,
}: CandidateProps) {
  const [isLoading, setIsloading] = useState(true)

  return (
    <motion.div
      variants={candidateVariants}
      className="flex flex-col md:flex-row items-center justify-center relative cursor-pointer"
    >
      <div className="flex gap-3 flex-col md:flex-row">
        {images.map(({ url, caption }, index) => {
          const isFirst = index === 0

          return (
            <motion.div
              key={url}
              variants={imageVarians}
              initial="initial"
              whileHover="hover"
              className="text-sm w-36 "
            >
              {isFirst && (
                <div className="flex flex-col items-center ">
                  <div className="w-20 h-28 md:h-24">
                    <Image
                      src={url}
                      width={72}
                      height={64}
                      alt={caption}
                      onLoad={() => {
                        setIsloading(false)
                      }}
                    />
                    {isLoading && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center">
                        <Loading />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col text-center gap-1 mt-1">
                    <small className="text-sm">{name}</small>
                    <strong className="text-zinc-100">{number}</strong>
                  </div>
                </div>
              )}
              {!isFirst && alternates && (
                <div className=" flex flex-col items-center pointer-events-none">
                  <Image src={url} width={40} height={40} alt={caption} />
                  <small>{alternates[index - 1]}</small>
                  <strong className="text-zinc-100 text-[10px]">
                    {caption}
                  </strong>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

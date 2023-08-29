'use client'

import { useState } from 'react'

import Image from 'next/image'
import { Loading } from '../Loading'

import type { Image as ImageData } from '@/types/Image'

interface CandidateProps {
  image: ImageData
  size: number
}

export function CandidateImage({ image, size }: CandidateProps) {
  const [isLoading, setIsloading] = useState(true)

  return (
    <div
      key={image.url}
      style={{ width: size }}
      className={`border border-zinc-800 flex flex-col items-center justify-center`}
    >
      <div style={{ height: size + 32 }} className="relative">
        <Image
          src={image.url}
          width={size}
          height={size}
          className="block"
          alt={image.caption}
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

      <small className="p-[1px] text-center text-[10px] font-medium">
        {image.caption}
      </small>
    </div>
  )
}

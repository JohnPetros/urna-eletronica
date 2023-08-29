'use client'

import { Variants, motion } from 'framer-motion'

const loadingAnimation: Variants = {
  load: {
    rotate: '360deg',
    transition: {
      ease: 'linear',
      repeat: Infinity,
      duration: 0.8,
    },
  },
}

export function Loading() {
  return (
    <motion.span
      variants={loadingAnimation}
      animate="load"
      className="w-10 h-10 border-8 border-gray-100 border-t-transparent rounded-full"
    ></motion.span>
  )
}

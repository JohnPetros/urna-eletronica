'use client'

import { Variants, motion } from 'framer-motion'

interface DigitProps {
  number: number
  isActive: boolean
}

export function Digit({ number, isActive }: DigitProps) {
  const digitVariants: Variants = {
    default: {
      opacity: 1,
    },
    blink: {
      opacity: 0,
      transition: {
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 0.4,
      },
    },
  }

  return (
    <motion.span
      variants={digitVariants}
      animate={isActive ? 'blink' : 'default'}
      className="grid place-content-center border-2 border-zinc-900 w-8 h-10 font-extrabold text-lg peer "
    >
      {number}
    </motion.span>
  )
}

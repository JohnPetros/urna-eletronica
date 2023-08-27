'use client'

import { motion } from 'framer-motion'
import { blinkAnimation } from './Display'

interface DigitProps {
  number: number
  isActive: boolean
}

export function Digit({ number, isActive }: DigitProps) {
  return (
    <motion.span
      role="textbox"
      variants={blinkAnimation}
      animate={isActive ? 'blink' : 'default'}
      className="grid place-content-center border-2 border-zinc-900 w-8 h-10 font-extrabold text-lg"
      aria-labelledby="vonting-number"
    >
      {number}
    </motion.span>
  )
}

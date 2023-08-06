'use client'

import { motion } from 'framer-motion'
import { blinkVariants } from './Display'

interface DigitProps {
  number: number
  isActive: boolean
}

export function Digit({ number, isActive }: DigitProps) {
  return (
    <motion.div
      role="textbox"
      variants={blinkVariants}
      animate={isActive ? 'blink' : 'default'}
      className="grid place-content-center border-2 border-zinc-900 w-8 h-10 font-extrabold text-lg peer"
    >
      {number}
    </motion.div>
  )
}

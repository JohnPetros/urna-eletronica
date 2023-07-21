'use client'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

interface KeyProps {
  value: string
  className?: string
}

export function Key({ value, className }: KeyProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        'text-zinc-100 rounded-lg border-b-2 border-zinc-400 uppercase',
        className
      )}
    >
      {value}
    </motion.button>
  )
}

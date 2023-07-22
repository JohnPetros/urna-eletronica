'use client'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { useUrn } from '@/hooks/useUrn'

interface KeyProps {
  value: string
  className?: string
}

export function Key({ value, className }: KeyProps) {
  const { handleKeyPress } = useUrn()

  return (
    <motion.button
      onClick={() => handleKeyPress(value.toLowerCase())}
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        'text-zinc-100 rounded-lg border-b-2 border-zinc-400 uppercase font-bold',
        className
      )}
    >
      {value}
    </motion.button>
  )
}

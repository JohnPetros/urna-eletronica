'use client'
import { twMerge } from 'tailwind-merge'
import { Variants, motion } from 'framer-motion'
import { useUrn } from '@/hooks/useUrn'

interface KeyProps {
  value: string
  isAction?: boolean
  className?: string
}

export function Key({ value, isAction = false, className }: KeyProps) {
  const { state, dispatch } = useUrn()
  const isEnable = state.canPressKey || isAction

  const keyVariants: Variants = {
    tap: {
      scale: 0.95,
    },
  }

  return (
    <motion.button
      onClick={() => {
        if (isEnable) {
          dispatch({ type: 'pressKey', payload: value.toLowerCase() })
        }
      }}
      variants={keyVariants}
      whileTap={isEnable ? 'tap' : ''}
      className={twMerge(
        'text-zinc-100 rounded-lg border-b-2 border-zinc-400 uppercase font-bold',
        className,
        isEnable ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
    >
      {value}
    </motion.button>
  )
}

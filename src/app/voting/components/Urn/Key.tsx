'use client'

import { useUrn } from '@/hooks/useUrn'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Variants, motion } from 'framer-motion'

interface KeyProps {
  value: string
  isAction?: boolean
  className?: string
  ariaLabel?: string
}

export function Key({
  value,
  isAction = false,
  className,
  ariaLabel,
}: KeyProps) {
  const { state, dispatch } = useUrn()
  const keyRef = useRef<HTMLButtonElement>(null)
  const isEnable = state.canPressKey || isAction

  const keyVariants: Variants = {
    tap: {
      scale: 0.95,
    },
  }

  function handleKeyPress() {
    new Audio(
      `/audios/${
        value === 'Confirma' && !state.canPressKey ? 'confirm' : 'key'
      }.wav`
    ).play()

    dispatch({ type: 'pressKey', payload: { keyValue: value, keyRef } })
  }

  return (
    <motion.button
      ref={keyRef}
      onClick={() => {
        if (isEnable) {
          handleKeyPress()
        }
      }}
      variants={keyVariants}
      whileTap={isEnable ? 'tap' : ''}
      className={twMerge(
        'text-zinc-100 rounded-lg border-b-2 border-zinc-400 uppercase font-bold w-full h-12',
        className,
        isEnable ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
      aria-label={ariaLabel}
    >
      {value}
    </motion.button>
  )
}

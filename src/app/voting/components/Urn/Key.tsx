'use client'
import { twMerge } from 'tailwind-merge'
import { Variants, motion } from 'framer-motion'
import { useUrn } from '@/hooks/useUrn'
import { useAudioPlayer } from 'react-use-audio-player'

interface KeyProps {
  value: string
  isAction?: boolean
  className?: string
}

export function Key({ value, isAction = false, className }: KeyProps) {
  const { load } = useAudioPlayer()

  const { state, dispatch } = useUrn()
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

    dispatch({ type: 'pressKey', payload: value.toLowerCase() })
  }

  return (
    <motion.button
      onClick={() => {
        if (isEnable) {
          handleKeyPress()
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

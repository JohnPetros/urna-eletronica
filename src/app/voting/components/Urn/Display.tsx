'use client'
import { useEffect, useState } from 'react'
import { useUrn } from '@/hooks/useUrn'

import { Role } from '@/types/role'
import { Candidate } from '@/types/candidate'

import { Digit } from './Digit'
import Image from 'next/image'

import { Variants, motion } from 'framer-motion'

export const blinkVariants: Variants = {
  default: {
    opacity: 1,
  },
  blink: {
    opacity: 0,
    transition: {
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 0.8,
    },
  },
}

interface DisplayProps {
  roles: Role[]
}

export function Display({ roles }: DisplayProps) {
  const {
    state: { activeRoleTitle, pressedNumbers, choosenCandidate, isWhiteVote },
    dispatch,
  } = useUrn()
  const [activeDigit, setActiveDigit] = useState(0)
  const [isNullVote, setIsNullVote] = useState(false)

  const activeRole = roles.find((role: Role) => role.title === activeRoleTitle)!
  const digitsAmount = activeRole.digits

  function getChoosenCandidate() {
    return activeRole.candidates.find(
      (candidate) =>
        Number(candidate.number) === Number(pressedNumbers.join(''))
    )
  }

  function setChoosenCandidate(choosenCandidate: Candidate | null) {
    dispatch({ type: 'setChoosenCandidate', payload: choosenCandidate })
  }

  function setCanPressKey(canPressKey: boolean) {
    dispatch({ type: 'setCanPressKey', payload: canPressKey })
  }

  useEffect(() => {
    setActiveDigit(pressedNumbers.length)

    if (pressedNumbers.length === digitsAmount) {
      setCanPressKey(false)
      const activeCandidate = getChoosenCandidate()

      if (!activeCandidate) {
        setIsNullVote(true)
        return
      }

      setChoosenCandidate(activeCandidate)
      return
    }

    setIsNullVote(false)
    setChoosenCandidate(null)
    setCanPressKey(true)
  }, [pressedNumbers])

  useEffect(() => {
    if (isWhiteVote) {
      setIsNullVote(false)
      setChoosenCandidate(null)
      setCanPressKey(false)
    }
  }, [isWhiteVote])

  return (
    <div className="bg-zinc-100 border border-zinc-800 flex flex-col justify-between">
      <div className="flex justify-between pt-6 px-6">
        <div>
          <span
            className={
              choosenCandidate || isNullVote ? 'opacity-1' : 'opacity-0'
            }
          >
            Seu voto para
          </span>
          <strong className="uppercase text-xl block w-max pr-6 font-medium">
            {activeRoleTitle}
          </strong>

          <div
            className={`flex gap-2 mt-4 ${
              !isWhiteVote ? 'opacity-1' : 'opacity-0'
            }`}
          >
            {Array.from({ length: digitsAmount }).map((_, index) => (
              <Digit
                key={`Digit-${index}`}
                number={pressedNumbers[index]}
                isActive={index === activeDigit}
              />
            ))}
          </div>

          <div
            className={isNullVote || isWhiteVote ? 'opacity-1' : 'opacity-0'}
          >
            <motion.strong
              variants={blinkVariants}
              animate={'blink'}
              className="uppercase font-extrabold text-zinc-900 text-3xl block p-2 mt-4 tracking-wider"
            >
              Voto Nulo
            </motion.strong>
          </div>

          <dl className={choosenCandidate ? 'opacity-1' : 'opacity-0'}>
            <div className="flex items-center gap-2">
              <dt>Nome: </dt>
              <dl>{choosenCandidate?.name}</dl>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <dt>Partido: </dt>
              <dl>{choosenCandidate?.party}</dl>
            </div>
          </dl>
        </div>

        <div className={choosenCandidate ? 'opacity-1' : 'opacity-0'}>
          {choosenCandidate?.images.map((image) => (
            <Image
              src={image.url}
              width={80}
              height={100}
              alt={image.caption}
            />
          ))}
        </div>
      </div>

      <footer
        className={`${
          choosenCandidate || isNullVote ? 'opacity-1' : 'opacity-0'
        } mt-auto border-t border-zinc-600 px-6 py-2`}
      >
        <span>Aperte a tecla:</span>
        <p>CONFIRMA para CONFIRMAR este voto</p>
        <p>CORRIGE para CONFIRMAR este voto</p>
      </footer>
    </div>
  )
}

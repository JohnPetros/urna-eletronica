'use client'
import { useEffect, useState } from 'react'
import { useUrn } from '@/hooks/useUrn'

import { Role } from '@/types/role'
import { Candidate } from '@/types/candidate'

import { Digit } from './Digit'

import { Variants, motion } from 'framer-motion'
import Link from 'next/link'

import * as Progress from '@radix-ui/react-progress'
import { twMerge } from 'tailwind-merge'
import { CandidateImage } from './CandidateImage'

const BAR_GROW_DURATION = 2000

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

const barVariants: Variants = {
  initial: {
    width: 0,
  },
  grow: {
    width: '100%',
    transition: {
      ease: 'linear',
      duration: BAR_GROW_DURATION,
    },
  },
}

interface DisplayProps {
  roles: Role[]
}

export function Display({ roles }: DisplayProps) {
  if (!roles.length) return null

  const {
    state: {
      activeRoleTitle,
      pressedNumbers,
      choosenCandidate,
      isWhiteVote,
      isEnd,
    },
    dispatch,
  } = useUrn()
  const [activeDigit, setActiveDigit] = useState(0)
  const [isNullVote, setIsNullVote] = useState(false)
  const [isEndMessageVisible, setIsEndMessageVisible] = useState(false)
  const [progressValue, setProgressValue] = useState(0)

  const activeRole = roles.find((role: Role) => role.title === activeRoleTitle)
  const digitsAmount = activeRole?.digits

  function getChoosenCandidate() {
    return activeRole?.candidates.find(
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

    if (isNullVote) {
      setIsNullVote(false)
    }
  }, [pressedNumbers])

  useEffect(() => {
    if (isWhiteVote) {
      setIsNullVote(false)
      setChoosenCandidate(null)
      setCanPressKey(false)
    }
  }, [isWhiteVote])

  useEffect(() => {
    if (!isEnd) return

    setProgressValue(100)

    const timer = setTimeout(() => {
      setIsEndMessageVisible(true)
      new Audio('/audios/confirm.wav').play()
    }, BAR_GROW_DURATION)

    return () => clearTimeout(timer)
  }, [isEnd])

  if (activeRole)
    return (
      <div className="bg-zinc-size border border-zinc-800 bg-zinc-100 flex flex-col justify-between">
        {isEnd ? (
          <div
            aria-live="polite"
            className="flex h-full items-center justify-center"
          >
            {isEndMessageVisible ? (
              <>
                <motion.strong
                  variants={blinkVariants}
                  animate="blink"
                  className="uppercase text-5xl"
                >
                  Fim
                </motion.strong>

                <Link
                  href={'/results'}
                  className="mt-12 bg-blue-900 text-zinc-100 uppercase font-medium p-2 rounded-md hover:scale-110 transition-all duration-200"
                >
                  Visualizar votos
                </Link>
              </>
            ) : (
              <>
                <strong
                  aria-live="assertive"
                  id="loading-bar"
                  className="uppercase text-4xl"
                >
                  Carregando...
                </strong>
                <Progress.Root
                  className="w-2/3 bg-zinc-300 h-4 mt-4"
                  value={progressValue}
                >
                  <Progress.Indicator
                    id="loading-bar"
                    className="block h-full bg-green-500 transition-all"
                    aria-labelledby="loading-bar"
                    style={{
                      width: `${progressValue}%`,
                      transition: `width ${BAR_GROW_DURATION}ms linear`,
                    }}
                  />
                </Progress.Root>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between pt-3 px-6 sm:max-w-[640px] md:w-full mx-auto">
              <div className="">
                <span
                  aria-live="polite"
                  className={
                    choosenCandidate || isNullVote ? ' visible' : ' invisible'
                  }
                >
                  {choosenCandidate || isNullVote
                    ? 'Seu voto para'
                    : 'invisible'}
                </span>
                <strong className="uppercase text-xl block w-max pr-6 font-medium">
                  {activeRoleTitle}
                </strong>

                <div
                  aria-label="Número de voto"
                  aria-live="polite"
                  aria-atomic="true"
                  className={`flex gap-2 mt-4 ${
                    !isWhiteVote ? ' visible' : ' invisible'
                  }`}
                >
                  {Array.from({ length: digitsAmount ?? 0 }).map((_, index) => (
                    <Digit
                      key={`Digit-${index}`}
                      number={pressedNumbers[index]}
                      isActive={index === activeDigit}
                    />
                  ))}
                </div>

                <motion.strong
                  variants={blinkVariants}
                  animate={'blink'}
                  aria-label="voto nulo"
                  aria-live="polite"
                  className={twMerge(
                    'uppercase font-extrabold text-zinc-900 text-3xl block p-2 mt-4 tracking-wider',
                    isNullVote || isWhiteVote ? 'visible' : 'invisible'
                  )}
                >
                  Voto Nulo
                </motion.strong>

                <dl
                  aria-live="polite"
                  className={
                    choosenCandidate ? ' visible mt-4 text-sm pb-3' : ' invisible'
                  }
                >
                  <div className="flex items-center gap-2">
                    <dt>Nome: </dt>
                    <dl className="texte-center">{choosenCandidate?.name}</dl>
                  </div>
                  <div className="flex items-center gap-x-2 mt-2">
                    <dt>Partido: </dt>
                    <dl>{choosenCandidate?.party}</dl>
                  </div>
                  {choosenCandidate?.images
                    .slice(1)
                    .map(({ url, caption }, index) => {
                      if (choosenCandidate.alternates)
                        return (
                          <div
                            key={url}
                            className="flex items-center gap-2 mt-2"
                          >
                            <dt>{caption}: </dt>
                            <dl>{choosenCandidate.alternates[index]}</dl>
                          </div>
                        )
                    })}
                </dl>
              </div>

              <div
                aria-live="polite"
                className={
                  choosenCandidate
                    ? ' visible flex flex-wrap gap-1 justify-end items-start max-w-[132px] '
                    : ' invisible'
                }
              >
                {choosenCandidate?.images && (
                  <CandidateImage
                    image={choosenCandidate?.images[0]}
                    size={72}
                  />
                )}

                <span className='hidden xs:flex gap-3'>
                  {choosenCandidate?.images.slice(1).map((image) => {
                    return <CandidateImage image={image} size={64} />
                  })}
                </span>
              </div>
            </div>

            <footer
              aria-live="polite"
              className={`${
                choosenCandidate || isNullVote ? ' visible' : ' invisible'
              } mt-auto border-t border-zinc-600 px-6 py-2`}
            >
              <span>Aperte a tecla:</span>
              <p>CONFIRMA para CONFIRMAR este voto</p>
              <p>CORRIGE para CONFIRMAR este voto</p>
            </footer>
          </>
        )}
      </div>
    )
}

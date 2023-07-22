'use client'
import { Digit } from './Digit'
import { Role } from '@/types/role'
import { useUrn } from '@/hooks/useUrn'
import { useEffect, useState } from 'react'
import { Candidate } from '@/types/candidate'
import Image from 'next/image'

interface DisplayProps {
  roles: Role[]
}

export function Display({ roles }: DisplayProps) {
  const { activeRoleTitle, pressedNumbers } = useUrn()
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)
  const [activeDigit, setActiveDigit] = useState(0)
  const isVisible = activeCandidate ? 'opacity-1' : 'opacity-0'

  const activeRole = roles.find((role: Role) => role.title === activeRoleTitle)!
  const digitsAmount = activeRole.digits

  function getActiveCandidate() {
    return activeRole.candidates.find(
      (candidate) =>
        Number(candidate.number) === Number(pressedNumbers.join(''))
    )
  }

  useEffect(() => {
    setActiveDigit(pressedNumbers.length)

    if (pressedNumbers.length === digitsAmount) {
      const activeCandidate = getActiveCandidate()

      if (activeCandidate) {
        setActiveCandidate(activeCandidate)
      }

      return
    }

    setActiveCandidate(null)
  }, [pressedNumbers])

  return (
    <div className="bg-zinc-100 border border-zinc-800 flex flex-col justify-between">
      <div className="flex justify-between pt-6 px-6">
        <div>
          <span className={isVisible}>Seu voto para</span>
          <strong className="uppercase text-xl block w-max pr-6">
            {activeRoleTitle}
          </strong>

          <div className="flex gap-2 mt-4">
            {Array.from({ length: digitsAmount }).map((_, index) => (
              <Digit
                number={pressedNumbers[index]}
                isActive={index === activeDigit}
              />
            ))}
          </div>

          <dl className={`${isVisible} mt-6`}>
            <div className="flex items-center gap-2">
              <dt>Nome: </dt>
              <dl>{activeCandidate?.name}</dl>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <dt>Partido: </dt>
              <dl>{activeCandidate?.party}</dl>
            </div>
          </dl>
        </div>

        <div className={isVisible}>
          {activeCandidate?.images.map((image) => (
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
        className={`${isVisible} mt-auto border-t border-zinc-600 px-6 py-2`}
      >
        <span>Aperte a tecla:</span>
        <p>CONFIRMA para CONFIRMAR este voto</p>
        <p>CORRIGE para CONFIRMAR este voto</p>
      </footer>
    </div>
  )
}

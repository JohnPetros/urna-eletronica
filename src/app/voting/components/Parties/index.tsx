'use client'
import { useState } from 'react'
import { useUrn } from '@/hooks/useUrn'

import type { Role } from '@/types/role'
import type { Party as PartyData } from '@/types/party'

import { PARTIES } from '@/constants/parties'
import { Party } from './Party'

import { AnimatePresence, Variants, motion } from 'framer-motion'

interface PartiesProps {
  roles: Role[]
}

export function Parties({ roles }: PartiesProps) {
  const { state } = useUrn()
  const [activeParty, setActiveParty] = useState<PartyData | null>(null)

  const partiesVariants: Variants = {
    initial: {
      opacity: 0,
      y: -350,
    },
    entry: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 60,
      },
    },
    exit: {
      opacity: 0,
      y: 350,
    },
  }

  function closeParty() {
    setActiveParty(null)
  }

  function handlePartyClick(abbr: string) {
    const activeRole = roles.find((role) => role.title === state.activeRoleTitle)!

    const activePartyCandidates = activeRole.candidates.filter(
      (cadidate) => cadidate.party === abbr
    )

    const activeParty = {
      ...PARTIES.find((party) => party.abbr === abbr)!,
      candidates: activePartyCandidates,
    }

    setActiveParty(activeParty)
  }

  return (
    <div className="bg-blue-900 px-6 text-zinc-200 h-[260px]">
      {activeParty ? (
        <Party data={activeParty} onClose={closeParty} />
      ) : (
        <AnimatePresence>
          <motion.div
            variants={partiesVariants}
            initial="initial"
            animate="entry"
            exit="exit"
          >
            <p className="text-center text-lg py-6">
              Para visualizar os canditados, selecione um partido
            </p>
            <div className="flex items-center justify-center gap-6 border-t border-zinc-300">
              {PARTIES.map(({ title, abbr }) => (
                <button
                  key={abbr}
                  onClick={() => handlePartyClick(abbr)}
                  className=" flex flex-col gap-1 items-center py-7 px-2 font-medium hover:text-white transition-colors duration-200"
                >
                  <strong>{abbr}</strong>
                  <small className="uppercase">{title}</small>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

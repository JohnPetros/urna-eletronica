'use client'
import { useEffect, useState } from 'react'
import { useUrn } from '@/hooks/useUrn'

import { PARTIES } from '@/constants/parties'
import { Party } from './Party'
import * as Tabs from '@radix-ui/react-tabs'

import { AnimatePresence, Variants, motion } from 'framer-motion'


import type { Role } from '@/types/role'
import type { Party as PartyData } from '@/types/party'

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
    const activeRole = roles.find(
      (role) => role.title === state.activeRoleTitle
    )!

    const activePartyCandidates = activeRole.candidates.filter(
      (cadidate) => cadidate.party === abbr
    )

    const activeParty = {
      ...PARTIES.find((party) => party.abbr === abbr)!,
      candidates: activePartyCandidates,
    }

    setActiveParty(activeParty)
  }

  useEffect(() => {
    setActiveParty(null)
  }, [state.activeRoleTitle])

  return (
    <Tabs.Root className="bg-blue-900 px-6 text-zinc-200 h-[264px]">
      {activeParty ? (
        <Tabs.Content value={`tab-${activeParty.abbr}`}>
          <Party data={activeParty} onClose={closeParty} />
        </Tabs.Content>
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
            <Tabs.List
              className="flex items-center justify-center gap-6 border-t border-zinc-300"
              role="tab-list"
              aria-label="Lista de partidos"
            >
              {PARTIES.map(({ title, abbr }) => {
                return (
                  <Tabs.Trigger
                    key={abbr}
                    value={`tab-${abbr}`}
                    role="tab"
                    data-testid={`tab-${abbr}`}
                    id={`tab-${abbr}`}
                    className=" flex flex-col gap-1 items-center py-7 px-2 font-medium hover:text-white transition-colors duration-200 cursor-pointer"
                    aria-controls={`tab-partido-${abbr}`}
                    onClick={() => handlePartyClick(abbr)}
                  >
                    <strong>{abbr}</strong>
                    <small className="uppercase">{title}</small>
                  </Tabs.Trigger>
                )
              })}
            </Tabs.List>
          </motion.div>
        </AnimatePresence>
      )}
    </Tabs.Root>
  )
}

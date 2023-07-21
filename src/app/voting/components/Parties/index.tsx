'use client'
import { useState } from 'react'
import { useRole } from '@/hooks/useRole'

import type { Role } from '@/types/roles'
import type { Party as PartyData } from '@/types/party'

import { PARTIES } from '@/constants/parties'
import { Party } from './Party'

interface PartiesProps {
  roles: Role[]
}

export function Parties({ roles }: PartiesProps) {
  const { activeRoleTitle } = useRole()
  const [activeParty, setActiveParty] = useState<PartyData | null>(null)

  function closeParty() {
    setActiveParty(null)
  }

  function handlePartyClick(abbr: string) {
    const activeRole = roles.find((role) => role.title === activeRoleTitle)!

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
    <div className="bg-blue-900 px-6 text-zinc-200">
      {activeParty ? (
        <Party data={activeParty} onClose={closeParty} />
      ) : (
        <div>
          <p className="text-center text-lg py-6">
            Para visualizar os canditados, selecione um partido
          </p>
          <div className="flex items-center justify-center gap-6 border-t border-zinc-300">
            {PARTIES.map(({ title, abbr }) => (
              <button
                onClick={() => handlePartyClick(abbr)}
                className=" flex flex-col gap-1 items-center py-7 px-2 font-medium hover:text-white transition-colors duration-200"
              >
                <strong>{abbr}</strong>
                <small className="uppercase">{title}</small>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

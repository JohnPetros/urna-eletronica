'use client'
import { useUrn } from '@/hooks/useUrn'
import { Candidate } from './Candidate'
import type { Party } from '@/types/party'

import { Variants, motion } from 'framer-motion'
import { CloseTabButton } from './CloseTabButton'

interface PartyProps {
  data: Party
  onPartyClose: VoidFunction
  onTabListClose: VoidFunction
}

export function Party({
  data: { title, abbr, number, candidates },
  onPartyClose,
  onTabListClose,
}: PartyProps) {
  const { state } = useUrn()

  const partyVariants: Variants = {
    initial: {
      opacity: 0,
      y: 350,
    },
    entry: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      variants={partyVariants}
      initial="initial"
      animate="entry"
      className=" md:gap-8 text-zinc-100 fixed left-0 md:static h-screen w-full z-30 grid grid-cols-[13rem_2fr] justify-center items-center md:flex md:py-2 overflow-y-auto"
      role="tabpanel"
      id={`tab-partido-${abbr}`}
      aria-labelledby={`tab-${abbr}`}
    >
      <div className="md:w-full h-full flex flex-col justify-center items-center md:items-start md:flex-row gap-3 bg-blue-900">
        <div className="flex flex-col md:flex-row gap-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">{number}</span>
            <div className="md:hidden">
              <CloseTabButton onClose={onPartyClose} />
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <span>{abbr}</span>
              <span>{title}</span>
            </div>
            <strong className="block mt-6">{state.activeRoleTitle}</strong>
          </div>
        </div>

        {candidates.map(({ name, images, number, alternates }) => (
          <Candidate
            key={number}
            name={name}
            images={images}
            number={number}
            alternates={alternates}
          />
        ))}

        <div className="hidden md:block">
          <CloseTabButton onClose={onPartyClose} />
        </div>
      </div>

      <div data-testid="party-tab-overlay" className="block h-full w-fullmd:hidden" onClick={onTabListClose}></div>
    </motion.div>
  )
}

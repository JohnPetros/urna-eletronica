'use client'
import { useUrn } from '@/hooks/useUrn'
import { Candidate } from './Candidate'
import type { Party } from '@/types/party'

import { Variants, motion } from 'framer-motion'

interface PartyProps {
  data: Party
  onClose: VoidFunction
}

export function Party({
  data: { title, abbr, number, candidates },
  onClose,
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

  function handleCloseClick() {
    onClose()
  }

  return (
    <motion.div
      variants={partyVariants}
      initial="initial"
      animate="entry"
      className="flex items-center justify-center gap-3 md:gap-6 py-4 text-zinc-100"
      role='tabpanel'
      id={`tab-partido-${abbr}`}
      aria-labelledby={`tab-${abbr}`}
    >
      <span className="text-2xl font-bold">{number}</span>
      <div>
        <div className="flex flex-col">
          <span>{abbr}</span>
          <span>{title}</span>
        </div>
        <strong className="block mt-6">{state.activeRoleTitle}</strong>
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

      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.25 }}
        onClick={handleCloseClick}
        className="p-2 self-start text-3xl"
      >
        ×
      </motion.button>
    </motion.div>
  )
}

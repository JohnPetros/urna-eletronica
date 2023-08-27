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
      className="flex items-center justify-center flex-col md:flex-row gap-3 md:gap-8 py-4 text-zinc-100 fixed h-full left-0 md:static bg-blue-900 w-52 md:w-full z-30"
      role="tabpanel"
      id={`tab-partido-${abbr}`}
      aria-labelledby={`tab-${abbr}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className='flex justify-between items-center'>
          <span className="text-2xl font-bold">{number}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseClick}
            className="md:hidden p-2 self-start text-3xl -mt-2"
            aria-label="Parar de ver os candidatos desse partido"
          >
            ×
          </motion.button>
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

      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.25 }}
        onClick={handleCloseClick}
        className="p-2 self-start text-3xl hidden md:block"
        aria-label="Parar de ver os candidatos desse partido"
      >
        ×
      </motion.button>
    </motion.div>
  )
}

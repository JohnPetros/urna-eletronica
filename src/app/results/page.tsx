'use client'

import { useUrn } from '@/hooks/useUrn'
import { useRouter } from 'next/navigation'

import { ROLES_TITLES } from '@/constants/roles-titles'

import { Vote } from './components/Vote'

import { Variants, motion } from 'framer-motion'
import { blinkAnimation } from '../voting/components/Urn/Display'
import { useUser } from '@/hooks/useUser'

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 250,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ROLES_TITLES.length * 0.6,
    },
  },
}

export default function Results() {
  const { user, removeUser } = useUser()
  const { state, dispatch } = useUrn()
  const router = useRouter()

  function handleExitClick() {
    dispatch({ type: 'resetState' })
    removeUser()
    router.push('/')
  }

  if (!state.votedCandidates.length) {
    router.push('/voting')
    return null
  }

  return (
    <div className="bg-blue-900 h-screen flex flex-col items-center">
      <h2 className="text-zinc-100 text-2xl mt-3 text-center">Seus votos, {user?.name}:</h2>
      <dl className="flex flex-col gap-8 mt-10">
        {state.votedCandidates.map((candidate, index) => (
          <Vote
            key={`${candidate?.number}-${index}`}
            role={ROLES_TITLES[index]}
            candidate={candidate}
            index={index}
          />
        ))}
      </dl>

      <motion.button
        variants={blinkAnimation}
        animate={'blink'}
        className="mt-8 text-zinc-100 bg-transparent uppercase font-semibold text-3xl tracking-wide"
        onClick={handleExitClick}
      >
        <motion.span variants={linkVariants} initial="hidden" animate="visible">
          Sair
        </motion.span>
      </motion.button>
    </div>
  )
}

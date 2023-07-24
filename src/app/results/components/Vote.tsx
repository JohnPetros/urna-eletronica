import { RoleTitle } from '@/hooks/useUrn'
import Image from 'next/image'
import { Variants, motion } from 'framer-motion'
import type { Candidate } from '@/types/candidate'
interface VoteProps {
  role: RoleTitle
  candidate: Candidate | null
  index: number
}

export function Vote({ role, candidate, index }: VoteProps) {
  const voteVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -250,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        delayChildren: 0.5 * index,
        when: 'beforeChildren',
      },
    },
  }

  const candidateVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 250,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <motion.div
      variants={voteVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between gap-12 text-zinc-100"
    >
      <dt className="uppercase">{role}:</dt>

      {candidate ? (
        <motion.dd
          variants={candidateVariants}
          className="flex items-center w-96 gap-2 mt-6 relative"
        >
          <Image
            src={candidate.images[0].url}
            width={64}
            height={64}
            alt={candidate.name}
          />
          <dl>
            <div className="flex items-center gap-2 w-48">
              <dt>Nome:</dt>
              <dl>{candidate.name}</dl>
            </div>
            <div className="flex items-center gap-2 w-48">
              <dt>Partido:</dt>
              <dl>{candidate.party}</dl>
            </div>
            <div className="flex items-center gap-2 w-48">
              <dt>Número:</dt>
              <dl>{candidate.number}</dl>
            </div>
          </dl>
          {candidate.alternates && (
            <ul className="flex gap-2">
              {candidate.alternates.map((alternate, index) => (
                <li>
                  <Image
                    src={candidate.images[index + 1].url}
                    width={40}
                    height={40}
                    alt={alternate}
                  />
                  {/* <small>{alternate}</small>
                  <small>{candidate.images[index + 1].caption}</small> */}
                </li>
              ))}
            </ul>
          )}
        </motion.dd>
      ) : (
        <motion.dd
          variants={candidateVariants}
          className="uppercase text-left mr-auto"
        >
          Voto em branco
        </motion.dd>
      )}
    </motion.div>
  )
}

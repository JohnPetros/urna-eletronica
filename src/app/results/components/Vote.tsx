import { RoleTitle } from '@/hooks/useUrn'
import Image from 'next/image'
import { Variants, motion } from 'framer-motion'
import type { Candidate } from '@/types/candidate'

import * as HoverCard from '@radix-ui/react-hover-card'
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
      className=" flex flex-col gap-3 md:grid md:grid-cols-[1fr_1.2fr] content-center justify-center text-sm md:text-base px-3 md:p-0  text-zinc-100"
    >
      <dt className="uppercase">{role}:</dt>

      {candidate ? (
        <motion.dd
          variants={candidateVariants}
          className="flex items-center gap-2 relative"
        >
          <Image
            src={candidate.images[0].url}
            width={48}
            height={48}
            alt={candidate.name}
          />
          <dl>
            <div className="flex items-center gap-3 w-48">
              <dt>Nome:</dt>
              <dl className="truncate">{candidate.name}</dl>
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
                  <HoverCard.Root key={`${candidate.number}-${index}`} openDelay={200}>
                    <HoverCard.Trigger>
                      <Image
                        src={candidate.images[index + 1].url}
                        width={40}
                        height={40}
                        alt={alternate}
                      />
                    </HoverCard.Trigger>

                    <HoverCard.Portal>
                      <HoverCard.Content
                        className="bg-zinc-100 p-1 rounded"
                        sideOffset={5}
                      >
                        <HoverCard.Arrow className="fill-zinc-100" />
                        <div className="flex flex-col">
                          <strong className="text-zinc-800 text-xs">
                            {alternate}
                          </strong>
                          <small className="text-zinc-800 text-xs">
                            {candidate.images[index + 1].caption}
                          </small>
                        </div>
                      </HoverCard.Content>
                    </HoverCard.Portal>
                  </HoverCard.Root>
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

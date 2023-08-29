'use client'

import { useEffect, useState } from 'react'
import { useUrn } from '@/hooks/useUrn'

import { PARTIES } from '@/constants/parties'
import { Party } from './Party'
import * as Tabs from '@radix-ui/react-tabs'

import { AnimatePresence, Variants, motion } from 'framer-motion'

import type { Role } from '@/types/role'
import type { Party as PartyData } from '@/types/party'
import { PartiesList } from './PartiesList'
import { twMerge } from 'tailwind-merge'

const partiesListAnimations: Variants = {
  hidden: {
    x: -320,
  },
  visible: {
    x: 0,
    transition: {
      type: 'tween',
      ease: 'linear',
    },
  },
}

const partiesAnimations: Variants = {
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

interface PartiesProps {
  roles: Role[]
}

export function Parties({ roles }: PartiesProps) {
  const { state } = useUrn()
  const [activeParty, setActiveParty] = useState<PartyData | null>(null)
  const [isPartiesListVisible, setIisPartiesListVisible] = useState(false)

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  )

  function closeTabsList() {
    setActiveParty(null)
    setIisPartiesListVisible(false)
  }

  function closeParty() {
    setActiveParty(null)

    if (isMobile) {
      setIisPartiesListVisible(true)
    }
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
    setIisPartiesListVisible(false)
  }

  function handleArrowButtonClick() {
    setIisPartiesListVisible(!isPartiesListVisible)
  }

  function handleKeydown({ key }: KeyboardEvent) {
    if (key === 'Escape') {
      closeTabsList()
    }
  }

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    setActiveParty(null)
  }, [state.activeRoleTitle])

  useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [handleKeydown])

  useEffect(() => {
    handleWindowSizeChange()
    window.addEventListener('resize', handleWindowSizeChange)
    return () => window.removeEventListener('resize', handleWindowSizeChange)
  }, [])

  return (
    <Tabs.Root
      className="bg-blue-900 px-6 text-zinc-200 md:h-[180px] h-auto w-full md:overflow-hidden fixed md:static top-0 z-30 overflow-y-auto"
      orientation={isMobile ? 'vertical' : 'horizontal'}
    >
      {activeParty && (
        <Tabs.Content
          value={`tab-${activeParty.abbr}`}
          className="md:w-full md:h-full"
        >
          <Party
            data={activeParty}
            onPartyClose={closeParty}
            onTabListClose={closeTabsList}
          />
        </Tabs.Content>
      )}

      {(!activeParty || isMobile) && (
        <AnimatePresence>
          <motion.div
            variants={partiesAnimations}
            initial="initial"
            animate="entry"
            exit="exit"
          >
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleArrowButtonClick}
                aria-label={
                  isPartiesListVisible
                    ? 'Exibir lista de partidos'
                    : 'Fechar lista de partidos'
                }
                aria-expanded={isPartiesListVisible ? 'true' : 'false'}
                className={twMerge(
                  'md:hidden grid place-content-center border border-gray-100 p-1 rounded-md text-gray-100 transition-all',
                  isPartiesListVisible ? 'rotate-90' : 'rotate-0'
                )}
              >
                ↓
              </button>
              <p className="text-center md:text-lg text-sm py-6">
                Para visualizar os canditados, selecione um partido, clicando na
                seta ao lado
              </p>
            </div>

            <div className="hidden md:block">
              <PartiesList parties={PARTIES} onClick={handlePartyClick} />
            </div>

            <AnimatePresence>
              {isPartiesListVisible && (
                <motion.div
                  variants={partiesListAnimations}
                  initial="hidden"
                  animate={isPartiesListVisible ? 'visible' : ''}
                  exit="hidden"
                  className="md:hidde fixed left-0 h-full grid grid-cols-2 z-30"
                >
                  <PartiesList parties={PARTIES} onClick={handlePartyClick} />
                  <div
                    data-testid="parties-list-overlay"
                    className="bg-trasparent"
                    onClick={closeTabsList}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </Tabs.Root>
  )
}

'use client'

import { Party } from '@/types/party'
import * as Tabs from '@radix-ui/react-tabs'

interface PartiesListProps {
  parties: Party[]
  onClick: (abbr: string) => void
}

export function PartiesList({ parties, onClick }: PartiesListProps) {
  return (
    <Tabs.List
      className="p-6 md:p-0 flex flex-col md:flex-row bg-blue-900 items-center md:justify-center justify-start md:gap-6 border-t border-zinc-300 z-30"
    >
      {parties.map(({ title, abbr }) => {
        return (
          <Tabs.Trigger
            key={abbr}
            value={`tab-${abbr}`}
            data-testid={`tab-${abbr}`}
            id={`tab-${abbr}`}
            className="flex flex-col gap-1 items-center py-7 px-2 font-medium hover:text-white transition-colors duration-200 cursor-pointer"
            onClick={() => onClick(abbr)}
          >
            <strong>{abbr}</strong>
            <small className="uppercase">{title}</small>
          </Tabs.Trigger>
        )
      })}
    </Tabs.List>
  )
}
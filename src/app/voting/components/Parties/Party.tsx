'use client'
import { useRole } from '@/hooks/useRole'
import { Candidate } from './Candidate'
import type { Party } from '@/types/party'

interface PartyProps {
  data: Party
  onClose: VoidFunction
}

export function Party({
  data: { title, abbr, number, candidates },
  onClose
}: PartyProps) {
  const { activeRoleTitle } = useRole()

  function handleCloseClick() {
    onClose()
  }

  return (
    <div className="flex items-center justify-center gap-8 py-4 text-zinc-100 ">
      <span className="text-2xl font-bold">{number}</span>
      <div>
        <div className="flex flex-col">
          <span>{abbr}</span>
          <span>{title}</span>
        </div>
        <strong className="block mt-6">{activeRoleTitle}</strong>
      </div>

      {candidates.map(({ name, images, number }) => (
        <Candidate key={number} name={name} images={images} number={number} />
      ))}

      <button onClick={handleCloseClick} className="p-2 self-start text-3xl">×</button>
    </div>
  )
}

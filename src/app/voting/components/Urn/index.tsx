import { Display } from './Display'
import { Keyboard } from './Keyboard'
import { Role } from '@/types/role'

interface UrnProps {
  roles: Role[]
}

export function Urn({ roles }: UrnProps) {
  return (
    <div className="bg-zinc-300 md:w-[900px]  grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 border border-zinc-100 p-8 mt-20 md:mt-0">
      <Display roles={roles} />
      <Keyboard />
    </div>
  )
}

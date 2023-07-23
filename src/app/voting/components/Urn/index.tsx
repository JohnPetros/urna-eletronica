import { Display } from './Display'
import { Keyboard } from './Keyboard'
import { getRoles } from '@/functions'

export async function Urn() {
  const roles = await getRoles()

  return (
    <div className="bg-zinc-300 w-[900px] grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 border border-zinc-100 p-8 mt-48 md:mt-0">
      <Display roles={roles} />
      <Keyboard />
    </div>
  )
}

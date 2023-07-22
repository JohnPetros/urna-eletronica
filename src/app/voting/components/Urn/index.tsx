import { Display } from './Display'
import { Keyboard } from './Keyboard'
import { getRoles } from '@/functions'

export async function Urn() {
  const roles = await getRoles()

  return (
    <div className="bg-zinc-300 w-[868px] grid grid-cols-[1fr_320px] gap-6 border border-zinc-100 p-8">
      <Display roles={roles} />
      <Keyboard />
    </div>
  )
}

import { getRoles } from '@/functions'
import { Parties } from './components/Parties'
import { Urn } from './components/Urn'

export default async function Voting() {
  const roles = await getRoles()

  return (
    <div className="flex flex-col h-[calc(100%-80px)]">
      <Parties roles={roles} />
      <div className="h-full flex items-center justify-center">
        <Urn />
      </div>
    </div>
  )
}

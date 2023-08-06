import { getRoles } from '@/functions'
import { Parties } from './components/Parties'
import { Urn } from './components/Urn'
import { Role } from '@/types/role'

export default async function Voting() {
  let roles: Role[] = []

  try {
    roles = await getRoles()
  } catch (error) {
    throw new Error('Error ao buscar cargos da API')
  }

  return (
    <div className="flex flex-col h-[calc(100%-80px)]">
      <Parties roles={roles} />
      <div className="h-full flex items-center justify-center">
        <Urn roles={roles} />
      </div>
    </div>
  )
}

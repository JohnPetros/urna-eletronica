import { getRoles } from '@/functions'
import { Parties } from './components/Parties'
import { Urn } from './components/Urn'
import type { Role } from '@/types/role'

export default async function Voting() {
  let roles: Role[] = []

  try {
    roles = await getRoles()
  } catch (error) {
    throw new Error('Error ao buscar dados da API')
  }

  return (
    <main>
      <Parties roles={roles} />
      <div className=" flex items-center justify-center">
        <Urn roles={roles} />
      </div>
    </main>
  )
}


import { Role } from '@/types/role'

export async function getRoles(): Promise<Role[]> {
  const response = await fetch('https://roles-api.vercel.app/roles')
  const roles = response.json()
  return roles
}

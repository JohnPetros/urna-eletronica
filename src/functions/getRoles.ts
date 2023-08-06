import { Role } from "@/types/role"

export async function getRoles(): Promise<Role[]> {
  const response = await fetch('http://localhost:3001/roles')
  const roles = response.json()
  return roles
}
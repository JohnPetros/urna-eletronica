export async function getRoles() {
  const response = await fetch('http://localhost:3004/roles')
  const roles = response.json()
  return roles
}
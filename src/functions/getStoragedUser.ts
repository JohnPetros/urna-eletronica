'use client'

import { User } from '@/types/user'

export function getStoragedUser() {
  const storagedUser = localStorage.getItem('urna-eletronica@user')
  return storagedUser ? (JSON.parse(storagedUser) as User) : null
}

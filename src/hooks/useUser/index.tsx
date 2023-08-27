'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import type { User } from '@/types/user'

interface UserContextValue {
  user: User | null
  hasUser: boolean
  registerUser: (user: User) => void
  removeUser: () => void
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextValue)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const hasUser = !!user

  function registerUser(user: User) {
    setUser(user)
    const userData = JSON.stringify(user)
    localStorage.setItem('urna-eletronica@user', userData)
  }

  function removeUser() {
    localStorage.removeItem('urna-eletronica@user')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, hasUser, registerUser, removeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

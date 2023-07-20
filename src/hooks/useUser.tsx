'use client'
import { User } from '@/types/user'
import { useState, createContext, useContext, ReactNode } from 'react'

interface UserContextValue {
  user: User | null
  hasUser: boolean
  registerUser: (user: User) => void
}

interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext({} as UserContextValue)

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const hasUser = !!user

  function registerUser(user: User) {
    setUser(user)
    const userData = JSON.stringify(user)
    localStorage.setItem('urna-eletronica@user', userData)
  }

  return (
    <UserContext.Provider value={{ user, hasUser, registerUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

import { ROLES } from '@/constants/roles'
import { ReactNode, createContext, useContext, useState } from 'react'

type Role = (typeof ROLES)[number]

interface RoleContextValue {
  activeRole: Role
  nextRole: () => void
}

interface RoleProviderProps {
  children: ReactNode
}

const RoleContext = createContext({} as RoleContextValue)

export function RoleProvider({ children }: RoleProviderProps) {
  const [activeRole, setActiveRole] = useState<Role>('DEPUTADO ESTADUAL')

  function nextRole() {
    const currentIndex = ROLES.findIndex((role) => role === activeRole)

    setActiveRole(ROLES[currentIndex + 1])
  }

  return (
    <RoleContext.Provider value={{ activeRole, nextRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)

  if (!context) {
    throw new Error('useRole must be used inside RoleProvider')
  }

  return context
}

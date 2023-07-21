import { ROLES } from '@/constants/roles'
import { ReactNode, createContext, useContext, useState } from 'react'

type RoleTitle = (typeof ROLES)[number]

interface RoleContextValue {
  activeRoleTitle: RoleTitle
  nextRole: () => void
}

interface RoleProviderProps {
  children: ReactNode
}

const RoleContext = createContext({} as RoleContextValue)

export function RoleProvider({ children }: RoleProviderProps) {
  const [activeRoleTitle, setActiveRoleTitle] = useState<RoleTitle>('DEPUTADO ESTADUAL')

  function nextRole() {
    const currentIndex = ROLES.findIndex((role) => role === activeRoleTitle)

    setActiveRoleTitle(ROLES[currentIndex + 1])
  }

  return (
    <RoleContext.Provider value={{ activeRoleTitle, nextRole }}>
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

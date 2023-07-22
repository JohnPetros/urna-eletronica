import { ROLES_TITLES } from '@/constants/roles-titles'
import { ReactNode, createContext, useContext, useState } from 'react'

type RoleTitle = (typeof ROLES_TITLES)[number]

interface UrnContextValue {
  activeRoleTitle: RoleTitle
  pressedNumbers: number[]
  handleKeyPress: (key: string) => void
  nextRole: () => void
}

interface RoleProviderProps {
  children: ReactNode
}

const UrnContext = createContext({} as UrnContextValue)

export function UrnProvider({ children }: RoleProviderProps) {
  const [activeRoleTitle, setActiveRoleTitle] =
    useState<RoleTitle>('DEPUTADO ESTADUAL')
  const [pressedNumbers, setPressedNumbers] = useState<number[]>([])

  function addNumber(newNumber: number) {
    setPressedNumbers((currentPressedNumbers) => [
      ...currentPressedNumbers,
      newNumber,
    ])
  }

  function removeLastNumber() {
    setPressedNumbers(pressedNumbers.slice(0, -1))
  }

  function handleKeyPress(key: string) {
    const isNumber = !!Number(key)

    if (isNumber || key === '0') {
      addNumber(Number(key))
      return
    }

    switch (key) {
      case 'branco':
      case 'corrige':
        removeLastNumber()
        break
      case 'confirma':
      default:
        return
    }
  }

  function nextRole() {
    const currentIndex = ROLES_TITLES.findIndex(
      (roleTitle) => roleTitle === activeRoleTitle
    )

    setActiveRoleTitle(ROLES_TITLES[currentIndex + 1])
  }

  return (
    <UrnContext.Provider
      value={{ activeRoleTitle, pressedNumbers, handleKeyPress, nextRole }}
    >
      {children}
    </UrnContext.Provider>
  )
}

export function useUrn() {
  const context = useContext(UrnContext)

  if (!context) {
    throw new Error('useRole must be used inside RoleProvider')
  }

  return context
}

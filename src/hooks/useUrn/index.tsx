import { ROLES_TITLES } from '@/constants/roles-titles'
import { Candidate } from '@/types/candidate'
import { ReactNode, createContext, useContext, useReducer } from 'react'

type RoleTitle = (typeof ROLES_TITLES)[number]

interface RoleProviderProps {
  children: ReactNode
}

type UrnState = {
  activeRoleTitle: RoleTitle
  choosenCandidate: Candidate | null
  pressedNumbers: number[]
  canPressKey: boolean
}

type UrnAction =
  | { type: 'pressKey'; payload: string }
  | { type: 'setCanPressKey'; payload: boolean }
  | { type: 'setChoosenCandidate'; payload: Candidate | null }

interface UrnContextValue {
  state: UrnState
  dispatch: (action: UrnAction) => void
}

const UrnContext = createContext({} as UrnContextValue)

const initialUrnState = {
  activeRoleTitle: 'DEPUTADO ESTADUAL',
  choosenCandidate: null,
  pressedNumbers: [],
  canPressKey: true,
}

function UrnReducer(state: UrnState, action: UrnAction): UrnState {
  function addNumber(newNumber: number) {
    return { pressedNumbers: [...state.pressedNumbers, newNumber] }
  }

  function removeLastNumber() {
    return { pressedNumbers: state.pressedNumbers.slice(0, -1) }
  }

  function removeAllNumbers() {
    return { pressedNumbers: [] }
  }

  function nextRole() {
    const currentIndex = ROLES_TITLES.findIndex(
      (roleTitle) => roleTitle === state.activeRoleTitle
    )

    return { activeRole: ROLES_TITLES[currentIndex + 1] }
  }

  function handleKeyPress(key: string) {
    const isNumber = !!Number(key)

    if (isNumber || key === '0') {
      return addNumber(Number(key))
    }

    switch (key) {
      case 'branco':
      case 'corrige':
        return state.canPressKey ? removeLastNumber() : removeAllNumbers()
      case 'confirma':
      default:
        return
    }
  }

  switch (action.type) {
    case 'pressKey':
      return { ...state, ...handleKeyPress(action.payload) }
    case 'setChoosenCandidate':
      return { ...state, choosenCandidate: action.payload }
    case 'setCanPressKey':
      return { ...state, canPressKey: action.payload }
    default:
      return state
  }
}

export function UrnProvider({ children }: RoleProviderProps) {
  const [state, dispatch] = useReducer(UrnReducer, initialUrnState)

  return (
    <UrnContext.Provider value={{ state, dispatch }}>
      {children}
    </UrnContext.Provider>
  )
}

export function useUrn() {
  const context = useContext(UrnContext)

  if (!context) {
    throw new Error('useRole must be used inside UrnProvider')
  }

  return context
}

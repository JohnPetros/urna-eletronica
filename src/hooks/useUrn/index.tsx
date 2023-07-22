import { ROLES_TITLES } from '@/constants/roles-titles'
import { Candidate } from '@/types/candidate'
import { ReactNode, createContext, useContext, useReducer, useRef } from 'react'
import { useModal } from '../useModal'

type RoleTitle = (typeof ROLES_TITLES)[number]

interface RoleProviderProps {
  children: ReactNode
}

type UrnState = {
  activeRoleTitle: RoleTitle
  choosenCandidate: Candidate | null
  pressedNumbers: number[]
  canPressKey: boolean
  isWhiteVote: boolean
  votedCandidates: Candidate[]
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
  activeRoleTitle: 'SENADOR',
  choosenCandidate: null,
  pressedNumbers: [],
  canPressKey: true,
  isWhiteVote: false,
  votedCandidates: [],
}

function UrnReducer(state: UrnState, action: UrnAction): UrnState {
  const { openModal } = useModal()

  function addNumber(newNumber: number) {
    return { pressedNumbers: [...state.pressedNumbers, newNumber] }
  }

  function removeLastNumber() {
    return { pressedNumbers: state.pressedNumbers.slice(0, -1) }
  }

  function removeAllNumbers() {
    return { pressedNumbers: [] }
  }

  function addVotedCandidate() {
    return {
      votedCandidates: [...state.votedCandidates, state.choosenCandidate],
    }
  }

  function nextRole() {
    const currentIndex = ROLES_TITLES.findIndex(
      (roleTitle) => roleTitle === state.activeRoleTitle
    )

    return {
      activeRoleTitle: ROLES_TITLES[currentIndex + 1],
      canPressKey: true,
      isWhiteVote: false,
      ...removeAllNumbers(),
    }
  }

  function handleKeyPress(key: string) {
    const isNumber = !!Number(key)

    if (isNumber || key === '0') {
      return addNumber(Number(key))
    }

    switch (key) {
      case 'branco':
        if (state.pressedNumbers.length || state.choosenCandidate) {
          openModal({
            type: 'error',
            title: 'Para votar em BRANCO, o campo de voto deve estar vazio.',
            text: 'Aperte CORRIGE para apagar o campo de voto.',
          })
          return {}
        }
        return { isWhiteVote: true, canPressKey: false }
      case 'corrige':
        return {
          isWhiteVote: false,
          ...(state.canPressKey ? removeLastNumber() : removeAllNumbers()),
        }

      case 'confirma':
        if (state.canPressKey) {
          openModal({
            type: 'error',
            title: 'Para votar, o campo de voto deve estar completo.',
            text: 'Insira o dígitos pressionando as teclas numéricas.',
          })
          return
        }

        return { ...addVotedCandidate(), ...nextRole() }
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

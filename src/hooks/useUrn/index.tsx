'use client'

import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useReducer,
} from 'react'
import { OpenModalParams, useModal } from '../useModal'

import { ROLES_TITLES } from '@/constants/roles-titles'
import { Candidate } from '@/types/candidate'

export type RoleTitle = (typeof ROLES_TITLES)[number]

interface RoleProviderProps {
  children: ReactNode
}

export type UrnState = {
  activeRoleTitle: RoleTitle
  choosenCandidate: Candidate | null
  pressedNumbers: number[]
  canPressKey: boolean
  isWhiteVote: boolean
  votedCandidates: (Candidate | null)[]
  isEnd: boolean
}

export type UrnAction =
  | {
      type: 'pressKey'
      payload: { keyValue: string; keyRef: RefObject<HTMLButtonElement> }
    }
  | { type: 'setCanPressKey'; payload: boolean }
  | { type: 'setChoosenCandidate'; payload: Candidate | null }
  | { type: 'resetState' }

interface UrnContextValue {
  state: UrnState
  dispatch: (action: UrnAction) => void
}

export const UrnContext = createContext({} as UrnContextValue)

const initialUrnState: UrnState = {
  activeRoleTitle: 'DEPUTADO FEDERAL',
  choosenCandidate:  null,
  pressedNumbers: [],
  canPressKey: true,
  isWhiteVote: false,
  votedCandidates: [],
  isEnd: false,
}

export function urnReducer(state: UrnState, action: UrnAction): UrnState {
  const { dispatch } = useModal()

  function openModal({ type, title, text }: OpenModalParams) {
    dispatch({ type: 'open', payload: { type, title, text } })
  }

  function closeModal() {
    dispatch({ type: 'close' })
  }

  function setModalCallback(keyRef: RefObject<HTMLButtonElement>) {
    dispatch({
      type: 'setCallback',
      payload: () => {
        closeModal()
        keyRef.current?.focus()
      },
    })
  }

  function addNumber(newNumber: number): Pick<UrnState, 'pressedNumbers'> {
    return { pressedNumbers: [...state.pressedNumbers, newNumber] }
  }

  function removeLastNumber(): Pick<UrnState, 'pressedNumbers'> {
    return { pressedNumbers: state.pressedNumbers.slice(0, -1) }
  }

  function removeAllNumbers(): Pick<UrnState, 'pressedNumbers'> {
    return { pressedNumbers: [] }
  }

  function resetPartialState(): Partial<UrnState> {
    return { ...removeAllNumbers(), canPressKey: true, choosenCandidate: null }
  }

  function addVotedCandidate(): Pick<UrnState, 'votedCandidates'> {
    return {
      votedCandidates: [...state.votedCandidates, state.choosenCandidate],
    }
  }

  function nextRole(): Partial<UrnState> {
    const currentIndex = ROLES_TITLES.findIndex(
      (roleTitle) => roleTitle === state.activeRoleTitle
    )

    if (currentIndex + 1 === ROLES_TITLES.length) {
      return {
        isEnd: true,
        canPressKey: false,
        isWhiteVote: false,
        choosenCandidate: null,
        ...removeAllNumbers(),
      }
    }

    return {
      activeRoleTitle: ROLES_TITLES[currentIndex + 1],
      canPressKey: true,
      isWhiteVote: false,
      choosenCandidate: null,
      ...removeAllNumbers(),
    }
  }

  function handleKeyPress(
    keyValue: string,
    keyRef: RefObject<HTMLButtonElement>
  ) {
    const isNumber = !!Number(keyValue)

    if (isNumber || keyValue === '0') {
      return addNumber(Number(keyValue))
    }

    switch (keyValue?.toLowerCase()) {
      case 'branco':
        if (state.pressedNumbers.length || state.choosenCandidate) {
          openModal({
            type: 'error',
            title: 'Para votar em BRANCO, o campo de voto deve estar vazio.',
            text: 'Aperte CORRIGE para apagar o campo de voto.',
          })

          setModalCallback(keyRef)
          return
        }
        return { isWhiteVote: true, canPressKey: false }
      case 'corrige':
        return {
          isWhiteVote: false,
          ...(state.canPressKey ? removeLastNumber() : resetPartialState()),
        }

      case 'confirma':
        if (state.canPressKey) {
          openModal({
            type: 'error',
            title: 'Para votar, o campo de voto deve estar completo.',
            text: 'Insira o dígitos pressionando as teclas numéricas.',
          })

          setModalCallback(keyRef)
          return
        }

        return { ...addVotedCandidate(), ...nextRole() }
      default:
        return
    }
  }

  switch (action.type) {
    case 'pressKey':
      return {
        ...state,
        ...handleKeyPress(action.payload.keyValue, action.payload.keyRef),
      }
    case 'setChoosenCandidate':
      return { ...state, choosenCandidate: action.payload }
    case 'setCanPressKey':
      return { ...state, canPressKey: action.payload }
    case 'resetState':
      return initialUrnState
    default:
      return state
  }
}

export function UrnProvider({ children }: RoleProviderProps) {
  const [state, dispatch] = useReducer(urnReducer, initialUrnState)

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

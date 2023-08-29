'use client'

import { createContext, ReactNode, useContext, useReducer } from 'react'
import { Modal, ModalType } from '@/app/components/Modal'

export type OpenModalParams = {
  type: ModalType
  title: string
  text: string
}

export type ModalState = {
  type: ModalType
  title: string
  text: string
  isOpen: boolean
  callback: VoidFunction
}

export type ModalAction =
  | {
      type: 'open'
      payload: OpenModalParams
    }
  | { type: 'close' }
  | { type: 'setCallback'; payload: VoidFunction }

interface ModalContextValue {
  state: ModalState
  dispatch: (action: ModalAction) => void
}

export const initialModalState: ModalState = {
  type: 'error',
  title: '',
  text: '',
  isOpen: false,
  callback: () => {},
}

export const ModalContext = createContext({} as ModalContextValue)
interface ModalProviderProps {
  children: ReactNode
}

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        type: action.payload.type,
        title: action.payload.title,
        text: action.payload.text,
        isOpen: true,
      }
    case 'close':
      return {
        ...state,
        type: 'error',
        title: '',
        text: '',
        isOpen: false,
      }
    case 'setCallback':
      return {
        ...state,
        callback: action.payload,
      }
    default:
      return state
  }
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = useReducer(modalReducer, initialModalState)

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      <Modal
        isOpen={state.isOpen}
        type={state.type}
        title={state.title}
        text={state.text}
        onClick={state.callback}
        onClose={() => {
          state.callback()
          dispatch({ type: 'close' })
        }}
      />
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

'use client'
import { useState, useRef, createContext, ReactNode, useContext } from 'react'
import { Modal, ModalRef, ModalProps, ModalType } from '@/app/components/Modal'

interface ModalContextValue {
  openModal: ({ type, title, text }: ModalProps) => void
}

export const ModalContext = createContext({} as ModalContextValue)
interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [type, setType] = useState<ModalType>('error')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const modalRef = useRef<ModalRef>(null)

  function openModal({ type, title, text }: ModalProps) {
    setType(type)
    setTitle(title)
    setText(text)

    modalRef.current?.open()
  }

  const value: ModalContextValue = {
    openModal,
  }

  return (
    <ModalContext.Provider value={value}>
      <Modal ref={modalRef} type={type} title={title} text={text} />
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}

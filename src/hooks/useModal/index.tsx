'use client'
import { useState, useRef, createContext, ReactNode, useContext } from 'react'
import { Modal, ModalComponent, ModalProps, Type } from '@/app/components/Modal'


interface ModalProviderProps {
  children: ReactNode
}

interface ModalValue {
  openModal: ({ type, title, text }: ModalProps) => void
}

const ModalContext = createContext({} as ModalValue)

export function ModalProvider({ children }: ModalProviderProps) {
  const [type, setType] = useState<Type>('error')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const modalRef = useRef<ModalComponent>(null)

  function openModal({ type, title, text }: ModalProps) {
    setType(type)
    setTitle(title)
    setText(text)

    modalRef.current?.open()
  }

  const value = {
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

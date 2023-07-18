'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalProps {
  title: string
  text: string
  type: string
}

export interface ModalComponent {
  openModal: VoidFunction
  closeModal: VoidFunction
}

export function ModalComponent({ title, text, type }: ModalProps, ref: any) {
  const [isOpen, setisOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    }
  })

  function openModal() {
    setisOpen(true)
  }

  function closeModal() {
    setisOpen(false)
  }

  function handleButtonClick() {
    setisOpen(false)
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-sm flex flex-col gap-6 items-center">
          <div>
            <strong className="block text-2xl text-center text-zinc-900">
              {title}
            </strong>
            <small className="block text-center text-lg mt-4">{text}</small>
          </div>

          <Dialog.Close asChild>
            <button
              className="bg-blue-600 text-zinc-100 text-lg text-center outline-4 outline-blue-300 py-2 px-6 rounded"
              aria-label="Fechar modal"
              onClick={handleButtonClick}
            >
              Ok
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const Modal = forwardRef(ModalComponent)

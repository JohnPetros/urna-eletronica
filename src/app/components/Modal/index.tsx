'use client'
import * as Dialog from '@radix-ui/react-dialog'
import Lottie from 'lottie-react'

import Warning from '../../../../public/animations/warning.json'
import Error from '../../../../public/animations/error.json'
import Success from '../../../../public/animations/success.json'

import { AnimatePresence, Variants, motion } from 'framer-motion'

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.2,
    },
  },
}

type Animation = {
  [key: string]: unknown
}

const animations: Animation = {
  warning: Warning,
  error: Error,
  success: Success,
}

export type ModalType = 'error' | 'warning' | 'success'

export interface ModalProps {
  isOpen: boolean
  type: ModalType
  title: string
  text: string
  onClick: VoidFunction
  onClose: VoidFunction
}

export function Modal({
  isOpen,
  title,
  text,
  type,
  onClick,
  onClose,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content
          data-testid={type}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px]"
        >
          <AnimatePresence>
            <motion.div
              role="alertdialog"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className=" bg-white p-8 rounded shadow-sm flex flex-col gap-6 items-center w-full"
            >
              <Lottie
                autoplay
                animationData={animations[type]}
                loop={false}
                style={{ width: 80, height: 80 }}
              />
              <div>
                <Dialog.Title className="block text-xl text-center text-zinc-900">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="block text-center text-lg mt-4">
                  {text}
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  className="bg-blue-600 text-zinc-100 text-lg text-center outline-4  outline-offset-4 outline-blue-400  py-2 px-6 rounded"
                  aria-label="Fechar modal"
                  onClick={onClick}
                >
                  Ok
                </button>
              </Dialog.Close>
            </motion.div>
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

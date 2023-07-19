'use client'
import { forwardRef, useImperativeHandle, useState } from 'react'
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

export interface ModalProps {
  title: string
  text: string
  type: string
}

export interface ModalComponent {
  open: VoidFunction
  close: VoidFunction
}

export function ModalComponent({ title, text, type }: ModalProps, ref: any) {
  const [isOpen, setisOpen] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
    }
  })

  function open() {
    setisOpen(true)
  }

  function close() {
    setisOpen(false)
  }

  function handleButtonClick() {
    setisOpen(false)
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content
          asChild
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <AnimatePresence>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className=" bg-white py-8 px-12 rounded shadow-sm flex flex-col gap-6 items-center max-w-[90%]"
            >
              <Lottie
                autoplay
                animationData={animations[type]}
                loop={false}
                style={{ width: 100, height: 100 }}
              />
              <div>
                <strong className="block text-2xl text-center text-zinc-900">
                  {title}
                </strong>
                <small className="block text-center text-lg mt-4">{text}</small>
              </div>

              <Dialog.Close asChild>
                <button
                  className="bg-blue-600 text-zinc-100 text-lg text-center outline-4  outline-offset-4 outline-blue-400  py-2 px-6 rounded"
                  aria-label="Fechar modal"
                  onClick={handleButtonClick}
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

export const Modal = forwardRef(ModalComponent)

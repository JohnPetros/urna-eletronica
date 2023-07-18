'use client'
import { FormEvent, useRef } from 'react'
import { Input } from './Input'
import { Modal, ModalComponent } from '../Modal'

export function Form() {
  const modalRef = useRef<ModalComponent>(null)

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault()
    modalRef.current?.openModal()
  }

  return (
    <form className="max-w-sm mx-auto border-2 border-blue-900">
      <fieldset>
        <legend className="bg-blue-900 text-zinc-100 p-4 text-xl text-center">
          Antes de votar, insira nome e data de nascimento, por favor.
        </legend>
        <div className="space-y-4 p-6">
          <Input id="name" type="text" label="Nome" hasFocus />
          <Input id="birthdate" type="date" label="Data de nascimento" />
        </div>
      </fieldset>
      <footer className="px-6 pb-6">
        <button
          className="bg-blue-900 text-zinc-100 text-lg w-full py-2 hover:bg-blue-800 transition-colors"
          type="submit"
          onClick={handleFormSubmit}
        >
          Enviar
        </button>

        <Modal
          ref={modalRef}
          title="Você tem 16 anos e seu voto é opcional"
          text="clique em confirmar se quiser realmente votar"
          type="warning"
        />
      </footer>
    </form>
  )
}

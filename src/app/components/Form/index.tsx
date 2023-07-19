'use client'
import { FormEvent, useState } from 'react'
import { Input } from './Input'
import { useModal } from '@/hooks/useModal'

export function Form() {
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const { openModal } = useModal()

  function handleAge(age: number) {
    if (age < 16) {
      openModal({
        type: 'error',
        title: `Opps! Você tem ${age} anos e só poderá votar daqui a ${
          age - 16
        } anos`,
        text: 'Até a próxima 👋🏻',
      })
    } else if (age < 18 || age >= 70) {
      openModal({
        type: 'waning',
        title: `Você tem ${age} anos e seu voto é opcional`,
        text: 'Clique em confirmar se quiser realmente votar',
      })
    } else {
      openModal({
        type: 'success',
        title: `Você tem ${age} anos e está apto a votar`,
        text: 'Clique em ok',
      })
    }
  }

  function getAge() {
    const currentDate = new Date()
    const diff = currentDate.getTime() - new Date(birthdate).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault()

    const age = getAge()
    handleAge(age)
  }

  return (
    <form className="max-w-sm mx-auto border-2 border-blue-900 rounded">
      <fieldset>
        <legend className="bg-blue-900 text-zinc-100 p-4 text-xl text-center">
          Antes de votar, insira nome e data de nascimento, por favor.
        </legend>
        <div className="space-y-4 px-6 pt-4 pb-6">
          <Input
            id="name"
            type="text"
            label="Nome"
            hasFocus
            value={name}
            onChange={setName}
          />
          <Input
            id="birthdate"
            type="date"
            label="Data de nascimento"
            value={birthdate}
            onChange={setBirthdate}
          />
        </div>
      </fieldset>
      <footer className="px-6 pb-6">
        <button
          className="bg-blue-900 text-zinc-100 text-lg w-full py-2 hover:bg-blue-800 transition-colors rounded"
          type="submit"
          onClick={handleFormSubmit}
        >
          Enviar
        </button>
      </footer>
    </form>
  )
}

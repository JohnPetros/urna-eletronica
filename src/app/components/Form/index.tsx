'use client'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '@/hooks/useUser'
import { useRouter } from 'next/navigation'
import { OpenModalParams, useModal } from '@/hooks/useModal'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from './Input'

const formSchema = z.object({
  name: z
    .string()
    .nonempty('Seu nome não pode estar vazio!')
    .min(3, 'Por favor, informe um nome válido!'),
  birthdate: z.coerce
    .date({
      errorMap: () => {
        return { message: 'Data inválida!' }
      },
    })
    .min(new Date('1900-01-01'), 'Data inválida!')
    .max(new Date()),
})

export type FormFields = z.infer<typeof formSchema>

export function Form() {
  const { registerUser, hasUser } = useUser()
  const { state, dispatch } = useModal()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()

  const buttonRef = useRef<HTMLButtonElement>(null)

  function setModalCallback(callback: VoidFunction) {
    dispatch({ type: 'setCallback', payload: callback })
  }

  function openModal({ type, title, text }: OpenModalParams) {
    dispatch({ type: 'open', payload: { type, title, text } })
  }

  function handleAge(age: number) {
    if (age < 16) {
      openModal({
        type: 'error',
        title: `Opps! Você tem ${age} anos e só poderá votar daqui a ${
          16 - age
        } anos.`,
        text: 'Até a próxima 👋🏻',
      })
      return false
    } else if (age < 18 || age >= 70) {
      openModal({
        type: 'warning',
        title: `Você tem ${age} anos e seu voto é opcional.`,
        text: 'Clique em confirmar se quiser realmente votar',
      })
      return false
    } else {
      openModal({
        type: 'success',
        title: `Você tem ${age} anos e está apto a votar.`,
        text: 'Clique em ok',
      })
      return true
    }
  }

  function getAge(birthdate: Date) {
    const currentDate = new Date()
    const diff = currentDate.getTime() - new Date(birthdate).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  }

  function handleUserData(data: FormFields) {
    const age = getAge(data.birthdate)
    const isValidUser = handleAge(age)

    if (isValidUser) {
      registerUser({ name: data.name })
    }

    setModalCallback(() => {
      if (isValidUser) {
        router.push('/voting')
      }

      dispatch({ type: 'close' })
    })
  }

  useEffect(() => {
    const formValues = getValues(['name', 'birthdate'])

    if (
      buttonRef.current &&
      !state.isOpen &&
      formValues.every((value) => !!value)
    ) {
      buttonRef.current?.focus()
      buttonRef.current.disabled = false
    } else if (buttonRef.current && hasUser) {
      buttonRef.current.disabled = true
    }
  }, [state.isOpen])

  return (
    <form
      className="max-w-sm mx-auto border-2 border-blue-900 rounded"
      onSubmit={handleSubmit(handleUserData)}
    >
      <fieldset>
        <legend className="bg-blue-900 text-zinc-100 p-4 text-xl text-center">
          Antes de votar, insira nome e data de nascimento, por favor.
        </legend>
        <div className="space-y-4 px-6 pt-4 pb-6">
          <Input
            label="Nome"
            type="text"
            autoFocus
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Data de nascimento"
            type="date"
            {...register('birthdate')}
            error={errors.birthdate?.message}
          />
        </div>
      </fieldset>
      <footer className="px-6 pb-6">
        <button
          ref={buttonRef}
          aria-label="submit"
          className="bg-blue-900 text-zinc-100 text-lg w-full py-2 hover:bg-blue-800 transition-colors rounded"
          type="submit"
        >
          Enviar
        </button>
      </footer>
    </form>
  )
}

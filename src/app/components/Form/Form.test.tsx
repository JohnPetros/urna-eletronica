import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mocked } from 'jest-mock'
import { Form } from '.'
import { ReactNode, useRef } from 'react'
import { ModalProvider, ModalContext, useModal } from '../../../hooks/useModal'
import { ModalProps } from '../Modal'

function renderForm() {
  const mockedOpenModal = jest.fn()

  render(
    <ModalContext.Provider value={{ openModal: mockedOpenModal }}>
      <Form />
    </ModalContext.Provider>
  )

  return { mockedOpenModal }
}

describe('Form component', () => {
  it('should render correctly', () => {
    renderForm()

    const inputName = screen.getByLabelText('Nome')
    const inputBirthdate = screen.getByLabelText('Data de nascimento')
    const button = screen.getByRole('button')

    expect(true).toBe(true)

    expect(inputName).toBeVisible()
    expect(inputBirthdate).toBeVisible()
    expect(button).toBeVisible()
  })

  it('should render error message on empty fields', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Seu nome não pode estar vazio!')).toBeVisible()
      expect(screen.getByText('Data inválida!')).toBeVisible()
    })
  })

  it('should render error message on name field with less than 3 characters', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputName = screen.getByLabelText(/nome/i)

    userEvent.type(inputName, 'jo')

    userEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Por favor, informe um nome válido!')
      ).toBeVisible()
    })
  })

  it('should render error message on birthdate field whose value is under the min valid date (1900-01-01)', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: '1500-05-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })

  it('should render error message on birthdate field whose value is over the max valid date (today)', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: '2100-12-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })


})

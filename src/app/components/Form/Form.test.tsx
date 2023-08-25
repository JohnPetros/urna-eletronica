import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Form } from '.'
import {
  ModalContext,
  ModalState,
  initialModalState,
} from '../../../hooks/useModal'
import { UserContext } from '@/hooks/useUser'
import { getCurrentDate } from '@/functions'

jest.mock('next/navigation', () => {
  return {
    useRouter() {
      return {
        push: jest.fn(),
      }
    },
  }
})

const mockedRegisterUser = jest.fn()
const mockedDispatch = jest.fn()

function renderForm() {
  render(
    <UserContext.Provider value={{ registerUser: mockedRegisterUser } as any}>
      <ModalContext.Provider
        value={{ state: initialModalState, dispatch: mockedDispatch }}
      >
        {/* <Modal type="error" title="mocked title" text="mocked text" /> */}
        <Form />
      </ModalContext.Provider>
    </UserContext.Provider>
  )
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

  it('should render error message when fields are empty', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Seu nome não pode estar vazio!')).toBeVisible()
      expect(screen.getByText('Data inválida!')).toBeVisible()
    })
  })

  it('should render error message when name field has less than 3 characters', async () => {
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

  it('should render error message when birthdate field whose value is under the min valid date (1900-01-01)', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: '1500-05-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })

  it('should render error message when birthdate field whose value is over the max valid date (today)', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: getCurrentDate(30) } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })

  it('should not render any error message', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputName = screen.getByLabelText(/nome/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    await userEvent.type(inputName, 'joão pedro')
    fireEvent.change(inputDate, { target: { value: '2000-12-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(
        screen.queryByText(/por favor, informe um nome válido!/i)
      ).not.toBeInTheDocument()
      expect(screen.queryByText(/data inválida!/i)).not.toBeInTheDocument()
    })
  })

  it('should call openModal with type equals to error and not call registerUser', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)
    const inputName = screen.getByLabelText(/nome/i)

    await userEvent.type(inputName, 'joão')
    fireEvent.change(inputDate, { target: { value: getCurrentDate() } })

    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled()
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'open',
        payload: {
          text: 'Até a próxima 👋🏻',
          title: 'Opps! Você tem 0 anos e só poderá votar daqui a 16 anos.',
          type: 'error',
        },
      })

      expect(mockedRegisterUser).not.toHaveBeenCalled()
    })
  })

  it('should call openModal with type equals to warning and not registerUser', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)
    const inputName = screen.getByLabelText(/nome/i)

    const days = 365 * 16 // 16 years

    await userEvent.type(inputName, 'joão')
    fireEvent.change(inputDate, {
      target: { value: getCurrentDate(-days) },
    })

    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled()
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'open',
        payload: {
          type: 'warning',
          title: `Você tem 16 anos e seu voto é opcional.`,
          text: 'Clique em confirmar se quiser realmente votar',
        },
      })

      expect(mockedRegisterUser).not.toHaveBeenCalled()
    })
  })

  it('should call openModal with type equals to success and call registerUser with user name', async () => {
    renderForm()

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)
    const inputName = screen.getByLabelText(/nome/i)

    const userName = 'joão'
    await userEvent.type(inputName, userName)
    fireEvent.change(inputDate, { target: { value: '2002-01-01' } })

    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith({
        type: 'open',
        payload: {
          type: 'success',
          title: `Você tem 21 anos e está apto a votar.`,
          text: 'Clique em ok',
        },
      })

      expect(mockedRegisterUser).toHaveBeenCalled()
      expect(mockedRegisterUser).toHaveBeenCalledWith({ name: userName })
    })
  })
})

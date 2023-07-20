import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '.'

const openModal = jest.fn()

describe('Form component', () => {
  it('should render correctly', () => {
    render(<Form />)

    const inputName = screen.getByLabelText(/nome/i)
    const inputBirthdate = screen.getByLabelText(/data de nascimento/i)
    const button = screen.getByRole('button')

    expect(inputName).toBeVisible()
    expect(inputBirthdate).toBeVisible()
    expect(button).toBeVisible()
  })

  it('should render error message on empty fields', async () => {
    render(<Form />)

    const button = screen.getByText(/enviar/i)

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Seu nome não pode estar vazio!')).toBeVisible()
      expect(screen.getByText('Data inválida!')).toBeVisible()
    })
  })

  it('should render error message on name field with less than 3 characters', async () => {
    render(<Form />)

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

  it('should render error message on birthdate field whose value under the min valid date (1900-01-01)', async () => {
    render(<Form />)

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: '1500-05-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })

  it('should render error message on birthdate field whose value over the max valid date (today)', async () => {
    render(<Form />)

    const button = screen.getByText(/enviar/i)
    const inputDate = screen.getByLabelText(/data de nascimento/i)

    fireEvent.change(inputDate, { target: { value: '2100-12-12' } })

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/data inválida!/i)).toBeVisible()
    })
  })

  // it('should render error modal', async () => {
  //   render(<Form />)

  //   const button = screen.getByText(/enviar/i)
  //   const inputDate = screen.getByLabelText(/data de nascimento/i)
  //   const inputName = screen.getByLabelText(/nome/i)

  //   userEvent.type(inputName, 'joao pedro')
  //   fireEvent.change(inputDate, { target: { value: '2020-01-01' } })

  //   userEvent.click(button)

  //   await waitFor(() => {
  //     expect(openModal).toHaveBeenCalledTimes(1)
  //     expect(openModal).toHaveBeenCalledWith(
  //       {
  //         type: 'error',
  //       },
  //       expect.anything()
  //     )
  //   })
  // })
})

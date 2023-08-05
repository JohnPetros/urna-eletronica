import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalRef } from '.'
import { RefObject, createRef } from 'react'

jest.mock('next/navigation', () => {
  return {
    useRouter() {
      return {
        router: { push: jest.fn() },
      }
    },
  }
})

const renderModal = () => {
  const modalRef = createRef<ModalRef>()

  render(
    <Modal
      ref={modalRef}
      type="success"
      title="Mocked title"
      text="Mocked text"
    />
  )

  return { modalRef }
}

describe('Modal component', () => {
  it('should open', async () => {
    const { modalRef } = renderModal()

    act(() => {
      modalRef.current?.open()
    })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeVisible()
      expect(screen.queryByText('Mocked title')).toBeVisible()
      expect(screen.queryByText('Mocked text')).toBeVisible()
    })
  })

  it('should close', async () => {
    const { modalRef } = renderModal()

    act(() => {
      modalRef.current?.open()
    })

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(screen.queryByText('Mocked title')).not.toBeInTheDocument()
      expect(screen.queryByText('Mocked text')).not.toBeInTheDocument()
    })
  })
})

import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalRef, ModalType } from '.'
import { createRef } from 'react'
import { UserContext } from '@/hooks/useUser'

const mockedPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return { push: mockedPush }
  },
}))

interface RenderModalParams {
  type: ModalType
  hasUser?: boolean
}

const renderModal = ({
  type = 'success',
  hasUser = false,
}: RenderModalParams) => {
  const modalRef = createRef<ModalRef>()

  render(
    <UserContext.Provider value={{ hasUser } as any}>
      <Modal
        ref={modalRef}
        type={type}
        title="Mocked title"
        text="Mocked text"
      />
    </UserContext.Provider>
  )

  return { modalRef }
}

describe('Modal component', () => {
  it('should open', async () => {
    const { modalRef } = renderModal({ type: 'success' })

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
    const { modalRef } = renderModal({ type: 'success' })

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

  it('should not redirect user to voting page when modal type is not success and has user', async () => {
    const { modalRef } = renderModal({ type: 'error', hasUser: true })

    act(() => {
      modalRef.current?.open()
    })

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedPush).not.toHaveBeenCalled()
    })
  })

  it('should not redirect user to voting page when modal type is success and has no user', async () => {
    const { modalRef } = renderModal({ type: 'error', hasUser: false })

    act(() => {
      modalRef.current?.open()
    })

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedPush).not.toHaveBeenCalled()
    })
  })

  it('should redirect user to voting page when modal type is success and has user', async () => {
    const { modalRef } = renderModal({ type: 'success', hasUser: true })

    act(() => {
      modalRef.current?.open()
    })

    const button = screen.getByRole('button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalled()
      expect(mockedPush).toHaveBeenCalledWith('/voting')
    })
  })
})

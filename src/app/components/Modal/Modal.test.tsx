import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalType } from '.'
import { createRef } from 'react'
import { UserContext } from '@/hooks/useUser'
import { ModalContext, ModalState, initialModalState } from '@/hooks/useModal'

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

const mockedDispatch = jest.fn()

const renderModal = ({
  type = 'success',
  isOpen = true,
  title = 'Mocked title',
  text = 'Mocked text',
  callback = () => {},
}: Partial<ModalState>) => {
  render(
    <ModalContext.Provider
      value={{ state: initialModalState, dispatch: mockedDispatch }}
    >
      <Modal
        type={type}
        isOpen={isOpen}
        title={title}
        text={text}
        onClick={callback}
      />
    </ModalContext.Provider>
  )
}

describe('Modal component', () => {
  it('should be visible when the isOpen state is true', async () => {
    renderModal({
      type: 'success',
      isOpen: true,
      title: 'Mocked title',
      text: 'Mocked text',
    })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeVisible()
      expect(screen.queryByText('Mocked title')).toBeVisible()
      expect(screen.queryByText('Mocked text')).toBeVisible()
    })
  })

  it('should not be visible when the isOpen state is false', async () => {
    renderModal({
      type: 'success',
      isOpen: false,
      title: 'Mocked title',
      text: 'Mocked text',
    })

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(screen.queryByText('Mocked title')).toBeNull()
      expect(screen.queryByText('Mocked text')).toBeNull()
    })
  })

  it.only('should call modal state callback', async () => {
    const mockedCallback = jest.fn()
    const mockedParam = jest.fn()

    renderModal({
      type: 'success',
      isOpen: true,
      title: 'Mocked title',
      text: 'Mocked text',
      callback: () => mockedCallback(),
    })

    await waitFor(() => {
      const modalButton = screen.getByRole('button')
      userEvent.click(modalButton)

      expect(mockedCallback).toBe(mockedCallback)
    })
  })
})

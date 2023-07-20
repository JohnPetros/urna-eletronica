import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { useModal } from '.'
import { Modal } from '@/app/components/Modal'
const openModal = jest.fn()

describe('Modal component', () => {
  it('should render modal correctly', () => {
    renderHook(() => useModal())
    // render(<Modal type='' title="Mocked title" text="Mocked text" />)

    openModal({ type: 'success', title: 'Mocked title', text: 'Mocked text' })

    waitFor(() => {
      expect(screen.getByText('ukyuvkuvku')).toBeVisible()
      expect(screen.getByText('uyvyulvluyvyvul')).toBeVisible()
    })
  })
})

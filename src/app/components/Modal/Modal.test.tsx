import { render, screen, waitFor } from '@testing-library/react'
import { Modal } from '.'

jest.mock('next/navigation', () => {
  return {
    useRouter() {
      return {
        router: { push: jest.fn() },
      }
    },
  }
})

describe('Modal component', () => {
  it('should render correctly', async () => {
    render(<Modal type="success" title="Mocked title" text="Mocked text" />)

    await waitFor(() => {
      screen.getByText('Mocked title')
      screen.getByText('Mocked text')
    })
  })
})

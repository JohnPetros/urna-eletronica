import { render, screen, waitFor } from '@testing-library/react'
import { Modal } from '.'

describe('Modal component', () => {
  it('should render correctly', () => {
    render(<Modal type="success" title="Mocked title" text="Mocked text" />)

    waitFor(() => {
      screen.getByText('Mocked title')
    })
  })
})

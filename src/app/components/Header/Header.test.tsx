import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />)

    screen.getByText('Eleições 2022')
  })
})

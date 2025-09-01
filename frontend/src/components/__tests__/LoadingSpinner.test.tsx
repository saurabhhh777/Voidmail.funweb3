import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading text', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with correct styling classes', () => {
    render(<LoadingSpinner />)
    const container = screen.getByText('Loading...').closest('div')?.parentElement
    expect(container).toHaveClass('min-h-screen', 'bg-background', 'text-white')
  })

  it('has animated spinner element', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })
}) 
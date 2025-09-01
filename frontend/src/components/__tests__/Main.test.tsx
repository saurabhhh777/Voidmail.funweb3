import { render, screen, fireEvent } from '@testing-library/react'
import Main from '../Main'

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}))

describe('Main', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    })
  })

  it('renders the main component', () => {
    render(<Main />)
    expect(screen.getByText('Your Disposable Email')).toBeInTheDocument()
  })

  it('displays the default email address', () => {
    render(<Main />)
    expect(screen.getByText('demo@voidmail.fun')).toBeInTheDocument()
  })

  it('shows the premium banner by default', () => {
    render(<Main />)
    expect(screen.getByText('Upgrade to Premium')).toBeInTheDocument()
    expect(screen.getByText('Get custom email addresses and NFT ownership')).toBeInTheDocument()
  })

  it('hides premium banner when close button is clicked', () => {
    render(<Main />)
    const closeButton = screen.getByLabelText('Close premium banner')
    fireEvent.click(closeButton)
    expect(screen.queryByText('Upgrade to Premium')).not.toBeInTheDocument()
  })

  it('displays auto-refresh countdown', () => {
    render(<Main />)
    expect(screen.getByText(/Auto-refresh in/)).toBeInTheDocument()
  })

  it('shows refresh button', () => {
    render(<Main />)
    expect(screen.getByLabelText('Refresh inbox')).toBeInTheDocument()
  })

  it('shows copy button', () => {
    render(<Main />)
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })

  it('displays inbox section', () => {
    render(<Main />)
    expect(screen.getByText('Inbox')).toBeInTheDocument()
  })

  it('shows email count when inbox is empty', () => {
    render(<Main />)
    expect(screen.getByText('0 emails')).toBeInTheDocument()
  })

  it('displays empty inbox message', () => {
    render(<Main />)
    expect(screen.getByText('No emails yet')).toBeInTheDocument()
    expect(screen.getByText('Share your email address to receive emails here')).toBeInTheDocument()
  })

  it('shows email details section', () => {
    render(<Main />)
    expect(screen.getByText('Email Details')).toBeInTheDocument()
  })

  it('displays email details placeholder when no email is selected', () => {
    render(<Main />)
    expect(screen.getByText('Select an email to view details')).toBeInTheDocument()
  })

  it('renders CTA section and footer', () => {
    render(<Main />)
    expect(screen.getByText(/Ready to Secure Your/)).toBeInTheDocument()
    expect(screen.getByText(/© 2024 Voidmail/)).toBeInTheDocument()
  })

  it('renders navbar', () => {
    render(<Main />)
    const voidmailElements = screen.getAllByText('Voidmail')
    expect(voidmailElements.length).toBeGreaterThan(0)
  })
}) 
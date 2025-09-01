import { render, screen } from '@testing-library/react'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    expect(screen.getByText(/Start your/)).toBeInTheDocument()
    expect(screen.getByText(/free trial today/)).toBeInTheDocument()
  })

  it('renders the VOIDMAIL brand text', () => {
    render(<HomePage />)
    expect(screen.getByText('VOIDMAIL')).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(<HomePage />)
    expect(screen.getByText(/Unlock the full potential of private communication/)).toBeInTheDocument()
  })

  it('renders the hero Get Started button', () => {
    render(<HomePage />)
    const buttons = screen.getAllByText('Get Started')
    const heroButton = buttons.find(button => 
      button.closest('button')?.className.includes('px-8 py-4')
    )
    expect(heroButton).toBeInTheDocument()
  })

  it('renders the hero Premium Features button', () => {
    render(<HomePage />)
    const buttons = screen.getAllByText('Premium Features')
    const heroButton = buttons.find(button => 
      button.closest('button')?.className.includes('px-8 py-4')
    )
    expect(heroButton).toBeInTheDocument()
  })

  it('renders the Premium Features section', () => {
    render(<HomePage />)
    expect(screen.getByText(/Custom Email Addresses with/)).toBeInTheDocument()
    expect(screen.getByText(/NFT Ownership/)).toBeInTheDocument()
  })

  it('renders the three premium feature cards', () => {
    render(<HomePage />)
    expect(screen.getByText('Custom Domains')).toBeInTheDocument()
    expect(screen.getByText('NFT Certificate')).toBeInTheDocument()
    expect(screen.getByText('Secure Payment')).toBeInTheDocument()
  })

  it('renders the stats section', () => {
    render(<HomePage />)
    expect(screen.getByText('50K+')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
    expect(screen.getByText('24h')).toBeInTheDocument()
  })

  it('renders the Get Premium Access button', () => {
    render(<HomePage />)
    expect(screen.getByText('Get Premium Access')).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    render(<HomePage />)
    expect(screen.getByText(/Ready to Secure Your/)).toBeInTheDocument()
    expect(screen.getByText(/Digital Privacy/)).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<HomePage />)
    expect(screen.getByText(/© 2024 Voidmail/)).toBeInTheDocument()
  })

  it('renders the navbar with navigation links', () => {
    render(<HomePage />)
    const aboutLinks = screen.getAllByText('About')
    const featuresLinks = screen.getAllByText('Features')
    const pricingLinks = screen.getAllByText('Pricing')
    const contactLinks = screen.getAllByText('Contact')
    
    expect(aboutLinks.length).toBeGreaterThan(0)
    expect(featuresLinks.length).toBeGreaterThan(0)
    expect(pricingLinks.length).toBeGreaterThan(0)
    expect(contactLinks.length).toBeGreaterThan(0)
  })
}) 
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Wallet, LogOut } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWeb3Store } from '../../store/web3Store'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { connected, publicKey } = useWallet()
  const { balance, isConnected, disconnectWallet } = useWeb3Store()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('nav')) setIsMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const handleLinkClick = () => setIsMenuOpen(false)

  const handleDisconnect = async () => {
    try {
      await disconnectWallet()
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  const formatAddress = (address: string) => `${address.slice(0, 4)}...${address.slice(-4)}`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-sm backdrop-blur' : 'bg-white/80 backdrop-blur'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" onClick={handleLinkClick} className="inline-flex items-center">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                VoidMail.fun
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <Link href="/" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Wallet / Mobile Toggle */}
          <div className="justify-self-end flex items-center gap-3">
            <div className="hidden md:block">
              {connected && isConnected ? (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                    <span className="text-xs text-gray-500">Balance:</span>
                    <span className="text-sm font-mono text-gray-900 ml-2">{balance.toFixed(3)} SOL</span>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-mono text-gray-900">{formatAddress(publicKey?.toString() || '')}</span>
                  </div>
                  <Button onClick={handleDisconnect} variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <WalletMultiButton className="!bg-purple-600 !text-white !rounded-md !h-10 !px-4 hover:!bg-purple-700 !transition-colors" />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b md:hidden">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link href="/" onClick={handleLinkClick} className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
            <Link href="/about" onClick={handleLinkClick} className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
            <Link href="/contact" onClick={handleLinkClick} className="text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
            <div className="border-t pt-4">
              {connected && isConnected ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                    <span className="text-xs text-gray-500">Balance:</span>
                    <span className="text-sm font-mono text-gray-900 ml-2">{balance.toFixed(3)} SOL</span>
                  </div>
                  <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-mono text-gray-900">{formatAddress(publicKey?.toString() || '')}</span>
                  </div>
                  <Button onClick={handleDisconnect} variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-100">
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <WalletMultiButton className="!w-full !bg-purple-600 !text-white !rounded-md !h-10 hover:!bg-purple-700 !transition-colors" />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 
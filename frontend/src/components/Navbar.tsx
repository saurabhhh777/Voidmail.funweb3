'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Close mobile menu on route change
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const handlePremiumClick = () => {
    console.log("Premium button clicked")
    router.push("/premium")
    setIsMenuOpen(false)
  }

  return (
    <nav className={`backdrop-blur-lg bg-[#151517] sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-[#ffffff08] rounded-2xl ml-2 mr-2 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      {/* Logo */}
      <Link href="/" onClick={handleLinkClick}>
        <div className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
          VOIDMAIL
        </div>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <div className="space-x-8 text-sm font-medium uppercase tracking-wider">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
            { name: "Privacy Policy", path: "/privacy" }
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-[#10B981] transition-all duration-300"
              onClick={handleLinkClick}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <button
            onClick={handlePremiumClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            <Crown className="h-4 w-4" />
            Premium
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#ffffff08] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <div className="relative w-6 h-6">
          <span className={`absolute inset-0 transform transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
          }`}>
            <X className={`w-6 h-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
          </span>
          <span className={`absolute inset-0 transform transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}>
            <Menu className="w-6 h-6" />
          </span>
        </div>
      </button>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-[#151517] border-t border-[#ffffff08] rounded-b-2xl transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="py-4 px-4 space-y-3">
          {/* Navigation Links */}
          <div className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Privacy Policy", path: "/privacy" }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#ffffff08] rounded-lg transition-all duration-300 text-sm font-medium uppercase tracking-wider"
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#ffffff08] space-y-3">
            <Link href="/dashboard" onClick={handleLinkClick}>
              <button className="w-full px-4 py-3 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center justify-center">
                Dashboard
              </button>
            </Link>
            <button
              onClick={handlePremiumClick}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Crown className="h-4 w-4" />
              Premium
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 
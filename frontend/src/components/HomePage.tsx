'use client'

import Link from 'next/link'
import { Crown, Sparkles, Shield, Mail, RefreshCw, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from './Navbar'
import Footer from './Footer'
import CtaSection from './CtaSection'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const [email, setEmail] = useState('')
  const [inboxId, setInboxId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generateNewInbox = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/api/inbox/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate inbox')
      }
      
      const data = await response.json()
      setEmail(data.email)
      setInboxId(data.inboxId)
    } catch (error) {
      console.error('Error generating inbox:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(email)
      // You can add a toast notification here if you want
    }
  }

  // Generate inbox on component mount
  useEffect(() => {
    generateNewInbox()
  }, [])

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="mt-2 mr-2 ml-2">
        <Navbar />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 text-center bg-[#0e0e10]">
        <div className="absolute w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-[#10B981]/10 blur-[80px] sm:blur-[100px] lg:blur-[120px] -top-16 sm:-top-24 lg:-top-32 left-1/2 -translate-x-1/2 z-0" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <div className="tracking-[0.3em] sm:tracking-[0.5em] text-[#10B981] text-xs sm:text-sm uppercase mb-3 sm:mb-4">
            VOIDMAIL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight font-poppins">
            Start your <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-poppins">
              free trial today
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-lg mx-auto font-pt--sans">
            Unlock the full potential of private communication with our secure disposable email solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/main">
              <Button size="lg" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center gap-2">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
            <Link href="/premium">
              <Button variant="outline" size="lg" className="px-6 sm:px-8 py-3 sm:py-4 bg-[#ffffff08] hover:bg-[#ffffff12] text-white rounded-xl font-semibold transition-colors duration-300 border border-[#ffffff08] flex items-center gap-2">
                <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-[#10B981]" />
                Premium Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Inbox Section */}
      <section className="py-16 sm:py-20 bg-[#121214] border-y border-[#ffffff08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-[#10B981]" />
              <span className="text-[#10B981] font-semibold uppercase tracking-wider">
                Your Temporary Inbox
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Start Using <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">Disposable Email</span> Right Now
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Get a random email address instantly. No registration required, completely free to use.
            </p>
          </div>
          
          <Card className="bg-[#151517] border border-[#ffffff08] p-6 sm:p-8">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl sm:text-2xl text-white">
                Your Temporary Email Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981] mx-auto mb-4"></div>
                  <p className="text-gray-400">Generating your inbox...</p>
                </div>
              ) : email ? (
                <>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex-1 bg-[#0e0e10] border border-[#ffffff08] rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-[#10B981]" />
                        <span className="font-mono text-lg text-white">{email}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      onClick={generateNewInbox}
                      variant="outline"
                      className="px-6 py-3 bg-[#ffffff08] hover:bg-[#ffffff12] text-white rounded-lg transition-colors border border-[#ffffff08] flex items-center gap-2 mx-auto"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Generate New Email
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-400">
                    <p>Share this email address to receive messages</p>
                    <p>Messages will appear in your inbox automatically</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Failed to generate inbox. Please try again.</p>
                  <Button 
                    onClick={generateNewInbox}
                    className="mt-4 px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                  >
                    Retry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-16 sm:py-20 bg-[#121214] border-y border-[#ffffff08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-[#10B981]" />
              <span className="text-[#10B981] font-semibold uppercase tracking-wider text-sm sm:text-base">
                Premium Features
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Custom Email Addresses with <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">NFT Ownership</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Create your own custom email addresses and mint unique NFTs as proof of ownership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6 sm:p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-[#10B981]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Custom Domains</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                Choose from premium domains like voidmail.fun, voidmail.email, and more
              </p>
              <div className="text-xs sm:text-sm text-[#10B981] font-mono">
                yourname@voidmail.fun
              </div>
            </div>
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6 sm:p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#10B981]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">NFT Certificate</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                Each custom email comes with a unique NFT as proof of ownership
              </p>
              <div className="text-xs sm:text-sm text-[#10B981] font-mono">
                Minted on Solana
              </div>
            </div>
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6 sm:p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#10B981]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Secure Payment</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                Pay with SOL cryptocurrency for instant, secure transactions
              </p>
              <div className="text-xs sm:text-sm text-[#10B981] font-mono">
                0.025 SOL per email
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/premium">
              <Button size="lg" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center gap-2 mx-auto">
                <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
                Get Premium Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-[#0e0e10] border-y border-[#ffffff08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-6 sm:p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-4xl sm:text-5xl font-bold text-[#10B981] mb-2">50K+</div>
            <div className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Emails Generated</div>
          </div>
          <div className="text-center p-6 sm:p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-4xl sm:text-5xl font-bold text-[#10B981] mb-2">99.9%</div>
            <div className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Service Uptime</div>
          </div>
          <div className="text-center p-6 sm:p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-4xl sm:text-5xl font-bold text-[#10B981] mb-2">24h</div>
            <div className="text-gray-400 uppercase tracking-wider text-xs sm:text-sm">Auto-Destruct</div>
          </div>
        </div>
      </section>

      {/* CtaSection */}
      <CtaSection/>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage 
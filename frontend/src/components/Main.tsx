'use client'

import React, { useState, useEffect } from 'react'
import { Copy, RefreshCw, Mail, Crown, X } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import Footer from './Footer'
import CtaSection from './CtaSection'
import Navbar from './Navbar'

interface Email {
  subject: string
  from: string
  date: string
  body: string
}

const Main = () => {
  const [email] = useState('demo@voidmail.fun')
  const [inbox] = useState<Email[]>([])
  const [selectedMail, setSelectedMail] = useState<Email | null>(null)
  const [autorefresh, setAutorefresh] = useState(10)
  const [showPremiumBanner, setShowPremiumBanner] = useState(true)

  // Debug log to verify component loads
  useEffect(() => {
    console.log('Main component loaded')
  }, [])

  // Autorefresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    toast.success('Email copied to clipboard', {
      style: {
        background: '#151517',
        color: '#fff',
        border: '1px solid #374151',
      },
    })
  }

  const refreshInbox = () => {
    toast.success('Inbox refreshed', {
      style: {
        background: '#151517',
        color: '#fff',
        border: '1px solid #374151',
      },
    })
  }

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Premium Banner */}
      {showPremiumBanner && (
        <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] p-3 sm:p-4 relative mt-16 sm:mt-18">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base">Upgrade to Premium</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">Get custom email addresses and NFT ownership</p>
              </div>
            </div>
            <button
              onClick={() => setShowPremiumBanner(false)}
              className="text-white hover:opacity-80 transition-opacity p-1 sm:p-2 rounded-lg hover:bg-white/10"
              aria-label="Close premium banner"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-0 sm:mt-0">
        {/* Email Address Section */}
        <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Your Disposable Email</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-400">Auto-refresh in {autorefresh}s</span>
              <button
                onClick={refreshInbox}
                className="p-2 hover:bg-[#ffffff08] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
                aria-label="Refresh inbox"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 bg-[#0e0e10] border border-[#ffffff08] rounded-lg p-3 sm:p-4 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#10B981] flex-shrink-0" />
                <span className="font-mono text-sm sm:text-base lg:text-lg truncate">{email}</span>
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Inbox */}
          <div className="lg:col-span-2 bg-[#151517] border border-[#ffffff08] rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">Inbox</h3>
              <div className="text-sm text-gray-400">
                {inbox.length} email{inbox.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {inbox.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {inbox.map((mail, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 bg-[#0e0e10] rounded-lg border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors cursor-pointer group"
                    onClick={() => setSelectedMail(mail)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
                      <h4 className="font-medium text-sm sm:text-base truncate">{mail.subject || 'No Subject'}</h4>
                      <span className="text-xs sm:text-sm text-gray-400">{mail.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2">From: {mail.from}</p>
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">{mail.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <Mail className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg sm:text-xl font-medium mb-2">No emails yet</h4>
                <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                  Share your email address to receive emails here
                </p>
              </div>
            )}
          </div>

          {/* Email Details */}
          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Email Details</h3>
            {selectedMail ? (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 block mb-1">Subject</label>
                  <p className="font-medium text-sm sm:text-base break-words">{selectedMail.subject}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 block mb-1">From</label>
                  <p className="font-medium text-sm sm:text-base break-words">{selectedMail.from}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 block mb-1">Date</label>
                  <p className="font-medium text-sm sm:text-base">{selectedMail.date}</p>
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-gray-400 block mb-1">Body</label>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed break-words">
                    {selectedMail.body}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <button className="flex-1 px-3 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50">
                    Reply
                  </button>
                  <button className="flex-1 px-3 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50">
                    Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <Mail className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-sm sm:text-base">Select an email to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <CtaSection />
      <Footer />
      <Toaster />
    </div>
  )
}

export default Main 
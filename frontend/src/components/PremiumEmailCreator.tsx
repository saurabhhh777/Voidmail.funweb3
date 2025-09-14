'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Crown, Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { API_CONFIG } from '@/config/api'
import { useWeb3Store } from '../../store/web3Store'
import toast from 'react-hot-toast'

const AVAILABLE_DOMAINS = API_CONFIG.DOMAINS

const PremiumEmailCreator = () => {
  const { connected } = useWallet()
  const { balance, refreshBalance, createCustomEmail, isLoading } = useWeb3Store()
  
  const [emailPrefix, setEmailPrefix] = useState('')
  const [selectedDomain, setSelectedDomain] = useState(AVAILABLE_DOMAINS[0])
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (connected) {
      refreshBalance()
    }
  }, [connected, refreshBalance])

  const validatePrefix = (prefix: string): boolean => {
    if (!prefix) {
      setValidationError('Email prefix is required')
      return false
    }
    if (prefix.length < 3) {
      setValidationError('Email prefix must be at least 3 characters')
      return false
    }
    if (prefix.length > 20) {
      setValidationError('Email prefix must be less than 20 characters')
      return false
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(prefix)) {
      setValidationError('Email prefix can only contain letters, numbers, dots, hyphens, and underscores')
      return false
    }
    setValidationError('')
    return true
  }

  const checkEmailAvailability = async (prefix: string, domain: string) => {
    if (!validatePrefix(prefix)) {
      setIsAvailable(false)
      return
    }

    setIsChecking(true)
    try {
      const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/v1/user/checkEmailAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prefix, domain }),
      })

      const data = await response.json()
      setIsAvailable(data.available)
    } catch (error) {
      console.error('Error checking availability:', error)
      setIsAvailable(false)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    if (emailPrefix && selectedDomain) {
      const debounceTimer = setTimeout(() => {
        checkEmailAvailability(emailPrefix, selectedDomain)
      }, 500)

      return () => clearTimeout(debounceTimer)
    } else {
      setIsAvailable(null)
    }
  }, [emailPrefix, selectedDomain])

  const handleCreateEmail = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (balance < API_CONFIG.PREMIUM_EMAIL_COST) {
      toast.error(`Insufficient SOL balance. Need ${API_CONFIG.PREMIUM_EMAIL_COST} SOL`)
      return
    }

    if (!isAvailable) {
      toast.error('Please choose an available email address')
      return
    }

    try {
      await createCustomEmail(emailPrefix, selectedDomain)
      toast.success(`Successfully created ${emailPrefix}@${selectedDomain}!`)
      
      // Reset form
      setEmailPrefix('')
      setIsAvailable(null)
      
      // Refresh balance
      await refreshBalance()
    } catch (error) {
      console.error('Error creating email:', error)
      const message = error instanceof Error ? error.message : 'Failed to create premium email'
      toast.error(message)
    }
  }

  const fullEmail = emailPrefix ? `${emailPrefix}@${selectedDomain}` : ''

  if (!connected) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#151517] to-[#1a1a1d] border-[#ffffff08]">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Premium Email Creation
            </CardTitle>
          </div>
          <p className="text-gray-400">
            Create your own custom email address with NFT ownership
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">Connect your wallet to get started</p>
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-[#151517] to-[#1a1a1d] border-[#ffffff08]">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Premium Email Creation
          </CardTitle>
        </div>
        <p className="text-gray-400">
          Create your own custom email address with NFT ownership
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Wallet Info */}
        <div className="bg-[#0a0a0c] rounded-lg p-4 border border-[#ffffff08]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Wallet Balance</p>
              <p className="text-lg font-bold text-green-400">{balance.toFixed(4)} SOL</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Cost</p>
              <p className="text-lg font-bold text-yellow-400">{API_CONFIG.PREMIUM_EMAIL_COST} SOL</p>
            </div>
          </div>
        </div>

        {/* Email Creation Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="email-prefix" className="text-gray-300">
              Choose your email prefix
            </Label>
            <Input
              id="email-prefix"
              type="text"
              placeholder="your-name"
              value={emailPrefix}
              onChange={(e) => setEmailPrefix(e.target.value.toLowerCase())}
              className="bg-[#0a0a0c] border-[#ffffff08] text-white placeholder:text-gray-500"
            />
            {validationError && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {validationError}
              </p>
            )}
          </div>

          <div>
            <Label className="text-gray-300">Choose domain</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {AVAILABLE_DOMAINS.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDomain === domain
                      ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                      : 'border-[#ffffff08] bg-[#0a0a0c] text-gray-300 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-medium">@{domain}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Email Preview */}
          {fullEmail && (
            <div className="bg-[#0a0a0c] rounded-lg p-4 border border-[#ffffff08]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Your email will be:</p>
                  <p className="text-lg font-bold text-white">{fullEmail}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isChecking ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                  ) : isAvailable === true ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <Check className="h-5 w-5" />
                      <span className="text-sm">Available</span>
                    </div>
                  ) : isAvailable === false ? (
                    <div className="flex items-center gap-1 text-red-400">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm">Not Available</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* Create Button */}
          <Button
            onClick={handleCreateEmail}
            disabled={
              !fullEmail || 
              !isAvailable || 
              isLoading || 
              balance < API_CONFIG.PREMIUM_EMAIL_COST
            }
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Email...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Create Premium Email ({API_CONFIG.PREMIUM_EMAIL_COST} SOL)
              </div>
            )}
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0a0a0c] rounded-lg p-4 border border-[#ffffff08]">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h3 className="font-semibold text-white">NFT Certificate</h3>
            </div>
            <p className="text-sm text-gray-400">
              Receive a unique NFT that proves ownership of your custom email
            </p>
          </div>
          
          <div className="bg-[#0a0a0c] rounded-lg p-4 border border-[#ffffff08]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-white">Permanent Access</h3>
            </div>
            <p className="text-sm text-gray-400">
              Your email address is permanently yours, backed by blockchain
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PremiumEmailCreator 
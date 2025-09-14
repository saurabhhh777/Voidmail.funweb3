'use client'

import { useState, useEffect } from 'react'
import { Crown, Mail, RefreshCw, Copy, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PremiumEmailCreator from './PremiumEmailCreator'
import Inbox from './Inbox'
import Hero from './Hero'
import Features from './Features'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { userAuthStore } from '../../store/userAuthStore'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'free' | 'premium' | 'inbox'>('free')
  const [email, setEmail] = useState('')
  // const [sessionId, setSessionId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { createSession, createEmail } = userAuthStore()

  const generateNewEmail = async () => {
    try {
      setIsLoading(true)
      const sessionData = await createSession()
      if (sessionData?.data?.token) {
        // setSessionId(sessionData.data.token)
        const emailData = await createEmail(sessionData.data.token)
        if (emailData) {
          setEmail(emailData)
          toast.success('New temporary email generated!')
        }
      }
    } catch (error) {
      console.error('Error generating email:', error)
      toast.error('Failed to generate email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(email)
      toast.success('Email address copied to clipboard!')
    }
  }

  const refreshEmail = () => generateNewEmail()

  useEffect(() => {
    generateNewEmail()
  }, [])

  return (
    <div className="bg-white">
      <Hero />
      <Features />

      <section id="tabs" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'free' | 'premium' | 'inbox')}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="free" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Free Email
                </TabsTrigger>
                <TabsTrigger value="premium" className="gap-2">
                  <Crown className="h-4 w-4" />
                  Premium
                </TabsTrigger>
                <TabsTrigger value="inbox" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Inbox
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="free">
              <div className="max-w-2xl mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Zap className="h-6 w-6 text-purple-600" />
                      <CardTitle className="text-2xl">Free Temporary Email</CardTitle>
                    </div>
                    <p className="text-gray-600">Get an instant disposable email address for temporary use</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {email ? (
                      <div className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-500 mb-1">Your temporary email:</p>
                            <p className="text-lg font-mono break-all">{email}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={copyToClipboard} variant="outline" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button onClick={refreshEmail} variant="outline" size="sm" disabled={isLoading}>
                              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-6 border text-center">
                        {isLoading ? (
                          <div>
                            <RefreshCw className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-3" />
                            <p className="text-gray-600">Generating your email...</p>
                          </div>
                        ) : (
                          <div>
                            <Mail className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">Click generate to get your temporary email</p>
                          </div>
                        )}
                      </div>
                    )}

                    <Button onClick={generateNewEmail} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Generating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Generate New Email
                        </div>
                      )}
                    </Button>

                    {email && (
                      <div className="flex gap-3">
                        <Button onClick={() => setActiveTab('inbox')} variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          View Inbox
                        </Button>
                        <Button onClick={() => setActiveTab('premium')} variant="outline" className="flex-1">
                          <Crown className="h-4 w-4 mr-2" />
                          Go Premium
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="premium">
              <PremiumEmailCreator />
            </TabsContent>

            <TabsContent value="inbox">
              {email ? (
                <Inbox emailAddress={email} />
              ) : (
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-12 text-center">
                    <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Email Address</h3>
                    <p className="text-gray-600 mb-6">Generate a temporary email or create a premium email to access your inbox</p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => setActiveTab('free')} variant="outline">
                        <Zap className="h-4 w-4 mr-2" />
                        Free Email
                      </Button>
                      <Button onClick={() => setActiveTab('premium')} className="bg-purple-600 hover:bg-purple-700">
                        <Crown className="h-4 w-4 mr-2" />
                        Premium Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
} 
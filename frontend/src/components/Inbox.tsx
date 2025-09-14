'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Mail, RefreshCw, Copy, Clock, User, ExternalLink, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { userAuthStore } from '../../store/userAuthStore'
import toast from 'react-hot-toast'

interface Email {
  id: string
  to: string
  from: string
  subject: string
  text?: string
  html?: string
  date: string
  read?: boolean
  attachments?: Array<{
    filename: string
    contentType: string
    size: number
  }>
}

interface InboxProps {
  emailAddress: string
  autoRefresh?: boolean
  refreshInterval?: number
}

const Inbox: React.FC<InboxProps> = ({ 
  emailAddress, 
  autoRefresh = true, 
  refreshInterval = 10000 // 10 seconds
}) => {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [autoRefreshCountdown, setAutoRefreshCountdown] = useState(refreshInterval / 1000)
  const { getAllEmails } = userAuthStore()

  const fetchEmails = useCallback(async () => {
    if (!emailAddress) return

    setIsLoading(true)
    try {
      const emailData = await getAllEmails(emailAddress)
      if (emailData && Array.isArray(emailData)) {
        // Sort emails by date (newest first)
        const sortedEmails = emailData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setEmails(sortedEmails)
        setLastRefresh(new Date())
      }
    } catch (error) {
      console.error('Error fetching emails:', error)
      toast.error('Failed to fetch emails')
    } finally {
      setIsLoading(false)
    }
  }, [emailAddress, getAllEmails])

  // Auto refresh functionality
  useEffect(() => {
    if (!autoRefresh) return

    const refreshTimer = setInterval(() => {
      fetchEmails()
    }, refreshInterval)

    const countdownTimer = setInterval(() => {
      setAutoRefreshCountdown((prev) => {
        if (prev <= 1) {
          return refreshInterval / 1000
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(refreshTimer)
      clearInterval(countdownTimer)
    }
  }, [autoRefresh, refreshInterval, fetchEmails])

  // Initial fetch
  useEffect(() => {
    fetchEmails()
  }, [fetchEmails])

  const handleRefresh = () => {
    fetchEmails()
    setAutoRefreshCountdown(refreshInterval / 1000)
  }

  const copyEmailAddress = () => {
    navigator.clipboard.writeText(emailAddress)
    toast.success('Email address copied to clipboard')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const getEmailPreview = (email: Email) => {
    return email.text || (email.html ? email.html.replace(/<[^>]*>/g, '') : 'No content')
  }

  const markAsRead = (emailId: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === emailId ? { ...email, read: true } : email
      )
    )
  }

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email)
    markAsRead(email.id)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-[#151517] to-[#1a1a1d] border-[#ffffff08]">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Inbox</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-300 font-mono">{emailAddress}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyEmailAddress}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {autoRefresh && (
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Auto-refresh in {autoRefreshCountdown}s</span>
                  </div>
                )}
                <Button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  variant="outline"
                  className="border-[#ffffff08] bg-[#0a0a0c] text-white hover:bg-[#151517]"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card className="bg-[#151517] border-[#ffffff08]">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Messages ({emails.length})</span>
                {lastRefresh && (
                  <span className="text-xs text-gray-400 font-normal">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading && emails.length === 0 ? (
                <div className="p-6 text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Loading emails...</p>
                </div>
              ) : emails.length === 0 ? (
                <div className="p-6 text-center">
                  <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">No emails yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Share your email address to start receiving messages
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#ffffff08]">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleEmailClick(email)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-[#1a1a1d] ${
                        selectedEmail?.id === email.id ? 'bg-[#1a1a1d] border-l-2 border-l-blue-500' : ''
                      } ${!email.read ? 'bg-blue-500/5' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-white font-medium truncate">
                            {email.from || 'Unknown Sender'}
                          </span>
                          {!email.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatDate(email.date)}
                        </span>
                      </div>
                      
                      <h4 className="text-white font-medium text-sm mb-1 truncate">
                        {email.subject || 'No Subject'}
                      </h4>
                      
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {truncateText(getEmailPreview(email), 80)}
                      </p>
                      
                      {email.attachments && email.attachments.length > 0 && (
                        <div className="mt-2 flex items-center gap-1">
                          <ExternalLink className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {email.attachments.length} attachment{email.attachments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          <Card className="bg-[#151517] border-[#ffffff08] h-full">
            {selectedEmail ? (
              <>
                <CardHeader className="border-b border-[#ffffff08]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {selectedEmail.subject || 'No Subject'}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">From:</span>
                          <span className="text-sm text-white">{selectedEmail.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">To:</span>
                          <span className="text-sm text-white">{selectedEmail.to}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Date:</span>
                          <span className="text-sm text-white">
                            {new Date(selectedEmail.date).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEmail(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    {selectedEmail.html ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                        className="text-gray-300 leading-relaxed"
                      />
                    ) : (
                      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selectedEmail.text || 'No content available'}
                      </div>
                    )}
                  </div>

                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#ffffff08]">
                      <h4 className="text-white font-medium mb-3">Attachments</h4>
                      <div className="space-y-2">
                        {selectedEmail.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-[#0a0a0c] rounded-lg border border-[#ffffff08]"
                          >
                            <ExternalLink className="h-5 w-5 text-gray-400" />
                            <div className="min-w-0 flex-1">
                              <p className="text-white font-medium truncate">
                                {attachment.filename}
                              </p>
                              <p className="text-xs text-gray-400">
                                {attachment.contentType} • {Math.round(attachment.size / 1024)}KB
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            ) : (
              <CardContent className="p-12 text-center">
                <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Select an email</h3>
                <p className="text-gray-400">
                  Choose an email from the list to view its contents
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Inbox 
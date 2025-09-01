'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Clock, User, MessageSquare, X } from 'lucide-react'

interface Message {
  id: string
  from: string
  subject: string
  body: string
  timestamp: number
}

interface InboxProps {
  inboxId: string
}

const Inbox: React.FC<InboxProps> = ({ inboxId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`http://localhost:5000/api/inbox/${inboxId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages()
  }, [inboxId])

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages()
    }, 10000)

    return () => clearInterval(interval)
  }, [inboxId])

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#10B981]" />
            Inbox Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading messages...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#10B981]" />
            Inbox Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchMessages} variant="outline">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#10B981]" />
            Inbox Messages ({messages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">No messages yet</h4>
              <p className="text-gray-400">Share your email address to receive emails here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 bg-[#0e0e10] rounded-lg border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{message.subject}</h4>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-400">{message.from}</span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{message.body}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMessage(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="h-4 w-4" />
                <span>From: {selectedMessage.from}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{formatTimestamp(selectedMessage.timestamp)}</span>
              </div>
              <div className="border-t border-[#ffffff08] pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-[#10B981]" />
                  <span className="text-sm font-medium text-gray-300">Message Body</span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.body}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Inbox 
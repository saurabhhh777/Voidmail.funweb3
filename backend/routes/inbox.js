import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory storage for inboxes (will move to Redis/DB later)
const inboxes = new Map()

// Mock messages for testing (will be replaced with real email parsing later)
const mockMessages = [
  {
    id: 'msg1',
    from: 'welcome@voidmail.fun',
    subject: 'Welcome to VoidMail!',
    body: 'Welcome to your new disposable email inbox. This is a secure, temporary email address that you can use for testing or privacy.',
    timestamp: Date.now() - 3600000 // 1 hour ago
  },
  {
    id: 'msg2',
    from: 'test@example.com',
    subject: 'Test Email',
    body: 'This is a test email to demonstrate how your inbox works. You can click on any message to view the full content.',
    timestamp: Date.now() - 1800000 // 30 minutes ago
  },
  {
    id: 'msg3',
    from: 'newsletter@tech.com',
    subject: 'Weekly Tech Updates',
    body: 'Stay updated with the latest in technology. This is a sample newsletter email to show how different types of emails appear in your inbox.',
    timestamp: Date.now() - 900000 // 15 minutes ago
  }
]

// Generate random email prefix
function generateEmailPrefix() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const length = Math.floor(Math.random() * 8) + 6 // 6-13 characters
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// POST /api/inbox/new - Generate new inbox
router.post('/new', (req, res) => {
  try {
    const emailPrefix = generateEmailPrefix()
    const email = `${emailPrefix}@voidmail.fun`
    const inboxId = uuidv4()
    
    // Store inbox in memory
    inboxes.set(inboxId, {
      email,
      createdAt: Date.now()
    })
    
    res.json({
      email,
      inboxId
    })
  } catch (error) {
    console.error('Error generating inbox:', error)
    res.status(500).json({ error: 'Failed to generate inbox' })
  }
})

// GET /api/inbox/:inboxId - Fetch inbox messages
router.get('/:inboxId', (req, res) => {
  try {
    const { inboxId } = req.params
    
    // Check if inbox exists
    if (!inboxes.has(inboxId)) {
      return res.status(404).json({ error: 'Inbox not found' })
    }
    
    // Return mock messages for now
    // Later this will fetch real messages from the SMTP server
    res.json({
      messages: mockMessages
    })
  } catch (error) {
    console.error('Error fetching inbox:', error)
    res.status(500).json({ error: 'Failed to fetch inbox' })
  }
})

export default router 
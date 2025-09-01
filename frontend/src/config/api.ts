// API Configuration
export const API_CONFIG = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  INBOX_ENDPOINTS: {
    NEW: '/api/inbox/new',
    MESSAGES: (inboxId: string) => `/api/inbox/${inboxId}`
  }
} 
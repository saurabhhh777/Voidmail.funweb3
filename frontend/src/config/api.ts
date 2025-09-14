// API Configuration
export const API_CONFIG = {
  BACKEND_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    // Inbox endpoints
    INBOX: {
      NEW: '/api/inbox/new',
      MESSAGES: (inboxId: string) => `/api/inbox/${inboxId}`,
      ALL_EMAILS: '/api/v1/email/getAllEmails'
    },
    
    // User endpoints
    USER: {
      SESSION: '/api/v1/user/session',
      CREATE_SESSION: '/api/v1/user/createUserSession',
      LOGOUT: '/api/v1/user/logout',
      PROFILE: '/api/v1/user/profile',
      CREATE_EMAIL: '/api/v1/user/createEmail',
      CUSTOM_EMAILS: '/api/v1/user/customEmails',
      CREATE_CUSTOM_EMAIL: '/api/v1/user/createCustomEmail'
    },
    
    // Email endpoints
    EMAIL: {
      SAVE: '/api/v1/email',
      GET_ALL: '/api/v1/email',
      GET_BY_ADDRESS: (address: string) => `/api/v1/email/${address}`
    },
    
    // Credit endpoints
    CREDIT: {
      PURCHASE: '/api/v1/credit/purchase',
      VERIFY: '/api/v1/credit/verify-purchase',
      USER_CREDITS: (walletAddress: string) => `/api/v1/credit/user/${walletAddress}`,
      TRANSACTIONS: (walletAddress: string) => `/api/v1/credit/transactions/${walletAddress}`
    },
    
    // Transaction endpoints
    TRANSACTION: {
      HISTORY: (walletAddress: string) => `/api/v1/transaction/history/${walletAddress}`
    }
  },
  
  // Solana configuration
  SOLANA: {
    RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID || '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9',
    NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'devnet'
  },
  
  // Email domains
  DOMAINS: (process.env.NEXT_PUBLIC_SMTP_DOMAINS || 'voidmail.fun,voidmail.email,bigtimer.site,asksaurabh.xyz').split(','),
  
  // Premium email pricing
  PREMIUM_EMAIL_COST: 0.025 // SOL
} 
// Web3-specific Jest setup for VoidMail NFT testing
import '@testing-library/jest-dom'

// Mock global Web3 objects
global.window = global.window || {}

// Mock Solana Web3 global objects
global.window.solana = {
  isPhantom: true,
  isConnected: false,
  connect: jest.fn(() => Promise.resolve({ publicKey: 'mock-public-key' })),
  disconnect: jest.fn(() => Promise.resolve()),
  on: jest.fn(),
  request: jest.fn(() => Promise.resolve('mock-signature')),
}

// Mock Solflare wallet
global.window.solflare = {
  isSolflare: true,
  isConnected: false,
  connect: jest.fn(() => Promise.resolve({ publicKey: 'mock-public-key' })),
  disconnect: jest.fn(() => Promise.resolve()),
  on: jest.fn(),
  request: jest.fn(() => Promise.resolve('mock-signature')),
}

// Mock crypto for Web3 operations
global.crypto = {
  getRandomValues: jest.fn((arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256)
    }
    return arr
  }),
  subtle: {
    generateKey: jest.fn(() => Promise.resolve({ publicKey: 'mock-key', privateKey: 'mock-private-key' })),
    sign: jest.fn(() => Promise.resolve(new Uint8Array(64))),
    verify: jest.fn(() => Promise.resolve(true)),
  },
}

// Mock TextEncoder/TextDecoder for string operations
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('mock-response'),
  })
)

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock indexedDB
global.indexedDB = {
  open: jest.fn(() => ({
    result: {
      createObjectStore: jest.fn(),
      transaction: jest.fn(() => ({
        objectStore: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve(null)),
          put: jest.fn(() => Promise.resolve()),
          delete: jest.fn(() => Promise.resolve()),
        })),
      })),
    },
    onsuccess: jest.fn(),
    onerror: jest.fn(),
  })),
}

// Mock WebSocket for real-time connections
global.WebSocket = jest.fn(() => ({
  send: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: 1, // OPEN
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0))
global.cancelAnimationFrame = jest.fn()

// Mock performance API
global.performance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(() => []),
  getEntriesByName: jest.fn(() => []),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn(),
}

// Mock console methods for cleaner test output
const originalConsole = { ...console }
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}

// Restore console after tests
afterAll(() => {
  global.console = originalConsole
})

// Mock process.env for environment variables
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SOLANA_RPC_URL = 'https://api.devnet.solana.com'
process.env.NEXT_PUBLIC_PROGRAM_ID = '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9'

// Setup test utilities
global.testUtils = {
  // Mock wallet connection
  mockWalletConnection: (connected = false, publicKey = null) => {
    global.window.solana.isConnected = connected
    global.window.solana.publicKey = publicKey
  },
  
  // Mock transaction response
  mockTransactionResponse: (success = true, signature = 'mock-signature') => {
    if (success) {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ 
          result: { signature, err: null },
          success: true 
        }),
      })
    } else {
      global.fetch.mockRejectedValueOnce(new Error('Transaction failed'))
    }
  },
  
  // Mock balance response
  mockBalanceResponse: (balance = 1000000000) => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ 
        result: { value: balance },
        success: true 
      }),
    })
  },
  
  // Reset all mocks
  resetMocks: () => {
    jest.clearAllMocks()
    global.window.solana.isConnected = false
    global.window.solana.publicKey = null
  },
}

// Export test utilities for use in tests
export default global.testUtils 
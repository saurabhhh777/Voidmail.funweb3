import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Extend Jest matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      }
    }
  },
  toHaveClass(received, ...expectedClasses) {
    if (!received) {
      return {
        message: () => `expected element to have classes ${expectedClasses.join(', ')}`,
        pass: false,
      }
    }
    
    const actualClasses = received.className.split(' ')
    const pass = expectedClasses.every(cls => actualClasses.includes(cls))
    
    if (pass) {
      return {
        message: () => `expected element not to have classes ${expectedClasses.join(', ')}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected element to have classes ${expectedClasses.join(', ')} but found ${actualClasses.join(', ')}`,
        pass: false,
      }
    }
  },
}) 
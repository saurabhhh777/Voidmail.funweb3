module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.web3.js'],
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/*.test.{ts,tsx}'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testTimeout: 10000,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  // Mock Web3 modules
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock Solana Web3
    '@solana/web3.js': '<rootDir>/__mocks__/solana-web3-mock.js',
    '@solana/wallet-adapter-react': '<rootDir>/__mocks__/wallet-adapter-mock.js',
    '@coral-xyz/anchor': '<rootDir>/__mocks__/anchor-mock.js',
    'arweave': '<rootDir>/__mocks__/arweave-mock.js',
  },
  // Setup files for Web3 testing
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.web3.js',
    '<rootDir>/jest.setup.js'
  ],
  // Environment variables for testing
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  // Transform ignore patterns
  transformIgnorePatterns: [
    'node_modules/(?!(arweave|@solana|@coral-xyz)/)',
  ],
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  // Test path patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
    '<rootDir>/build/',
  ],
  // Coverage reporters
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'json',
    'json-summary',
  ],
  // Coverage directory
  coverageDirectory: 'coverage',
  // Clear mocks between tests
  clearMocks: true,
  // Restore mocks between tests
  restoreMocks: true,
  // Reset modules between tests
  resetModules: true,
  // Verbose output
  verbose: true,
  // Force exit after tests
  forceExit: true,
  // Detect open handles
  detectOpenHandles: true,
  // Run tests in band
  runInBand: true,
} 
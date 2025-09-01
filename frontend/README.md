# Voidmail Frontend - Next.js 14 + TypeScript

This is the frontend application for Voidmail, a Web3 email platform built on Solana. The project has been migrated from Vite + React to Next.js 14 with TypeScript and App Router.

## 🚀 Features

- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Full type safety and better developer experience
- **App Router** - Modern file-based routing system
- **Error Boundaries** - Comprehensive error handling
- **Tailwind CSS** - Utility-first CSS framework
- **Jest + React Testing Library** - Comprehensive testing setup
- **ESLint** - Code quality and consistency

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ErrorBoundary.tsx  # Error handling
│   ├── HomePage.tsx       # Main page component
│   ├── LoadingSpinner.tsx # Loading states
│   └── __tests__/         # Component tests
├── store/                  # State management (Zustand)
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
```

### Key Components

#### ErrorBoundary
- Class-based error boundary for catching React errors
- Custom fallback UI with refresh functionality
- Comprehensive error logging

#### HomePage
- Main application entry point
- Real-time clock display
- Platform status indicators
- Responsive design with Tailwind CSS

#### LoadingSpinner
- Animated loading indicator
- Consistent with design system
- Used for Suspense fallbacks

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Building for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Jest** as the test runner
- **React Testing Library** for component testing
- **jsdom** for DOM simulation
- Comprehensive test coverage for all components

### Test Files
- `HomePage.test.tsx` - Tests for main page component
- `ErrorBoundary.test.tsx` - Tests for error handling
- `LoadingSpinner.test.tsx` - Tests for loading states

## 📁 Configuration Files

### Next.js
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

### Testing
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup and mocks

### Code Quality
- `.eslintrc.json` - ESLint configuration
- `package.json` - Dependencies and scripts

## 🎨 Styling

### Design System
- **Primary Color**: `#10B981` (Emerald)
- **Background**: `#0e0e10` (Dark)
- **Surface**: `#151517` (Darker)
- **Border**: `#ffffff08` (Transparent white)

### Tailwind CSS
- Custom color palette
- Responsive design utilities
- Component-based styling approach

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `start` | Start production server |
| `lint` | Run ESLint |
| `type-check` | Run TypeScript compiler |
| `test` | Run Jest tests |
| `test:watch` | Run tests in watch mode |
| `test:coverage` | Run tests with coverage |

## 🚦 Migration Notes

### From Vite to Next.js
- Replaced Vite with Next.js 14
- Migrated from file-based routing to App Router
- Updated build and development scripts

### From JavaScript to TypeScript
- Added TypeScript configuration
- Converted all components to `.tsx`
- Added proper type definitions
- Implemented strict type checking

### Testing Improvements
- Added Jest configuration
- Implemented React Testing Library
- Added comprehensive test coverage
- Created test utilities and mocks

### Error Handling
- Implemented Error Boundaries
- Added fallback UI components
- Created loading states
- Enhanced user experience

## 🔮 Future Enhancements

- [ ] Add more page routes
- [ ] Implement authentication
- [ ] Add Web3 wallet integration
- [ ] Create dashboard components
- [ ] Add email functionality
- [ ] Implement responsive navigation
- [ ] Add dark/light theme support

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

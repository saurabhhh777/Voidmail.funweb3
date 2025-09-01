'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-background text-white flex items-center justify-center p-6 transition-colors duration-200">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-red-500 mb-4 font-sans">
              Something went wrong
            </h1>
            <p className="text-gray-300 mb-6 font-sans">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2 mx-auto font-sans"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 font-sans">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs text-gray-500 bg-surface p-3 rounded border border-[#ffffff08] overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 
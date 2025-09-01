import { Suspense } from 'react'
import HomePage from '@/components/HomePage'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    </ErrorBoundary>
  )
} 
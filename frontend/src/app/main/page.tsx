import { Suspense } from 'react'
import Main from '@/components/Main'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function MainPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  )
} 
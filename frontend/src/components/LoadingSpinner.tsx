export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center transition-colors duration-200">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4 shadow-lg"></div>
        <p className="text-gray-300 font-sans text-lg">Loading...</p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
} 
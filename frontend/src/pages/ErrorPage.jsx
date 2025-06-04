import { Link } from 'react-router-dom';
import { FaceFrownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0e10] flex flex-col justify-center items-center text-center p-6 text-gray-100">
      {/* Error illustration */}
      <div className="relative mb-8">
        <div className="w-40 h-40 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 rounded-full flex items-center justify-center mx-auto">
          <FaceFrownIcon className="h-20 w-20 text-[#10B981]" />
        </div>
        <div className="absolute -top-4 -right-4 bg-[#EF4444] text-white text-xs font-bold rounded-full px-3 py-1 transform rotate-12">
          404
        </div>
      </div>

      {/* Error message */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
        Lost in the Void?
      </h1>
      
      <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
        The page you're looking for has either been deleted or never existed in this dimension.
      </p>
      
      <div className="mb-8 px-6 py-4 bg-[#151517] border border-[#ffffff08] rounded-lg inline-block">
        <p className="text-sm text-gray-400">
          <span className="text-[#10B981]">Pro tip:</span> Double-check the URL or try generating a new email instead
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Home
        </Link>
        
        <Link 
          to="/main" 
          className="px-6 py-3 bg-transparent border border-[#10B981] text-[#10B981] rounded-lg font-medium hover:bg-[#10B981]/10 transition-colors flex items-center gap-2"
        >
          <EnvelopeIcon className="h-5 w-5" />
          Generate Email
        </Link>
      </div>

      {/* Fun ASCII art */}
      <div className="mt-12 text-xs text-gray-500 font-mono hidden md:block">
        {`
         (\\_/)
         ( •_•) 
        / >🚀  Oops! Page not found
        `}
      </div>
    </div>
  );
};

export default ErrorPage;
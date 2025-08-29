import React from 'react';

const FallbackApp = () => {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-[#10B981]">Voidmail.fun</h1>
        <p className="text-gray-300 mb-6">
          Welcome to Voidmail - your secure disposable email solution.
        </p>
        
        <div className="space-y-4">
          <div className="bg-[#151517] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Basic Features</h2>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Disposable email addresses</li>
              <li>• Secure communication</li>
              <li>• No registration required</li>
              <li>• Instant setup</li>
            </ul>
          </div>
          
          <div className="bg-[#151517] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Browser Compatibility</h2>
            <p className="text-sm text-gray-400">
              If you're experiencing issues, try:
            </p>
            <ul className="text-sm text-gray-400 space-y-1 mt-2">
              <li>• Disabling Brave Shields</li>
              <li>• Allowing scripts and cookies</li>
              <li>• Using a different browser</li>
            </ul>
          </div>
          
          <button 
            onClick={() => window.location.reload()} 
            className="w-full px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-semibold"
          >
            Reload Application
          </button>
          
          <a 
            href="/debug" 
            className="block w-full px-6 py-3 bg-[#374151] text-white rounded-lg hover:bg-[#4B5563] transition-colors font-semibold text-center"
          >
            Debug Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default FallbackApp; 
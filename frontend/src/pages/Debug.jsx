import React, { useEffect, useState } from 'react';

const Debug = () => {
  const [browserInfo, setBrowserInfo] = useState({});
  const [walletInfo, setWalletInfo] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Collect browser information
    const browserData = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      vendor: navigator.vendor,
      isBrave: navigator.brave?.isBrave() || false,
      isChrome: /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent),
      isFirefox: /Firefox/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
    };
    setBrowserInfo(browserData);

    // Check wallet availability
    const walletData = {
      hasPhantom: !!(window.solana?.isPhantom || window.phantom?.solana?.isPhantom),
      hasSolflare: !!window.solflare?.isSolflare,
      hasBraveWallet: !!window.braveSolana?.isBraveWallet,
      windowSolana: !!window.solana,
      windowPhantom: !!window.phantom,
    };
    setWalletInfo(walletData);

    // Test basic functionality
    const testErrors = [];
    
    try {
      // Test localStorage
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
    } catch (error) {
      testErrors.push(`localStorage error: ${error.message}`);
    }

    try {
      // Test sessionStorage
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
    } catch (error) {
      testErrors.push(`sessionStorage error: ${error.message}`);
    }

    try {
      // Test fetch
      fetch('/api/test').catch(() => {}); // Expected to fail, just testing if fetch works
    } catch (error) {
      testErrors.push(`fetch error: ${error.message}`);
    }

    setErrors(testErrors);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Information</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Browser Information */}
          <div className="bg-[#151517] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(browserInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400">{key}:</span>
                  <span className="text-white">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wallet Information */}
          <div className="bg-[#151517] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(walletInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400">{key}:</span>
                  <span className={`${value ? 'text-green-400' : 'text-red-400'}`}>
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-8 bg-red-900/20 border border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Errors Detected</h2>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="text-red-300 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Test Buttons */}
        <div className="mt-8 bg-[#151517] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Functions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => {
                try {
                  console.log('Test console log');
                  alert('Console log test successful');
                } catch (error) {
                  alert('Console log test failed: ' + error.message);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Test Console Log
            </button>
            
            <button 
              onClick={() => {
                try {
                  localStorage.setItem('debug-test', Date.now().toString());
                  const value = localStorage.getItem('debug-test');
                  localStorage.removeItem('debug-test');
                  alert('localStorage test successful: ' + value);
                } catch (error) {
                  alert('localStorage test failed: ' + error.message);
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-4"
            >
              Test localStorage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug; 
import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnect = () => {
  const { wallet, connected, disconnect } = useWallet();
  const [hasWallet, setHasWallet] = useState(false);

  const checkWalletAvailability = () => {
    const hasPhantom = window.solana?.isPhantom || window.phantom?.solana?.isPhantom;
    const hasSolflare = window.solflare?.isSolflare;
    
    const walletAvailable = hasPhantom || hasSolflare;
    setHasWallet(walletAvailable);
    
    if (!walletAvailable) {
      toast.error(
        'No Solana wallet found! Please install Phantom or Solflare wallet extension.',
        {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }
      );
    }
  };

  useEffect(() => {
    // Check after a short delay to allow wallet extensions to load
    const timer = setTimeout(checkWalletAvailability, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleManualCheck = () => {
    checkWalletAvailability();
  };

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-300">
            <span className="text-[#10B981] font-medium">
              {wallet?.adapter?.publicKey?.toString().slice(0, 4)}...{wallet?.adapter?.publicKey?.toString().slice(-4)}
            </span>
          </div>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <WalletMultiButton className="!bg-gradient-to-r !from-[#10B981] !to-[#3B82F6] !text-white !rounded-lg !font-medium !px-6 !py-2 hover:!scale-105 transition-transform" />
          {!hasWallet && (
            <button
              onClick={handleManualCheck}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs font-medium transition-colors"
              title="Check for wallet extensions"
            >
              🔍
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 
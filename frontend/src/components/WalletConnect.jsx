import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';
import { useWeb3Store } from '../../store/web3Store';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnect = () => {
  const { wallet, connected } = useWallet();
  const { connectWallet, disconnectWallet, isConnected } = useWeb3Store();
  const [hasWallet, setHasWallet] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

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

  // Immediate connection check on mount
  useEffect(() => {
    if (connected && wallet?.adapter && !isConnected) {
      console.log('Wallet already connected on mount, syncing...');
      console.log('Wallet adapter details:', {
        publicKey: wallet.adapter.publicKey?.toString(),
        connected: wallet.adapter.connected,
        wallet: wallet.adapter.name
      });
      connectWallet(wallet.adapter).catch(error => {
        console.error('Error connecting wallet on mount:', error);
      });
    }
  }, [connected, wallet, isConnected, connectWallet]); // Add dependencies

  // Sync adapter connection to our store
  useEffect(() => {
    const syncWalletState = async () => {
      try {
        console.log('Syncing wallet state:', { connected, wallet: !!wallet?.adapter });
        
        if (connected && wallet?.adapter) {
          console.log('Wallet connected, syncing to store...');
          const result = await connectWallet(wallet.adapter);
          console.log('Connect wallet result:', result);
        } else if (!connected) {
          console.log('Wallet disconnected, syncing to store...');
          // Ensure store reflects disconnect state
          await disconnectWallet();
        }
      } catch (error) {
        console.error('Error syncing wallet state:', error);
        toast.error('Error syncing wallet state: ' + error.message);
      }
    };

    // Add a small delay to ensure wallet adapter is fully initialized
    const timer = setTimeout(syncWalletState, 100);
    return () => clearTimeout(timer);
  }, [connected, wallet, connectWallet, disconnectWallet]);

  // Additional sync check that runs more frequently
  useEffect(() => {
    if (connected && wallet?.adapter && !isConnected) {
      console.log('Additional sync check - wallet connected but store not synced');
      const syncTimer = setTimeout(() => {
        connectWallet(wallet.adapter).catch(error => {
          console.error('Additional sync failed:', error);
        });
      }, 500);
      return () => clearTimeout(syncTimer);
    }
  }, [connected, wallet, isConnected, connectWallet]);

  const handleManualCheck = () => {
    checkWalletAvailability();
  };

  const handleDisconnect = async () => {
    try {
      // Ask for confirmation before disconnecting
      const confirmed = window.confirm('Are you sure you want to disconnect your wallet?');
      if (!confirmed) {
        return;
      }

      setIsDisconnecting(true);
      console.log('Disconnecting wallet...');
      
      // First disconnect the wallet adapter
      if (wallet?.adapter) {
        await wallet.adapter.disconnect();
      }
      
      // Then disconnect from our store
      await disconnectWallet();
      
      console.log('Wallet disconnected successfully');
      
      // Verify the disconnect worked
      console.log('Post-disconnect state:', {
        adapterConnected: connected,
        storeConnected: isConnected
      });
      
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast.error('Error disconnecting wallet: ' + error.message);
    } finally {
      setIsDisconnecting(false);
    }
  };

  // Debug: Log connection states
  useEffect(() => {
    console.log('Wallet Connect Debug:', {
      adapterConnected: connected,
      storeConnected: isConnected,
      wallet: wallet?.adapter?.publicKey?.toString()
    });
  }, [connected, isConnected, wallet]);

  return (
    <div className="flex items-center gap-4">
      {connected ? (
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-300">
            <span className="text-[#10B981] font-medium">
              {wallet?.adapter?.publicKey?.toString().slice(0, 4)}...{wallet?.adapter?.publicKey?.toString().slice(-4)}
            </span>
          </div>
          {!isConnected && (
            <button
              onClick={() => {
                console.log('Manual sync button clicked');
                if (wallet?.adapter) {
                  connectWallet(wallet.adapter).catch(error => {
                    console.error('Manual sync failed:', error);
                    toast.error('Manual sync failed: ' + error.message);
                  });
                }
              }}
              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs"
              title="Sync wallet to store"
            >
              🔄 Sync Store
            </button>
          )}
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${
              isDisconnecting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
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
import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Shield, Zap, CheckCircle, ExternalLink, Coins } from 'lucide-react';
import { useWeb3Store } from '../../store/web3Store';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-hot-toast';
import PaymentConfirmation from '../components/PaymentConfirmation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Premium = () => {
  const { wallet, connected: adapterConnected } = useWallet();
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    userCredits,
    createCustomEmail, 
    purchaseCredits,
    customEmails, 
    getCustomEmails,
    getUserCredits,
    checkWalletConnection,
    connectWallet,
    refreshBalance,
    isLoading,
    error 
  } = useWeb3Store();

  const [prefix, setPrefix] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedCredits, setSelectedCredits] = useState(1);
  const [transactionHash, setTransactionHash] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [activeTab, setActiveTab] = useState('credits');
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);

  const premiumDomains = [
    { name: 'voidmail.fun', price: '1 Credit', popular: true, description: 'Most popular domain' },
    { name: 'voidmail.email', price: '1 Credit', popular: false, description: 'Professional email domain' },
    { name: 'bigtimer.site', price: '1 Credit', popular: false, description: 'Unique branding domain' },
    { name: 'asksaurabh.xyz', price: '1 Credit', popular: true, description: 'Premium custom domain' }
  ];

  const creditOptions = [
    { credits: 1, price: 0.025, description: 'Perfect for trying out' },
    { credits: 2, price: 0.045, description: 'Great value for 2 emails' },
    { credits: 3, price: 0.060, description: 'Popular choice' },
    { credits: 5, price: 0.090, description: 'Best value for bulk' },
    { credits: 10, price: 0.150, description: 'Maximum savings' }
  ];

  useEffect(() => {
    // Check wallet connection state on mount
    checkWalletConnection();
  }, [checkWalletConnection]);

  useEffect(() => {
    if (isConnected) {
      getCustomEmails();
      getUserCredits();
      // Refresh balance when connected
      refreshBalance();
    }
  }, [isConnected]);

  // Auto-refresh balance every 30 seconds when connected
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      refreshBalance().catch(error => {
        console.error('Auto-refresh balance failed:', error);
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, refreshBalance]);

  const handlePurchaseCredits = async (credits) => {
    try {
      console.log('Purchase Credits Debug:', {
        adapterConnected,
        storeConnected: isConnected,
        walletAddress,
        balance,
        userCredits
      });

      // Check both adapter and store connection state
      if (!adapterConnected || !isConnected) {
        console.log('Wallet not connected, showing error');
        toast.error('Please connect your wallet first');
        return;
      }

      setSelectedCredits(credits);
      setShowCreditModal(true);
    } catch (error) {
      toast.error(error.message || 'Failed to initiate credit purchase');
    }
  };

  const handleCreditPaymentConfirm = async () => {
    try {
      setPaymentError(null);
      setTransactionHash(null);
      
      toast.loading('Processing payment through smart contract...', { id: 'payment' });
      
      const result = await purchaseCredits(selectedCredits);
      
      if (result.transactionHash) {
        setTransactionHash(result.transactionHash);
        toast.success(`${selectedCredits} credits purchased successfully!`, { id: 'payment' });
        setShowCreditModal(false);
        
        // Refresh user data and balance
        await getUserCredits();
        await refreshBalance();
      }
    } catch (error) {
      setPaymentError(error.message || 'Payment failed');
      toast.error(error.message || 'Failed to purchase credits', { id: 'payment' });
    }
  };

  const handleCreateEmail = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!prefix.trim()) {
      toast.error('Please enter a prefix');
      return;
    }

    if (!selectedDomain) {
      toast.error('Please select a domain');
      return;
    }

    if (userCredits < 1) {
      toast.error('Insufficient credits. Please purchase credits first.');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    try {
      setPaymentError(null);
      setTransactionHash(null);
      
      const result = await createCustomEmail(prefix.trim(), selectedDomain);
      
      if (result.transactionHash) {
        setTransactionHash(result.transactionHash);
        toast.success('Custom email created successfully! NFT minted.');
        setPrefix('');
        setSelectedDomain('');
        
        // Refresh user data and balance
        await getUserCredits();
        await refreshBalance();
      }
    } catch (error) {
      setPaymentError(error.message || 'Payment failed');
      toast.error(error.message || 'Failed to create custom email');
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setTransactionHash(null);
    setPaymentError(null);
  };

  const handleCloseCreditModal = () => {
    setShowCreditModal(false);
    setTransactionHash(null);
    setPaymentError(null);
  };

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="h-8 w-8 text-[#10B981]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Premium Features
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Purchase credits and create custom email addresses with NFT ownership on the Solana blockchain
          </p>
        </div>

        {/* Wallet Info - Show only if connected */}
        {(adapterConnected || isConnected) && (
          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                  <p className="font-mono text-sm">
                    {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Adapter: {adapterConnected ? '✅' : '❌'} | Store: {isConnected ? '✅' : '❌'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Balance</p>
                  <p className="text-[#10B981] font-semibold">{balance.toFixed(4)} SOL</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Credits</p>
                  <p className="text-[#3B82F6] font-semibold">{userCredits}</p>
                </div>
                <button
                  onClick={checkWalletConnection}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                  title="Sync wallet state"
                >
                  🔄 Sync
                </button>
                <button
                  onClick={async () => {
                    try {
                      setIsRefreshingBalance(true);
                      console.log('Manual refresh balance...');
                      await refreshBalance();
                      toast.success('Balance refreshed successfully!');
                    } catch (error) {
                      console.error('Manual refresh failed:', error);
                      toast.error('Failed to refresh balance: ' + error.message);
                    } finally {
                      setIsRefreshingBalance(false);
                    }
                  }}
                  disabled={isRefreshingBalance}
                  className={`px-3 py-1 text-white rounded text-xs ${
                    isRefreshingBalance 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  title="Refresh balance"
                >
                  {isRefreshingBalance ? '⏳' : '💰'} Refresh
                </button>
                {adapterConnected && !isConnected && (
                  <button
                    onClick={() => {
                      console.log('Manual connection attempt...');
                      if (wallet?.adapter) {
                        connectWallet(wallet.adapter).catch(error => {
                          console.error('Manual connection failed:', error);
                          toast.error('Manual connection failed: ' + error.message);
                        });
                      }
                    }}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                    title="Manual connect"
                  >
                    🔗 Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation - Show only if connected */}
        {(adapterConnected || isConnected) && (
          <div className="flex space-x-1 bg-[#151517] rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('credits')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'credits'
                  ? 'bg-[#10B981] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Coins className="h-4 w-4 inline mr-2" />
              Purchase Credits
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'create'
                  ? 'bg-[#10B981] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-4 w-4 inline mr-2" />
              Create Email
            </button>
          </div>
        )}

        {/* Credits Tab - Show credit cards directly */}
        {(!isConnected || activeTab === 'credits') && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credit Options */}
            <div className="lg:col-span-2">
              <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                    <Coins className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Purchase Credits</h3>
                    <p className="text-sm text-gray-400">Buy credits to create custom email addresses</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creditOptions.map((option) => (
                    <div
                      key={option.credits}
                      className="bg-[#0e0e10] rounded-xl p-6 border border-[#ffffff08] hover:border-[#3B82F6]/30 transition-colors"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#3B82F6] mb-2">
                          {option.credits} {option.credits === 1 ? 'Credit' : 'Credits'}
                        </div>
                        <div className="text-lg font-semibold text-[#10B981] mb-2">
                          {option.price} SOL
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{option.description}</p>
                        <button
                          onClick={() => handlePurchaseCredits(option.credits)}
                          disabled={isLoading || (isConnected && balance < option.price)}
                          className="w-full py-2 px-4 bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                        >
                          {isLoading ? 'Processing...' : 'Pay Now'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Coins className="h-5 w-5 text-[#3B82F6]" />
                  How Credits Work
                </h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <p>• 1 credit = 1 custom email address</p>
                  <p>• Credits never expire</p>
                  <p>• Use credits anytime</p>
                  <p>• Bulk purchases save money</p>
                </div>
              </div>

              {isConnected && (
                <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
                  <h3 className="text-lg font-semibold mb-4">Current Credits</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3B82F6] mb-2">{userCredits}</div>
                    <p className="text-sm text-gray-400">Available credits</p>
                  </div>
                </div>
              )}

              {!isConnected && (
                <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
                  <h3 className="text-lg font-semibold mb-4">Connect Wallet</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Connect your Solana wallet to purchase credits and create custom emails.
                  </p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• Secure blockchain payments</p>
                    <p>• NFT ownership certificates</p>
                    <p>• Immutable email addresses</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Email Tab - Show only if connected */}
        {(adapterConnected || isConnected) && activeTab === 'create' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Create Email Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Create Custom Email</h3>
                    <p className="text-sm text-gray-400">Use 1 credit to create a custom email address</p>
                  </div>
                </div>

                <form onSubmit={handleCreateEmail} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Prefix
                      </label>
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        placeholder="yourname"
                        className="w-full px-4 py-3 bg-[#0e0e10] border border-[#ffffff08] rounded-lg text-white placeholder-gray-500 focus:border-[#10B981] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Domain
                      </label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0e0e10] border border-[#ffffff08] rounded-lg text-white focus:border-[#10B981] focus:outline-none transition-colors"
                      >
                        <option value="">Select a domain</option>
                        {premiumDomains.map((domain) => (
                          <option key={domain.name} value={domain.name}>
                            {domain.name} ({domain.price})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {prefix && selectedDomain && (
                    <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Preview:</p>
                      <p className="font-mono text-[#10B981] text-lg">
                        {prefix}@{selectedDomain}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Cost: <span className="text-[#10B981] font-semibold">1 Credit</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !prefix || !selectedDomain || userCredits < 1}
                      className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      {isLoading ? 'Creating...' : (
                        <>
                          <Crown className="h-4 w-4" />
                          Create Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Available Domains */}
              <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-[#10B981]" />
                  Available Domains
                </h3>
                <div className="space-y-3">
                  {premiumDomains.map((domain) => (
                    <div
                      key={domain.name}
                      className={`p-3 rounded-lg border ${
                        domain.popular
                          ? 'border-[#10B981]/30 bg-[#10B981]/5'
                          : 'border-[#ffffff08] bg-[#0e0e10]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-sm">{domain.name}</span>
                        {domain.popular && (
                          <span className="text-xs bg-[#10B981] text-white px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{domain.price}</div>
                      <div className="text-xs text-gray-500">{domain.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
                <h3 className="text-lg font-semibold mb-4">What you get:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <div>
                      <p className="text-sm font-medium">Custom Email Address</p>
                      <p className="text-xs text-gray-400">Your own email like name@voidmail.fun</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <div>
                      <p className="text-sm font-medium">NFT Certificate</p>
                      <p className="text-xs text-gray-400">Unique NFT as proof of ownership</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <div>
                      <p className="text-sm font-medium">Blockchain Security</p>
                      <p className="text-xs text-gray-400">Immutable ownership on Solana</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <div>
                      <p className="text-sm font-medium">24/7 Access</p>
                      <p className="text-xs text-gray-400">Use your email anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Confirmation Modal */}
        <PaymentConfirmation
          isOpen={showPaymentModal}
          onClose={handleClosePaymentModal}
          onConfirm={handlePaymentConfirm}
          prefix={prefix}
          domain={selectedDomain}
          cost="1 Credit"
          isLoading={isLoading}
          transactionHash={transactionHash}
          error={paymentError}
        />

        {/* Credit Purchase Modal */}
        <PaymentConfirmation
          isOpen={showCreditModal}
          onClose={handleCloseCreditModal}
          onConfirm={handleCreditPaymentConfirm}
          prefix={`${selectedCredits} Credits`}
          domain="Credit Purchase"
          cost={`${creditOptions.find(opt => opt.credits === selectedCredits)?.price} SOL`}
          isLoading={isLoading}
          transactionHash={transactionHash}
          error={paymentError}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Premium; 
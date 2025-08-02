import React, { useState, useEffect } from 'react';
import { Wallet, Mail, Crown, Sparkles, CheckCircle } from 'lucide-react';
import { useWeb3Store } from '../../store/web3Store';
import { toast } from 'react-hot-toast';
import PaymentConfirmation from './PaymentConfirmation';

const CustomEmailCreator = () => {
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    createCustomEmail, 
    customEmails, 
    getCustomEmails,
    isLoading,
    error 
  } = useWeb3Store();

  const [prefix, setPrefix] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const premiumDomains = [
    { name: 'voidmail.fun', price: '0.025 SOL', popular: true },
    { name: 'voidmail.email', price: '0.025 SOL', popular: false },
    { name: 'bigtimer.site', price: '0.025 SOL', popular: false },
    { name: 'asksaurabh.xyz', price: '0.025 SOL', popular: true }
  ];

  useEffect(() => {
    if (isConnected) {
      getCustomEmails();
    }
  }, [isConnected]);

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

    if (balance < 0.025) {
      toast.error('Insufficient SOL balance. Need 0.025 SOL');
      return;
    }

    // Show payment confirmation modal
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
        setShowForm(false);
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

  const checkAvailability = async (email) => {
    // This would check if the email is available
    // For now, we'll assume it's available
    return true;
  };

  if (!isConnected) {
    return (
      <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8 text-center">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-[#10B981]" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Wallet to Create Custom Email</h3>
        <p className="text-gray-400 mb-6">
          Connect your Solana wallet to create custom email addresses and mint NFTs.
        </p>
        <div className="text-sm text-gray-500">
          <p>• Custom email addresses cost 0.025 SOL</p>
          <p>• Each email comes with a unique NFT</p>
          <p>• Emails are valid for 24 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
              <Wallet className="h-5 w-5 text-[#10B981]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Connected Wallet</p>
              <p className="font-mono text-sm">
                {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-[#10B981] font-semibold">{balance.toFixed(4)} SOL</p>
          </div>
        </div>
      </div>

      {/* Custom Email Form */}
      <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
              <Mail className="h-5 w-5 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Create Custom Email</h3>
              <p className="text-sm text-gray-400">Mint an NFT and get a custom email address</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            {showForm ? 'Cancel' : 'Create Email'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateEmail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Cost: <span className="text-[#10B981] font-semibold">0.025 SOL</span>
              </div>
              <button
                type="submit"
                disabled={isLoading || !prefix || !selectedDomain || balance < 0.025}
                className="px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {isLoading ? 'Creating...' : 'Create & Mint NFT'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Available Domains */}
      <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
        <h3 className="text-lg font-semibold mb-4">Available Premium Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumDomains.map((domain) => (
            <div
              key={domain.name}
              className={`p-4 rounded-lg border ${
                domain.popular
                  ? 'border-[#10B981]/30 bg-[#10B981]/5'
                  : 'border-[#ffffff08] bg-[#0e0e10]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">{domain.name}</span>
                {domain.popular && (
                  <span className="text-xs bg-[#10B981] text-white px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-400">{domain.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmation
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        onConfirm={handlePaymentConfirm}
        prefix={prefix}
        domain={selectedDomain}
        cost="0.025 SOL"
        isLoading={isLoading}
        transactionHash={transactionHash}
        error={paymentError}
      />
    </div>
  );
};

export default CustomEmailCreator; 
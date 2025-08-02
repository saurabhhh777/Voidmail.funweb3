import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader, ExternalLink, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PaymentConfirmation = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  prefix, 
  domain, 
  cost = "0.025 SOL",
  isLoading = false,
  transactionHash = null,
  error = null 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      toast.success('Payment successful! Custom email created.');
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {transactionHash ? (
            // Success state
            <div className="space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-[#10B981]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
              <p className="text-gray-400">
                Your custom email <span className="text-[#10B981] font-mono">{prefix}@{domain}</span> has been created.
              </p>
              
              <div className="bg-[#0e0e10] rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Transaction Hash:</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-[#10B981] font-mono break-all">
                    {transactionHash.slice(0, 8)}...{transactionHash.slice(-8)}
                  </code>
                  <a
                    href={`https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#10B981] hover:text-[#3B82F6] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-medium hover:scale-105 transition-transform"
              >
                Close
              </button>
            </div>
          ) : error ? (
            // Error state
            <div className="space-y-4">
              <div className="flex justify-center">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Failed</h3>
              <p className="text-gray-400">{error}</p>
              
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            // Confirmation state
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-[#10B981]" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Confirm Payment</h3>
                <p className="text-gray-400">
                  You're about to create a custom email address
                </p>
              </div>
              
              <div className="bg-[#0e0e10] rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email Address:</span>
                  <span className="text-[#10B981] font-mono">{prefix}@{domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-white font-semibold">{cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="text-[#3B82F6]">Solana Devnet</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                This will mint an NFT and transfer SOL to the project vault.
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Payment'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation; 
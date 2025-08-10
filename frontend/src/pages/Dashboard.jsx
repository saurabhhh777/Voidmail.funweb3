import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Coins, 
  Wallet, 
  CreditCard, 
  History, 
  TrendingUp, 
  Mail, 
  Shield,
  ExternalLink,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWeb3Store } from '../../store/web3Store';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import CtaSection from "../components/CtaSection";

const Dashboard = () => {
  const { connected, publicKey } = useWallet();
  const { 
    balance, 
    userCredits,
    customEmails,
    getUserCredits,
    getCustomEmails,
    getCreditTransactions,
    getSolanaTransactions,
    isLoading 
  } = useWeb3Store();

  const [activeTab, setActiveTab] = useState('overview');
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [solanaTransactions, setSolanaTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  const walletAddress = publicKey?.toString();

  useEffect(() => {
    if (connected && walletAddress) {
      getUserCredits();
      getCustomEmails();
      fetchCreditTransactions();
      fetchSolanaTransactions();
    }
  }, [connected, walletAddress]);

  const fetchCreditTransactions = async () => {
    try {
      setIsLoadingTransactions(true);
      const transactions = await getCreditTransactions();
      setCreditTransactions(transactions);
    } catch (error) {
      console.error('Error fetching credit transactions:', error);
      toast.error('Failed to load credit transactions');
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const fetchSolanaTransactions = async () => {
    try {
      setIsLoadingTransactions(true);
      const transactions = await getSolanaTransactions();
      setSolanaTransactions(transactions);
    } catch (error) {
      console.error('Error fetching Solana transactions:', error);
      toast.error('Failed to load Solana transactions');
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSOL = (lamports) => {
    return (lamports / 1000000000).toFixed(4);
  };

  // Debug: Log connection state
  console.log('Dashboard - connected:', connected, 'walletAddress:', walletAddress);

  if (!connected || !walletAddress) {
    return (
      <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-10 w-10 text-[#10B981]" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-400 mb-8">
              Connect your Solana wallet to view your account dashboard, transaction history, and credit details.
            </p>
            <div className="bg-[#151517] rounded-xl p-6 border border-[#ffffff08]">
              <h3 className="text-lg font-semibold mb-4">What you'll see:</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#10B981]" />
                  Credit transaction history
                </li>
                <li className="flex items-center gap-2">
                  <History className="h-4 w-4 text-[#10B981]" />
                  Solana transaction history
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#10B981]" />
                  Custom email addresses
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#10B981]" />
                  Account statistics
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Manage your credits, view transactions, and track your custom emails
          </p>
        </div>

        {/* Account Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Wallet Balance</p>
                <p className="text-xl font-bold text-[#10B981]">{balance.toFixed(4)} SOL</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                <Coins className="h-5 w-5 text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Available Credits</p>
                <p className="text-xl font-bold text-[#3B82F6]">{userCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#8B5CF6]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Custom Emails</p>
                <p className="text-xl font-bold text-[#8B5CF6]">{customEmails.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Transactions</p>
                <p className="text-xl font-bold text-[#F59E0B]">
                  {creditTransactions.length + solanaTransactions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-[#151517] rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'credits'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Coins className="h-4 w-4 inline mr-2" />
            Credit History
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <History className="h-4 w-4 inline mr-2" />
            Solana Transactions
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'emails'
                ? 'bg-[#10B981] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Custom Emails
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Credit Transactions */}
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
              <div className="flex items-center gap-3 mb-6">
                <Coins className="h-5 w-5 text-[#3B82F6]" />
                <h3 className="text-lg font-semibold">Recent Credit Purchases</h3>
              </div>
              <div className="space-y-4">
                {creditTransactions.slice(0, 5).map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#0e0e10] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                        <Coins className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                      <div>
                        <p className="font-medium">{tx.credits} Credits</p>
                        <p className="text-sm text-gray-400">{formatDate(tx.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#10B981]">{tx.solAmount / 1000000000} SOL</p>
                      <p className="text-xs text-gray-400">{tx.status}</p>
                    </div>
                  </div>
                ))}
                {creditTransactions.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No credit transactions yet</p>
                )}
              </div>
            </div>

            {/* Recent Solana Transactions */}
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
              <div className="flex items-center gap-3 mb-6">
                <History className="h-5 w-5 text-[#F59E0B]" />
                <h3 className="text-lg font-semibold">Recent Solana Transactions</h3>
              </div>
              <div className="space-y-4">
                {solanaTransactions.slice(0, 5).map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#0e0e10] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-[#F59E0B]" />
                      </div>
                      <div>
                        <p className="font-medium">{tx.type}</p>
                        <p className="text-sm text-gray-400">{formatDate(tx.timestamp)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#10B981]">{formatSOL(tx.amount)} SOL</p>
                      <a
                        href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B82F6] hover:text-[#10B981] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
                {solanaTransactions.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No Solana transactions yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Credit History Tab */}
        {activeTab === 'credits' && (
          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Coins className="h-5 w-5 text-[#3B82F6]" />
              <h3 className="text-lg font-semibold">Credit Transaction History</h3>
            </div>
            
            {isLoadingTransactions ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6] mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading transactions...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ffffff08]">
                      <th className="text-left py-3 px-4 text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400">Credits</th>
                      <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400">Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-[#ffffff08] hover:bg-[#0e0e10]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {formatDate(tx.createdAt)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-[#3B82F6]" />
                            {tx.credits} Credits
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-[#10B981]" />
                            {(tx.solAmount / 1000000000).toFixed(4)} SOL
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            tx.status === 'completed' 
                              ? 'bg-[#10B981]/10 text-[#10B981]' 
                              : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <a
                            href={`https://explorer.solana.com/tx/${tx.transactionHash}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:text-[#10B981] transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {creditTransactions.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No credit transactions found</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Solana Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-6">
              <History className="h-5 w-5 text-[#F59E0B]" />
              <h3 className="text-lg font-semibold">Solana Transaction History</h3>
            </div>
            
            {isLoadingTransactions ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59E0B] mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading transactions...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ffffff08]">
                      <th className="text-left py-3 px-4 text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400">Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solanaTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-[#ffffff08] hover:bg-[#0e0e10]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {formatDate(tx.timestamp)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-[#F59E0B]" />
                            {tx.type}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-[#10B981]" />
                            {formatSOL(tx.amount)} SOL
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            tx.status === 'confirmed' 
                              ? 'bg-[#10B981]/10 text-[#10B981]' 
                              : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <a
                            href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3B82F6] hover:text-[#10B981] transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {solanaTransactions.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No Solana transactions found</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Custom Emails Tab */}
        {activeTab === 'emails' && (
          <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-5 w-5 text-[#8B5CF6]" />
              <h3 className="text-lg font-semibold">Custom Email Addresses</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customEmails.map((email, index) => (
                <div key={index} className="bg-[#0e0e10] rounded-xl p-4 border border-[#ffffff08] hover:border-[#8B5CF6]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#8B5CF6]">{email.email}</p>
                      <p className="text-xs text-gray-400">Custom Email</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT Mint:</span>
                      <span className="font-mono text-xs text-[#10B981]">
                        {email.nftMint?.slice(0, 8)}...{email.nftMint?.slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-[#10B981]">Active</span>
                    </div>
                  </div>
                </div>
              ))}
              {customEmails.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No custom emails yet</p>
                  <p className="text-sm text-gray-500 mt-2">Purchase credits to create custom email addresses</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CtaSection */}
      <CtaSection/>

      <Footer />
    </div>
  );
};

export default Dashboard; 
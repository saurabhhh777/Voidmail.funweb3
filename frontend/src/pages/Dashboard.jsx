import React, { useState } from 'react';
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
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CtaSection from "../components/CtaSection";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const mockData = {
    balance: 0.0,
    userCredits: 0,
    customEmails: [],
    creditTransactions: [],
    solanaTransactions: []
  };

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome to your Voidmail dashboard</p>
        </div>

        {/* Wallet Connection Notice */}
        <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
              <Wallet className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Connect Your Wallet</h3>
              <p className="text-gray-400">Connect your Solana wallet to access your dashboard features</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
                <Coins className="h-5 w-5 text-[#10B981]" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{mockData.balance} SOL</h3>
            <p className="text-gray-400 text-sm">Wallet Balance</p>
          </div>

          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#3B82F6]" />
              </div>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{mockData.userCredits}</h3>
            <p className="text-gray-400 text-sm">Email Credits</p>
          </div>

          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-[#8B5CF6]" />
              </div>
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{mockData.customEmails.length}</h3>
            <p className="text-gray-400 text-sm">Custom Emails</p>
          </div>

          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <TrendingUp className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-1">0</h3>
            <p className="text-gray-400 text-sm">Total Transactions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
          <div className="flex space-x-1 mb-6">
            {['overview', 'transactions', 'emails'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#10B981] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-6">Connect your Solana wallet to view your dashboard data</p>
                <button className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                  Connect Wallet
                </button>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="h-8 w-8 text-[#3B82F6]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
                <p className="text-gray-400">Your transaction history will appear here once you connect your wallet</p>
              </div>
            )}

            {activeTab === 'emails' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Custom Emails</h3>
                <p className="text-gray-400">Your custom email addresses will appear here once you connect your wallet</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Dashboard; 
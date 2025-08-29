import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Mail, Edit2, Share2, Forward, Crown, Sparkles, X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";
import Navbar from "../components/Navbar";

const Main = () => {
  const [email, setEmail] = useState("demo@voidmail.fun");
  const [inbox, setInbox] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [autorefresh, setAutorefresh] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");
  const [showPremiumBanner, setShowPremiumBanner] = useState(true);

  // Debug log to verify component loads
  useEffect(() => {
    console.log("Main component loaded");
  }, []);

  // Autorefresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAutorefresh((prev) => (prev === 1 ? 10 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard", {
      style: {
        background: "#151517",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  };

  const refreshInbox = () => {
    toast.success("Inbox refreshed", {
      style: {
        background: "#151517",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  };

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Premium Banner */}
      {showPremiumBanner && (
        <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] p-4 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-white" />
              <div>
                <h3 className="font-semibold">Upgrade to Premium</h3>
                <p className="text-sm opacity-90">Get custom email addresses and NFT ownership</p>
              </div>
            </div>
            <button
              onClick={() => setShowPremiumBanner(false)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        {/* Email Address Section */}
        <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Disposable Email</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Auto-refresh in {autorefresh}s</span>
              <button
                onClick={refreshInbox}
                className="p-2 hover:bg-[#ffffff08] rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#0e0e10] border border-[#ffffff08] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#10B981]" />
                <span className="font-mono text-lg">{email}</span>
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inbox */}
          <div className="lg:col-span-2 bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Inbox</h3>
              <div className="text-sm text-gray-400">
                {inbox.length} email{inbox.length !== 1 ? 's' : ''}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981] mx-auto mb-4"></div>
                <p className="text-gray-400">Loading emails...</p>
              </div>
            ) : inbox.length > 0 ? (
              <div className="space-y-4">
                {inbox.map((mail, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#0e0e10] rounded-lg border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedMail(mail)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{mail.subject || 'No Subject'}</h4>
                      <span className="text-sm text-gray-400">{mail.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">From: {mail.from}</p>
                    <p className="text-sm text-gray-300 line-clamp-2">{mail.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">No emails yet</h4>
                <p className="text-gray-400">Share your email address to receive emails here</p>
              </div>
            )}
          </div>

          {/* Email Details */}
          <div className="bg-[#151517] border border-[#ffffff08] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6">Email Details</h3>
            
            {selectedMail ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Subject</label>
                  <p className="font-medium">{selectedMail.subject}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">From</label>
                  <p className="font-medium">{selectedMail.from}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Date</label>
                  <p className="font-medium">{selectedMail.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Body</label>
                  <p className="text-sm text-gray-300 mt-2">{selectedMail.body}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 px-3 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-sm">
                    Reply
                  </button>
                  <button className="flex-1 px-3 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-sm">
                    Forward
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Select an email to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <CtaSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Main;
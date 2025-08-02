import { Link } from "react-router-dom";
import { Crown, Sparkles, Shield, Zap } from "lucide-react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="mt-2 mr-2 ml-2">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 text-center bg-[#0e0e10]">
        <div className="absolute w-[600px] h-[600px] bg-[#10B981]/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2 z-0" />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="tracking-[0.5em] text-[#10B981] text-sm uppercase mb-4">
            VOIDMAIL
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-poppins">
            Start your <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-poppins">
              free trial today
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto font-pt--sans">
            Unlock the full potential of private communication with our secure disposable email solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/main">
              <button className="px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center gap-2">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
            <Link to="/premium">
              <button className="px-8 py-4 bg-[#ffffff08] hover:bg-[#ffffff12] text-white rounded-xl font-semibold transition-colors duration-300 border border-[#ffffff08] flex items-center gap-2">
                <Crown className="h-5 w-5 text-[#10B981]" />
                Premium Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-[#121214] border-y border-[#ffffff08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-6 w-6 text-[#10B981]" />
              <span className="text-[#10B981] font-semibold uppercase tracking-wider">Premium Features</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Custom Email Addresses with <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">NFT Ownership</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Create your own custom email addresses and mint unique NFTs as proof of ownership
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Crown className="h-6 w-6 text-[#10B981]" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Custom Domains</h4>
              <p className="text-gray-400 mb-4">
                Choose from premium domains like voidmail.fun, voidmail.email, and more
              </p>
              <div className="text-sm text-[#10B981] font-mono">
                yourname@voidmail.fun
              </div>
            </div>

            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-[#10B981]" />
              </div>
              <h4 className="text-xl font-semibold mb-3">NFT Certificate</h4>
              <p className="text-gray-400 mb-4">
                Each custom email comes with a unique NFT as proof of ownership
              </p>
              <div className="text-sm text-[#10B981] font-mono">
                Minted on Solana
              </div>
            </div>

            <div className="bg-[#151517] rounded-2xl border border-[#ffffff08] p-8 hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-[#10B981]" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Secure Payment</h4>
              <p className="text-gray-400 mb-4">
                Pay with SOL cryptocurrency for instant, secure transactions
              </p>
              <div className="text-sm text-[#10B981] font-mono">
                0.025 SOL per email
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/premium">
              <button className="px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center gap-2 mx-auto">
                <Crown className="h-5 w-5" />
                Get Premium Access
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0e0e10] border-y border-[#ffffff08]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">50K+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Emails Generated</div>
          </div>

          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">99.9%</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Service Uptime</div>
          </div>

          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-[#10B981]/30 transition-all">
            <div className="text-5xl font-bold text-[#10B981] mb-2">24h</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Auto-Destruct</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

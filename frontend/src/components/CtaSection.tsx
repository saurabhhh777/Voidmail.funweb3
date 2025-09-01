import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

const CtaSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#121214] border-y border-[#ffffff08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Ready to Secure Your <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">Digital Privacy</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who trust Voidmail for secure, disposable email addresses with NFT ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="text-center group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#10B981]/20 transition-colors duration-300">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#10B981]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Your data never gets stored or tracked. Complete anonymity guaranteed.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#10B981]/20 transition-colors duration-300">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-[#10B981]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Instant Setup</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Get your disposable email address in seconds. No registration required.
            </p>
          </div>

          <div className="text-center group sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#10B981]/20 transition-colors duration-300">
              <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-[#10B981]" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              Access from anywhere in the world. No geo-restrictions or limitations.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href="/main" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30 flex items-center justify-center gap-2 text-sm sm:text-base">
              Start Using Voidmail
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </Link>
          <Link href="/premium" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#ffffff08] hover:bg-[#ffffff12] text-white rounded-xl font-semibold transition-colors duration-300 border border-[#ffffff08] flex items-center justify-center gap-2 text-sm sm:text-base">
              View Premium Plans
            </button>
          </Link>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            No credit card required • Free forever • 24/7 support
          </p>
        </div>
      </div>
    </section>
  )
}

export default CtaSection 
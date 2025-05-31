import React from "react";
import { Link } from "react-router-dom";
import { SparklesIcon, ShieldCheckIcon, ClockIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="backdrop-blur-lg bg-[#0e0e10]/80 sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-[#ffffff08]">
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Voidmail
        </div>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          {['Home', 'About', 'Contact', 'PrivacyPolicy'].map((item) => (
            <Link 
              key={item}
              to={`/${item==="Home" ? "/" : item.toLowerCase()}`}
              className="hover:text-indigo-400 transition-all duration-300 hover:-translate-y-[2px]"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 flex-1 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-float">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Burner Emails
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-medium text-gray-300 mt-4 block">
              Disposable • Anonymous • Secure
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Generate temporary emails instantly. Protect your privacy and keep your main inbox spam-free forever.
          </p>
          <Link to="/main">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-transform duration-300 font-semibold shadow-lg shadow-indigo-500/20">
              Generate Temporary Email
            </button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-b from-[#ffffff03] to-[#ffffff01]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: SparklesIcon, title: "Instant Creation", text: "Generate new email addresses in one click" },
            { icon: ShieldCheckIcon, title: "Secure", text: "End-to-end encrypted & no data storage" },
            { icon: ClockIcon, title: "Self-Destructing", text: "Emails automatically delete after 24h" },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-[#ffffff05] rounded-xl border border-[#ffffff08] hover:border-indigo-500/30 transition-all group">
              <feature.icon className="h-12 w-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-2xl mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Protect Your Privacy?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands who've already taken control of their inbox
          </p>
          <Link to="/main">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto">
              <ArrowsRightLeftIcon className="h-5 w-5" />
              Start Protecting Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-[#ffffff08]">
        <div className="flex justify-center gap-6 mb-4">
          {['Terms', 'P rivacyPolicy', 'Contact', 'FAQ'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`} 
              className="hover:text-indigo-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div>&copy; {new Date().getFullYear()} Voidmail.fun • Open Source & Privacy First</div>
      </footer>
    </div>
  );
};

export default Home;
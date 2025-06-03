import { Link } from "react-router-dom";
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  ArrowsRightLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar - Professional Style */}
      <nav className="backdrop-blur-lg bg-[#0e0e10]/90 sticky top-0 z-50 flex justify-between items-center px-8 py-5 border-b border-[#ffffff08]">
        <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-poppins">
          VOIDMAIL
        </div>
        <div className="space-x-8 text-sm font-medium hidden md:flex uppercase tracking-wider">
          {['Home', 'About', 'Contact', 'PrivacyPolicy'].map((item) => (
            <Link 
              key={item}
              to={`/${item === "Home" ? "/" : item.toLowerCase()}`}
              className="hover:text-orange-400 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section - Bold & Professional */}
      <section className="text-center py-20 px-6 flex-1 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
              Disposable • Anonymous • Secure
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              BURNER EMAILS
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-medium text-gray-300 mt-4 block">
              Protect Your Identity Online
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Generate temporary emails instantly. Keep your main inbox clean and your personal information private.
          </p>
          
          <Link to="/main">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:scale-105 transition-transform duration-300 font-semibold shadow-lg shadow-orange-500/20 group">
              <span className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 group-hover:animate-pulse" />
                Generate Temporary Email
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section - Professional Metrics */}
      <section className="py-16 bg-[#121214] border-y border-[#ffffff08]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-orange-500/30 transition-all">
            <div className="text-5xl font-bold text-orange-400 mb-2">50K+</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Emails Generated</div>
          </div>
          
          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-orange-500/30 transition-all">
            <div className="text-5xl font-bold text-orange-400 mb-2">99.9%</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Service Uptime</div>
          </div>
          
          <div className="text-center p-8 border border-[#ffffff08] rounded-xl bg-[#ffffff03] hover:border-orange-500/30 transition-all">
            <div className="text-5xl font-bold text-orange-400 mb-2">24h</div>
            <div className="text-gray-400 uppercase tracking-wider text-sm">Auto-Destruct</div>
          </div>
        </div>
      </section>

      {/* Features Grid - Professional Blocks */}
      <section className="py-20 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">SECURE EMAIL EXPERIENCE</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-6">
              Our platform provides the tools you need to maintain privacy and security in your online communications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: SparklesIcon, 
                title: "Instant Creation", 
                text: "Generate new email addresses in one click with our lightning-fast system"
              },
              { 
                icon: ShieldCheckIcon, 
                title: "Military-Grade Security", 
                text: "End-to-end encrypted communications with zero data retention"
              },
              { 
                icon: ClockIcon, 
                title: "Self-Destructing", 
                text: "All emails and attachments automatically delete after 24 hours"
              },
              { 
                icon: LockClosedIcon, 
                title: "No Registration", 
                text: "Use our service completely anonymously without any sign-up"
              },
              { 
                icon: TrashIcon, 
                title: "Zero Spam", 
                text: "Keep your primary inbox clean from unwanted marketing emails"
              },
              { 
                icon: ArrowsRightLeftIcon, 
                title: "Easy Forwarding", 
                text: "Optionally forward important emails to your main account"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#ffffff03] rounded-xl border border-[#ffffff08] hover:border-orange-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Professional Gradient */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
        <div className="absolute w-full h-full bg-[url('https://uploads-ssl.webflow.com/5e6c01bbf0b34a0ddbde3d4e/5e6ed8a89d75514f5d6dbe1c_noise.png')] opacity-5"></div>
        
        <div className="max-w-2xl mx-auto px-6 relative">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Reclaim Your Privacy?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Join thousands of users who've taken control of their digital identity
          </p>
          <Link to="/main">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-orange-500/20">
              Get Your Burner Email Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer - Professional Minimalist */}
      <footer className="py-12 text-center text-gray-500 border-t border-[#ffffff08]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4 md:mb-0">
              VOIDMAIL
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {['Terms', 'PrivacyPolicy', 'Contact', 'FAQ'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`} 
                  className="hover:text-orange-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Voidmail.fun • Open Source & Privacy First
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
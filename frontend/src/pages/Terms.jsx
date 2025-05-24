import { ScaleIcon, DocumentTextIcon, UserIcon, NoSymbolIcon, ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      icon: DocumentTextIcon,
      title: "Introduction",
      content: "By accessing and using Voidmail.fun, you accept and agree to be bound by these Terms. If you disagree, you must refrain from using our services."
    },
    {
      icon: UserIcon,
      title: "User Responsibilities",
      content: "You agree not to use our service for illegal activities. You are solely responsible for how you use temporary emails generated through our platform."
    },
    {
      icon: NoSymbolIcon,
      title: "Prohibited Activities",
      content: "Strictly prohibited: Spamming, phishing attempts, harassment, distributing malware, or any activity violating applicable laws."
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Liability Limitations",
      content: "We provide service 'as is' without warranties. We're not liable for any damages arising from service use. Email content is your responsibility."
    },
    {
      icon: ArrowPathIcon,
      title: "Changes to Terms",
      content: "We reserve right to modify terms at any time. Continued use after changes constitutes acceptance. Check this page regularly for updates."
    },
    {
      icon: ScaleIcon,
      title: "Governing Law",
      content: "These terms are governed by laws of [Your Country]. Any disputes shall be resolved in courts of [Your Jurisdiction]."
    },
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Consistent Navbar */}
      <nav className="backdrop-blur-lg bg-[#0e0e10]/80 sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-[#ffffff08]">
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Voidmail
        </div>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link to="/terms" className="text-indigo-400">Terms</Link>
          {['Home', 'FAQ', 'Contact', 'Privacy'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase().replace(' ', '-')}`} 
              className="hover:text-indigo-400 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-[#141416] rounded-2xl mb-6">
            <ScaleIcon className="h-12 w-12 text-indigo-400 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#141416] p-8 rounded-2xl border border-[#ffffff08]">
            <p className="text-gray-300 leading-relaxed">
              Welcome to Voidmail.fun. These Terms govern your use of our temporary email service. 
              By accessing/using our platform, you agree to these legally binding terms. 
              <Link to="/" className="text-indigo-400 hover:text-indigo-300 ml-2">
                Return to Home
              </Link>
            </p>
          </div>

          {sections.map((section, index) => (
            <div 
              key={index}
              className="group bg-[#141416] p-8 rounded-2xl border border-[#ffffff08] hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start gap-6">
                <section.icon className="h-8 w-8 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-16 text-gray-400">
            <p className="mb-4">Need legal clarification?</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Contact Our Team
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      {/* Consistent Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-[#ffffff08]">
        <div className="flex justify-center gap-6 mb-4">
          {['Terms', 'Privacy', 'Contact', 'FAQ'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`} 
              className="hover:text-indigo-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div>&copy; {new Date().getFullYear()} Voidmail.fun • Legally Compliant Service</div>
      </footer>
    </div>
  );
};

export default Terms;
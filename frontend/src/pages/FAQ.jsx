import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqItems = [
    {
      question: "How does Voidmail protect my privacy?",
      answer: "We never store any personal information or email content. All emails are encrypted and automatically deleted after 24 hours, ensuring complete anonymity."
    },
    {
      question: "How long do temporary emails last?",
      answer: "Your temporary mailbox remains active for 24 hours from creation. All messages are permanently deleted after this period."
    },
    {
      question: "Can I reply to emails using Voidmail?",
      answer: "Currently, Voidmail is receive-only. You can view and download attachments but cannot send replies from temporary addresses."
    },
    {
      question: "Is there a limit on email usage?",
      answer: "No limits! Generate as many temporary emails as you need, completely free. We don't track or restrict usage."
    },
    {
      question: "How secure are your servers?",
      answer: "We use military-grade encryption (AES-256) and regularly audit our systems. All data is stored in GDPR-compliant facilities."
    },
    {
      question: "Can I use this for account verification?",
      answer: "Absolutely! Voidmail is perfect for signing up to services while keeping your personal email private. Many users successfully use it for verifications."
    },
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar - Same as Home */}
      <nav className="backdrop-blur-lg bg-[#0e0e10]/80 sticky top-0 z-50 flex justify-between items-center px-6 py-4 border-b border-[#ffffff08]">
        <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Voidmail
        </div>
        <div className="space-x-6 text-sm font-medium hidden md:flex">
          <Link to="/faq" className="text-indigo-400">FAQ</Link>
          {['Home', 'About', 'Contact', 'Privacy'].map((item) => (
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

      {/* FAQ Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-lg">
            Quick answers to common questions about Voidmail
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-[#141416] rounded-xl border border-[#ffffff08] hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center border-t border-[#ffffff08] pt-16">
          <div className="inline-flex items-center bg-[#141416] px-8 py-4 rounded-full">
            <span className="mr-4">Still have questions?</span>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Contact Support
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Same as Home */}
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
        <div>&copy; {new Date().getFullYear()} Voidmail.fun • Open Source & Privacy First</div>
      </footer>
    </div>
  );
};

export default FAQ;

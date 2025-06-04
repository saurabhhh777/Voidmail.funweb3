import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

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
      {/* Use your existing Navbar component */}
      <div className="mt-2 mr-2 ml-2">
        <Navbar />
      </div>

      {/* FAQ Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quick answers to common questions about Voidmail
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="p-8 bg-[#151517] rounded-xl border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-100">{item.question}</h3>
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center border-t border-[#ffffff08] pt-16">
          <div className="inline-flex items-center bg-[#151517] px-6 py-3 rounded-lg border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors">
            <span className="mr-3 text-gray-300">Still have questions?</span>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-[#10B981] hover:text-[#3B82F6] transition-colors"
            >
              Contact Support
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <CtaSection />

      {/* Use your existing Footer component */}
      <Footer />
    </div>
  );
};

export default FAQ;
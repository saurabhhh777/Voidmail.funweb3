import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheckIcon, LockClosedIcon, ServerIcon, TrashIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Introduction",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Welcome to Voidmail.fun ("Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our temporary email service.</p>
          <p>We respect your privacy and are committed to protecting it through our compliance with this policy. By accessing or using the Service, you agree to this Privacy Policy.</p>
        </>
      )
    },
    {
      title: "2. Information We Collect",
      icon: <DatabaseIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Our Service is designed to minimize data collection:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Temporary Email Data:</strong> Emails received by your burner addresses (automatically deleted after 24 hours)</li>
            <li><strong>Technical Information:</strong> IP addresses, browser type, operating system, and usage data</li>
            <li><strong>No Registration:</strong> We don't require or store personal identifiers like names or addresses</li>
          </ul>
        </>
      )
    },
    {
      title: "3. How We Use Your Information",
      icon: <ServerIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We use collected information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our Service</li>
            <li>Improve user experience and service functionality</li>
            <li>Monitor usage patterns and analyze trends</li>
            <li>Prevent abuse and ensure service security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Data Retention & Deletion",
      icon: <TrashIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Our data retention practices prioritize your privacy:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Temporary emails are automatically deleted after 24 hours</li>
            <li>Logs and analytics data are retained for 30 days</li>
            <li>No long-term storage of email contents</li>
          </ul>
          <p>You can manually delete your temporary inbox at any time.</p>
        </>
      )
    },
    {
      title: "5. Data Security",
      icon: <LockClosedIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We implement robust security measures:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit (SSL/TLS)</li>
            <li>Regular security audits and testing</li>
            <li>Minimal data collection principles</li>
            <li>Secure server infrastructure</li>
          </ul>
          <p className="mt-4">While we strive to protect your information, no electronic transmission or storage is 100% secure.</p>
        </>
      )
    },
    {
      title: "6. Third-Party Services",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We use limited third-party services that may process data:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Analytics:</strong> Basic service usage metrics (anonymous)</li>
            <li><strong>Hosting:</strong> Secure cloud infrastructure providers</li>
          </ul>
          <p>We vet all third parties for compliance with privacy standards.</p>
        </>
      )
    },
    {
      title: "7. Your Rights",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">You have certain rights regarding your data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access any data we hold about you</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of non-essential data collection</li>
            <li>Lodge complaints with regulatory authorities</li>
          </ul>
          <p className="mt-4">To exercise these rights, contact us at privacy@voidmail.fun.</p>
        </>
      )
    },
    {
      title: "8. Changes to This Policy",
      icon: <ExclamationIcon className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We may update this Privacy Policy periodically. When we do, we will:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Update the "last updated" date at the top of this page</li>
            <li>Notify users of significant changes</li>
          </ul>
          <p>Your continued use of the Service after such modifications constitutes acceptance of the revised policy.</p>
        </>
      )
    },
    {
      title: "9. Contact Us",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      content: (
        <p>For questions about this Privacy Policy or our practices, contact us at <span className="text-[#10B981]">privacy@voidmail.fun</span>.</p>
      )
    }
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      <div className="mt-2 mr-2 ml-2">
        <Navbar />  
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981]/10 rounded-full mb-6">
            <LockClosedIcon className="h-8 w-8 text-[#10B981]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] hover:border-[#10B981]/30 transition-colors"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  {section.icon}
                </span>
                {section.title}
              </h2>
              <div className="text-gray-400 space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] mb-12">
          <h2 className="text-2xl font-bold mb-4 text-[#10B981]">Additional Information</h2>
          <p className="text-gray-400 mb-4">This service is not intended for sensitive communications. For maximum privacy:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Don't use for financial or medical communications</li>
            <li>Assume all received emails are publicly accessible</li>
            <li>Review our <Link to="/terms" className="text-[#10B981] hover:underline">Terms of Service</Link> for usage guidelines</li>
          </ul>
        </div>
      </main>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
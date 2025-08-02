import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaSection from "../components/CtaSection";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: <Database className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We collect minimal information to provide our service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP addresses for security and analytics</li>
            <li>Browser information for compatibility</li>
            <li>Usage data to improve our service</li>
            <li>No personal information is required</li>
          </ul>
        </>
      )
    },
    {
      title: "2. How We Use Your Information",
      icon: <Eye className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Your information is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our email service</li>
            <li>Improve user experience and functionality</li>
            <li>Prevent abuse and ensure security</li>
            <li>Analyze usage patterns for service optimization</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Email Data Handling",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Our email handling practices:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Emails are automatically deleted after 24 hours</li>
            <li>We do not store email contents long-term</li>
            <li>Email data is encrypted in transit</li>
            <li>We do not read or analyze email content</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Data Sharing and Disclosure",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We do not sell, trade, or rent your personal information. We may share data only:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>When required by law or legal process</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist our operations</li>
            <li>In case of business transfer or merger</li>
          </ul>
        </>
      )
    },
    {
      title: "5. Your Privacy Rights",
      icon: <UserCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data we hold</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of data collection where possible</li>
          </ul>
        </>
      )
    },
    {
      title: "6. Data Security",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We implement security measures to protect your data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication</li>
            <li>Secure server infrastructure</li>
          </ul>
        </>
      )
    },
    {
      title: "7. Cookies and Tracking",
      icon: <Eye className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We use minimal cookies and tracking:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Essential cookies for service functionality</li>
            <li>Analytics cookies to improve our service</li>
            <li>No third-party advertising cookies</li>
            <li>You can disable cookies in your browser</li>
          </ul>
        </>
      )
    },
    {
      title: "8. Children's Privacy",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">Our service is not intended for children under 13:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We do not knowingly collect data from children under 13</li>
            <li>If we discover we have collected such data, we will delete it</li>
            <li>Parents should contact us if they believe we have collected their child's data</li>
          </ul>
        </>
      )
    },
    {
      title: "9. Changes to Privacy Policy",
      icon: <Eye className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4">We may update this Privacy Policy from time to time:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Changes will be posted on this page</li>
            <li>We will notify users of significant changes</li>
            <li>Continued use constitutes acceptance of changes</li>
            <li>Check this page regularly for updates</li>
          </ul>
        </>
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
            <ShieldCheck className="h-8 w-8 text-[#10B981]" />
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
          <h2 className="text-2xl font-bold mb-4 text-[#10B981]">Contact Information</h2>
          <p className="text-gray-400 mb-4">For questions about this Privacy Policy, please contact us at:</p>
          <p className="text-white">privacy@voidmail.fun</p>
        </div>
      </main>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
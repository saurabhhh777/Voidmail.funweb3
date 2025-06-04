import React from "react";
import { ShieldCheckIcon, SparklesIcon, ClockIcon } from "@heroicons/react/24/outline";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const About = () => {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">

      {/* Navbar */}
      <div className="pt-2 mr-2 ml-2">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#10B981]/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              About Voidmail
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your secure, no-signup temporary email solution — crafted to keep your inbox clean and your identity private.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: SparklesIcon,
              title: "Instant Creation",
              description: "Generate new email addresses in one click with our lightning-fast system"
            },
            {
              icon: ShieldCheckIcon,
              title: "Military-Grade Security",
              description: "End-to-end encrypted communications with zero data retention"
            },
            {
              icon: ClockIcon,
              title: "Self-Destructing",
              description: "All emails automatically delete after 24 hours"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] hover:border-[#10B981]/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-[#151517] rounded-xl p-8 md:p-12 border border-[#ffffff08] mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                At Voidmail, we believe privacy shouldn't be complicated. Whether you're signing up for a one-time service or testing an app, everyone deserves simple tools to protect their digital identity.
              </p>
              <p className="text-gray-300">
                We're committed to building products that put you in control of your online presence without tracking or complexity.
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-4">
                Built using modern web technologies, we focus on speed, privacy, and simplicity. No clutter. No spam. Just email, the way it should be.
              </p>
              <p className="text-gray-300">
                Our open-source approach means transparency is built into everything we do. You can trust Voidmail to keep your communications private and secure.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to protect your privacy?</h3>
          <a 
            href="/main" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#10B981]/30"
          >
            Generate Your Temporary Email
          </a>
        </div>
      </section>

        {/*Ctasection*/}
        <CtaSection/>

        {/* Footer */}
        <Footer/>
      

    </div>
  );
};

export default About;
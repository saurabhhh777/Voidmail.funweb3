import React, { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import CtaSection from "../components/CtaSection.jsx";

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    // toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white" id="contact-form">

      {/* Navbar */}
      <div className="pt-2 mr-2 ml-2">
        <Navbar />  
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#10B981]/10 blur-[120px] -top-32 left-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08]">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-[#0e0e10] border border-[#ffffff08] text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#0e0e10] border border-[#ffffff08] text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-[#0e0e10] border border-[#ffffff08] text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#151517] p-8 rounded-xl border border-[#ffffff08] h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#10B981]/10 rounded-full">
                    <Mail className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Email</h3>
                    <p className="text-white">support@voidmail.fun</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#10B981]/10 rounded-full">
                    <Phone className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Phone</h3>
                    <p className="text-white">+91 6399679782</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#10B981]/10 rounded-full">
                    <MapPin className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Location</h3>
                    <p className="text-white">Bareilly, UP</p>
                    <p className="text-gray-400 text-sm">India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#ffffff08]">
                <h3 className="text-gray-300 mb-4">Support Hours</h3>
                <p className="text-gray-400">Monday - Friday: 9am - 5pm PST</p>
                <p className="text-gray-400">Weekends: Limited availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection/>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Contact;

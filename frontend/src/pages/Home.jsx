import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-[#1f1f22]">
        <div className="text-3xl font-bold tracking-tight text-indigo-500">
          Voidmail<span className="text-white">.fun</span>
        </div>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-400 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-indigo-400 transition">Privacy</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 flex-1">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Temporary Email. Instantly.
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-10">
          Voidmail is your privacy-first disposable email solution. Instantly generate emails to protect your inbox from spam.
        </p>
        <Link to="/main">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* CTA Section */}
      <section className="bg-[#141416] py-16 text-center border-t border-[#1f1f22]">
        <h2 className="text-3xl font-semibold mb-4">
          Stay anonymous. Stay in control.
        </h2>
        <p className="text-gray-400 mb-6">
          No sign-up required. No trackers. Just instant, secure temporary email.
        </p>
        <Link to="/main">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Use Now Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-[#1f1f22]">
        &copy; {new Date().getFullYear()} Voidmail.fun. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-[#0e0e10] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-indigo-500">
          About Voidmail.fun
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Voidmail is your secure, no-signup temporary email solution — crafted
          to keep your inbox clean and your identity private.
        </p>
        <p className="mb-4 text-gray-400">
          Whether you're signing up for a one-time service or testing an app,
          Voidmail gives you fast, disposable email addresses without tracking
          or complexity.
        </p>
        <p className="text-gray-400">
          Built using modern web technologies, we focus on speed, privacy, and
          simplicity. No clutter. No spam. Just email, the way it should be.
        </p>
      </div>
    </div>
  );
};

export default About;

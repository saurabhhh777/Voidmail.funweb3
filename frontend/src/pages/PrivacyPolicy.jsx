import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-6 py-16 bg-[#0e0e10] text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            At <span className="font-medium text-indigo-400">Voidmail.fun</span>, we take your privacy seriously. This policy outlines how we
            collect, use, and protect your personal data.
          </p>
          <p>
            We only collect data you provide voluntarily, such as your email
            address or any interaction within the Voidmail app. This helps us
            improve user experience and provide reliable service.
          </p>
          <p>
            We never sell, rent, or share your data with third parties. You have
            full control over your data and can request deletion at any time by
            contacting us.
          </p>
          <p>
            By using Voidmail.fun, you agree to this privacy policy. We may
            update this page periodically to reflect changes in our practices.
          </p>
        </div>
        <div className="mt-12 text-sm text-center opacity-60">
          Last updated: May 2025
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

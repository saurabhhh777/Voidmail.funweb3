import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      title: "Introduction",
      content: "By using Voidmail.fun, you agree to these Terms. Disagreeing users must refrain from using our services."
    },
    {
      title: "User Responsibilities",
      content: "Do not use our service for illegal activities. You're responsible for how you use temporary emails."
    },
    {
      title: "Prohibited Activities",
      content: "No spamming, phishing, harassment, or malware distribution."
    },
    {
      title: "Liability",
      content: "Service provided 'as is' without warranties. We're not liable for damages from service use."
    },
  ];

  return (
    <div className="bg-[#0e0e10] text-white min-h-screen flex flex-col">
      {/* Simplified Navbar */}
      <nav className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-indigo-500">
            Voidmail
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-indigo-400">Home</Link>
            <Link to="/terms" className="text-indigo-400">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-8 mb-6">Terms of Service</h1>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-400">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>Need help? <Link to="/contact" className="text-indigo-400">Contact us</Link></p>
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Voidmail.fun</p>
        </div>
      </main>
    </div>
  );
};

export default Terms;
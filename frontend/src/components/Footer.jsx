import { Link } from "react-router-dom";
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const Footer = ({className=""}) => {
  return (
    <footer className={`bg-[#151517] text-gray-300 pt-16 pb-8 px-4 md:px-8 border-t border-[#ffffff08] ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
              VOIDMAIL
            </div>
            <p className="text-sm">Disposable • Anonymous • Secure</p>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Stay Updated</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your Email" 
                  className="px-4 py-2 bg-[#0e0e10] border border-[#ffffff08] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#10B981] w-full"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white rounded-r-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Information Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Information</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-[#10B981] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Helpful Links</h3>
            <ul className="space-y-2">
              {['Services', 'Support', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-[#10B981] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-[#10B981]" />
                <span>+91 6399679782</span>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-[#10B981]" />
                <span>support@voidmail.fun</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-[#10B981]" />
                <span>www.voidmail.fun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#ffffff08] flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Voidmail.fun • All Rights Reserved
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm hover:text-[#10B981] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-sm hover:text-[#10B981] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;